CREATE OR ALTER PROCEDURE T_SimCard_APNByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('T_SimCard_APN')
										
										Select o.[tsa_idKey] Id, '' Name , o.[tsa_cDescripcion], o.[tsa_cURL], o.[tsa_cUser], o.[tnd_cPassword] 
										  from [_Datos.dbo.T_SimCard_APN] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[tsa_idKey]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id