--Stores
							CREATE OR ALTER PROCEDURE [dbo].[NotaByChildObject]
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