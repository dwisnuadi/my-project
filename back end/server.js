import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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