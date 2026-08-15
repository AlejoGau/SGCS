--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.427 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[AttachByText]
								@Text NVARCHAR(128) = '',
								@Taxonomies NVARCHAR(4000) = '',
								@PageCount int = 0,
								@PagePresent int = 1,
								@PageTotal int = 0 OutPut,
								@RowTotal int = 0 OutPut
							--WITH ENCRYPTION
							AS
								set nocount on
								
------------
declare @Filter NVARCHAR(MAX)
if (substring(@Text, 1, 1) = '[')
begin
	set @Filter = @Text;
	set @TEXT = '';
end


IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		
		--Set Filters
		
		
		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END
------------
								
							set @TEXT = '"' + @Text + '"'
								
							declare @From int
							declare @Even int
							declare @sql NVARCHAR(MAX) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Attach')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM _Datos..[Attach])
							if(@PageCount = 0)
							begin
								SET @PageCount = @RowTotal
							end
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1

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
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [FullName], [Format], [Weight], [Location], [Width], [Height], [SaveAs], [Target], [Link], [Status], [SmallComment], [LargeComment], [DateCreated], [FolderId]
							FROM (
							SELECT t.[Id] Id,  Name , t.[FullName], t.[Format], t.[Weight], t.[Location], t.[Width], t.[Height], t.[SaveAs], t.[Target], t.[Link], t.[Status], t.[SmallComment], t.[LargeComment], t.[DateCreated], t.[FolderId] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM _Datos..[Attach] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)

							) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo