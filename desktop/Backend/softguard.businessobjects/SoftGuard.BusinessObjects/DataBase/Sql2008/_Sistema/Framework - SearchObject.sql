

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectSel]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectSel]
GO
							Create Procedure SearchObjectSel
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty], [TotalRowsParameterName]
							  			 from [SearchObject]
							 			  where [Id] = @Id
							GO
							
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectDel]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectDel]
GO
							Create Procedure SearchObjectDel
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('SearchObject')
																		
										 Delete 
							  			 from SearchObject
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											
							GO											
							
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectIns]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectIns]
GO
							Create Procedure SearchObjectIns
													@Name VarChar(128)		
										 ,
										 			@ObjectTypeId Int = 0,
										 			@Content VarChar (max) = '',
										 			@SearchType VarChar (256) = '',
										 			@IdProperty VarChar (256) = '',
										 			@TokenProperty VarChar (256) = '',
										 			@TotalRowsParameterName VarChar (256) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [SearchObject] ( Name ,[ObjectTypeId],[Content],[SearchType],[IdProperty],[TokenProperty],[TotalRowsParameterName])
										 						 values (@Name , @ObjectTypeId, @Content, @SearchType, @IdProperty, @TokenProperty, @TotalRowsParameterName)
										
										 exec SearchObjectSel @@Identity 						 
							GO	
							
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectUpd]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectUpd]
GO
							Create Procedure SearchObjectUpd
										 @Id Int,
										 @Name VarChar(128)
										 ,
										 			@ObjectTypeId Int,
										 			@Content VarChar (max),
										 			@SearchType VarChar (256),
										 			@IdProperty VarChar (256),
										 			@TokenProperty VarChar (256),
										 			@TotalRowsParameterName VarChar (256)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [SearchObject] set Name = @Name ,[ObjectTypeId] = @ObjectTypeId,[Content] = @Content,[SearchType] = @SearchType,[IdProperty] = @IdProperty,[TokenProperty] = @TokenProperty,[TotalRowsParameterName] = @TotalRowsParameterName										
										 where [Id] = @Id										 
										 exec SearchObjectSel @Id 						 
							GO	
											
							
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectByChildObject]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectByChildObject]
GO
							Create Procedure SearchObjectByChildObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										0
										**
										
										*/
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('SearchObject')
										
										
										
										Select o.[Id] Id, Name , o.[ObjectTypeId], o.[Content], o.[SearchType], o.[IdProperty], o.[TokenProperty], o.[TotalRowsParameterName] 
										  from [SearchObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end
							GO	
							

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectByParentObject]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectByParentObject]
GO
							Create Procedure SearchObjectByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('SearchObject')
										
										Select o.[Id] Id,  Name , o.[ObjectTypeId], o.[Content], o.[SearchType], o.[IdProperty], o.[TokenProperty], o.[TotalRowsParameterName] 
										  from [SearchObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   
							GO													
							
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectByName]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectByName]
GO
							CREATE Procedure SearchObjectByName
								@Name Varchar(128) = '',
								@Taxonomies Varchar(4000) = '',
								@PageCount int = 0,
								@PagePresent int = 1,
								@PageTotal int = 0 OutPut,
								@RowTotal int = 0 OutPut,
								@OrderBy varchar(50) = 'Id'
							--WITH ENCRYPTION
							AS
								set nocount on
								
							set @Name = '"' + @Name + '"'
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('SearchObject')

							CREATE TABLE #Taxo (Id int)

							
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [SearchObject] t LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))
							
							if(@PageCount = 0)
							begin
								SET @PageCount = @RowTotal
							end
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	

							DECLARE @Query AS VARCHAR(MAX)
							
							IF @OrderBY = ''
							BEGIN
								SET @OrderBy = 'Id'
							END
							
							SET @Query = 'SELECT Id, Name , ObjectTypeId, Content, SearchType, IdProperty, TokenProperty, TotalRowsParameterName
							FROM (
							SELECT t.[Id] Id, Name , t.ObjectTypeId, t.Content, t.SearchType, t.IdProperty, t.TokenProperty, t.TotalRowsParameterName , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM [SearchObject] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(''' + replace(@Name, '''', '''''') + ''') = 2 or contains(t.*, ''' + replace(@Name, '''', '''''') + ''')) AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															

							GO
							
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectByNameWithChild]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectByNameWithChild]
GO
              Create Procedure SearchObjectByNameWithChild
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
															
							select @ObjectTypeId = dbo.GetObjectId('SearchObject')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [SearchObject] t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId 
								LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
								WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty], [TotalRowsParameterName]
							FROM (
							SELECT t.[Id] Id,  Name , t.[ObjectTypeId], t.[Content], t.[SearchType], t.[IdProperty], t.[TokenProperty], t.[TotalRowsParameterName] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [SearchObject] t 
							inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					
					
					GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectByNameWithParent]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectByNameWithParent]
GO
							Create Procedure SearchObjectByNameWithParent
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
															
							select @ObjectTypeId = dbo.GetObjectId('SearchObject')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [SearchObject] t 
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
							
							SELECT Id, Name , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty], [TotalRowsParameterName]
							FROM (
							SELECT t.[Id] Id,  Name , t.[ObjectTypeId], t.[Content], t.[SearchType], t.[IdProperty], t.[TokenProperty], t.[TotalRowsParameterName] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [SearchObject] t 
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
					
							GO									
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SearchObjectByText]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SearchObjectByText]
GO
							CREATE Procedure SearchObjectByText
								@Text Varchar(128) = '',
								@Taxonomies Varchar(4000) = '',
								@PageCount int = 0,
								@PagePresent int = 1,
								@PageTotal int = 0 OutPut,
								@RowTotal int = 0 OutPut
							--WITH ENCRYPTION
							AS
								set nocount on
								
							set @Text = '"' + @Text + '"'
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('SearchObject')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [SearchObject])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [SearchObject] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty], [TotalRowsParameterName]
							FROM (
							SELECT t.[Id] Id,  Name , t.[ObjectTypeId], t.[Content], t.[SearchType], t.[IdProperty], t.[TokenProperty], t.[TotalRowsParameterName] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM [SearchObject] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														
							GO								
																
  
  
       CREATE Procedure [dbo].[RazorSearch]  
        @Text Varchar(128) = '',  
        @Taxonomies Varchar(4000) = '',  
        @Limit int = 0,  
        @Page int = 0,  
        @Start int = 0,  
        @Group varchar(max) = null,  
        @Sort varchar(max) = null,  
        @PageTotal int = 0 OutPut,  
        @RowTotal int = 0 OutPut  
       --WITH ENCRYPTION  
       AS  
        set nocount on  
          
       set @Text = '"' + @Text + '"'  
         
       declare @PageCount int   
       set @PageCount = @Limit  
       declare @PagePresent int   
       set @PagePresent = @Page  
         
       declare @From int  
       declare @Even int  
       declare @sql Varchar(8000)   
       declare @ObjectTypeId int  
                 
       select @ObjectTypeId = dbo.GetObjectId('Razor')  
  
       CREATE TABLE #Taxo (Id int)  
  
  
       set @RowTotal = (SELECT COUNT([Id]) FROM [Razor])  
       if(@PageCount = 0)  
       begin  
        SET @PageCount = @RowTotal  
       end  
       set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))  
       set @From = @Start--@PageCount * @PagePresent - @PageCount  
       set @Even = @From + @PageCount + 1  
  
       set @sql = 'INSERT INTO #Taxo select tob.ObjectId from ObjectTaxonomy tob WHERE 1 = 1 '  
       if @Taxonomies != ''  
       begin  
  
        declare @Count int  
        declare @TaxonomyId varchar(100)  
          
        set @Count = 1  
  
        while((select count(*) from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count)>0)  
        begin  
         select @TaxonomyId = Value from dbo.ParseArrayWithId(@Taxonomies, ',') where Id = @Count  
         set @Sql = @Sql + ' and  (select count(*) from ObjectTaxonomy where ObjectTypeId = ' + cast(@ObjectTypeId as varchar(10)) + ' And tob.ObjectTypeId = ObjectTypeId And ObjectId = tob.ObjectId and TaxonomyId in (select TaxonomyId from dbo.GetTaxonom
yChilds(''' + @TaxonomyId + '''))) > 0 '  
         set @Count = @Count + 1       
        end  
         
       exec (@sql)  
  
       end   
  
       set @RowTotal = (SELECT COUNT(t.[Id]) FROM [Razor] t   
       LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])  
         
       set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))  
       set @From = @PageCount * @PagePresent - @PageCount  
       set @Even = @From + @PageCount + 1   
         
       SELECT Id, Name, [SmallComment], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]  
       FROM (  
       SELECT t.[Id] Id,  Name, t.[SmallComment], t.[Version], t.[DateCreated], t.[DateModified], t.[RazorType], t.[OutputMimeType] , taxo.Id as Taxo,  
       ROW_NUMBER() OVER(  
       ORDER BY t.[Id]    
        ) AS RowNumber  
       FROM [Razor] t   
       LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id]   
       WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt  
       WHERE RowNumber > @From  
       AND RowNumber < @Even  
  
  
       drop Table #Taxo  
GO                