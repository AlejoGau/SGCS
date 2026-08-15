--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.727 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.823 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[CrearDepositoPorCadaTecnico]
AS
BEGIN
  

	/* 
		Toma todos los tecnicos/intaladores/ETC y le crea un registro
		en deposito (tabla t_stock_depositos) 
	*/

	DECLARE @nombreTecnico NVARCHAR(50);
	DECLARE @idTecnico INT;

	SELECT RowNum = ROW_NUMBER() OVER(ORDER BY ca.ins_idKey)
				,	*
			INTO #CabecerasItems
			FROM _tablas..t_instaladores ca

			DECLARE @MaxRownum INT
			SET @MaxRownum = (SELECT MAX(RowNum) FROM #CabecerasItems)

			DECLARE @Iter INT
			SET @Iter = (SELECT MIN(RowNum) FROM #CabecerasItems)

			WHILE @Iter <= @MaxRownum
			BEGIN

				SELECT @nombreTecnico = ins_cnombre,
							 @idTecnico = ins_idKey
						FROM #CabecerasItems
					 WHERE RowNum = @Iter

				INSERT INTO [_tablas]..[t_stock_depositos]
					(Name,tsd_idorganizacion, tsd_idtecnico) VALUES (@nombreTecnico,0,@idTecnico)

				SET @Iter = @Iter + 1
			END


END