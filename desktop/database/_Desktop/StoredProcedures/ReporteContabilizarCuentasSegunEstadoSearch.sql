--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.890 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ReporteContabilizarCuentasSegunEstadoSearch]
    @fechadesde NVARCHAR(256) = '', 
    @fechahasta NVARCHAR(256) = '',

    -- Se agrega el campo @token para dealizar 
    @token VARCHAR(128) = '',

	-- 29/05 : BC Se suma el filtro para poder buscar por dealer especifico
	@filter VARCHAR(2048) = '',
	@sort VARCHAR(256) = ''
AS  
SET NOCOUNT ON   

DECLARE @Sql nVARCHAR(MAX)

 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'a.[aud_tFechaHora] DESC')

 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_estado_cuenta_cab_situacion')

 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max) = ''
 EXEC getSqlRangesForToken @table = '[_Datos]..[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

 SET @SqlFilter = @SqlFilter + @SqlFilterRango;

 SET @Sql = N'SELECT count(*) as valor, [Situacion] as descripcion   FROM m_estado_cuenta_cab_situacion LEFT JOIN _Datos..m_cuentas c ON ( est_iidcuenta = cue_iid) WHERE 1 = 1 '+@SqlFilter+'
        --AND est_dfechadesde >= '''+@fechadesde+''' AND est_dfechadesde <= '''+@fechahasta+'''
        group by Situacion						
    '
 
 print @Sql
 EXECUTE sp_executesql @Sql;