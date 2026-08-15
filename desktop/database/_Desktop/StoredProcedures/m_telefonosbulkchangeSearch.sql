-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2019
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[m_telefonosbulkchangeSearch]
	-- Add the parameters for the stored procedure here
	@token VARCHAR(128) = '',      
	@filter varchar(max),
	@newNumber varchar(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	 --Filters
	DECLARE @SqlFilter AS NVARCHAR(MAX)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'telefono')
	print @SqlFilter

	-- Rangos
	DECLARE @SqlFilterRango AS VARCHAR(max) = ''

	if @token != ''
	BEGIN
	EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
	END

	DECLARE @Sql NVARCHAR(MAX)
	SET @Sql = 'update o set o.tel_ctelefono = '''+@newNumber+'''
		from _datos..[m_telefonos] o
		left join _datos..m_cuentas c on cue_iid = tel_iidcuenta
		WHERE 1 = 1 ' + @SqlFilter + @SqlFilterRango

	print @Sql

	exec (@sql)
END