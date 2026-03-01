const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

// Thư mục lưu ảnh bìa sách
const UPLOAD_DIR = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Cấu trúc Book: MaSach, Tensach, Giaban, Mota, Anhbia, Ngaycapnhat, Soluongton, MaCD, MaNXB
let nextId = 4;
let database = [
  {
    MaSach: 1,
    Tensach: "Giáo trình Tin học cơ bản",
    Giaban: 26000,
    Mota: "Nội dung của cuốn: Tin Học Cơ Bản Windows XP gồm có 7 chương...",
    Anhbia: "THCB.jpg",
    Ngaycapnhat: "2014-10-25T00:00:00",
    Soluongton: 120,
    MaCD: 7,
    MaNXB: 1,
  },
  {
    MaSach: 2,
    Tensach: "Giáo trình Cơ Sở Dữ Liệu Với Visual Basic 2005 Và ADO.NET 2.0",
    Giaban: 12000,
    Mota: "Cuốn sách này gồm 3 phần sau: Phần 1: Xử lý văn bản...",
    Anhbia: "TH004.jpg",
    Ngaycapnhat: "2013-10-23T00:00:00",
    Soluongton: 25,
    MaCD: 3,
    MaNXB: 2,
  },
  {
    MaSach: 3,
    Tensach: "Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web",
    Giaban: 20000,
    Mota: "Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web Với Cơ Sở Dữ Liệu...",
    Anhbia: "LTWeb2005.jpg",
    Ngaycapnhat: "2014-09-15T00:00:00",
    Soluongton: 240,
    MaCD: 8,
    MaNXB: 4,
  },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(database);
});

// GET book by id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = database.find((b) => b.MaSach === id);
  if (!book) {
    return res.status(404).json({ error: "Sách không tồn tại" });
  }
  res.json(book);
});

// POST upload cover image - returns filename for use in Anhbia
app.post("/books/upload-cover", (req, res) => {
  if (!req.files || !req.files.anhbia) {
    return res.status(400).json({ error: "Chưa chọn file ảnh bìa" });
  }
  const file = req.files.anhbia;
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  file.mv(filepath, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ filename });
  });
});

// POST create new book
app.post("/books", (req, res) => {
  const body = req.body;
  const book = {
    MaSach: nextId++,
    Tensach: body.Tensach || "",
    Giaban: parseFloat(body.Giaban) || 0,
    Mota: body.Mota || "",
    Anhbia: body.Anhbia || "",
    Ngaycapnhat: body.Ngaycapnhat || new Date().toISOString().slice(0, 19).replace("T", " "),
    Soluongton: parseInt(body.Soluongton, 10) || 0,
    MaCD: parseInt(body.MaCD, 10) || 0,
    MaNXB: parseInt(body.MaNXB, 10) || 0,
  };
  database.push(book);
  res.status(201).json(book);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = database.findIndex((b) => b.MaSach === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Sách không tồn tại" });
  }
  const body = req.body;
  database[idx] = {
    MaSach: id,
    Tensach: body.Tensach !== undefined ? body.Tensach : database[idx].Tensach,
    Giaban: body.Giaban !== undefined ? parseFloat(body.Giaban) : database[idx].Giaban,
    Mota: body.Mota !== undefined ? body.Mota : database[idx].Mota,
    Anhbia: body.Anhbia !== undefined ? body.Anhbia : database[idx].Anhbia,
    Ngaycapnhat: body.Ngaycapnhat !== undefined ? body.Ngaycapnhat : database[idx].Ngaycapnhat,
    Soluongton: body.Soluongton !== undefined ? parseInt(body.Soluongton, 10) : database[idx].Soluongton,
    MaCD: body.MaCD !== undefined ? parseInt(body.MaCD, 10) : database[idx].MaCD,
    MaNXB: body.MaNXB !== undefined ? parseInt(body.MaNXB, 10) : database[idx].MaNXB,
  };
  res.json(database[idx]);
});

// PUT update book by BookId in request body (Exercise 44 format)
app.put("/books", (req, res) => {
  const requestBookId = req.body.BookId ?? req.body.MaSach;
  const book = database.find((x) => {
    const currentId = x.BookId ?? x.MaSach;
    return String(currentId) === String(requestBookId);
  });

  if (book) {
    if (req.body.BookName !== undefined) {
      book.BookName = req.body.BookName;
      if ("Tensach" in book) book.Tensach = req.body.BookName;
    }
    if (req.body.Price !== undefined) {
      book.Price = req.body.Price;
      if ("Giaban" in book) book.Giaban = req.body.Price;
    }
    if (req.body.Image !== undefined) {
      book.Image = req.body.Image;
      if ("Anhbia" in book) book.Anhbia = req.body.Image;
    }
  }

  res.send(database);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = database.findIndex((b) => b.MaSach === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Sách không tồn tại" });
  }
  database.splice(idx, 1);
  res.status(204).send();
});

app.get("/", (req, res) => {
  res.send("RESTful API - Quản lý sách");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
