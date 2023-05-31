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

  var instrucao;

  if(process.env.AMBIENTE_PROCESSO === "producao"){
    var instrucao = `
    INSERT INTO ranking (qtdPontuacao, fkUsuario, fkEmpresa) VALUES ('${qtdPontuacao}', '${fkUsuario}', '${fkEmpresa}');
    `;
  } else if(process.env.AMBIENTE_PROCESSO === "desenvolvimento") {
    var instrucao = `
    INSERT INTO ranking (qtdPontuacao, fkUsuario, fkEmpresa) VALUES ('${qtdPontuacao}', '${fkUsuario}', '${fkEmpresa}');
    `;
  } else {
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
}

function atualizarRanking(qtdPontuacao, fkUsuario, fkEmpresa) {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao;

  if(process.env.AMBIENTE_PROCESSO === "producao"){
    var instrucao = `
    UPDATE Ranking SET qtdPontuacao = qtdPontuacao + '${qtdPontuacao}' WHERE fkUsuario = '${fkUsuario}' AND fkEmpresa = '${fkEmpresa}';
    `;
  } else if(process.env.AMBIENTE_PROCESSO === "desenvolvimento") {
    var instrucao = `
    UPDATE Ranking SET qtdPontuacao = qtdPontuacao + '${qtdPontuacao}' WHERE fkUsuario = '${fkUsuario}' AND fkEmpresa = '${fkEmpresa}';
    `;
  } else {
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
}


function selecionarRanking() {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao;

  if(process.env.AMBIENTE_PROCESSO === "producao"){
    var instrucao = `
    SELECT fkUsuario FROM ranking;
    `;
  } else if(process.env.AMBIENTE_PROCESSO === "desenvolvimento") {
    var instrucao = `
    SELECT fkUsuario FROM ranking;
    `;
  } else {
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
}


function selecionarRankingFiltrado() {
  console.log(
    "ACESSEI O dados MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): "
  );

  var instrucao;

  if(process.env.AMBIENTE_PROCESSO === "producao"){
    var instrucao = `
    SELECT u.nome, r.qtdPontuacao FROM ranking r JOIN usuario u ON r.fkUsuario = u.idUsuario ORDER BY r.qtdPontuacao DESC;
    `;
  } else if(process.env.AMBIENTE_PROCESSO === "desenvolvimento") {
    var instrucao = `
    SELECT u.nome, r.qtdPontuacao FROM ranking r JOIN usuario u ON r.fkUsuario = u.idUsuario ORDER BY r.qtdPontuacao DESC;
    `;
  } else {
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
}


module.exports = {
  selecionar_tudo,
  inserirRanking,
  atualizarRanking,
  selecionarRanking,
  selecionarRankingFiltrado
};
