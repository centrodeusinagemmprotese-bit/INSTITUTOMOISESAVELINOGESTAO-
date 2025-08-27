// backend/routes/clientes.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Criar cliente
router.post("/", async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const result = await pool.query(
      "INSERT INTO clientes (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *",
      [nome, telefone, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

// Listar clientes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

// Buscar cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar cliente" });
  }
});

// Atualizar cliente
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
    const result = await pool.query(
      "UPDATE clientes SET nome=$1, telefone=$2, email=$3 WHERE id=$4 RETURNING *",
      [nome, telefone, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

// Deletar cliente
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM clientes WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ message: "Cliente removido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
});

export default router;

