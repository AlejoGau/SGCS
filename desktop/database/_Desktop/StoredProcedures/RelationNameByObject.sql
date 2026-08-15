CREATE OR ALTER PROCEDURE [dbo].[RelationNameByObject]
 	@ObjectTypeId int,
	@ObjectId int
as
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
	CREATE TABLE #Tmp (RowId int primary key identity(1,1), RelationId int, RelationObjectTypeId int, RelationObjectId int, ObjectTypeName varchar(128), ObjectName varchar(128) )
	INSERT INTO #Tmp select RelationId, RelationObjectTypeId, RelationObjectId, null, null from RelationObject (NOLOCK) where ObjectTypeId=@ObjectTypeId and ObjectId=@ObjectId
	
	declare @count int
	set @count = 1
	
	declare @Sql varchar(500)
	
	declare @ObjectTable varchar(50)

	declare @RelationId int
	declare @RelationObjectTypeId int
	declare @RelationObjectId int
	declare @ObjectTypeName varchar(50)
	declare @ObjectName varchar(256)
	print 'relationnamebyobject'
	while( (select count(*) from #Tmp where RowId=@count) > 0)
	  begin      
		select @RelationId = RelationId, @RelationObjectTypeId = RelationObjectTypeId, @RelationObjectId = RelationObjectId from #Tmp where RowId=@count
		select @ObjectTable = TableName, @ObjectTypeName = Name from object where Id = @RelationObjectTypeId

		update #Tmp set ObjectTypeName = @ObjectTypeName where RowId=@count

		begin try
		if @ObjectTypeName = 'Person'
		   set @sql = ' update #Tmp set ObjectName = (select Name + '' '' + LastName from [' + @ObjectTable + '] where id = ' + cast(@RelationObjectId as varchar) + ') where RowId = ' + cast(@count as varchar)
		else
		  set @sql = ' update #Tmp set ObjectName = (select Name from [' + @ObjectTable + '] where id = ' + cast(@RelationObjectId as varchar) + ') where RowId = ' + cast(@count as varchar)

		exec(@sql)
		end try
		begin catch
			print ERROR_MESSAGE()
		end catch
	
		set @count = @count + 1
	  end
	print 'relationnamebyobject done'
	select RelationId, RelationObjectTypeId ObjectTypeId, ObjectTypeName, RelationObjectId as ObjectId, ObjectName from #Tmp order by RelationObjectTypeId asc
	
	drop table #Tmp