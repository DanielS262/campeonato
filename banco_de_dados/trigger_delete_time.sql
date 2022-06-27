Drop trigger if exists Tgr_tblCampeonato;
DELIMITER $

CREATE TRIGGER Tgr_tblCampeonato AFTER INSERT
ON relac_campeonato_times
FOR EACH ROW
BEGIN

		
	DECLARE contagem INTEGER default 0;
	DECLARE vagas_rest INTEGER;
	DECLARE numero_de_equipes INTEGER default 0;
	DECLARE ultimo_insert INTEGER default 0;
	DECLARE idc INTEGER default 0;

	
	set idc = new.id_campeonato;
	
	SET ultimo_insert = (select max(id_relac) from relac_campeonato_times);
	
	set contagem = (select COUNT(id_time) from relac_campeonato_times where id_campeonato = idc);
	
	set vagas_rest = (select vagas_restantes from campeonatos where id_campeonato = idc);
	
	set numero_de_equipes = (select numero_de_equipes from estrutura_campeonatos where id_estrutura = (select id_estrutura from campeonatos 
	where id_campeonato = idc)); 

	
	IF (vagas_rest <> 0) THEN
	
		update campeonatos set vagas_restantes = (vagas_rest - 1), vagas_preenchidas = (vagas_preenchidas + 1) where id_campeonato = idc; 
		
	END IF;
		
	
END$


DELIMITER ;


Drop trigger if exists Tgr_deleteTime;
DELIMITER $

CREATE TRIGGER Tgr_deleteTime AFTER UPDATE
ON campeonatos
FOR EACH ROW
BEGIN

	
	DECLARE vagas_totais INTEGER default 0;
	DECLARE vagas_cont INTEGER default 0;
	DECLARE ultimo_insert INTEGER;
	
	SET vagas_totais = (select vagas_totais from campeonatos where id_campeonato = old.id_campeonato);
	
	SET vagas_cont = (select COUNT(*) from relac_campeonato_times where id_campeonato = old.id_campeonato);
	
	SET ultimo_insert = (select max(id_relac) from relac_campeonato_times where id_campeonato = old.id_campeonato);
	
	IF ((vagas_cont - vagas_totais) = 1) THEN
	
		delete from relac_campeonato_times where id_relac = ultimo_insert;
		
	
	END IF;
		
	
END$


DELIMITER ;










DELIMITER $$

CREATE PROCEDURE pcrDeleteTime ()
BEGIN




	SELECT COUNT(*) INTO param1 FROM t;
END $$

DELIMITER ; 






