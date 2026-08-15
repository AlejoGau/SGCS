-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ReporteEventosPorDia]
	@historico NVARCHAR(40) = '',
	@fechadesde NVARCHAR(40) = '',
	@fechahasta NVARCHAR(40) = '',
	@totalrows INT = 1 OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	Set NOCOUNT ON              
	Set DateFormat YMD

	Declare @Sql NVARCHAR(MAX)   
	Declare @Horas NVARCHAR(MAX) 
	Set @Sql = ''
	Declare @SqlFrom NVARCHAR(max)
	Set @Horas = ''

	IF @historico = ''
		Set @historico = 'p_recepcion'

	IF @fechadesde != ''  
		Set @Horas = @Horas + ' WHERE rec_tfechahora >''' + @fechadesde + ' 00:00:00'''

	IF @fechahasta != ''
		Set @Horas = @Horas + ' AND rec_tfechahora <''' + @fechahasta + ' 23:59:59'''

    Set @SqlFrom = '
		SELECT CONVERT(NVARCHAR(10), rec_tfechahora, 101) AS rec_tfechahora, COUNT(*) AS cantidad_checkpoint
		FROM [_Datos].[dbo].['+@historico+'] r
		'+@Horas+'
		GROUP BY CONVERT(NVARCHAR(10), rec_tfechahora, 101)
		ORDER BY rec_tfechahora ASC;'

	Set @Sql = @SqlFrom + @Sql
	
	print @Sql

	Execute (@Sql)              
               
	--Cantidad de registros              
	Select @totalrows = @@ROWCOUNT
              
END