import { useState, useRef } from "react";
import { Form, Container } from "react-bootstrap";
import '../Estilizacao/Estilo.css';

export default function BarraBusca({placeHolder, dados, campoChave, campoBusca, funcaoSelecao, valor}){
    const inputBusca = useRef();
    const [termoBusca, setTermoBusca] = useState(valor?valor: "");
    const [dadosLista, setDadosLista] = useState(dados);
    const [itemSelecionado, setItemSlecionado] = useState(false);
    

    function filterResult(){
        setDadosLista(dados.filter((item)=>{
            return termoBusca.length > 1 ? item[campoBusca].toLowerCase().includes(termoBusca.toLowerCase()):false
        }));
        let componenteResult = document.querySelector('[data-result]');
        if (dadosLista.length > 0){
            componenteResult.style.display='block';
        }
        else {
            componenteResult.style.display='none';
        }
    }

    return(

        <Container>

            <div className="busca">

            <svg xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-x-square-fill" 
                viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                onAuxClick={()=>{
                    setTermoBusca('');
                    filterResult();
                    inputBusca.current.setAttribute('aria-invalid',true);
                    inputBusca.current.setCustomValidity("erro");
                }}/>
            </svg>
            
            <Form.Control
                id="barra"
                type="text"
                ref={inputBusca}
                placeholder={placeHolder}
                value={termoBusca}
                required
                onChange={e=>{
                    setTermoBusca(e.target.value.toLowerCase());
                    filterResult();
                    if(!itemSelecionado){
                        e.target.setAttribute('aria-invalid',true);
                        e.target.setCustomValidity('erro');
                    }
                    else{
                        e.target.removeAttribute('aria-invalid');
                        e.target.setCustomValidity("");
                    }
                }}>
            </Form.Control>

            
            </div>
            <div className="resultados">
                <ul data-result>
                    {
                        dadosLista.map(item => {
                            return <li key={item[campoChave]}
                                   onClick={()=>{
                                        setTermoBusca(item[campoBusca]);
                                        setItemSlecionado(true);
                                        funcaoSelecao(item);
                                        setItemSlecionado(false)
                                        //funcaoSelecao({})
                                        inputBusca.current.setCustomValidity("");
                                        let componenteResult = document.querySelector('[data-result]');
                                        componenteResult.style.display="none";
                                   }}>
                                        {item[campoChave] + '-' + item[campoBusca]} 
                                
                                    </li>
                        })
                    }

                </ul>

            </div>

        </Container>
    );

}