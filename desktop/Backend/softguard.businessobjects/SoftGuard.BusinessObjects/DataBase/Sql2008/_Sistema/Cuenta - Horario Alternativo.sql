--Object

INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3004,'HorarioAlternativo','HorarioAlternativo','m_horarios_alternativos','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.HorarioAlternativo','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3004
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3004)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3004)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3004)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3004)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3004)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[HorarioAlternativoByChildObject]    Script Date: 01/09/2012 12:12:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioAlternativoByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentaalt_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[alt_idkey] Id, '' Name, o.alt_iidcuenta, o.alt_ndiaapertura, o.alt_choraapertura, o.alt_ndiacierre, o.alt_choracierre 
											from _Datos.dbo.[m_horarios_alternativos] o
											where [alt_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('HorarioAlternativo')
										
										
										
										Select o.[alt_idkey] Id, '' Name, o.alt_iidcuenta, o.alt_ndiaapertura, o.alt_choraapertura, o.alt_ndiacierre, o.alt_choracierre 
										  from _Datos.dbo.[m_horarios_alternativos] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[alt_idKey] 
										end

GO

/****** Object:  StoredProcedure [dbo].[HorarioAlternativoDel]    Script Date: 01/09/2012 12:12:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioAlternativoDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('HorarioAlternativo')
																		
										 Delete 
							  			 from _Datos.dbo.m_horarios_alternativos
							 			  where [alt_idkey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[HorarioAlternativoIns]    Script Date: 01/09/2012 12:12:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioAlternativoIns]
													@Name VarChar(128),							
										 
										 			@alt_iidcuenta Int = 0,
										 			@alt_ndiaapertura numeric (18,1) = 0,
										 			@alt_choraapertura Char (5) = '' ,
										 			@alt_ndiacierre numeric (18,1) = 0,
										 			@alt_choracierre Char (5) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_horarios_alternativos] (alt_iidcuenta,
alt_ndiaapertura,
alt_choraapertura,
alt_ndiacierre,
alt_choracierre)
										 						 values (@alt_iidcuenta,
@alt_ndiaapertura,
@alt_choraapertura,
@alt_ndiacierre,
@alt_choracierre)
										
										 exec HorarioAlternativoSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[HorarioAlternativoSel]    Script Date: 01/09/2012 12:12:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioAlternativoSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [alt_idkey] Id, '' Name, alt_iidcuenta, alt_ndiaapertura, alt_choraapertura, alt_ndiacierre, alt_choracierre
							  			 from _Datos.dbo.[m_horarios_alternativos]
							 			  where [alt_idkey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[HorarioAlternativoUpd]    Script Date: 01/09/2012 12:12:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioAlternativoUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@alt_iidcuenta Int ,
										 			@alt_ndiaapertura Numeric (18,1) ,
										 			@alt_choraapertura Char (5) ,
										 			@alt_ndiacierre Numeric (18,1) ,
										 			@alt_choracierre Char (5) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_horarios_alternativos] set alt_iidcuenta = @alt_iidcuenta,
alt_ndiaapertura = @alt_ndiaapertura,
alt_choraapertura = @alt_choraapertura,
alt_ndiacierre = @alt_ndiacierre,
alt_choracierre = @alt_choracierre										
										 where [alt_idkey] = @Id										 
										 exec HorarioAlternativoSel @Id 						 

GO

