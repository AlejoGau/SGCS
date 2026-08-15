CREATE OR ALTER PROCEDURE m_sgnotesByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('m_sgnotes')
										
										Select o.[sgn_idkey] Id, '' Name , o.[sgn_title], o.[sgn_body], o.[sgn_userid], o.[sgn_status], o.[sgn_datecreated], o.[sgn_fileduserid] 
										  from [_datos.dbo.m_sgnotes] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[sgn_idkey]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id