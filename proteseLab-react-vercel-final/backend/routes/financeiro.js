// backend/routes/financeiro.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Registrar lançamento financeiro
router.post("/", async (req, res) => {
  try {
    const { servico_id, tipo, valor, data } = req.body;
    const result = await pool.query(
      "INSERT INTO financeiro (servico_id, tipo, valor, data) VALUES ($1, $2, $3, $4) RETURNING *",
      [servico_id, tipo, valor, data]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar lançamento financeiro" });
  }
});

// Listar lançamentos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.id, f.tipo, f.valor, f.data, s.descricao AS servico
      FROM financeiro f
      LEFT JOIN servicos s ON s.id = f.servico_id
      ORDER BY f.data DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar lançamentos" });
  }
});

// Extrato por período
router.get("/extrato", async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    const result = await pool.query(
      "SELECT * FROM financeiro WHERE data BETWEEN $1 AND $2 ORDER BY data ASC",
      [inicio, fim]
    );

    const totalEntradas = result.rows
      .filter(r => r.tipo === "entrada")
      .reduce((sum, r) => sum + Number(r.valor), 0);

    const totalSaidas = result.rows
      .filter(r => r.tipo === "saida")
      .reduce((sum, r) => sum + Number(r.valor), 0);

    res.json({
      extrato: result.rows,
      saldo: totalEntradas - totalSaidas,
      totalEntradas,
      totalSaidas
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar extrato" });
  }
});

export default router;
