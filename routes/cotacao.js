const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /cotacao:
 *   get:
 *     summary: Retorna a cotação de venda de uma moeda entre duas datas
 *     parameters:
 *       - in: query
 *         name: moeda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Código da moeda (ex: USD, EUR)"
 *       - in: query
 *         name: inicio
 *         schema:
 *           type: string
 *         required: true
 *         description: "Data inicial no formato MM-DD-AAAA"
 *       - in: query
 *         name: fim
 *         schema:
 *           type: string
 *         required: true
 *         description: "Data final no formato MM-DD-AAAA"
 *     responses:
 *       200:
 *         description: Cotação retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cotacoes:
 *                   type: array
 *                   items:
 *                     type: number
 *       400:
 *         description: Parâmetros inválidos
 *       500:
 *         description: Erro ao buscar a cotação
 */
router.get('/', async (req, res) => {
  const { moeda, inicio, fim } = req.query;

  if (!moeda || !inicio || !fim) {
    return res.status(400).json({ erro: 'Parâmetros moeda, inicio e fim são obrigatórios.' });
  }

  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/` +
    `CotacaoMoedaPeriodoFechamento(codigoMoeda=@codigoMoeda,` +
    `dataInicialCotacao=@dataInicialCotacao,dataFinalCotacao=@dataFinalCotacao)?` +
    `@codigoMoeda='${moeda}'&@dataInicialCotacao='${inicio}'&@dataFinalCotacao='${fim}'` +
    `&$format=json&$select=cotacaoVenda`;

  try {
    const resposta = await axios.get(url);
    const cotacoes = resposta.data.value.map(c => c.cotacaoVenda);
    res.json({ cotacoes });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ erro: 'Erro ao buscar dados da API do Banco Central.' });
  }
});

module.exports = router;
