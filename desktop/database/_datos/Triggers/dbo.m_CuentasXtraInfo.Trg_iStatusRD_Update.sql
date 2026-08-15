-- =============================================
-- Create date: 08/01/2020
-- Description:	Analiza el campo [cue_iStatusRD] y genera evento '_F9' o '_I9'
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[Trg_iStatusRD_Update] ON [dbo].[m_CuentasXtraInfo] FOR UPDATE
AS 
BEGIN
	Declare @iStatusRDOld Int = 0,
			@iStatusRDNew Int = 0,
			@idCuenta Int = 0,
			@iValor Int=0

	Select @iStatusRDOld=[cue_iStatusRD] From deleted
	Select @iStatusRDNew=[cue_iStatusRD],@idCuenta=[cue_iidcuenta] From inserted

	Declare @message nVarChar(Max) = '',
            @StartDateTimeText VarChar(max) = ''
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
    Set @message = 'Start DateTime : %s | [Trg_iStatusRD_Update] | Me fijo si cambio el valor | @iStatusRDOld : '+Cast(@iStatusRDOld As Char(1)) + ' | @iStatusRDNew : '+Cast(@iStatusRDNew As Char(1))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iStatusRDOld!=@iStatusRDNew
	Begin
		Declare @cCod Char(3) = '_F9'
		If @iStatusRDNew=1 
			Set @cCod = '_I9'

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
		Set @message = 'Start DateTime : %s | [Trg_iStatusRD_Update] | Execute [SGSP_AlarmaGenerar]  @cAlarma='+@cCod
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute [_Datos].[dbo].[SGSP_AlarmaGenerar] @idCta=@idCuenta, @cAlarma=@cCod,@cObs='', @iValor=@iValor OUTPUT
	End
END