--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3006,'HorarioExcepcion','HorarioExcepcion','m_horarios_excepcion','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.HorarioExcepcion','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3006
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3006)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3006)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3006)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3006)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3006)
GO

--Stores

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioExcepcionByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentaexc_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[exc_idKey] Id, '' Name, o.exc_iidcuenta, o.exc_cevento 
											from _Datos.dbo.[m_horarios_excepcion] o
											where [exc_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('HorarioExcepcion')
										
										
										
										Select o.[exc_idKey] Id, '' Name, o.exc_iidcuenta, o.exc_cevento 
										  from _Datos.dbo.[m_horarios_excepcion] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[exc_idKey] 
										end

GO

/****** Object:  StoredProcedure [dbo].[HorarioExcepcionDel]    Script Date: 01/09/2012 12:17:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioExcepcionDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('HorarioExcepcion')
																		
										 Delete 
							  			 from _Datos.dbo.m_horarios_excepcion
							 			  where [exc_idKey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[HorarioExcepcionIns]    Script Date: 01/09/2012 12:17:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioExcepcionIns]
													@Name VarChar(128),							
										 
										 			@exc_iidcuenta Int = 0,
										 			@exc_cevento Char (10) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_horarios_excepcion] (exc_iidcuenta,
exc_cevento)
										 						 values (@exc_iidcuenta,
@exc_cevento)
										
										 exec HorarioExcepcionSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[HorarioExcepcionSel]    Script Date: 01/09/2012 12:17:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioExcepcionSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [exc_idKey] Id, '' Name, exc_iidcuenta, exc_cevento
							  			 from _Datos.dbo.[m_horarios_excepcion]
							 			  where [exc_idKey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[HorarioExcepcionUpd]    Script Date: 01/09/2012 12:17:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioExcepcionUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@exc_iidcuenta Int ,
										 			@exc_cevento Char (10) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_horarios_excepcion] set exc_iidcuenta = @exc_iidcuenta,
exc_cevento = @exc_cevento										
										 where [exc_idKey] = @Id										 
										 exec HorarioExcepcionSel @Id 						 

GO


