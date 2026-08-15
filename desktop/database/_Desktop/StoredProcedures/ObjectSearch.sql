CREATE OR ALTER PROCEDURE [dbo].[ObjectSearch]
	@ObjectTypeId int,
	@Name varchar(128) = '',
	@Taxonomies varchar(4000) = '',
	@Order varchar(50) = ''
AS
	declare @sql varchar(8000)
	declare @TableName varchar(50)

	select @TableName = TableName from object where id = @ObjectTypeId

	declare @SelectName varchar(512)
	declare @WhereName varchar(512)

	if @TableName = 'Person'
	   begin
	      set @SelectName = 'Name + '' '' + isnull(LastName,'''') as Name'
	      set @WhereName = 'Name+'' ''+LastName'
	   end
	else
	   begin
	      set @SelectName = 'Name'
	      set @WhereName = 'Name'
	   end
	
	set @sql = 'select top 50 ' + cast(@ObjectTypeId as varchar) + ' as ObjectTypeId, Id as ObjectId, '+@SelectName+' from ' + @TableName + ' where 1=1 '

	if @Name != ''
	   set @sql = @sql + ' and ' + @WhereName + ' like ''%' + @Name + '%'''	

	if @Taxonomies != ''
             		begin
      			declare @Count int
			declare @TaxonomyId varchar(100)
			
			set @Count = 1
			while((select count(*) from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count)>0)
			begin
				select @TaxonomyId = Value from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count
				set @Sql = @Sql + ' and  (select count(*) from ObjectTaxonomy where ObjectTypeId = ' + cast(@ObjectTypeId as varchar) + ' and ObjectId = '+@TableName+'.Id and TaxonomyId in (select TaxonomyId from dbo.GetTaxonomyChilds(''' + @TaxonomyId + '''))) > 0 '
				set @Count = @Count + 1     
			end
             		end

	if @Order != ''
	   set @sql = @sql + ' order by ' + @Order

--	print(@sql)

	exec(@sql)