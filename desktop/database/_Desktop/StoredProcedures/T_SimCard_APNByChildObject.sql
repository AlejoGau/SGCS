CREATE OR ALTER PROCEDURE T_SimCard_APNByChildObject
										@ObjectType VarChar(50),
										@Id Int
										--,@UserId Int = 0    
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										0
										**
										
										*/
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('T_SimCard_APN')
										
										
										
										Select o.[tsa_idKey] Id, ''Name , o.[tsa_cDescripcion], o.[tsa_cURL], o.[tsa_cUser], o.[tnd_cPassword] 
										  from [_Datos.dbo.T_SimCard_APN] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tsa_idKey]
										end