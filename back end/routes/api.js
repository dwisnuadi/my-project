import express from "express";
import db from "../config/db.js";
import authRouters from "./authRoutes.js"

const router = express.Router();

router.use("/auth", authRouters);

// TEST CONNECTION
router.get("/course", async (req, res) => {
  try {
    const data = await db("course");
    console.log("DATA:", data); 
    res.json(data);
  } catch (err) {
    console.log("ERROR:", err); 
    res.status(500).json({ error: err.message });
  }
});

// GET DATA
router.get("/course", async (req, res) => {
  try {
    const data = await db("course");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// INSERT DATA
router.post("/course", async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await db("course").insert({
      title,
      description,
    });

    res.json({ message: "Insert success", id: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;