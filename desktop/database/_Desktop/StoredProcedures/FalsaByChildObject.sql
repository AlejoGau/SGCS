CREATE OR ALTER PROCEDURE [dbo].[FalsaByChildObject]
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