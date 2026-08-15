CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSBuscoFormato]
	@iReceptor [int] = 0,
	@iCuenta [int] = 0,
	@iTipo [int] = 0,
	@cEvento [VarChar](10) = '',
	@cZona [VarChar](10) = '',
	@cProtocolo [VarChar](10) = '',
	@iConexion [int] = 0,
	@cAlarma [Char](3) = '' OUTPUT,
	@iCtaMap [int] = 0 OUTPUT,
	@iCtaFwd [int] = 0 OUTPUT,
	@iLoopCtrl [int] = 0 OUTPUT,
	@cDebug Char(2) = 'No'	--'Si' 
AS
--Busca Formato para IRServices
--Devuelve codigo de alarma y el idCta si sale por MAP o FWD
--Autor : Pablo O. Canónico
--Fecha : 10/04/2017
--@iTipo => 0 : Resuelve por evento
--       => 1 : Resuelve por evento+zona
--2017-12-15 : Se modifico para considerar Evento al no encontrar Evento+Zona
--2018-09-05 : Se le saca el 0 a izquierda al @cFormato si @cProtocolo = '4+2'
--2018-11-07 : Se agrego @iMapFwd para mantener el iCta por llamado recursivo
--2020-12-04 : Se agrego protocolo '1/3' 'PIMA' que vienen de PG
--2022-06-27 : Se agrego @iConexion para buscar formatos por dll+conexion
--2022-07-20 : Se cambio control de busqueda para que considere primero el @iTipo y en @cProtocolo 4+2 que no le saque el 0 a izquierda a expresiones con 0 y letra
--2022-07-21 : Se agrego And @iTipo = 0 en 4+2 x que si tiene que pegar Evento+Zona ya deja a @cFormato como @cZona y despues pega @cZona + @cZona
--2022-10-25 : Se agrego Conexion=0 para buscar formatos por dll sin conexion
--2026-07-81 : Se agrego @cDebug
Set NoCount On
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = '',
		@cFormato nVarChar(10) = '',
		@cOriginal nVarChar(10) = ''

IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] --INICIO--';
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

If @iCuenta=0
	Set @iCuenta = NUll

IF (@iCuenta IS NULL)
BEGIN
	IF @cDebug = 'Si'
	Begin
		Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] Se descarto por iCuenta null';
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Set NoExec On
END

IF @cDebug = 'Si'
Begin
	Print '[SGSP_IRSBuscoFormato]  @iReceptor  : ' + CONVERT(VARCHAR(10), @iReceptor)
	Print '[SGSP_IRSBuscoFormato]  @iCuenta    : ' + CONVERT(VARCHAR(10), @iCuenta)
	Print '[SGSP_IRSBuscoFormato]  @iTipo      : ' + CONVERT(VARCHAR(10), @iTipo)
	Print '[SGSP_IRSBuscoFormato]  @cEvento    : ' + @cEvento
	Print '[SGSP_IRSBuscoFormato]  @cZona      : ' + @cZona
	Print '[SGSP_IRSBuscoFormato]  @cProtocolo : ' + @cProtocolo
	Print '[SGSP_IRSBuscoFormato]  @iConexion  : ' + CONVERT(VARCHAR(10), @iConexion)
End

Declare @iMapFwd Int = 0 

IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | @iLoopCtrl ('+Cast(@iLoopCtrl As Varchar(10))+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

Set @iLoopCtrl = @iLoopCtrl + 1
If @iLoopCtrl > 5
	Begin
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | @iLoopCtrl ('+Cast(@iLoopCtrl As Varchar(10))+') No Procesa '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Set NoExec On
	End

Set @cFormato = Rtrim(@cEvento)
If Len(@cProtocolo) >= 3
	Set @cProtocolo = Left(@cProtocolo,3)

/*
If @cProtocolo IN('4+2','1/3','PIMA')	--Si es 4+2 no hay resolucion por evento+zona
	Begin
		If @cZona<>''
			Set @cFormato = @cZona
		Else
			Begin
				If Len(@cFormato)=2 And Left(@cFormato,1)='0'
					Set @cFormato = Right(@cFormato,1)
			End
	End
Else
	Begin 
		If @iTipo = 1
			Begin
				Set @cOriginal = @cFormato
				Set @cFormato = @cFormato+@cZona
			End
	End
*/

If @cProtocolo IN('4+2','1/3','PIMA')
Begin
	If @cZona!='' And @iTipo = 0
		Set @cFormato = @cZona
	Else
		Begin
			If Len(@cFormato)=2 And Left(@cFormato,1)='0' And @cFormato!='00' And ( Select ISNUMERIC(Right(@cFormato,1)) ) > 0 
				Set @cFormato = Right(@cFormato,1)
		End
End

If @iTipo = 1
	Begin
		Set @cOriginal = @cFormato
		Set @cFormato = @cFormato+@cZona
	End

Set @cFormato = Ltrim(Rtrim(@cFormato))

IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco cFormato ('+@cFormato+') en las Zonas de la Cuenta id ('+Cast(@iCuenta As Varchar(10))+')' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

Select Top 1 @cAlarma=zon_codigoalarma From m_zonas Where zon_iidcuenta=@iCuenta And zon_ccodigo=@cFormato

If @cAlarma Is Null Or @cAlarma=''
	Begin	
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco cFormato ('+@cFormato+') con *'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Select Top 1 @cAlarma=zon_codigoalarma From m_zonas Where zon_iidcuenta=@iCuenta And zon_ccodigo=Left(@cFormato,1)+'*'

		If @cAlarma Is Null Or @cAlarma=''
			Begin
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco en Zonas de la Cuenta si tiene un MAP'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

			    Select Top 1 @iCtaMap=cue_iid From m_cuentas
					Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
				Where zon_iidcuenta=@iCuenta And zon_ccodigo='MAP' 
	
				If @iCtaMap > 0 And @iLoopCtrl = 1
					Begin
						--Set @cAlarma = '@M@'
						IF @cDebug = 'Si'
						Begin
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | MAP ejecuto recursivo [SGSP_IRSBuscoFormato]'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End

						IF @cDebug = 'Si'
						Begin
							Print ' @iReceptor  : ' + CONVERT(VARCHAR(10), @iReceptor)
							Print ' @iCuenta    : ' + CONVERT(VARCHAR(10), @iCtaMap)
							Print ' @iTipo      : ' + CONVERT(VARCHAR(10), @iTipo)
							Print ' @cEvento    : ' + @cEvento
							Print ' @cZona      : ' + @cZona
							Print ' @cProtocolo : ' + @cProtocolo
						End
						
						Set @iMapFwd = @iCtaMap
						Execute [dbo].[SGSP_IRSBuscoFormato] @iReceptor = @iReceptor, @iCuenta = @iCtaMap, @iTipo = @iTipo,	@cEvento = @cEvento, @cZona = @cZona, @cProtocolo = @cProtocolo, @cAlarma = @cAlarma OUTPUT, @iCtaMap = @iCtaMap OUTPUT, @iCtaFwd = @iCtaFwd OUTPUT, @iLoopCtrl = @iLoopCtrl OUTPUT
						Set @iCtaMap = @iMapFwd
					End
				Else
					Begin
						IF @cDebug = 'Si'
						Begin
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco en Zonas de la Cuenta si tiene un FWD'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End

						Select Top 1 @iCtaFwd=cue_iid From m_cuentas
							Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
						Where zon_iidcuenta=@iCuenta And zon_ccodigo='FWD'
	
						If @iCtaFwd > 0 And @iLoopCtrl = 1
							Begin
								--Set @cAlarma = '@F@'
								IF @cDebug = 'Si'
								Begin
									Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | FWD ejecuto recursivo [SGSP_IRSBuscoFormato]'
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
								End

								Set @iMapFwd = @iCtaFwd
								IF @cDebug = 'Si'
								Begin
									Print ' @iReceptor  : ' + CONVERT(VARCHAR(10), @iReceptor)
									Print ' @iCuenta    : ' + CONVERT(VARCHAR(10), @iMapFwd)
									Print ' @iTipo      : ' + CONVERT(VARCHAR(10), @iTipo)
									Print ' @cEvento    : ' + @cEvento
									Print ' @cZona      : ' + @cZona
									Print ' @cProtocolo : ' + @cProtocolo
								End

								Execute [dbo].[SGSP_IRSBuscoFormato] @iReceptor = @iReceptor, @iCuenta = @iMapFwd, @iTipo = @iTipo,	@cEvento = @cEvento, @cZona = @cZona, @cProtocolo = @cProtocolo, @cAlarma = @cAlarma OUTPUT, @iCtaMap = @iCtaMap OUTPUT, @iCtaFwd = @iCtaFwd OUTPUT, @iLoopCtrl = @iLoopCtrl OUTPUT
								Set @iCtaFwd = @iMapFwd
							End
						Else
							Begin
								IF @cDebug = 'Si'
								Begin
									Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)
									Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | No encontro. Busco cFormato Original ('+@cOriginal+') en las Zonas de la Cuenta id ('+Cast(@iCuenta As Varchar(10))+')' 
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
								End
								
								Select Top 1 @cAlarma=zon_codigoalarma From m_zonas Where zon_iidcuenta=@iCuenta And zon_ccodigo=@cOriginal

								If @cAlarma Is Null Or @cAlarma=''And @iConexion > 0
								Begin
									IF @cDebug = 'Si'
									Begin
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | No encontro ni en Zonas ni * ni MAP ni FWD. Busco cFormato ('+@cFormato+') en formatos del receptor que envio el evento utilizando conexion ('+Convert(VarChar(10), @iConexion)+')'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
									End

									Select Top 1 @cAlarma=for_calarma From m_receptores_cab a
										Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
										Inner Join m_formatos On for_ccodigo=b.rec_cformato
									Where a.rec_iid = @iReceptor And for_cformato = @cFormato And b.rec_iConexion=@iConexion
								End

								If @cAlarma Is Null Or @cAlarma=''
								Begin 
									IF @cDebug = 'Si'
									Begin
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | No encontro ni en Zonas ni * ni MAP ni FWD. Busco cFormato ('+@cFormato+') en formatos del receptor que envio el evento'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
									End

									Select Top 1 @cAlarma=for_calarma From m_receptores_cab a
										Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
										Inner Join m_formatos On for_ccodigo=b.rec_cformato
									Where a.rec_iid = @iReceptor And for_cformato = @cFormato And b.rec_iConexion=0
								End			

								If @cAlarma Is Null Or @cAlarma=''
									Begin 
										If @cOriginal<>''	--Si no encontro con EVENTO+ZONA busco con EVENTO
										Begin
											If @iConexion > 0
											Begin
												IF @cDebug = 'Si'
												Begin
													Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
													Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | No encontro. Busco cFormato Original ('+@cOriginal+') en formatos del receptor que envio el evento utilizando conexion ('+Convert(VarChar(10), @iConexion)+')'
													RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
												End

												Select Top 1 @cAlarma=for_calarma From m_receptores_cab a
													Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
													Inner Join m_formatos On for_ccodigo=b.rec_cformato
												Where a.rec_iid = @iReceptor And for_cformato = @cOriginal And b.rec_iConexion=@iConexion
											End
											
											If @cAlarma Is Null Or @cAlarma=''
											Begin 
												IF @cDebug = 'Si'
												Begin
													Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
													Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | No encontro. Busco cFormato Original ('+@cOriginal+')'
													RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
												End

												Select Top 1 @cAlarma=for_calarma From m_receptores_cab a
													Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
													Inner Join m_formatos On for_ccodigo=b.rec_cformato
												Where a.rec_iid = @iReceptor And for_cformato = @cOriginal And b.rec_iConexion=0
											End

											If @cAlarma Is Null Or @cAlarma=''
											Begin 
												IF @cDebug = 'Si'
												Begin
													Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
													Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco cFormato ('+@cOriginal+') con *'
													RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
												End

												Select Top 1 @cAlarma=zon_codigoalarma From m_zonas Where zon_iidcuenta=@iCuenta And zon_ccodigo=Left(@cOriginal,1)+'*'

												If @cAlarma Is Null Or @cAlarma=''
													Begin
														IF @cDebug = 'Si'
														Begin
															Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
															Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco en Zonas de la Cuenta si tiene un MAP'
															RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
														End

														Select Top 1 @iCtaMap=cue_iid From m_cuentas
															Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
														Where zon_iidcuenta=@iCuenta And zon_ccodigo='MAP' 
	
														If @iCtaMap > 0 And @iLoopCtrl = 1
															Begin
																--Set @cAlarma = '@M@'
																IF @cDebug = 'Si'
																Begin
																	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
																	Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | MAP ejecuto recursivo'
																	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
																End

																Execute [dbo].[SGSP_IRSBuscoFormato] @iReceptor = @iReceptor, @iCuenta = @iCtaMap, @iTipo = @iTipo,	@cEvento = @cEvento, @cZona = @cZona, @cProtocolo = @cProtocolo, @cAlarma = @cAlarma OUTPUT, @iCtaMap = @iCtaMap OUTPUT, @iCtaFwd = @iCtaFwd OUTPUT, @iLoopCtrl = @iLoopCtrl OUTPUT
																Set @iCtaMap = 0
															End
														Else
														Begin
															IF @cDebug = 'Si'
															Begin
																Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
																Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Busco en Zonas de la Cuenta si tiene un FWD'
																RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
															End

															Select Top 1 @iCtaFwd=cue_iid From m_cuentas
																Inner Join m_zonas ON cue_clinea=zon_cdealer And cue_ncuenta=zon_ccuenta 
															Where zon_iidcuenta=@iCuenta And zon_ccodigo='FWD'
	
															If @iCtaFwd > 0 And @iLoopCtrl = 1
																Begin
																	--Set @cAlarma = '@F@'
																	IF @cDebug = 'Si'
																	Begin
																		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
																		Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | FWD ejecuto recursivo'
																		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
																	End

																	Execute [dbo].[SGSP_IRSBuscoFormato] @iReceptor = @iReceptor, @iCuenta = @iCtaFwd, @iTipo = @iTipo,	@cEvento = @cEvento, @cZona = @cZona, @cProtocolo = @cProtocolo, @cAlarma = @cAlarma OUTPUT, @iCtaMap = @iCtaMap OUTPUT, @iCtaFwd = @iCtaFwd OUTPUT, @iLoopCtrl = @iLoopCtrl OUTPUT
																	Set @iCtaFwd = 0
																End
															Else
																Begin
																	If @cAlarma Is Null Or @cAlarma=''
																	Begin 
																		IF @cDebug = 'Si'
																		Begin
																			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
																			Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | No encontro ni en Zonas ni * ni MAP ni FWD. Busco cFormato ('+@cOriginal+') en formatos del receptor que envio el evento'
																			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
																		End

																		Select Top 1 @cAlarma=for_calarma From m_receptores_cab a
																			Inner Join m_receptores_item b On b.rec_iid=a.rec_iid
																			Inner Join m_formatos On for_ccodigo=b.rec_cformato
																		Where a.rec_iid = @iReceptor And for_cformato = @cOriginal And b.rec_iConexion=0
																	End	
	        													End
														End
												End
										End
									End
								End
								If @cAlarma Is Null Or @cAlarma=''
									Set @cAlarma = '_NE'
								
	        				End
					End
			End
	End	

	--Select @cAlarma As cAlarma, @iCtaMap As iCtaMap, @iCtaFwd As iCtaFwd
	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] | Alarma => '+@cAlarma+' | iCtaMap => '+Cast(@iCtaMap As Varchar(10))+' | iCtaFwd => '+Cast(@iCtaFwd As Varchar(10)) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Set NoExec Off		

	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_IRSBuscoFormato] --FIN--';
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH