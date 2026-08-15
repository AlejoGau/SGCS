CREATE OR ALTER PROCEDURE [dbo].[SearchCuentaSinControlTSTByDealer]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @dealer NVARCHAR(4) = '',
 @nombre NVARCHAR(128) = '',     
 @cuentaDesde NVARCHAR(4) = '',  
 @cuentaHasta NVARCHAR(4) = '',  
 @checkbox Int = 0,  
 @token NVARCHAR(128),     
 @_dc NVARCHAR(256) = '', 
 @totalrows INT = 1 OUTPUT
 
As                
BEGIN                
	Set NOCOUNT ON              
	Set DateFormat YMD
 
	--RANGOS 
	Declare @SqlFilterRango As VARCHAR(max)
	EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = '', @SqlFilterRango = @SqlFilterRango OUTPUT
           
	--Order          
	Declare @SortField NVARCHAR(128)           
	Declare @SortDirection NVARCHAR(4)          
	SELECT @SortField = 'cue_clinea,cue_ncuenta', @SortDirection = 'ASC'           
 
	Declare @Sql NVARCHAR(MAX)          
	Set @Sql = ''
		Set @Sql = @Sql + ' WHERE 1 = 1'          
               
	--Filters
	Declare @JoinAlarma int;
	Set @JoinAlarma = 0;

	Set @sql += @SqlFilterRango
	/*
	Print '=========================='
	print @Sql
	Print '=========================='
	*/
	IF @dealer != ''  
		Set @Sql = @Sql + ' AND cue_clinea = ''' + @dealer + ''''      

	IF @cuentaDesde  != '' 
		Set @Sql = @Sql + ' AND cue_ncuenta BETWEEN ''' + CAST(@cuentaDesde As VARCHAR) + ''' AND ''' + CAST(@cuentaHasta As VARCHAR) + ''''

	IF @nombre  != ''
		Set @Sql = @Sql + ' AND cue_cnombre LIKE ''%' + @nombre+'%''';

	/*
	Print '=========================='
	print @Sql           
	Print '=========================='
	*/

	Declare @SqlFrom NVARCHAR(max)

	Set @SqlFrom = '
		IF OBJECT_ID(''tempdb..#SCTTemp'') IS Not NULL
			Drop Table #SCTTemp

		;With SinControlTST As (
		SELECT [tst_iidcuenta]
		,[cue_clinea],[cue_ncuenta],[cue_cnombre]
		,1 As Tst1
		,0 As Tst2
		,0 As Tst3
		  FROM [_Datos].[dbo].[m_tst_prueba]
		  Inner Join [_Datos].[dbo].[m_cuentas] On [tst_iidcuenta]=[cue_iid]
		  Where [tst_ncada]=0 Or ( [tst_ncada]>0 And [tst_calarma]='''' )

		Union All

		SELECT [tst_iidcuenta]
		,[cue_clinea],[cue_ncuenta],[cue_cnombre]
		,0 As Tst1
		,1 As Tst2
		,0 As Tst3
		  FROM [_Datos].[dbo].[m_tst_prueba]
		  Inner Join [_Datos].[dbo].[m_cuentas] On [tst_iidcuenta]=[cue_iid]
		  Where [tst_ncada2]=0 Or ( [tst_ncada2]>0 And [tst_calarmagenerar]='''' )

		Union All

		SELECT [tst_iidcuenta]
		,[cue_clinea],[cue_ncuenta],[cue_cnombre]
		,0 As Tst1
		,0 As Tst2
		,1 As Tst3
		  FROM [_Datos].[dbo].[m_tst_prueba]
		  Inner Join [_Datos].[dbo].[m_cuentas] On [tst_iidcuenta]=[cue_iid]
		  Where [tst_ncada3]=0 Or ( [tst_ncada3]>0 And [tst_calarma3generar]='''' )

		)
		Select ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') As RowNumber,
			tst_iidcuenta,cue_clinea,cue_ncuenta,cue_cnombre,Max(Tst1) As Tst1,Max(Tst2) As Tst2,Max(Tst3) As Tst3
		Into #SCTTemp
		From SinControlTST
	'

	Set @Sql = @SqlFrom + @Sql

	/*
	@checkbox
	1 - Telefonico
	2 - GPRS
	3 - Seguidor
	4 - Telefonico + GPRS
	5 - Todos
	*/
	Set @sql += '
		And Not (cue_clinea=''_SG'' And cue_ncuenta = ''INTE'' ) '

	Set @sql += '
		Group By tst_iidcuenta,cue_clinea,cue_ncuenta,cue_cnombre '

	Set @sql += '
		Select * From #SCTTemp '

	If @checkbox = 1
		Set @sql += ' WHere Tst1=1 '
	Else If @checkbox = 2
		Set @sql += ' WHere Tst2=1 '
	Else If @checkbox = 3
		Set @sql += ' WHere Tst3=1 '
	Else If @checkbox = 4
		Set @sql += ' WHere Tst1=1 And Tst2=1  '
	Else If @checkbox = 5
		Set @sql += ' WHere Tst1=1 And Tst2=1 And Tst3=1 '

	Set @sql += 'Order By RowNumber ASC '

	/*
	Print '=========================='
	Print CAST(@Sql As VARCHAR(MAX))              
	*/
	Execute (@Sql)              
               
	--Cantidad de registros              
	Select @totalrows = @@ROWCOUNT    
	--Print @totalrows
              
END