var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idNotebook", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idNotebook", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/qtdTotal", function (req, res) {
    medidaController.qtdTotal(req, res);
});

router.get("/usuario/:idNotebook", function (req, res) {
    medidaController.buscarUsuarioResponsavel(req, res);
})

module.exports = router;