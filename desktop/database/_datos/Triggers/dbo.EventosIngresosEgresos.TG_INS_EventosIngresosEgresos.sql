CREATE OR ALTER TRIGGER [dbo].[TG_INS_EventosIngresosEgresos] ON [dbo].[EventosIngresosEgresos] AFTER INSERT AS
BEGIN
	SET NOCOUNT ON;
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = ''

	Declare @tFechaHora Datetime
	
	Declare @cMatricula VarChar(10) = '',
			@cUnidadFuncional VarChar(10) = '',
			@cTransito VarChar(20) = '',
			@cUsuario  VarChar(100) = ''
	
	Select @tFechaHora=[eie_tFechaHora],@cMatricula=[eie_cMatricula],@cUnidadFuncional=[eie_cUnidadFuncional],@cTransito=[eie_cTransito],@cUsuario=[eie_cUsuario] From inserted

	Declare @iDel Int = 0
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	If @cUsuario Is Not Null And @cUsuario Like '%Visita%'  
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_EventosIngresosEgresos] | Es Visita'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		If @cTransito Is Not Null
		Begin
			If @cTransito Like '%Entrada%'
			Begin
				Set @message = 'Start DateTime : %s | [TG_INS_EventosIngresosEgresos] | Es Entrada, Insert [VisitasIngresosEgresos]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Insert Into [dbo].[VisitasIngresosEgresos] ([vie_tFechaHora],[vie_cMatricula],[vie_cUnidadFuncional])
					 Values (@tFechaHora,@cMatricula,@cUnidadFuncional)
			End
			Else
			Begin
				Set @iDel=1
			End
		End
	End 
	Else
		If @cUsuario Is Not Null And @cUsuario Like '%Residente%'  
			Set @iDel=1

	If @iDel=1
	Begin
		Set @message = 'Start DateTime : %s | [TG_INS_EventosIngresosEgresos] | Es Salida1, Delete [VisitasIngresosEgresos]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Delete From [dbo].[VisitasIngresosEgresos] Where [vie_cMatricula]=@cMatricula
	End

END