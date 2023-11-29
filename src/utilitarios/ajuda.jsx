import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "./ajuda.css";

export default function Ajuda (props){
    const [mostrarAjuda, setMostrarAjuda] = useState(false);

  const abrirAjuda = () => {
    setMostrarAjuda(true);
  };

  const fecharAjuda = () => {
    setMostrarAjuda(false);
  };

  return (
    <div className="App">
      <Button onClick={abrirAjuda} variant="warning">Ajuda</Button>

      {mostrarAjuda && (
        <div className="tela-flutuante">
          <div className="conteudo-tela-flutuante">
            {props.texto}
            <br />
            <Button className="mt-4" onClick={fecharAjuda} variant="danger">Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
}