import app from "./src/app.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('🤒 ¡Ha ocurrido un error al intentar inicial el Servidor Express!');
    console.error(err.message);
    process.exit(1);
  }

  console.info(`🚀 Servidor NodeJS + Express corriendo en el puerto ${PORT}`);
});
