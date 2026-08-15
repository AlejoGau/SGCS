--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2018-08-23 10:00:00.000 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchHistoricoCambiosAsignacion_ExportExcel]
	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = '',
	@vigilador NVARCHAR(256) = '',
    @cuenta NVARCHAR(256) = '',
    @sort NVARCHAR(256) = '',
    @token VARCHAR(128) = '',
    @table NVARCHAR(128) = ''
AS
BEGIN
	--SET DATEFORMAT ymd; 
	DECLARE @Sql NVARCHAR(MAX)
	set @Sql = ''

	DECLARE @Where NVARCHAR(MAX)
	set @Where = ''

    --Sort
    DECLARE @SqlSort AS NVARCHAR(256)
    SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'ah.amh_cue_iid ASC,c.cue_ncuenta, ah.amh_rec_iid DESC')
    print '--- @SqlSort';
    print @SqlSort
    print '---';


    --RANGOS 
    DECLARE @SqlFilterRango AS VARCHAR(max) = ''
    EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
    print '--- @SqlFilterRango';
    print @SqlFilterRango
    print '---';

    SET @Where = @Where + @SqlFilterRango;

    -- Se agrega la posibilidad de consultar las tablas por mes de _Datos..p_recepcion_proceso
    declare @tablaProceso varchar(128) = 'p_recepcion_proceso'
    -- no se ven los eventos pendientes en una consulta comun de historicos.
    IF (@table = 'p_recepcion' OR @table = '')
    BEGIN
		set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) 
    END

            -- Asigno el mes en caso de venir con combo de historico del reporte.
            select @tablaProceso = @tablaProceso+RIGHT(@table,6)
            -- En caso de no existir la tabla de p_recepcion_procesoYYYYMM busco en p_recepcion_proceso
            IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaProceso)
                BEGIN
                    PRINT 'Table p_recepcion_proceso of Month NOT Exists'
                    SET @tablaProceso = 'p_recepcion_proceso';
                    print @table
                    -- En caso que no exista la tabla p_recepcion_procesoYYYMM, devuelvo 0.
                    RETURN
                END
            ELSE
                BEGIN
                    PRINT 'Table p_recepcion_proceso of Month Exists'
                    print @table
                END
        

    

	IF  @vigilador != ''          
		SET @Where = @Where + ' AND st.Id = '+@vigilador  

	IF  @fechadesde != ''           
		SET @Where = @Where + ' AND  ah.amh_fechahora >= '''+@fechadesde  +''''

	IF  @fechahasta != ''           
		SET @Where = @Where + ' AND  ah.amh_fechahora  <= '''+@fechahasta  +''''
	
    IF @cuenta != ''
        SET @Where = @Where + ' AND c.cue_iid = '+@cuenta  


	SET @Sql = '

        SELECT ah.*, c.cue_clinea, c.cue_cnombre, c.cue_ncuenta, st.Nombre, pr.rec_calarma, ca.cod_cdescripcion, pr.rec_tfechaRecepcion 
				,o.ope_cnombre
        FROM _Datos..p_asignacionMovilHistorico ah
            LEFT JOIN _Datos..m_cuentas c ON c.cue_iid = ah.amh_cue_iid
            LEFT JOIN _datos.dbo.SmartTrack st ON (
                ah.amh_amv_objectid = st.Id 
            )
            INNER  JOIN _Datos..'+@table+' pr ON (pr.rec_iid = ah.amh_rec_iid)
			left join _sistema..s_operadores o WITH (NOLOCK) on (pr.rec_ioperador = o.ope_iid) 
            LEFT JOIN _Tablas..t_codigos_alarma ca ON (pr.rec_calarma = ca.cod_ccodigo)
            --LEFT JOIN _Datos..'+@tablaProceso+' prp ON (prp.pro_recid = pr.rec_iid)
        WHERE 1=1' +@Where+ '
        ORDER BY '+@SqlSort+',[amh_fechahora]

	';

    print '--- @Sql';
    print @Sql
    print '---';
	
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	exec(@Sql);
END