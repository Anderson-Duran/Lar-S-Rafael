import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React, { useContext } from "react";
import { AuthContext } from "../contextos/authContext";



export default function Menu(props) {

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
    };

    const dropdown = {
        color: 'white'
    }

    const { user, setUser } = useContext(AuthContext);

    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
            <Container id="menu">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <NavbarCollapse><LinkContainer to="/" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer></NavbarCollapse>

                    <NavbarCollapse>
                        <NavDropdown title="PACIENTES" style={dropdown}>
                            <NavbarCollapse><LinkContainer to="/cadastroPacientes"><NavDropdown.Item><strong><font color="black">PACIENTES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                            <NavbarCollapse><LinkContainer to="/cadastroMedicacoes"><NavDropdown.Item><strong><font color="black">FARMACOTERAPIA</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                        </NavDropdown>
                    </NavbarCollapse>
                    <NavbarCollapse>
                        <NavDropdown title="DOCENTES" id="basic-nav-dropdown" style={dropdown}>

                            <LinkContainer to="/cadastroCursos"><NavDropdown.Item><strong>CURSO</strong></NavDropdown.Item></LinkContainer>

                            <LinkContainer to="/cadastroProfessores"><NavDropdown.Item><strong>PROFESSOR</strong></NavDropdown.Item></LinkContainer>

                            <LinkContainer to="/cadastroTurmas"><NavDropdown.Item><strong>TURMAS</strong></NavDropdown.Item></LinkContainer>

                        </NavDropdown>
                    </NavbarCollapse>
                    <NavbarCollapse>
                        <NavDropdown title="DOAÇÕES" style={dropdown}>
                            <LinkContainer to="/cadastroMotoboys"><NavDropdown.Item><strong>Doadores</strong></NavDropdown.Item></LinkContainer>

                                <LinkContainer to="/cadastroEntrega"><NavDropdown.Item><strong>Voluntarios</strong></NavDropdown.Item></LinkContainer>

                                <LinkContainer to="/cadastroPedidos"><NavDropdown.Item><strong>Valores</strong></NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </NavbarCollapse>

                    <NavbarCollapse>
                        <NavDropdown title="VISITANTES" style={dropdown}>
                            <NavDropdown.Item><LinkContainer to="/cadastroVisitantes"><NavDropdown.Item><strong><font color="black">VISITANTES</font></strong></NavDropdown.Item></LinkContainer></NavDropdown.Item>
                            <NavDropdown.Item><LinkContainer to="/cadastroAgendamento"><NavDropdown.Item><strong><font color="black">AGENDAMENTO DE VISITA</font></strong></NavDropdown.Item></LinkContainer></NavDropdown.Item>
                            <NavDropdown.Item><LinkContainer to="/cadastroCategorias"><NavDropdown.Item><strong><font color="black">CATEGORIAS</font></strong></NavDropdown.Item></LinkContainer></NavDropdown.Item>
                        </NavDropdown>
                    </NavbarCollapse>

                    <NavbarCollapse>
                        <NavDropdown title="SUGESTÕES" style={dropdown}>
                            <LinkContainer to="/cadastroSugestao"><NavDropdown.Item><strong><font color="black">SUGESTÕES</font></strong></NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/TelaCadPrestador"><NavDropdown.Item><strong><font color="black">PRESTADORES</font></strong></NavDropdown.Item></LinkContainer>
                            <LinkContainer to="/TelaCadProjeto"><NavDropdown.Item><strong><font color="black">PROJETOS</font></strong></NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </NavbarCollapse>


                    {
                        user.isAdmin === true ? <NavbarCollapse><LinkContainer to="/cadastroUsuario"><NavDropdown.Item><strong><font color="white">GERENCIAR USUÁRIOS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse> : ''
                    }


                    <Nav>
                        <Nav.Link href="/"><strong><font color="white">SAIR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}