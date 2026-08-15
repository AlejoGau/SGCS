CREATE OR ALTER PROCEDURE [dbo].[MedicalInfoByChildObject]
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
											Select o.[mnf_idKey] Id, '' Name, o.mnf_iidcuenta, o.mnf_iid, o.mnf_cprotegido, o.mnf_cdoctor, o.mnf_cobrasocial, o.mnf_nsexo, o.mnf_ndiscapacitado, o.mnf_nambulancia, o.mnf_nvivesolo, o.mnf_dfechanacimiento, o.mnf_nedad, o.mnf_tobservaciones, o.mnf_casociado 
											from _Datos.dbo.[m_medical_info] o
											where [mnf_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('MedicalInfo')
										
										
										
										Select o.[mnf_idKey] Id, '' Name, o.mnf_iidcuenta, o.mnf_iid, o.mnf_cprotegido, o.mnf_cdoctor, o.mnf_cobrasocial, o.mnf_nsexo, o.mnf_ndiscapacitado, o.mnf_nambulancia, o.mnf_nvivesolo, o.mnf_dfechanacimiento, o.mnf_nedad, o.mnf_tobservaciones, o.mnf_casociado 
										  from _Datos.dbo.[m_medical_info] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[mnf_idKey]
										end