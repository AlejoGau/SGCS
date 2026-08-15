--Objects
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3036,'WebManagerGraphics','WebManagerGraphics','WebManagerGraphics','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.WebManagerGraphics','SoftGuard.BusinessObjects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3037,'WebManagerViews','WebManagerViews','WebManagerViews','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.WebManagerViews','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3036,3037)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3036,3037)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3036,3037)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3036,3037)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3036,3037)
GO

--Tables
CREATE TABLE [dbo].[WebManagerGraphics](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[Data] [text] NULL,
	[Height] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

CREATE TABLE [dbo].[WebManagerViews](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[Data] [text] NULL,
	[RefreshTime] [int] NULL,
	[Opened] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[WebManagerViews] ADD  DEFAULT ('5') FOR [RefreshTime]
GO

--Store Procedures
							CREATE Procedure [dbo].[WebManagerGraphicsByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('WebManagerGraphics')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [WebManagerGraphics])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [WebManagerGraphics] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [Data], [Height]
							FROM (
							SELECT t.[Id] Id,  Name, t.[Data], t.[Height] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM [WebManagerGraphics] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

							Create Procedure [dbo].[WebManagerGraphicsDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('WebManagerGraphics')
																		
										 Delete 
							  			 from WebManagerGraphics
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO
							Create Procedure [dbo].[WebManagerGraphicsIns]
													@Name VarChar(128),							
										 
										 			@Data Text = '',
										 			@Height Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [WebManagerGraphics] ( Name, [Data],
[Height])
										 						 values (@Name, @Data,
@Height)
										
										 exec WebManagerGraphicsSel @@Identity 						 

GO


							Create Procedure [dbo].[WebManagerGraphicsSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [Data], [Height]
							  			 from [WebManagerGraphics]
							 			  where [Id] = @Id

GO

							Create Procedure [dbo].[WebManagerGraphicsUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@Data  Text,
										 			@Height Int
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [WebManagerGraphics] set Name = @Name, [Data] = @Data,
[Height] = @Height										
										 where [Id] = @Id										 
										 exec WebManagerGraphicsSel @Id 						 

GO

							CREATE Procedure [dbo].[WebManagerViewsByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('WebManagerViews')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([Id]) FROM [WebManagerViews])
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

							set @RowTotal = (SELECT COUNT(t.[Id]) FROM [WebManagerViews] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, [Data], [RefreshTime], [Opened]
							FROM (
							SELECT t.[Id] Id,  Name, t.[Data], t.[RefreshTime], t.[Opened] , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[Id]  
								) AS RowNumber
							FROM [WebManagerViews] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[Id] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[WebManagerViewsDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('WebManagerViews')
																		
										 Delete 
							  			 from WebManagerViews
							 			  where [Id] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[WebManagerViewsIns]
													@Name VarChar(128),							
										 
										 			@Data Text = '',
										 			@RefreshTime Int = 0,
										 			@Opened Int = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into [WebManagerViews] ( Name, [Data],
[RefreshTime],
[Opened])
										 						 values (@Name, @Data,
@RefreshTime,
@Opened)
										
										 exec WebManagerViewsSel @@Identity 						 

GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[WebManagerViewsSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [Id] Id,  Name, [Data], [RefreshTime], [Opened]
							  			 from [WebManagerViews]
							 			  where [Id] = @Id

GO

							Create Procedure [dbo].[WebManagerViewsUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@Data  Text,
										 			@RefreshTime Int,
										 			@Opened Int
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update [WebManagerViews] set Name = @Name, [Data] = @Data,
[RefreshTime] = @RefreshTime,
[Opened] = @Opened										
										 where [Id] = @Id										 
										 exec WebManagerViewsSel @Id 						 

GO


--SearchObject
INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType) SELECT replace(strval,'WebManager_','WM'), 3036, strval, 'sql' FROM DBO.ParseArray('WebManager_AlertasGeoreferenciadas,WebManager_AnalisisIPR30Dias,WebManager_AnalisisIPRHoy,WebManager_AnalisisPG30Dias,WebManager_AnalisisPGHoy,WebManager_CategorizacionDeAlarmas,WebManager_CategorizacionDeEventos,WebManager_CuentasGeoreferenciadas,WebManager_EstadoDeCuenta,WebManager_EventosAutoprocesados,WebManager_EventosDeEmergenciaUltimos10Dias,WebManager_EventosDeEmergenciaUltimos2Meses,WebManager_EventosEnEsperaPorPrioridad,WebManager_EventosPendientesPorPrioridad,WebManager_EventosPorDiaPorOperador,WebManager_EventosPorTipoDelDia,WebManager_EventosRecibidos,WebManager_EventosRecibidos30Dias,WebManager_EvolucionCuentas12Meses,WebManager_EvolucionCuentas30Dias,WebManager_EvolucionCuentas60Dias,WebManager_ProcesamientosPorTerminal,WebManager_ProcesoEventosActuales,WebManager_ResolucionDeEventosPorDia,WebManager_ResolucionDeEventosPorMes,WebManager_Ultimos25Eventos,WebManager_Ultimos25EventosAlertas', ',')
GO