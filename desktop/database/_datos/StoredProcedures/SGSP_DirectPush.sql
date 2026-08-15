CREATE OR ALTER PROCEDURE [dbo].[SGSP_DirectPush]
	@idCta [int] = 0,
	@cPlantilla Char(3) = '',
	@cCodAlarma Char(3) = '',
	@idRec [int] = 0
WITH EXECUTE AS CALLER
AS
--Envia notificacion Push a los admin de grupo
--Autor :Pablo O. Canónico
--Fecha :28/01/2022

SET NOCOUNT ON
BEGIN TRY
Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

If @idCta Is Null Or @idCta = 0
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_DirectPush] idCta en cero!!!'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Set NoExec On
End

If @cPlantilla Is Null Or @cPlantilla = ''
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_DirectPush] Plantilla vacia!!!'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Set NoExec On
End

Declare @dDiaHoy DateTime = GetDate()
Declare @cFecha Char(10) =(Select Convert(Char(10), @dDiaHoy,103)),
		@cHora Char(10) =(Select Convert(Char(10), @dDiaHoy,108))

Declare @cMessageMerge nVarChar(max) ='',
		@cImagenes nVarChar(max) =''

Execute [SGSP_TextMerge] @idCta=@idCta, @cAlarma=@cCodAlarma, @cCodPlantilla=@cPlantilla, @cFecha=@cFecha, @cHora=@cHora, @idRec=@idRec, @cTextMerge=@cMessageMerge OUTPUT, @cImagenes=@cImagenes OUTPUT

If @cMessageMerge Is Null
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_DirectPush] No se pudo mergear plantilla!!!'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End
Else
Begin
	Declare	@cDesc nVarChar(100) = ''
	Select @cDesc=IsNull([cod_cdescripcion],@cCodAlarma) From [_Tablas].[dbo].[t_codigos_alarma] 
		Where [cod_ccodigo]=@cCodAlarma

	Declare @cFromName nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
	Set @cFromName = Ltrim(Rtrim(@cFromName))

	Declare @cNotificacionAsunto nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILNOTIFICACIONASUNTO')
	Declare @cAsunto nVarChar(max) = Rtrim(@cFromName)+' '+Rtrim(@cNotificacionAsunto)
	Declare @DateRead DateTime = 0

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_DirectPush] Insert Into [dbo].[Message]'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Insert Into [dbo].[Message] ( [Name],[Body],[DateCreated],[DateRead],[FromTypeId],[FromId],[ToTypeId],[ToId],[Status],[Customdata],[EventoID],[CuentaID])
	Select @cAsunto, @cMessageMerge, @dDiaHoy, @DateRead, 0, 0, 3067, Cast(sp.Id As Varchar(10)),'', '{"cod_cdescripcion":"'+Rtrim(@cDesc)+'","rec_iid":"'+CONVERT(varchar(20), @idRec)+'"}', @idRec, sp.CuentaId
	From [dbo].[SmartPanic] sp
		Inner join m_cuentas On cue_iid=CuentaId
	Where pushToken <>'' 
		And Replace([Config],' ','') Like '%"groupEnabled":1%' 
		And cue_iid=@idCta
End	

Set NoExec Off
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