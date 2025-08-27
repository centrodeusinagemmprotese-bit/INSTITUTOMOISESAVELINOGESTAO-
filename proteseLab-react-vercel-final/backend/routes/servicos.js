// backend/routes/servicos.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Criar serviço
router.post("/", async (req, res) => {
  try {
    const { cliente_id, descricao, valor, status } = req.body;
    const result = await pool.query(
      "INSERT INTO servicos (cliente_id, descricao, valor, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [cliente_id, descricao, valor, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar serviço" });
  }
});

// Listar serviços
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.descricao, s.valor, s.status, c.nome AS cliente
      FROM servicos s
      JOIN clientes c ON c.id = s.cliente_id
      ORDER BY s.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
});

// Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM servicos WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar serviço" });
  }
});

// Atualizar serviço
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, valor, status } = req.body;
    const result = await pool.query(
      "UPDATE servicos SET descricao=$1, valor=$2, status=$3 WHERE id=$4 RETURNING *",
      [descricao, valor, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar serviço" });
  }
});

// Deletar serviço
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM servicos WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }
    res.json({ message: "Serviço removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar serviço" });
  }
});

export default router;
