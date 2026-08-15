CREATE OR ALTER PROCEDURE [dbo].[SearchCantidadCuentaGroupByLinea]
(@lin_ccodigo varchar(256) = '',
@cue_ctipo varchar(256) = null,
@token VARCHAR(128) = '',
@sorter VARCHAR(128) = 'l.lin_ccodigo'
)
as

DECLARE @wheres varchar(MAX) = ''
if @lin_ccodigo != ''
BEGIN
		SET @wheres = ' AND ('''+@lin_ccodigo+''' = c.cue_clinea)'
END

IF @token != ''
BEGIN
	DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	SET @wheres = @wheres + @SqlFilterRango
END


DECLARE @Sql VARCHAR(MAX)


SET @Sql = '
select l.lin_ccodigo,l.lin_crazonsocial 
, COUNT(c.cue_clinea) Cuentas
, COUNT(cc0.est_nestado) Estado0 
, COUNT(cc1.est_nestado) Estado1 
, COUNT(cc2.est_nestado) Estado2 
, COUNT(cc3.est_nestado) Estado3 
, COUNT(cc4.est_nestado) Estado4 
, (select COUNT(cc5.cue_iid) from _datos..m_cuentas cc5 where cc5.cue_clinea = l.lin_ccodigo and cc5.cue_nAutomonitoreo = 1)  automonitoreo
, (select COUNT(czon.cue_iid) from _datos..m_cuentas czon where czon.cue_nparticion is not null and czon.cue_nparticion != 0 and czon.cue_clinea = l.lin_ccodigo)  CuentasParticion
, sum(Smartpanics) Smartpanics
, sum(VigiControl) VigiControl
, sum(TrackGuard) TrackGuard
from _datos..m_cuentas c
outer apply (select count(sp.CuentaId) as Smartpanics from _datos..SmartPanic sp where sp.CuentaId = c.cue_iid) Smartpanics
outer apply (select count(st.CuentaId) as VigiControl from _datos..SmartTrack st where st.CuentaId = c.cue_iid) VigiControl
outer apply (select count( v.ownerid) as TrackGuard from _Datos.dbo.DispositivoMovil v where c.cue_iid = v.ownerid) TG
left join _Tablas..t_lineas l on (l.lin_ccodigo = c.cue_clinea)
left join _datos..m_estado_cuenta_cab cc on (cc.est_iidcuenta = c.cue_iid)
left join _datos..m_estado_cuenta_cab cc0 on (cc0.est_iidcuenta = c.cue_iid and cc0.est_nestado = 0 and c.cue_nparticion =0)
left join _datos..m_estado_cuenta_cab cc1 on (cc1.est_iidcuenta = c.cue_iid and cc1.est_nestado = 1 and c.cue_nparticion =0)
left join _datos..m_estado_cuenta_cab cc2 on (cc2.est_iidcuenta = c.cue_iid and cc2.est_nestado = 2 and c.cue_nparticion =0)
left join _datos..m_estado_cuenta_cab cc3 on (cc3.est_iidcuenta = c.cue_iid and cc3.est_nestado = 3 and c.cue_nparticion =0)
left join _datos..m_estado_cuenta_cab cc4 on (cc4.est_iidcuenta = c.cue_iid and cc4.est_nestado = 4 and c.cue_nparticion =0)
--left join _datos..SmartPanic sp on (sp.CuentaId = c.cue_iid)
--left join _datos..m_cuentas czon on (l.lin_ccodigo = czon.cue_clinea and czon.cue_nparticion != 0 and czon.cue_nparticion is not null)
--where (@lin_ccodigo is null or @lin_ccodigo = l.lin_ccodigo)
--and (@cue_ctipo is null or @cue_ctipo = c.cue_ctipo)
WHERE 1=1 '+@wheres+'
group by l.lin_ccodigo,l.lin_idkey, l.lin_crazonsocial--, c.cue_clinea, cc0.est_nestado, cc1.est_nestado, cc2.est_nestado, cc3.est_nestado, cc4.est_nestado
ORDER BY '+@sorter+' ASC
'

--print '******************************************************************'
print CAST(@sql AS NTEXT)
EXEC(@Sql)
/*
select * From _datos..m_cuentas where cue_nparticion != 0

MON
SGD
520
MON
MON
SGD
SGD
SGD
*/