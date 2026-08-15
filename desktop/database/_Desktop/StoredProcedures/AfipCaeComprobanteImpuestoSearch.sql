CREATE OR ALTER PROCEDURE [dbo].[AfipCaeComprobanteImpuestoSearch]  
	@cbcicodigoid INT
AS
	SET NOCOUNT ON
	
	SELECT
      max([mci_cbcicodigoid]) mci_cbcicodigoid
      ,sum([mci_total]) mci_total
      ,sum([mci_baseimponible]) mci_baseimponible
      ,max([mci_mgmidkey]) mci_mgmidkey
	  ,imp_extcode
	  FROM _Datos.dbo.MG_comprobante_impuesto
	  inner join _Tablas..t_impuestos_fc on mci_impidkey = imp_idkey
	  
	 WHERE mci_cbcicodigoid = @cbcicodigoid
	 group by imp_extcode