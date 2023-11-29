import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";



export default function Menu(props) {

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
      };

    const dropdown={
        color: 'white'
    }

    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
            <Container id="menu">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <NavbarCollapse><LinkContainer to="/" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer></NavbarCollapse>

                    <NavbarCollapse>
                        <NavDropdown title="PACIENTES" style={dropdown}>
                            <NavbarCollapse><LinkContainer to="/cadastroPacientes"><NavDropdown.Item><strong><font color="black">PACIENTES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                            <NavbarCollapse><LinkContainer to="/cadastroPacientes"><NavDropdown.Item><strong><font color="black">PACIENTES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                        </NavDropdown>
                    </NavbarCollapse>
                    <NavbarCollapse>
                        <NavDropdown title="TURMAS" style={dropdown}>
                            <NavbarCollapse><LinkContainer to="/cadastroTurma"><NavDropdown.Item><strong><font color="black">TURMAS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                            <NavbarCollapse><LinkContainer to="/cadastroTurma"><NavDropdown.Item><strong><font color="black">TURMAS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                        </NavDropdown>
                    </NavbarCollapse>
                    <NavbarCollapse>
                        <NavDropdown title="DOAÇÕES" style={dropdown}>
                            <NavbarCollapse><LinkContainer to="/cadastroDoacao"><NavDropdown.Item><strong><font color="black">DOAÇÃO</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                            <NavbarCollapse><LinkContainer to="/cadastroDoacao"><NavDropdown.Item><strong><font color="black">DOAÇÃO</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                        </NavDropdown>
                    </NavbarCollapse>
                    
                    <NavbarCollapse>
                        <NavDropdown title="VISITANTES" style={dropdown}>
                            <NavDropdown.Item><LinkContainer to="/cadastroVisitantes"><NavDropdown.Item><strong><font color="black">VISITANTES</font></strong></NavDropdown.Item></LinkContainer></NavDropdown.Item>
                            <NavDropdown.Item><LinkContainer to="/cadastroAgendamento"><NavDropdown.Item><strong><font color="black">AGENDAMENTO DE VISITA</font></strong></NavDropdown.Item></LinkContainer></NavDropdown.Item>
                            <NavDropdown.Item><LinkContainer to="/cadastroCategorias"><NavDropdown.Item><strong><font color="black">Categorias</font></strong></NavDropdown.Item></LinkContainer></NavDropdown.Item>
                        </NavDropdown>
                    </NavbarCollapse>

                    <NavbarCollapse>
                        <NavDropdown title="SUGESTÕES" style={dropdown}>
                        <LinkContainer to="/cadastroSugestao"><NavDropdown.Item><strong><font color="black">SUGESTÕES</font></strong></NavDropdown.Item></LinkContainer>
                        <LinkContainer to="/cadastroSugestao"><NavDropdown.Item><strong><font color="black">SUGESTÕES</font></strong></NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </NavbarCollapse>
                    
                    <Nav>
                        <Nav.Link href="/"><strong><font color="white">VOLTAR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}