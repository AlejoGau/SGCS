--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.480
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchP_posicionesSP]
@page INT = 1,
@start INT = 0,
@limit INT = 50,
@sort NVARCHAR(256) = '',
@group NVARCHAR(256) = '',
@token NVARCHAR(256) = '',
@filter NVARCHAR(2048) = '',
@table NVARCHAR(2048) = '',
@_dc NVARCHAR(256) = '',
@totalrows INT = 1 OUTPUT
AS
SET NOCOUNT ON

declare @top int = 1000

if @limit =1
	select @top =1

--cambio los nombres de campos en sort y filter
SET @sort = replace(@sort,'sp_iid','pos_idKey')
SET @sort = replace(@sort,'sp_tfechahora','pos_tfechahora')
SET @sort = replace(@sort,'sp_cIMEI','pos_cIMEI')
SET @sort = replace(@sort,'sp_rLatitud','pos_rLatitud')
SET @sort = replace(@sort,'sp_rLongitud','pos_rLongitud')
SET @sort = replace(@sort,'sp_rAccuracy','pos_rAccuracy')
SET @sort = replace(@sort,'sp_iVelocidad','pos_iVelocidad')
SET @sort = replace(@sort,'sp_iOdometro','pos_iOdometro')
SET @sort = replace(@sort,'sp_iBatt','pos_iBattery')
SET @sort = replace(@sort,'sp_iSecuencia','pos_iSecuencia')
SET @sort = replace(@sort,'sp_reciid','pos_idRec')
SET @sort = replace(@sort,'gps_cMethod','pos_cMethod')

SET @filter = replace(@filter,'sp_iid','pos_idKey')
SET @filter = replace(@filter,'sp_tfechahora','pos_tfechahora')
SET @filter = replace(@filter,'sp_cIMEI','pos_cIMEI')
SET @filter = replace(@filter,'sp_rLatitud','pos_rLatitud')
SET @filter = replace(@filter,'sp_rLongitud','pos_rLongitud')
SET @filter = replace(@filter,'sp_rAccuracy','pos_rAccuracy')
SET @filter = replace(@filter,'sp_iVelocidad','pos_iVelocidad')
SET @filter = replace(@filter,'sp_iOdometro','pos_iOdometro')
SET @filter = replace(@filter,'sp_iBatt','pos_iBattery')
SET @filter = replace(@filter,'sp_iSecuencia','pos_iSecuencia')
SET @filter = replace(@filter,'sp_reciid','pos_idRec')
SET @filter = replace(@filter,'gps_cMethod','pos_cMethod')

--Sort
DECLARE @SqlSort AS NVARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[pos_idKey] DESC')

--Filters
DECLARE @SqlFilter AS NVARCHAR(MAX)
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_posicionesSP')

 DECLARE @Index INT  
 SET @Index = 1
 DECLARE @FilterProperty NVARCHAR(32)  
 DECLARE @FilterValue NVARCHAR(64) 
 DECLARE @Fecha_desde DATETIME
 DECLARE @Fecha_desdestr NVARCHAR(64)=''
 DECLARE @StringAux NVARCHAR(64)
SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')         
WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)  
 BEGIN    
  --Read  
  SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'  
  SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'
  --Print 'FilterProperty '+@FilterProperty
  if @FilterProperty IN ('pos_tfechahora:GTE','pos_tfechahora:GT','pos_tfechahora:GTEDATESTRING')
	begin
		/*
		Print '===='
		Print '@FilterProperty ' + @FilterProperty 
		Print 'Valor: '+@FilterValue
		*/
		if @FilterProperty ='pos_tfechahora:GTEDATESTRING'
			SET @Fecha_desde = @FilterValue
		Else
		Begin
			DECLARE @fullString NVARCHAR(50);
			DECLARE @timestampMs BIGINT;
			DECLARE @offsetMin INT;
			DECLARE @offsetHours INT;
			DECLARE @offsetMinutes INT;
			DECLARE @startPos INT = 7; -- Posición de inicio después de '/Date('
		
			SET @fullString = REPLACE(REPLACE(SUBSTRING(@FilterValue, @startPos, LEN(@FilterValue) - @startPos + 1), ')', ''), '/', '');
			--Extracción del timestamp puro y offset
			IF @FilterValue LIKE '%[+-][0-9][0-9][0-9][0-9]%'
			BEGIN
				-- Fecha con offset (ej: 1764039600000-0300)
    
				-- Extraer el timestamp (hasta el signo de zona horaria)
				SET @timestampMs = CAST(SUBSTRING(@fullString, 1, LEN(@fullString) - 5) AS BIGINT);
    
				-- Cálculo de Offset (Aislado para evitar errores)
				SET @offsetHours = CAST(SUBSTRING(@fullString, LEN(@fullString) - 4, 3) AS INT);
				SET @offsetMinutes = CAST(SUBSTRING(@fullString, LEN(@fullString) - 1, 2) AS INT);
    
				-- Sumar las horas y los minutos, aplicando el signo de la hora a los minutos también
				SET @offsetMin = (@offsetHours * 60) + (@offsetMinutes * SIGN(@offsetHours));
			END
			ELSE
			BEGIN
				-- Fecha sin offset (ej: 946684800000)
				SET @timestampMs = CAST(@fullString AS BIGINT);
				SET @offsetMin = 0;
			END

			IF @timestampMs IS NOT NULL
			BEGIN
				SET @Fecha_desde = DATEADD(SECOND, @timestampMs / 1000, '1970-01-01');
				SET @Fecha_desde = DATEADD(MINUTE, @offsetMin * -1, @Fecha_desde);
			END
			ELSE
			BEGIN
				SET @Fecha_desde = NULL;
			END
			/*
			Print '@Fecha_desde'
			Print @Fecha_desde
			*/
			/*
			SET @StringAux = REPLACE(@FilterValue,'/Date(','')
			SET @StringAux = REPLACE(@StringAux,')/','')
			--PRINT '@StringAux: '+@stringaux
			SET @Fecha_desde = cast(dateadd(s, convert(bigint, @StringAux) / 1000, cast('1970-01-01' as datetime)) as date)
			*/
		End
		
		SET @Fecha_desdestr = convert(varchar,@Fecha_desde,103)
		--PRINT '@Fecha_desdestre: '+@Fecha_desdestr
		SET @Fecha_desdestr = substring(replace(@Fecha_desdestr,'/',''),5,4)+substring(replace(@Fecha_desdestr,'/',''),3,2)
		--PRINT '@Fecha_desdestre: '+@Fecha_desdestr
	end
  SET @Index = @Index + 1  
 End


 IF @table=''
	BEGIN 
	--Print 'Sin @table '
	--Print '@Fecha_desdestr = '+@Fecha_desdestr
		IF @Fecha_desdestr=''
			set @table = 'p_Posiciones'+SUBSTRING(REPLACE(CONVERT(VARCHAR,GETDATE(),102),'.',''),1,6)
		ELSE
			set @table = 'p_Posiciones'+@Fecha_desdestr

	--Print '@table = '+@table
	END


 DECLARE @tabla_hist_recepcion NVARCHAR(256)
 SELECT @tabla_hist_recepcion='p_recepcion'+replace(@table,'p_Posiciones','')

 /*if CHARINDEX('sp_tfechahora',@SqlFilter)>0
	begin
	end*/
--Sql
DECLARE @Sql NVARCHAR(MAX)
--SET @Sql = 'FROM [_Datos]..[p_posicionesSP] o WITH (NOLOCK)
--LEFT JOIN _History.dbo.'+@table+' gps WITH (NOLOCK) ON gps.pos_idRec = o.sp_reciid and  o.sp_reciid> 0
SET @Sql = 'FROM _History.dbo.'+@table+' o
LEFT JOIN _datos..'+@tabla_hist_recepcion+' p WITH (NOLOCK) ON p.rec_iid = o.pos_idRec
left join _datos..smartpanic s WITH (NOLOCK) on s.imei = o.pos_cIMEI COLLATE Modern_Spanish_CI_AS
left join _datos..m_cuentas c with (nolock) on s.cuentaid = c.cue_iid
left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
left join _tablas..t_codigos_alarma ca WITH (NOLOCK) on p.rec_calarma = ca.cod_ccodigo
            WHERE 1 = 1 ' + @SqlFilter

--Total Rows
DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)
DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)
SET @DynamicSqlTotalRows = ' SELECT top '+convert(varchar(10),@top)+' @TotalRows = COUNT(*) ' + @Sql
SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'


--print @DynamicSqlTotalRows
-- print @Sql
         
--EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT

--Execute Sql (ReturnRows)
DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)
SET @DynamicSqlReturnRows = 'SELECT top '+convert(varchar(10),@top)+' *
    FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, pos_idKey Id
	, pos_idKey as sp_iid, pos_tfechahora as sp_tfechahora, pos_cIMEI as sp_cIMEI
	, pos_rLatitud as sp_rLatitud
	, pos_rLongitud as sp_rLongitud, pos_rAccuracy as sp_rAccuracy
	, pos_iVelocidad as sp_iVelocidad, pos_iRumbo as sp_iRumbo, pos_iOdometro as sp_iOdometro
	, pos_iBattery as sp_iBatt, pos_iSecuencia as sp_iSecuencia, pos_idRec as sp_reciid
	,p.rec_calarma,ca.cod_cdescripcion, o.pos_cMethod as  gps_cMethod,gmt.ttz_noffset, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (o.pos_tfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tfechahoraOffset ' + @Sql + ' ) AS T
    WHERE RowNumber BETWEEN @from AND @to '
                              
DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                                        
SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'    

        
DECLARE @from INT
DECLARE @to INT
SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit


/*
print '******************'	  
print CAST(@DynamicSqlReturnRows AS NTEXT)
*/
EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to