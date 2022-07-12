-- Este é o script correto -- 

DROP TRIGGER IF EXISTS Tgr_delete_time;
DELIMITER $

CREATE TRIGGER Tgr_delete_time AFTER DELETE
ON relac_campeonato_times
FOR EACH ROW
BEGIN

		
	DECLARE id_team INTEGER;
	DECLARE id_camp INTEGER;
	DECLARE vagas_rest INTEGER;
	
	SET id_team = OLD.id_time;
	SET id_camp = OLD.id_campeonato;
	SET vagas_rest = (SELECT vagas_restantes FROM campeonatos WHERE id_campeonato = id_camp);
	
	UPDATE campeonatos SET vagas_restantes = (vagas_rest + 1), vagas_preenchidas = (vagas_preenchidas - 1) WHERE id_campeonato = id_camp; 
		
END$


DELIMITER ;