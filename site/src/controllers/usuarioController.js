var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;
    var opcao = req.body.opcaoEscolhidaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if(opcao == undefined){
        res.status(400).send("A opção está indefinida!");
    } else {

        usuarioModel.entrar(usuario, senha, opcao)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar_empresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFantasia = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores
    if (nomeFantasia == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("O Cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O Email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("O Telefone está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_empresa(nomeFantasia, cnpj, email, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar_usuario(req, res) {
    var nomeUsuario = req.body.nomeUsuarioServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;
    var opcao = req.body.opcaoEscolhidaServer;

    if (nomeUsuario == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("A senha está undefined!"); 
    } else if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    } else if (opcao == undefined){
        res.status(400).send("A opção está undefined!");
    } else {
        usuarioModel.cadastrar_usuario(nomeUsuario, email, senha, opcao, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function criar_maquina(req, res) {
    var nomeMarcaVar = req.body.nomeMarcaServer;
    var nomeModeloVar = req.body.nomeModeloServer;
    var RAMVar = req.body.RAMServer;
    var CPUVar = req.body.CPUServer;
    var IPVar = req.body.IPServer;
    var idEmpresa = req.body.idEmpresaServer;
    var idUsuario = req.body.idUsuarioServer;

    if (idEmpresa == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (nomeMarcaVar == undefined) {
        res.status(400).send("A marca está undefined!");
    } else if (nomeModeloVar == undefined) {
        res.status(400).send("O modelo está undefined!"); 
    } else if (RAMVar == undefined) {
        res.status(400).send("A RAM está undefined!");
    } else if (CPUVar == undefined){
        res.status(400).send("A CPU está undefined!");
    } else if(IPVar == undefined){
        res.status(400).send("O IP do notebook está undefined!");
    } else if(idUsuario == undefined){
        res.status(400).send("O id do Usuário está undefined!");
    } else {
        usuarioModel.criar_maquina(nomeMarcaVar, nomeModeloVar, RAMVar, CPUVar, IPVar, idUsuario, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluir_maquina(req, res) {
    var nomeMarcaVar = req.body.nomeMarcaServer;
    var idEmpresa = req.body.idEmpresaServer;
    var IPVar = req.body.IPServer;

    if (idEmpresa == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (nomeMarcaVar == undefined) {
        res.status(400).send("A marca está undefined!");
    } else if(IPVar == undefined){
        res.status(400).send("O ip da máquina está undefined!");
    } else {
        usuarioModel.excluir_maquina(nomeMarcaVar, IPVar, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarMetricas(req, res) {
    var minimoCpuVar = req.body.minimoCpuServer;
    var minimoMemoriaVar = req.body.minimoMemoriaServer;
    var maximoCpuVar = req.body.maximoCpuServer;
    var maximoMemoriaVar = req.body.maximoMemoriaServer;
    var idEmpresa = req.body.idEmpresaServer;
    

           if (idEmpresa == undefined) {
        res.status(400).send("O id está undefined!");
    } else if (minimoCpuVar == undefined) {
        res.status(400).send("A miníma da CPU está undefined!");
    } else if (minimoMemoriaVar == undefined) {
        res.status(400).send("O minímo da memória está undefined!"); 
    } else if (maximoCpuVar == undefined) {
        res.status(400).send("A máxima da CPU está undefined!");
    } else if (maximoMemoriaVar == undefined){
        res.status(400).send("O máximo da memória está undefined!");
    } else{
        usuarioModel.atualizarMetricas(minimoCpuVar, minimoMemoriaVar, maximoCpuVar, maximoMemoriaVar, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização das métricas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updateForm(req, res) {
    var minimoCpuVar = req.body.minimoCpuServer;
    var minimoMemoriaVar = req.body.minimoMemoriaServer;
    var maximoCpuVar = req.body.maximoCpuServer;
    var maximoMemoriaVar = req.body.maximoMemoriaServer;
    var idEmpresa = req.body.idEmpresaServer;
    

           if (idEmpresa == undefined) {
        res.status(400).send("O id está undefined!");
    }else if (minimoCpuVar == undefined) {
        res.status(400).send("A miníma da CPU está undefined!");
    } else if (minimoMemoriaVar == undefined) {
        res.status(400).send("O minímo da memória está undefined!"); 
    } else if (maximoCpuVar == undefined) {
        res.status(400).send("A máxima da CPU está undefined!");
    } else if (maximoMemoriaVar == undefined){
        res.status(400).send("O máximo da memória está undefined!");
    } else{
        usuarioModel.updateForm(minimoCpuVar, minimoMemoriaVar, maximoCpuVar, maximoMemoriaVar, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização das métricas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar_empresa,
    cadastrar_usuario,
    criar_maquina,
    excluir_maquina,
    atualizarMetricas,
    updateForm,
    listar,
    testar
}