--Object

INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3003,'Horario','Horario','m_horarios','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Horario','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3003
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3003)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3003)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3003)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3003)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3003)
GO

--Stores

/****** Object:  StoredProcedure [dbo].[HorarioByChildObject]    Script Date: 01/09/2012 12:04:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE PROCEDURE [dbo].[HorarioByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentahor_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[hor_idKey] Id, '' Name, o.hor_iidcuenta, o.hor_ndiaapertura, o.hor_choraapertura, o.hor_ndiacierre, o.hor_choracierre 
											from _Datos.dbo.[m_horarios] o
											where [hor_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Horario')
										
										
										
										Select o.[hor_idKey] Id, '' Name, o.hor_iidcuenta, o.hor_ndiaapertura, o.hor_choraapertura, o.hor_ndiacierre, o.hor_choracierre 
										  from _Datos.dbo.[m_horarios] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[hor_idKey] 
										end

GO

/****** Object:  StoredProcedure [dbo].[HorarioDel]    Script Date: 01/09/2012 12:04:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE PROCEDURE [dbo].[HorarioDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Horario')
																		
										 Delete 
							  			 from _Datos.dbo.m_horarios
							 			  where [hor_idKey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[HorarioIns]    Script Date: 01/09/2012 12:04:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE PROCEDURE [dbo].[HorarioIns]
													@Name VarChar(128),							
										 
										 			@hor_iidcuenta Int = 0,
										 			@hor_ndiaapertura numeric (18,1) = 0,
										 			@hor_choraapertura Char (5) = '' ,
										 			@hor_ndiacierre numeric (18,1) = 0,
										 			@hor_choracierre Char (5) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_horarios] (hor_iidcuenta,
hor_ndiaapertura,
hor_choraapertura,
hor_ndiacierre,
hor_choracierre)
										 						 values (@hor_iidcuenta,
@hor_ndiaapertura,
@hor_choraapertura,
@hor_ndiacierre,
@hor_choracierre)
										
										 exec HorarioSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[HorarioSel]    Script Date: 01/09/2012 12:04:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE PROCEDURE [dbo].[HorarioSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [hor_idKey] Id, '' Name, hor_iidcuenta, hor_ndiaapertura, hor_choraapertura, hor_ndiacierre, hor_choracierre
							  			 from _Datos.dbo.[m_horarios]
							 			  where [hor_idKey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[HorarioUpd]    Script Date: 01/09/2012 12:04:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							CREATE PROCEDURE [dbo].[HorarioUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@hor_iidcuenta Int ,
										 			@hor_ndiaapertura Numeric (18,1) ,
										 			@hor_choraapertura Char (5) ,
										 			@hor_ndiacierre Numeric (18,1) ,
										 			@hor_choracierre Char (5) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_horarios] set hor_iidcuenta = @hor_iidcuenta,
hor_ndiaapertura = @hor_ndiaapertura,
hor_choraapertura = @hor_choraapertura,
hor_ndiacierre = @hor_ndiacierre,
hor_choracierre = @hor_choracierre										
										 where [hor_idKey] = @Id										 
										 exec HorarioSel @Id 						 

GO

