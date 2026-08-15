CREATE OR ALTER PROCEDURE [dbo].[ReporteCheckpointDia] 

 @historico NVARCHAR(40) = '', 
 @cue_clinea NVARCHAR(40) = '',   
 @cue_ncuenta NVARCHAR(40) = '',  
 @cue_cnombre NVARCHAR(50) = '',
 @fechadesde NVARCHAR(40) = '',   
 @fechahasta NVARCHAR(40) = '',
 --@token VARCHAR(128) = '',


 @totalrows INT = 1 OUTPUT

As                
BEGIN                
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
		Set @Horas = @Horas + ' AND rec_tfechahora >''' + @fechadesde + ' 00:00:00'''  

	IF @fechahasta != ''  
		Set @Horas = @Horas + ' AND rec_tfechahora <''' + @fechahasta + ' 23:59:59'''   


	Set @SqlFrom = '
SELECT CONVERT(NVARCHAR(10), rec_tfechahora, 101) AS rec_tfechahora, cue_clinea, cue_ncuenta, cue_cnombre, COUNT(*) AS cantidad_checkpoint
FROM [_Datos].[dbo].['+@historico+'] r
INNER JOIN [_Datos].[dbo].[m_cuentas] c
ON r.rec_iidcuenta = c.cue_iid
INNER JOIN [_Datos].[dbo].[m_zonas] z
ON r.rec_czona = z.zon_ccodigo and r.rec_iidcuenta = z.zon_iidcuenta
INNER JOIN [_Datos].[dbo].[m_usuarios] u
ON r.rec_iidcuenta = u.usu_iidcuenta and r.rec_iusuario = u.usu_icodigo
WHERE 1 = 1 AND rec_calarma IN (''TAG'',''V04'',''V29'',''_PI'') AND cue_clinea = '''+@cue_clinea+''' AND cue_ncuenta = '''+@cue_ncuenta+''' AND cue_cnombre = '''+@cue_cnombre+''''+@Horas+'
GROUP BY CONVERT(NVARCHAR(10), rec_tfechahora, 101), cue_clinea, cue_ncuenta, cue_cnombre
ORDER BY rec_tfechahora ASC, cue_clinea ASC, cue_ncuenta ASC, cue_cnombre ASC;'

	Set @Sql = @SqlFrom + @Sql 

	/*
	Print '=========================='
	Print CAST(@Sql As VARCHAR(MAX))              
	*/
	print @Sql

	Execute (@Sql)              
               
	--Cantidad de registros              
	Select @totalrows = @@ROWCOUNT    
	--Print @totalrows
              
END