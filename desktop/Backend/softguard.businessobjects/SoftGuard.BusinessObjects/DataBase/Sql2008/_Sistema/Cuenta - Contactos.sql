--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3011,'Telefono','Telefono','m_telefonos','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Telefono','SoftGuard.BusinessObjects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3012,'TelefonoPlanilla','TelefonoPlanilla','m_telefonos_planilla','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.TelefonoPlanilla','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3011,3012)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3011,3012)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3011,3012)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3011,3012)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3011,3012)
GO

--Stores Telefono
							Create Procedure [dbo].[TelefonoByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentatel_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[tel_idKey] Id, '' Name, o.tel_iidcuenta, o.tel_iid, o.tel_clista, o.tel_cnombre, o.tel_cobservacion, o.tel_ctelefono, o.tel_ndiscado, o.tel_cpredigito, o.tel_cpostdigito, o.tel_norden, o.tel_ntr, o.tel_cclave, o.tel_cpermiso, o.tel_nsms 
											from _Datos.dbo.[m_telefonos] o
											where [tel_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Telefono')
										
										
										
										Select o.[tel_idKey] Id, '' Name, o.tel_iidcuenta, o.tel_iid, o.tel_clista, o.tel_cnombre, o.tel_cobservacion, o.tel_ctelefono, o.tel_ndiscado, o.tel_cpredigito, o.tel_cpostdigito, o.tel_norden, o.tel_ntr, o.tel_cclave, o.tel_cpermiso, o.tel_nsms 
										  from _Datos.dbo.[m_telefonos] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tel_idKey]
										end

GO

/****** Object:  StoredProcedure [dbo].[TelefonoDel]    Script Date: 01/05/2012 11:44:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TelefonoDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Telefono')
																		
										 Delete 
							  			 from _Datos.dbo.m_telefonos
							 			  where [tel_idKey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[TelefonoIns]    Script Date: 01/05/2012 11:44:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
							CREATE PROCEDURE [dbo].[TelefonoIns]
													@Name VarChar(128),																	 
										 			@tel_iidcuenta Int = 0,
										 			@tel_iid Int = 0,
										 			@tel_clista Char (3) = '' ,
										 			@tel_cnombre VarChar (40) = '',
										 			@tel_cobservacion VarChar (40) = '',
										 			@tel_ctelefono VarChar (30) = '',
										 			@tel_ndiscado numeric (18,1) = 0,
										 			@tel_cpredigito VarChar (10) = '',
										 			@tel_cpostdigito VarChar (10) = '',
										 			@tel_norden SmallInt = 0,
										 			@tel_ntr numeric (18,1) = 0,
										 			@tel_cclave VarChar (20) = '',
										 			@tel_cpermiso VarChar (20) = '',
										 			@tel_nsms numeric (18,1) = 0
							--WITH ENCRYPTION			 
							AS
										 SET NOCOUNT ON
										 
										 SELECT @tel_iid = ISNULL(MAX(tel_iid),0) + 1 FROM _Datos.dbo.m_telefonos WHERE tel_iidcuenta = @tel_iidcuenta
										 
										 INSERT INTO _Datos.dbo.[m_telefonos] (tel_iidcuenta,tel_iid,tel_clista,tel_cnombre,tel_cobservacion,tel_ctelefono,tel_ndiscado,tel_cpredigito,tel_cpostdigito,tel_norden,tel_ntr,tel_cclave,tel_cpermiso,tel_nsms)										 						 
											                           VALUES (@tel_iidcuenta,@tel_iid,@tel_clista,@tel_cnombre,@tel_cobservacion,@tel_ctelefono,@tel_ndiscado,@tel_cpredigito,@tel_cpostdigito,@tel_norden,@tel_ntr,@tel_cclave,@tel_cpermiso,@tel_nsms)										
										 EXEC TelefonoSel @@Identity 						 
GO

/****** Object:  StoredProcedure [dbo].[TelefonoSel]    Script Date: 01/05/2012 11:44:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TelefonoSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [tel_idKey] Id, '' Name, tel_iidcuenta, tel_iid, tel_clista, tel_cnombre, tel_cobservacion, tel_ctelefono, tel_ndiscado, tel_cpredigito, tel_cpostdigito, tel_norden, tel_ntr, tel_cclave, tel_cpermiso, tel_nsms
							  			 from _Datos.dbo.[m_telefonos]
							 			  where [tel_idKey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[TelefonoUpd]    Script Date: 01/05/2012 11:44:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create PROCEDURE [dbo].[TelefonoUpd]
										 @Id Int,
										 @Name VarChar(128),										 
										 			@tel_iidcuenta Int ,
										 			@tel_iid Int ,
										 			@tel_clista Char (3) ,
										 			@tel_cnombre VarChar (40),
										 			@tel_cobservacion VarChar (40),
										 			@tel_ctelefono VarChar (30),
										 			@tel_ndiscado Numeric (18,1) ,
										 			@tel_cpredigito VarChar (10),
										 			@tel_cpostdigito VarChar (10),
										 			@tel_norden SmallInt ,
										 			@tel_ntr Numeric (18,1) ,
										 			@tel_cclave VarChar (20),
										 			@tel_cpermiso VarChar (20),
										 			@tel_nsms Numeric (18,1) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 
										 update _Datos.dbo.[m_telefonos] set tel_clista = @tel_clista,tel_cnombre = @tel_cnombre,tel_cobservacion = @tel_cobservacion,tel_ctelefono = @tel_ctelefono,tel_ndiscado = @tel_ndiscado,tel_cpredigito = @tel_cpredigito,tel_cpostdigito = @tel_cpostdigito,tel_norden = @tel_norden,tel_ntr = @tel_ntr,tel_cclave = @tel_cclave,tel_cpermiso = @tel_cpermiso,tel_nsms = @tel_nsms										
										  where [tel_idKey] = @Id										 
										  
										 exec TelefonoSel @Id 						 
GO							


							CREATE Procedure [dbo].[TelefonoPlanillaByText]
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
															
							select @ObjectTypeId = dbo.GetObjectId('TelefonoPlanilla')

							CREATE TABLE #Taxo (Id int)


							set @RowTotal = (SELECT COUNT([tel_iidpla]) FROM _Datos.dbo.[m_telefonos_planilla])
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

							set @RowTotal = (SELECT COUNT(t.[tel_iidpla]) FROM _Datos.dbo.[m_telefonos_planilla] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[tel_iidpla])
							
							set @PageTotal =  Ceiling(cast(@RowTotal as money)/cast(@PageCount as money))
							set @From = @PageCount * @PagePresent - @PageCount
							set @Even = @From + @PageCount + 1	
							
							SELECT Id, Name, tel_iidpla, tel_iid, tel_clista, tel_cnombre, tel_cobservacion, tel_ctelefono, tel_ndiscado, tel_cpredigito, tel_cpostdigito, tel_norden, tel_ntr, tel_cclave, tel_cpermiso, tel_nsms
							FROM (
							SELECT t.[tel_iidpla] Id, '' Name, t.tel_iidpla, t.tel_iid, t.tel_clista, t.tel_cnombre, t.tel_cobservacion, t.tel_ctelefono, t.tel_ndiscado, t.tel_cpredigito, t.tel_cpostdigito, t.tel_norden, t.tel_ntr, t.tel_cclave, t.tel_cpermiso, t.tel_nsms , taxo.Id as Taxo,
							ROW_NUMBER() OVER(
							ORDER BY t.[tel_iidpla]  
								) AS RowNumber
							FROM _Datos.dbo.[m_telefonos_planilla] t 
							LEFT JOIN #Taxo taxo ON taxo.Id = t.[tel_iidpla] 
							WHERE (@Taxonomies = '' OR  taxo.Id is not null)) tt
							WHERE RowNumber > @From
							AND RowNumber < @Even


							drop Table #Taxo
														

GO

/****** Object:  StoredProcedure [dbo].[TelefonoPlanillaDel]    Script Date: 01/05/2012 11:46:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TelefonoPlanillaDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('TelefonoPlanilla')
																		
										 Delete 
							  			 from _Datos.dbo.m_telefonos_planilla
							 			  where [tel_iidpla] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[TelefonoPlanillaIns]    Script Date: 01/05/2012 11:46:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TelefonoPlanillaIns]
													@Name VarChar(128),							
										 
										 			@tel_iidpla Int = 0,
										 			@tel_iid Int = 0,
										 			@tel_clista Char (3) = '' ,
										 			@tel_cnombre VarChar (40) = '',
										 			@tel_cobservacion VarChar (40) = '',
										 			@tel_ctelefono VarChar (30) = '',
										 			@tel_ndiscado Decimal (18,2) = 0,
										 			@tel_cpredigito VarChar (10) = '',
										 			@tel_cpostdigito VarChar (10) = '',
										 			@tel_norden Int = 0,
										 			@tel_ntr Decimal (18,2) = 0,
										 			@tel_cclave VarChar (20) = '',
										 			@tel_cpermiso VarChar (20) = '',
										 			@tel_nsms Decimal (18,2) = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_telefonos_planilla] (tel_iidpla,
tel_iid,
tel_clista,
tel_cnombre,
tel_cobservacion,
tel_ctelefono,
tel_ndiscado,
tel_cpredigito,
tel_cpostdigito,
tel_norden,
tel_ntr,
tel_cclave,
tel_cpermiso,
tel_nsms)
										 						 values (@tel_iidpla,
@tel_iid,
@tel_clista,
@tel_cnombre,
@tel_cobservacion,
@tel_ctelefono,
@tel_ndiscado,
@tel_cpredigito,
@tel_cpostdigito,
@tel_norden,
@tel_ntr,
@tel_cclave,
@tel_cpermiso,
@tel_nsms)
										
										 exec TelefonoPlanillaSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[TelefonoPlanillaSel]    Script Date: 01/05/2012 11:46:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TelefonoPlanillaSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [tel_iidpla] Id, '' Name, tel_iidpla, tel_iid, tel_clista, tel_cnombre, tel_cobservacion, tel_ctelefono, tel_ndiscado, tel_cpredigito, tel_cpostdigito, tel_norden, tel_ntr, tel_cclave, tel_cpermiso, tel_nsms
							  			 from _Datos.dbo.[m_telefonos_planilla]
							 			  where [tel_iidpla] = @Id

GO

/****** Object:  StoredProcedure [dbo].[TelefonoPlanillaUpd]    Script Date: 01/05/2012 11:46:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TelefonoPlanillaUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@tel_iid Int ,
										 			@tel_clista Char (3) ,
										 			@tel_cnombre VarChar (40),
										 			@tel_cobservacion VarChar (40),
										 			@tel_ctelefono VarChar (30),
										 			@tel_ndiscado Decimal (18,2) ,
										 			@tel_cpredigito VarChar (10),
										 			@tel_cpostdigito VarChar (10),
										 			@tel_norden Int ,
										 			@tel_ntr Decimal (18,2) ,
										 			@tel_cclave VarChar (20),
										 			@tel_cpermiso VarChar (20),
										 			@tel_nsms Decimal (18,2) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_telefonos_planilla] set tel_iid = @tel_iid,
tel_clista = @tel_clista,
tel_cnombre = @tel_cnombre,
tel_cobservacion = @tel_cobservacion,
tel_ctelefono = @tel_ctelefono,
tel_ndiscado = @tel_ndiscado,
tel_cpredigito = @tel_cpredigito,
tel_cpostdigito = @tel_cpostdigito,
tel_norden = @tel_norden,
tel_ntr = @tel_ntr,
tel_cclave = @tel_cclave,
tel_cpermiso = @tel_cpermiso,
tel_nsms = @tel_nsms										
										 where [tel_iidpla] = @Id										 
										 exec TelefonoPlanillaSel @Id 						 

GO
