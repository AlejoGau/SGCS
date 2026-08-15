CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_ExcesosVelocidad]
@page INT = 1,
@start INT = 0,
@limit INT = 50,
@sort NVARCHAR(256) = '',
@group NVARCHAR(256) = '',
@token NVARCHAR(256) = '',
@filter NVARCHAR(2048) = '',
@_dc NVARCHAR(256) = '',
@totalrows INT = 1 OUTPUT
AS
SET NOCOUNT ON

declare @top int = 1000

if @limit = 1
	select @top = 1

--Sort
DECLARE @SqlSort AS NVARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[gps_iid] DESC')

 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT


--Filters
DECLARE @SqlFilter AS NVARCHAR(MAX) = ''

 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')

print 'Filter'
print @SqlFilter

--Sql
DECLARE @Sql NVARCHAR(MAX)
SET @Sql = 'SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

			SELECT 
                gps_idCuenta,
                v.Domain,
				v.Name,
				o.cue_clinea,
				o.cue_ncuenta,
				o.cue_cnombre,
                sum(case when gps_iVelocidad between 80 and 90 then 1 else 0 end) as ''mayorOchenta'',
                sum(case when gps_iVelocidad between 91 and 100 then 1 else 0 end) as ''mayorNoventa'',
                sum(case when gps_iVelocidad between 101 and 999 then 1 else 0 end) as ''mayorCien'',
                sum(case when gps_iVelocidad >= 80 then 1 else 0 end) as ''Total''
            FROM _Datos.dbo.p_PosicionesGPS p
				INNER JOIN _Datos.dbo.m_cuentas o ON ( o.cue_iid = p.gps_idCuenta AND p.gps_cimei = o.cue_cimei )
                INNER JOIN _Datos.dbo.DispositivoMovil v ON ( v.OwnerId = o.cue_iid )
            WHERE 1=1 '+ @SqlFilter + @SqlFilterRango +'
            GROUP BY 
                gps_idCuenta,
                v.Domain,
				v.Name,
				o.cue_clinea,
				o.cue_ncuenta,
				o.cue_cnombre';

EXEC (@Sql)