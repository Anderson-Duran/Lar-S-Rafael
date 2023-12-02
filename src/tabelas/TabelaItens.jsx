import { Button, Container, Table } from "react-bootstrap"

export default function TabelaItensSugestoes(props){

    return (
        <Container className="m-3 border">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="text-center">Código da Sugestão</th>
                        <th className="text-center">Autor da Sugestão</th>
                        <th className="text-center">Sugestão</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaItens?.map((item, indice)=>{
                            return <tr key={indice}>
                                <td className="text-center">{item.ID}</td>
                                <td className="text-center">{item.nome}</td>
                                <td className="text-center">{item.sugestao}</td>
                                <td className="text-center">
                                    <Button onClick={()=>{
                                        const lista = props.listaItens.filter((prod) => prod.ID !== item.ID);
                                        props.setPrestador({...props.dados, sugestoes:lista});
                                        props.setListaItens(lista);
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-x" viewBox="0 0 16 16">
                                            <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>

        </Container>
    )
}