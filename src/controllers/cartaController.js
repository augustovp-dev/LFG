var cartaModel = require("../models/cartaModel");

function criar(req, res) {
    var nome = req.body.nomeServer;
    var tipo = req.body.tipoServer;
    var posicao = req.body.posicaoServer;
    var modo = req.body.modoServer;
    var overall = req.body.overallServer;
    var ritmo = req.body.ritmoServer;
    var chute = req.body.chuteServer;
    var passe = req.body.passeServer;
    var drible = req.body.dribleServer;
    var defesa = req.body.defesaServer;
    var fisico = req.body.fisicoServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (nome == undefined) return res.status(400).send("Nome está undefined!");
    if (overall == undefined) return res.status(400).send("Overall está undefined!");
    if (fkUsuario == undefined) return res.status(400).send("ID do usuário está undefined!");

    cartaModel.criar(nome, tipo, posicao, modo, overall, ritmo, chute, passe, drible, defesa, fisico, fkUsuario)
        .then(function (resultado) {
            cartaModel.registrarHistorico(fkUsuario, overall, posicao, modo)
                .then(function () {
                    res.json(resultado);
                })
                .catch(function () {
                    res.json(resultado);
                });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao criar a carta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res) {
    cartaModel.listarTodas()
        .then(function (resultado) {
            var cartasFormatadas = resultado.map(function (c) {
                return {
                    id: c.id,
                    nome: c.nome,
                    tipo: c.tipo,
                    posicao: c.posicao,
                    modo: c.modo,
                    overall: c.overall,
                    atributos: {
                        pac: c.ritmo,
                        sho: c.chute,
                        pas: c.passe,
                        dri: c.drible,
                        def: c.defesa,
                        phy: c.fisico
                    },
                    usuarioNome: c.usuarioNome,
                    usuarioId: c.usuarioId,
                    dataCriacao: c.data_criacao ? new Date(c.data_criacao).toLocaleDateString('pt-BR') : ''
                };
            });
            res.json(cartasFormatadas);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar cartas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function deletar(req, res) {
    var idCarta = req.params.idCarta;

    if (idCarta == undefined) {
        return res.status(400).send("ID da carta está undefined!");
    }

    cartaModel.deletar(idCarta)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao deletar a carta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function indicadores(req, res) {
    Promise.all([
        cartaModel.obterIndicadores(),
        cartaModel.contarJogadoresUnicos()
    ])
        .then(function ([resultIndicadores, resultUnicos]) {
            var indicadores = {
                totalCartas: resultIndicadores[0].totalCartas || 0,
                overallMedio: Math.round(resultIndicadores[0].overallMedio || 0),
                maiorOverall: resultIndicadores[0].maiorOverall || 0,
                jogadoresUnicos: resultUnicos[0].jogadoresUnicos || 0
            };
            res.json(indicadores);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao obter indicadores! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    criar,
    listar,
    deletar,
    indicadores
};