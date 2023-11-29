import Modal from "react-modal";
import React from "react";

function HelpModal({ isOpen, onClose, title }) {

    const customStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "60%",
            padding: "20px",
        },
    };
    const btnStyle = {

        width: '7rem',
        fontSize: '1rem',
        padding: '.2rem',
        backgroundColor: '#3584E4',
        color: '#fff',
        borderRadius: '5px'

    }



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyle}
            title={title}
        >
            <div className="container">
                <h1>{title}</h1>
                    <p>Este formulário permite gerenciar os registros dos nossos pacientes de forma simples e eficiente. Aqui estão os recursos principais:<br /><br />

                        <b>Cadastro de Pacientes:</b><br />
                        Utilize o botão "Cadastrar" para adicionar um novo paciente ao sistema. Preencha os campos obrigatórios, como nome, idade, sexo e informações médicas, e clique em "Salvar".<br /><br />

                        <b>Atualização de Dados:</b><br />
                        Para atualizar as informações de um paciente existente, clique no botão "Editar". Isso abrirá um formulário preenchido com os detalhes atuais do paciente, onde você pode fazer as alterações necessárias e, em seguida, clique em "Atualizar".<br /><br />

                        <b>Exclusão de Pacientes:</b><br />
                        Se necessário, remova um paciente do sistema utilizando o botão "Deletar". Lembre-se: esta ação é irreversível e exclui permanentemente os dados do paciente do nosso registro.<br /><br />

                        <b>Pesquisa por Nome:</b><br />
                        Utilize a barra de pesquisa para encontrar um paciente específico pelo nome. Digite o nome no campo de pesquisa e pressione "Enter" para visualizar os resultados correspondentes.<br /><br />

                        <b>Impressão de Dados:</b><br />
                        Caso necessite de um registro físico, use o botão "Imprimir" para obter uma versão impressa dos dados dos pacientes.<br /><br />

                        Este formulário foi projetado para facilitar o gerenciamento dos registros dos nossos pacientes. Se precisar de mais ajuda ou tiver dúvidas específicas sobre o uso deste formulário, não hesite em nos contatar.<br />

                        Obrigado por utilizar nosso sistema de cadastro de pacientes!</p>
                <button style={btnStyle} onClick={onClose}>Fechar</button>
            </div>
        </Modal>
    )
}

export default HelpModal