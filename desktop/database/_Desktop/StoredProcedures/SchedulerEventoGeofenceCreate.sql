--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.703 
--#############################################################################

-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/04/2017
-- Description:	Crea schedules de geocercas
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SchedulerEventoGeofenceCreate]
	@user int = 0
	,@name NVARCHAR(max) = "EventoZona"
	,@date datetime
	,@geofenseId int
	,@idcuenta int
	,@after int = 2
	,@before int = 2
	,@idroute int = null
	,@idUsuario int = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;

	declare @fechadesde datetime = DATEADD (minute , 0-@before, @date)
	declare @fechahasta datetime = DATEADD (minute , @after, @date)
	declare @template int = 9010
	declare @alarma NVARCHAR(10) = '_NR'

	DECLARE @Sql NVARCHAR(max) = '
		select @result_out=count(*) from _Datos..p_recepcion r
			inner join _datos..[p_RXtraInfo] x on (r.rec_iid = x.rxt_irecid)
			where rec_iidcuenta = ' + convert(varchar,@idcuenta)

	print @before
	print @after
	print @Sql
	print @date
	print @fechadesde
	print @fechahasta
	
	if (@user > 0)
	BEGIN
		set @Sql += ' and rec_iusuario = ' + convert(varchar,@user)
		print @user
	END
		
	set @Sql += '
		and x.rxt_cevento in (''_IG'',''_EG'')
		and rec_tfechahora BETWEEN convert(datetime, ''' + convert(varchar,@fechadesde,126) + ''',126)
		AND convert(datetime, ''' + convert(varchar,@fechahasta,126) + ''',126)'
	
	-- falta lat, long, id de la geocerca?
	insert into _Datos..Scheduler (
		Name,
		[sql], 
		limitdate, 
		[status], 
		eventtype, 
		condition, 
		idcuenta,
		iRoute,
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
		@template,
		@idUsuario,
		''
	)
END