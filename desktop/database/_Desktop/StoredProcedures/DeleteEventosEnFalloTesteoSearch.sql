CREATE OR ALTER PROCEDURE [dbo].[DeleteEventosEnFalloTesteoSearch]
	@idFallo int = 0
AS
BEGIN
	DECLARE @idCuenta int;
	DECLARE @cCual int;

  Select  @idCuenta= [eft_iidCuenta],
					@cCual = Left([eft_cAlarmaAutoprocesa],1)  
						From _Datos..EventosEnFalloTesteo
						Where [eft_idKey]=@idFallo

	--actualizo mStatus
	If @cCual = '1'
		Update _datos..m_status Set sta_ncuentaenfallodetst=0 Where sta_iidcuenta=@idCuenta
	Else If @cCual = '2'
		Update _datos..m_status Set sta_ncuentaenfallo2dotst=0 Where sta_iidcuenta=@idCuenta
	Else If @cCual = '3'
		Update _datos..m_status Set sta_ncuentaenfallo3ertst=0 Where sta_iidcuenta=@idCuenta

	--Elimino de [EventosEnFalloTesteo]
	Delete From _Datos..[EventosEnFalloTesteo]
	Where  [eft_idKey]=@idFallo
END