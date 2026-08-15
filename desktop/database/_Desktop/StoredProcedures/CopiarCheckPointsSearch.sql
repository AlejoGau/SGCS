CREATE OR ALTER PROCEDURE [dbo].[CopiarCheckPointsSearch]
	@CuentaDesde Int = 0,
	@CuentaHasta Int = 0,
	@RemplazarDuplicados Int = 0
As
Begin

	If @CuentaDesde = 0 Or @CuentaHasta = 0
	Begin
	
		Print 'Falta Datos Para Gestion (Cuenta Desde o Cuenta Hasta)'
	
	End 
	Else Begin

	Declare 
			@chp_idKey Int = 0, 
			@chp_cReference VarChar (100) = '', 
			@chp_cZona Char (3) = '', 
			@chp_rLatitud Real = 0, 
			@chp_rLongitud Real = 0, 
			@chp_iTolerancia Int = 0, 
			@chp_nTipo Int = 0,
			@id_ZonMax Int = 0

		If @RemplazarDuplicados = 1
		Begin 
		
			Print 'Busco y Borro Los CheckPoint Existentes'
		
			Declare RemplazarDuplicados Cursor Scroll for Select [chp_idKey], [chp_cReference] 
			From [_Tablas].[dbo].[t_checkPoints_VC] 
			Where [chp_iCuenta] = @CuentaHasta 
			And [chp_cReference] In 
				(Select C.[chp_cReference] From [_Tablas].[dbo].[t_checkPoints_VC] C Where C.[chp_iCuenta] = @cuentaDesde)

			Open RemplazarDuplicados
			Fetch Next From  RemplazarDuplicados Into @chp_idKey, @chp_cReference
			While @@Fetch_Status = 0

			Begin
				Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | RemplazarDuplicados en SI | Borro de Cuenta Destino El Registro'
				Exec [_Desktop].[dbo].[SearchCheckPointDelete] @Id = @chp_idKey
				Fetch Next From  RemplazarDuplicados Into @chp_idKey, @chp_cReference
			End

			Close RemplazarDuplicados
			DEALLOCATE RemplazarDuplicados
		
		End
	
		Print 'Busco CheckPoint a Copiar Desde La Cuenta Origen'
	
		Declare CheckPoints_Cursor Cursor Local For Select [chp_idKey], [chp_cReference], [chp_cZona], [chp_rLatitud], [chp_rLongitud], [chp_iTolerancia], [chp_nTipo]
		From [_Tablas].[dbo].[t_checkPoints_VC] 
		Where [chp_iCuenta] = @CuentaDesde
	
		Open CheckPoints_Cursor
		Fetch Next From CheckPoints_Cursor INTO @chp_idKey, @chp_cReference, @chp_cZona, @chp_rLatitud, @chp_rLongitud, @chp_iTolerancia, @chp_nTipo
		While @@Fetch_Status = 0
		Begin
	
			Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | Me Fijo Si CheckPoint Existe'
			If Not Exists (Select [chp_idKey] From [_Tablas].[dbo].[t_checkPoints_VC] Where [chp_iCuenta] = @CuentaHasta And [chp_cReference] = @chp_cReference)
			Begin

				-- Me Fijo Si Existe El Numero De Zona
				If Exists (Select [zon_iidcuenta] From [_Datos].[dbo].[m_zonas] Where [zon_ccodigo] = @chp_cZona And [zon_iidcuenta] = @cuentaHasta)
				Begin
				
					Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | Existe La Zona, Sumo +1 Al Nro. De Zona'
						Select Top 1 @id_ZonMax = [zon_cCodigo] + 1 
						From [_Datos].[dbo].[m_zonas] 
						Where [zon_iidcuenta] = @CuentaHasta And IsNumeric(zon_cCodigo) = 1 
						Order By Cast(zon_cCodigo As Int) Desc
					
				
					Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | Numero de Zona: ' + CAST(@id_ZonMax As nVarChar(5))
					Insert Into [_Datos].[dbo].[m_zonas] (zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar)
					Select @cuentaHasta, @id_zonmax, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar 
					From [_Datos].[dbo].[m_zonas] Where [zon_ccodigo] = @chp_cZona And [zon_iidcuenta] = @CuentaDesde
				
					Set @chp_cZona = @id_ZonMax
				
				End
				Else Begin
				
					Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | No Existe La Zona, Inserto Zona Igual A Origen'
					Insert Into [_Datos].[dbo].[m_zonas] (zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar) 
					Select @cuentaHasta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa, zon_cAlarmaAGenerar 
					From [_Datos].[dbo].[m_zonas] Where [zon_ccodigo] = @chp_cZona And [zon_iidcuenta] = @cuentaDesde
				
				End

				-- Inserto CheckPoint 
				Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | Inserto CheckPoint en [t_checkPoints_VC]'
				Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | Numero de Zona: ' + Cast(@chp_cZona As nVarChar(10))
				Insert Into [_Tablas].[dbo].[t_checkPoints_VC] (chp_cReference, chp_cZona, chp_iCuenta, chp_rLatitud, chp_rLongitud, chp_iTolerancia, chp_nTipo)
				Values (@chp_cReference, @chp_cZona, @cuentaHasta, @chp_rLatitud, @chp_rLongitud, @chp_iTolerancia, @chp_nTipo)

			End 
			Else Begin
			
				Print 'Procesando CheckPoint: ' + CAST(RTRIM(@chp_cReference) As nVarChar(5)) + ' | Exsite El CheckPoint, NO Modifico'
			
			End
			Fetch Next From CheckPoints_Cursor Into @chp_idKey, @chp_cReference, @chp_cZona, @chp_rLatitud, @chp_rLongitud, @chp_iTolerancia, @chp_nTipo
	
		End
	
		Close CheckPoints_Cursor
		Deallocate CheckPoints_Cursor

	End

End