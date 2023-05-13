var express = require("express");
var router = express.Router();

var votoController = require("../controllers/votoController");

router.get("/", function (req, res) {
    votoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    votoController.listar(req, res);
});


//Recebendo os dados do html e direcionando para a função votar de usuarioController.js
router.put("/votar/:idUsuario", function (req, res) {
    votoController.votar(req, res);
});

router.put("/editar/:idUsuario", function (req, res) {
    votoController.editar(req, res);
});
                                                                                                
module.exports = router;