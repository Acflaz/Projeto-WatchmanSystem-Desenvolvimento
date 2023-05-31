var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(usuario, senha, opcao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", usuario, senha, opcao)
    var instrucao = `
        SELECT * FROM usuario WHERE nome = '${usuario}' AND senha = '${senha}' AND tipo = '${opcao}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar_empresa(nomeFantasia, cnpj, email, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", nomeFantasia, cnpj, email, telefone);
    
    var instrucao;

    if (process.env.AMBIENTE_PROCESSO === 'producao') {
        instrucao = `
            INSERT INTO empresa (nomeFantasia, cnpj, emailResponsavel, telefone) VALUES ('${nomeFantasia}', '${cnpj}', '${email}', '${telefone}');
            SELECT * FROM empresa WHERE idEmpresa = SCOPE_IDENTITY();
        `;
    } else {
        instrucao = `
            INSERT INTO empresa (nomeFantasia, cnpj, emailResponsavel, telefone) VALUES ('${nomeFantasia}', '${cnpj}', '${email}', '${telefone}');
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 

function cadastrar_usuario(nomeUsuario, email, senha, opcao, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", nomeUsuario, email, senha, opcao, idEmpresa);
    
    var instrucao;

    if(process.env.AMBIENTE_PROCESSO === 'producao'){
        instrucao = `
            INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeUsuario}', '${email}', '${senha}', '${opcao}', '${idEmpresa}');
            SELECT * FROM usuario WHERE idUsuario = SCOPE_IDENTITY();
            `;
    }else{
        instrucao = `
            INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeUsuario}', '${email}', '${senha}', '${opcao}', '${idEmpresa}');
            `;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function criar_maquina(nomeMarcaVar, nomeModeloVar, RAMVar, CPUVar, usuarioResponsavelVar, IPVar, idUsuario, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", nomeMarcaVar, nomeModeloVar, RAMVar, CPUVar, usuarioResponsavelVar, IPVar, idUsuario, idEmpresa);
    
    var instrucao;

    if (process.env.AMBIENTE_PROCESSO === 'producao') {
        instrucao = `
        INSERT INTO notebook (marca, modelo, capacidadeRAM, velocidadeCPU, usuarioResponsavel, ipNotebook, fkUsuario, fkEmpresa) VALUES ('${nomeMarcaVar}','${nomeModeloVar}', '${RAMVar}', '${CPUVar}', '${usuarioResponsavelVar}', '${IPVar}', '${idUsuario}', '${idEmpresa}');
        SELECT * FROM empresa WHERE idEmpresa = SCOPE_IDENTITY();
        `;
    } else {
        instrucao = `
        INSERT INTO notebook (marca, modelo, capacidadeRAM, velocidadeCPU, usuarioResponsavel, ipNotebook, fkUsuario, fkEmpresa) VALUES ('${nomeMarcaVar}','${nomeModeloVar}', '${RAMVar}', '${CPUVar}', '${usuarioResponsavelVar}', '${IPVar}', '${idUsuario}', '${idEmpresa}');
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 

function excluir_maquina(nomeMarcaVar, IPVar, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", nomeMarcaVar, IPVar, idEmpresa);
    
    var instrucao;

    if (process.env.AMBIENTE_PROCESSO === 'producao') {
        instrucao = `
        DELETE FROM notebook WHERE marca = '${nomeMarcaVar}' AND ipNotebook = '${IPVar}' AND fkEmpresa = '${idEmpresa}';
        SELECT * FROM empresa WHERE idEmpresa = SCOPE_IDENTITY();
        `;
    } else {
        instrucao = `
        DELETE FROM notebook WHERE marca = '${nomeMarcaVar}' AND ipNotebook = '${IPVar}' AND fkEmpresa = '${idEmpresa}';
        
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarMetricas(minimoCpuVar, minimoMemoriaVar, maximoCpuVar, maximoMemoriaVar, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", minimoCpuVar, minimoMemoriaVar, maximoCpuVar, maximoMemoriaVar, idEmpresa);
    
    var instrucao;
     
    if (process.env.AMBIENTE_PROCESSO === 'producao') {
       
        instrucao = `
        INSERT INTO alerta (minCpu, maxCpu, minMemoria, maxMemoria, fkEmpresa) VALUES ('${minimoCpuVar}','${minimoMemoriaVar}','${maximoCpuVar}', '${maximoMemoriaVar}', '${idEmpresa}');
        SELECT * FROM empresa WHERE idEmpresa = SCOPE_IDENTITY();

        `;
    } else {
        instrucao = `
        INSERT INTO alerta (minCpu, maxCpu, minMemoria, maxMemoria, fkEmpresa) VALUES ('${minimoCpuVar}','${minimoMemoriaVar}', '${maximoCpuVar}', '${maximoMemoriaVar}', '${idEmpresa}');
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} 

function updateForm(minimoCpuVar, minimoMemoriaVar, maximoCpuVar, maximoMemoriaVar, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():", minimoCpuVar, minimoMemoriaVar, maximoCpuVar, maximoMemoriaVar, idEmpresa);
    
    var instrucao;

    if (process.env.AMBIENTE_PROCESSO === 'producao') {
        instrucao = `
        UPDATE alerta SET minCpu = '${minimoCpuVar}', maxCpu = '${maximoCpuVar}', minMemoria = '${minimoMemoriaVar},' maxMemoria = '${maximoMemoriaVar}' WHERE fkEmpresa = '${idEmpresa}';
        SELECT * FROM empresa WHERE idEmpresa = SCOPE_IDENTITY();
        `;
    } else {
        instrucao = `
        UPDATE alerta SET minCpu = '${minimoCpuVar}', maxCpu = '${maximoCpuVar}', minMemoria = '${minimoMemoriaVar}', maxMemoria = '${maximoMemoriaVar}' WHERE fkEmpresa = '${idEmpresa}';
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar_empresa,
    cadastrar_usuario,
    criar_maquina,
    excluir_maquina,
    atualizarMetricas,
    updateForm,
    listar
};