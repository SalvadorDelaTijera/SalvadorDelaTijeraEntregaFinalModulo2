import express from "express";
import cors from "cors";

// Crear la aplicación.
const app = express();

// Middlewares de nivel aplicación:
// CORS
app.use(cors({
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  origin: "*",
}));
// Procesar respuestas y peticiones JSON
app.use(express.json());
// Procesar parámetros de la URL
app.use(express.urlencoded({extended: true}));

// Enrutadores:
// TODO: Agregar enrutadores.

export default app;