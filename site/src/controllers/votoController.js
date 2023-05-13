var votoModel = require("../models/votoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO VOTO Controller");
    res.send("ENTRAMOS NO VOTO CONTROLLER");
}

function listar(req, res) {
    votoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os votos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function votar(req, res) {
    var fkPersonagem = req.body.fkPersonagemServer;
    var idUsuario = req.body.idUsuarioServer;

    if (fkPersonagem == "select") {
        res.status(400).send("O personagem está indefinido");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        votoModel.votar(fkPersonagem, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
    
}

function editar(req, res) {
    var novoPersonagem = req.body.fkPersonagem;
    var idUsuario = req.params.idUsuario;

    votoModel.editar(novoPersonagem, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

module.exports = {
    testar,
    listar,
    votar,
    editar
}