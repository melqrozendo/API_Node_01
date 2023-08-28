const conectar = async () => {

    //verificação
    if(global.conexao && global.conexao.state != 'disconected'){
        return global.conexao;
    }
    //atribuir a mysql a string de conexao
    const mysql = require('mysql2/promise');
    const con = mysql.createConnection("mysql://root:bootyg22@localhost:3306/cadastro");
    console.log('Database connected..');
    //definir uma conexao global
    global.conexao = con;
    return con;
}

// conectar();


//SELECT**
const selectClientes = async ()=>{
    const con = await conectar();
    const [linhas] = await con.query('SELECT * FROM pessoas');
    return await linhas;
}

//INSERT**
const insertClientes = async(clientes) => {
    const con = await conectar();
    const sql = 'INSERT INTO pessoas (nome, idade) VALUES (?,?)';
    const valores = [clientes.nome, clientes.idade];
    console.log(clientes);
    console.log(clientes.nome);
    console.log(clientes.idade);
    await con.query(sql, valores);
}

module.exports = {selectClientes, insertClientes}
