--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.987 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchPorcentajeAlarmasByMinutos]
@minutos NVARCHAR(50),
@fechadesde NVARCHAR(50) = '',
@fechahasta NVARCHAR(50) = '',
@token NVARCHAR(128) = '',
@table NVARCHAR(128) = 'p_recepcion'
AS
BEGIN


DECLARE @SqlQuery NVARCHAR(MAX);
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

IF @fechadesde != '' 
BEGIN
	SET @SqlWhere = ' AND rec_tfechahora <= '''+convert(varchar,convert(date,@fechahasta,120),112)+''' 
				AND rec_tfechahora >= '''+convert(varchar,convert(date,@fechadesde,120),112)+'''
				AND rec_tFechaProceso is not null
			';
END


DECLARE @SqlFilterRango AS NVARCHAR(max)
SET @SqlFilterRango = '';
IF @token != ''
BEGIN	
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

END
 
print '---';


-- Se agrega la posibilidad de consultar las tablas por mes de _Datos..p_recepcion_proceso
declare @tablaProceso varchar(128) = 'p_recepcion_proceso'
declare @tablaTimeline varchar(128)

-- no se ven los eventos pendientes en una consulta comun de historicos.
IF (@table = 'p_recepcion' OR @table='')
    BEGIN
		print @table
        set @table = 'p_recepcion'
    END
ELSE
    BEGIN
        -- Asigno el mes en caso de venir con combo de historico del reporte.
        select @tablaProceso = @tablaProceso+RIGHT(@table,6)
        select @tablaTimeline = RIGHT(@table,6)
		-- En caso de no existir la tabla de p_recepcion_procesoYYYYMM busco en p_recepcion_proceso
		IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaProceso)
			BEGIN
				PRINT 'Table NOT Exists'
				SET @tablaProceso = 'p_recepcion_proceso';
				print @tablaProceso
			END
		ELSE
			BEGIN
				PRINT 'Table Exists'
				print @tablaProceso
				print @table
			END
    END


SET @SqlQuery = 'SELECT 
					x.rec_calarma, 
					ca.cod_cdescripcion,
					ISNULL ( (
							SELECT count(*) 
							FROM _Datos..'+@table+' pr 
							INNER JOIN _Datos..'+@tablaProceso+' prp ON (prp.pro_recid = pr.rec_iid AND prp.pro_nProceso = 11 AND prp.pro_tfechahora = (
								SELECT min(pro.pro_tfechahora) from _Datos..'+@tablaProceso+' pro where pro.pro_recid = pr.rec_iid AND pro.pro_nProceso = 11
							))
							LEFT JOIN _datos..m_cuentas c ON (c.cue_iid = pr.rec_iidcuenta)
				
							WHERE rec_calarma = x.rec_calarma 
								AND datediff(MINUTE, rec_tfechahora, prp.pro_tfechahora) <= '+@minutos+'
								AND rec_idResolucion <> '''' 
								'+@SqlWhere+'					
								'+@SqlFilterRango+'
							GROUP BY rec_calarma 
					), 0 ) as eventos_atendidos_cantidad,
					
					count(*) as eventos_cantidad_total,
					STUFF(
						(
							SELECT
							DISTINCT '', '' +c.cue_clinea+''-''+c.cue_ncuenta+'' ''+c.cue_cnombre
						FROM 
							_Datos..'+@table+' pr
						LEFT JOIN _datos..m_cuentas c ON (c.cue_iid = pr.rec_iidcuenta)
						INNER JOIN _Datos..'+@tablaProceso+' prp ON (
							prp.pro_recid = pr.rec_iid
							AND prp.pro_nProceso = 11
							AND prp.pro_tfechahora = (
								SELECT
									MIN (pro.pro_tfechahora)
								FROM
									_Datos..'+@tablaProceso+' pro
								WHERE
									pro.pro_recid = pr.rec_iid
								AND pro.pro_nProceso = 11
							)
						)
						WHERE
							rec_calarma = x.rec_calarma 
							AND datediff( MINUTE, rec_tfechahora, prp.pro_tfechahora ) > '+@minutos+'
							AND rec_idResolucion <> ''''		
							'+@SqlWhere+'	
							'+@SqlFilterRango+'				
						FOR XML PATH (''''))
						, 1, 1, '''')  as eventos_no_atendidos_cuentas,    
						max(diffMinutos) as minutos 
				FROM 
					(	SELECT datediff(MINUTE, rec_tfechahora ,pro_tfechahora) as diffMinutos
							, pr.rec_calarma
							, pr.rec_iidcuenta
							, pr.rec_iid
							--, c.*
							--, prp.*
						FROM _Datos..'+@table+' pr
						LEFT JOIN _datos..m_cuentas c ON (c.cue_iid = pr.rec_iidcuenta)
							INNER JOIN _Datos..'+@tablaProceso+' prp ON (prp.pro_recid = pr.rec_iid AND prp.pro_nProceso = 11 AND prp.pro_tfechahora = (
								SELECT min(pro.pro_tfechahora) from _Datos..'+@tablaProceso+' pro where pro.pro_recid = pr.rec_iid AND pro.pro_nProceso = 11
							))
						WHERE 1=1			
							'+@SqlWhere+'
							'+@SqlFilterRango+'
						AND rec_idResolucion <> '''' 
						AND pro_nProceso = 11
					) as x
					
				INNER JOIN _Tablas..t_codigos_alarma ca ON ca.cod_ccodigo = rec_calarma	
				INNER JOIN _Datos..'+@tablaProceso+' prp ON (prp.pro_recid = x.rec_iid AND prp.pro_nProceso = 11 AND prp.pro_tfechahora = (
						SELECT min(pro.pro_tfechahora) from _Datos..'+@tablaProceso+' pro where pro.pro_recid = x.rec_iid AND pro.pro_nProceso = 11
					))

				LEFT JOIN _datos..m_cuentas c ON (c.cue_iid = x.rec_iidcuenta)
				WHERE c.cue_clinea != ''''
					'+@SqlFilterRango+'
				GROUP BY rec_calarma , cod_cdescripcion
				ORDER BY cod_cdescripcion ASC, eventos_cantidad_total';

	
	PRINT CAST(@SqlQuery AS NTEXT)
	EXECUTE (@SqlQuery);

END