--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.580 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[EventoTimeLineFullSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '', 
 @completo NVARCHAR(10) = '', 
 @token NVARCHAR(128) = '',           
 @IdEvento int = '',
 @IdsEventos varchar(max) = '',

 -- Nuevo agregado para historico
 @table NVARCHAR(128) = ''
AS
BEGIN
	-- Se agrega la posibilidad de consultar las tablas por mes de _Datos..EventoTimeLine
    declare @tablaHistorica varchar(128) = 'EventosTimeLine'
    -- No se ven los TimeLine en una consulta comun de historicos.
    IF (@table = '')
        BEGIN
            set @table = 'EventosTimeLine'
        END
    ELSE
        BEGIN
            -- Asigno el mes en caso de venir con combo de historico del reporte.
            select @tablaHistorica = @tablaHistorica+RIGHT(@table,6)
            -- En caso de no existir la tabla de p_recepcion_procesoYYYYMM busco en p_recepcion_proceso
            IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaHistorica)
                BEGIN
                    PRINT 'Table TimeLine of Month NOT Exists'
					SET @table = 'EventosTimeLine'
					print @table
                END
            ELSE
                BEGIN
                    PRINT 'Table TimeLine of Month Exists'
					SET @table = @tablaHistorica
                    print @table
                END
        END

	print '--- TABLA'
	print @table
	print '---'
	
	DECLARE @Sql VARCHAR(MAX);
	IF @IdEvento != '' 
		BEGIN
		/*
			SELECT * 
			FROM _Datos..EventosTimeLine etl
				left JOIN _Sistema..s_operadores ope ON ope.ope_iid = etl.etl_iOperador
			WHERE etl_iRecID = @IdEvento 
			-- saco el inicio porque lo calculo a mano. resolver localizaciones
			--and etl_caccion !='Inicio'
			ORDER BY etl_tFechaHora ASC
		*/
		
		SET @Sql = ' SELECT [etl_idKey]
      ,[etl_iRecID]
      ,[etl_iCuenta]
      ,[etl_tFechaHora]
      ,[etl_cAccion]
      ,[etl_cObservacion]
      ,[etl_cOwner]
      ,[etl_iOperador]
      ,[etl_iAccionCode]
	  ,[ope_iid]
      ,[ope_clogin]
      ,[ope_cnombre]
      ,[ope_cclave]
      ,[ope_nsql]
      ,[ope_nsupervisor]
      ,[ope_iperfil]
      ,[ope_clinea]
      ,[ope_nprioridad]
      ,[ope_dCambio]
      ,[ope_nSereno]
      ,[ope_idKey]
	  ,convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (etl_tFechaHora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tfechahoraOffset
				FROM [_Datos]..'+ @table+' etl
				left JOIN _Sistema..s_operadores ope ON ope.ope_iid = etl.etl_iOperador
				INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = etl_iCuenta  
				left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
				WHERE etl_iRecID = '+CONVERT(VARCHAR(20),@IdEvento)+'
				ORDER BY etl_tFechaHora ASC
			'
			
	END
	ELSE IF @IdsEventos != ''
	BEGIN
			
		SET @Sql = '
		SELECT [etl_idKey]
      ,[etl_iRecID]
      ,[etl_iCuenta]
      ,[etl_tFechaHora]
      ,[etl_cAccion]
      ,[etl_cObservacion]
      ,[etl_cOwner]
      ,[etl_iOperador]
      ,[etl_iAccionCode]
	  ,[ope_iid]
      ,[ope_clogin]
      ,[ope_cnombre]
      ,[ope_cclave]
      ,[ope_nsql]
      ,[ope_nsupervisor]
      ,[ope_iperfil]
      ,[ope_clinea]
      ,[ope_nprioridad]
      ,[ope_dCambio]
      ,[ope_nSereno]
      ,[ope_idKey]
	  ,convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (etl_tFechaHora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tfechahoraOffset
			FROM _Datos..EventosTimeLine etl
			left JOIN _Sistema..s_operadores ope ON ope.ope_iid = etl.etl_iOperador
			INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = etl_iCuenta  
			left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
			WHERE etl_iRecID IN 
			('+@IdsEventos+')
			
			ORDER BY etl_iRecID ASC, etl_tFechaHora ASC
			'
	END

	/*
	Print '-----'
	Print @Sql
	*/
	If Rtrim(@Sql) != ''
		EXEC (@Sql)

END
--, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (r.rec_tfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tfechahoraOffset