CREATE OR ALTER PROCEDURE [dbo].[SGSP_AutoProcesoEvento]
	@cCodAlarma Char(3) = '',
	@iRecId Int = 0,
	@idCuenta Int = 0,
	@cDebug Char(2) = 'No'	--'Si' 
As
--AutoProcesa Eventos segun configuracion de codigo de alarmas
--Autor : Pablo O. Canónico
--Fecha : 02/07/2020
--2024-02-28. Se cambio CHARINDEX por STRING_SPLIT
--Modificado 11-06-2025 se utiliza parametro PERFOMANCECODE para saber que codigo ejecutar
--2026-07-81 : Se agrego @cDebug
Set NoCount ON

BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare @tFechaHora Datetime
Declare @iParametro Int = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PERFOMANCECODE' ),0)

IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | CodAlarma '+@cCodAlarma+' | Id Rec => '+ Rtrim(Cast(@iRecId As varchar(10))) +' | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10))) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

--Verificar que idCta no sea ='_SG-INTE' 
Declare @clinea Char(3) = '',
		@ncuenta Char(4) = ''
Select TOP 1 @clinea = cue_clinea, @ncuenta = cue_ncuenta
	From _Datos.dbo.m_cuentas
Where cue_iid=@idCuenta

If @clinea='_SG' And @ncuenta = 'INTE' 
Begin
	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEventoKA | Id Cuenta es _SG-INTE, no se controla'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End
	
	Return
End

Declare @cObservaciones nVarchar(Max)
Declare @translation nVarchar(Max)=''

--Busco si el codigo recibido tiene codigos de autoproceso
Declare @cAlarmaAutoprocesa VarChar(300)=''

Select @cAlarmaAutoprocesa=[cod_cAlarmaAutoprocesa] 
	From [_Tablas].[dbo].[t_codigos_alarma] 
	Where [cod_ccodigo] = @cCodAlarma

If @cAlarmaAutoprocesa Is Not Null And @cAlarmaAutoprocesa !=''
Begin
	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Insert Into [EventosEnAutoProceso]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Insert Into [dbo].[EventosEnAutoProceso] ([eap_iRecID],[eap_cAlarmaAutoprocesa])
		Values (@iRecId, @cAlarmaAutoprocesa)
End
Else
Begin
	--Buscar si el mismo es un codigo de autoproceso
	Declare @idKey Int = 0
	Select Top (1) @idKey=[cod_idKey]
		From [_Tablas].[dbo].[t_codigos_alarma] 
		Where CHARINDEX(@cCodAlarma, cod_cAlarmaAutoprocesa) > 0 
	
	If @idKey Is Not Null And @idKey > 0
	Begin		--Buscar en [EventosEnAutoProceso] los recid y procesar a los que esten en estado  "pendiente o en espera" de esa cuenta
		IF @iParametro = 1 
		Begin
			DECLARE @tmpTable TABLE(id INT IDENTITY, eap_idKey INT, eap_iRecID INT)

			INSERT INTO @tmpTable
				Select [eap_idKey],[eap_iRecID]
				From [dbo].[EventosEnAutoProceso] WITH (NOLOCK)
				Inner Join [dbo].[p_recepcion] WITH (NOLOCK) On [rec_iID]=[eap_iRecID]
				Cross Apply STRING_SPLIT([eap_cAlarmaAutoprocesa], ',')
				Where value = @cCodAlarma
				And [rec_iIdCuenta] = @idCuenta
      
			DECLARE @tmpID INT = 0
			DECLARE @tmpCount INT = (SELECT COUNT(*) FROM @tmpTable)

			WHILE (@tmpID < @tmpCount)
			BEGIN
				SET @tmpId += 1

				SET @idKey = NULL
				SET @iRecId = NULL

				SELECT @idKey = eap_idKey, @iRecId = eap_iRecID FROM @tmpTable WHERE id = @tmpId;
				if @idKey IS NULL
					BREAK

				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Procesando Id Rec => '+ Rtrim(Cast(@iRecId As varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Select Top 1 @tFechaHora = rec_tfechahora, @cObservaciones = Convert(nVarchar(MAX), rec_cObservaciones) 
					From p_recepcion WITH (NOLOCK)
					Where rec_iid=@iRecId And rec_iidcuenta=@idCuenta And rec_nEstado In(0,2)

				If @tFechaHora Is Not Null
				Begin
					Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Procesado Automaticamente por evento ', @soloOutput=1, @translation = @translation OUTPUT
					Set @cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Sistema] '+ Rtrim(@translation) + ' ' + @cCodAlarma

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Update => '+ @cObservaciones
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Update p_recepcion
					Set rec_nEstado = 3, rec_tFechaProceso = @tFechaHora, rec_cObservaciones  = @cObservaciones
					Where rec_iid = @iRecId

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Inserto TimeLine'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Insert Into [_Datos].[dbo].[EventosTimeLine]
								([etl_iRecID]
								,[etl_iCuenta]
								,[etl_tFechaHora]
								,[etl_cAccion]
								,[etl_cObservacion]
								,[etl_cOwner]
								,[etl_iOperador])
						Values
								(@iRecId
								,@idCuenta
								,GetDate()
								,'Autoproceso'
								,Rtrim(@translation) + ' ' + @cCodAlarma
								,'%SISTEMA%'
								,0)

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Elimino de [EventosEnAutoProceso] idKey => '+ Rtrim(Cast(@idKey As varchar(10)))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Delete From [dbo].[EventosEnAutoProceso]
							WHERE [eap_idKey]=@idKey

				End
			END
		End
		Else
		Begin
			Declare EventosAPAL CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
			/*
			Select [eap_idKey],[eap_iRecID]
					From [dbo].[EventosEnAutoProceso]
					Inner Join [dbo].[p_recepcion] On [rec_iID]=[eap_iRecID]
				Where CHARINDEX(@cCodAlarma, [eap_cAlarmaAutoprocesa]) > 0 
					And [rec_iIdCuenta] = @idCuenta
			*/
			Select [eap_idKey],[eap_iRecID]
				From [dbo].[EventosEnAutoProceso]
				Inner Join [dbo].[p_recepcion] On [rec_iID]=[eap_iRecID]
				Cross Apply STRING_SPLIT([eap_cAlarmaAutoprocesa], ',')
				Where value = @cCodAlarma
				And [rec_iIdCuenta] = @idCuenta
      
			OPEN EventosAPAL
			FETCH NEXT FROM EventosAPAL INTO @idKey,@iRecId
			WHILE @@FETCH_STATUS = 0
			Begin
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Procesando Id Rec => '+ Rtrim(Cast(@iRecId As varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Select Top 1 @tFechaHora = rec_tfechahora, @cObservaciones = Convert(nVarchar(MAX), rec_cObservaciones) From p_recepcion 
					Where rec_iid=@iRecId And rec_iidcuenta=@idCuenta And rec_nEstado In(0,2)

				If @tFechaHora Is Not Null
				Begin
					Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Procesado Automaticamente por evento ', @soloOutput=1, @translation = @translation OUTPUT
					Set @cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Sistema] '+ Rtrim(@translation) + ' ' + @cCodAlarma

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Update => '+ @cObservaciones
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Update p_recepcion
					Set rec_nEstado = 3, rec_tFechaProceso = @tFechaHora, rec_cObservaciones  = @cObservaciones
					Where rec_iid = @iRecId

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Inserto TimeLine'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Insert Into [_Datos].[dbo].[EventosTimeLine]
								([etl_iRecID]
								,[etl_iCuenta]
								,[etl_tFechaHora]
								,[etl_cAccion]
								,[etl_cObservacion]
								,[etl_cOwner]
								,[etl_iOperador])
						Values
								(@iRecId
								,@idCuenta
								,GetDate()
								,'Autoproceso'
								,Rtrim(@translation) + ' ' + @cCodAlarma
								,'%SISTEMA%'
								,0)

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_AutoProcesoEvento | Elimino de [EventosEnAutoProceso] idKey => '+ Rtrim(Cast(@idKey As varchar(10)))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Delete From [dbo].[EventosEnAutoProceso]
						  WHERE [eap_idKey]=@idKey

				End

				FETCH NEXT FROM EventosAPAL INTO @idKey,@iRecId
			End

			CLOSE EventosAPAL
			DEALLOCATE EventosAPAL
		End
	End
End
END TRY
BEGIN CATCH
	Begin
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
	End
END CATCH