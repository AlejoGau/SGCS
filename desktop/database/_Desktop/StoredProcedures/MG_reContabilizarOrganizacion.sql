-- =============================================
-- Author:		Rodrigo Román
-- Create date: 27/01/2020
-- Description:	Elimina los datos contables de una organizacion y recontabiliza todos los comprobantes
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_reContabilizarOrganizacion] 
	-- Add the parameters for the stored procedure here
	@idOrganizacion int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    print '[MG_reContabilizarOrganizacion] limpio los movimientos contables'
	delete m from _datos..mg_movimientoscuentas m
	inner join _datos..mg_maestrocuentas mc on mgm_idcuenta = mgmc_idkey
	where mgmc_idorganizacion = @idOrganizacion

	print '[MG_reContabilizarOrganizacion] limpio las cuentas de los impuestos de comprobantes'
	update _datos..MG_comprobante_impuesto set mci_mgmidkey = 0
	where mci_cbcicodigoid in (
		select cbc_iCodigo_ID from _datos..m_comprobantes_cab_fc
		where cbc_iOrganizacionFacturadora = @idOrganizacion
	)

	print '[MG_reContabilizarOrganizacion] pongo el saldo de las cuentas en 0'
	update _datos..mg_maestrocuentas set mgmc_saldo = 0
	where mgmc_idorganizacion = @idOrganizacion

	print '[MG_reContabilizarOrganizacion] elimino registros cuenta corriente'
	delete cc from _datos..m_cuenta_corriente_fc cc
	where cta_iCodigoCbte in  (
		select cbc_iCodigo_ID from _datos..m_comprobantes_cab_fc
		where cbc_iOrganizacionFacturadora = @idOrganizacion
	)

	print '[MG_reContabilizarOrganizacion] limpio los pagos'
	update pag set pag_iCodigoCaja = 0
	from _datos..m_pagos_fc pag
	where pag_iCodigoCbte in  (
		select cbc_iCodigo_ID from _datos..m_comprobantes_cab_fc
		where cbc_iOrganizacionFacturadora = @idOrganizacion
	)

	print '[MG_reContabilizarOrganizacion] recontabilizo comprobantes'
	exec _desktop..[MG_ContabilizaComprobantesPendientes]

END