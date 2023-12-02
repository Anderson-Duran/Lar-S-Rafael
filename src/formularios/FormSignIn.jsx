import { useState, React, useRef, useContext } from "react";
import { Button, Container, FloatingLabel, FormLabel } from "react-bootstrap";
import { AuthContext } from "../contextos/authContext";
import { Form } from "react-bootstrap";
import { FloatingLabelProps } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


function FormSignIn() {
    const urlBase = 'https://129.146.68.51/aluno5-pfsii/users/login';
    const email = useRef('');
    const password = useRef('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        if (email.current.value !== '' && password.current.value !== '') {
            const userData = { email: email.current.value, password: password.current.value };
          
            try {
                const rawResponse = await fetch(urlBase, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                });

                if (!rawResponse.ok) {
                    window.alert(`Usuário ou Senha inválidos`);
                    return
                }

                const data = await rawResponse.json();

                const { token } = data;
                setUser(data.user);
                localStorage.setItem(data.token, JSON.stringify(data.user));
                document.cookie = `${data.user.email}=${data.token}; Secure; SameSite=None;`;
                navigate('/home');
                console.log(data);
                console.log("Token:", token);

                // Faça algo com o token aqui, por exemplo, armazenar em algum lugar.
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        }
    }


    return (
        <Container style={{ backgroundColor: "rgba(255,255,255,.8)" }} className="border rounded-2 p-5">
            <FormLabel className="d-block text-center fs-1 text-capitalized fw-bold mb-5">Sistema de Login</FormLabel>
            <Form className="d-flex flex-column gap-5">
                <FloatingLabel
                    controlId="floatingInput"
                    label="E-mail"
                >
                    <Form.Control ref={email} type="email" placeholder="Insira seu e-mail"></Form.Control>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label='Senha'
                >
                    <Form.Control ref={password} type="password" placeholder="Senha" />
                </FloatingLabel>
                <Button type="button" className="btn btn-primary" onClick={handleSubmit}>Entrar</Button>
            </Form>
        </Container>
    )
}

export default FormSignIn