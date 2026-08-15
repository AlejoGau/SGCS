CREATE OR ALTER PROCEDURE [dbo].[AWCC_Services]
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
	
	SELECT st.*, tst.tip_cdescripcion 
	  FROM _datos.dbo.m_st_cabecera st  
	       LEFT OUTER JOIN [_tablas].[dbo].t_tiposervicio tst ON st.stc_ctipo_servicio = tst.tip_ccodigo 
	 WHERE stc_iid_cuenta = @cue_iid 
  ORDER BY stc_dfecha_modificacion desc