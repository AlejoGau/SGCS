--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3002,'Falsa','Falsa','m_falsas','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Falsa','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3002
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3002)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3002)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3002)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3002)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3002)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[FalsaByChildObject]    Script Date: 01/09/2012 12:01:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[FalsaByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentafal_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[fal_iidcuenta] Id, '' Name, o.fal_iidcuenta, o.fal_nmargen, o.fal_nmeses, o.fal_mnota 
											from _Datos.dbo.[m_falsas] o
											where [fal_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Falsa')
										
										
										
										Select o.[fal_iidcuenta] Id, '' Name, o.fal_iidcuenta, o.fal_nmargen, o.fal_nmeses, o.fal_mnota 
										  from _Datos.dbo.[m_falsas] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[fal_iidcuenta]
										end

GO

/****** Object:  StoredProcedure [dbo].[FalsaDel]    Script Date: 01/09/2012 12:01:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[FalsaDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Falsa')
																		
										 Delete 
							  			 from _Datos.dbo.m_falsas
							 			  where [fal_iidcuenta] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[FalsaIns]    Script Date: 01/09/2012 12:01:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[FalsaIns]
													@Name VarChar(128),							
										 
										 			@fal_iidcuenta Int = 0,
										 			@fal_nmargen numeric (18,1) = 0,
										 			@fal_nmeses numeric (18,1) = 0,
										 			@fal_mnota Text = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_falsas] (fal_iidcuenta,
fal_nmargen,
fal_nmeses,
fal_mnota)
										 						 values (@fal_iidcuenta,
@fal_nmargen,
@fal_nmeses,
@fal_mnota)
										
										 exec FalsaSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[FalsaSel]    Script Date: 01/09/2012 12:01:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[FalsaSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [fal_iidcuenta] Id, '' Name, fal_iidcuenta, fal_nmargen, fal_nmeses, fal_mnota
							  			 from _Datos.dbo.[m_falsas]
							 			  where [fal_iidcuenta] = @Id

GO

/****** Object:  StoredProcedure [dbo].[FalsaUpd]    Script Date: 01/09/2012 12:01:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[FalsaUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@fal_iidcuenta Int ,
										 			@fal_nmargen Numeric (18,1) ,
										 			@fal_nmeses Numeric (18,1) ,
										 			@fal_mnota Text
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_falsas] set fal_nmargen = @fal_nmargen,
fal_nmeses = @fal_nmeses,
fal_mnota = @fal_mnota										
										 where [fal_iidcuenta] = @Id										 
										 exec FalsaSel @Id 						 

GO

