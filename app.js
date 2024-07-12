const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5896;
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
    const clientName = req.body.clientName
      ? sanitizeFilename(req.body.clientName)
      : "Anonimo";
    cb(null, `${clientName}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 150 * 1024 * 1024 }, // Limitar tamaño máximo de archivo a 150MB
});

// Middleware para servir archivos estáticos y para parsear el body
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Ruta de subida de archivos
app.post("/upload", upload.array("files", 5), (req, res) => {
  if (req.files && req.files.length > 0) {
    res.status(200).send({ message: "Archivos subidos correctamente!" });
  } else {
    res.status(400).send({ message: "No se subieron archivos." });
  }
});
// Escucha solo en localhost (127.0.0.1)
app.listen(port, "200.58.106.131", () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
// Cambia 'localhost' a '0.0.0.0' para que escuche en todas las interfaces de red
//app.listen(port, "0.0.0.0", () => {
//console.log(`Servidor corriendo en http://localhost:${port}`);
//});

// Función para sanitizar el nombre del cliente
function sanitizeFilename(filename) {
  // Implementa tu lógica de sanitización aquí, por ejemplo, eliminando caracteres no deseados
  return filename.replace(/[^\w.-]/g, "_");
}
