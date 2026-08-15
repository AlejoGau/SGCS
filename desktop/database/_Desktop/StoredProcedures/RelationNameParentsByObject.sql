CREATE OR ALTER PROCEDURE [dbo].[RelationNameParentsByObject]
 	@ObjectTypeId int,
	@ObjectId int
as
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
	CREATE TABLE #Tmp (RowId int primary key identity(1,1), RelationId int, RelationObjectTypeId int, RelationObjectId int, ObjectTypeName varchar(128), ObjectName varchar(128) )
	INSERT INTO #Tmp select RelationId, ObjectTypeId, ObjectId, null, null from RelationObject where RelationObjectTypeId=@ObjectTypeId and RelationObjectId=@ObjectId
	
	declare @count int
	set @count = 1
	
	declare @Sql varchar(500)
	
	declare @ObjectTable varchar(50)

	declare @RelationId int
	declare @RelationObjectTypeId int
	declare @RelationObjectId int
	declare @ObjectTypeName varchar(50)
	declare @ObjectName varchar(256)
	
	while( (select count(*) from #Tmp where RowId=@count) > 0)
	  begin      
		select @RelationId = RelationId, @RelationObjectTypeId = RelationObjectTypeId, @RelationObjectId = RelationObjectId from #Tmp where RowId=@count
		select @ObjectTable = TableName, @ObjectTypeName = Name from object where Id = @RelationObjectTypeId

		update #Tmp set ObjectTypeName = @ObjectTypeName where RowId=@count

		if @ObjectTypeName = 'Person'
		   set @sql = ' update #Tmp set ObjectName = (select Name + '' '' + LastName from ' + @ObjectTable + ' where id = ' + cast(@RelationObjectId as varchar) + ') where RowId = ' + cast(@count as varchar)
		else
		  set @sql = ' update #Tmp set ObjectName = (select Name from ' + @ObjectTable + ' where id = ' + cast(@RelationObjectId as varchar) + ') where RowId = ' + cast(@count as varchar)

		exec(@sql)
	
		set @count = @count + 1
	  end
	
	select RelationId, RelationObjectTypeId ObjectTypeId, ObjectTypeName, RelationObjectId as ObjectId, ObjectName from #Tmp order by RelationObjectTypeId asc
	
	drop table #Tmp