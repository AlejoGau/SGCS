CREATE OR ALTER PROCEDURE [dbo].[AWCC_ImagenesDeEventos]
	@cue_iid INT,	
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',     
	@rec_iid INT = 0,
	@totalrows INT = 1 OUTPUT     
AS  
	SET NOCOUNT ON 
	

	If @rec_iid=0 Or @rec_iid Is Null
	Begin
		SELECT top 200 i.*, r.*, ta.*
		  FROM [_datos].[dbo].p_grabacion_img i 
			   LEFT OUTER JOIN [_datos].[dbo].p_recepcion r ON r.rec_iid = i.gri_iidrecepcion 
		   
			left JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma    
		 WHERE i.gri_iidcuenta = @cue_iid --and rec_calarma is not null
		 order by i.gri_dfechahora desc
	 End
	 Else
	 Begin
		SELECT top 200 i.*, r.*, ta.*
		  FROM [_datos].[dbo].p_grabacion_img i 
			   LEFT OUTER JOIN [_datos].[dbo].p_recepcion r ON r.rec_iid = i.gri_iidrecepcion 
		   
			left JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma    
		 WHERE i.gri_iidrecepcion = @rec_iid 
		 order by i.gri_dfechahora desc
	 End