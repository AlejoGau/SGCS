--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.663 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.857 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[ZonaTempByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										4
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[zon_idregistro] Id, '' Name, o.zon_idregistro, o.zon_iidcuenta, o.zon_usuario, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_tipo, o.zon_cimagen 
											from _Datos.dbo.[m_zonas_temp] o
											where [zon_iidcuenta] = @Id
										end																														
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('ZonaTemp')
										
										
										
										Select o.[zon_idregistro] Id, '' Name, o.zon_idregistro, o.zon_iidcuenta, o.zon_usuario, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_tipo, o.zon_cimagen 
										  from _Datos.dbo.[m_zonas_temp] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[zon_idregistro]
										end