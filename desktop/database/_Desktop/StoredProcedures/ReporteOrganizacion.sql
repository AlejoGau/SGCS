CREATE OR ALTER PROCEDURE [dbo].[ReporteOrganizacion]                                                         
 @nombre NVARCHAR(128) = '',     
 @provest NVARCHAR(40) = '',  
 @identificador NVARCHAR(50) = '',  
 @IdentificadorFisc NVARCHAR(50) = '',
 @nombreLegal NVARCHAR(128) = '',
 @estadogrupo NVARCHAR(128) = '', 
 @tipo NVARCHAR(128) = '', 
 @token NVARCHAR(128),      
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

	Set @sql += @SqlFilterRango
	/*
	Print '=========================='
	print @Sql
	Print '=========================='
	*/
	IF @nombre != ''  
		Set @Sql = @Sql + ' AND o.Name LIKE ''' + @nombre + '%'''
	
	IF @provest != ''  
		Set @Sql = @Sql + ' AND l.pro_cdescripcion LIKE ''' + @provest + '%'''
		
	IF @identificador != ''  
		Set @Sql = @Sql + ' AND o.StateTax LIKE ''' + @identificador + '%'''  
	
	IF @IdentificadorFisc != ''  
		Set @Sql = @Sql + ' AND o.NationalTax LIKE ''' + @IdentificadorFisc + '%'''  

	IF @nombreLegal != ''  
		Set @Sql = @Sql + ' AND o.LegalName LIKE ''' + @nombreLegal + '%'''  

	IF @tipo != ''  
		Set @Sql = @Sql + ' AND o.OrganizationType = ''' + @tipo + ''''  

	If @estadogrupo = '0'
		Set @sql += 'AND o.Status = ''0'' '
	Else If @estadogrupo = '1'
		Set @sql += 'AND o.Status = ''1'' OR o.Status = ''2'' OR o.Status = ''3'''
	Else If @estadogrupo = '2'
		Set @sql += 'AND o.Status = ''4'' OR o.Status = ''5'' OR o.Status = ''6'''
	Else If @estadogrupo = '3'
		Set @sql += 'AND o.Status = ''7'' OR o.Status = ''8'' OR o.Status = ''9'''
	/*
	Print '=========================='
	print @Sql           
	Print '=========================='
	*/

	Declare @SqlFrom NVARCHAR(max)

	Set @SqlFrom = '
SELECT
	--Informacion de Organizacion
	o.Id,
	o.Status as EstadoGrupo,
	o.Name as Nombre,
	o.Phone as Telefono,
	o.Address as Direccion,
	l.pro_cdescripcion as Estado,
	o.City as Ciudad,
	o.Email,
	o.LegalName as NombreLegal,
	o.StateTax as Identificador,
	o.NationalTax as IdentificadorFiscal,
	o.Mobile as Movil,
	
	--Estado
	o.Status as GrupoEstado,
	o.DateCreated as FechaCreacion,

	--Notas
	o.SmallComment as Nota
FROM [_Datos].[dbo].[Organization] o

	--JOINS
LEFT JOIN [_Tablas].[dbo].[t_provincias] l
ON o.State = l.pro_idKey 
	'

	Set @Sql = @SqlFrom + @Sql

	/*
	Print '=========================='
	Print CAST(@Sql As VARCHAR(MAX))              
	*/
	--print @Sql
	Execute (@Sql)              
               
	--Cantidad de registros              
	Select @totalrows = @@ROWCOUNT    
	--Print @totalrows
              
END