-- =============================================
-- Author:		Martin Velez
-- Create date: 02-05-2023
-- Description:	Actualizacion de identificacion en usuarios a pedido de tarea DS-664
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ActualizaDniInvitaciones]
	@idInvitacion VarChar(max),
	@documento VarChar(max)
AS
BEGIN
	SET NOCOUNT ON;
	--DISABLE TRIGGER Trg_UserAccess ON _Datos..m_usuarios;
	--AUTORIZADOR
	UPDATE _Datos..m_usuarios
	SET usu_cidentificacion=@documento
	WHERE usu_cIdExtendido=@idInvitacion
	AND usu_iidcuenta=(SELECT caa_usuautoriza FROM _datos.dbo.p_controlAcceso_Autorizacion
	WHERE caa_codigo=@idInvitacion);

	--AUTORIZADO
	UPDATE _Datos..m_usuarios
	SET usu_cIdExtendido=@documento--,
		--usu_cidentificacion=@idInvitacion
	WHERE usu_cIdExtendido=@idInvitacion
	AND usu_iidcuenta != (SELECT caa_usuautoriza FROM _datos.dbo.p_controlAcceso_Autorizacion
	WHERE caa_codigo=@idInvitacion);

	--ENABLE TRIGGER Trg_UserAccess ON _Datos..m_usuarios;

END