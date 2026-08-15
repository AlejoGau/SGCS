--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3019,'MedicalInfo','MedicalInfo','m_medical_info','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.MedicalInfo','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3019
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3019)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3019)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3019)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3019)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3019)
GO

--Stores
							Create Procedure [dbo].[MedicalInfoByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentamnf_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[mnf_iid] Id, '' Name, o.mnf_iidcuenta, o.mnf_iid, o.mnf_cprotegido, o.mnf_cdoctor, o.mnf_cobrasocial, o.mnf_nsexo, o.mnf_ndiscapacitado, o.mnf_nambulancia, o.mnf_nvivesolo, o.mnf_dfechanacimiento, o.mnf_nedad, o.mnf_tobservaciones, o.mnf_casociado 
											from _Datos.dbo.[m_medical_info] o
											where [mnf_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('MedicalInfo')
										
										
										
										Select o.[mnf_iid] Id, '' Name, o.mnf_iidcuenta, o.mnf_iid, o.mnf_cprotegido, o.mnf_cdoctor, o.mnf_cobrasocial, o.mnf_nsexo, o.mnf_ndiscapacitado, o.mnf_nambulancia, o.mnf_nvivesolo, o.mnf_dfechanacimiento, o.mnf_nedad, o.mnf_tobservaciones, o.mnf_casociado 
										  from _Datos.dbo.[m_medical_info] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[mnf_iid]
										end

GO

/****** Object:  StoredProcedure [dbo].[MedicalInfoDel]    Script Date: 01/06/2012 11:12:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MedicalInfoDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('MedicalInfo')
																		
										 Delete 
							  			 from _Datos.dbo.m_medical_info
							 			  where [mnf_iid] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[MedicalInfoIns]    Script Date: 01/06/2012 11:12:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MedicalInfoIns]
													@Name VarChar(128),							
										 
										 			@mnf_iidcuenta Int = 0,
										 			@mnf_iid Int = 0,
										 			@mnf_cprotegido VarChar (60) = '',
										 			@mnf_cdoctor Char (4) = '' ,
										 			@mnf_cobrasocial Char (4) = '' ,
										 			@mnf_nsexo numeric (1,1) = 0,
										 			@mnf_ndiscapacitado numeric (1,1) = 0,
										 			@mnf_nambulancia numeric (1,1) = 0,
										 			@mnf_nvivesolo numeric (1,1) = 0,
										 			@mnf_dfechanacimiento DateTime = 0,
										 			@mnf_nedad Int = 0,
										 			@mnf_tobservaciones Text = '',
										 			@mnf_casociado VarChar (30) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_medical_info] (mnf_iidcuenta,
mnf_iid,
mnf_cprotegido,
mnf_cdoctor,
mnf_cobrasocial,
mnf_nsexo,
mnf_ndiscapacitado,
mnf_nambulancia,
mnf_nvivesolo,
mnf_dfechanacimiento,
mnf_nedad,
mnf_tobservaciones,
mnf_casociado)
										 						 values (@mnf_iidcuenta,
@mnf_iid,
@mnf_cprotegido,
@mnf_cdoctor,
@mnf_cobrasocial,
@mnf_nsexo,
@mnf_ndiscapacitado,
@mnf_nambulancia,
@mnf_nvivesolo,
@mnf_dfechanacimiento,
@mnf_nedad,
@mnf_tobservaciones,
@mnf_casociado)
										
										 exec MedicalInfoSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[MedicalInfoSel]    Script Date: 01/06/2012 11:12:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MedicalInfoSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [mnf_iid] Id, '' Name, mnf_iidcuenta, mnf_iid, mnf_cprotegido, mnf_cdoctor, mnf_cobrasocial, mnf_nsexo, mnf_ndiscapacitado, mnf_nambulancia, mnf_nvivesolo, mnf_dfechanacimiento, mnf_nedad, mnf_tobservaciones, mnf_casociado
							  			 from _Datos.dbo.[m_medical_info]
							 			  where [mnf_iid] = @Id

GO

/****** Object:  StoredProcedure [dbo].[MedicalInfoUpd]    Script Date: 01/06/2012 11:12:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[MedicalInfoUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@mnf_iidcuenta Int ,
										 			@mnf_iid Int ,
										 			@mnf_cprotegido VarChar (60),
										 			@mnf_cdoctor Char (4) ,
										 			@mnf_cobrasocial Char (4) ,
										 			@mnf_nsexo Numeric (1,1) ,
										 			@mnf_ndiscapacitado Numeric (1,1) ,
										 			@mnf_nambulancia Numeric (1,1) ,
										 			@mnf_nvivesolo Numeric (1,1) ,
										 			@mnf_dfechanacimiento DateTime ,
										 			@mnf_nedad Int ,
										 			@mnf_tobservaciones Text,
										 			@mnf_casociado VarChar (30)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_medical_info] set mnf_iidcuenta = @mnf_iidcuenta,
mnf_cprotegido = @mnf_cprotegido,
mnf_cdoctor = @mnf_cdoctor,
mnf_cobrasocial = @mnf_cobrasocial,
mnf_nsexo = @mnf_nsexo,
mnf_ndiscapacitado = @mnf_ndiscapacitado,
mnf_nambulancia = @mnf_nambulancia,
mnf_nvivesolo = @mnf_nvivesolo,
mnf_dfechanacimiento = @mnf_dfechanacimiento,
mnf_nedad = @mnf_nedad,
mnf_tobservaciones = @mnf_tobservaciones,
mnf_casociado = @mnf_casociado										
										 where [mnf_iid] = @Id										 
										 exec MedicalInfoSel @Id 						 

GO

