	-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/
create database watchmanSystem;
use watchmanSystem;

create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
cnpj char(15),
emailResponsavel varchar(35),
telefone varchar(45)
);

SELECT * FROM empresa;
SELECT * FROM empresa WHERE usuario AND senha;

create table alerta(
idAlerta int primary key auto_increment,
minCpu decimal(10,2),
maxCpu decimal(10,2),
minDisco decimal(10,2),
maxDisco decimal(10,2),
minMemoria decimal(10,2),
maxMemoria decimal(10,2),
minRede decimal(10,2),
maxRede decimal(10,2),
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
-- garante que cada combinação de idUsuario e fkEmpresa seja única e, portanto, só é possível ter uma entrada para cada combinação na tabela usuario. --

SELECT * FROM usuario;

create table notebook(
idNotebook int primary key auto_increment,
marca varchar(45),
modelo varchar(45),
capacidadeRam varchar(45),
tipoDisco varchar(45),
velocidadeCpu varchar(45),
fkUsuario int,
foreign key (fkUsuario) references usuario (idUsuario),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

create table dadosCapturados(
idDadosCapturados int primary key auto_increment,
qtdUsadaRam varchar(45),
tempoAtvDisco varchar(45),
tempoAtvCpu varchar(45),
utilizacaoCpu varchar(45),
qtdProcessoCpu varchar(45),
qtdThreadsCpu varchar(45),
dataHora datetime,
fkNotebook int,
foreign key (fkNotebook) references notebook (idNotebook),
fkUsuario int,
foreign key (fkUsuario) references usuario (idUsuario),
fkEmpresa int,
foreign key (fkEmpresa) references empresa (idEmpresa)
);

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