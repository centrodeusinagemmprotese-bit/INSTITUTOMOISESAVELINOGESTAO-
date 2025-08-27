// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import clientesRoutes from "./routes/clientes.js";
import servicosRoutes from "./routes/servicos.js";
import financeiroRoutes from "./routes/financeiro.js";
import usuariosRoutes from "./routes/usuarios.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/clientes", clientesRoutes);
app.use("/api/servicos", servicosRoutes);
app.use("/api/financeiro", financeiroRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
