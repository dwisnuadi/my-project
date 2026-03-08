const express = require("express");
const routers = express.Router();
const knex = require (../config/db.js);

routers.get ("/course", async (req , res ) => {
    const course = await knex ("course")
    res.json(course)
});

routers.post ("/couse", async (req , res) => {
    const {title, description, image, price} =  req.body;

    await knex ("course").insert({
        title,
        description,
        image,
        price,
    });

    res.json ({massage: "course berhasil di tambahkan"});
});

routers.put ("/couse/:id",async (req , res) => {
    const {id} = req.params
    const {title, description,image, price} = req.body

    await knex ("course")
    .whare({id})
    .update({title, description, image, price});

    res.json ({massage: "course bersahil di update"});
});

routers.delete ("/course/:id", async (req, res) => {
    const {id} = req.params

    await knex("course").whare({id}).del();

    res.json ({massage:"course telah di hapus" });

});

module.exports = routers;