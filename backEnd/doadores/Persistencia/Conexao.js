import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.conexao && global.conexao.status != "disconnected") {
    return global.conexao;
  }

  //const conexao = await mysql.createConnection({
  // host:"localhost",
  //user: "aluno45-pfsii",
  //password: "aluno45-pfsii",
  //database: "motoboys"
  //});

   //LOCAL
   
  const conexao = await mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "motoboys"
     });
    
      global.conexao = conexao;
      return conexao;
    }


    