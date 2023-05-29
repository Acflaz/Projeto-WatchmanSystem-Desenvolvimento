var dadosModel = require("../models/dadosModel");

function selecionar_tudo(req, res) {
    dadosModel.selecionar_tudo().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirRanking(req, res) {
    var qtdPontuacao = req.body.qtdPontuacaoServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;


    // Faça as validações dos valores
    if (qtdPontuacao == undefined) {
        res.status(400).send("A pontuação está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("O usuario está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A empresa está undefined!");
    } else {

        dadosModel.inserirRanking(qtdPontuacao, fkUsuario, fkEmpresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao inserir os pontos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}


function atualizarRanking(req, res) {
    var qtdPontuacao = req.body.qtdPontuacaoServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;


    // Faça as validações dos valores
    if (qtdPontuacao == undefined) {
        res.status(400).send("A pontuação está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("O usuario está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A empresa está undefined!");
    } else {

        dadosModel.atualizarRanking(qtdPontuacao, fkUsuario, fkEmpresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao inserir os pontos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function selecionarRanking(req, res) {
    dadosModel.selecionarRanking().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o ranking: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function selecionarRankingFiltrado(req, res) {
    dadosModel.selecionarRankingFiltrado().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o ranking: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    selecionar_tudo,
    inserirRanking,
    atualizarRanking,
    selecionarRanking,
    selecionarRankingFiltrado
}