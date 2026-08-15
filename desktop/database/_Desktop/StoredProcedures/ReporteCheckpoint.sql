CREATE OR ALTER PROCEDURE [dbo].[ReporteCheckpoint] 

 @historico NVARCHAR(40) = '',  
 @fechadesde NVARCHAR(40) = '',   
 @fechahasta NVARCHAR(40) = '',  
 @dealerdesde NVARCHAR(50) = '',  
 @dealerhasta NVARCHAR(50) = '',
 @cuentadesde NVARCHAR(128) = '',
 @cuentahasta NVARCHAR(128) = '', 
 @idcuenta NVARCHAR(128) = '',
 @agrupar NVARCHAR(128) = '',
-- @token VARCHAR(128) = '',                
 @totalrows INT = 1 OUTPUT

As                
BEGIN                
	Set NOCOUNT ON              
	Set DateFormat YMD
 
	Declare @Sql NVARCHAR(MAX)   
	Declare @Check NVARCHAR(MAX) 
	Set @Sql = ''
	Set @Check = ''
		Set @Sql = @Sql + ' WHERE 1 = 1 AND rec_calarma IN (''TAG'',''V04'',''V29'',''_PI'') '          

	
	IF @historico = ''  
		Set @historico = 'p_recepcion'

	IF @fechadesde != ''  
		Set @Sql = @Sql + ' AND rec_tfechahora >''' + @fechadesde + ' 00:00:00'+''''  

	IF @fechahasta != ''  
		Set @Sql = @Sql + ' AND rec_tfechahora <''' + @fechahasta + ' 23:59:59'+''''   

	IF @dealerdesde != '' AND @dealerhasta = '' 
	begin
		SET @Sql = @Sql + ' AND cue_clinea = ''' + @dealerdesde + ''''   
	end

	IF @dealerdesde != '' AND @dealerhasta != '' 
	begin
		SET @Sql = @Sql + ' AND cue_clinea >= ''' + @dealerdesde + '''  AND cue_clinea <= ''' + @dealerhasta + ''' '       
	end
	
	IF @cuentadesde != ''  
	begin
	  SET @Sql = @Sql + ' AND cue_ncuenta >= ''' + @cuentadesde + ''''
	end

	IF @cuentahasta != ''  
	begin
	  SET @Sql = @Sql + ' AND cue_ncuenta <= ''' + @cuentahasta + ''''
	end

	IF @idcuenta != ''   AND @idcuenta != '0'   
	begin
		SET @Sql = @Sql + ' AND rec_iidcuenta IN (' + @idcuenta + ') ' 
	end

	IF @agrupar != '' 
	begin
		SET @Check = ' [usu_cnombre] ASC,' 
	end

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

	Set @Sql = @SqlFrom + @Sql + 'ORDER BY cue_clinea ASC, cue_ncuenta ASC, cue_cnombre ASC,'+ @Check+'zon_cdescripcion ASC'

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