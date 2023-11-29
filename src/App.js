import Tela404 from "./telas/Tela404";
import TelaMenu from "./telas/TelaMenu";
import TelaCadVisitantes from "./telas/TelaCadVisitantes";
import TelaCadAgendamento from "./telas/TelaCadAgendamento";
import TelaCadastroCategorias from "./telas/TelaCadCategorias";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroVisitantes" element={<TelaCadVisitantes/>}/>
          <Route path="/cadastroAgendamento" element={<TelaCadAgendamento/>}/>
          <Route path="/cadastroCategorias" element={<TelaCadastroCategorias/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
