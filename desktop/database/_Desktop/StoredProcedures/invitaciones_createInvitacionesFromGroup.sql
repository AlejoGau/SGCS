/*
tipos de usuarios:

ID TIPO	DESCRIPCION
1	SUPERIOR
2	NORMAL
3	BAJO
5	ACCESO ADMINISTRADOR
6	ACCESO PROPIETARIO
7	ACCESO VISITA
8	ACCESO PROVEEDOR
*/

/*
tipos de visitas
1: Visita
3: Pariente
4: Fiesta
5: Evento
6: Delivery

*/

CREATE OR ALTER PROCEDURE [dbo].[invitaciones_createInvitacionesFromGroup]
	@Name VarChar(128),
	@tipoVisita Int = 0,
	@fechaVisita NVARCHAR(255) = '',
	@motivo VARCHAR(255) = '',
	@usuidkeyAutoriza INT,
	@cgu_idgrupo Int
	
	--WITH ENCRYPTION			 
AS
SET NOCOUNT ON



	IF (@fechaVisita != '')
		BEGIN
			SET @fechaVisita = convert(date,@fechaVisita,120);
		END
	ELSE
		BEGIN
			SET @fechaVisita = convert(date,GETDATE(),120);
		END
	
	DECLARE @caa_codigo VARCHAR(255) --para sortear el problema de SCOPE_IDENTITY 
	SET @caa_codigo = NEWID()

	DECLARE @usu_ntipo INT  -- su es delivery el valor que tomará será 8 si no será 7
	DECLARE @horaDesde VARCHAR(5)
	DECLARE @horaHasta VARCHAR(5)

		SET @usu_ntipo = 7
		SET @horaDesde = '00:00'
		set @horaHasta = '23:59'




	

	

    
	-- Creo la visita
	Insert into _datos.dbo.p_controlAcceso_Autorizacion (
		[caa_idautorizado],
		[caa_tipoVisita],
		[caa_fechadesde],
		[caa_fechahasta],
		[caa_diasemana],
		[caa_horadesde],
		[caa_horahasta],
		[caa_estado],
		[caa_codigo],
		[caa_usuautoriza],
		[caa_comentarios]
	)
	SELECT 
		cgu_idusuario,
		@tipoVisita, 
		@fechaVisita,
		@fechaVisita,
		0, 
		@horaDesde,--'00:00', 
		@horaHasta,--'23:59',
		1,--@caa_estado,
		@caa_codigo,
		@usuidkeyAutoriza,
		@motivo
	FROM _datos..m_cuenta_grupo_usuarios m
	inner join _datos..m_usuarios u on m.cgu_idusuario=u.usu_idKey
	WHERE cgu_idgrupo=@cgu_idgrupo
	
	-- Devuelvo la ultima invitacion creada, para manipular compartir Whatsapp
	DECLARE @caa_idkey INT;
	SELECT @caa_idkey = SCOPE_IDENTITY()
	
	PRINT '@caa_idkey '+CAST(@caa_idkey AS VARCHAR)
		
	


	DECLARE @filter VARCHAR(max) = '[{"property":"caa_idkey", "value":"'+convert(VARCHAR(10),@caa_idkey)+'"}]'

	EXEC dbo.invitaciones_SearchInvitados @filter=@filter