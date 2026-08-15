--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.480
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchP_posicionesSP_backup]
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

if @limit =1
	select @top =1

--Sort
DECLARE @SqlSort AS NVARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[sp_iid] DESC')

--Filters
DECLARE @SqlFilter AS NVARCHAR(MAX)
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_posicionesSP')

--2022-05-04 Pablo hablado con DBA
Set @SqlFilter = Replace ( @SqlFilter,'[sp_cimei]','o.sp_cimei')

--Sql
DECLARE @Sql NVARCHAR(MAX)
SET @Sql = 'FROM [_Datos]..[p_posicionesSP] o WITH (NOLOCK)
LEFT JOIN _Datos.dbo.p_PosicionesGps gps WITH (NOLOCK) ON gps.gps_idRec = o.sp_reciid and  o.sp_reciid> 0
LEFT JOIN _datos..p_recepcion p WITH (NOLOCK) ON p.rec_iid = o.sp_reciid
left join _datos..smartpanic s WITH (NOLOCK) on s.imei = o.sp_cimei
left join _datos..m_cuentas c with (nolock) on s.cuentaid = c.cue_iid
left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
left join _tablas..t_codigos_alarma ca WITH (NOLOCK) on p.rec_calarma = ca.cod_ccodigo
            WHERE 1 = 1 ' + @SqlFilter

--Total Rows
DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)
DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)
SET @DynamicSqlTotalRows = ' SELECT top '+convert(varchar(10),@top)+' @TotalRows = COUNT(*) ' + @Sql
SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'


print @DynamicSqlTotalRows
-- print @Sql
         
--EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT

--Execute Sql (ReturnRows)
DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)
SET @DynamicSqlReturnRows = 'SELECT top '+convert(varchar(10),@top)+' *
    FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, sp_iid Id, o.*,p.rec_calarma,ca.cod_cdescripcion, gps.gps_cMethod,gmt.ttz_noffset, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (o.sp_tfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tfechahoraOffset ' + @Sql + ' ) AS T
    WHERE RowNumber BETWEEN @from AND @to '
                              
DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                                        
SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'    

--print @DynamicSqlReturnRows
          
DECLARE @from INT
DECLARE @to INT
SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
                   
EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to