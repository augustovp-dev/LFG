var database = require("../database/config");

function criar(nome, tipo, posicao, modo, overall, ritmo, chute, passe, drible, defesa, fisico, fkUsuario) {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function criar():", nome, overall);

    var instrucaoSql = `
        INSERT INTO cartas (nome, tipo, posicao, modo, overall, ritmo, chute, passe, drible, defesa, fisico, fk_usuario)
        VALUES ('${nome}', '${tipo}', '${posicao}', '${modo}', ${overall}, ${ritmo}, ${chute}, ${passe}, ${drible}, ${defesa}, ${fisico}, ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodas() {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function listarTodas()");

    var instrucaoSql = `
        SELECT c.id_carta AS id, c.nome, c.tipo, c.posicao, c.modo, c.overall,
               c.ritmo, c.chute, c.passe, c.drible, c.defesa, c.fisico,
               c.data_criacao, u.nome AS usuarioNome, c.fk_usuario AS usuarioId
        FROM cartas c
        JOIN usuarios u ON u.id_usuario = c.fk_usuario
        ORDER BY c.overall DESC, c.data_criacao ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(fkUsuario) {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function listarPorUsuario():", fkUsuario);

    var instrucaoSql = `
        SELECT * FROM cartas 
        WHERE fk_usuario = ${fkUsuario}
        ORDER BY overall DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idCarta) {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function deletar():", idCarta);

    var instrucaoSql = `
        DELETE FROM cartas WHERE id_carta = ${idCarta};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterIndicadores() {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function obterIndicadores()");

    var instrucaoSql = `
        SELECT 
            COUNT(*) AS totalCartas,
            ROUND(AVG(overall), 1) AS overallMedio,
            MAX(overall) AS maiorOverall
        FROM cartas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarJogadoresUnicos() {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function contarJogadoresUnicos()");

    var instrucaoSql = `
        SELECT COUNT(DISTINCT nome) AS jogadoresUnicos FROM cartas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarHistorico(fkUsuario, overall, posicao, modo) {
    console.log("ACESSEI O CARTA MODEL \n \n\t\t >> function registrarHistorico()");

    var instrucaoSql = `
        INSERT INTO historico_overall (fk_usuario, overall, posicao, modo)
        VALUES (${fkUsuario}, ${overall}, '${posicao}', '${modo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    criar,
    listarTodas,
    listarPorUsuario,
    deletar,
    obterIndicadores,
    contarJogadoresUnicos,
    registrarHistorico
};
...