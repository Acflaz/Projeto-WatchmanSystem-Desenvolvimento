var database = require("../database/config");

function selecionar_tudo() {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao = `
  SELECT * FROM dadosCapturados;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function inserirRanking(qtdPontuacao, fkUsuario, fkEmpresa) {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao = `
    INSERT INTO ranking values (null, ${qtdPontuacao}, ${fkUsuario}, ${fkEmpresa});
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarRanking(qtdPontuacao, fkUsuario, fkEmpresa) {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao = `
    UPDATE ranking SET qtdPontuacao = qtdPontuacao + (${qtdPontuacao}) WHERE fkUsuario = ${fkUsuario} AND fkEmpresa = ${fkEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


function selecionarRanking() {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao = `
  SELECT fkUsuario FROM ranking;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


function selecionarRankingFiltrado() {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao = `
  SELECT U.nome, R.qtdPontuacao
  FROM ranking R
  JOIN usuario U ON R.fkUsuario = U.idUsuario
  ORDER BY R.qtdPontuacao desc;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
  selecionar_tudo,
  inserirRanking,
  atualizarRanking,
  selecionarRanking,
  selecionarRankingFiltrado
};
