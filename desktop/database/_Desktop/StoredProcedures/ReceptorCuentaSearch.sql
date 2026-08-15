-- =============================================
-- Author:		Martin Velez
-- Create date: 16/09/2022
-- Description:	Workflow alternativo, landing Pilar
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ReceptorCuentaSearch]
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
		SELECT 0 AS iprsc_ipcidkey,'' TODAS LAS CONEXIONES'' AS ipc_cdescripcion
		UNION
		SELECT iprsc_ipcidkey, ipc_cdescripcion FROM [_Sistema].[dbo].[v_ReceptoresIRS]
		WHERE 1 = 1 ' + @SqlFilter
		+' ORDER BY 2 '
	
	Print (@sql)
	exec (@sql)

END