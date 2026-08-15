CREATE OR ALTER PROCEDURE [dbo].[RedirectorSoftGuardWAAutomation]
	@rec_iid Int = 0
WITH EXECUTE AS CALLER
AS
BEGIN
	--Arma el mensaje a ser enviado en la notificacion por WhatsApp 
	--Autor :Pablo O. Canónico
	--Fecha :12/06/2024
	SET NOCOUNT ON

	Declare @iidCuenta Int=0
	Declare @FechaHora VarChar(19)='',
			@EventoFecha VarChar(max)= '',
			@EventoHora VarChar(max)= '',
			@cMessageMerge nVarChar(max)= '',
			@cImagenes nVarChar(max)='',
			@NroDestino Varchar(15)=''
	Declare @cAlarma Char(3)='',
			@cZona Char(3)='',
			@cDealer Char(3)=''
	
	Select @iidCuenta=[rec_iidcuenta], @cAlarma=[rec_calarma], @cZona=[rec_czona], @FechaHora=CONVERT(char(19), [rec_tfechahora],120) 
		From [_Datos].[dbo].[p_recepcion]
    Where [rec_iid] = @rec_iid

	Select Top 1 @NroDestino=tel_cinternacional
		From [_Datos].[dbo].[m_telefonos]
	Where [tel_iidcuenta]=@iidCuenta
		And tel_iismobile=1
	Order By [tel_norden]

	Select @cDealer=[cue_cLinea]
		From [_Datos].[dbo].[m_cuentas]
	Where [cue_iid]=@iidCuenta
	
	If @NroDestino Is Null Or @NroDestino =''
		Set @NroDestino=''

	Set @EventoFecha = LEFT(@FechaHora,11) 
	Set @EventoHora = RIGHT(@FechaHora,8) 

	Execute [_Datos].[dbo].[SGSP_TextMerge]	@idCta = @iidCuenta, @cZona = @cZona, @cAlarma = @cAlarma, @cCodPlantilla = 'RWA', @cFecha = @EventoFecha, @cHora = @EventoHora, @idRec = @rec_iid, @cTextMerge = @cMessageMerge OUTPUT, @cImagenes = @cImagenes OUTPUT

	If @cMessageMerge Is Null
	Begin
		Declare @cMessage nVarChar(4000)='',
				@cCuenta VarChar(100)=''

		Set @cCuenta = ( SELECT cue_clinea+'-'+Rtrim(cue_ncuenta)+' '+cue_cnombre FROM [_Datos].[dbo].[m_cuentas] Where [cue_iid]=@iidCuenta )	
		Set @cMessage = 'En cuenta ' + Rtrim(@cCuenta) + ' | ' +@cAlarma+' | '+CONVERT(char(19), @FechaHora,120)  
		Set @cMessageMerge = @cMessage
	End

	--El limite del mensaje debe ser 1024. Con el Header y el Footer lo corto a 1000
	Select Substring(@cMessageMerge,1,1000) As msg, Replace(@NroDestino,'+','') As nrodestino, @cDealer As dealer
END