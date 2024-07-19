const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Tạo đối tượng express
const app = express();

// Định nghĩa thư mục chứa ảnh
const upload = multer({ dest: "uploads" });

// Cấu hình đường dẫn phục vụ file trong thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Cấu hình views engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Cấu hình route gallery
app.get("/gallery", (req, res) => {
  // Đọc tất cả ảnh trong thư mục uploads
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.error("Error when read file: ", err);
      return;
    }
    res.render("gallery", { images: files });
  });
});

// Cấu hình route upload
app.post("/upload", upload.single("image"), (req, res) => {
  res.redirect("/gallery");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
