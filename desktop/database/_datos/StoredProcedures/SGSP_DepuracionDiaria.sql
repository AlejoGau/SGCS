CREATE OR ALTER PROCEDURE [dbo].[SGSP_DepuracionDiaria] @cCierreDesde VarChar(17), @cCierreHasta VarChar(17), @Tabla Varchar(17), @Timeout Int=180, @Top Int=10000, @IsDebug Bit = 0
As
Begin
	SET NOCOUNT ON

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare @cTop Varchar(10) = Rtrim(Cast(@Top  As Varchar(10)))
	Declare @FechaHastaMS Varchar(23)
	Set @FechaHastaMS = Case When RIGHT(@cCierreHasta, 8) = '23:59:59' Then @cCierreHasta + '.999' Else @cCierreHasta End

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | @cCierreDesde : '+ @cCierreDesde +' | @cCierreHasta : '+ @FechaHastaMS + ' | @Tabla : '+@Tabla + ' | @Timeout : ' + Rtrim(Cast(@Timeout  As Varchar(10))) + ' | @Top : ' + @cTop + ' | @IsDebug : ' + Cast(@IsDebug As Char(1))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- Setear Flag que deshabilita escalación de lockeos 
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | DBCC TRACEON (1224)'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DBCC TRACEON (1224) WITH NO_INFOMSGS

	-- Verificar LOCK_ESCALATION 
	IF EXISTS (SELECT 1 FROM sys.tables WHERE name = 'p_recepcion' AND lock_escalation_desc != 'DISABLE')
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | SET (LOCK_ESCALATION = DISABLE) '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		ALTER TABLE [dbo].[p_recepcion] SET (LOCK_ESCALATION = DISABLE);
	End

	Declare @cSQL nVarchar(Max)
	Declare @cSQL2 nVarchar(Max)
	Declare @rc1 Int = 0,
			@rc2 Int = 0
	Declare @iLoop Int = 0,
			@iCantidadEliminados Int = 0

	Declare @esSynonym bit = Case When OBJECT_ID(@Tabla, 'SN') Is Not NULL THEN 1 ELSE 0 END

	DECLARE @cOutput nVarchar(MAX) = N'
		DELETED.rec_iid,
		DELETED.rec_iidcuenta,
		DELETED.rec_calarma,
		DELETED.rec_czona,
		DELETED.rec_iusuario,
		DELETED.rec_tfechahora,
		DELETED.rec_nestado,
		DELETED.rec_cContenido,
		DELETED.rec_tFechaProceso,
		DELETED.rec_ioperador,';

	IF @esSynonym = 0
		SET @cOutput += N'
		DELETED.rec_cObservaciones,'

	SET @cOutput += N'
	DELETED.rec_cTerminal,'

	SET @cOutput += N'
		DELETED.rec_idResolucion,
		DELETED.rec_idReceptor,
		DELETED.rec_cCategorizacion,
		DELETED.rec_iNYR,
		DELETED.rec_iTE,
		DELETED.rec_tFechaRecepcion,
		DELETED.rec_nOrigen,
		DELETED.rec_idMap,
		DELETED.rec_idFwd,
		DELETED.rec_iMinutosEspera,
		DELETED.rec_iPuerto,
		DELETED.rec_idLoc,
		DELETED.rec_iPrioridad,
		DELETED.rec_iusuario As usuario_iCodigo,
		'''' As usuario_cNombre,
		DELETED.rec_cZona As zonas_cCodigo,              
		'''' As zonas_cDescripcion,
		CONCAT(
			CASE DELETED.rec_nOrigen
				WHEN 1 THEN ''%TI : Evento de Control%''
				WHEN 2 THEN 
					CASE WHEN DELETED.rec_iPuerto < 100 
						 THEN ''%PG :%'' 
						 ELSE ''%IR :%'' 
					END
				WHEN 3 THEN ''%MAN : Evento Generado Manualmente%''
				WHEN 6 THEN 
					CASE WHEN DELETED.rec_iPuerto < 0 
						 THEN ''%TR : Terminal Remota%'' 
						 ELSE ''%SMS :% '' 
					END
				WHEN 7 THEN ''%SCH : Evento Programado%''
				WHEN 8 THEN ''%JOB : Tarea Programada%''
				ELSE ''%SG : Evento Interno%''
			END,
			'' '',
			CASE WHEN DELETED.rec_iPuerto <= 0 
				 THEN '''' 
				 ELSE LTRIM(STR(DELETED.rec_iPuerto, 5))
			END
		) AS _Origen,
		CASE WHEN DELETED.rec_cAlarma = ''_DI'' 
			 THEN DELETED.rec_cContenido 
			 ELSE CAST(DELETED.rec_iPuerto AS VARCHAR(6))
		END AS _Puerto';

	IF @esSynonym = 1
		SET @cOutput += N',
		DELETED.rec_cObservaciones';

	Set @cSQL = N'DELETE TOP (' + @cTop + N') src
	OUTPUT ' + @cOutput + N'
	INTO ' + RTRIM(@Tabla) + N'
	FROM [_Datos].[dbo].[p_recepcion] AS src
	WHERE src.rec_nestado >= 2
	  AND src.rec_tfechahora >= ''' + @cCierreDesde + N'''
	  AND src.rec_tfechahora <= ''' + @FechaHastaMS + N''''

	Set @cSQL += CHAR(10) + N' AND NOT EXISTS ( SELECT 1 FROM ' + RTRIM(@Tabla) + N' des WHERE des.rec_iid = src.rec_iid  )';
	
	Set @cSQL2 = N'DELETE TOP (' + @cTop + N') src
	FROM [_Datos].[dbo].[p_recepcion] AS src
	WHERE src.rec_nestado >= 2
	  AND src.rec_tfechahora >= ''' + @cCierreDesde + N'''
	  AND src.rec_tfechahora <= ''' + @FechaHastaMS + N''''

	Set @cSQL2 += CHAR(10) + N' AND EXISTS ( SELECT 1 FROM ' + RTRIM(@Tabla) + N' des WHERE des.rec_iid = src.rec_iid )';

	Declare @inicio Datetime = Getdate()
	Declare @ElapsedMinutes Int = 0
	While 1=1 
	Begin
		Set @iLoop +=  1

		IF @IsDebug = 0
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | NOT EXISTS | Loop : '+ Cast(@iLoop As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL
			Set @rc1 = @@ROWCOUNT;
		End
		Else
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | cSQL : '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
			DECLARE @pos INT = 1;
			DECLARE @chunk NVARCHAR(2013);
	
			WHILE @pos <= LEN(@cSQL)
			Begin
				SET @chunk = SUBSTRING(@cSQL, @pos, 2013);
				RAISERROR('%s', 0, 1, @chunk) WITH NOWAIT;
				SET @pos += 2013;
			End
		End

		-- Ejecutar segundo DELETE (EXISTS)
		IF @IsDebug = 0
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | EXISTS | Loop : '+ Cast(@iLoop As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL2
			Set @rc2 = @@ROWCOUNT;
		End 
		Else
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | cSQL2 : '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
			DECLARE @pos2 INT = 1;
			DECLARE @chunk2 NVARCHAR(2013);
	
			WHILE @pos2 <= LEN(@cSQL2)
			Begin
				SET @chunk2 = SUBSTRING(@cSQL2, @pos2, 2013);
				RAISERROR('%s', 0, 1, @chunk2) WITH NOWAIT;
				SET @pos2 += 2013;
			End
		End

		Set @iCantidadEliminados = ISNULL(@rc1,0) + ISNULL(@rc2,0);

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | Cantidad Eliminados : '+ Cast(@iCantidadEliminados As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		If @iCantidadEliminados = 0
			Break

		SET @ElapsedMinutes = Datediff(Minute,@inicio,Getdate())
		If @ElapsedMinutes >= @Timeout
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [SGSP_DepuracionDiaria] | TIMEOUT: la depuracion tardo ' + Rtrim(CAST(@ElapsedMinutes AS NVARCHAR(10))) + 
                           ' minutos (límite: ' + Rtrim(CAST(@Timeout AS NVARCHAR(10))) + '). Deteniendo proceso.'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Break
		End
	End
End