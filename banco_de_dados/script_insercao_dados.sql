

use campeonato;

insert into usuarios (tipo_usuario, nome, foto, telefone, email, senha, createdAt) values
(2,"Daniel Souza da Silva", "Sem dados", "19 99826-9341", "dansouza2@live.com", "123456", curdate()),
(2,"Pedro Henrique Lima", "Sem dados", "19 99826-8874", "phenlima@live.com", "123456", curdate()),
(2,"Jaqueline Barbosa Santos", "Sem dados", "19 94564-6847", "jaquebsantos@gmail.com", "123456", curdate());



insert into times (nome, descricao, foto, uf, mascote) values("Red Bull", "Azul e Vermelho", "sem dados", "SP", "Touro");

insert into times (nome, descricao, foto, uf, id_usuario, createdAt) values
("PSG", "Azul e Vermelho", "sem dados", "SP", 1, curdate()),
("Celtic", "Verde e Branco", "sem dados", "SP", 3, curdate()),
("CRB", "Vermelho e Branco", "sem dados", "SP", 2, curdate()),
("Palmeiras", "Verde e Branco", "sem dados", "SP", 2, curdate()),
("Cardif", "Azul e Vermelho", "sem dados", "SP", 1, curdate()),
("Manchester City", "Azul e Branco", "sem dados", "SP", 2, curdate()),
("Milan", "Preto e Vermelho", "sem dados", "SP", 3, curdate()),
("Atlhetic Bilbao", "Vermelho e Branco", "sem dados", "SP", 3, curdate()),
("West Ham", "Azul e Vermelho", "sem dados", "SP", 2, curdate()),
("Burnley", "Azul e Vermelho", "sem dados", "SP", 1, curdate());


insert into relac_campeonato_times (id_time, id_campeonato) values
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1);


insert into relac_campeonato_times (id_time, id_campeonato) values
(8,4),
(9,4);

alter table
	relac_campeonato_times
add
	unique index (id_time, id_campeonato);



insert into estrutura_campeonatos (tipo, formato, numero_de_equipes, numero_de_grupos) values
("Liga", "Pontos corridos", 32, 1),
("Liga", "Pontos corridos", 16, 1),
("Liga", "Pontos corridos", 8, 1),
("Copa", "Mata-mata", 32, 8),
("Copa", "Mata-mata", 16, 4),
("Copa", "Mata-mata", 8, 2);


insert into campeonatos (id_estrutura, id_usuario, nome, foto, vagas_restantes, vagas_preenchidas, vagas_totais, createdAt, updatedAt) values
(6, 1, "Copa Jaguariúna de Futsal", "sem dados", (select numero_de_equipes from estrutura_campeonatos where id_estrutura = 6), 0, 
(select numero_de_equipes from estrutura_campeonatos where id_estrutura = 6), Curdate(), Curdate());

insert into campeonatos (id_estrutura, nome, foto, vagas_restantes, vagas_preenchidas, createdAt, updatedAt) values
(6, "Copa Jaguariúna de Futsal Junior", "sem dados", (select numero_de_equipes from estrutura_campeonatos where id_estrutura = 6), 0, Curdate(), Curdate());