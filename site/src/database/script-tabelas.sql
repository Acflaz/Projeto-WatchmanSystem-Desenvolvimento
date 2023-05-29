	-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
create database watchmanSystem;
use watchmanSystem;

DROP DATABASE watchmanSystem;

SELECT * FROM usuario;
SELECT * FROM empresa;
SELECT * FROM notebook;
SELECT * FROM alerta;
SELECT * FROM dadosCapturados;
select * from ranking order by qtdPontuacao desc limit 3;

create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(15),
emailResponsavel varchar(35),
telefone varchar(45)
);

create table alerta(
idAlerta int primary key auto_increment,
minCpu decimal(10,2),
maxCpu decimal(10,2),
minMemoria decimal(10,2),
maxMemoria decimal(10,2),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table usuario(
idUsuario int auto_increment,
nome varchar(45),
email varchar(35),
senha varchar(45),
tipo varchar(45),
constraint chkTipo check( tipo in ('root','supervisor','suporte', 'atendente')),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) references empresa (idEmpresa),
primary key(idUsuario, fkEmpresa)
);

create table notebook(
idNotebook int primary key auto_increment,
marca varchar(45),
modelo varchar(45),
capacidadeRam varchar(45),
velocidadeCpu varchar(45),
ipNotebook varchar(45),
fkUsuario int,
foreign key (fkUsuario) references usuario (idUsuario),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table dadosCapturados(
idDadosCapturados int primary key auto_increment,
porcentagemUsoMemoria int,
porcentagemUsoProcessador int,
dataHora datetime,
fkNotebook int,
foreign key (fkNotebook) references notebook (idNotebook),
fkUsuario int,
foreign key (fkUsuario) references usuario (idUsuario),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table ranking (
idRanking int primary key auto_increment,
qtdPontuacao int,
fkUsuario int,
foreign key (fkUsuario) references usuario (idUsuario),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

 -- select da inovação
SELECT U.nome, R.qtdPontuacao
FROM ranking R
JOIN usuario U ON R.fkUsuario = U.idUsuario
ORDER BY R.qtdPontuacao desc;

INSERT INTO empresa (nomeFantasia, cnpj, emailResponsavel, telefone) VALUES
("Itau", "123456789012345", "itau@gmaul.com", "996352456");

INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES
("Erick", "erick@gmail.com", "123", "supervisor", 1);

INSERT INTO notebook (marca, modelo, capacidadeRam,velocidadeCpu) VALUES 
("DELL2","Intel CORE i52","256GB2","1002");

DELETE FROM notebook WHERE marca = "Positivo" AND ipNotebook = 1 AND fkEmpresa = 1;

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */


/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY IDENTITY(1,1),
nomeFantasia VARCHAR(45),
cnpj CHAR(15),
emailResponsavel VARCHAR(35),
telefone VARCHAR(45)
);

CREATE TABLE usuario (
idUsuario INT IDENTITY(1,1),
nome VARCHAR(45),
email VARCHAR(35),
senha VARCHAR(45),
tipo VARCHAR(45),
CONSTRAINT chkTipo CHECK (tipo IN ('root','supervisor','suporte', 'atendente')),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
PRIMARY KEY(idUsuario, fkEmpresa)
);

CREATE TABLE alerta (
idAlerta INT PRIMARY KEY IDENTITY(1,1),
minCpu DECIMAL(10,2),
maxCpu DECIMAL(10,2),
minDisco DECIMAL(10,2),
maxDisco DECIMAL(10,2),
minMemoria DECIMAL(10,2),
maxMemoria DECIMAL(10,2),
minRede DECIMAL(10,2),
maxRede DECIMAL(10,2),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

CREATE TABLE notebook (
idNotebook INT PRIMARY KEY IDENTITY(1,1),
marca VARCHAR(45),
modelo VARCHAR(45),
capacidadeRam VARCHAR(45),
tipoDisco VARCHAR(45),
velocidadeCpu VARCHAR(45),
fkUsuario INT,
fkEmpresa INT,
FOREIGN KEY (fkUsuario, fkEmpresa) REFERENCES usuario (idUsuario, fkEmpresa)
);

CREATE TABLE dadosCapturados (
idDadosCapturados INT PRIMARY KEY IDENTITY(1,1),
qtdUsadaRam VARCHAR(45),
tempoAtvDisco VARCHAR(45),
tempoAtvCpu VARCHAR(45),
utilizacaoCpu VARCHAR(45),
qtdProcessoCpu VARCHAR(45),
qtdThreadsCpu VARCHAR(45),
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkNotebook INT,
FOREIGN KEY (fkNotebook) REFERENCES notebook (idNotebook),
fkUsuario INT,
fkEmpresa INT,
FOREIGN KEY (fkUsuario, fkEmpresa) REFERENCES usuario (idUsuario, fkEmpresa)
);