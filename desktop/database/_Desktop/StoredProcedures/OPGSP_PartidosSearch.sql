-- =============================================
-- Author:		Rodrigo Román
-- Create date: 6/2/2020
-- Description:	Lista de partidos prov buenos aires para OPGSP
-- =============================================
CREATE OR ALTER PROCEDURE OPGSP_PartidosSearch 
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 1000,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @token VARCHAR(128) = ''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select distinct OPGSP_idPartido,OPGSP_cPartido  from _tablas..OPGSP_PartidoLocalidad
	order by OPGSP_cPartido asc
END