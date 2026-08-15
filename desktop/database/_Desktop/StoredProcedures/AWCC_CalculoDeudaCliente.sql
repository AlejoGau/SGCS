CREATE OR ALTER PROCEDURE [dbo].[AWCC_CalculoDeudaCliente]
	@cue_iid INT,
	@fechadesde DATETIME,
	@fechahasta DATETIME,
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT     
AS  
	SET NOCOUNT ON 
	
	DECLARE @IdCliente INT
	SELECT @IdCliente = rel_icliente FROM _Datos.dbo.m_relacion_cliente_cuentas_fc WHERE rel_icuenta=@Cue_IId

	SELECT cbc_iCodigo_ID, ISNULL(cli_cnombre,'') As cNombre, ISNULL(cbt_cdescripcion,'') As cCbte, ISNULL(cbt_ntipo,1) As cbt_ntipo, cbc_cPrefijoCbte, cbc_iNumeroCbte, cta_dVencimiento, cta_nCuota, cta_yTotal, cta_ySaldo 
	  FROM _datos.dbo.m_cuenta_corriente_fc 
		   LEFT OUTER JOIN _datos.dbo.m_comprobantes_cab_fc On cbc_iCodigo_ID=cta_iCodigoCbte
		   LEFT OUTER JOIN _Tablas.dbo.t_comprobantes_fc On cbc_cTipoCbte=cbt_ccodigo
		   LEFT OUTER JOIN _datos.dbo.m_clientes_fc On cbc_iCliente=cli_icodigo_ID
		   LEFT OUTER JOIN _Tablas.dbo.t_condiciones_pago_fc On cli_ccondicionpago=con_ccodigo
     WHERE cbc_cEstado=''
		   AND M_CLIENTES_FC.cli_icodigo_ID = @IdCliente
		   AND m_cuenta_corriente_fc.cta_dVencimiento > @fechadesde 
		   AND m_cuenta_corriente_fc.cta_dVencimiento < @fechahasta
  ORDER BY cNombre,cta_dVencimiento,cCbte,cbc_iNumeroCbte