CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSEstadosDinamicos]
	@iCuenta [int] = 0,
	@cAlarma Char(3) = '',
	@iUsuario [int] = 0
AS
--Analizador de Eventos con estados dinamicos para IRServices
--Autor : Pablo O. Canónico
--Fecha : 26/06/2017
--08-08-2017 Se modifico para considerar idCta
--07-09-2017 Se modifico para considerar mas de un estado dinamico por alarma
Set NoCount ON
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = ''

Declare @cCodigo nVarChar(10)=''
Declare @idKey Int=0,
		@iPorUsuario Int=0

Declare @bPorCta Bit = 0  /* False */

--Primero busco por codigo alarma
If ( Select Count([ted_idKey]) From [_Tablas].[dbo].[T_EstadosDinamicos] Where [ted_iActivo]=1 And CHARINDEX(@cAlarma, [ted_cEventos]) > 0  ) = 0
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_IRSEstadosDinamicos] No hay Estado Dinamico activo declarado para el codigo de alarma : '+@cAlarma
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

--Veo si hay por idCuenta
If ( Select Count([ted_idKey]) From [_Tablas].[dbo].[T_EstadosDinamicos] Where [ted_idCta]=@iCuenta And [ted_iActivo]=1 And CHARINDEX(@cAlarma, [ted_cEventos]) > 0  ) > 0
	Set @bPorCta = 1	/* True */

Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_IRSEstadosDinamicos] '+Case When @bPorCta=0 Then 'No hay' Else 'Hay' End+' Estado Dinamico activo declarado para el codigo de alarma : '+@cAlarma+' en la cuenta Id :'+Cast(@iCuenta As Varchar(10))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

If @bPorCta = 1
	Declare EstadosDinamicos CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		Select [ted_idKey],[ted_iPorUsuario]
			From [_Tablas].[dbo].[T_EstadosDinamicos]
			Where [ted_idCta]=@iCuenta And [ted_iActivo]=1 And CHARINDEX(@cAlarma, [ted_cEventos]) > 0 
Else
	Declare EstadosDinamicos CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		Select [ted_idKey],[ted_iPorUsuario]
			From [_Tablas].[dbo].[T_EstadosDinamicos]
			Where ([ted_idCta]=0 Or [ted_idCta] Is Null ) And [ted_iActivo]=1 And CHARINDEX(@cAlarma, [ted_cEventos]) > 0 

OPEN EstadosDinamicos
FETCH NEXT FROM EstadosDinamicos INTO @idKey,@iPorUsuario
WHILE @@FETCH_STATUS = 0
BEGIN

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_IRSEstadosDinamicos] | IdKey => '+ Rtrim(Cast(@idKey As varchar(10))) +' | PorUsuario => '+ Rtrim(Cast(@iPorUsuario As varchar(10))) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	MERGE INTO [dbo].[p_EstadosDinamicos] AS TGT
	USING ( Select [ted_cCodigo], [ted_iValor], Case When @iPorUsuario=1 Then @iUsuario Else 0 End As iUsuario, @iCuenta As iCuenta 
				From [_Tablas].[dbo].[T_EstadosDinamicos]
				Where [ted_idKey] = @idKey ) AS SRC 
			ON TGT.[ped_iCtaId] = SRC.[iCuenta] And TGT.[ped_iUsuario] = SRC.[iUsuario] And TGT.[ped_cCodigo] = SRC.[ted_cCodigo]
	WHEN MATCHED THEN
		UPDATE SET
			TGT.[ped_iValor] = SRC.[ted_iValor]
	WHEN NOT MATCHED THEN 
		INSERT ([ped_cCodigo],[ped_iValor],[ped_iUsuario],[ped_iCtaId])
		VALUES (SRC.[ted_cCodigo],SRC.[ted_iValor],SRC.[iUsuario],SRC.[iCuenta]);

   FETCH NEXT FROM EstadosDinamicos INTO @idKey,@iPorUsuario
End

CLOSE EstadosDinamicos
DEALLOCATE EstadosDinamicos

Set NoExec Off
	
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