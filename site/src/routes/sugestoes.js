var express = require("express");
var router = express.Router();

var sugestoesController = require("../controllers/sugestoesController");

router.get("/", function (req, res) {
    sugestoesController.testar(req, res);
});

router.get("/listar", function (req, res) {
    sugestoesController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    sugestoesController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    sugestoesController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    sugestoesController.publicar(req, res);
});

router.put("/editar/:idSugestao", function (req, res) {
    sugestoesController.editar(req, res);
});

router.delete("/deletar/:idSugestao", function (req, res) {
    sugestoesController.deletar(req, res);
});

module.exports = router;