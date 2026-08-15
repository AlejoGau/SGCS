CREATE OR ALTER PROCEDURE [dbo].[SearchSmartMailEmailByProgram]
    @page       INT           = 1,
    @start      INT           = 0,
    @limit      INT           = 50,
    @sort       VARCHAR(256)  = '',
    @group      VARCHAR(256)  = '',
    @filter     VARCHAR(2048) = '',
    @Id         INT           = 0,
    @_dc        VARCHAR(256)  = '',
    @totalrows  INT OUTPUT
AS
BEGIN
    -- Federico V. Modifico este store ya que el filter en CRM no estaba funcionando correctamente.
    -- Cuidado porque puede llegar a afectar en otro módulo.

    SET NOCOUNT ON;

    DECLARE @EmailLike VARCHAR(255) = '';

    IF ISNULL(@filter, '') <> ''
    BEGIN
        DECLARE @FilterTable TABLE(
            element_id  INT NOT NULL,
            parent_ID   INT,
            Object_ID   INT,
            NAME        VARCHAR(2000),
            StringValue VARCHAR(MAX) NOT NULL,
            ValueType   VARCHAR(10)  NOT NULL
        );

        INSERT INTO @FilterTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType)
        SELECT element_id, parent_ID, Object_ID, NAME, StringValue, ValueType
        FROM dbo.parseJSON(@filter)
        WHERE NAME IN ('property','value');

        DECLARE @FilterProperty VARCHAR(64);
        DECLARE @FilterValue    VARCHAR(256);
        DECLARE @FilterIndex    INT = 1;

        WHILE ( (SELECT COUNT(*) FROM @FilterTable WHERE parent_ID = @FilterIndex) > 0 )
        BEGIN
            SELECT @FilterProperty = REPLACE(StringValue, '''', '''''')
            FROM @FilterTable WHERE parent_ID = @FilterIndex AND NAME = 'property';

            SELECT @FilterValue = RTRIM(LTRIM(REPLACE(StringValue, '''', '''''')))
            FROM @FilterTable WHERE parent_ID = @FilterIndex AND NAME = 'value';

            IF ISNULL(@FilterValue, '') <> ''
            BEGIN
                IF @FilterProperty = 'Id'
                    SET @Id = TRY_CONVERT(INT, @FilterValue);

                IF @FilterProperty = 'Email'
                    SET @EmailLike = '%' + @FilterValue + '%';
            END

            SET @FilterIndex += 1;
        END
    END

    IF ISNULL(@Id, 0) = 0
    BEGIN
        RAISERROR('El parametro "Id" tiene que tener un valor especificado', 16, 1);
        RETURN;
    END

    DECLARE @sql NVARCHAR(MAX);
    SELECT @sql = Query
    FROM SmartMail_Program
    WHERE Id = @Id;

    IF @sql IS NULL
    BEGIN
        RAISERROR('No se encontró la Query en SmartMail_Program para el Id especificado.', 16, 1);
        RETURN;
    END

    IF OBJECT_ID('tempdb..#temp') IS NOT NULL DROP TABLE #temp;

    CREATE TABLE #temp (
        Email VARCHAR(MAX)
    );

    INSERT INTO #temp (Email)
    EXEC (@sql);

    DECLARE @where NVARCHAR(MAX) = N'
      FROM #temp t
      WHERE t.Email IS NOT NULL
        AND LTRIM(RTRIM(t.Email)) <> '''' ';

    IF ISNULL(@EmailLike, '') <> ''
        SET @where += N' AND t.Email COLLATE Latin1_General_CI_AI LIKE @EmailLike ';

    DECLARE @TotalSql NVARCHAR(MAX) =
        N'SELECT @TotalRows = COUNT(*) ' + @where;

    EXEC sp_executesql
        @TotalSql,
        N'@TotalRows INT OUTPUT, @EmailLike VARCHAR(255)',
        @TotalRows = @totalrows OUTPUT,
        @EmailLike = @EmailLike;

    DECLARE @orderBy NVARCHAR(200) = N' ORDER BY t.Email ASC ';
    IF ISNULL(@sort, '') <> '' AND CHARINDEX('DESC', UPPER(@sort)) > 0
        SET @orderBy = N' ORDER BY t.Email DESC ';

    DECLARE @from INT = ((@page - 1) * @limit) + 1;
    DECLARE @to   INT = (@page * @limit);

    DECLARE @RowsSql NVARCHAR(MAX) = N'
    SELECT Email
    FROM (
        SELECT ROW_NUMBER() OVER (' + @orderBy + N') AS RowNumber2,
               t.Email
        ' + @where + N'
    ) AS T
    WHERE RowNumber2 BETWEEN @from AND @to';

    EXEC sp_executesql
        @RowsSql,
        N'@from INT, @to INT, @EmailLike VARCHAR(255)',
        @from = @from,
        @to   = @to,
        @EmailLike = @EmailLike;

    DROP TABLE #temp;
END