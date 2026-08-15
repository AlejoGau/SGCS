CREATE OR ALTER PROCEDURE [dbo].[SmartTrackSendMessageSearch]
	@ids varchar(max) = '',
	@filter varchar(max) = '',
	@subject varchar(max) = '',
	@body varchar(max) = '',
	@token VARCHAR(128) = '',
	@fromId varchar(max) = ''
AS
BEGIN

	DECLARE @Id INT = 0;
	DECLARE @Sql VARCHAR(MAX) = ''
	DECLARE @SqlFilter AS VARCHAR(4096)

	IF @ids != ''
		BEGIN
			SET @SqlFilter = ' AND usu_idkey IN ('+@ids+')'
		END
	ELSE IF @filter != ''
		BEGIN
			SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartTrack')
		END
	ELSE
		BEGIN
			SELECT 'ERROR NO HAY ID NI FILTERS';
		END
	
	--RANGOS 
	DECLARE @SqlFilterRango AS NVARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
	SET @SqlFilter = @SqlFilter + @SqlFilterRango

	SET @Sql = 'INSERT INTO _datos..[Message] ( 
							Name,
							Body,
							DateCreated,
							FromTypeId,
							FromId,
							ToTypeId,
							ToId,
							Status,
							EventoID,
							CuentaID
						) 
						SELECT 
							'''+@subject+''',
							'''+@body+''',
							getdate(),
							0,
							'+@fromId+',
							3013,
							usu_idkey,
							0,
							0,
							0						
						FROM [_Datos]..[SmartTrack] o
							LEFT JOIN _datos..m_cuentas c ON (o.CuentaId = c.cue_iid)
							INNER JOIN [_Datos]..[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = o.Id)
							INNER JOIN [_Datos]..[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
						WHERE 1=1 '+@SqlFilter
	
	print @sql
	EXEC(@Sql)

END