CREATE OR ALTER PROCEDURE [dbo].[CopiarCheckPointsSelected]
	@cuentaDesde Int = 0,
	@cuentaHasta Int = 0,
	@remplazarDuplicados Int = 0,
	@filter Varchar(max) = ''
As
Begin

	If @cuentaDesde = 0 Or @cuentaHasta = 0 Or @filter = ''
	Begin
		Print 'Falta Datos Para Gestion (Cuenta Desde/Hasta o IDs de CHP a copiar)'
		Set NoExec ON	
	End 

	Declare	@chp_idKey Int = 0, 
			@chp_cReference VarChar (100) = '', 
			@chp_cZona Char (3) = '', 
			@chp_rLatitud Real = 0, 
			@chp_rLongitud Real = 0, 
			@chp_iTolerancia Int = 0, 
			@chp_nTipo Int = 0,
			@id_ZonMax Int = 0,
			@Sql nVARCHAR(max) = ''

	--Filters
	DECLARE @SqlFilter AS VARCHAR(max)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')

	If @remplazarDuplicados = 1
	Begin 
		Print 'Busco y Borro Los CheckPoint Existentes'
		
		CREATE TABLE #TempCheckPoints (chp_idKey Int,chp_cReference Varchar(100));

		Set @sql = N'
		INSERT INTO #TempCheckPoints ([chp_idKey], [chp_cReference])
		SELECT [chp_idKey], [chp_cReference] 
		FROM [_Tablas].[dbo].[t_checkPoints_VC] 
		WHERE [chp_iCuenta] = ' + CAST(@CuentaHasta AS VARCHAR(10)) + N'
		AND [chp_cReference] IN (
			SELECT C.[chp_cReference] 
			FROM [_Tablas].[dbo].[t_checkPoints_VC] C 
			WHERE C.[chp_iCuenta] = ' + CAST(@cuentaDesde AS VARCHAR(10)) + ' ' + ISNULL(@SqlFilter, '') + N'
		)';
		
		Print @sql
		Execute sp_executesql @sql

		Declare RemplazarDuplicados Cursor Scroll for 
			Select [chp_idKey], [chp_cReference] 
				From #TempCheckPoints;

		Open RemplazarDuplicados
		Fetch Next From  RemplazarDuplicados Into @chp_idKey, @chp_cReference
		While @@Fetch_Status = 0

		Begin
			Print 'Procesando CheckPoint: ' + Rtrim(@chp_cReference) + ' | RemplazarDuplicados en SI | Borro de Cuenta Destino el chp_idKey : '+Cast(@chp_idKey As Varchar(10))
			Exec [_Desktop].[dbo].[SearchCheckPointDelete] @Id = @chp_idKey

			Fetch Next From  RemplazarDuplicados Into @chp_idKey, @chp_cReference
		End

		Close RemplazarDuplicados
		DEALLOCATE RemplazarDuplicados
		IF OBJECT_ID('tempdb..#TempCheckPoints') IS Not NULL
			DROP TABLE #TempCheckPoints
	End
	
	Print 'Busco CheckPoint a Copiar Desde La Cuenta Origen'
	
	IF OBJECT_ID('tempdb..#tempTable') IS Not NULL
		Drop Table #tempTable

	CREATE TABLE #tempTable ([chp_idKey] Int, [chp_cReference] Varchar(100), [chp_cZona] Char(3), [chp_rLatitud] Real, [chp_rLongitud] Real, [chp_iTolerancia] Int, [chp_nTipo] Int)
	--Sql
	Set @Sql = 'Insert Into #tempTable 
		Select [chp_idKey], [chp_cReference], [chp_cZona], [chp_rLatitud], [chp_rLongitud], [chp_iTolerancia], [chp_nTipo]
		From [_Tablas].[dbo].[t_checkPoints_VC] 
		Where [chp_iCuenta] = @CuentaDesde ' + @SqlFilter 

	Execute sp_executesql @Sql, N'@CuentaDesde INT', @CuentaDesde

	Declare CheckPoints_Cursor Cursor Local For
		Select [chp_idKey], [chp_cReference], [chp_cZona], [chp_rLatitud], [chp_rLongitud], [chp_iTolerancia], [chp_nTipo]
		From  #tempTable
		
	Open CheckPoints_Cursor
	Fetch Next From CheckPoints_Cursor INTO @chp_idKey, @chp_cReference, @chp_cZona, @chp_rLatitud, @chp_rLongitud, @chp_iTolerancia, @chp_nTipo
	While @@Fetch_Status = 0
	Begin
		Print '==================='
		Print 'Procesando CheckPoint: ' + Rtrim(@chp_cReference)
		Print 'Me Fijo Si CheckPoint Existe'
		If Not Exists (Select [chp_idKey] From [_Tablas].[dbo].[t_checkPoints_VC] Where [chp_iCuenta] = @CuentaHasta And [chp_cReference] = @chp_cReference)
		Begin

			-- Me Fijo Si Existe El Numero De Zona
			If Exists (Select [zon_iidcuenta] From [_Datos].[dbo].[m_zonas] Where [zon_ccodigo] = @chp_cZona And [zon_iidcuenta] = @cuentaHasta)
			Begin
				
				Print 'Existe La Zona, Sumo +1 Al Nro. De Zona'
					
				Select Top 1 @id_ZonMax = [zon_cCodigo] + 1 
					From [_Datos].[dbo].[m_zonas] 
					Where [zon_iidcuenta] = @CuentaHasta And IsNumeric(zon_cCodigo) = 1 
					Order By Cast(zon_cCodigo As Int) Desc
					
				
				Print 'Numero de Zona: ' + CAST(@id_ZonMax As nVarChar(5))
					
				Insert Into [_Datos].[dbo].[m_zonas] (zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar)
				Select @cuentaHasta, @id_zonmax, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar 
				From [_Datos].[dbo].[m_zonas] Where [zon_ccodigo] = @chp_cZona And [zon_iidcuenta] = @CuentaDesde
				
				Set @chp_cZona = @id_ZonMax
				
			End
			Else 
			Begin
				Print 'No Existe La Zona, Inserto Zona Igual A Origen'
				Insert Into [_Datos].[dbo].[m_zonas] (zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar) 
				Select @cuentaHasta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar 
				From [_Datos].[dbo].[m_zonas] Where [zon_ccodigo] = @chp_cZona And [zon_iidcuenta] = @cuentaDesde
				
			End

			-- Inserto CheckPoint 
			Print 'Inserto CheckPoint en [t_checkPoints_VC]'
			Print 'con Numero de Zona: ' + Cast(@chp_cZona As nVarChar(10))

			Insert Into [_Tablas].[dbo].[t_checkPoints_VC] (chp_cReference, chp_cZona, chp_iCuenta, chp_rLatitud, chp_rLongitud, chp_iTolerancia, chp_nTipo)
			Values (@chp_cReference, @chp_cZona, @cuentaHasta, @chp_rLatitud, @chp_rLongitud, @chp_iTolerancia, @chp_nTipo)

		End 
		Else
			Print 'Exsite El CheckPoint, NO Modifico'

		Fetch Next From CheckPoints_Cursor Into @chp_idKey, @chp_cReference, @chp_cZona, @chp_rLatitud, @chp_rLongitud, @chp_iTolerancia, @chp_nTipo
	End
	
	Close CheckPoints_Cursor
	Deallocate CheckPoints_Cursor

	IF OBJECT_ID('tempdb..#tempTable') IS Not NULL
		Drop Table #tempTable

	Set NoExec Off
End