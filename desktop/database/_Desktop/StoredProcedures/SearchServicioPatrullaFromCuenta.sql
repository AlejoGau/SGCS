CREATE OR ALTER PROCEDURE [dbo].[SearchServicioPatrullaFromCuenta]

@page INT = 1,               
@start INT = 0,               
@limit INT = 50,               
@sort VARCHAR(256) = '',   
@group VARCHAR(256) = '',            
@filter VARCHAR(2048) = '',        
@_dc VARCHAR(256) = '',
@IdCuenta int,
@totalrows INT = 1 OUTPUT     
AS  
SET NOCOUNT ON   

Select SP.tsp_cdescripcion,SP.tsp_cpathicon 
FROM [_Tablas]..[t_ServiciosPatrulla] SP
Inner Join [_tablas]..[t_tipos] TI On TI.tip_cservicio=SP.tsp_ccodigo
Inner Join _Datos.dbo.m_cuentas MC On MC.cue_ctipo=TI.tip_ccodigo
Where MC.cue_iid = @IdCuenta