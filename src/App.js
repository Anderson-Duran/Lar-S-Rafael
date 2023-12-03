import Tela404 from "./telas/Tela404";
import TelaLogin from "./telas/TelaLogin";
import TelaMenu from "./telas/TelaMenu";
import TelaCadVisitantes from "./telas/TelaCadVisitantes";
import TelaCadAgendamento from "./telas/TelaCadAgendamento";
import TelaCadastroCategorias from "./telas/TelaCadCategorias";
import TelaCadPacientes from "./telas/TelaCadPacientes";
import TelaCadMedicacoes from "./telas/TelaCadMedicacoes";
import TelaCadProfessor from "./telas/TelaCadProfessor";
import TelaCadCurso from "./telas/TelaCadCursos";
import TelaCadTurma from "./telas/TelaCadTurma";
import TelaCadUser from "./telas/TelaCadUser";
import TelaCadSugestao from "./telas/TelaCadSugestao";
import TelaCadProjeto from "./telas/TelaCadProjeto";
import TelaCadPrestador from "./telas/TelaCadPrestador";
import TelaCadMotoboys from "./telas/TelaCadMotoboys";
import TelaCadEntrega from "./telas/TelaCadEntrega";
import TelaCadastroPedidos from "./telas/TelaCadPedidos";
import { useContext } from "react";
import { AuthContext } from "./contextos/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  const { user, setUser } = useContext(AuthContext);

  const Private = ({ children }) => {

    console.log(user);

    return !!user ? children : <TelaLogin />
  }


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TelaLogin />} />
          <Route path="/cadastroPacientes" element={<Private><TelaCadPacientes /></Private>} />
          <Route path="/cadastroVisitantes" element={<TelaCadVisitantes />} />
          <Route path="/cadastroAgendamento" element={<TelaCadAgendamento />} />
          <Route path="/cadastroCategorias" element={<TelaCadastroCategorias />} />
          <Route path="/cadastroMedicacoes" element={<TelaCadMedicacoes />} />
          <Route path="/cadastroUsuario" element={<Private><TelaCadUser /></Private>} />
          <Route exact path="/cadastroProfessores" element={<TelaCadProfessor/>}/>
          <Route path="/cadastroCursos" element={<TelaCadCurso/>}/>
          <Route path="/cadastroTurmas" element={<TelaCadTurma/>}/>
          <Route path="/cadastroSugestao" element={<TelaCadSugestao/>} />
          <Route path="/TelaCadPrestador" element={<TelaCadPrestador/>} />
          <Route path="/TelaCadProjeto" element={<TelaCadProjeto/>} />
          <Route path="/home" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
