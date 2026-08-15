CREATE OR ALTER TRIGGER [dbo].[TG_INS_EsCustom] ON [dbo].[p_comandos_ip] INSTEAD OF INSERT
AS 
BEGIN
	SET NOCOUNT ON;
	
	Declare @iEsCustom Int = 0,
			@iComando Int = 0

	Select Top 1 @iComando=[cmd_iComando]
		From Inserted

	Select Top 1 @iEsCustom=[tcm_iEsCustom]
		From [_Tablas].[dbo].[t_comandos]
	Where [tcm_iid]=@iComando

	If @iEsCustom Is Null
		Set @iEsCustom=0

	Declare @iParametro Int = IsNull(( Select [par_ivalor] From [_Tablas].[dbo].[t_parametros] With (NOLOCK) Where [par_cCodigo]='GENEROEVTCMD' ),0)
	Declare @cAlarmaGenerar Char(3) = '' 
	If @iParametro = 1 
	Begin
		Declare @cValores VarChar(500) = ''				
		Select @cValores=cmd_cValores,@cAlarmaGenerar=cmd_cAlarmaGenerar From Inserted
		If @cValores Like '>SPG02%'
		Begin
			If @cValores Like '>SPG02|1|1|%'
				Set @cAlarmaGenerar = 'VGL'
			Else If @cValores Like '>SPG02|1|0|%'
				Set @cAlarmaGenerar = 'VG9'
			Else If @cValores Like '>SPG02|0|1|%'
				Set @cAlarmaGenerar = 'VG8'
			Else If @cValores Like '>SPG02|0|0|%'
				Set @cAlarmaGenerar = 'VG4'
		End
	End
	
	-- Solo limpiar placeholders si es comando INZM
	Declare @cValoresLimpio VarChar(500)
	Select @cValoresLimpio = cmd_cValores From Inserted
	
	If @cValoresLimpio Like 'INZM%' Or @cValoresLimpio Like 'IZM%'
	Begin
		Set @cValoresLimpio = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
			@cValoresLimpio, '{z1}', '0'), '{z2}', '0'), '{z3}', '0'), '{z4}', '0'), 
			'{z5}', '0'), '{z6}', '0'), '{z7}', '0'), '{z8}', '0'), 
			'{z9}', '0'), '{z10}', '0'), '{z11}', '0'), '{z12}', '0'), 
			'{z13}', '0'), '{z14}', '0'), '{z15}', '0'), '{z16}', '0'), 
			'{z17}', '0'), '{z18}', '0'), '{z19}', '0'), '{z20}', '0'), 
			'{z21}', '0'), '{z22}', '0'), '{z23}', '0'), '{z24}', '0'), 
			'{z25}', '0'), '{z26}', '0'), '{z27}', '0'), '{z28}', '0'), 
			'{z29}', '0'), '{z30}', '0'), '{z31}', '0'), '{z32}', '0')
	End
	
	Insert Into [dbo].[p_comandos_ip]
	    ([cmd_tfechahora],[cmd_idCuenta],[cmd_idReceptor],[cmd_iComando],[cmd_cValores],[cmd_nEstado],[cmd_cObservaciones],[cmd_iOperador],[cmd_tEnvioFechaHora],[cmd_iEsCustom],[cmd_cRespuesta],[cmd_cAlarmaGenerar])
		Select [cmd_tfechahora],[cmd_idCuenta],[cmd_idReceptor],[cmd_iComando],@cValoresLimpio,[cmd_nEstado],[cmd_cObservaciones],[cmd_iOperador],[cmd_tEnvioFechaHora],@iEsCustom,[cmd_cRespuesta],@cAlarmaGenerar
			From Inserted
END