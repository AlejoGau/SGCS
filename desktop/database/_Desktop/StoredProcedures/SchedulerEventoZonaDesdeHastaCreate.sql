-- =============================================
-- Author:		Rodrigo Román
-- Create date: 25/02/2015
-- Description:	Crea schedules de hombre vivo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SchedulerEventoZonaDesdeHastaCreate]
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


	DECLARE @Sql NVARCHAR(max) = ''

	if (@evento != '')
	BEGIN
		-- INICIO DS-510 - VigiControl - Asignar rutas cuando las realiza un Vigilador - Pedro Monesterolo
		DECLARE @SqlSubqueryEvent NVARCHAR(max) = 'SELECT TOP 1 rec_iid FROM _Datos..p_recepcion WHERE rec_iidcuenta = ' + CONVERT(varchar,@idcuenta)
		IF (@user > 0)
		BEGIN
			SET @SqlSubqueryEvent += ' AND rec_iusuario = ' + CONVERT(VARCHAR, @user)
		END

		SET @SqlSubqueryEvent += '  
			AND rec_calarma in ('''+@evento+''')
			AND rec_tfechahora BETWEEN CONVERT(datetime, ''' + CONVERT(VARCHAR, @fechadesde, 126) + ''',126)  
			AND CONVERT(datetime, ''' + CONVERT(VARCHAR, @fechahasta, 126) + ''',126)'

		IF @zona is not null and @zona!='' and @zona!='          '
			SET @SqlSubqueryEvent += ' and rec_czona = '''+@zona+''''
		-- FIN DS-510 - VigiControl - Asignar rutas cuando las realiza un Vigilador - Pedro Monesterolo



		-- hay un evento armo el select
		set @Sql = 'select @result_out=count(*), @result_event_out=(' + @SqlSubqueryEvent + ') from _Datos..p_recepcion 
				where rec_iidcuenta = ' + convert(varchar,@idcuenta)

		if (@user > 0)
		BEGIN
			set @Sql += ' and rec_iusuario = ' + convert(varchar,@user)
			print @user
		END
		
		set @Sql += '
			and rec_calarma in ('''+@evento+''')
			and rec_tfechahora BETWEEN convert(datetime, ''' + convert(varchar,@fechadesde,126) + ''',126)
			AND convert(datetime, ''' + convert(varchar,@fechahasta,126) + ''',126)'

		if @zona is not null and @zona!='' and @zona!='          '
			set @Sql += ' and rec_czona = '''+@zona+''''
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