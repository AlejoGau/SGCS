--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.210 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.350 
--#############################################################################



							CREATE OR ALTER PROCEDURE [dbo].[ZonaByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentazon_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[zon_idKey] Id, '' Name, o.zon_iidcuenta, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_clistaemergencia, o.zon_cimagen, o.zon_mobservacion, o.zon_ccodigorestauracion, o.zon_nminutosrestauracion, o.zon_nmostrar, o.zon_cdealer, o.zon_ccuenta, o.zon_nautoprocesa, o.zon_cAlarmaAGenerar 
											
											from _Datos.dbo.[m_zonas] o
											where [zon_iidcuenta] = @Id
											order by right(replace(space(9), ' ', '0') + rtrim(o.zon_ccodigo),9) asc
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Zona')
										
										
										
										Select o.[zon_idKey] Id, '' Name, o.zon_iidcuenta, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_clistaemergencia, o.zon_cimagen, o.zon_mobservacion, o.zon_ccodigorestauracion, o.zon_nminutosrestauracion, o.zon_nmostrar, o.zon_cdealer, o.zon_ccuenta, o.zon_nautoprocesa , o.zon_cAlarmaAGenerar
										  from _Datos.dbo.[m_zonas] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[zon_idKey]
										end