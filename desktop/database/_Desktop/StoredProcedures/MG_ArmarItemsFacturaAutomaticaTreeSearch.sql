CREATE OR ALTER PROCEDURE [dbo].[MG_ArmarItemsFacturaAutomaticaTreeSearch]
@iCliente Int  As
--Arma los items de la Facturacion Automatica
Declare @DiaHoy     	 DateTime
Declare @iExiste Int

SET @DiaHoy = GETDATE()

Set @iExiste = (Select Top 1 rel_icliente From _Datos..m_relacion_cliente_cuentas_fc Where rel_icliente=@iCliente And rel_ntipo>0)
print @iExiste
IF @iExiste Is Null
   Begin
	SELECT 0 As nfc_icodigo_ID,ser_cdescripcion As Name,1 As Count,nov_mimporte as Value,
	nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, ser_inovedad As iNovedadTabla, 'true' as leaf
	FROM _Datos..m_clientes_fc
	Left Outer Join _Tablas.dbo.t_servicios_fc
	ON ser_ccodigo = cli_cservicio
	Inner Join  _Tablas.dbo.t_novedades_fc
	ON ser_inovedad=nov_icodigo_ID
	Where cli_icodigo_ID = @iCliente
	Union All
	SELECT nfc_icodigo_ID, nov_cdescripcion As Name,1 As Count,nov_mimporte as Value,
	nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, nfc_inovedad As iNovedadTabla, 'true' as leaf
	FROM _Datos.dbo.m_novedades_facturacion_fc
	Inner Join _Tablas.dbo.t_novedades_fc
	ON nfc_inovedad = nov_icodigo_ID
	Where nfc_icliente= @iCliente And nfc_nestado = 0
   End
Else
   Begin
	Create Table #tmpCursor (Cantidad Int, Novedad Int)
	
	Insert #tmpCursor 
	SELECT Count(rel_icuenta) As nCuentas,rel_inovedadtabla FROM _Datos..m_relacion_cliente_cuentas_fc
	Where rel_ntipo = 1 And rel_icliente = @iCliente And
	rel_icuenta Not In (	
	Select est_iidcuenta FROM _Datos..m_estado_cuenta_Cab With (NOLOCK) 
	             Where est_iidCuenta=rel_iCuenta And ( est_nEstado=2 OR 
			( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta	) )
			)
	Group By rel_inovedadtabla
	
	Union All
	SELECT Count(cue_iid) As nCuentas,rel_inovedadtabla FROM _Datos..m_relacion_cliente_cuentas_fc
	Inner Join _Datos..m_cuentas ON cue_clinea=rel_cdealer
	Where rel_ntipo = 2 And rel_icliente = @iCliente And
	cue_iid Not In (	
	Select est_iidcuenta FROM _Datos..m_estado_cuenta_Cab With (NOLOCK) 
	             Where est_iidCuenta=rel_iCuenta And ( est_nEstado=2 OR 
			( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta	) )
			)
	Group By rel_inovedadtabla
	
	Select Sum(cantidad) As cantidad,novedad Into #cUno From #tmpCursor
	   Group By novedad
	
	Select 0 As nfc_icodigo_ID,nov_cdescripcion As Name,cantidad as Count,nov_mimporte as Value,
	nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, novedad As iNovedadTabla, 'true' as leaf
	FROM #cUno
	Inner Join  _Tablas.dbo.t_novedades_fc
	ON novedad=nov_icodigo_ID
	Union All
	SELECT nfc_icodigo_ID, nov_cdescripcion As Name,1 As Count,nov_mimporte as Value,
	nov_cimpuesto1, nov_cimpuesto2, nov_cimpuesto3, nfc_inovedad As iNovedadTabla, 'true' as leaf
	FROM _Datos.dbo.m_novedades_facturacion_fc
	Inner Join _Tablas.dbo.t_novedades_fc
	ON nfc_inovedad = nov_icodigo_ID
	Where nfc_icliente= @iCliente And nfc_nestado = 0
	
	Drop Table #tmpCursor
	Drop Table #cUno
  End