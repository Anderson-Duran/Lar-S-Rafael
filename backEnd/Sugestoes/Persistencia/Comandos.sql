CREATE DATABASE centrogerenciamento;

CREATE TABLE tsugest( 
    ID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    data TEXT NOT NULL,
    sugestao VARCHAR(255) NOT NULL
);

CREATE TABLE tproject( 
    ID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    responsavel VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    idsugestao INTEGER NOT NULL,
    CONSTRAINT fk_sugestao FOREIGN KEY (idsugestao) REFERENCES tsugest(ID)
);

CREATE TABLE prestador( 
    ID INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL
);

CREATE TABLE sugestao_prestador(
    idsugestao INTEGER NOT NULL,
    idprestador INTEGER NOT NULL,
    PRIMARY KEY (idsugestao,idprestador),
    FOREIGN KEY(idsugestao) REFERENCES tsugest(ID),
    FOREIGN KEY(idprestador) REFERENCES prestador(ID)
)
