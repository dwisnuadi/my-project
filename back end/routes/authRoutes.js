const express = import ("express");
const routers = express.Router();
const knex =  import ("./config/db.js");

// GET COURSE
routers.get("/course", async (req, res) => {
  const course = await knex("course");
  res.json(course);
});

// ADD COURSE
routers.post("/course", async (req, res) => {
  const { title, description, image, price } = req.body;

  await knex("course").insert({
    title,
    description,
    image,
    price,
  });

  res.json({ message: "course berhasil ditambahkan" });
});

// UPDATE COURSE
routers.put("/course/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price } = req.body;

  await knex("course")
    .where({ id })
    .update({ title, description, image, price });

  res.json({ message: "course berhasil di update" });
});

// DELETE COURSE
routers.delete("/course/:id", async (req, res) => {
  const { id } = req.params;

  await knex("course")
    .where({ id })
    .del();

  res.json({ message: "course telah di hapus" });
});

module.express = routers;   