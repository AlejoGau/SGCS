CREATE OR ALTER PROCEDURE [dbo].[AWCC_Llamadas]
	@cue_iid INT,	
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT     
AS  
	SET NOCOUNT ON
	
	SELECT gra_iid,gra_iidcuenta,gra_dfechahora,gra_carchivo, replace(replace(convert(varchar, gra_nduracion), ',00', ''), '.00', '') gra_nduracion, gra_iidrecepcion
	,r.* 
	,ta.* 
	  FROM [_datos].[dbo].p_grabacion_audio a 
		   LEFT OUTER JOIN [_datos].[dbo].p_recepcion r ON r.rec_iid = a.gra_iidrecepcion 
		   
        INNER JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma    
	 WHERE a.gra_iidcuenta = @cue_iid and rec_calarma is not null
	 order by a.gra_dfechahora desc