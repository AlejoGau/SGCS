-- =============================================
-- Author:		<Franco Jalil>
-- Create date: < 16/05/2023>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ReporteEventosPorDiaSearch]
	
	@historico NVARCHAR(40) = '',  
	@fechadesde NVARCHAR(40) = '',   
	@fechahasta NVARCHAR(40) = '',
	@token NVARCHAR(40) = '',
	@totalrows INT = 1 OUTPUT
As                
BEGIN                
	Set NOCOUNT ON              
	Set DateFormat YMD

	Declare @Sql NVARCHAR(MAX)

	Set @Sql = ''
							
	IF @historico = ''  
	Set @historico = 'p_recepcion'

	IF @fechadesde != ''  
		Set @Sql = @Sql + ' AND rec_tfechahora >''' + @fechadesde + ' 00:00:00'+''''  

	IF @fechahasta != ''  
		Set @Sql = @Sql + ' AND rec_tfechahora <''' + @fechahasta + ' 23:59:59'+''''  

	Declare @SqlFrom NVARCHAR(max)

		Set @SqlFrom = '
SELECT [rec_iid]
      ,[rec_iidcuenta]
      ,[rec_calarma]
      ,[rec_czona]
      ,[rec_iusuario]
      ,CONVERT(NVARCHAR(10), rec_tfechahora, 101) AS rec_tfechahora
      ,[rec_nestado]
	  ,[cue_clinea]
	  ,[cue_ncuenta]
	  ,[cue_cnombre]
	  ,[zon_cdescripcion]
	  ,[usu_cnombre]
  FROM [_Datos].[dbo].['+@historico+'] r
  INNER JOIN [_Datos].[dbo].[m_cuentas] c
  ON r.rec_iidcuenta = c.cue_iid
  INNER JOIN [_Datos].[dbo].[m_zonas] z
  ON r.rec_czona = z.zon_ccodigo and r.rec_iidcuenta = z.zon_iidcuenta
  INNER JOIN [_Datos].[dbo].[m_usuarios] u
  ON r.rec_iidcuenta = u.usu_iidcuenta and r.rec_iusuario = u.usu_icodigo
	'
	Set @Sql = @SqlFrom + @Sql + 'ORDER BY cue_clinea ASC, cue_ncuenta ASC, cue_cnombre ASC'

	print @Sql
	Execute (@Sql)              
               
	--Cantidad de registros              
	Select @totalrows = @@ROWCOUNT    
	--Print @totalrows
              
END