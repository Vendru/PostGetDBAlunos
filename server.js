const express = require('express');
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.listen(3001,()=>(console.log('Server rodando')))

const pgp = require("pg-promise")({});

const usuario = "progII"; 
const senha = "uffs";
const db =  pgp(`postgres://${usuario}:${senha}@192.168.253.155:5432/progII`);


server.post('/aluno', async(req, res)=>{
    const nome = req.body.nome
    const sobrenome = req.body.sobrenome
    const matricula = req.body.matricula
    let nome_completo = nome+" "+sobrenome;
    await db.none(
        "INSERT INTO aluno (nome, sobrenome, nome_completo, matricula) VALUES ($1, $2, $3, $4)",
        [nome, sobrenome, nome_completo, matricula]
    )
res.send("OK")
})

server.get('/aluno', async(req, res)=>{
    const aluno = await db.any("SELECT * FROM aluno;");
    res.send (aluno);
})
