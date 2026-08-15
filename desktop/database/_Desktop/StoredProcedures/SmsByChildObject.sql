--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.153 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.220 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[SmsByChildObject]
										@ObjectType NVARCHAR(50),
										@Id Int
										--,@UserId Int = 0    
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentasms_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[sms_idKey] Id, '' Name , o.[sms_iidcuenta], o.[sms_meventos], o.[sms_csmsparaeventos], o.[sms_imodemsms], o.[sms_cplantillasms], o.[sms_cmailparaeventos], o.[sms_cplantillamail], o.[sms_inotificaralertas]
											from [_datos].dbo.[m_sms] o
											where [sms_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Sms')
										
										
										
										Select o.[sms_idKey] Id, ''Name , o.[sms_iidcuenta], o.[sms_meventos], o.[sms_csmsparaeventos], o.[sms_imodemsms], o.[sms_cplantillasms], o.[sms_cmailparaeventos], o.[sms_cplantillamail] , o.[sms_inotificaralertas]
										  from [_datos].dbo.[m_sms] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[sms_idKey]
										end