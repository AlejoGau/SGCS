/****** Object:  StoredProcedure [dbo].[ApplicationDel]    Script Date: 29/12/2011 09:54:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ApplicationDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Application')
																		
										 Delete 
							  			 from Application
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[ApplicationIns]    Script Date: 29/12/2011 09:54:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ApplicationIns]
													@Name VarChar(128),							
										 
										 			@RequestURI VarChar (500) = '',
										 			@ClientId VarChar (500) = '',
										 			@ClientSecret VarChar (500) = '',
										 			@UserAccount Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [Application] ( Name, [RequestURI],
[ClientId],
[ClientSecret],
[UserAccount])
										 						 values (@Name, @RequestURI,
@ClientId,
@ClientSecret,
@UserAccount)
										
										 exec ApplicationSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[ApplicationSel]    Script Date: 29/12/2011 09:54:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ApplicationSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [RequestURI], [ClientId], [ClientSecret], [UserAccount]
							  			 from [Application]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[ApplicationUpd]    Script Date: 29/12/2011 09:54:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ApplicationUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@RequestURI VarChar (500),
										 			@ClientId VarChar (500),
										 			@ClientSecret VarChar (500),
										 			@UserAccount Int
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [Application] set Name = @Name, [RequestURI] = @RequestURI,
[ClientId] = @ClientId,
[ClientSecret] = @ClientSecret,
[UserAccount] = @UserAccount										
										 where [Id] = @Id										 
										 exec ApplicationSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[FrameworkAuditBySel]    Script Date: 29/12/2011 09:54:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FrameworkAuditBySel]
	@Id INT
AS
	SET NOCOUNT ON
	
	SELECT [Xml] FROM FrameworkAudit WHERE Id = @Id

GO

/****** Object:  StoredProcedure [dbo].[FrameworkAuditSearch]    Script Date: 29/12/2011 09:54:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FrameworkAuditSearch]    
 @UserName varchar(128) = '',    
 @ObjectTypeId int = 0,    
 @ObjectId int = 0,    
 @FunctionId int = 0,    
 @PageCount int = 0,    
 @PagePresent int = 1,    
 @PageTotal int = 0 OutPut,    
 @RowTotal int = 0 OutPut    
AS    
 set nocount on         
    
 declare @UserId int    
 select @UserId = isnull(Id, 0) from UserAccount where Name = @UserName or CAST(Id as varchar(128)) = @UserName    
    
     
    
 declare @From int    
 declare @Even int    
    
     
    
 create table #Tmp (RowId int identity(1,1) primary key, Id int)    
    
     
    
 declare @sql varchar(1024)    
    
     
    
 set @sql = 'insert into #Tmp (Id) select Id from FrameworkAudit where 1=1 '    
    
     
    
 if @UserId != 0    
    set @sql = @sql + ' and UserId = ' + cast(@UserId as varchar)    
    
     
    
 if @ObjectTypeId != 0    
    set @sql = @sql + ' and ObjectTypeId = ' + cast(@ObjectTypeId as varchar)    
    
     
    
 if @ObjectId != 0    
    set @sql = @sql + ' and ObjectId = ' + cast(@ObjectId as varchar)    
    
     
    
 if @FunctionId != 0    
    set @sql = @sql + ' and FunctionId = ' + cast(@FunctionId as varchar)    
    
     
    
 set @sql = @sql + ' order by AuditDate desc '    
 exec (@sql)    
    
 if @PageCount = 0    
  select a.Id, u.Id UserId, u.Name + ' - ' + isnull(e.UserName,'') AS UserName, a.ObjectTypeId, o.Name ObjectTypeName, a.ObjectId, a.ObjectName, f.Id FunctionId, f.Name FunctionName, a.AuditDate, case when isnull(a.Xml,'') = '' then cast(0 as bit) else cast(1 as bit) end as HasXml
    from #Tmp t    
         inner join FrameworkAudit a on a.Id = t.Id    
         left join FrameworkAuditExtend e on a.Id = e.Id
         inner join [Function] f on f.Id = a.FunctionId    
         inner join UserAccount u on u.Id = a.UserId    
         inner join Object o on o.Id = a.ObjectTypeId    
 order by a.AuditDate desc           
 else    
 begin    
  set @RowTotal = @@IDENTITY    
  set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))    
      
  set @From = @PageCount * @PagePresent - @PageCount    
  set @Even = @From + @PageCount + 1    
      
  select a.Id, u.Id UserId, u.Name + ' - ' + isnull(e.UserName,'') as UserName, a.ObjectTypeId, o.Name ObjectTypeName, a.ObjectId, a.ObjectName, f.Id FunctionId, f.Name FunctionName, a.AuditDate, case when isnull(a.Xml,'') = '' then cast(0 as bit) else cast(1 as bit) end as HasXml
    from #Tmp t    
         inner join FrameworkAudit a on a.Id = t.Id    
         left join FrameworkAuditExtend e on a.Id = e.Id
         inner join [Function] f on f.Id = a.FunctionId    
         inner join UserAccount u on u.Id = a.UserId    
         inner join Object o on o.Id = a.ObjectTypeId    
   where t.RowId > @From     
     and t.RowId < @Even    
   order by a.AuditDate desc  
 end    
GO

/****** Object:  StoredProcedure [dbo].[FrameworkAuditSet]    Script Date: 29/12/2011 09:54:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[FrameworkAuditSet]  
 @UserId int,  
 @ObjectTypeId int,  
 @ObjectId int,  
 @FunctionName varchar(25),  
 @Xml varchar(max) = null  
AS    	   

 SET NOCOUNT ON
 
 DECLARE @ObjectName VARCHAR(64)
 SELECT @ObjectName = Name FROM [Object] WHERE Id = @ObjectTypeId
  
 DECLARE @FunctionId INT  
 SELECT @FunctionId = Id FROM [Function] WHERE Name = @FunctionName  
       
 DECLARE @Audit INT  
 SELECT @Audit = isnull(Audit, 0) FROM Permission WHERE ObjectId = @ObjectTypeId and FunctionId = @FunctionId  
   
 IF @Audit <> 0  
 BEGIN  
  DECLARE @AuditDate DATETIME  
  SELECT @AuditDate = getdate()  
   
  INSERT INTO FrameworkAudit (UserId, ObjectTypeId, ObjectId, ObjectName, FunctionId, AuditDate, [Xml])   
               VALUES (@UserId, @ObjectTypeId, @ObjectId, @ObjectName, @FunctionId, @AuditDate, @Xml)  
 END  

GO

/****** Object:  StoredProcedure [dbo].[GetFunctionsByUserId]    Script Date: 29/12/2011 09:54:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE PROCEDURE [dbo].[GetFunctionsByUserId] @UserId int
AS
DECLARE @UserAccountTypeId INT
DECLARE @RoleTypeId INT
DECLARE @PermissionId INT
SET @UserAccountTypeId = dbo.GetObjectId('UserAccount')
SET @RoleTypeId  = dbo.GetObjectId('Role')
SET @PermissionId  = dbo.GetObjectId('Permission')
SELECT 
idFuncion = Per.FunctionId, 
Funcion = Fu.Name,
idObjeto = Per.ObjectId,
Objeto = Obj.Name
FROM RelationObject RoRole
JOIN RelationObject RoPerm ON
(RoPerm.ObjectTypeId = @RoleTypeId
AND RoPerm.ObjectId = RoRole.RelationObjectId
AND RoPerm.RelationObjectTypeId = @PermissionId)
INNER JOIN Permission Per ON ( RoPerm.RelationObjectId = Per.Id )
INNER JOIN [Function] Fu ON ( Fu.Id = Per.FunctionId )
INNER JOIN Object Obj ON ( Obj.Id = Per.ObjectId )
WHERE RoRole.ObjectTypeId = @UserAccountTypeId
AND RoRole.ObjectId = @UserId
AND RoRole.RelationObjectTypeId = @RoleTypeId


GO

/****** Object:  StoredProcedure [dbo].[MetaDataByChildObject]    Script Date: 29/12/2011 09:54:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('MetaData')
										
										
										
										Select o.[Id] Id,  Name, o.[DataType], o.[XmlData], o.[ObjectTypeId], o.[ObjectId], o.[Model] 
										  from [MetaData] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[MetaDataByName]    Script Date: 29/12/2011 09:54:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[MetaDataByName]
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
															
							select @ObjectTypeId = dbo.GetObjectId('MetaData')

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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [MetaData] t LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
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
							
							SET @Query = 'SELECT Id, Name, DataType, XmlData, ObjectTypeId, ObjectId, Model
							FROM (
							SELECT t.[Id] Id,  Name, t.DataType, t.XmlData, t.ObjectTypeId, t.ObjectId, t.Model , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM [MetaData] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(''' + replace(@Name, '''', '''''') + ''') = 2 or contains(t.*, ''' + replace(@Name, '''', '''''') + ''')) AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[MetaDataByNameWithChild]    Script Date: 29/12/2011 09:54:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[MetaDataByNameWithChild]
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
															
							select @ObjectTypeId = dbo.GetObjectId('MetaData')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [MetaData] t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId 
								LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
								WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [DataType], [XmlData], [ObjectTypeId], [ObjectId], [Model]
							FROM (
							SELECT t.[Id] Id,  Name, t.[DataType], t.[XmlData], t.[ObjectTypeId], t.[ObjectId], t.[Model] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [MetaData] t 
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

/****** Object:  StoredProcedure [dbo].[MetaDataByNameWithParent]    Script Date: 29/12/2011 09:54:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataByNameWithParent]
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
															
							select @ObjectTypeId = dbo.GetObjectId('MetaData')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [MetaData] t 
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
							
							SELECT Id, Name, [DataType], [XmlData], [ObjectTypeId], [ObjectId], [Model]
							FROM (
							SELECT t.[Id] Id,  Name, t.[DataType], t.[XmlData], t.[ObjectTypeId], t.[ObjectId], t.[Model] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [MetaData] t 
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

/****** Object:  StoredProcedure [dbo].[MetaDataByParentObject]    Script Date: 29/12/2011 09:54:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('MetaData')
										
										Select o.[Id] Id,  Name, o.[DataType], o.[XmlData], o.[ObjectTypeId], o.[ObjectId], o.[Model] 
										  from [MetaData] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[MetaDataByText]    Script Date: 29/12/2011 09:54:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[MetaDataByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('MetaData')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [MetaData])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [MetaData] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [DataType], [XmlData], [ObjectTypeId], [ObjectId], [Model]
							FROM (
							SELECT t.[Id] Id,  Name, t.[DataType], t.[XmlData], t.[ObjectTypeId], t.[ObjectId], t.[Model] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM [MetaData] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[MetaDataDel]    Script Date: 29/12/2011 09:54:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('MetaData')
																		
										 Delete 
							  			 from MetaData
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[MetadataGetFirst]    Script Date: 29/12/2011 09:54:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[MetadataGetFirst](	@ObjectTypeId int,	@ObjectId int,	@Name varchar(128))as	select Id, Name, DataType, XmlData, ObjectTypeId, ObjectId, Model	from Metadata	where ObjectTypeId = @ObjectTypeId		and ObjectId = @ObjectId		and Name = @Name
GO

/****** Object:  StoredProcedure [dbo].[MetadataGetList]    Script Date: 29/12/2011 09:54:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[MetadataGetList](	@ObjectTypeId int,	@ObjectId int)as	select Id, Name, DataType, XmlData, ObjectTypeId, ObjectId, Model	from Metadata	where ObjectTypeId = @ObjectTypeId and ObjectId = @ObjectId
GO

/****** Object:  StoredProcedure [dbo].[MetaDataIns]    Script Date: 29/12/2011 09:54:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataIns]
													@Name VarChar(128),							
										 
										 			@DataType VarChar (25) = '',
										 			@XmlData Text = '',
										 			@ObjectTypeId Int = 0,
										 			@ObjectId Int = 0,
										 			@Model VarChar (25) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [MetaData] ( Name, [DataType],
[XmlData],
[ObjectTypeId],
[ObjectId],
[Model])
										 						 values (@Name, @DataType,
@XmlData,
@ObjectTypeId,
@ObjectId,
@Model)
										
										 exec MetaDataSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[MetaDataSel]    Script Date: 29/12/2011 09:54:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [DataType], [XmlData], [ObjectTypeId], [ObjectId], [Model]
							  			 from [MetaData]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[MetaDataUpd]    Script Date: 29/12/2011 09:54:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MetaDataUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@DataType VarChar (25),
										 			@XmlData  Text,
										 			@ObjectTypeId Int,
										 			@ObjectId Int,
										 			@Model VarChar (25)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [MetaData] set Name = @Name, [DataType] = @DataType,
[XmlData] = @XmlData,
[ObjectTypeId] = @ObjectTypeId,
[ObjectId] = @ObjectId,
[Model] = @Model										
										 where [Id] = @Id										 
										 exec MetaDataSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[ObjectAllowRelation]    Script Date: 29/12/2011 09:54:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[ObjectAllowRelation]
as
       Select * from Object where AllowRelation = 'T'



GO

/****** Object:  StoredProcedure [dbo].[ObjectGetAll]    Script Date: 29/12/2011 09:54:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[ObjectGetAll]
AS
SELECT * FROM Object


GO

/****** Object:  StoredProcedure [dbo].[ObjectSearch]    Script Date: 29/12/2011 09:54:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO



CREATE PROCEDURE [dbo].[ObjectSearch]
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

GO

/****** Object:  StoredProcedure [dbo].[ObjectSel]    Script Date: 29/12/2011 09:54:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE Procedure [dbo].[ObjectSel]
	@Id int,
	@Name varchar(50) = ''
as

   if @Name = ''		
	Select Id, Name, FullName, Namespace, Assembly, TableName
	  from Object 
	 where Id = @Id

   if @Name != ''		
	Select Id, Name, FullName, Namespace, Assembly, TableName
	  from Object 
	 where Id = @Id and Name = @Name


GO

/****** Object:  StoredProcedure [dbo].[ObjectSelByName]    Script Date: 29/12/2011 09:54:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE Procedure [dbo].[ObjectSelByName]
	@Name varchar(50)
as
	
	Select Id, Name, FullName, Namespace, Assembly, TableName
	  from Object 
	 where Name = @Name



GO

/****** Object:  StoredProcedure [dbo].[ObjectTaxonomiesSel]    Script Date: 29/12/2011 09:54:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE  procedure [dbo].[ObjectTaxonomiesSel]
	@UserId int = null,
	@ObjectType varchar(50) = null, 
	@ObjectId int = null,
	@ParentId int = null
as
	Set NoCount On
	declare @ObjectTypeId int
	declare @SecurityTypeId int
	select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	select @SecurityTypeId = dbo.GetObjectId('UserAccount')
	select Id
	       ,Name
	       ,ParentId 
	       ,(select count(c.Id) from ObjectTaxonomy c where c.ObjectTypeId=@ObjectTypeId and c.ObjectId=@ObjectId and c.TaxonomyId=Taxonomies.Id) IsChecked
	       ,(select count(s.Id) from ObjectTaxonomy s where s.ObjectTypeId=@SecurityTypeId and s.ObjectId=@UserId and s.TaxonomyId=Taxonomies.Id) IsSecurity
	  from Taxonomies
	where @ParentId is null or @ParentId = ParentId


GO

/****** Object:  StoredProcedure [dbo].[ObjectTaxonomyDel]    Script Date: 29/12/2011 09:54:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[ObjectTaxonomyDel]
	@UserId Int, 
	@ObjectType VarChar(50),
  	@ObjectId Int,
        @Id Int
as
	set nocount on
	declare @IsTaxonomyId int,
		@ParentId int,
		@FirstParentId int,
		@ObjectTypeId int
	--action ok
	select @FirstParentId = dbo.GetTaxonomyFirstParentId(@Id), @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	--caracteristica actual
	select @IsTaxonomyId = count(*) 
	  from ObjectTaxonomy
            where ObjectId = @ObjectId
	         and ObjectTypeId = @ObjectTypeId
	         and TaxonomyId = @Id
	         and FirstParentId = @FirstParentId
	if @IsTaxonomyId = 1
 	   begin		
		--borro hijos
		delete from ObjectTaxonomy 
	             where ObjectId = @ObjectId
		          and ObjectTypeId = @ObjectTypeId
		          and TaxonomyId = @Id
		          and FirstParentId = @FirstParentId
	   end
	else
	   begin
	    Print(@IsTaxonomyId)
	    Print(@ParentId)
	end


GO

/****** Object:  StoredProcedure [dbo].[ObjectTaxonomyIns]    Script Date: 29/12/2011 09:54:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[ObjectTaxonomyIns]
	@UserId Int, 
	@ObjectType VarChar(50),
  	@ObjectId Int,
        @Id Int
as
set nocount on
	declare @IsTaxonomyId int,
		@ParentId int,
		@FirstParentId int,
		@ObjectTypeId int
	--action ok
	select @FirstParentId = dbo.GetTaxonomyFirstParentId(@Id), @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	--caracteristica actual
	select @IsTaxonomyId = count(*) 
	  from ObjectTaxonomy
            where ObjectId = @ObjectId
	         and ObjectTypeId = @ObjectTypeId
	         and TaxonomyId = @Id
	         and FirstParentId = @FirstParentId
	--caracteristica padre
	select @ParentId = count(TaxonomyId) 
	  from ObjectTaxonomy 
            where ObjectId = @ObjectId
	         and ObjectTypeId = @ObjectTypeId
	         and TaxonomyId in (select TaxonomyId from dbo.GetAllParentWithTaxonomy(@Id))

	--Solo se agrega si la taxonomia actual no esta tildada previamente
	if @IsTaxonomyId = 0
 	   begin		
		--borro padres
		if @ParentId > 0
		begin
			delete
				from ObjectTaxonomy 
				where ObjectId = @ObjectId
				and ObjectTypeId = @ObjectTypeId
				and TaxonomyId in (select TaxonomyId from dbo.GetAllParentWithTaxonomy(@Id))
		end
		--borro hijos
		delete from ObjectTaxonomy 
	             where ObjectId = @ObjectId
		          and ObjectTypeId = @ObjectTypeId
		          and TaxonomyId in (select TaxonomyId 
			                       from dbo.GetAllChildsWithTaxonomy(@Id) 
				              where TaxonomyId != @Id)	
		insert into ObjectTaxonomy (ObjectTypeId, ObjectId, TaxonomyId, FirstParentId) 
       	                            values (@ObjectTypeId, @ObjectId, @Id, @FirstParentId)
	   end
	else
	   begin
	    Print(@IsTaxonomyId)
	    Print(@ParentId)
	   end


GO

/****** Object:  StoredProcedure [dbo].[PermissionByChildObject]    Script Date: 29/12/2011 09:54:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Permission')
										
										Select o.Id, o.Name, o.ObjectId, o.FunctionId 
										  from Permission o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.Id										   

GO

/****** Object:  StoredProcedure [dbo].[PermissionByName]    Script Date: 29/12/2011 09:54:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[PermissionByName]
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
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Permission')

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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Permission t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null))
							
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
							
							SET @Query = 'SELECT Id, Name, ObjectId, FunctionId
							FROM (
							SELECT t.Id, t.Name, t.ObjectId, t.FunctionId , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM Permission t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE ''%' + @Name + '%'' AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[PermissionByNameWithChild]    Script Date: 29/12/2011 09:54:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[PermissionByNameWithChild]
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
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
							declare @RelationObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Permission')
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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Permission t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.Id 
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, ObjectId, FunctionId
							FROM (
							SELECT t.Id, t.Name, t.ObjectId, t.FunctionId , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.Id, t.Name, t.ObjectId, t.FunctionId ) AS RowNumber
							FROM Permission t 
							inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.Id 
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId
							LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					
					

GO

/****** Object:  StoredProcedure [dbo].[PermissionByNameWithParent]    Script Date: 29/12/2011 09:54:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionByNameWithParent]
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
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
							declare @RelationObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Permission')
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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Permission t 
															inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.Id LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null))
								
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, ObjectId, FunctionId
							FROM (
							SELECT t.Id, t.Name, t.ObjectId, t.FunctionId , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.Id, t.Name, t.ObjectId, t.FunctionId ) AS RowNumber
							FROM Permission t 
								inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.Id 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					

GO

/****** Object:  StoredProcedure [dbo].[PermissionByParentObject]    Script Date: 29/12/2011 09:54:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Permission')
										
										Select o.Id, o.Name, o.ObjectId, o.FunctionId 
										  from Permission o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.Id
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[PermissionByText]    Script Date: 29/12/2011 09:54:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[PermissionByText]
								@Text Varchar(128) = '',
								@Taxonomies Varchar(4000) = '',
								@PageCount int = 0,
								@PagePresent int = 1,
								@PageTotal int = 0 OutPut,
								@RowTotal int = 0 OutPut
							--WITH ENCRYPTION
							AS
								set nocount on
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Permission')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT(Id) FROM Permission)
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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Permission t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE  (@Text = '' OR Contains(Name,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, ObjectId, FunctionId
							FROM (
							SELECT t.Id, t.Name, t.ObjectId, t.FunctionId , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.Id, t.Name, t.ObjectId, t.FunctionId ) AS RowNumber
							FROM Permission t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE  (@Text = '' OR Contains(Name,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[PermissionDel]    Script Date: 29/12/2011 09:54:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Permission')
																		
										 Delete 
							  			 from Permission
							 			  where Id = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[PermissionIns]    Script Date: 29/12/2011 09:54:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionIns]
													@Name VarChar(128),							
										 
										 			@ObjectId Int = 0,
										 			@FunctionId Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into Permission (Name, ObjectId,
FunctionId)
										 						 values (@Name, @ObjectId,
@FunctionId)
										
										 exec PermissionSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[PermissionSel]    Script Date: 29/12/2011 09:54:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select Id, Name, ObjectId, FunctionId
							  			 from Permission
							 			  where Id = @Id

GO

/****** Object:  StoredProcedure [dbo].[PermissionUpd]    Script Date: 29/12/2011 09:54:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PermissionUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@ObjectId Int ,
										 			@FunctionId Int 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update Permission set Name = @Name, ObjectId = @ObjectId,
FunctionId = @FunctionId										
										 where Id = @Id										 
										 exec PermissionSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[RazorByChildObject]    Script Date: 29/12/2011 09:54:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Razor')
										
										
										
										Select o.[Id] Id,  Name, o.[SmallComment], o.[Razor], o.[Version], o.[DateCreated], o.[DateModified], o.[RazorType], o.[OutputMimeType] 
										  from [Razor] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[RazorByName]    Script Date: 29/12/2011 09:54:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[RazorByName]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Razor')

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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [Razor] t LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
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
							
							SET @Query = 'SELECT Id, Name, SmallComment, Razor, Version, DateCreated, DateModified, RazorType, OutputMimeType
							FROM (
							SELECT t.[Id] Id,  Name, t.SmallComment, t.Razor, t.Version, t.DateCreated, t.DateModified, t.RazorType, t.OutputMimeType , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM [Razor] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(''' + replace(@Name, '''', '''''') + ''') = 2 or contains(t.*, ''' + replace(@Name, '''', '''''') + ''')) AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[RazorByNameWithChild]    Script Date: 29/12/2011 09:54:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[RazorByNameWithChild]
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
							
							SELECT Id, Name, [SmallComment], [Razor], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]
							FROM (
							SELECT t.[Id] Id,  Name, t.[SmallComment], t.[Razor], t.[Version], t.[DateCreated], t.[DateModified], t.[RazorType], t.[OutputMimeType] , taxo.Id as Taxo,
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
					
					

GO

/****** Object:  StoredProcedure [dbo].[RazorByNameWithParent]    Script Date: 29/12/2011 09:54:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorByNameWithParent]
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
							
							SELECT Id, Name, [SmallComment], [Razor], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]
							FROM (
							SELECT t.[Id] Id,  Name, t.[SmallComment], t.[Razor], t.[Version], t.[DateCreated], t.[DateModified], t.[RazorType], t.[OutputMimeType] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [Razor] t 
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

/****** Object:  StoredProcedure [dbo].[RazorByParentObject]    Script Date: 29/12/2011 09:54:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Razor')
										
										Select o.[Id] Id,  Name, o.[SmallComment], o.[Razor], o.[Version], o.[DateCreated], o.[DateModified], o.[RazorType], o.[OutputMimeType] 
										  from [Razor] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[RazorByText]    Script Date: 29/12/2011 09:54:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[RazorByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Razor')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [Razor])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [Razor] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [SmallComment], [Razor], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]
							FROM (
							SELECT t.[Id] Id,  Name, t.[SmallComment], t.[Razor], t.[Version], t.[DateCreated], t.[DateModified], t.[RazorType], t.[OutputMimeType] , taxo.Id as Taxo,
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

/****** Object:  StoredProcedure [dbo].[RazorDel]    Script Date: 29/12/2011 09:54:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Razor')
																		
										 Delete 
							  			 from Razor
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[RazorIns]    Script Date: 29/12/2011 09:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorIns]
													@Name VarChar(128),							
										 
										 			@SmallComment VarChar (2048) = '',
										 			@Razor Text = '',
										 			@Version VarChar (128) = '',
										 			@DateCreated DateTime = 0,
										 			@DateModified DateTime = 0,
										 			@RazorType VarChar (128) = '',
										 			@OutputMimeType VarChar (128) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [Razor] ( Name, [SmallComment],
[Razor],
[Version],
[DateCreated],
[DateModified],
[RazorType],
[OutputMimeType])
										 						 values (@Name, @SmallComment,
@Razor,
@Version,
@DateCreated,
@DateModified,
@RazorType,
@OutputMimeType)
										
										 exec RazorSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[RazorSel]    Script Date: 29/12/2011 09:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [SmallComment], [Razor], [Version], [DateCreated], [DateModified], [RazorType], [OutputMimeType]
							  			 from [Razor]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[RazorUpd]    Script Date: 29/12/2011 09:54:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RazorUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@SmallComment VarChar (2048),
										 			@Razor  Text,
										 			@Version VarChar (128),
										 			@DateCreated DateTime,
										 			@DateModified DateTime,
										 			@RazorType VarChar (128),
										 			@OutputMimeType VarChar (128)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [Razor] set Name = @Name, [SmallComment] = @SmallComment,
[Razor] = @Razor,
[Version] = @Version,
[DateCreated] = @DateCreated,
[DateModified] = @DateModified,
[RazorType] = @RazorType,
[OutputMimeType] = @OutputMimeType										
										 where [Id] = @Id										 
										 exec RazorSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[RelationAllDel]    Script Date: 29/12/2011 09:54:51 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER OFF
GO



CREATE procedure [dbo].[RelationAllDel] 
	@RelationId int
AS
	delete from RelationValues where RelationId=@RelationId 
	delete from RelationObject where RelationId=@RelationId 


GO

/****** Object:  StoredProcedure [dbo].[RelationAllIns]    Script Date: 29/12/2011 09:54:52 ******/
SET ANSI_NULLS OFF
GO

SET QUOTED_IDENTIFIER OFF
GO



CREATE procedure [dbo].[RelationAllIns]
	@ObjectTypeId int,	
	@ObjectId int,
	@RelationObjectTypeId int,
	@RelationObjectId int
AS
	
	INSERT INTO RelationObject (ObjectTypeId,
	   				         ObjectId,
					         RelationObjectTypeId,
					         RelationObjectId)
				      VALUES (@ObjectTypeId,	
					         @ObjectId,
					         @RelationObjectTypeId,
					         @RelationObjectId)
	exec RelationSel @@Identity


GO

/****** Object:  StoredProcedure [dbo].[RelationByChildObject]    Script Date: 29/12/2011 09:54:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RelationByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Relation')
										
										
										
										Select o.[RelationId] Id, '' Name, o.[ObjectTypeId], o.[ObjectId], o.[RelationObjectTypeId], o.[RelationObjectId] 
										  from [RelationObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[RelationId]
										end

GO

/****** Object:  StoredProcedure [dbo].[RelationByName]    Script Date: 29/12/2011 09:54:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[RelationByName]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Relation')

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

							set @RowTotal = (SELECT COUNT(t.[RelationId]) FROM [RelationObject] t LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
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
							
							SET @Query = 'SELECT Id, Name, ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId
							FROM (
							SELECT t.[RelationId] Id, '''' Name, t.ObjectTypeId, t.ObjectId, t.RelationObjectTypeId, t.RelationObjectId , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM [RelationObject] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
							WHERE (len(''' + replace(@Name, '''', '''''') + ''') = 2 or contains(t.*, ''' + replace(@Name, '''', '''''') + ''')) AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[RelationByNameWithChild]    Script Date: 29/12/2011 09:54:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[RelationByNameWithChild]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Relation')
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

							set @RowTotal = (SELECT COUNT(t.[RelationId]) FROM [RelationObject] t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[RelationId]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId 
								LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
								WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [ObjectTypeId], [ObjectId], [RelationObjectTypeId], [RelationObjectId]
							FROM (
							SELECT t.[RelationId] Id, '' Name, t.[ObjectTypeId], t.[ObjectId], t.[RelationObjectTypeId], t.[RelationObjectId] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[RelationId] ) AS RowNumber
							FROM [RelationObject] t 
							inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[RelationId]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
							WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					
					

GO

/****** Object:  StoredProcedure [dbo].[RelationByNameWithParent]    Script Date: 29/12/2011 09:54:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RelationByNameWithParent]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Relation')
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

							set @RowTotal = (SELECT COUNT(t.[RelationId]) FROM [RelationObject] t 
															inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.[RelationId] 
								   LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId]
								   WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))
								
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [ObjectTypeId], [ObjectId], [RelationObjectTypeId], [RelationObjectId]
							FROM (
							SELECT t.[RelationId] Id, '' Name, t.[ObjectTypeId], t.[ObjectId], t.[RelationObjectTypeId], t.[RelationObjectId] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[RelationId] ) AS RowNumber
							FROM [RelationObject] t 
								inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.[RelationId] 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
							WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					

GO

/****** Object:  StoredProcedure [dbo].[RelationByParentObject]    Script Date: 29/12/2011 09:54:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RelationByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Relation')
										
										Select o.[RelationId] Id, '' Name, o.[ObjectTypeId], o.[ObjectId], o.[RelationObjectTypeId], o.[RelationObjectId] 
										  from [RelationObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[RelationId]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[RelationByText]    Script Date: 29/12/2011 09:54:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[RelationByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Relation')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([RelationId]) FROM [RelationObject])
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

							set @RowTotal = (SELECT COUNT(t.[RelationId]) FROM [RelationObject] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [ObjectTypeId], [ObjectId], [RelationObjectTypeId], [RelationObjectId]
							FROM (
							SELECT t.[RelationId] Id, '' Name, t.[ObjectTypeId], t.[ObjectId], t.[RelationObjectTypeId], t.[RelationObjectId] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[RelationId]  
								) AS RowNumber
							FROM [RelationObject] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[RelationId] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[RelationDel]    Script Date: 29/12/2011 09:54:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RelationDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Relation')
																		
										 Delete 
							  			 from RelationObject
							 			  where [RelationId] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[RelationIns]    Script Date: 29/12/2011 09:54:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


							CREATE Procedure [dbo].[RelationIns]
													@Name VarChar(128) = '',							
										 
										 			@ObjectTypeId Int = 0,
										 			@ObjectId Int = 0,
										 			@RelationObjectTypeId Int = 0,
										 			@RelationObjectId Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [RelationObject] ([ObjectTypeId],
[ObjectId],
[RelationObjectTypeId],
[RelationObjectId])
										 						 values (@ObjectTypeId,
@ObjectId,
@RelationObjectTypeId,
@RelationObjectId)
										
										 exec RelationSel @@Identity 						 


GO

/****** Object:  StoredProcedure [dbo].[RelationNameByObject]    Script Date: 29/12/2011 09:54:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[RelationNameByObject]
 	@ObjectTypeId int,
	@ObjectId int
as
	
	CREATE TABLE #Tmp (RowId int primary key identity(1,1), RelationId int, RelationObjectTypeId int, RelationObjectId int, ObjectTypeName varchar(128), ObjectName varchar(128) )
	INSERT INTO #Tmp select RelationId, RelationObjectTypeId, RelationObjectId, null, null from RelationObject where ObjectTypeId=@ObjectTypeId and ObjectId=@ObjectId
	
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

GO

/****** Object:  StoredProcedure [dbo].[RelationNameParentsByObject]    Script Date: 29/12/2011 09:54:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[RelationNameParentsByObject]
 	@ObjectTypeId int,
	@ObjectId int
as
	
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


GO

/****** Object:  StoredProcedure [dbo].[RelationsByNameSel]    Script Date: 29/12/2011 09:54:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[RelationsByNameSel]
	@ObjectType varchar(50) = null,
	@ObjectId int = null,
	@RelationObjectType varchar(50) = null,
	@RelationObjectId int = null
AS
	Set NoCount ON	
	declare @ObjectTypeId int, 		
		@RelationObjectTypeId int,
		@sql varchar(1000)	
	set @sql = 'select ro.RelationId, ro.ObjectTypeId, oto.Name ObjectType, ro.ObjectId, ro.RelationObjectTypeId, otr.Name RelationObjectType, ro.RelationObjectId
 	  	        from RelationObject ro 
			   inner join Object oto on ro.ObjectTypeId = oto.Id
			   inner join Object otr on ro.RelationObjectTypeId = otr.Id
		     where 1=1 ' 
	if @ObjectType is not null
	   begin
   	      set @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	      set @sql = @sql + ' and ro.ObjectTypeId = ' + cast(@ObjectTypeId as varchar(20))
	   end	           		  
	if @ObjectId is not null
         	      set @sql = @sql + ' and ro.ObjectId = ' + cast(@ObjectId as varchar(20))
	
	if @RelationObjectType is not null
	   begin
	      set @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
         	      set @sql = @sql + ' and ro.RelationObjectTypeId = ' + cast(@RelationObjectTypeId as varchar(20))
	   end	 
	if @RelationObjectId is not null 
         	      set @sql = @sql + ' and ro.RelationObjectId = ' + cast(@RelationObjectId as varchar(20))
	
	
	exec(@sql)


GO

/****** Object:  StoredProcedure [dbo].[RelationsByObjectName]    Script Date: 29/12/2011 09:54:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE procedure [dbo].[RelationsByObjectName]
	@ObjectType varchar(50) = null,
	@ObjectId int = null,
	@RelationObjectType varchar(50) = null,
	@RelationObjectId int = null
AS
	Set NoCount ON	
	declare @ObjectTypeId int, 		
		@RelationObjectTypeId int,
		@sql varchar(1000)	
	set @sql = 'select ro.RelationId, ro.ObjectTypeId, oto.Name ObjectType, ro.ObjectId, ro.RelationObjectTypeId, otr.Name RelationObjectType, ro.RelationObjectId
 	  	        from RelationObject ro 
			   inner join Object oto on ro.ObjectTypeId = oto.Id
			   inner join Object otr on ro.RelationObjectTypeId = otr.Id
		     where 1=1 ' 
	if @ObjectType != null
	   begin
   	      set @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	      set @sql = @sql + ' and ro.ObjectTypeId = ' + cast(@ObjectTypeId as varchar(15))
	   end	           		  
	if @ObjectId != null 
         	      set @sql = @sql + ' and ro.ObjectId = ' + cast(@ObjectId as varchar(15))
	
	if @RelationObjectType != null
	   begin
	      set @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
         	      set @sql = @sql + ' and ro.RelationObjectTypeId = ' + cast(@RelationObjectTypeId as varchar(15))
	   end	 
	if @RelationObjectId != null 
         	      set @sql = @sql + ' and ro.RelationObjectId = ' + cast(@RelationObjectId as varchar(15))
	
	exec(@sql)

GO

/****** Object:  StoredProcedure [dbo].[RelationsByRelationDel]    Script Date: 29/12/2011 09:54:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE procedure [dbo].[RelationsByRelationDel]
	@RelationObjectTypeId int,
	@RelationObjectId int
as
	
	delete from RelationValues where RelationId in (select RelationId from RelationObject where  RelationObjectTypeId = @RelationObjectTypeId and RelationObjectId= @RelationObjectId)
	delete from RelationObject where RelationObjectTypeId = @RelationObjectTypeId and RelationObjectId= @RelationObjectId


GO

/****** Object:  StoredProcedure [dbo].[RelationSel]    Script Date: 29/12/2011 09:54:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RelationSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [RelationId] Id, '' Name, [ObjectTypeId], [ObjectId], [RelationObjectTypeId], [RelationObjectId]
							  			 from [RelationObject]
							 			  where [RelationId] = @Id

GO

/****** Object:  StoredProcedure [dbo].[RelationSelByObject]    Script Date: 29/12/2011 09:54:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[RelationSelByObject] 
	@ObjectType varchar(50),
	@ObjectId int,
	@RelationObjectType varchar(50),
	@RelationObjectId int
AS
	declare @ObjectTypeId int
	declare @RelationObjectTypeId int
	select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	select @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
	Select r.RelationId, r.ObjectTypeId, o.name ObjectType, r.ObjectId, r.RelationObjectTypeId, oRelac.name RelationObjectType, r.RelationObjectId
	  from RelationObject r 
	       inner join Object o on r.ObjectTypeId = o.Id
	       inner join Object oRelac on r.RelationObjectTypeId = oRelac.Id
	 where r.ObjectTypeId = @ObjectTypeId
	       and r.ObjectId = @ObjectId
	       and r.RelationObjectTypeId = @RelationObjectTypeId
	       and r.RelationObjectId = @RelationObjectId


GO

/****** Object:  StoredProcedure [dbo].[RelationSelByObjects]    Script Date: 29/12/2011 09:54:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[RelationSelByObjects]
	@ObjectType varchar(50),
	@ObjectId int,
	@RelationObjectType varchar(50),
	@RelationObjectId int
AS
	declare @ObjectTypeId int
	declare @RelationObjectTypeId int
	select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	select @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
	Select r.RelationId, r.ObjectTypeId, o.name ObjectType, r.ObjectId, r.RelationObjectTypeId, oRelac.name RelationObjectType, r.RelationObjectId
	  from RelationObject r 
	       inner join Object o on r.ObjectTypeId = o.Id
	       inner join Object oRelac on r.RelationObjectTypeId = oRelac.Id
	 where r.ObjectTypeId = @ObjectTypeId
	       and r.ObjectId = @ObjectId
	       and r.RelationObjectTypeId = @RelationObjectTypeId
	       and r.RelationObjectId = @RelationObjectId


GO

/****** Object:  StoredProcedure [dbo].[RelationUpd]    Script Date: 29/12/2011 09:54:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


							CREATE Procedure [dbo].[RelationUpd]
										 @Id Int,
										 @Name VarChar(128) = '',
										 
										 			@ObjectTypeId Int,
										 			@ObjectId Int,
										 			@RelationObjectTypeId Int,
										 			@RelationObjectId Int
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [RelationObject] set [ObjectTypeId] = @ObjectTypeId,
[ObjectId] = @ObjectId,
[RelationObjectTypeId] = @RelationObjectTypeId,
[RelationObjectId] = @RelationObjectId										
										 where [RelationId] = @Id										 
										 exec RelationSel @Id 						 


GO

/****** Object:  StoredProcedure [dbo].[RelationValueDel]    Script Date: 29/12/2011 09:54:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[RelationValueDel]
	@RelationValueId int
AS
	delete from RelationValues
   	        where RelationValueId = @RelationValueId


GO

/****** Object:  StoredProcedure [dbo].[RelationValueIns]    Script Date: 29/12/2011 09:54:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE procedure [dbo].[RelationValueIns]
	@RelationId int,	
	@RelationType varchar(50),
	@ValueType varchar(50),
	@Value varchar(50)
AS
	INSERT INTO RelationValues (RelationId,
	   			      RelationType,
				      ValueType,
				      Value)
			      VALUES (@RelationId,	
				      @RelationType,
				      @ValueType,
				      @Value)
	exec RelationValueSel @@Identity


GO

/****** Object:  StoredProcedure [dbo].[RelationValuesByObjects]    Script Date: 29/12/2011 09:54:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[RelationValuesByObjects]
	@ObjectType varchar(50),
	@ObjectId int,
	@RelationObjectType varchar(50),
	@RelationObjectId int
AS
	declare @ObjectTypeId int
	declare @RelationObjectTypeId int
	select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
	select @RelationObjectTypeId = dbo.GetObjectId(@RelationObjectType)
	select V.RelationValueId, V.RelationType, V.ValueType, V.Value 
	  from RelationValues V 
	       inner join RelationObject O
		       on V.RelationId = O.RelationId
	where O.ObjectTypeId = @ObjectTypeId
	      and O.ObjectId = @ObjectId
	      and O.RelationObjectTypeId = @RelationObjectTypeId
	      and O.RelationObjectId = @RelationObjectId


GO

/****** Object:  StoredProcedure [dbo].[RelationValuesByRelation]    Script Date: 29/12/2011 09:54:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[RelationValuesByRelation]
	@RelationId int
as
	select RelationValueId, RelationType, ValueType, Value from RelationValues where RelationId = @RelationId


GO

/****** Object:  StoredProcedure [dbo].[RelationValueSel]    Script Date: 29/12/2011 09:54:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[RelationValueSel] 
	@RelationValueId int
AS
	 Select v.RelationValueId, v.RelationId, v.RelationType, v.ValueType
	    from RelationValues v 
	 where RelationValueId = @RelationValueId


GO

/****** Object:  StoredProcedure [dbo].[RelationValueUpd]    Script Date: 29/12/2011 09:54:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE procedure [dbo].[RelationValueUpd]
	@RelationValueId int,
	@RelationId int,	
	@RelationType varchar(50),
	@ValueType varchar(50),
	@Value varchar(50)
AS
	update RelationValues set RelationId = @RelationId,
				      RelationType = @RelationType,
				      ValueType = @ValueType,
				      Value = @Value
			        where RelationValueId = @RelationValueId
	--exec RelationValueSel @RelationValueId


GO

/****** Object:  StoredProcedure [dbo].[RoleByChildObject]    Script Date: 29/12/2011 09:54:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Role')
										
										Select o.Id, o.Name, o.Tag1 
										  from Role o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.Id										   

GO

/****** Object:  StoredProcedure [dbo].[RoleByName]    Script Date: 29/12/2011 09:54:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[RoleByName]
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
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Role')

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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Role t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null))
							
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
							
							SET @Query = 'SELECT Id, Name, Tag1
							FROM (
							SELECT t.Id, t.Name, t.Tag1 , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM Role t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE ''%' + @Name + '%'' AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[RoleByNameWithChild]    Script Date: 29/12/2011 09:54:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[RoleByNameWithChild]
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
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
							declare @RelationObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Role')
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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Role t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.Id 
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, Tag1
							FROM (
							SELECT t.Id, t.Name, t.Tag1 , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.Id, t.Name, t.Tag1 ) AS RowNumber
							FROM Role t 
							inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.Id 
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId
							LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					
					

GO

/****** Object:  StoredProcedure [dbo].[RoleByNameWithParent]    Script Date: 29/12/2011 09:54:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleByNameWithParent]
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
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
							declare @RelationObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Role')
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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Role t 
															inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.Id LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null))
								
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, Tag1
							FROM (
							SELECT t.Id, t.Name, t.Tag1 , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.Id, t.Name, t.Tag1 ) AS RowNumber
							FROM Role t 
								inner join RelationObject r 
              			           on r.ObjectTypeId = @RelationObjectTypeId 
              				       and r.ObjectId = @ObjectId
              				       and r.RelationObjectTypeId = @ObjectTypeId 
              				       and r.RelationObjectId = t.Id 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE Name LIKE '%' + @Name + '%' AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
					

GO

/****** Object:  StoredProcedure [dbo].[RoleByParentObject]    Script Date: 29/12/2011 09:54:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Role')
										
										Select o.Id, o.Name, o.Tag1 
										  from Role o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.Id
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[RoleByText]    Script Date: 29/12/2011 09:54:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[RoleByText]
								@Text Varchar(128) = '',
								@Taxonomies Varchar(4000) = '',
								@PageCount int = 0,
								@PagePresent int = 1,
								@PageTotal int = 0 OutPut,
								@RowTotal int = 0 OutPut
							--WITH ENCRYPTION
							AS
								set nocount on
								
								
								
							declare @From int
							declare @Even int
							declare @sql Varchar(8000) 
							declare @ObjectTypeId int
															
							select @ObjectTypeId = dbo.GetObjectId('Role')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT(Id) FROM Role)
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

							set @RowTotal = (SELECT COUNT(t.Id) FROM Role t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE  (@Text = '' OR Contains(Name,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, Tag1
							FROM (
							SELECT t.Id, t.Name, t.Tag1 , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.Id, t.Name, t.Tag1 ) AS RowNumber
							FROM Role t LEFT JOIN #Taxo taxo ON taxo.Id = t.Id WHERE  (@Text = '' OR Contains(Name,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[RoleDel]    Script Date: 29/12/2011 09:54:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Role')
																		
										 Delete 
							  			 from Role
							 			  where Id = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[RoleIns]    Script Date: 29/12/2011 09:54:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleIns]
													@Name VarChar(128),							
										 
										 			@Tag1 VarChar (25) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into Role (Name, Tag1)
										 						 values (@Name, @Tag1)
										
										 exec RoleSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[RoleSel]    Script Date: 29/12/2011 09:54:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select Id, Name, Tag1
							  			 from Role
							 			  where Id = @Id

GO

/****** Object:  StoredProcedure [dbo].[RoleUpd]    Script Date: 29/12/2011 09:55:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[RoleUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@Tag1 VarChar (25)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update Role set Name = @Name, Tag1 = @Tag1										
										 where Id = @Id										 
										 exec RoleSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[SearchIdByName]    Script Date: 29/12/2011 09:55:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SearchIdByName] (@Name varchar(256))
as begin
set nocount on
select Id from SearchObject where Name = @Name;
end
GO

/****** Object:  StoredProcedure [dbo].[SearchObjectByChildObject]    Script Date: 29/12/2011 09:55:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectByChildObject]
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
										
										
										
										Select o.[Id] Id, Name , o.[ObjectTypeId], o.[Content], o.[SearchType], o.[IdProperty], o.[TokenProperty] 
										  from [SearchObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[SearchObjectByName]    Script Date: 29/12/2011 09:55:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[SearchObjectByName]
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
							
							SET @Query = 'SELECT Id, Name , ObjectTypeId, Content, SearchType, IdProperty, TokenProperty
							FROM (
							SELECT t.[Id] Id, Name , t.ObjectTypeId, t.Content, t.SearchType, t.IdProperty, t.TokenProperty , taxo.Id as Taxo,
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

/****** Object:  StoredProcedure [dbo].[SearchObjectByNameWithChild]    Script Date: 29/12/2011 09:55:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[SearchObjectByNameWithChild]
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
							
							SELECT Id, Name , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty]
							FROM (
							SELECT t.[Id] Id,  Name , t.[ObjectTypeId], t.[Content], t.[SearchType], t.[IdProperty], t.[TokenProperty] , taxo.Id as Taxo,
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

/****** Object:  StoredProcedure [dbo].[SearchObjectByNameWithParent]    Script Date: 29/12/2011 09:55:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectByNameWithParent]
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
							
							SELECT Id, Name , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty]
							FROM (
							SELECT t.[Id] Id,  Name , t.[ObjectTypeId], t.[Content], t.[SearchType], t.[IdProperty], t.[TokenProperty] , taxo.Id as Taxo,
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

/****** Object:  StoredProcedure [dbo].[SearchObjectByParentObject]    Script Date: 29/12/2011 09:55:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('SearchObject')
										
										Select o.[Id] Id,  Name , o.[ObjectTypeId], o.[Content], o.[SearchType], o.[IdProperty], o.[TokenProperty] 
										  from [SearchObject] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[SearchObjectByText]    Script Date: 29/12/2011 09:55:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[SearchObjectByText]
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
							
							SELECT Id, Name , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty]
							FROM (
							SELECT t.[Id] Id,  Name , t.[ObjectTypeId], t.[Content], t.[SearchType], t.[IdProperty], t.[TokenProperty] , taxo.Id as Taxo,
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

/****** Object:  StoredProcedure [dbo].[SearchObjectDel]    Script Date: 29/12/2011 09:55:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectDel]
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

/****** Object:  StoredProcedure [dbo].[SearchObjectIns]    Script Date: 29/12/2011 09:55:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectIns]
													@Name VarChar(128)		
										 ,
										 			@ObjectTypeId Int = 0,
										 			@Content VarChar (max) = '',
										 			@SearchType VarChar (256) = '',
										 			@IdProperty VarChar (256) = '',
										 			@TokenProperty VarChar (256) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [SearchObject] ( Name ,[ObjectTypeId],[Content],[SearchType],[IdProperty],[TokenProperty])
										 						 values (@Name , @ObjectTypeId, @Content, @SearchType, @IdProperty, @TokenProperty)
										
										 exec SearchObjectSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[SearchObjectSel]    Script Date: 29/12/2011 09:55:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [ObjectTypeId], [Content], [SearchType], [IdProperty], [TokenProperty]
							  			 from [SearchObject]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[SearchObjectUpd]    Script Date: 29/12/2011 09:55:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SearchObjectUpd]
										 @Id Int,
										 @Name VarChar(128)
										 ,
										 			@ObjectTypeId Int,
										 			@Content VarChar (max),
										 			@SearchType VarChar (256),
										 			@IdProperty VarChar (256),
										 			@TokenProperty VarChar (256)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [SearchObject] set Name = @Name ,[ObjectTypeId] = @ObjectTypeId,[Content] = @Content,[SearchType] = @SearchType,[IdProperty] = @IdProperty,[TokenProperty] = @TokenProperty										
										 where [Id] = @Id										 
										 exec SearchObjectSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Application_Create]    Script Date: 29/12/2011 09:55:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Application_Create]
	@Name VARCHAR(128),
	@RequestURI VARCHAR(500),
	@UserAccount INT
AS
	SET NOCOUNT ON
	
	DECLARE @Id INT
	INSERT INTO [Application] (Name, RequestURI, ClientId, ClientSecret, UserAccount)
					   VALUES (@Name, @RequestURI, NEWID(), NEWID(), @UserAccount)
					   
	SET @Id = SCOPE_IDENTITY()
	
	SELECT Name, RequestURI, ClientId, ClientSecret, UserAccount FROM [Application] WHERE Id = @Id 					   

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Application_GetImpersonateUserAccountId]    Script Date: 29/12/2011 09:55:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Application_GetImpersonateUserAccountId]
	@ClientId VARCHAR(200)
AS
	SET NOCOUNT ON
	
	SELECT UserAccount FROM [Application] WHERE ClientId = @ClientId		

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Application_GetRequestURI]    Script Date: 29/12/2011 09:55:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Application_GetRequestURI]
	@ClientId VARCHAR(200)
AS
	SET NOCOUNT ON
	
	SELECT RequestURI FROM [Application] WHERE ClientId = @ClientId		

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_CreateToken]    Script Date: 29/12/2011 09:55:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_CreateToken]    
 @ClientId VARCHAR(200),    
 @UserId VARCHAR(200),  
 @UserData VARCHAR(MAX)   
AS    
 SET NOCOUNT ON    
     
 --VALID APPLICATION    
 DECLARE @ValidApplication INT    
 SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId    
     
 --CREATE TOKEN    
 IF @ValidApplication = 1      
 BEGIN
	 DELETE FROM Token WHERE ClientId = @ClientId and UserId = @UserId
	 INSERT INTO Token (ClientId, UserId, Code, AccessToken, UserData)    
		  VALUES (@ClientId, @UserId, NEWID(), NEWID(), @UserData)    
 END
        
 --RETURN CODE  
 SELECT Code FROM Token WHERE ClientId = @ClientId AND UserId = @UserId    
GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_GetAccessToken]    Script Date: 29/12/2011 09:55:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_GetAccessToken]
	@ClientId VARCHAR(200),
	@ClientSecret VARCHAR(500),
	@Code VARCHAR(500)
AS
	SET NOCOUNT ON
	
	--Valid Application
	DECLARE @ValidApplication INT
	SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId AND ClientSecret = @ClientSecret
	
	--Return AccessToken
	DECLARE @AccessToken VARCHAR(500)
	SET @AccessToken = ''
	
	IF @ValidApplication = 1	
		SELECT @AccessToken = AccessToken FROM Token WHERE ClientId = @ClientId AND Code = @Code
	
	SELECT @AccessToken

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_GetClientIdForAccessToken]    Script Date: 29/12/2011 09:55:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_GetClientIdForAccessToken]
 @AccessToken VARCHAR(500)  
AS  
 SET NOCOUNT ON  
   
 SELECT ClientId FROM Token WHERE AccessToken = @AccessToken  
GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_GetCode]    Script Date: 29/12/2011 09:55:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_GetCode]
	@ClientId VARCHAR(200),
	@UserId VARCHAR(200)
AS
	SET NOCOUNT ON
	
	--Valid Application
	DECLARE @ValidApplication INT
	SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId
		
	IF @ValidApplication = 1			
		SELECT Code FROM Token WHERE ClientId = @ClientId AND UserId = @UserId	

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_GetUserDataForAccessToken]    Script Date: 29/12/2011 09:55:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_GetUserDataForAccessToken]   
 @AccessToken VARCHAR(500)  
AS  
 SET NOCOUNT ON  
   
 SELECT UserData FROM Token WHERE AccessToken = @AccessToken  
GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_GetUserIdForAccessToken]    Script Date: 29/12/2011 09:55:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_GetUserIdForAccessToken]	
	@AccessToken VARCHAR(500)
AS
	SET NOCOUNT ON
	
	SELECT UserId FROM Token WHERE AccessToken = @AccessToken

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_RenewAccessToken]    Script Date: 29/12/2011 09:55:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_RenewAccessToken]
	@ClientId VARCHAR(200),
	@ClientSecret VARCHAR(500),
	@Code VARCHAR(500)
AS
	SET NOCOUNT ON
	
	--Valid Application
	DECLARE @ValidApplication INT
	SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId AND ClientSecret = @ClientSecret
	
	--Return AccessToken
	DECLARE @AccessToken VARCHAR(500)
	SET @AccessToken = ''
	
	IF @ValidApplication = 1	
	BEGIN
		--RENEW ACCESSTOKEN		
		UPDATE Token SET AccessToken = NEWID() WHERE ClientId = @ClientId AND Code = @Code
		
		--GET ACCESSTOKEN
		SELECT @AccessToken = AccessToken FROM Token WHERE ClientId = @ClientId AND Code = @Code
	END
	
	SELECT @AccessToken

GO

/****** Object:  StoredProcedure [dbo].[Slbf_Token_SetUserData]    Script Date: 29/12/2011 09:55:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Slbf_Token_SetUserData]
 @AccessToken VARCHAR(500),
 @UserData VARCHAR(MAX)	
AS
	SET NOCOUNT ON
	
	UPDATE Token set UserData = @UserData where AccessToken = @AccessToken

GO

/****** Object:  StoredProcedure [dbo].[SoftGuard_FrameworkAuditSet]    Script Date: 29/12/2011 09:55:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SoftGuard_FrameworkAuditSet]      
 @UserId int,      
 @ObjectTypeId int,      
 @ObjectId int,      
 @FunctionName varchar(25),      
 @Xml varchar(max) = null,  
 @Token varchar(500)     
AS            
    
 SET NOCOUNT ON    
     
 DECLARE @ObjectName VARCHAR(64)    
 SELECT @ObjectName = Name FROM [Object] WHERE Id = @ObjectTypeId    
      
 DECLARE @FunctionId INT      
 SELECT @FunctionId = Id FROM [Function] WHERE Name = @FunctionName      
           
 DECLARE @Audit INT      
 SELECT @Audit = isnull(Audit, 0) FROM Permission WHERE ObjectId = @ObjectTypeId and FunctionId = @FunctionId      
       
 IF @Audit <> 0      
 BEGIN      
  --INSERT AUDIT  
  DECLARE @AuditDate DATETIME      
  SELECT @AuditDate = getdate()      
    
  DECLARE @AuditId INT  
       
  INSERT INTO FrameworkAudit (UserId, ObjectTypeId, ObjectId, ObjectName, FunctionId, AuditDate, [Xml])       
               VALUES (@UserId, @ObjectTypeId, @ObjectId, @ObjectName, @FunctionId, @AuditDate, @Xml)   
                 
  SET @AuditId = SCOPE_IDENTITY()  
    
  --INSERT AUDIT EXTENT  
  DECLARE @UserName VARCHAR(200)  
  SELECT @UserName = UserId FROM Token WHERE AccessToken = @Token  
    
  INSERT INTO FrameworkAuditExtend (Id, UserName, ParentObjectTypeId, ParentObjectId)  
       VALUES (@AuditId, @UserName, 0, 0)  
 END    
GO

/****** Object:  StoredProcedure [dbo].[TaxonomyDel]    Script Date: 29/12/2011 09:55:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO



CREATE  Procedure [dbo].[TaxonomyDel]
       @Id int
AS
declare @ChildCount int
       Select @ChildCount = count(*) from dbo.GetAllChildsWithTaxonomy(@Id)
       if(@ChildCount > 1)
          begin
	      RAISERROR ('The Taxonomy is not delete', 16, 1)
	      return
          end
       else
          begin
	       delete from TaxonomyValue where Id = @Id
	       delete from TaxonomyTree where ParentId = @Id or ChildId = @Id	
	       delete from ObjectTaxonomy where TaxonomyId = @Id
          end


GO

/****** Object:  StoredProcedure [dbo].[TaxonomyDeleteParentObjectTaxonomy]    Script Date: 29/12/2011 09:55:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[TaxonomyDeleteParentObjectTaxonomy]
	-- Add the parameters for the stored procedure here
	@ObjectTypeId int,
	@ObjectId int
AS
BEGIN
	SET NOCOUNT ON;
print 'start'
--	DECLARE @otworking TABLE 

	create table #otworking 
	(RowNum int primary key identity(1,1)
		,Id int
		,ObjectTypeId int
		,ObjectId int
		,TaxonomyId int
		,FirstParentId int
	)

	--Por cada Tilde del person
	insert into #otworking (Id, ObjectTypeId, ObjectId, TaxonomyId, FirstParentId)
    select Id, ObjectTypeId, ObjectId, TaxonomyId, FirstParentId from objecttaxonomy where objecttypeid = @ObjectTypeId and ObjectId = @ObjectId



	declare @RowCount int
	select @RowCount = count(*) from #otworking
	declare @RowCurrent int 
	set @RowCurrent = 0
print 'RowCount: ' + cast(@RowCount as varchar(10))

	declare @CurrentParentId int
	declare @TaxonomyId int
	declare @ParentTaxonomyId int

	while(@RowCurrent < @RowCount)
	begin
		set @RowCurrent = @RowCurrent + 1;

		select @TaxonomyId = TaxonomyId from #otworking where rownum = @RowCurrent
		print 'TaxonomyId: ' + cast(@TaxonomyId as varchar(10))
		select @ParentTaxonomyId = ParentId from taxonomies where id = @TaxonomyId
		--Ciclamos los padres del taxonomy (recursivo) eliminando sus tildes
		while(@ParentTaxonomyId != 0)
		begin
			print cast(getdate() as varchar(55)) +  'ParentTaxonomyId: ' + cast(@ParentTaxonomyId as varchar(10))
			delete from objecttaxonomy 
				where taxonomyid = @ParentTaxonomyId 
				and ObjectTypeId = @ObjectTypeId
				and ObjectId = @ObjectId

			set @TaxonomyId = @ParentTaxonomyId
			select @ParentTaxonomyId = ParentId from taxonomies where id = @TaxonomyId
		end

	end

	drop table #otworking
END


GO

/****** Object:  StoredProcedure [dbo].[TaxonomyDelRecursive]    Script Date: 29/12/2011 09:55:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE  Procedure [dbo].[TaxonomyDelRecursive]
       @Id int
	,@justchilds int --0 false, 1 true
AS

--print 'Processing ' + cast(@id as varchar(5))

create table #childs (rownum int primary key identity (1,1), Id int, TaxonomyId int)
insert into #childs (Id, TaxonomyId)
Select * from dbo.GetAllChildsWithTaxonomy(@Id) where taxonomyid != @Id
  
       declare @ChildCount int

       Select @ChildCount = count(*) from #childs
       if(@ChildCount > 1)
	begin

		declare @currentnum int
		declare @currentid int

		set @currentnum = 0

		while(@currentnum < @ChildCount)
		begin
			set @currentnum = @currentnum + 1

			select @currentid = Taxonomyid from #childs where rownum = @currentnum

			exec TaxonomyDelRecursive @currentid, 0
		end
	end

--print 'JustChilds' + cast(@justchilds as varchar(1))
	if @justchilds <> 1
	begin
		delete from TaxonomyValue where Id = @Id
		delete from TaxonomyTree where ParentId = @Id or ChildId = @Id	
		delete from ObjectTaxonomy where TaxonomyId = @Id
		delete from SyncRelations where ObjectId = @Id and Class in ('categoria', 'rubro', 'subrubro')
	end


GO

/****** Object:  StoredProcedure [dbo].[TaxonomyIns]    Script Date: 29/12/2011 09:55:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE  Procedure [dbo].[TaxonomyIns]
       @Name varchar(150),
       @ParentId int
AS
       declare @Id int
	
       insert into TaxonomyValue (Name) 
                          values (@Name)
       set @Id = @@Identity
       insert into TaxonomyTree (ParentId, ChildId) values (@ParentId, @Id)
       exec TaxonomySel @Id


GO

/****** Object:  StoredProcedure [dbo].[TaxonomySel]    Script Date: 29/12/2011 09:55:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE  Procedure [dbo].[TaxonomySel]
       @Id int
AS
	select Id
	       ,Name
	       ,ParentId
	       ,0
	       ,0
	  from Taxonomies
         where Id = @Id


GO

/****** Object:  StoredProcedure [dbo].[TaxonomySelByTaxonomy]    Script Date: 29/12/2011 09:55:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create PROCEDURE [dbo].[TaxonomySelByTaxonomy]
	@Id int
AS
	if @Id = 0
		select Value.Id, Value.Name, Tree.ParentId
	          from TaxonomyValue Value
			inner join TaxonomyTree Tree on Value.Id = Tree.ChildId

	if @Id != 0
		select Value.Id, Value.Name, Tree.ParentId
	          from TaxonomyValue Value
			inner join TaxonomyTree Tree on Value.Id = Tree.ChildId
		 where Value.Id in (select TaxonomyId from dbo.GetTaxonomyChilds(@Id))



GO

/****** Object:  StoredProcedure [dbo].[TaxonomySelFirstChilds]    Script Date: 29/12/2011 09:55:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[TaxonomySelFirstChilds] @TaxonomyId INT
AS
SELECT * FROM Taxonomies WHERE ParentId = @TaxonomyId


GO

/****** Object:  StoredProcedure [dbo].[TaxonomySelForChecked]    Script Date: 29/12/2011 09:55:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[TaxonomySelForChecked]
	@ObjectTypeId int
,	@ObjectId int
as
	select TaxonomyId
	from ObjectTaxonomy
	where ObjectTypeId = @ObjectTypeId
	and ObjectId = @ObjectId

GO

/****** Object:  StoredProcedure [dbo].[TaxonomyUpd]    Script Date: 29/12/2011 09:55:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO


CREATE  Procedure [dbo].[TaxonomyUpd]
       @Id int,
       @Name varchar(150),
       @ParentId int
AS
       set nocount on
       update TaxonomyValue set Name = @Name
			   where Id = @Id
       update TaxonomyTree set ParentId = @ParentId, 
			 ChildId = @Id
		    where ChildId = @Id or (ParentId = @Id and ChildId = 0)
       exec TaxonomySel @Id


GO

/****** Object:  StoredProcedure [dbo].[UIApplicationByChildObject]    Script Date: 29/12/2011 09:55:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('UIApplication')
										
										
										
										Select o.[Id] Id,  Name, o.[MenuName], o.[Icon], o.[SmallComment], o.[Description], o.[RazorTemplateId], o.[Viewport] 
										  from [UIApplication] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[UIApplicationByName]    Script Date: 29/12/2011 09:55:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[UIApplicationByName]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UIApplication')

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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UIApplication] t LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
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
							
							SET @Query = 'SELECT Id, Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport
							FROM (
							SELECT t.[Id] Id,  Name, t.MenuName, t.Icon, t.SmallComment, t.Description, t.RazorTemplateId, t.Viewport , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM [UIApplication] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(''' + replace(@Name, '''', '''''') + ''') = 2 or contains(t.*, ''' + replace(@Name, '''', '''''') + ''')) AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[UIApplicationByNameWithChild]    Script Date: 29/12/2011 09:55:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[UIApplicationByNameWithChild]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UIApplication')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UIApplication] t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId 
								LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
								WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [MenuName], [Icon], [SmallComment], [Description], [RazorTemplateId], [Viewport]
							FROM (
							SELECT t.[Id] Id,  Name, t.[MenuName], t.[Icon], t.[SmallComment], t.[Description], t.[RazorTemplateId], t.[Viewport] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [UIApplication] t 
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

/****** Object:  StoredProcedure [dbo].[UIApplicationByNameWithParent]    Script Date: 29/12/2011 09:55:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationByNameWithParent]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UIApplication')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UIApplication] t 
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
							
							SELECT Id, Name, [MenuName], [Icon], [SmallComment], [Description], [RazorTemplateId], [Viewport]
							FROM (
							SELECT t.[Id] Id,  Name, t.[MenuName], t.[Icon], t.[SmallComment], t.[Description], t.[RazorTemplateId], t.[Viewport] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [UIApplication] t 
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

/****** Object:  StoredProcedure [dbo].[UIApplicationByParentObject]    Script Date: 29/12/2011 09:55:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('UIApplication')
										
										Select o.[Id] Id,  Name, o.[MenuName], o.[Icon], o.[SmallComment], o.[Description], o.[RazorTemplateId], o.[Viewport] 
										  from [UIApplication] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[UIApplicationByText]    Script Date: 29/12/2011 09:55:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[UIApplicationByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UIApplication')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [UIApplication])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UIApplication] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [MenuName], [Icon], [SmallComment], [Description], [RazorTemplateId], [Viewport]
							FROM (
							SELECT t.[Id] Id,  Name, t.[MenuName], t.[Icon], t.[SmallComment], t.[Description], t.[RazorTemplateId], t.[Viewport] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM [UIApplication] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														
GO

/****** Object:  StoredProcedure [dbo].[UIApplicationDel]    Script Date: 29/12/2011 09:55:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('UIApplication')
																		
										 Delete 
							  			 from UIApplication
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[UIApplicationIns]    Script Date: 29/12/2011 09:55:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationIns]
													@Name VarChar(128),							
										 
										 			@MenuName VarChar (256) = '',
										 			@Icon VarChar (256) = '',
										 			@SmallComment VarChar (2048) = '',
										 			@Description Text = '',
										 			@RazorTemplateId Int = 0,
										 			@Viewport VarChar (256) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [UIApplication] ( Name, [MenuName],
[Icon],
[SmallComment],
[Description],
[RazorTemplateId],
[Viewport])
										 						 values (@Name, @MenuName,
@Icon,
@SmallComment,
@Description,
@RazorTemplateId,
@Viewport)
										
										 exec UIApplicationSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[UIApplicationSel]    Script Date: 29/12/2011 09:55:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [MenuName], [Icon], [SmallComment], [Description], [RazorTemplateId], [Viewport]
							  			 from [UIApplication]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[UIApplicationUpd]    Script Date: 29/12/2011 09:55:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UIApplicationUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@MenuName VarChar (256),
										 			@Icon VarChar (256),
										 			@SmallComment VarChar (2048),
										 			@Description  Text,
										 			@RazorTemplateId Int,
										 			@Viewport VarChar (256)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [UIApplication] set Name = @Name, [MenuName] = @MenuName,
[Icon] = @Icon,
[SmallComment] = @SmallComment,
[Description] = @Description,
[RazorTemplateId] = @RazorTemplateId,
[Viewport] = @Viewport										
										 where [Id] = @Id										 
										 exec UIApplicationSel @Id 						 

GO

/****** Object:  StoredProcedure [dbo].[UserAccountByChildObject]    Script Date: 29/12/2011 09:55:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('UserAccount')
										
										
										
										Select o.[Id] Id,  Name, o.[Password], o.[FirstName], o.[LastName], o.[Email], o.[Organization], o.[Phone], o.[Extention], o.[WorkPlace], o.[Status] 
										  from [UserAccount] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[UserAccountByName]    Script Date: 29/12/2011 09:55:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[UserAccountByName]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UserAccount')

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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UserAccount] t LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
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
							
							SET @Query = 'SELECT Id, Name, Password, FirstName, LastName, Email, Organization, Phone, Extention, WorkPlace, Status
							FROM (
							SELECT t.[Id] Id,  Name, t.Password, t.FirstName, t.LastName, t.Email, t.Organization, t.Phone, t.Extention, t.WorkPlace, t.Status , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.' + @OrderBy + ' ) AS RowNumber
							FROM [UserAccount] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (len(''' + replace(@Name, '''', '''''') + ''') = 2 or contains(t.*, ''' + replace(@Name, '''', '''''') + ''')) AND (''' + @Taxonomies + ''' = '''' OR  taxo.Id is not null)) tt
							WHERE RowNumber > ' + CAST(@From as varchar) + '  
							AND RowNumber < ' + CAST(@Even as VARCHAR) 

							EXEC(@Query)
						
							drop Table #Taxo
															


GO

/****** Object:  StoredProcedure [dbo].[UserAccountByNameWithChild]    Script Date: 29/12/2011 09:55:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

              Create Procedure [dbo].[UserAccountByNameWithChild]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UserAccount')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UserAccount] t 
								inner join RelationObject r on r.ObjectTypeId = @ObjectTypeId
              				    and r.ObjectId = t.[Id]
              				    and r.RelationObjectTypeId = @RelationObjectTypeId
              				    and r.RelationObjectId = @ObjectId 
								LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
								WHERE (len(@Name) = 2 or contains(t.*, @Name)) AND (@Taxonomies = '' OR  taxo.Id is not null))

							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [Password], [FirstName], [LastName], [Email], [Organization], [Phone], [Extention], [WorkPlace], [Status]
							FROM (
							SELECT t.[Id] Id,  Name, t.[Password], t.[FirstName], t.[LastName], t.[Email], t.[Organization], t.[Phone], t.[Extention], t.[WorkPlace], t.[Status] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [UserAccount] t 
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

/****** Object:  StoredProcedure [dbo].[UserAccountByNameWithParent]    Script Date: 29/12/2011 09:55:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountByNameWithParent]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UserAccount')
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UserAccount] t 
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
							
							SELECT Id, Name, [Password], [FirstName], [LastName], [Email], [Organization], [Phone], [Extention], [WorkPlace], [Status]
							FROM (
							SELECT t.[Id] Id,  Name, t.[Password], t.[FirstName], t.[LastName], t.[Email], t.[Organization], t.[Phone], t.[Extention], t.[WorkPlace], t.[Status] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id] ) AS RowNumber
							FROM [UserAccount] t 
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

/****** Object:  StoredProcedure [dbo].[UserAccountByParentObject]    Script Date: 29/12/2011 09:55:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountByParentObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('UserAccount')
										
										Select o.[Id] Id,  Name, o.[Password], o.[FirstName], o.[LastName], o.[Email], o.[Organization], o.[Phone], o.[Extention], o.[WorkPlace], o.[Status] 
										  from [UserAccount] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[Id]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id										   

GO

/****** Object:  StoredProcedure [dbo].[UserAccountByText]    Script Date: 29/12/2011 09:55:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[UserAccountByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('UserAccount')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [UserAccount])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [UserAccount] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text )))
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [Password], [FirstName], [LastName], [Email], [Organization], [Phone], [Extention], [WorkPlace], [Status]
							FROM (
							SELECT t.[Id] Id,  Name, t.[Password], t.[FirstName], t.[LastName], t.[Email], t.[Organization], t.[Phone], t.[Extention], t.[WorkPlace], t.[Status] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM [UserAccount] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE  (len(@Text) = 2 OR Contains(t.*,  @Text ))
							AND (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[UserAccountDel]    Script Date: 29/12/2011 09:55:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('UserAccount')
																		
										 Delete 
							  			 from UserAccount
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[UserAccountIns]    Script Date: 29/12/2011 09:55:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountIns]
													@Name VarChar(128),							
										 
										 			@Password VarChar (1000) = '',
										 			@FirstName VarChar (50) = '',
										 			@LastName VarChar (50) = '',
										 			@Email VarChar (100) = '',
										 			@Organization VarChar (78) = '',
										 			@Phone VarChar (25) = '',
										 			@Extention VarChar (5) = '',
										 			@WorkPlace VarChar (75) = '',
										 			@Status Char (1) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [UserAccount] ( Name, [Password],
[FirstName],
[LastName],
[Email],
[Organization],
[Phone],
[Extention],
[WorkPlace],
[Status])
										 						 values (@Name, @Password,
@FirstName,
@LastName,
@Email,
@Organization,
@Phone,
@Extention,
@WorkPlace,
@Status)
										
										 exec UserAccountSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[UserAccountSel]    Script Date: 29/12/2011 09:55:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [Password], [FirstName], [LastName], [Email], [Organization], [Phone], [Extention], [WorkPlace], [Status]
							  			 from [UserAccount]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[UserAccountUpd]    Script Date: 29/12/2011 09:55:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UserAccountUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@Password VarChar (1000),
										 			@FirstName VarChar (50),
										 			@LastName VarChar (50),
										 			@Email VarChar (100),
										 			@Organization VarChar (78),
										 			@Phone VarChar (25),
										 			@Extention VarChar (5),
										 			@WorkPlace VarChar (75),
										 			@Status Char (1) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [UserAccount] set Name = @Name, [Password] = @Password,
[FirstName] = @FirstName,
[LastName] = @LastName,
[Email] = @Email,
[Organization] = @Organization,
[Phone] = @Phone,
[Extention] = @Extention,
[WorkPlace] = @WorkPlace,
[Status] = @Status										
										 where [Id] = @Id										 
										 exec UserAccountSel @Id 						 

GO

