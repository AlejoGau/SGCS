CREATE OR ALTER PROCEDURE [dbo].[SolicitudModificacionesUpdOInsSearch]
	@pom_usuariopedido	int,
	@pom_fechapedido	datetime,
	@pom_idtipoobjeto	int,
	@pom_idobjeto	int,
	@pom_sinmodificar	VARCHAR (MAX),
	@pom_modificado		VARCHAR (MAX),
	@pom_estado	int,
	@pom_log	varchar(MAX) = '',
	@pom_usuarioultcambio	int,
	@pom_cueiid int,
	@pom_metadata VARCHAR (MAX)

AS
BEGIN
  IF @pom_idobjeto != 0  AND EXISTS (SELECT * FROM _datos..p_objetos_modificaciones WHERE pom_idtipoobjeto = @pom_idtipoobjeto AND pom_idobjeto = @pom_idobjeto AND pom_estado = 0)
		BEGIN
			UPDATE _datos..p_objetos_modificaciones
				SET pom_usuariopedido = @pom_usuariopedido,
						pom_sinmodificar = @pom_sinmodificar,
						pom_modificado = @pom_modificado,
						pom_estado = @pom_estado,
						pom_log = @pom_log,
						pom_usuarioultcambio = @pom_usuarioultcambio,
						pom_fechaultcambio = GETDATE(),
						pom_cueiid = @pom_cueiid,
						pom_metadata = @pom_metadata
				WHERE pom_idtipoobjeto = @pom_idtipoobjeto AND pom_idobjeto = @pom_idobjeto

			SELECT 'El registro fue actualizado' as msg , 0 as error
			
		END
	ELSE 
		BEGIN
			INSERT INTO _datos..p_objetos_modificaciones (
																							pom_usuariopedido,
																							pom_fechapedido,
																							pom_idtipoobjeto,
																							pom_idobjeto,
																							pom_sinmodificar,
																							pom_modificado,
																							pom_estado,
																							pom_log,
																							pom_usuarioultcambio,
																							pom_fechaultcambio,
																							pom_cueiid,
																							pom_metadata
																						) VALUES (
																							@pom_usuariopedido,
																							GETDATE(),
																							@pom_idtipoobjeto	,
																							@pom_idobjeto	,
																							@pom_sinmodificar	,
																							@pom_modificado	,
																							@pom_estado	,
																							@pom_log,
																							@pom_usuarioultcambio,
																							GETDATE(),
																							@pom_cueiid,
																							@pom_metadata
																						)
			SELECT 'El registro fue creado' as msg , 0 as error
		END
END