import express from "express";
import knex from "../config/db.js";
import { register, login } from "../controllers/authcontroller.js";
import multer from "multer";
import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ================= AUTH =================
router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Akses berhasil",
    user: req.user,
  });
});
// ================= REGISTER ===============

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, hashedPassword], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Register berhasil" });
  });
});


// ================ LOGIN ==================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password salah" });


    const token = JWT.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil",
      token: token,
    });
  });
});

// ================= COURSE =================

// GET COURSE
router.get("/courses", verifyToken, async (req, res) => {
  try {
    const course = await knex("course");
    res.json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD COURSE
router.post(
  "/course",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "tutorImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const { title, description, price, tutor, experience } = req.body;

      const image = req.files["image"]?.[0]?.filename;

      const tutorImage = req.files["tutorImage"]?.[0]?.filename;

      await knex("course").insert({
        title,
        description,
        price,
        tutor,
        experience,
        image,
        tutorImage,
      });

      res.json({ message: "course berhasil ditambahkan" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);
// UPDATE COURSE
router.put("/course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, price } = req.body;

    await knex("course")
      .where({ id })
      .update({ title, description, image, price });

    res.json({ message: "course berhasil di update" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE COURSE
router.delete("/course/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await knex("course")
      .where({ id })
      .del();

    res.json({ message: "course telah di hapus" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
