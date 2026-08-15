--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.170 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[PromedioTiempoEventoByPrioridad]
@fechadesde NVARCHAR(50) = '',
@fechahasta NVARCHAR(50) = '',

-- Nuevo agregado para historico
@table NVARCHAR(128) = 'p_recepcion',

@token NVARCHAR(128) = ''
AS
BEGIN


DECLARE @SqlQuery NVARCHAR(MAX);
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

IF @fechadesde != '' 
BEGIN
	SET @SqlWhere = ' AND rec_tfechahora <= '''+convert(varchar,convert(date,@fechahasta,120),112)+''' AND rec_tfechahora >= '''+convert(varchar,convert(date,@fechadesde,120),112)+'''';
END
 
IF @token != ''
BEGIN
	DECLARE @SqlFilterRango AS NVARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	SET @SqlWhere = @SqlWhere + @SqlFilterRango
END

-- Se agrega la posibilidad de consultar las tablas por mes de _Datos..p_recepcion_proceso
declare @tablaProceso varchar(128) = 'p_recepcion_proceso'
-- no se ven los eventos pendientes en una consulta comun de historicos.
IF (@table = 'p_recepcion' OR @table = '')
    BEGIN
        set @table = 'p_recepcion'
    END
ELSE
    BEGIN
        -- Asigno el mes en caso de venir con combo de historico del reporte.
        select @tablaProceso = @tablaProceso+RIGHT(@table,6)
		-- En caso de no existir la tabla de p_recepcion_procesoYYYYMM busco en p_recepcion_proceso
		IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaProceso)
			BEGIN
				PRINT 'Table p_recepcion_proceso of Month NOT Exists'
				SET @tablaProceso = 'p_recepcion_proceso';
				print @tablaProceso

                -- En caso que no exista la tabla p_recepcion_procesoYYYMM, devuelvo 0.
                RETURN

			END
		ELSE
			BEGIN
				PRINT 'Table p_recepcion_proceso of Month Exists'
				print @tablaProceso
				print @table
      
			END
    END

END

-- Si existe la tabla de p_recepcion_procesoYYYYMM ejecuto
SET @SqlQuery = '
    SELECT SUBSTRING(CONVERT(varchar(2),pr.rec_iPrioridad), 1, 1) as rec_iPrioridad,
                avg(cast(isnull(datediff(SECOND, rec_tfechahora ,prp.pro_tfechahora),0) as bigint)) as promedio
    FROM _Datos..'+@table+' pr
    LEFT JOIN _datos..m_cuentas c ON (c.cue_iid = pr.rec_iidcuenta)
    INNER JOIN _Datos..'+@tablaProceso+' prp ON (
        prp.pro_recid = pr.rec_iid AND 
        prp.pro_nProceso = 11 AND 
        prp.pro_tfechahora = (
            SELECT min(pro.pro_tfechahora) from _Datos..'+@tablaProceso+' pro 
            where pro.pro_recid = pr.rec_iid 
            AND prp.pro_nProceso = 11
    ))
    WHERE 1=1
        '+@SqlWhere+'	
        AND pr.rec_iPrioridad <> '''' 
        AND rec_idResolucion <> '''' 
        AND rec_tFechaProceso is not null
        AND prp.pro_nProceso = 11
    GROUP BY SUBSTRING(CONVERT(varchar(2),pr.rec_iPrioridad), 1, 1)
    ORDER BY rec_iPrioridad 
';

print (@SqlQuery);
EXECUTE (@SqlQuery);