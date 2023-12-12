import express from "express";
import rotaAgenda from "./Rotas/rotaAgenda.js";
import rotaProjeto from "./Rotas/rotaProjeto.js";
import rotaPrestador from "./Rotas/rotaPrestador.js";
import cors from "cors";

const app =  express();

app.use(cors({origin:"*"}))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/sugestoes', rotaAgenda);
app.use('/projetos', rotaProjeto);
app.use('/prestadores', rotaPrestador)

app.listen(4039, ()=>{
    console.log("Backend ouvindo na porta 4039");
});

//, '0.0.0.0'