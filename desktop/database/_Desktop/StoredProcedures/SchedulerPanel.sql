--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.170 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.287 
--#############################################################################

-- =============================================
-- Author:		Rodrigo Román
-- Create date: 25/02/2015
-- Description:	Crea schedules de hombre vivo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SchedulerPanel]
	@user int = 0
	,@name NVARCHAR(max) = "EventoZona"
	,@fechadesde datetime
	,@fechahasta datetime
	,@evento NVARCHAR(max) 
	,@alarma char(3)
	,@zona varchar(10) =''
	,@idcuenta int
	,@idroute int = null
	,@lat real = null
	,@lng real = null
	,@template int = 0
	,@idUsuario int = null
	,@programtype NVARCHAR(max) = ''

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

print '[SchedulerPanel]'
	DECLARE @Sql NVARCHAR(max) = ''

	 IF @programtype = 10 OR
			@programtype = 20 OR
			@programtype = 30 OR
			@programtype = 40 OR
			@programtype = 50
		BEGIN
				set @Sql = 'select @result_out=count(*) from _Datos..m_status 
						where sta_iidcuenta = ' + convert(varchar,@idcuenta) + ' AND sta_nestado = 0'
		END
	--panel abierto
	ELSE IF @programtype = 11 OR
					@programtype = 21 OR
					@programtype = 31 OR
					@programtype = 41 OR
					@programtype = 51
		BEGIN
				set @Sql = 'select @result_out=count(*) from _Datos..m_status 
						where sta_iidcuenta = ' + convert(varchar,@idcuenta) + ' AND sta_nestado = 1'
		END
	else
	BEGIN
		-- no hay evento ejecuta simpre, devuelvo 0
		set @Sql = 'select @result_out=0'
	END
		
	
	print @Sql
	print @fechadesde
	print @fechahasta
	print @alarma

	-- me fijo si repite custom como para generar a cada hora.
	insert into _Datos..Scheduler (
		Name,
		[sql], 
		limitdate, 
		[status], 
		eventtype, 
		condition, 
		idcuenta,
		iRoute,
		rLatitud,
		rLongitud,
		template,
		idUsuario,
		cZona
	) values (
		@name,
		@Sql,
		@fechahasta,
		0,
		@alarma,
		1,
		@idcuenta,
		@idroute,
		@lat,
		@lng,
		@template,
		@idUsuario,
		@zona
	)
END