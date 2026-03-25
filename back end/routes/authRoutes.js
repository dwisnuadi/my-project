import express from "express";
import knex from "../config/db.js";
import { register, login } from "../controllers/authcontroller.js";
import multer from "multer";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ================= AUTH =================
router.post("/register", register);
router.post("/login", login);

// ================= COURSE =================

// GET COURSE
router.get("/course", async (req, res) => {
  res.send("auth oke");
  try {
    const course = await knex("course");
    res.json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD COURSE
router.post("/course", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { title, description, price } = req.body;

    const image = req.file ? req.file.filename : null;

    await knex("course").insert({
      title,
      description,
      image,
      price,
    });

    res.json({ message: "course berhasil ditambahkan" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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
