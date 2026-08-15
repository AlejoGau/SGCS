--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.230 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ReporteInformeCuenta]
	@page INT = 1,               
  @start INT = 0,               
  @limit INT = 50,               
  @sort NVARCHAR(64) = '',            
  @filter NVARCHAR(2048) = '',
	@nombreDesde NVARCHAR(255) = '',
	@nombreHasta NVARCHAR(255) = '',
	@cue_lineaDesde NVARCHAR(3) = '',
	@cue_lineaHasta  NVARCHAR(3) = '',
	@cuentaDesde NVARCHAR(4) = '',
	@cuentaHasta NVARCHAR(4) = '',
	@est_nEstado NVARCHAR(2) = '',
	@token NVARCHAR(128),     
  @_dc NVARCHAR(256) = ''
,@totalrows INT = 1 OUTPUT        
AS
BEGIN

DECLARE @Sql NVARCHAR(MAX)
set @Sql = ''

 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_cuentas')



IF @nombreDesde != '' AND @nombreHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND m_cuentas.cue_cnombre Between '''+@nombreDesde+''' And '''+@nombreHasta+''' '   
END 
IF @cue_lineaDesde != '' AND @cue_lineaHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND m_cuentas.cue_clinea Between '''+@cue_lineaDesde+''' And '''+@cue_lineaHasta+''' '   
END 

IF @est_nEstado != ''
BEGIN   
SET @Sql = @Sql + ' AND est_nEstado = '+@est_nEstado 
END 


 
set @Sql = 'select  
IsNull(lin_crazonsocial,Space(60)) as lin_crazonsocial,
IsNull(tip_cdescripcion,Space(40)) as tip_cdescripcion,
IsNull(pro_cdescripcion,Space(40)) As pro_cdescripcion,
cue_iid,
cue_clinea,
cue_ncuenta,
cue_cnombre,
cue_ccalle,
cue_clocalidad,
cue_cprovincia,
cue_ccodigopostal,
cue_cclave,
cue_cpermiso,
cue_ctipo,
cue_cubicacion,
cue_cobservacion,
cue_dfechaalta,
cue_dservicio,
cue_ctelefono,
cue_cIMEI,
cue_cemail,
cue_cinstalador,
IsNull(ins_cnombre,Space(40)) as ins_cnombre,cue_nllaveul,cue_nsonidoul,
(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then ''En Prueba'' When est_nEstado=2 Then ''No Habilitado'' When est_nEstado=3 Then ''En Prueba Por Zonas'' Else ''Habilitado'' End ) As Situacion,
(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then 1 When est_nEstado=2 Then 2 When est_nEstado=3 Then 3 Else 0 End ) As iSituacion  ,

usu_icodigo,
usu_cnombre,
usu_iid,
usu_cclave,
usu_ntipo,
usu_mobservacion



from _Datos..m_cuentas  With (NOLOCK)  
Left Outer Join _Tablas.dbo.t_provincias ON pro_ccodigo=cue_cprovincia
Left Outer Join _Tablas.dbo.t_tipos ON tip_ccodigo=cue_ctipo
Left Outer Join _Tablas.dbo.v_lineas ON lin_ccodigo=cue_clinea
Left Outer Join _Tablas.dbo.t_instaladores ON ins_ccodigo=cue_cinstalador 
Left Outer Join _Datos..m_estado_cuenta_cab On cue_iid = est_iidcuenta 
Left Outer Join _Datos..m_usuarios ON m_cuentas.cue_iid = m_usuarios.usu_iidcuenta
Left Outer Join _Datos..m_telefonos ON m_cuentas.cue_iid = m_telefonos.tel_iidcuenta And m_telefonos.tel_iid>0    '
+ @Sql + @SqlFilter +' 
ORDER BY  cue_clinea,cue_ncuenta
'


exec(@Sql)

DECLARE @SqlUsuarios NVARCHAR(MAX)
set @SqlUsuarios = 'select  

usu_icodigo,
usu_cnombre,
usu_iid,
usu_cclave,
usu_ntipo,
usu_mobservacion

from _Datos..m_cuentas  With (NOLOCK)  
Left Outer Join _Datos..m_estado_cuenta_cab On cue_iid = est_iidcuenta 
Left Outer Join _Datos..m_usuarios ON m_cuentas.cue_iid = m_usuarios.usu_iidcuenta'
+ @Sql + @SqlFilter +' 
ORDER BY  cue_clinea,cue_ncuenta
'
--exec(@SqlUsuarios)


END