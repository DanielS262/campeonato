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

	
	IF (numero_de_equipes <> contagem) THEN
	
		update campeonatos set vagas_restantes = (vagas_rest - 1), vagas_preenchidas = (vagas_preenchidas + 1) where id_campeonato = idc; 

	END IF;
		
	
END$


DELIMITER ;

