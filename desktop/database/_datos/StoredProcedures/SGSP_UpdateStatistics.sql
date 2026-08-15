CREATE OR ALTER PROCEDURE [dbo].[SGSP_UpdateStatistics]
@DBid Int = 0,
@Debug Char(1) = 'S'
WITH EXECUTE AS CALLER
AS
--Intelligent Update Statistics Utility
--Actualiza las estadisticas de la base en la cual se ejecute
--Autor : Pablo O. Canónico
--Fecha : 16/04/2017
Set NoCount ON
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = '',
		@DBName VarChar(10) = ''
		

If @DBid = 1
	Set @DBName = '_Audit'
If @DBid = 2
	Set @DBName = '_Datos'
If @DBid = 3
	Set @DBName =  '_Desktop'
If @DBid = 4
	Set @DBName =  '_Sistema'
If @DBid = 5
	Set @DBName = '_Tablas'

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Ejecutando en ('+@DBName+')' 
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
Declare @Cur_Stats CURSOR
Declare @SQLTemplate nVarChar(Max) = ''
-- Store relevant details --
Set @SQLTemplate = N'SET @Cur_Stats = CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY For
Select	ss.name AS SchemaName, st.name As TableName, si.name As IndexName, ssi.rowcnt
	From {DBName}.sys.indexes si
	Inner Join {DBName}.sys.sysindexes ssi On si.object_id = ssi.id And si.name = ssi.name
	Inner Join {DBName}.sys.tables st On st.[object_id] = si.[object_id]
	Inner Join {DBName}.sys.schemas ss On ss.[schema_id] = st.[schema_id]
	Where st.is_ms_shipped = 0	-- Only application indexes
		And si.index_id != 0	-- Ignore heaps
		And ssi.rowcnt > 100	-- Only indexes with at least 100 rows
		And ssi.rowmodctr > 0	-- Only indexes with changed data;
		OPEN @Cur_Stats;'

Set @SQLTemplate = ( Select REPLACE(@SQLTemplate,'{DBName}',@DBName) )

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Query ('+@SQLTemplate+')' 
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Execute SP_EXECUTESQL @SQLTemplate, N'@Cur_Stats CURSOR OUTPUT',@Cur_Stats = @Cur_Stats OUTPUT

-- Build Update Statistics SQL --
Declare @UpdateStatisticsSQL NVarChar(Max) = ''
Declare @SchemaName NVarChar(Max) = ''
Declare @TableName NVarChar(Max) = ''
Declare @IndexName NVarChar(Max) = ''
Declare @rowcnt Int = 0

Fetch Next From @Cur_Stats into @SchemaName,@TableName,@IndexName,@rowcnt
While @@FETCH_STATUS = 0
	Begin
		Set @UpdateStatisticsSQL = 'UPDATE STATISTICS ' + QUOTENAME(@DBName) + '.'
				+ QUOTENAME(@SchemaName) + '.' + QUOTENAME(@TableName)
				+ ' ' + QUOTENAME(@IndexName) + ' WITH SAMPLE '
				+ CASE
					WHEN @rowcnt < 500000 THEN '100 PERCENT'
					WHEN @rowcnt < 1000000 THEN '50 PERCENT'
					WHEN @rowcnt < 5000000 THEN '25 PERCENT'
					WHEN @rowcnt < 10000000 THEN '10 PERCENT'
					WHEN @rowcnt < 50000000 THEN '2 PERCENT'
					WHEN @rowcnt < 100000000 THEN '1 PERCENT'
					ELSE '3000000 ROWS '
				END

		 	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SQL : '+@UpdateStatisticsSQL
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @Debug = 'N'
			EXEC sp_executesql @UpdateStatisticsSQL
                   
            Fetch Next From @Cur_Stats Into @SchemaName,@TableName,@IndexName,@rowcnt
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