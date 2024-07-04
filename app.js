const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
const uploadDir = process.env.UPLOAD_DIR || "uploads";

// Asegúrate de que el directorio de subidas existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const clientName = req.body.clientName ? req.body.clientName : "Anonimo";
    cb(null, `${clientName}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos y para parsear el body
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Ruta de subida de archivos
app.post("/upload", upload.array("files"), (req, res) => {
  if (req.files) {
    res.send({ message: "Files uploaded successfully!" });
  } else {
    res.status(400).send({ message: "No files were uploaded." });
  }
});

// Cambia 'localhost' a '0.0.0.0' para que escuche en todas las interfaces de red
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
