CREATE OR ALTER PROCEDURE [dbo].[SearchViajesMetadata]  
	@idCta Int = 0,
	@idViaje VarChar(100)='',
	@identificador VarChar(100)=''
AS    
Begin
	SET NOCOUNT ON     

    IF @idCta <= 0 OR @idViaje = '' OR @identificador = ''
        Select '' AS Tpoid, '' AS Empresaid, '' AS Traduan, '' AS Trano, '' AS Trcorre;
	Else
		Select
			ISNULL(RTRIM(JSON_VALUE([tgv_metadata], '$.Tpoid')), '') AS Tpoid,
			ISNULL(RTRIM(JSON_VALUE([tgv_metadata], '$.Empresaid')), '') AS Empresaid,
			ISNULL(RTRIM(JSON_VALUE([tgv_metadata], '$.Traduan')), '') AS Traduan,
			ISNULL(RTRIM(JSON_VALUE([tgv_metadata], '$.Trano')), '') AS Trano,
			ISNULL(RTRIM(JSON_VALUE([tgv_metadata], '$.Trcorre')), '') AS Trcorre
		From [_Datos].[dbo].[m_tgviaje] tgv
			Inner Join [_Datos].[dbo].[m_cuentas] cue ON cue.[cue_iid] = tgv.[tgv_cueiid]
		Where tgv.[tgv_cueiid] = @idCta 
		  AND tgv.[tgv_codigoexterno] = @idViaje 
		  AND tgv.[tgv_nombre] = @identificador
      
End