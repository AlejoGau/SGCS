CREATE OR ALTER PROCEDURE [dbo].[TelefonoByChildObject]
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
											Select o.[tel_idKey] Id, '' Name, o.tel_iidcuenta, o.tel_iid, o.tel_clista, o.tel_cnombre, o.tel_cobservacion, o.tel_ctelefono, o.tel_ndiscado, o.tel_cpredigito, o.tel_cpostdigito, o.tel_norden, o.tel_ntr, o.tel_cclave, o.tel_cpermiso, o.tel_nsms , o.tel_nsp,o.tel_cinternacional, o.tel_ccountrycode,o.tel_iismobile
											from _Datos.dbo.[m_telefonos] o
											where [tel_iidcuenta] = @Id AND o.tel_iid != 0
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Telefono')
										
										
										
										Select o.[tel_idKey] Id, '' Name, o.tel_iidcuenta, o.tel_iid, o.tel_clista, o.tel_cnombre, o.tel_cobservacion, o.tel_ctelefono, o.tel_ndiscado, o.tel_cpredigito, o.tel_cpostdigito, o.tel_norden, o.tel_ntr, o.tel_cclave, o.tel_cpermiso, o.tel_nsms , o.tel_nsp
										  from _Datos.dbo.[m_telefonos] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tel_idKey]
										end