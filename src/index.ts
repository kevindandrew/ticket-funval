import express from "express";
import usuarioRouter from "./routes/usuario.route";
import ticketRouter from "./routes/ticket.route";
import authRouter from "./routes/auth.routes";

import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import path from "node:path";

const app = express();

app.use(express.json());

const swaggerDocumentPath = path.resolve("src/config/swagger-output.json");

if (fs.existsSync(swaggerDocumentPath)) {
  const swaggerDocument = JSON.parse(
    fs.readFileSync(swaggerDocumentPath, "utf-8"),
  );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use("/auth", authRouter);
app.use("/usuarios", usuarioRouter);
app.use("/tickets", ticketRouter);

app.listen(3000, () => {
  console.log(`servidor corriendo en http://localhost:3000`);
  console.log(
    `la documentacion de swagger corriendo en http://localhost:3000/api-docs`,
  );
});
