const express = require('express');
//requisitando o modulo db
const db = require('./db');
//requisitando o modulo path
const path = require('path');

const app = express();
const port = 3000; // Porta do servidor

//configurando para receber page static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

// Configurando EJS como o mecanismo de visualização
app.set('view engine', 'ejs');

// Middleware para análise de dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para exibir o formulário
app.get('/', (req, res) => {
  res.render('form');
});

// Rota para lidar com o envio do formulário

app.post('/submit', async (req, res) => {

    // const formData = req.body; // Dados do formulário
    // console.log(formData);
    const clientes = await req.body;
    console.log(clientes);
    // Aqui você pode lidar com os dados recebidos do formulário

    // //requisitando o modulo db
    // const db = require('./db');

    //definir a consulta de INSERT
    console.log('Inserir novo cliente:');
    // console.log(clientes.nome);
    // console.log(clientes.idade);
    const nome = clientes.nome;
    const idade = clientes.idade;
    await db.insertClientes({nome: nome, idade: idade});
    console.log(clientes);

    // res.send('Dados do formulário recebidos com sucesso!');
    //listar na pagina submit:
    console.log('Obter todos os clientes:');
    const results = await db.selectClientes();
    console.log(results);

    res.render('index', {pessoas: results});

});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
