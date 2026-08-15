CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_pregunta_respuestaGuardarJSONParam]
	/*@epr_epgidkey Int = 0,
	@epr_cvalue NVarChar (MAX) = '',
	@epr_ivalue Int = 0,
	@epr_cuser NVarChar (255) = '',
	@epr_itipousuario NVarChar (255) = '',
	@epr_cnombreusuario NVarChar (255) = '',
	@epr_cnombrecuenta NVarChar (255) = '',
	@epr_icuenta Int = 0,
	@epr_ctelefono VarChar (25) = '',
    @epr_enridkey INT = 0,*/



	@jsonparam NVarChar(MAX)=''
--WITH ENCRYPTION			 
AS
set noCount on
	
	-- Obtengo datos del SP que lleno la encuesta
	/*DECLARE @Telefono NVARCHAR(128);
	DECLARE @CuentaId INT;
	DECLARE @NombreSP NVARCHAR(256);
	DECLARE @NombreCuenta NVARCHAR(256);
	DECLARE @Imei NVARCHAR(255);

	DECLARE @FilterTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @FilterTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')		


	SELECT @Telefono = Telefono, @CuentaId = CuentaId, @NombreSP = Nombre, @NombreCuenta = c.cue_cnombre 
	FROM [_Datos].[dbo].[SmartPanic] sp
		INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = sp.CuentaId)
	WHERE sp.Imei = @epr_cuser

	Insert into _datos.dbo.p_encuesta_pregunta_respuesta ([epr_epgidkey],[epr_cvalue],[epr_ivalue],[epr_cuser],[epr_itipousuario],[epr_cnombreusuario],[epr_cnombrecuenta],[epr_icuenta],[epr_ctelefono],[epr_enridkey])
	values ( @epr_epgidkey, @epr_cvalue, @epr_ivalue, @epr_cuser, '3067', @NombreSP, @NombreCuenta, @CuentaId, @Telefono, @epr_enridkey)
										
	exec p_encuesta_pregunta_respuestaSel @@Identity 						 
	*/
	DECLARE @JsonParmTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @JsonParmTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@jsonparam)	

	DECLARE @parentId INT = 0
	DECLARE @epr_epgidkey Int = 0,@epr_enridkey INT = 0 ,@epr_ivalue Int = 0,@epr_cuser NVarChar (255) = ''
		,@epr_cvalue NVarChar (MAX) = ''
	
	SELECT  @parentId=ISNULL(MIN(object_id),-1) from @JsonParmTable WHERE NAME='input'

	WHILE(@parentId<>-1)
		BEGIN

			SELECT @epr_enridkey=StringValue from @JsonParmTable WHERE parent_ID = @parentId AND NAME = 'epr_enridkey'
			SELECT @epr_epgidkey=StringValue from @JsonParmTable WHERE parent_ID = @parentId AND NAME = 'epr_epgidkey'
			SELECT @epr_ivalue=StringValue from @JsonParmTable WHERE parent_ID = @parentId AND NAME = 'epr_ivalue'
			SELECT @epr_cvalue=ISNULL(StringValue,'') from @JsonParmTable WHERE parent_ID = @parentId AND NAME = 'epr_cvalue'
			SELECT @epr_cuser=StringValue from @JsonParmTable WHERE parent_ID = @parentId AND NAME = 'epr_cuser'
			SELECT  @parentId=ISNULL(MIN(object_id),-1) FROM @JsonParmTable WHERE name='input' AND object_id>@parentId
			EXEC p_encuesta_pregunta_respuestaGuardar @epr_enridkey= @epr_enridkey
				,@epr_epgidkey=@epr_epgidkey,@epr_ivalue=@epr_ivalue,@epr_cvalue=@epr_cvalue,@epr_cuser=@epr_cuser
			PRINT '------------------------------------------------------'

		END