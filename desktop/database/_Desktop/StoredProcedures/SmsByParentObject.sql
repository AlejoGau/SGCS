--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.193 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.250 
--#############################################################################
							CREATE OR ALTER PROCEDURE [dbo].[SmsByParentObject]
										@ObjectType NVARCHAR(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Sms')
										
										Select o.[sms_idKey] Id, '' Name , o.[sms_iidcuenta], o.[sms_meventos], o.[sms_csmsparaeventos], o.[sms_imodemsms], o.[sms_cplantillasms], o.[sms_cmailparaeventos], o.[sms_cplantillamail] 
										  from [_datos].dbo.[m_sms] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[sms_idKey]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id