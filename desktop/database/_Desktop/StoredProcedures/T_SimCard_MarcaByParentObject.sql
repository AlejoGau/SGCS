CREATE OR ALTER PROCEDURE T_SimCard_MarcaByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('T_SimCard_Marca')
										
										Select o.[tsm_idKey] Id, '' Name , o.[tsm_cDescripcion] 
										  from [_Datos.dbo.T_SimCard_Marca] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[tsm_idKey]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id