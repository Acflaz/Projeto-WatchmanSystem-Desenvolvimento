var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//

router.post("/cadastrar_empresa", function (req, res) {
    usuarioController.cadastrar_empresa(req, res);
});

router.post("/cadastrar_usuario", function (req, res) {
    usuarioController.cadastrar_usuario(req, res);
});

router.post("/criar_maquina", function (req, res) {
    usuarioController.criar_maquina(req, res);
});

router.post("/excluir_maquina", function (req, res) {
    usuarioController.excluir_maquina(req, res);
});

router.post("/atualizarMetricas", function (req, res) {
    usuarioController.atualizarMetricas(req, res);
});

router.post("/updateForm", function (req, res) {
    usuarioController.updateForm(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;