DELIMITER //
CREATE FUNCTION aumenta_preco (preco DECIMAL (10,2), taxa DECIMAL(10,2))
RETURNS DECIMAL(10,2) 
BEGIN 

	DECLARE contagem  INT unsigned DEFAULT 0;
	
	set contagem = (select COUNT(*) from campeonatos where id_time = )
	
	
	RETURN preco + preco * taxa / 100;

END//

DELIMITER ;



DELIMITER //
CREATE FUNCTION teste (teste INTEGER)
RETURNS INTEGER
BEGIN 
	
	select teste;
	
	
	RETURN teste;

END//

DELIMITER ;




DELIMITER $

CREATE TRIGGER Tgr_tblCampeonato AFTER INSERT
ON relac_campeonato_times
FOR EACH ROW
BEGIN

	-- A linha de comando abaixo serve para armazenar em uma variável todos os resultados da busca na tabela relac_campeonato_times  --

	-- DECLARE contagem INTEGER; --
	
	
	DECLARE contagem INTEGER(11);
	DECLARE vagas_restantes INTEGER(11);
	
	
	-- set contagem = (select COUNT(*) into relac_campeonato_times where id_time = new.id_time and id_campeonato = new.id_campeonato); --
	
	set contagem = 0;
	
	
	-- DECLARE vagas_restantes INTEGER; -- 
	
	set vagas_restantes = (select vagas_restantes from campeonatos where id_campeonato = NEW.relac_campeonato_times.id_campeonato);
	
	IF vagas_restantes = 0 THEN
	
	
		`select * into relac_campeonato_times`;
	
	ELSE


	update campeonatos set vagas_preenchidas = (vagas_preenchidas + 1),  vagas_restantes = (vagas_restantes - 1) where NEW.relac_campeonato_times.id_campeonato;

	END IF;
		
	
END$


DELIMITER ;