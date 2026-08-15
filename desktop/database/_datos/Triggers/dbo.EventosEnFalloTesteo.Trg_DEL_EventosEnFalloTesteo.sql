CREATE OR ALTER TRIGGER [dbo].[Trg_DEL_EventosEnFalloTesteo] ON [dbo].[EventosEnFalloTesteo] INSTEAD OF DELETE AS
BEGIN
	Declare	@idKey Int=0,
			@idCuenta Int=0
	Declare @cAlarmaAutoprocesa VarChar(150)='',
			@cCual Char(1)=''

	Select @idKey=[eft_idKey], @cAlarmaAutoprocesa=[eft_cAlarmaAutoprocesa], @idCuenta=[eft_iidCuenta]  From deleted

	Set @cCual = Left(@cAlarmaAutoprocesa,1)
	Print '--[Trg_DEL_EventosEnFalloTesteo]-- '+ Convert(VarChar, GetDate(),120) + '| @idKey : '+Cast(@idKey As Varchar(10))+' | @cAlarmaAutoprocesa : ' + @cAlarmaAutoprocesa + ' | Cual : ' + @cCual

	Print '--[Trg_DEL_EventosEnFalloTesteo] | Delete [EventosEnFalloTesteo]-- '
	Delete From [EventosEnFalloTesteo] Where [eft_idKey]=@idKey

	If @cCual='2'	--Falla 2do Testeo
	Begin
		Print '--[Trg_DEL_EventosEnFalloTesteo] | Generar el codigo de alarma configurado en el dealer-- '
		--Tengo que generar el Evt configurado en el dealer
		Declare @Alarma Char(3)=''
		/*
		Select @Alarma=lin_cRestauracionFalla From  [_Tablas].[dbo].[t_lineas] 
			Inner Join m_cuentas On cue_clinea=lin_ccodigo
			Where cue_iid = @idCuenta 
		*/
	End
END

/*
La generacion de un nuevo evento de restablecimento es solo para el 2do control 
Por dealer se configura el evento a generar
*/