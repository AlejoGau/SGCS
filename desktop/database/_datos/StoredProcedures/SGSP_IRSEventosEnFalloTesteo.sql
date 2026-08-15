CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSEventosEnFalloTesteo]
	@cAlarma [Char](3) = '',
	@idCta [int] = 0,
	@cDebug Char(2) = 'No'	--'Si' 
AS
--Verifica si hay eventos en Fallo de Testeo
--Autor : Pablo O. Canónico
--Fecha : 27/06/2024
--2026-07-81 : Se agrego @cDebug
Set NoCount On
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = ''

Declare @iOperador Int = 0,
		@idRec Int = 0,
		@iEstado Int = 0
Declare @cCual Char(1) = '1'

IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_IRSEventosEnFalloTesteo] | Verifico si hay eventos para ('+@cAlarma+') de la Cuenta id ('+Cast(@idCta As Varchar(10))+')' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

--For perfomance issues--
If Exists ( Select Top 1 [eft_idKey] From [_Datos].[dbo].[EventosEnFalloTesteo] With (NOLOCK)
	Inner Join [_Datos].[dbo].[p_recepcion] With (NOLOCK) On [rec_iid] = [eft_iRecID]
	Where CHARINDEX(@cAlarma, eft_cAlarmaAutoprocesa) > 0 
		And [eft_iidCuenta] = @idCta 
		--And [rec_nEstado] In(0,2)
		)

	Begin
		Declare cCtrl CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
			For	Select [eft_iRecID],Left([eft_cAlarmaAutoprocesa],1),[rec_ioperador],[rec_nestado]
				From [_Datos].[dbo].[EventosEnFalloTesteo] With (NOLOCK)
				Inner Join [_Datos].[dbo].[p_recepcion] With (NOLOCK) On [rec_iid] = [eft_iRecID]
				Where CHARINDEX(@cAlarma, eft_cAlarmaAutoprocesa) > 0 
					And [eft_iidCuenta] = @idCta 
					--And [rec_nEstado] In(0,2)
				Order By [eft_iRecID]

		Open cCtrl
		Fetch Next From cCtrl Into @idRec,@cCual,@iOperador,@iEstado
		While @@FETCH_STATUS = 0
		Begin
			If @idRec > 0
				Begin
					If @iEstado In(0,2)
					Begin
						--1ero actualizo pRecepcion--	
						IF @cDebug = 'Si'
						Begin
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_IRSEventosEnFalloTesteo] | Actualizo pRecepcion recId '+Cast(@idRec As Varchar(10)) 
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End

						Update [_Datos].[dbo].[p_recepcion]
							Set rec_nEstado = 3, rec_tFechaProceso = GetDate()
						Where rec_iid = @idRec
			
						--2do Inserto TimeLine
						IF @cDebug = 'Si'
						Begin
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_IRSEventosEnFalloTesteo] | Inserto TimeLine'
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
									(@idRec
									,@idCta
									,GetDate()
									,'Autoproceso'
									,'%Procesado Automaticamente x Evento : %'+@cAlarma
									,'%SISTEMA%'
									,@iOperador)
					End

					--3ro Actualizo mStatus
					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_IRSEventosEnFalloTesteo] | Actualizo mStatus'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					If @cCual = '1'
						Update [_Datos].[dbo].[m_status] Set sta_ncuentaenfallodetst=0 Where sta_iidcuenta=@idCta
					Else If @cCual = '2'
						Update [_Datos].[dbo].[m_status] Set sta_ncuentaenfallo2dotst=0 Where sta_iidcuenta=@idCta
					Else If @cCual = '3'
						Update [_Datos].[dbo].[m_status] Set sta_ncuentaenfallo3ertst=0 Where sta_iidcuenta=@idCta

					--4to Elimino de [EventosEnFalloTesteo]
					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_IRSEventosEnFalloTesteo] | Elimino de [EventosEnFalloTesteo] | [eft_iRecID] => '+Cast(@idRec As Varchar(10)) 
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Delete From [_Datos].[dbo].[EventosEnFalloTesteo]
						Where  [eft_iRecID] = @idRec
						And [eft_iidCuenta] = @idCta 

				End

			Fetch Next From cCtrl Into @idRec,@cCual,@iOperador,@iEstado
		End

		Close cCtrl
		Deallocate cCtrl
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