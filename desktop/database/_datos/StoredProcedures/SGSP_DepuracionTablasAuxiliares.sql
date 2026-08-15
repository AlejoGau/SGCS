CREATE OR ALTER PROCEDURE [dbo].[SGSP_DepuracionTablasAuxiliares] AS
--Depura las tablas [p_Recepcion_D] / [EventosPendientes] / [EventosTimeLine] / [p_recepcion_proceso] / [p_SMSqueue] / [p_nivelsenal] / [SmartMail_Program] / [p_push_queue]  / [Message]
--Autor :Pablo O. Canónico
--Fecha :07/12/2016
--30-08-2017 Depura las tablas [p_PosicionesGPS] / [p_posicionesSP]
--26-02-2018 Depura [p_recepcion_proceso]
--20-03-2018 Depura [Message]
--18-07-2019 Modificacion para depurados en _History
--05-03-2021 Depura [FrameworkAudit]
--05-05-2022 Depuracion [EventosTimeLine] y [p_recepcion_proceso] No depurados oportunamente 
--05-08-2024 Depuracion [p_nivelsenal] con cuentas inexistentes
--12-06-2025 Depura [FrameworkAuditExtend]p_nivelsenal
SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	60min * 25hs * 7d = 10500
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'DepuracionTablasAuxiliares', @Repetition = 10500

BEGIN TRY
	DBCC TRACEON (1224)

	Declare	@cSQL nVarChar(MAX) = '',
			@ParmDefinition nvarchar(500) = '',
   		    @message nVarChar(Max) = '',
		    @StartDateTimeText VarChar(max) = ''

	Declare @iMax Int = 0,
		    @iLoop Int = 0,
			@nError Int = 0,
			@iRealLoops Int = 0

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--2.Elimino EventosPendientes que no fueron borrados por el trigger--
	Set @cSQL = 'Delete t From [dbo].[EventosPendientes] t WHERE NOT EXISTS ( SELECT 1 FROM [dbo].[p_recepcion] r WHERE r.[rec_iid] = t.[rec_iid])'
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --2.Elimino EventosPendientes que no fueron borrados por el trigger-- | cSQL => '+ @cSQL
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Exec (@cSQL )
			
	--3.Depuracion [EventosTimeLine]--
	Delete Top (10000) From [dbo].[EventosTimeLine] Where [etl_iRecID] = 0
	Delete Top (10000) From [dbo].[EventosTimeLine] Where [etl_iRecID] Is Null

	Declare @nMeses numeric(2) = 1	--IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MESESDEPURACION' ),2)
	Declare @cHasta Char(8) = '',
			@cDesde Char(8) = '',
			@cCierre Char(6) = ''

	Declare @dFecha Datetime = Getdate()
	Declare @base  Date;
	Set @base   = DATEADD(MONTH, -@nMeses, CAST(@dFecha as date));
	Set @cCierre = CONVERT(CHAR(6), @base, 112);
	Set @cDesde  = CONVERT(CHAR(8), DATEFROMPARTS(YEAR(@base), MONTH(@base), 1), 112);
	Set @cHasta  = CONVERT(CHAR(8), DATEADD(MONTH, 1, DATEFROMPARTS(YEAR(@base), MONTH(@base), 1)), 112);

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    --3.1.Creo los Historicos Necesarios--
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --3.Depuracion [EventosTimeLine]-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | --3.1.Creo los Historicos Necesarios-- | SGSP_CreoETDepurado '+ @cCierre
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF OBJECT_ID('EventosTimeLine'+@cCierre) Is Null
		Execute @nError = SGSP_CreoETDepurado @cCierre
	
	/*
	Execute @nError = [_History].[dbo].[SGSP_CreoETDepurado] @cCierre, @cDebug='N'

	If @nError = 0	
		Execute @nError = [SGSP_CreoViewETDepurado] @cCierre, @cDebug='N'
    */

	If @nError = 0	
		Begin
			Select @iMax = Count([etl_idKey])  From [dbo].[EventosTimeLine] Where [etl_tFechaHora] >= @cDesde And  [etl_tFechaHora] < @cHasta
			If @iMax Between 1 And 999
				Set @iMax = 1000

			Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --3.1.Depuracion [EventosTimeLine]-- | @cDesde => '+ @cDesde +' | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @iLoop = 1
			WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
				BEGIN
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
					Set @cSQL = 'Delete Top (1000) From [dbo].[EventosTimeLine] OUTPUT deleted.* Into [dbo].[EventosTimeLine'+@cCierre+'] Where [etl_tFechaHora] >= '+CHAR(39)+@cDesde+CHAR(39)+' And [etl_tFechaHora] < '+CHAR(39)+@cHasta+CHAR(39)
					Set @cSQL += ' And Not EXISTS (Select 1 FROM [dbo].[EventosTimeLine'+@cCierre+'] T2 Where T2.[etl_idKey] = [EventosTimeLine].[etl_idKey] )'
					
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Execute sp_executesql @cSQL

	  				IF @@ROWCOUNT = 0 BREAK;

					Set @iLoop = @iLoop + 1
				End;
		End

	--3.2.Depuracion [EventosTimeLine] Antiguos No depurados--
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --3.2.Depuracion [EventosTimeLine] Antiguos No depurados-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @cAAAAMM Char(6) = ''
	Declare @periodo_inicio Char(8) = ''
	Declare @periodo_fin DateTime,
	        @periodo_fin_excl Char(8) = ''

	Declare cDel CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
	For	Select Distinct Left(CONVERT(CHARACTER, [etl_tFechaHora], 112),6) From [dbo].[EventosTimeLine] Where [etl_tFechaHora] < @cDesde Order By 1

    Open cDel
    Fetch Next From cDel Into @cAAAAMM
    While @@FETCH_STATUS = 0
	Begin
			Set @periodo_inicio = @cAAAAMM + '01'
			SET @periodo_fin = DATEADD(SECOND, -1, DATEADD(DAY, 1, CAST(EOMONTH(@periodo_inicio) AS DATETIME)));
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --3.2.Depuracion [EventosTimeLine] Antiguos No depurados-- | @cAAAAMM : '+@cAAAAMM + ' | @periodo_inicio  : ' + @periodo_inicio + ' | @periodo_fin  : '+@periodo_fin_excl
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
			
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --3.2.Creo los Historicos Necesarios-- | SGSP_CreoETDepurado '+ @cAAAAMM
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @nError=0
			IF OBJECT_ID('EventosTimeLine'+@cAAAAMM) Is Null
				Execute @nError = SGSP_CreoETDepurado @cAAAAMM			
			
			IF @nError = 0	
			Begin
				Set @cSQL = 'Delete From [dbo].[EventosTimeLine] Where [etl_idKey] In ( Select [etl_idKey] From [dbo].[EventosTimeLine'+@cAAAAMM+'] ) '
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | --3.2.0.Elimino EventosTimeLine que ya estan depurados-- | cSQL => '+ @cSQL
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Exec (@cSQL )

				Select @iMax = Count([etl_idKey])  From [dbo].[EventosTimeLine] Where [etl_tFechaHora] < @periodo_fin_excl
				If @iMax Between 1 And 999
					Set @iMax = 1000
				
				Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | --3.2.1.Depuracion [EventosTimeLine] Antiguos No depurados-- | @cDesde => '+ @periodo_inicio +' | @cHasta => '+@periodo_fin_excl+' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				Set @iLoop = 1
				WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
					BEGIN
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
						Set @cSQL = 'Delete Top (1000) From [dbo].[EventosTimeLine] OUTPUT deleted.* Into [dbo].[EventosTimeLine'+@cAAAAMM+'] Where [etl_tFechaHora] >= '+CHAR(39)+@periodo_inicio+CHAR(39)+' And [etl_tFechaHora] <= '+CHAR(39)+@periodo_fin_excl+CHAR(39)
						Set @cSQL += ' And Not EXISTS (Select 1 FROM [dbo].[EventosTimeLine'+@cAAAAMM+'] T2 Where T2.[etl_idKey] = [EventosTimeLine].[etl_idKey] )'
						
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Execute sp_executesql @cSQL

						IF @@ROWCOUNT = 0 BREAK;

						Set @iLoop = @iLoop + 1
					End;
			End
		
        Fetch Next From cDel Into @cAAAAMM
    End

    Close cDel
    Deallocate cDel

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--4.Depuracion [p_recepcion_proceso]--
    --4.1.Creo los Historicos Necesarios--
	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --4.Depuracion [p_recepcion_proceso]-- | @cDesde => '+ @cDesde +' | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | --4.1.Creo los Historicos Necesarios-- | SGSP_CreoPRPDepurado '+ @cCierre
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF OBJECT_ID('p_recepcion_proceso'+@cCierre) Is Null
		Execute @nError = SGSP_CreoPRPDepurado @cCierre
	
	/*
	Execute @nError = [_History].[dbo].[SGSP_CreoPRPDepurado] @cCierre, @cDebug='N'
	
	If @nError = 0	
		Execute @nError = [SGSP_CreoViewPRPDepurado] @cCierre, @cDebug='N'
	*/

    If @nError = 0	
		Begin
			Select @iMax = Count([pro_iid])  From [dbo].[p_recepcion_proceso] Where [pro_tfechahora] >= @cDesde And  [pro_tfechahora] < @cHasta
			If @iMax Between 1 And 999
				Set @iMax = 1000

			Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --4.1.Depuracion [p_recepcion_proceso]-- | @cDesde => '+ @cDesde +' | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Set @iLoop = 1
			WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
				BEGIN
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			        Set @cSQL = 'Delete Top (1000) SRC OUTPUT deleted.* Into [dbo].[p_recepcion_proceso'+@cCierre+'] From [dbo].[p_recepcion_proceso] As SRC Where SRC.[pro_tfechahora] >= '''+@cDesde+''' AND SRC.[pro_tfechahora] <  '''+@cHasta+'''' 
					Set @cSQL += ' AND NOT EXISTS ( SELECT 1 FROM [dbo].[p_recepcion_proceso'+@cCierre+'] H WHERE H.[pro_iid] = SRC.[pro_iid] )'
					
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Execute sp_executesql @cSQL

	  				IF @@ROWCOUNT = 0 BREAK;

					Set @iLoop = @iLoop + 1
				End;
		End

	--4.2.Depuracion [p_recepcion_proceso] Antiguos No depurados--
	Declare cDel CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
	For	Select Distinct Left(CONVERT(CHARACTER, [pro_tfechahora], 112),6) From [dbo].[p_recepcion_proceso] Where [pro_tfechahora] < @cDesde Order By 1

    Open cDel
    Fetch Next From cDel Into @cAAAAMM
    While @@FETCH_STATUS = 0
	Begin
			Set @periodo_inicio = @cAAAAMM + '01'
			Set @periodo_fin = EOMONTH(CONVERT(date,@periodo_inicio,112));
			Set @periodo_fin_excl = CONVERT(CHAR(8), DATEADD(DAY,1,@periodo_fin),112);
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --4.2.Depuracion [p_recepcion_proceso]-- | @cAAAAMM : '+@cAAAAMM + ' | @periodo_inicio  : ' + @periodo_inicio + ' | @periodo_fin  : '+@periodo_fin_excl
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
			
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --4.2.Creo los Historicos Necesarios-- | SGSP_CreoPRPDepurado '+ @cAAAAMM
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @nError=0
			IF OBJECT_ID('p_recepcion_proceso'+@cAAAAMM) Is Null
				Execute @nError = SGSP_CreoPRPDepurado @cAAAAMM
			
			IF @nError = 0	
			Begin
				Set @cSQL = 'Delete From [dbo].[p_recepcion_proceso] Where [pro_recid] In ( Select [pro_recid] From [dbo].[p_recepcion_proceso'+@cAAAAMM+'] ) '
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | --4.2.0.Elimino p_recepcion_proceso que ya estan depurados-- | cSQL => '+ @cSQL
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Exec (@cSQL )

				Select @iMax = Count([pro_iid])  From [dbo].[p_recepcion_proceso] Where [pro_tfechahora] < @periodo_fin_excl
				If @iMax Between 1 And 999
					Set @iMax = 1000
				
				Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | --4.2.1.Depuracion [p_recepcion_proceso]-- | @cDesde => '+ @periodo_inicio +' | @cHasta => '+ @periodo_fin_excl +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				Set @iLoop = 1
				WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
					BEGIN
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
						Set @cSQL = 'Delete Top (1000) SRC OUTPUT deleted.* Into [dbo].[p_recepcion_proceso'+@cAAAAMM+'] From [dbo].[p_recepcion_proceso] AS SRC Where SRC.[pro_tfechahora] >= '''+@periodo_inicio+''' AND SRC.[pro_tfechahora] <  '''+@periodo_fin_excl+''''
						Set @cSQL += ' AND NOT EXISTS ( SELECT 1 FROM [dbo].[p_recepcion_proceso'+@cAAAAMM+'] H WHERE H.[pro_iid] = SRC.[pro_iid] )';

						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Execute sp_executesql @cSQL

						IF @@ROWCOUNT = 0 BREAK;

						Set @iLoop = @iLoop + 1
					End;
			End
		
        Fetch Next From cDel Into @cAAAAMM
    End

    Close cDel
    Deallocate cDel

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--5.Depuracion [p_SMSqueue]--
	Select @iMax = Count([que_iid])  FROM [dbo].[p_SMSqueue] Where [que_tfechahora] <  @cHasta
	If @iMax Between 1 And 999
		Set @iMax = 1000

	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --5.Depuracion [p_SMSqueue]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cSQL = 'DELETE TOP (1000) FROM [dbo].[p_SMSqueue] WHERE [que_tfechahora] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL
	  
			IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		End;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--6.Depuracion [p_nivelsenal]--
	--6.Elimino p_nivelsenal con cuentas que ya no existan
	Set @cSQL = 'Delete Top (25000) s From [dbo].[p_nivelsenal] s Where Not EXISTS (Select 1 From [dbo].[m_cuentas] c Where c.[cue_iid] = s.[nvs_idcuenta]) '

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --6.Elimino [p_nivelsenal] con cuentas que ya no existan-- | cSQL => '+ @cSQL
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Execute sp_executesql @cSQL

	Select @iMax = Count([nvs_iid])  FROM [dbo].[p_nivelsenal] Where [nvs_tfechahora] <  @cHasta  
	If @iMax Between 1 And 9999
		Set @iMax = 10000

	Set @iRealLoops = CEILING(1.0 * @iMax / 10000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --6.1.Depuracion [p_nivelsenal]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cSQL = 'DELETE TOP (10000) FROM [dbo].[p_nivelsenal] WHERE [nvs_tfechahora] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL
	  
			IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		END;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--7.Depuracion [SmartMail]--
	Select @iMax = Count([id]) FROM [dbo].[SmartMail_Program] Where [DateStart] <  @cHasta
	If @iMax Between 1 And 9999
		Set @iMax = 10000

	Set @iRealLoops = CEILING(1.0 * @iMax / 10000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --7.Depuracion [SmartMail]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cSQL = 'DELETE TOP (10000) FROM [dbo].[SmartMail_Program] Where [DateStart] < '+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL
	  
			IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		END;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--8.Depuracion [p_push_queue]--
	Select @iMax = Count([Id])  FROM [dbo].[p_push_queue] Where [ppq_fechacreacion] < @cHasta And [ppq_estado] > 0
	If @iMax Between 1 And 999
		Set @iMax = 1000

	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --8.Depuracion [p_push_queue]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cSQL = 'DELETE TOP (1000) FROM [dbo].[p_push_queue] WHERE [ppq_estado] > 0 And [ppq_fechacreacion] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL
	  
			IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		End;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--9.Depuracion [Message]--
	Select @iMax = Count([Id])  FROM [dbo].[Message] Where [DateCreated] <  @cHasta
	If @iMax Between 1 And 999
		Set @iMax = 1000

	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --9.Depuracion [Message]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 500
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 500 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cSQL = 'DELETE TOP (1000) FROM [dbo].[Message] WHERE [DateCreated] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL
	  
			IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		End;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    --Desde aca cambia el valor de @cHasta
	--10.Depuracion [dbo].[p_PosicionesGPS]--
	Set @nMeses  = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MESESDEPPOSICIONES' ),6)
	Set @cCierre = CONVERT(CHAR(6), DateAdd(Month,-@nMeses,@dFecha), 112)
	Set @cHasta = @cCierre+'01'

	Select @iMax = Count([gps_iid])  From [dbo].[p_PosicionesGPS] Where [gps_tfechahora] < @cHasta
	If @iMax Between 1 And 999
		Set @iMax = 1000

	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --10.Depuracion [dbo].[p_PosicionesGPS]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 250
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 250 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Set @cSQL = 'Delete Top (1000) From [dbo].[p_PosicionesGPS] Where [gps_tfechahora] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL

	  		IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		End;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--11.Depuracion [dbo].[p_PosicionesSP]--
	Select @iMax = Count([sp_iid])  From [dbo].[p_PosicionesSP] Where [sp_tfechahora] < @cHasta
	If @iMax Between 1 And 999
		Set @iMax = 1000

	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --11.Depuracion [dbo].[p_PosicionesSP]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 250
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 250 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Set @cSQL = 'Delete Top (1000) From [dbo].[p_PosicionesSP] Where [sp_tfechahora] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Execute sp_executesql @cSQL

	  		IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		End;

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --------------------------------------------------------------- | '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    --Desde aca vuelve a cambiar el valor de @cHasta
	--12.Depuracion [dbo].[FrameworkAudit]--
	Set @nMeses  = 12
	Set @cCierre = CONVERT(CHAR(6), DateAdd(Month,-@nMeses,@dFecha), 112)
	Set @cHasta = @cCierre+'01'

	Select @iMax = Count(*)  From [_Audit].[dbo].[FrameworkAudit]
		Where [AuditDate] < @cHasta
	
	If @iMax Between 1 And 999
		Set @iMax = 1000

	Set @iRealLoops = CEILING(1.0 * @iMax / 1000.0);
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --12.Depuracion [dbo].[FrameworkAudit]-- | @cHasta => '+ @cHasta +' | Total de Registros => '+ Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iRealLoops As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @iLoop = 1
	WHILE @iLoop <= @iRealLoops And @iRealLoops > 0 And @iLoop <= 250
		BEGIN
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Maximo 250 | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iRealLoops As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			-- Eliminar en FrameworkAuditExtend primero
			SET @cSQL = 'DELETE TOP (1000) FROM [_Audit].[dbo].[FrameworkAuditExtend]
				WHERE Id IN ( SELECT TOP (1000) Id FROM [_Audit].[dbo].[FrameworkAudit]
					WHERE AuditDate < ' + CHAR(39) + @cHasta + CHAR(39) + ' )'
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			EXEC (@cSQL);

			Set @cSQL = 'Delete Top (1000) From [_Audit].[dbo].[FrameworkAudit] Where [AuditDate] <'+CHAR(39)+@cHasta+CHAR(39)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Exec (@cSQL )

	  		IF @@ROWCOUNT = 0 BREAK;

			Set @iLoop = @iLoop + 1
		End;

END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH