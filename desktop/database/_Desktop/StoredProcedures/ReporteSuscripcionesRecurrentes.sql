CREATE OR ALTER PROCEDURE [dbo].[ReporteSuscripcionesRecurrentes]                                                         
 @nombre NVARCHAR(128) = '',     
 @dni NVARCHAR(40) = '',  
 @telefono NVARCHAR(4) = '',  
 @estado NVARCHAR(15) = '',  
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
		Set @Sql = @Sql + ' AND Nombre LIKE ''' + @nombre + '%'''
	
	IF @dni != ''  
		Set @Sql = @Sql + ' AND JSON_VALUE(Cast(jsonMP as varchar(max)), ''$.dni'') LIKE ''' + @dni + '%'''  

	IF @telefono != ''  
		Set @Sql = @Sql + ' AND Telefono LIKE ''' + @telefono + '%'''  

	If @estado = 'activo'
		Set @sql += ' AND estado = ''authorized'' '
	Else If @estado = 'inactivo'
		Set @sql += ' AND estado != ''authorized'' '
	
	/*
	Print '=========================='
	print @Sql           
	Print '=========================='
	*/

	Declare @SqlFrom NVARCHAR(max)

	Set @SqlFrom = '
		;With SmartPanicsInfo As (
		SELECT
		--CAMPOS
		p.plw_metadata As jsonMP
		,s.date_created 
		,s.start_date
		,s.next_payment_date
		,r.estado
		,r.message
		,p.plw_imei
		,m.Telefono
		,m.Nombre
		,d.cue_ncuenta
		,d.cue_clinea
		--JOINS
		FROM [_Datos].[dbo].[p_landingWorkflow] p
		INNER JOIN [_Datos].[dbo].[MP_SuscriptionRequest] r
		ON p.plw_token= r.token
		LEFT JOIN [_Datos].[dbo].[MP_SuscriptionResponseAuthorized] s
		ON r.token = s.token
		LEFT JOIN [_Datos].[dbo].[SmartPanic] m
		ON p.plw_imei = m.Imei
		LEFT JOIN [_Datos].[dbo].[m_cuentas] d
		ON m.CuentaId = d.cue_iid
		)
		Select
		cue_clinea As Dealer
		,cue_ncuenta As Cuenta
		,Nombre As Nombre
		,Telefono As Telefono
		,plw_imei As Imei
		,JSON_VALUE(Cast(jsonMP as varchar(max)), ''$.dni'') As landignDNI
		,JSON_VALUE(Cast(jsonMP as varchar(max)), ''$.email'')  as landigMail
		,date_created As FechaAlta
		,start_date As PrimerPago
		,next_payment_date As ProximoPago
		,estado As Estado
		,message As MsjError
		From SmartPanicsInfo
	'

	Set @Sql = @SqlFrom + @Sql

	/*
	Print '=========================='
	Print CAST(@Sql As VARCHAR(MAX))              
	*/
	Execute (@Sql)              
               
	--Cantidad de registros              
	Select @totalrows = @@ROWCOUNT    
	--Print @totalrows
              
END