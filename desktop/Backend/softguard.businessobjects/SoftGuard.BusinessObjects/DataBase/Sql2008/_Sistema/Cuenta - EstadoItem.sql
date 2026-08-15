--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3034,'EstadoItem','EstadoItem','m_estado_cuenta_item','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.EstadoItem','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3034)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3034)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3034)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3034)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3034)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[EstadoItemByChildObject]    Script Date: 01/09/2012 13:33:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoItemByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentaest_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[est_idKey] Id, '' Name, o.[est_iidcuenta], o.[est_czona] 
											from _Datos.dbo.[m_estado_cuenta_item] o
											where [est_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('EstadoItem')
										
										
										
										Select o.[est_idKey] Id, '' Name, o.[est_iidcuenta], o.[est_czona] 
										  from _Datos.dbo.[m_estado_cuenta_item] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[est_idKey]
										end

GO

/****** Object:  StoredProcedure [dbo].[EstadoItemDel]    Script Date: 01/09/2012 13:33:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoItemDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('EstadoItem')
																		
										 Delete 
							  			 from _Datos.dbo.m_estado_cuenta_item
							 			  where [est_idKey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[EstadoItemIns]    Script Date: 01/09/2012 13:33:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoItemIns]
													@Name VarChar(128),							
										 
										 			@est_iidcuenta Int = 0,
										 			@est_czona Char (10) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_estado_cuenta_item] ([est_iidcuenta],
[est_czona])
										 						 values (@est_iidcuenta,
@est_czona)
										
										 exec EstadoItemSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[EstadoItemSel]    Script Date: 01/09/2012 13:33:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoItemSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [est_idKey] Id, '' Name, [est_iidcuenta], [est_czona]
							  			 from _Datos.dbo.[m_estado_cuenta_item]
							 			  where [est_idKey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[EstadoItemUpd]    Script Date: 01/09/2012 13:33:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoItemUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@est_iidcuenta Int,
										 			@est_czona Char (10) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_estado_cuenta_item] set [est_iidcuenta] = @est_iidcuenta,
[est_czona] = @est_czona										
										 where [est_idKey] = @Id										 
										 exec EstadoItemSel @Id 						 

GO


