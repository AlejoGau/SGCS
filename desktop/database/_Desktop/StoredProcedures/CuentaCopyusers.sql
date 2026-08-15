-- =============================================
-- Author:		Rodrigo Román
-- Create date: 26/03/2020
-- Description:	Copia los usuarios de una cuenta a otra
-- 2024/03/15 : Pablo modifique el Disable/Enable del Trigger. Necesita tener permisos de ALTER (GRANT ALTER ON m_usuarios TO SGAgentAccess,SGCSAccess,SGDesktopAccess,SGWebAccess,SoftGuard)
-- 2025/03/07 : Pablo modifique el Disable/Enable del Trigger. Lo marca en parametros porque el EXEC esta dentro de la transaccion y genera bloqueos en los reportes
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[CuentaCopyusers] 
	-- Add the parameters for the stored procedure here
	@cuentaOrigen int,
	@cuentaDestino int,
	@eliminar int
AS

BEGIN
	SET NOCOUNT ON;
	--ALTER TABLE _Datos.dbo.m_usuarios 
	--DISABLE TRIGGER [Trg_UserAccess];
	--EXEC('USE [_Datos]; DISABLE TRIGGER Trg_UserAccess ON m_usuarios;')
	Update [_Tablas].[dbo].[t_parametros] set [par_ivalor] = 1 where [par_ccodigo] = '_DISABLETRIGGER'

	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = ''

	if @cuentaOrigen is null or @cuentaOrigen = 0 or @cuentaDestino is null or @cuentaDestino = 0 
	Begin
		RAISERROR (15600,-1,-1, 'CuentaCopyusers');  -- dispara invalid parameter error
		Set NoExec On
	End

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [CuentaCopyusers] | @cuentaOrigen = '+Cast(@cuentaOrigen As Varchar(10)) + ' | @cuentaDestino = '+Cast(@cuentaDestino As Varchar(10)) + ' | @eliminar = '+Cast(@eliminar As Varchar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    if @eliminar = 1
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopyusers] | delete from _datos..m_usuarios where usu_iidcuenta = '+Cast(@cuentaDestino As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			delete from _datos..m_usuarios where usu_iidcuenta = @cuentaDestino

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopyusers] | INSERT INTO _Datos.dbo.m_usuarios  where usu_iidcuenta = '+Cast(@cuentaOrigen As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			INSERT INTO _Datos.dbo.m_usuarios 
			(usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion, usu_cmetadata,usu_cIdExtendido)
			SELECT @cuentaDestino, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion, usu_cmetadata,usu_cIdExtendido
			FROM _Datos.dbo.m_usuarios WHERE usu_iidcuenta = @cuentaOrigen	
		END
	ELSE
	IF @eliminar = 2
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopyusers] | MERGE _Datos.dbo.m_usuarios'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			MERGE _Datos.dbo.m_usuarios u
				USING (SELECT @cuentaDestino as usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion, usu_cmetadata,usu_cIdExtendido FROM _Datos.dbo.m_usuarios WHERE usu_iidcuenta = @cuentaOrigen) u2
			--ON (u.usu_icodigo = u2.usu_icodigo)
			ON (u.usu_iidcuenta = u2.usu_iidcuenta ANd u.usu_icodigo = u2.usu_icodigo )
			WHEN MATCHED
				THEN UPDATE SET 
					u.usu_cnombre = u2.usu_cnombre,
					u.usu_cclave = u2.usu_cclave,
					u.usu_ntipo = u2.usu_ntipo,
					u.usu_cimagen = u2.usu_cimagen,
					u.usu_mobservacion = u2.usu_mobservacion,
					u.usu_cmetadata = u2.usu_cmetadata,
					u.usu_cIdExtendido =  u2.usu_cIdExtendido
			WHEN NOT MATCHED BY TARGET 
				THEN INSERT (usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion, usu_cmetadata,usu_cIdExtendido)
					 VALUES (@cuentaDestino, u2.usu_icodigo, u2.usu_cnombre, u2.usu_iid, u2.usu_cclave, u2.usu_ntipo, u2.usu_cimagen, u2.usu_mobservacion, usu_cmetadata,u2.usu_cIdExtendido);
		END
	ELSE
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [CuentaCopyusers] | INSERT INTO _Datos.dbo.m_usuarios  where usu_iidcuenta = '+Cast(@cuentaOrigen As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			INSERT INTO _Datos.dbo.m_usuarios
			(usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion, usu_cmetadata,usu_cIdExtendido) 
			SELECT @cuentaDestino, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion, usu_cmetadata,usu_cIdExtendido
			FROM _Datos.dbo.m_usuarios WHERE usu_iidcuenta = @cuentaOrigen	
		END

	--ALTER TABLE _Datos.dbo.m_usuarios 
	--ENABLE TRIGGER [Trg_UserAccess]
	Set NoExec Off

	--EXEC('USE [_Datos]; ENABLE TRIGGER Trg_UserAccess ON m_usuarios;')
	Update [_Tablas].[dbo].[t_parametros] set [par_ivalor] = 0 where [par_ccodigo] = '_DISABLETRIGGER'
	 
END