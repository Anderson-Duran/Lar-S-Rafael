import { Alert } from "react-bootstrap";

export default function Cabecalho(props){
    return(
        <div>
            <Alert id="titulo" variant='dark' className='text-center mb-0'><h1>{props.texto}</h1></Alert>
        </div>
    );
}