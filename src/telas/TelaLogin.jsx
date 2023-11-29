import Cabecalho from "../templates/Cabecalho";
import FormSignIn from "../formularios/FormSignIn";

import React from 'react'
import { Container } from "react-bootstrap";

function TelaLogin() {
    return (
        <>
            <Cabecalho texto="Central de Gerenciamento" />
            <Container style={{height:"80vh"}} className="w-25 d-flex align-items-center">
                <FormSignIn />
            </Container>

        </>
    )
}

export default TelaLogin