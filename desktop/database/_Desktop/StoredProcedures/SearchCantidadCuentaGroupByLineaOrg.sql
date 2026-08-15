CREATE OR ALTER PROCEDURE [dbo].[SearchCantidadCuentaGroupByLineaOrg]
(@orgId int = 0,
@cue_ctipo varchar(256) = null,
@token VARCHAR(128) = '',
@sorter VARCHAR(128) = 'org.Name',
@pais int = null
)
as

DECLARE @wheres varchar(MAX) = ''
if @orgId != 0
BEGIN
		SET @wheres = ' AND ('+convert(varchar,@orgId)+' = org.Id)'
END

if @pais != 0 or @pais is not null
BEGIN
	SET @wheres = ' AND Country = '+CAST(@pais as char(3) )
END

IF @token != ''
BEGIN
	DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	SET @wheres = @wheres + @SqlFilterRango
END


DECLARE @Sql VARCHAR(MAX)


SET @Sql = '
SELECT
    org.Id AS OrgId,
    org.Name AS OrgNombre,
    org.NationalTax AS IdenFiscal,
    l.lin_ccodigo,
    l.lin_crazonsocial,
    ISNULL(pro_cdescripcion, '''') AS nombrePais,

    COUNT(c.cue_clinea) AS Cuentas,

    COUNT(cc0.est_nestado) AS Estado0,
    COUNT(cc1.est_nestado) AS Estado1,
    COUNT(cc2.est_nestado) AS Estado2,
    COUNT(cc3.est_nestado) AS Estado3,
    COUNT(cc4.est_nestado) AS Estado4,

    (SELECT COUNT(cc5.cue_iid)
     FROM _datos..m_cuentas cc5
     WHERE cc5.cue_clinea = l.lin_ccodigo
       AND cc5.cue_nAutomonitoreo = 1) AS automonitoreo,

    (SELECT COUNT(czon.cue_iid)
     FROM _datos..m_cuentas czon
     WHERE czon.cue_nparticion IS NOT NULL
       AND czon.cue_nparticion <> 0
       AND czon.cue_clinea = l.lin_ccodigo) AS CuentasParticion,

    SUM(Smartpanics.Smartpanics) AS Smartpanics,

    SUM(SmartTrack.VigiControl) AS VigiControl,

    -- CleanApp = tipo 8 + situación habilitado
	SUM(SmartTrack.CleanApp) AS CleanApp,

    -- TrackGuard = tipos 1,2,3 + situación habilitado
    SUM(TrackGuardFlag.TrackGuard) AS TrackGuard

FROM _datos..m_cuentas c

OUTER APPLY (
    SELECT COUNT(sp.CuentaId) AS Smartpanics
    FROM _datos..SmartPanic sp
    WHERE sp.CuentaId = c.cue_iid
) Smartpanics

OUTER APPLY (
    SELECT
        COUNT(CASE WHEN st.AppType = ''VIGICONTROL'' THEN st.CuentaId END) AS VigiControl,
        COUNT(CASE WHEN st.AppType = ''CLEANAPP''   THEN st.CuentaId END) AS CleanApp
    FROM _datos..SmartTrack st
    WHERE st.CuentaId = c.cue_iid
) SmartTrack



OUTER APPLY (
    SELECT CASE WHEN EXISTS (
        SELECT 1
        FROM [_Tablas].[dbo].[t_tipos] t
        INNER JOIN [_Desktop].[dbo].[m_estado_cuenta_cab_situacion] s
            ON s.est_iidcuenta = c.cue_iid
           AND s.Situacion = ''Habilitado''
        WHERE t.tip_ccodigo = c.cue_ctipo
          AND t.tip_nTipo IN (1,2,3)
          AND t.tip_nCondicion = 1
    ) THEN 1 ELSE 0 END AS TrackGuard
) TrackGuardFlag

LEFT JOIN _Tablas..t_lineas l
    ON l.lin_ccodigo = c.cue_clinea

LEFT JOIN _Datos.dbo.Organization org
    ON l.lin_iOrganizacion = org.Id

LEFT JOIN _datos..m_estado_cuenta_cab cc
    ON cc.est_iidcuenta = c.cue_iid

LEFT JOIN _datos..m_estado_cuenta_cab cc0
    ON cc0.est_iidcuenta = c.cue_iid
   AND cc0.est_nestado = 0
   AND c.cue_nparticion = 0

LEFT JOIN _datos..m_estado_cuenta_cab cc1
    ON cc1.est_iidcuenta = c.cue_iid
   AND cc1.est_nestado = 1
   AND c.cue_nparticion = 0

LEFT JOIN _datos..m_estado_cuenta_cab cc2
    ON cc2.est_iidcuenta = c.cue_iid
   AND cc2.est_nestado = 2
   AND c.cue_nparticion = 0

LEFT JOIN _datos..m_estado_cuenta_cab cc3
    ON cc3.est_iidcuenta = c.cue_iid
   AND cc3.est_nestado = 3
   AND c.cue_nparticion = 0

LEFT JOIN _datos..m_estado_cuenta_cab cc4
    ON cc4.est_iidcuenta = c.cue_iid
   AND cc4.est_nestado = 4
   AND c.cue_nparticion = 0

LEFT JOIN _Tablas.dbo.t_provincias
    ON Country = pro_idKey

WHERE 1 = 1
  AND l.lin_iOrganizacion > 0
  AND l.lin_iOrganizacion IS NOT NULL
  ' + @wheres + '

GROUP BY
    org.Id,
    org.Name,
    org.NationalTax,
    l.lin_ccodigo,
    l.lin_idkey,
    l.lin_crazonsocial,
    pro_cdescripcion

ORDER BY ' + @sorter + ' ASC
'


/*
print '******************************************************************'
print CAST(@sql AS NTEXT)
*/
EXEC(@Sql)