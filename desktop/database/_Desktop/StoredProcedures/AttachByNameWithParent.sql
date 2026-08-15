--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.360 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[AttachByNameWithParent]
              		@Name NVARCHAR(128) = '',
              		@Taxonomies NVARCHAR(4000) = '',
              		@PageCount int = 0,
              		@PagePresent int = 1,
              		@ObjectType NVARCHAR(50),
              		@ObjectId INT,
              		@PageTotal int = 0 OutPut,
              		@RowTotal int = 0 OutPut
              
              	--WITH ENCRYPTION
              	AS
									set nocount on
								
							set @Name = '"' + @Name + '"'
								
							declare @From int
							declare @Even int
							declare @sql NVARCHAR(MAX) 
							declare @ObjectTypeId int
							declare @RelationObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Attach')
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
								declare @TaxonomyId NVARCHAR(100)
								
								set @Count = 1

								while((select count(*) from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count)>0)
								begin
									select @TaxonomyId = Value from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count
									set @Sql = @Sql + ' and  (select count(*) from ObjectTaxonomy where ObjectTypeId = ' + cast(@ObjectTypeId as NVARCHAR(10)) + ' And tob.ObjectTypeId = ObjectTypeId And ObjectId = tob.ObjectId and TaxonomyId in (select TaxonomyId from dbo.GetTaxonomyChilds(''' + @TaxonomyId + '''))) > 0 '
									set @Count = @Count + 1     
								end
							
							exec (@sql)

							end 

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM _Datos..[Attach] t 
															inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.[Id] 
								   LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id]
								   WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))
								
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [FullName], [Format], [Weight], [Location], [Width], [Height], [SaveAs], [Target], [Link], [Status], [SmallComment], [LargeComment], [DateCreated], [FolderId]
							FROM (
							SELECT t.[Id] Id,  Name , t.[FullName], t.[Format], t.[Weight], t.[Location], t.[Width], t.[Height], t.[SaveAs], t.[Target], t.[Link], t.[Status], t.[SmallComment], t.[LargeComment], t.[DateCreated], t.[FolderId] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM _Datos..[Attach] t 
								inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.[Id] 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo