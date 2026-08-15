CREATE OR ALTER PROCEDURE [dbo].[SGSP_DepuraRegistrosEliminados] AS
SET NOCOUNT ON;
Declare @iDepuro Int

Set @iDepuro = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEPURACIONREGISTROSELIMINADOS' )
If @iDepuro Is Null
	Set @iDepuro = 0

If @iDepuro = 0
	Begin
		-- Aviso que la tarea no cumple las condiciones para funcionar
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'DepuraRegistrosEliminados', @Repetition = 30, @Date = null, @Status = 0	
		Set NoExec On
	End	

Declare	@CountTop Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='LIMITEREGDRE' )
If @CountTop Is Null
	Set @CountTop = 50000000

-- Aviso que la tarea esta funcionando	
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'DepuraRegistrosEliminados', @Repetition = 30
--	
DBCC TRACEON (1224)

Declare @NumberOfLoops int = 0,
	    @CurrentLoop int = 0,
	    @DeleteSize int = 1000,
		@Deleted_Rows int = 0,
		@iCta int = 0,
		@iCount int = 0,
		@iID int = 0,
		@idKey int = 0,
		@IntVariable int = 0,
		@iMax Int = 0,
	    @iTop Int = 50,
	    @iLoop Int = 0,
	    @iRecno Int = 0,
		@DeleteTop int = 10000

Declare @cTabla VarChar(100) = '',
		@message nVarChar(Max) = '',
		@StartDateTimeText nVarChar(max)=''

Declare @cSQL nVarChar(MAX) = '',
		@ParmDefinition nvarchar(500) = ''

Declare @cDepuro Char(2) = 'SI'

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Limite de registros (LIMITEREGDRE) => '+ Cast(@CountTop As varchar(10))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

--Elimino referencias a tablas depuradas inexistentes solamente si se ejecuta de 00:00 a 00:30
BEGIN TRY
--Delete [_RegistrosAEliminar]
-- Where [rae_cTabla] Not IN ( Select table_name From information_schema.columns)
If ( DATEPART(HOUR, CURRENT_TIMESTAMP) = 0 And DATEPART(MINUTE, CURRENT_TIMESTAMP) <= 30 )
Begin
	Set @iLoop = 0
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --Calculo registros con referencia a tablas depuradas inexistentes--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla] Like 'p_recepcion20%'
		And [rae_cTabla] Not In ( Select c_periodo From _Sistema.dbo.s_tablahistoricos)

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | --Elimino referencias a tablas depuradas inexistentes => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Delete Top(@DeleteTop) From [_RegistrosAEliminar]
		Where [rae_cTabla] Like 'p_recepcion20%'
			And [rae_cTabla] Not In ( Select c_periodo From _Sistema.dbo.s_tablahistoricos)
		--Where [rae_cTabla] Like 'p_recepcion%'
		--	And [rae_cTabla] Not In ('p_recepcion','p_recepcion_notas','p_recepcion_proceso','p_recepcion_D')
		--	And [rae_cTabla] Not In ( Select table_name From information_schema.columns 
		--							Where table_name Like 'p_recepcion%' And table_name Not In ('p_recepcion','p_recepcion_notas','p_recepcion_proceso','p_recepcion_D')
		--							 Group By table_name)
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Busco si hay registros en pRecepcion con Ctas Inexistentes
BEGIN TRY
Declare TmpCursor CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY For
	Select rec_iidcuenta From [dbo].[p_recepcion] With (NOLOCK)
		Where rec_iidcuenta Not IN( Select cue_iid from m_cuentas With (NOLOCK) )
		Group By rec_iidcuenta

Open TmpCursor
	FETCH NEXT FROM TmpCursor INTO @iCta
	WHILE @@FETCH_STATUS = 0
	Begin

		Set @iRecNo = @iRecNo + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | RecNro => '+ Cast(@iRecNo As varchar(10)) +' | idCta '+Cast(@iCta As VarChar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Delete TOP(@iTop) From [dbo].[p_recepcion]
			Where rec_iidcuenta = @iCta

        FETCH NEXT FROM  TmpCursor INTO @iCta
    End

Close TmpCursor
DEALLOCATE TmpCursor
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

--Calculo registros sin referencia en TimeLine--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en TimeLine--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('EventosTimeLine') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en TimeLine => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='EventosTimeLine'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select etl_iRecID From EventosTimeLine With (NOLOCK))

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en TimeLine => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			cteETL (etl_iRecID)
			AS
			(
				Select etl_iRecID From EventosTimeLine With (NOLOCK) Group By etl_iRecID 
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='EventosTimeLine'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select etl_iRecID From cteETL Where etl_iRecID>0  )
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en EventosPendientes--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en EventosPendientes--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('EventosPendientes') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en EventosPendientes => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='EventosPendientes'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select rec_iid From EventosPendientes With (NOLOCK))

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en EventosPendientes => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			cteEVP (rec_iid)
			AS
			(
				Select rec_iid From EventosPendientes With (NOLOCK) Group By rec_iid
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='EventosPendientes'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select rec_iid From cteEVP Where rec_iid>0 )
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en p_Recepcion_D--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en p_Recepcion_D--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_Recepcion_D'

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en p_Recepcion_D => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_Recepcion_D'

		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en p_recepcion_notas--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en p_recepcion_notas--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('p_recepcion_notas') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en p_recepcion_notas => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_recepcion_notas'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [rec_iidrecepcion] From [dbo].[p_recepcion_notas] With (NOLOCK) )

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en p_recepcion_notas => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			ctePRD (rec_iidrecepcion)
			AS
			(
				Select [rec_iidrecepcion] From [dbo].[p_recepcion_notas] With (NOLOCK) Group By [rec_iidrecepcion]
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_recepcion_notas'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [rec_iidrecepcion] From ctePRD Where [rec_iidrecepcion]>0)
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en p_recepcion_proceso--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en p_recepcion_proceso--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('p_recepcion_proceso') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en p_recepcion_proceso => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_recepcion_proceso'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [pro_recid] From [dbo].[p_recepcion_proceso] With (NOLOCK))

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en p_recepcion_proceso => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			ctePRD (pro_recid)
			AS
			(
				Select [pro_recid] From [dbo].[p_recepcion_proceso] With (NOLOCK) Group By [pro_recid]
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_recepcion_proceso'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [pro_recid] From ctePRD Where [pro_recid]>0)
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en p_RXLog--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en p_RXLog--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('p_RXLog') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en p_RXLog => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_RXLog'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [rxl_iRecId] From [dbo].[p_RXLog] With (NOLOCK))

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en p_RXLog => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			ctePRD (rxl_iRecId)
			AS
			(
				Select [rxl_iRecId] From [dbo].[p_RXLog] With (NOLOCK) Group By [rxl_iRecId]
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_RXLog'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [rxl_iRecId] From ctePRD Where [rxl_iRecId]>0 )
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en p_RXtraInfo--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en p_RXtraInfo--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('p_RXtraInfo') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en p_RXtraInfo => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_RXtraInfo'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [rxt_iRecId] From [dbo].[p_RXtraInfo] With (NOLOCK) )

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en p_RXtraInfo => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			ctePRD (rxt_iRecId)
			AS
			(
				Select [rxt_iRecId] From [dbo].[p_RXtraInfo] With (NOLOCK) Group By [rxt_iRecId]
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_RXtraInfo'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select rxt_iRecId From ctePRD Where [rxt_iRecId]>0 )
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

--Calculo registros sin referencia en p_RXImg--
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo registros sin referencia en p_RXImg--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Select @iMax = rows From sysindexes	Where id = OBJECT_ID('p_RXImg') AND indid < 2
If @iMax > @CountTop 
Begin
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros en p_RXImg => '+ Cast(@iMax As varchar(10))+' | No se depura por lotes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
Else
Begin
	Set @iMax = 0
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_RXImg'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select [rxi_iRecId] From [dbo].[p_RXImg] With (NOLOCK) )

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Total de Registros sin referencia en p_RXImg => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	 	
		;WITH 
			ctePRD (rxi_iRecId)
			AS
			(
				Select [rxi_iRecId] From [dbo].[p_RXImg] With (NOLOCK) Group By [rxi_iRecId]
			)
		Delete Top(@DeleteTop) From [_RegistrosAEliminar] 
		Where [rae_cTabla]='p_RXImg'
		And [rae_iID] > 0
		And [rae_iID] Not In ( Select rxi_iRecId From ctePRD  Where [rxi_iRecId]>0 )
			
		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop	--=@iMax
			BREAK;
	End
End
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

----------------------------------------------
--Calculo cantidad total de registros en tabla
BEGIN TRY
Set @iLoop = 0
Set @iMax = 0
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Calculo cantidad total de registros en tabla-- '
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
--Select @iMax = Count(*) From [_RegistrosAEliminar] 
--	Where [rae_iID] > 0
Select @iMax = rows From sysindexes
	Where id = OBJECT_ID('_RegistrosAEliminar') AND indid < 2

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Total de Registros => '+ Cast(@iMax As varchar(10))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

If @iMax > @iTop 
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Loops Necesarios Reales => '+ Cast(@iMax / @iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @iMax / @iTop > @iTop
			Set @iMax = @iTop
		Else
			Set @iMax = @iMax / @iTop

	End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Loops a Realizar => '+ Cast(@iMax As varchar(10))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

WHILE @iLoop <= @iMax And @iMax > 0
BEGIN
	Set @iRecNo = 0
	Set @iLoop = @iLoop + 1
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iMax As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	--Set @message = 'Start DateTime : %s | EXECDRE => Si'
	--RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	------Lo pongo en Si x si no termino y se vuelve a ejecutar con el job
	--Update _Tablas.dbo.t_parametros Set par_iValor = @iLoop, par_cValor = 'Si' Where par_cCodigo='EXECDRE'
	
	--Proceso los registros a eliminar
	DECLARE cEliminar CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY For
		Select Top (@iMax) [rae_cTabla],[rae_iID],[rae_idKey] From [_RegistrosAEliminar] With (NOLOCK) Where [rae_iID] > 0 And [rae_cTabla]!='p_Recepcion_D'
		Order By [rae_idKey]

	OPEN cEliminar
	FETCH NEXT FROM cEliminar INTO @cTabla,@iID,@idKey
		WHILE @@FETCH_STATUS = 0
			Begin
		
				Set @iRecNo = @iRecNo + 1
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | RecNro => '+  Cast(@iLoop As varchar(10)) +' | ' + Cast(@iRecNo As varchar(10)) +' / '+ Cast(@iMax As varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
				Set @message = Replicate('=!=',33)
				RAISERROR( @message, 10,1) WITH NOWAIT

				If @cDepuro  = 'NO'
					Begin
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | @cTabla => '+@cTabla+' | @iID => '+ Cast(@iID As varchar(10))+' | @idKey => '+ Cast(@idKey As varchar(10))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End
				Else
					Begin
						If Ltrim(Rtrim(@cTabla)) = 'EventosPendientes'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE rec_iid = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'EventosTimeLine'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE etl_iRecID = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'p_recepcion_proceso'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE pro_recid = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'p_recepcion_notas'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE rec_iidrecepcion = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'p_RXLog'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE rxl_iRecId = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'p_RXtraInfo'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE rxt_iRecId = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'p_RXImg'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE rxi_iRecId = @iID'
						Else If Ltrim(Rtrim(@cTabla)) = 'scheduler'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE idcuenta = @iID'
						Else If Left(@cTabla,15) = 'p_PosicionesGPS'
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE gps_idCuenta = @iID'
						Else				   
							Set @cSQL = N'Select @iCountOUT = COUNT(*) From ' + @cTabla + ' WHERE rec_iidcuenta = @iID'

						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | cSQL => '+@cSQL+' | @iID => '+ Cast(@iID As varchar(10))
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
						SET @ParmDefinition = N'@iID int, @iCountOUT int OUTPUT';
						SET @IntVariable = @iID;
						EXECUTE sp_executesql @cSQL	,@ParmDefinition ,@iID = @IntVariable ,@iCountOUT = @iCount OUTPUT;
				
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | @iCount :  => '+ Cast(@iCount As varchar(10))

						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
						if @iCount > 0
							Begin
								Set @CurrentLoop = 1

								Set @NumberOfLoops = ceiling( @iCount / @DeleteSize ) + 1	--Le sumo 1 x si da cero el resultado
					
								Set @Deleted_Rows = 1
			
								WHILE ( @CurrentLoop <= @NumberOfLoops And @Deleted_Rows > 0)
								  BEGIN

									Set @message = Replicate('=',99)
									RAISERROR( @message, 10,1) WITH NOWAIT
 									Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | '+Cast(@CurrentLoop As varchar(10)) +' / '+ Cast(@NumberOfLoops As varchar(10))+' | @DeleteSize => '+ Cast(@DeleteSize As varchar(10))
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT


									If Ltrim(Rtrim(@cTabla)) = 'EventosPendientes'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE rec_iid = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'EventosTimeLine'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE etl_iRecID = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'p_recepcion_proceso'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE pro_recid = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'p_recepcion_notas'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE rec_iidrecepcion = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'p_RXLog'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE rxl_iRecId = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'p_RXtraInfo'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE rxt_iRecId = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'p_RXImg'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE rxi_iRecId = ' +CONVERT(Varchar,@iID)
									Else If Ltrim(Rtrim(@cTabla)) = 'scheduler'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE idcuenta = ' +CONVERT(Varchar,@iID)
									Else If Left(@cTabla,15) = 'p_PosicionesGPS'
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE gps_idCuenta = ' +CONVERT(Varchar,@iID)
									Else				   
										Set @cSQL = N'Delete TOP(@iCount) From ' + @cTabla + ' WHERE rec_iidcuenta = ' +CONVERT(Varchar,@iID)

									Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | cSQL => '+@cSQL
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									Set @ParmDefinition = N'@iCount int';

									Set @IntVariable = @iCount;	
									EXECUTE sp_executesql @cSQL, @ParmDefinition, @iCount = @IntVariable;

									Set @Deleted_Rows =  @@ROWCOUNT;      

									Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | Deleted_Rows => '+ Cast(@Deleted_Rows As varchar(10))
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

									If @Deleted_Rows <= @iCount   --Por si quedaron registros sin eliminar por el limite del iCount
									Begin
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | Delete From [_RegistrosAEliminar] Where [rae_idKey]= '+ Cast(@idKey As varchar(10))
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

										Delete From [_RegistrosAEliminar] Where [rae_idKey]=@idKey
									End
								  
									--WAITFOR DELAY '00:00:00:50';		 
  	  
									SET @CurrentLoop = @CurrentLoop + 1;
								END

							End
						Else	
							Begin
								--Lo elimino cuando da cero x si quedaron registros sin eliminar
								Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | Delete From [_RegistrosAEliminar] Where [rae_idKey]= '+ Cast(@idKey As varchar(10)) --+ ' And [rae_cTabla]='+Char(39)+@cTabla+Char(39)
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

								Delete From [_RegistrosAEliminar] Where [rae_idKey]=@idKey
							End
				End

			FETCH NEXT FROM cEliminar INTO @cTabla,@iID,@idKey
			End

	CLOSE cEliminar
	DEALLOCATE cEliminar

	If @iRecNo = 0
		BREAK;

END;
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

Set NoExec Off