import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mysql from "mysql2";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

// ================= DB =================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "course_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout : 10000
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Gagal koneksi ke database:", err);
  } else {
    console.log("Berhasil connect ke MySQL");
    connection.release();
  }
});

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

// ================= LOGGER =================
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// ================= MULTER =================
const upload = multer({ dest: "uploads/" });

// ================= ROUTE =================
app.get("/api/course", (req, res) => {
  console.log("API response")

  db.query("SELECT * FROM course", (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }
    console.log("kirim response")
    res.json(result);
  });
});

app.post(
  "/api/course",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "tutorImage", maxCount: 1 }
  ]),
  (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const { title, description, price, tutor, tutor_experiance } = req.body; 

      if (!req.files || !req.files.image) {
        return res.status(400).json("Image wajib diupload");
      }

      const image = req.files["image"][0].filename;
      const image_tutor = req.files["tutorImage"]?.[0]?.filename;

      db.query(
  "INSERT INTO course (title, description, image, price, tutor, image_tutor, tutor_experiance) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [title, description, image, price, tutor, image_tutor, tutor_experiance],
        (err) => {
          if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json(err);
          }

          res.json("Course berhasil ditambahkan");
        }
      );
    } catch (err) {
      console.log("SERVER ERROR:", err);
      res.status(500).json(err);
    }
  }
);
app.put("/api/course/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, price, tutor } = req.body;

  db.query(
    "UPDATE course SET title=?, description=?, price=?, tutor=? WHERE id=?",
    [title, description, price, tutor, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json("Course berhasil diupdate");
    }
  );
});

app.delete("/api/course/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM course WHERE id=?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json("Course berhasil dihapus");
  });
});

// login dan register 




// ================= RUN SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});