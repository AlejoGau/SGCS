--#############################################################################  
-- SOFTGUARD DESKTOP  
-- updated : 2017-06-15 08:45:31.933   
--#############################################################################  
  
-- =============================================  
-- Author:  Rodrigo Román  
-- Create date: 23/02/2015  
-- Description: busca los schedule a ejecutar, realiza el query y genera las alarmas si corresponde  
-- =============================================  
CREATE OR ALTER PROCEDURE [dbo].[SchedulerExecute](  
 @debug int = 0  
)  
AS  
BEGIN
SET NOCOUNT ON;
  
 -- busco los schedules a ejecutar  
 DECLARE @o_Id int =0;
 DECLARE @o_Name NVARCHAR(128)= '';
 DECLARE @o_limitedate datetime;
 DECLARE @o_status int = 0;
 DECLARE @o_eventtype char(3) = '';
 DECLARE @o_condition NVARCHAR(254) = '';
 DECLARE @o_sql NVARCHAR(max)='';
 DECLARE @o_idcuenta int=0; 
 DECLARE @o_iRoute int=null;
 DECLARE @o_rLatitud real = null;
 DECLARE @o_rLongitud real = null;
 DECLARE @o_idUsuario int = null;
 DECLARE @cZona NVARCHAR(3) = '';
  
DECLARE scheduler_cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	SELECT Id,Name,limitdate,eventtype,condition,[sql],idcuenta,iRoute,rLatitud,rLongitud,idUsuario,ISNULL(cZona, '')
		FROM _Datos..Scheduler s
	WHERE s.limitdate < GETDATE()
	AND status = 0

	OPEN scheduler_cursor
		FETCH NEXT FROM scheduler_cursor INTO @o_Id, @o_Name, @o_limitedate, @o_eventtype, @o_condition, @o_sql, @o_idcuenta, @o_iRoute, @o_rLatitud, @o_rLongitud, @o_idUsuario, @cZona

		IF (@debug = 1)
		BEGIN
		PRINT 'busco los programas de scheduler'
			PRINT @@FETCH_STATUS
			PRINT @o_Name
			PRINT @o_sql
			PRINT @o_limitedate
			PRINT @o_condition
			PRINT @o_idcuenta
		END

		WHILE @@FETCH_STATUS = 0
		BEGIN
			-- por cada uno ejecuto el query  
			DECLARE @ParmDefinition NVARCHAR(256) = N'@result_out NVARCHAR(254) OUTPUT, @result_event_out INT OUTPUT';
			DECLARE @result_out NVARCHAR(254) = '';
			DECLARE @result_event_out INT = '';

			EXEC sp_executesql @o_sql,@ParmDefinition,@result_out = @result_out OUTPUT,@result_event_out = @result_event_out OUTPUT

			-- comparo el resultado con la condicion  
			IF (@debug = 1)
			BEGIN
				PRINT '[SchedulerExecute] comparo el resultado con la condicion'
				PRINT @o_Name
				PRINT @o_sql
				PRINT @result_out
				PRINT @o_condition
				PRINT @cZona
				PRINT @result_event_out
			END

			IF (@o_condition > 0 AND @result_out < @o_condition) OR (@o_condition = 0 AND @o_condition != @result_out)
			BEGIN
				DECLARE @o_obs NVARCHAR(MAX) = 'Scheduler: ' + @o_Name;

				IF (@debug = 1)
				BEGIN
					PRINT 'no es igual genero evento'
					PRINT '[SchedulerExecute] @o_iRoute'
					PRINT @o_iRoute
					PRINT '[SchedulerExecute] @o_eventtype'
					PRINT @o_eventtype
					PRINT '[SchedulerExecute] @o_rLatitud'
					PRINT @o_rLatitud
					PRINT '[SchedulerExecute] @o_rLongitud'
					PRINT @o_rLongitud
				END

				-- no es igual genero el evento  
				EXEC _Desktop..AlarmaGenerar @idCta = @o_idcuenta,@cAlarma = @o_eventtype,@cObservaciones = @o_obs,@cRoute = NULL,@cGeofenceName = NULL,@iroute = @o_iRoute,
											 @lat = @o_rLatitud,@lng = @o_rLongitud,@idUsuario = @o_idUsuario,@cZona = @cZona
			END
			ELSE
			BEGIN
				IF (@debug = 1)
					PRINT 'son iguales, nada que hacer'
			END

			-- busco el usuario del evento si es que el scheduller no tiene usuario y la ejecucion si lo devuelve
			if @result_event_out > 0 and isnull(@o_idUsuario,0)=0
			begin
				-- piso el valor en la misma variable si esta vacía para simplificar la logica.
				select @o_idUsuario = rec_iusuario from _datos..p_recepcion where rec_iid = @result_event_out
			end

			-- cambio estado para que no se vuelva a ejecutar  
			UPDATE _Datos..Scheduler WITH (UPDLOCK)
			SET status = 1
			   ,result = @result_out
			   ,eventid = @result_event_out
			   ,idUsuario = @o_idUsuario -- si cambio el usuario lo piso, sino guardo el valor anterior.
			WHERE Id = @o_Id

		FETCH NEXT FROM scheduler_cursor INTO @o_Id, @o_Name, @o_limitedate, @o_eventtype, @o_condition, @o_sql, @o_idcuenta, @o_iRoute, @o_rLatitud, @o_rLongitud, @o_idUsuario, @cZona
	END
	
	CLOSE scheduler_cursor;
	DEALLOCATE scheduler_cursor;
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'SchedulerJob'
END