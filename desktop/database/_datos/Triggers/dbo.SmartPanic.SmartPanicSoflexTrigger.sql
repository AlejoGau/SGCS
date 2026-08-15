CREATE OR ALTER TRIGGER [dbo].[SmartPanicSoflexTrigger] 
   ON  [dbo].[SmartPanic]
   AFTER UPDATE
AS 
BEGIN
	-- =============================================
	-- Author:	Roman Rodrigo
	-- Create date: 13/01/2017
	-- Description:	Genera un mensaje de push cuando cambia la configuracion de un sp
	-- =============================================

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @token varchar(1024) = ''
	declare @id int;
	declare @imei varchar(128);
	declare @cuentaid int;
	declare @URLDESKTOP varchar(250);
	declare @now DATETIME;

	select @now = getdate();

	select  @URLDESKTOP = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
	select @id = id, @imei = imei ,@cuentaid = cuentaid  from inserted

	declare @url varchar(1024) = @URLDESKTOP+'/handler/RedirectorSoflexFleet?id='+CONVERT(nvarchar(10),@id)

	-- veo que version de redirector estoy
	Declare	@iVersion int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='VERSIONREDIRECTOR' )
	If @iVersion = 0 AND @imei !='' and @cuentaid>0 AND not exists (select * from _datos..[RemoteCallQueue] where rcq_url=@url and rcq_estado=0) 
	BEGIN
		
		INSERT INTO _datos..[RemoteCallQueue]
			   ([rcq_estado]
			   ,[rcq_tipo]
			   ,[rcq_url])
		 VALUES
			   (0
			   ,'HTTPGET'
			   ,@url)
	END
	Else If @imei !='' and @cuentaid>0 AND not exists (select * from _datos..[RedirectorQueue] where [rdq_cLlamado]=@url and [rdq_iStatus]=0) 
	Begin
		INSERT INTO [dbo].[RedirectorQueue] (
			[rdq_iReDirector], 
			[rdq_idRec], 
			[rdq_idGps], 
			[rdq_tFechaHora], 
			[rdq_cLlamado]
			)  
		VALUES
		(
			0,0,0,@now,@url
		)
	End
END