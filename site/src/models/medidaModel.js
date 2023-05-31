var database = require("../database/config");

function buscarUltimasMedidas(idNotebook, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idNotebook}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT porcentagemUsoMemoria, porcentagemUsoProcessador, dataHora, DATE_FORMAT
        (dataHora,'%H:%i:%s') as momento_grafico 
        FROM dadosCapturados WHERE fkNotebook = ${idNotebook} 
        order by idDadosCapturados desc limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idNotebook) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idNotebook} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT porcentagemUsoMemoria, porcentagemUsoProcessador, dataHora, DATE_FORMAT
        (dataHora,'%H:%i:%s') as momento_grafico 
        FROM dadosCapturados WHERE fkNotebook = ${idNotebook} 
        order by idDadosCapturados desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function qtdTotal() {
    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idNotebook} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        quantidade_total, classificacao
    FROM (
        SELECT
            classificacao,
            COUNT(*) AS quantidade_total
        FROM (
            SELECT
                dc.fkNotebook,
                CASE
					WHEN (dc.porcentagemUsoMemoria > 70 ) OR (dc.porcentagemUsoProcessador > 60) THEN 'Crítico'
                    WHEN (dc.porcentagemUsoMemoria >= 60) AND (dc.porcentagemUsoProcessador >= 25) THEN 'Normal'
                    ELSE 'Alerta'
                    -- WHEN (dc.porcentagemUsoMemoria BETWEEN 0 AND 59.9) OR (dc.porcentagemUsoProcessador BETWEEN 0 AND 24.9) THEN 'Alerta'
                END AS classificacao
            FROM dadosCapturados dc
            JOIN (
                SELECT fkNotebook, MAX(idDadosCapturados) AS lastMeasure
                FROM dadosCapturados
                GROUP BY fkNotebook
            ) sub ON dc.fkNotebook = sub.fkNotebook AND dc.idDadosCapturados = sub.lastMeasure
        ) subquery
        WHERE classificacao IS NOT NULL -- Adicione essa condição para filtrar classificações nulas (que não se enquadram nos casos definidos acima)
        GROUP BY classificacao
    ) result;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUsuarioResponsavel(idNotebook) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idNotebook} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT idNotebook, usuarioResponsavel as nome FROM notebook 
        WHERE idNotebook = ${idNotebook}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    qtdTotal,
    buscarUsuarioResponsavel
}
