CREATE OR ALTER PROCEDURE [dbo].[MP_CuentasGeoreferenciadas]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(64) = '',            
 @filter VARCHAR(2048) = '',       
 @token VARCHAR(128) = '',     
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT              
AS                      
 SET NOCOUNT ON  
 
 SELECT *,
		(CASE WHEN RTRIM(LTRIM(cue_ctipo))<>'' THEN UPPER(cue_ctipo) ELSE '_|_' END) AS cTipo 				
   FROM _Datos.dbo.m_cuentas
  WHERE cue_ncuenta NOT IN ('0000','XXXX') 
		AND cue_clinea NOT IN ('_SG','_MP') 
        AND cue_cLatLng NOT IN ('','0.0,0.0')
        AND cue_iid NOT IN (SELECT est_iidcuenta 
							  FROM _Datos.dbo.m_estado_cuenta_Cab
							 WHERE est_iidcuenta = cue_iid 
								   AND est_nEstado=2)