var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

router.get("/selecionar_tudo", function (req, res) {
  dadosController.selecionar_tudo(req, res);
});

router.post("/inserirRanking", function (req, res) {
  dadosController.inserirRanking(req, res);
})

router.post("/atualizarRanking", function (req, res) {
  dadosController.atualizarRanking(req, res);
})

router.get("/selecionarRanking", function (req, res) {
  dadosController.selecionarRanking(req, res);
})

router.get("/selecionarRankingFiltrado", function (req, res) {
  dadosController.selecionarRankingFiltrado(req, res);
})

module.exports = router;