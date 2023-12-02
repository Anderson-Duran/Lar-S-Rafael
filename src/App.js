import Tela404 from "./telas/Tela404";
import TelaLogin from "./telas/TelaLogin";
import TelaMenu from "./telas/TelaMenu";
import TelaCadVisitantes from "./telas/TelaCadVisitantes";
import TelaCadAgendamento from "./telas/TelaCadAgendamento";
import TelaCadastroCategorias from "./telas/TelaCadCategorias";
import TelaCadPacientes from "./telas/TelaCadPacientes";
import TelaCadMedicacoes from "./telas/TelaCadMedicacoes";
import TelaCadUser from "./telas/TelaCadUser";
import TelaCadSugestao from "./telas/TelaCadSugestao";
import TelaCadProjeto from "./telas/TelaCadProjeto";
import TelaCadPrestador from "./telas/TelaCadPrestador";
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
