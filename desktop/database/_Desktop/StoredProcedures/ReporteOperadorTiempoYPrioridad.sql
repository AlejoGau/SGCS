--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.720 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.807 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[ReporteOperadorTiempoYPrioridad]
	@fechaDesde NVARCHAR(256) = '',
	@fechaHasta NVARCHAR(256) = '',
	@idOperador NVARCHAR(256) = '',
    @table NVARCHAR(128) = ''
AS
BEGIN
  
	DECLARE @Sql NVARCHAR(MAX)
	set @Sql = ''

	DECLARE @Where NVARCHAR(MAX)
	set @Where = ''

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

    

	IF  @idOperador != ''          
		SET @Where = @Where + ' AND ope_iid = '+@idOperador  

	IF  @fechaDesde != ''           
		SET @Where = @Where + ' AND  rec_tfechahora >= '''+@fechaDesde  +''''

	IF  @fechaHasta != ''           
		SET @Where = @Where + ' AND  rec_tfechahora  <= '''+@fechaHasta  +''''
	
    


	SET @Sql = '
		SELECT 
			LEFT(r.rec_iPrioridad,1) as prioridad
			, avg(cast(isnull(datediff(SECOND, rec_tfechahora, rec_tFechaProceso),0) as bigint)) as promedioSegundos
			, avg(cast(isnull(datediff(MINUTE, rec_tfechahora, rec_tFechaProceso),0) as bigint)) as promedioMinutos  
			, count(1) as cantidadEventos
			, ope_clogin as operador
            --, rec_tFechaProceso
		FROM _Datos..'+@table+' r
		    LEFT JOIN _sistema..s_operadores o on (r.rec_iOperador = o.ope_iid)	
		WHERE rec_nestado = 3 
			and rec_tFechaProceso>0 and rec_tFechaProceso is not null
			and r.rec_iid in (select p.pro_recid from _Datos..'+@tablaProceso+' p where p.pro_recid = r.rec_iid AND p.pro_nProceso in (12,11))
			'
			+@Where+'
		GROUP BY LEFT(r.rec_iPrioridad,1) , r.rec_iOperador, ope_clogin --, rec_tFechaProceso
		ORDER BY ope_clogin ASC, LEFT(r.rec_iPrioridad,1) ASC
	';

	print(@Sql)
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	exec(@Sql);
END