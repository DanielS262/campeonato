DROP TRIGGER IF EXISTS tgr_preenc_campeonato;

DELIMITER $

CREATE TRIGGER tgr_preenc_campeonato AFTER INSERT 
ON campeonatos

FOR EACH ROW 

BEGIN

	DECLARE vg_restante INTEGER;
	DECLARE id_camp INTEGER;
	DECLARE id_estru INTEGER;
	DECLARE form INTEGER;
	DECLARE num_times INTEGER;
	
	SET id_camp = OLD.id_campeonato;
	SET vg_restante = (SELECT vagas_restantes FROM campeonatos WHERE id_campeonato = id_camp);
	SET id_estru = (SELECT id_estrutura FROM campeonatos WHERE id_campeonato = id_camp);
	SET form = (SELECT formato FROM estrutura_campeonatos WHERE id_estrutura = id_estru);
	SET num_times = (SELECT numero_de_equipes FROM estrutura_campeonatos WHERE id_estrutura = id_estru);
	
	IF(vg_restante = 0) THEN

		IF(form = "Mata-mata") THEN
		
		
			IF(num_times = 32) THEN 
			
				DECLARE numero_aleatorio INTEGER;
				DECLARE busca_times INTEGER;
				
				SET busca_times = (SELECT COUNT(id_time) from desesseis_avos where id_campeonato = id_camp);
				
				IF(busca_times = 0) THEN
				
					INSERT INTO desesseis_avos (id_time,id_campeonato,lado_chave,num_time) VALUES();
				
				
				ELSE IF
				
				
				END IF;
				
			
			
			ELSE IF()
			
			
			END IF;
		
		
		ELSE IF(form = "Pontos corridos")


		END IF;



	END IF;
END$

DELIMITER ;

select floor(1+(rand()*(32-1)));