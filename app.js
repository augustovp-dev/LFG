var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT || 3333;
var HOST_APP = process.env.APP_HOST || 'localhost';

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var cartasRouter = require("./src/routes/cartas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/cartas", cartasRouter);

app.listen(PORTA_APP, function () {
    console.log(`\n    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  `);
    console.log(`    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  `);
    console.log(`    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   `);
    console.log(`    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    `);
    console.log(`    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     `);
    console.log(`    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      `);
    console.log(`    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  `);
    console.log(`\n`);
    console.log(`    ⚽  Le' Fut Goat - Servidor rodando!`);
    console.log(`    🌐  Acesse: http://${HOST_APP}:${PORTA_APP}`);
    console.log(`    📍  Ambiente: .:${process.env.AMBIENTE_PROCESSO || ambiente_processo}:.\n`);
});