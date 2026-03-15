import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/back end/foto", express.static("public/images"));

const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "/foto");
  },
  filename : function (req, file, cb) {
    cb(null, Date.now() +"_" + file.originalname);
  }
});

const upload = multer({ storage: storage });

let courses = [];

app.post("/course", upload.single("image"), (req, res) => {

const newCourse = {
id: Date.now(),
title: req.body.title,
description: req.body.description,
price: req.body.price,
tutor: req.body.tutor,
experience: req.body.experience,
tutorImage: req.body.tutorImage,
image: req.file.filename
};

courses.push(newCourse);

res.json(newCourse);
});

app.get("/course", (req,res)=>{
res.json(courses);
});

app.listen(5000, ()=>{
console.log("Server running on port 5000");
});

app.get ("/course", (req, res) => {
  res.json ({
    massage : "list course",
    data : []
  });
});

app.post("/course", (req, res) => {
  
  if (!req.body) {
    return req.status(400).json({
      massege: "body request kosong"
    });
  }
  const { title, description, image, price } = req.body;

  console.log(req.body);

  res.json({
    message: "Course berhasil ditambahkan",
    data: { title, description, image, price }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});