--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.677 
-- Pablo 2025-01-10 : Control para AppType > 0 y Alta Temprana
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SmartPanicIdByTelefono](
@Telefono NVARCHAR(128)='',
@AppType Int=0
)
As
If @AppType=0
	select Id from [_datos].[dbo].[SmartPanic] where Telefono like '%'+RIGHT(@Telefono,8)+'%' And AppType=@AppType
Else
Begin

	Declare @ID Int = 0
	Select @ID=Id From [_datos].[dbo].[SmartPanic] 
		Where Telefono Like '%'+RIGHT(@Telefono,8)+'%' 
		  And AppType=@AppType

	If @ID Is Null Or @ID=0 
	Begin
		--Tengo que buscar si hubo un alta temprana que se hacen desde la Landing con AppType en 0

		Select Top 1 @ID=Id
			From [_Datos].[dbo].[SmartPanic]
			Left Join [_Datos].[dbo].[p_recepcion] On rec_iidcuenta=[CuentaId]
		Where rec_calarma='_AT'
		And Abs(DATEDIFF(minute, [fechaAlta], [rec_tfechahora])) <= 10
		And Telefono Like '%'+RIGHT(@Telefono,8)+'%' 
		And AppType=0

		Order By rec_iid Desc
	End

	Select @ID As Id
End