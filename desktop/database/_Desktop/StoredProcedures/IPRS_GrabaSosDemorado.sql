CREATE OR ALTER PROCEDURE [dbo].[IPRS_GrabaSosDemorado]
	@cEvento [varchar](10),
	@rawFechaHora [datetime],
	@cue_iid [int],
	@iTiempoSOSDemorado [int],
	@rec_iid [int],
	@idUsuario [int],
	@sct_iSmartPanicID int = null,
	@sct_cPushToken nvarchar(1024)  = null
WITH EXECUTE AS CALLER
AS
BEGIN
	SET NOCOUNT ON;

    declare @iSeteoEnSegundos Int = (@iTiempoSOSDemorado*60) + 60 
	declare @tLimite datetime = DATEADD(second,@iSeteoEnSegundos,@rawFechaHora)

	Declare @bGrabar Int = 0
	Declare @cAlarmasAEsperar Varchar(max)	--Tiene que ser null para que no empiece con |

	declare @CIDESOSDEMORADOI varchar(10)
	declare @CIDESOSDEMORADOMIN varchar(10)

	-- busco los formatos
	Declare @jSon As nVarChar(max)
	Set @json = (Select XmlData From _Desktop.dbo.MetaData WHERE ObjectTypeId = _Desktop.dbo.GetObjectId('UIApplication') AND ObjectId = 30)

	declare @config nvarchar(max)
	select @config=StringValue from parseJSON(@json) where name = 'Config'

	declare @hierarchy TABLE
	  (
	   NAME VARCHAR(2000),
	   StringValue NVARCHAR(MAX) NOT NULL
	  )

	insert into @hierarchy select name, StringValue from parseJSON(@config)
	select @CIDESOSDEMORADOI = StringValue from @hierarchy where name = 'CIDESOSDEMORADOI'
	select @CIDESOSDEMORADOMIN = StringValue from @hierarchy where name = 'CIDESOSDEMORADOMIN'

	If @cEvento = @CIDESOSDEMORADOI or @cEvento = @CIDESOSDEMORADOI
	BEGIN
		-- acumulo los codigos de alarma con |
		SELECT  @cAlarmasAEsperar = COALESCE(@cAlarmasAEsperar + '|', '') + [for_calarma]
			FROM   @hierarchy 
			inner join _datos..[m_formatos] on StringValue collate DATABASE_DEFAULT = for_cformato collate DATABASE_DEFAULT
			where name like '%SOSDEMORADO%' and name not in ('CIDESOSDEMORADOI','CIDESOSDEMORADOMIN') And [for_cdescripcion] Like 'SmartP%'

		delete From _datos..SmartPanicsControlTiempo
			Where sct_idCuenta  =@cue_iid 
				And sct_iUsuario =@idUsuario 
				And CONVERT(Char(8), sct_tFechaHoraLimite,112) collate DATABASE_DEFAULT >= CONVERT(Char(8), GetDate()-1,112) collate DATABASE_DEFAULT

		Insert Into _datos..SmartPanicsControlTiempo (
			[sct_tFechaHoraInicio],
			[sct_tFechaHoraLimite],
			[sct_idCuenta],
			[sct_iUsuario],
			[sct_iRecId],
			[sct_cAlarmasAEsperar],
			sct_iSmartPanicID,
			sct_cPushToken
			)
		Values (
			@rawFechaHora,
			@tLimite,
			@cue_iid,
			@idUsuario,
			@rec_iid,
			@cAlarmasAEsperar, 
			@sct_iSmartPanicID,
			@sct_cPushToken
			)

	END

END