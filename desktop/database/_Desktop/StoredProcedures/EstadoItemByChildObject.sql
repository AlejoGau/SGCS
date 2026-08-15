--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.487 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.393 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[EstadoItemByChildObject]
										@ObjectType NVARCHAR(50),
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