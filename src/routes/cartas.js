var express = require("express");
var router = express.Router();

var cartaController = require("../controllers/cartaController");

router.post("/criar", function (req, res) {
    cartaController.criar(req, res);
});

router.get("/listar", function (req, res) {
    cartaController.listar(req, res);
});

router.delete("/deletar/:idCarta", function (req, res) {
    cartaController.deletar(req, res);
});

router.get("/indicadores", function (req, res) {
    cartaController.indicadores(req, res);
});

module.exports = router;
