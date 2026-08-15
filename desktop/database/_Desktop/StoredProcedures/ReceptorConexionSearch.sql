CREATE OR ALTER PROCEDURE [dbo].[ReceptorConexionSearch]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,                       
	@_dc VARCHAR(256) = '',              
	@filter VARCHAR(2048) = ''
AS
BEGIN
	SET NOCOUNT ON;
	 --Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Sistema].[dbo].[v_ReceptoresIRS]')

	DECLARE @Sql NVARCHAR(MAX)
	SET @Sql = '
		SELECT * FROM [_Sistema].[dbo].[v_ReceptoresIRS]
		WHERE ipc_nport > 1000 ' + @SqlFilter
		+' ORDER BY iprs_ccnombre, ipc_cdescripcion '
	
	--Print (@sql)
	Execute (@sql)

END