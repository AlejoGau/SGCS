-- =============================================
-- Author:		Rodrigo Román
-- Create date: 25/02/2015
-- Description:	Crea schedules de hombre vivo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SearchHombreVivoScheduleCreate]
	@next int
	,@userId int
	,@idcuenta int
	,@tolerancia int = 2

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	

	declare @fechadesde datetime = DATEADD (minute , @next-@tolerancia, GETDATE())
	declare @fechahasta datetime = DATEADD (minute , @next+@tolerancia, GETDATE())
	declare @ntipo int = 0; -- el tipo de la cuenta para bucar los cleanapp
	declare @codHV varchar(10) = 'V08',
			@codfalla varchar(10) = 'V12',
			@codsalida VARCHAR(100) = '''V11'',''CA2'',''V97'',''V39''' 

	-- me fijo si exsite el usuario para la cuenta
	declare @usu_idkey int= 0
	select @usu_idkey = isnull(usu_idKey,0), @ntipo = tip_nTipo from _datos..m_usuarios WITH (NOLOCK)
		inner join _datos..m_cuentas WITH (NOLOCK) on cue_iid = usu_iidcuenta
		inner join _tablas..t_tipos WITH (NOLOCK) on cue_ctipo = tip_ccodigo
		where usu_iid = @userId and usu_iidcuenta = @idcuenta

	if @usu_idkey = 0
	BEGIN
		declare @StartDateTimeText varchar(250)
		declare @message varchar(max)
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SearchHombreVivoScheduleCreate] no existe el usuario en la cuenta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		SET NOEXEC ON
	END

	if @ntipo = 9
	BEGIN
		select @codfalla = 'C12'
	END

	DECLARE @Sql NVARCHAR(max) = N'
		select @result_out=count(DISTINCT rec_iidcuenta) from _Datos..p_recepcion where 
			rec_iidcuenta = ' + convert(varchar,@idcuenta) + '
			and rec_iusuario = ' + convert(varchar,@userId) + '
			AND
			(
				(
				rec_calarma = '''+@codHV+'''
				and rec_tfechahora BETWEEN convert(datetime, ''' + convert(varchar,@fechadesde,126) + ''',126)
				AND convert(datetime, ''' + convert(varchar,@fechahasta,126) + ''',126)
				)
				OR
				(
				rec_calarma IN (' + @codsalida + ')
				and rec_tfechahora BETWEEN convert(datetime, ''' + convert(varchar,GETDATE(),126) + ''',126)
				AND convert(datetime, ''' + convert(varchar,@fechahasta,126) + ''',126)
				)
			)
	'

	DECLARE @translation AS nVARCHAR(1024)
	EXECUTE [dbo].[LocalizationGetLocale] @Name = N'HombreVivo', @soloOutput=1,@translation = @translation OUTPUT;

	insert into _Datos..Scheduler (Name,sql, limitdate, status, eventtype, condition, idcuenta, idUsuario) values (Rtrim(@translation),@Sql,@fechahasta,0,@codfalla,1,@idcuenta, @userId)

	SET NOEXEC OFF
END