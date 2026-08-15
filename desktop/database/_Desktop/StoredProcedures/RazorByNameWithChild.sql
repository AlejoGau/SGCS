CREATE OR ALTER PROCEDURE [dbo].[RazorByNameWithChild]
              		@Name Varchar(128) = '',
              		@Taxonomies Varchar(4000) = '',
              		@PageCount int = 0,
              		@PagePresent int = 1,
              		@ObjectType VarChar(50),
              		@ObjectId INT,
              		@PageTotal int = 0 OutPut,
              		@RowTotal int = 0 OutPut
              
              	--WITH ENCRYPTION
              	AS
 	
							

													set nocount on
								
							set @Name = '"' + @Name + '"'	
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
							declare @RelationObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Razor')
              		        Select @RelationObjectTypeId = dbo.GetObjectId(@ObjectType)		
							
							CREATE TABLE #Taxo (Id int)



							if(@PageCount = 0)
							begin
								SET @PageCount = @RowTotal
							end


							set @sql = 'INSERT INTO #Taxo select tob.ObjectId from ObjectTaxonomy tob WHERE 1 = 1 '
							if @Taxonomies != ''
							begin

								declare @Count int
								declare @TaxonomyId varchar(100)
								
								set @Count = 1

								while((select count(*) from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count)>0)
								begin
									select @TaxonomyId = Value from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count
									set @Sql = @Sql + ' and  (select count(*) from ObjectTaxonomy where ObjectTypeId = ' + cast(@ObjectTypeId as varchar(10)) + ' And tob.ObjectTypeId = ObjectTypeId And ObjectId = tob.ObjectId and TaxonomyId in (select TaxonomyId from dbo.GetTaxonomyChilds(''' + @TaxonomyId + '''))) > 0 '
									set @Count = @Count + 1     
								end

							exec (@sql)

							end 

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [Razor] t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId 
								LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
								WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [SmallComment], [Razor], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]
							FROM (
							SELECT t.[Id] Id,  Name , t.[SmallComment], t.[Razor], t.[Version], t.[DateCreated], t.[DateModified], t.[RazorType], t.[OutputMimeType] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [Razor] t 
							inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo