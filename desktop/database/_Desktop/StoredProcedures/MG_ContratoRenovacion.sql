CREATE OR ALTER PROCEDURE [dbo].[MG_ContratoRenovacion]
		
AS
--traigo los contratos activos y no vencidos
-- los recorro


	DECLARE @vencimiento DATE
	DECLARE @idContrato INT

DECLARE items_contrato_cursor CURSOR LOCAL FOR
		SELECT 
						con.cnt_fechavto as vencimiento,
						con.cnt_iid as idContrato
				FROM _Datos..crm_contrato con
				WHERE cnt_estado = 1 AND cnt_fechavto > GETDATE()


		OPEN items_contrato_cursor;
		FETCH NEXT FROM items_contrato_cursor INTO @vencimiento, @idContrato;

		WHILE @@FETCH_STATUS = 0
			 BEGIN
					
					print 'Id contrato'
					print @idContrato
					print 'Vencimiento'
					print @vencimiento
					
				  EXEC MG_ContratoANovedad @IdContrato = @idContrato
					print '------------'

				FETCH NEXT FROM items_contrato_cursor INTO @vencimiento, @idContrato;
			 END
		CLOSE items_contrato_cursor;
		DEALLOCATE items_contrato_cursor;