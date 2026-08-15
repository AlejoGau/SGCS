CREATE OR ALTER PROCEDURE [dbo].[MG_ContratosGenerarFacturas]
@idorganizacion int =0, -- organizacion facturadora
@token VARCHAR(128),     
@template int = 0,
@_dc VARCHAR(256) = ''
AS

 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)

 if @UserId is null or @UserId = 0
 BEGIN
	 print '[MG_ContratosGenerarFacturas] token o usuario inválidos'
	 set NOEXEC ON
 END

 print '[MG_ContratosGenerarFacturas] Busco la organización del usuario logueado'
 declare @organizationId int -- empresa del usuario, NO organizacion facturadora
 select @organizationId = convert(int, udw_empresa) from _sistema..usersdesktopweb where udw_idkey = @UserId

 print '[MG_ContratosGenerarFacturas] traigo los contratos activos y no vencidos'
-- los recorro
DECLARE @vencimiento DATE
DECLARE @idContrato INT
DECLARE @totalContratos INT = 0
DECLARE @totalFacturas INT = 0


DECLARE items_contrato_cursor CURSOR LOCAL FOR
	SELECT 
		con.cnt_fechavto as vencimiento,
		con.cnt_iid as idContrato
	FROM _Datos..crm_contrato con
	left join _datos..m_clientes_fc on cli_icodigo_id = cnt_idcliente
	WHERE cnt_estado = 1 AND cnt_fechavto > GETDATE()
		and (cli_iorganizacion = @idorganizacion OR @idorganizacion=0)
		AND cli_iorganizacion in (select org_icodigo_id from _tablas..t_organizacion_fc where org_organizacionId = @organizationId)
PRINT '@idorganizacion----------: '+convert(varchar,@idorganizacion)
PRINT '@organizationId----------: '+convert(varchar,@organizationId)

OPEN items_contrato_cursor;
FETCH NEXT FROM items_contrato_cursor INTO @vencimiento, @idContrato;

WHILE @@FETCH_STATUS = 0
BEGIN	
	print '[MG_ContratosGenerarFacturas] Id contrato'
	print @idContrato
	print '[MG_ContratosGenerarFacturas] Vencimiento'
	print @vencimiento
					
	EXEC [MG_ContratoAFactura] @IdContrato = @idContrato, @template = @template, @UserId=@UserId
	print '------------'
	SET @totalContratos = @totalContratos + 1
FETCH NEXT FROM items_contrato_cursor INTO @vencimiento, @idContrato;
END
CLOSE items_contrato_cursor;
DEALLOCATE items_contrato_cursor;




select @totalContratos as totalContratos,  @totalContratos as totalFacturas