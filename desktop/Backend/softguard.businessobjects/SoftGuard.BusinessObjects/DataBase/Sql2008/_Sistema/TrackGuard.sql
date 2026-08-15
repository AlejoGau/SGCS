--TABLAS
CREATE TABLE [_Datos].[dbo].[Poi](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[FullAddress] [varchar](512) NULL,
	[Icon] [varchar](256) NULL,
	[Country] [varchar](256) NULL,
	[State] [varchar](256) NULL,
	[City] [varchar](256) NULL,
	[Address] [varchar](256) NULL,
	[Number] [varchar](256) NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [_Datos].[dbo].[Vehicle](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[Brand] [varchar](1024) NULL,
	[Model] [varchar](1024) NULL,
	[Year] [int] NULL,
	[Domain] [varchar](128) NULL,
	[Colour] [varchar](1024) NULL,
	[VehicleType] [varchar](1024) NULL,
	[Photo] [image] NULL,
	[PhotoType] [varchar](1024) NULL,
	[VehicleBrand] [int] NULL,
	[VehicleModel] [int] NULL,
	[OwnerTypeId] [int] NULL,
	[OwnerId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

CREATE TABLE [_Tablas].[dbo].[VehicleBrand](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [_Tablas].[dbo].[VehicleModel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[VehicleBrand] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [_Tablas].[dbo].[VehicleType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


--INSERT SECURITY
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (659,'Vehicle','Vehicle','Vehicle','Slbf.Crm','Slbf.Crm.Vehicle','Slbf.Crm.dll')
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (660,'VehicleModel','VehicleModel','VehicleModel','Slbf.Crm','Slbf.Crm.VehicleModel','Slbf.Crm.dll')
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (661,'VehicleBrand','VehicleBrand','VehicleBrand','Slbf.Crm','Slbf.Crm.VehicleBrand','Slbf.Crm.dll')
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (662,'VehicleType','VehicleType','VehicleType','Slbf.Crm','Slbf.Crm.VehicleType','Slbf.Crm.dll')
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3044,'Poi','Poi','Poi','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Poi','SoftGuard.BusinessObjects.dll')

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (659,660,661,662,3044)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (659,660,661,662,3044)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (659,660,661,662,3044)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (659,660,661,662,3044)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (659,660,661,662,3044)
GO

--Stores VehicleBrand
/****** Object:  StoredProcedure [dbo].[VehicleBrandByChildObject]    Script Date: 01/11/2012 10:30:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleBrandByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('VehicleBrand')
										
										
										
										Select o.[Id] Id, Name  
										  from _Tablas.dbo.[VehicleBrand] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[VehicleBrandByText]    Script Date: 01/11/2012 10:30:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[VehicleBrandByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('VehicleBrand')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM _Tablas.dbo.[VehicleBrand])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM _Tablas.dbo.[VehicleBrand] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name 
							FROM (
							SELECT t.[Id] Id,  Name  , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM _Tablas.dbo.[VehicleBrand] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[VehicleBrandDel]    Script Date: 01/11/2012 10:30:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleBrandDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('VehicleBrand')
																		
										 Delete 
							  			 from _Tablas.dbo.VehicleBrand
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[VehicleBrandIns]    Script Date: 01/11/2012 10:30:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleBrandIns]
													@Name VarChar(128)		
										 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Tablas.dbo.[VehicleBrand] ( Name )
										 						 values (@Name )
										
										 exec VehicleBrandSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[VehicleBrandSel]    Script Date: 01/11/2012 10:30:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleBrandSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 
							  			 from _Tablas.dbo.[VehicleBrand]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[VehicleBrandUpd]    Script Date: 01/11/2012 10:30:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleBrandUpd]
										 @Id Int,
										 @Name VarChar(128)
										 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Tablas.dbo.[VehicleBrand] set Name = @Name 										
										 where [Id] = @Id										 
										 exec VehicleBrandSel @Id 						 

GO



--Stores Vehicle
/****** Object:  StoredProcedure [dbo].[VehicleByChildObject]    Script Date: 01/11/2012 10:37:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Vehicle')
										
										
										
										Select o.[Id] Id, Name , o.[Brand], o.[Model], o.[Year], o.[Domain], o.[Colour], o.[VehicleType], o.[Photo], o.[PhotoType], o.[VehicleBrand], o.[VehicleModel], o.[OwnerTypeId], o.[OwnerId] 
										  from _Datos.dbo.[Vehicle] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[VehicleByText]    Script Date: 01/11/2012 10:37:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[VehicleByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Vehicle')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM _Datos.dbo.[Vehicle])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM _Datos.dbo.[Vehicle] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] )
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [Brand], [Model], [Year], [Domain], [Colour], [VehicleType], [Photo], [PhotoType], [VehicleBrand], [VehicleModel], [OwnerTypeId], [OwnerId]
							FROM (
							SELECT t.[Id] Id,  Name , t.[Brand], t.[Model], t.[Year], t.[Domain], t.[Colour], t.[VehicleType], t.[Photo], t.[PhotoType], t.[VehicleBrand], t.[VehicleModel], t.[OwnerTypeId], t.[OwnerId] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM _Datos.dbo.[Vehicle] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[VehicleDel]    Script Date: 01/11/2012 10:37:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Vehicle')
																		
										 Delete 
							  			 from _Datos.dbo.Vehicle
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[VehicleIns]    Script Date: 01/11/2012 10:37:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleIns]
													@Name VarChar(128)		
										 ,
										 			@Brand VarChar (1024) = '',
										 			@Model VarChar (1024) = '',
										 			@Year Int = 0,
										 			@Domain VarChar (128) = '',
										 			@Colour VarChar (1024) = '',
										 			@VehicleType VarChar (1024) = '',
										 			@Photo  Image = null,
										 			@PhotoType VarChar (1024) = '',
										 			@VehicleBrand Int = 0,
										 			@VehicleModel Int = 0,
										 			@OwnerTypeId Int = 0,
										 			@OwnerId Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[Vehicle] ( Name ,[Brand],[Model],[Year],[Domain],[Colour],[VehicleType],[Photo],[PhotoType],[VehicleBrand],[VehicleModel],[OwnerTypeId],[OwnerId])
										 						 values (@Name , @Brand, @Model, @Year, @Domain, @Colour, @VehicleType, @Photo, @PhotoType, @VehicleBrand, @VehicleModel, @OwnerTypeId, @OwnerId)
										
										 exec VehicleSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[VehicleSearch]    Script Date: 01/11/2012 10:37:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[VehicleSearch]  
(@page int = 0,  
@start int =0,  
@limit int=25,  
@sort varchar(1024) = '',  
@_dc varchar(256)= '')  
as begin  
set nocount on  
  
select cue_iid, cue_clinea, cue_cnombre, cue_ctipo,   
(select top 1 rec_nestado from _Datos.dbo.p_recepcion where rec_iidcuenta = c.cue_iid order by rec_iid desc) rec_nestado,  
(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then 'Prueba'  
                       When est_nEstado=2 Then 'No Habilitado'  
                       When est_nEstado=3 Then 'Prueba x Zonas '  
                               Else 'Habilitado' End ) As Situacion  
, v.*  
, vb.Name BrandName  
, vm.Name ModelName  
from _Datos.dbo.vehicle v left join _Datos.dbo.M_CUENTAS c on (c.cue_iid = v.ownerid)  
Left Outer Join _Datos.dbo.m_estado_cuenta_cab On cue_iid = est_iidcuenta  
left join _Tablas.dbo.VehicleBrand vb on (v.VehicleBrand = vb.Id)  
left join _Tablas.dbo.VehicleModel vm on (v.VehicleModel = vm.Id)  
  
end  


GO

/****** Object:  StoredProcedure [dbo].[VehicleSel]    Script Date: 01/11/2012 10:37:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [Brand], [Model], [Year], [Domain], [Colour], [VehicleType], [Photo], [PhotoType], [VehicleBrand], [VehicleModel], [OwnerTypeId], [OwnerId]
							  			 from _Datos.dbo.[Vehicle]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[VehicleUpd]    Script Date: 01/11/2012 10:37:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleUpd]
										 @Id Int,
										 @Name VarChar(128)
										 ,
										 			@Brand VarChar (1024),
										 			@Model VarChar (1024),
										 			@Year Int,
										 			@Domain VarChar (128),
										 			@Colour VarChar (1024),
										 			@VehicleType VarChar (1024),
										 			@Photo Image ,
										 			@PhotoType VarChar (1024),
										 			@VehicleBrand Int,
										 			@VehicleModel Int,
										 			@OwnerTypeId Int,
										 			@OwnerId Int
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[Vehicle] set Name = @Name ,[Brand] = @Brand,[Model] = @Model,[Year] = @Year,[Domain] = @Domain,[Colour] = @Colour,[VehicleType] = @VehicleType,[Photo] = @Photo,[PhotoType] = @PhotoType,[VehicleBrand] = @VehicleBrand,[VehicleModel] = @VehicleModel,[OwnerTypeId] = @OwnerTypeId,[OwnerId] = @OwnerId										
										 where [Id] = @Id										 
										 exec VehicleSel @Id 						 

GO

--Stores VehicleModel
/****** Object:  StoredProcedure [dbo].[VehicleModelByChildObject]    Script Date: 01/11/2012 10:41:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleModelByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										VehicleBrandVehicleBrandVehicleBrand
										*/
										
										else if(@ObjectType = 'VehicleBrand')
										begin
											Select o.[Id] Id,  Name , o.[VehicleBrand] 
											from _Tablas.dbo.[VehicleModel] o
											where [VehicleBrand] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('VehicleModel')
										
										
										
										Select o.[Id] Id, Name , o.[VehicleBrand] 
										  from _Tablas.dbo.[VehicleModel] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[VehicleModelByText]    Script Date: 01/11/2012 10:41:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[VehicleModelByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('VehicleModel')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM _Tablas.dbo.[VehicleModel])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM _Tablas.dbo.[VehicleModel] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [VehicleBrand]
							FROM (
							SELECT t.[Id] Id,  Name , t.[VehicleBrand] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM _Tablas.dbo.[VehicleModel] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[VehicleModelDel]    Script Date: 01/11/2012 10:41:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleModelDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('VehicleModel')
																		
										 Delete 
							  			 from _Tablas.dbo.VehicleModel
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[VehicleModelIns]    Script Date: 01/11/2012 10:41:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleModelIns]
													@Name VarChar(128)		
										 ,
										 			@VehicleBrand Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Tablas.dbo.[VehicleModel] ( Name ,[VehicleBrand])
										 						 values (@Name , @VehicleBrand)
										
										 exec VehicleModelSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[VehicleModelSel]    Script Date: 01/11/2012 10:41:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleModelSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [VehicleBrand]
							  			 from _Tablas.dbo.[VehicleModel]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[VehicleModelUpd]    Script Date: 01/11/2012 10:41:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleModelUpd]
										 @Id Int,
										 @Name VarChar(128)
										 ,
										 			@VehicleBrand Int
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Tablas.dbo.[VehicleModel] set Name = @Name ,[VehicleBrand] = @VehicleBrand										
										 where [Id] = @Id										 
										 exec VehicleModelSel @Id 						 

GO

--Stores VehicleType
/****** Object:  StoredProcedure [dbo].[VehicleTypeByChildObject]    Script Date: 01/11/2012 10:43:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleTypeByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('VehicleType')
										
										
										
										Select o.[Id] Id, Name  
										  from _Tablas.dbo.[VehicleType] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[VehicleTypeByText]    Script Date: 01/11/2012 10:43:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[VehicleTypeByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('VehicleType')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM _Tablas.dbo.[VehicleType])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM _Tablas.dbo.[VehicleType] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name 
							FROM (
							SELECT t.[Id] Id,  Name  , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM _Tablas.dbo.[VehicleType] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[VehicleTypeDel]    Script Date: 01/11/2012 10:43:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleTypeDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('VehicleType')
																		
										 Delete 
							  			 from _Tablas.dbo.VehicleType
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[VehicleTypeIns]    Script Date: 01/11/2012 10:43:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleTypeIns]
													@Name VarChar(128)		
										 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Tablas.dbo.[VehicleType] ( Name )
										 						 values (@Name )
										
										 exec VehicleTypeSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[VehicleTypeSel]    Script Date: 01/11/2012 10:43:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleTypeSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 
							  			 from _Tablas.dbo.[VehicleType]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[VehicleTypeUpd]    Script Date: 01/11/2012 10:43:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[VehicleTypeUpd]
										 @Id Int,
										 @Name VarChar(128)
										 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Tablas.dbo.[VehicleType] set Name = @Name 										
										 where [Id] = @Id										 
										 exec VehicleTypeSel @Id 						 

GO



--Stores POI
/****** Object:  StoredProcedure [dbo].[PoiByChildObject]    Script Date: 01/11/2012 10:45:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PoiByChildObject]
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
										Select @RelationObjectTypeId = dbo.GetObjectId('Poi')
										
										
										
										Select o.[Id] Id, Name , o.[FullAddress], o.[Icon], o.[Country], o.[State], o.[City], o.[Address], o.[Number], o.[Latitude], o.[Longitude] 
										  from _Datos.dbo.[Poi] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[Id]
										end

GO

/****** Object:  StoredProcedure [dbo].[PoiByText]    Script Date: 01/11/2012 10:45:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE Procedure [dbo].[PoiByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('Poi')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM _Datos.dbo.[Poi])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [Poi] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name , [FullAddress], [Icon], [Country], [State], [City], [Address], [Number], [Latitude], [Longitude]
							FROM (
							SELECT t.[Id] Id,  Name , t.[FullAddress], t.[Icon], t.[Country], t.[State], t.[City], t.[Address], t.[Number], t.[Latitude], t.[Longitude] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM _Datos.dbo.[Poi] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[PoiDel]    Script Date: 01/11/2012 10:45:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PoiDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Poi')
																		
										 Delete 
							  			 from _Datos.dbo.Poi
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[PoiIns]    Script Date: 01/11/2012 10:45:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PoiIns]
													@Name VarChar(128)		
										 ,
										 			@FullAddress VarChar (512) = '',
										 			@Icon VarChar (256) = '',
										 			@Country VarChar (256) = '',
										 			@State VarChar (256) = '',
										 			@City VarChar (256) = '',
										 			@Address VarChar (256) = '',
										 			@Number VarChar (256) = '',
										 			@Latitude  float = 0,
										 			@Longitude  float = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[Poi] ( Name ,[FullAddress],[Icon],[Country],[State],[City],[Address],[Number],[Latitude],[Longitude])
										 						 values (@Name , @FullAddress, @Icon, @Country, @State, @City, @Address, @Number, @Latitude, @Longitude)
										
										 exec PoiSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[PoiSel]    Script Date: 01/11/2012 10:45:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PoiSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name
										 , [FullAddress], [Icon], [Country], [State], [City], [Address], [Number], [Latitude], [Longitude]
							  			 from _Datos.dbo.[Poi]
							 			  where [Id] = @Id

GO

/****** Object:  StoredProcedure [dbo].[PoiUpd]    Script Date: 01/11/2012 10:45:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PoiUpd]
										 @Id Int,
										 @Name VarChar(128)
										 ,
										 			@FullAddress VarChar (512),
										 			@Icon VarChar (256),
										 			@Country VarChar (256),
										 			@State VarChar (256),
										 			@City VarChar (256),
										 			@Address VarChar (256),
										 			@Number VarChar (256),
										 			@Latitude float ,
										 			@Longitude float 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[Poi] set Name = @Name ,[FullAddress] = @FullAddress,[Icon] = @Icon,[Country] = @Country,[State] = @State,[City] = @City,[Address] = @Address,[Number] = @Number,[Latitude] = @Latitude,[Longitude] = @Longitude										
										 where [Id] = @Id										 
										 exec PoiSel @Id 						 

GO