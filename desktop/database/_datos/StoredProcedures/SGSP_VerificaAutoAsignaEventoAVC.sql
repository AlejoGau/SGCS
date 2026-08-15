CREATE OR ALTER PROCEDURE [dbo].[SGSP_VerificaAutoAsignaEventoAVC]
	@cCodAlarma Char(3) = '',
	@iRecId Int = 0,
	@idCuenta Int = 0,
	@iTagged Int = 0 OUTPUT
As
--Verifica si el dealer tiene configurado AutoAsignacion Eventos a VC 
--Autor : Pablo O. Canónico
--Fecha : 23/07/2024

Set NoCount ON

BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare @tFechaHora Datetime

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_VerificaAutoAsignaEventoAVC] | CodAlarma '+@cCodAlarma+' | Id Rec => '+ Rtrim(Cast(@iRecId As varchar(10))) +' | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10))) 
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare @cObservaciones nVarchar(Max)
Declare @translation nVarchar(Max)=''

--Busco si el dealer tiene configurada la auto asignacion de VC
Declare @cDealer Char(3) = ''
Select @cDealer=cue_clinea From [_Datos].[dbo].[m_cuentas]
	Where cue_iid=@idCuenta

Declare @Enabled Int = 0,
		@idKey Int = 0

Select @Enabled=[aa_Enabled],@idKey=[dealer_idKey]
	From [_Datos].[dbo].[m_dealer_vcconfig_desnormalized]
	Inner Join [_Datos].[dbo].[m_dealer_vcconfig] On [dvc_idKey]=[dealer_idKey]
Where [dvc_cdealer]=@cDealer And [dvc_apptype]='VIGICONTROL'

If @Enabled Is Null Or @Enabled != 1
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_VerificaAutoAsignaEventoAVC] | Dealer no tiene configurado auto asignacion de VC'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

--Busco si el codigo recibido tiene codigos de autoproceso

If Not Exists (Select Top 1 [aa_operador] From [_Datos].[dbo].[m_dealer_vcconfig_desnormalized] 
				Cross Apply STRING_SPLIT([aa_eventos], ',')
				Where value = @cCodAlarma And [dealer_idKey]=@idKey )
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_VerificaAutoAsignaEventoAVC] | La configuracion no contiene al codigo de alarma : '+@cCodAlarma 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

Set @iTagged = 1
Set Noexec Off

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