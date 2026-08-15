CREATE OR ALTER PROCEDURE [dbo].[EventosInformados_UpdateEstado] @Id INT = 0, @Estado tinyint = 0,
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @oauth_token varchar(100) = '',
 @totalrows INT = 1 OUTPUT 
 
AS
BEGIN
    --declare @estado VARCHAR(30) = 'Todas' -- 'Pendiente'

	update [_Datos].[dbo].[EventosInformados]
	set evi_iStatus = @Estado
	where evi_iRecId = @Id
	
	--SELECT * FROM [_Datos].[dbo].[EventosInformados]
	/*
		SELECT 
	--evi_idKey
	--,
	evi_cAlarma AS ImagenPublicacion
	,evi_cAlarmaDesc AS Publicacion
	,m_cuentas.cue_clinea + '-' + cue_ncuenta as Cuenta
	, evi_cUsuarioNombre AS Usuario
	, [evi_tCheckExec] 
	,evi_iCheck 
	,evi_iStatus
	, CASE 
			WHEN evi_iStatus = 0 Then 'Aprobado'
			WHEN evi_iStatus = 1 Then 'En Revision'
		else '' end AS Estado
	, '' as Contenido
	, count(*) as Denuncias
	FROM [_Datos].[dbo].[EventosInformados]
	INNER JOIN  [_Datos].[dbo].m_cuentas ON m_cuentas.cue_iid = [EventosInformados].evi_iCuentaId
	WHERE 
		(@estado = 'Todas'  --AND evi_iCheck = 0 
		)
		OR 
		( @estado = 'Revision' --AND evi_iCheck = 0  
		AND evi_iStatus = 0 )

	group by  evi_cAlarma ,evi_cAlarmaDesc ,m_cuentas.cue_clinea, cue_ncuenta , evi_cUsuarioNombre , [evi_tCheckExec] ,evi_iCheck ,evi_iStatus
	
	*/
END