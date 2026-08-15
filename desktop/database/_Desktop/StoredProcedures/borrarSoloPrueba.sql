CREATE OR ALTER PROCEDURE [dbo].[borrarSoloPrueba]
AS
BEGIN

	declare @items varchar(max);
	SET @items = 'a,b,c,d';

	SELECT * INTO #TempTables FROM dbo.SplitString(@items, ',')


	DECLARE @Index INT
	SET @Index = 1
  WHILE ((SELECT COUNT(*) FROM #TempTables WHERE Id = @Index) != 0)
	 BEGIN
			DECLARE @item varchar(100)
			select  @item = CAST (Item AS VARCHAR)   FROM #TempTables 
							WHERE Id = @Index
			select @item
			
			SET @Index = @Index + 1
		END
END