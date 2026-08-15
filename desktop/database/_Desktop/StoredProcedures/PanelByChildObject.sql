--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.203 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.300 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[PanelByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentapan_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[pan_iidcuenta] Id, '' Name, o.pan_iidcuenta, o.pan_ccodigo, o.pan_mubicacion, o.pan_ccallerid1, o.pan_ccallerid2, o.pan_ccallerid3, o.pan_ccallerid4, o.pan_ccallerid5, o.pan_nmostrar, o.pan_csender 
											from _Datos.dbo.[m_paneles] o
											where [pan_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Panel')
										
										
										
										Select o.[pan_iidcuenta] Id, '' Name, o.pan_iidcuenta, o.pan_ccodigo, o.pan_mubicacion, o.pan_ccallerid1, o.pan_ccallerid2, o.pan_ccallerid3, o.pan_ccallerid4, o.pan_ccallerid5, o.pan_nmostrar, o.pan_csender 
										  from _Datos.dbo.[m_paneles] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[pan_iidcuenta]
										end