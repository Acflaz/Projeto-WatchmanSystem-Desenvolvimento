var database = require("../database/config");

function listar() {
    console.log("ACESSEI O voto  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT p.nomePersonagem, count(fkPersonagem) as votos 
        FROM Personagem p 
            LEFT JOIN Usuario u ON u.fkPersonagem = p.idPersonagem
            GROUP BY p.idPersonagem
            ORDER BY count(u.fkPersonagem) Desc limit 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function votar(fkPersonagem, idUsuario) {
    console.log("ACESSEI O voto MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", fkPersonagem, idUsuario);
    var instrucao = `
        UPDATE usuario SET fkPersonagem = ${fkPersonagem} WHERE idUsuario = ${idUsuario}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novoPersonagem, idUsuario) {
    console.log("ACESSEI O voto MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoPersonagem, idUsuario);
    var instrucao = `
        UPDATE usuario SET fkPersonagem = '${novoPersonagem}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    votar,
    editar
}
