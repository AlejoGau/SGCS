--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3010,'Nota','Nota','m_notas','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Nota','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3010
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3010)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3010)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3010)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3010)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3010)
GO

--Stores
							Create Procedure [dbo].[NotaByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentanot_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[not_iidcuenta] Id, '' Name, o.not_iidcuenta, o.not_mnotaprincipal, o.not_mnotatemporal, o.not_dtemporaldesde, o.not_dtemporalhasta 
											from _Datos.dbo.[m_notas] o
											where [not_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Nota')
										
										
										
										Select o.[not_iidcuenta] Id, '' Name, o.not_iidcuenta, o.not_mnotaprincipal, o.not_mnotatemporal, o.not_dtemporaldesde, o.not_dtemporalhasta 
										  from _Datos.dbo.[m_notas] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[not_iidcuenta]
										end

GO

/****** Object:  StoredProcedure [dbo].[NotaDel]    Script Date: 01/06/2012 11:05:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[NotaDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Nota')
																		
										 Delete 
							  			 from _Datos.dbo.m_notas
							 			  where [not_iidcuenta] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[NotaIns]    Script Date: 01/06/2012 11:05:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[NotaIns]
													@Name VarChar(128),							
										 
										 			@not_iidcuenta Int = 0,
										 			@not_mnotaprincipal Text = '',
										 			@not_mnotatemporal Text = '',
										 			@not_dtemporaldesde DateTime = 0,
										 			@not_dtemporalhasta DateTime = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_notas] (not_iidcuenta,
not_mnotaprincipal,
not_mnotatemporal,
not_dtemporaldesde,
not_dtemporalhasta)
										 						 values (@not_iidcuenta,
@not_mnotaprincipal,
@not_mnotatemporal,
@not_dtemporaldesde,
@not_dtemporalhasta)
										
										 exec NotaSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[NotaSel]    Script Date: 01/06/2012 11:05:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[NotaSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [not_iidcuenta] Id, '' Name, not_iidcuenta, not_mnotaprincipal, not_mnotatemporal, not_dtemporaldesde, not_dtemporalhasta
							  			 from _Datos.dbo.[m_notas]
							 			  where [not_iidcuenta] = @Id

GO

/****** Object:  StoredProcedure [dbo].[NotaUpd]    Script Date: 01/06/2012 11:05:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[NotaUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@not_iidcuenta Int ,
										 			@not_mnotaprincipal Text,
										 			@not_mnotatemporal Text,
										 			@not_dtemporaldesde DateTime ,
										 			@not_dtemporalhasta DateTime 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_notas] set not_mnotaprincipal = @not_mnotaprincipal,
not_mnotatemporal = @not_mnotatemporal,
not_dtemporaldesde = @not_dtemporaldesde,
not_dtemporalhasta = @not_dtemporalhasta										
										 where [not_iidcuenta] = @Id										 
										 exec NotaSel @Id 						 

GO

