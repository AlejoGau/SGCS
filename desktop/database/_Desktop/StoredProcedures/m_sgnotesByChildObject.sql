CREATE OR ALTER PROCEDURE m_sgnotesByChildObject
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
										Select @RelationObjectTypeId = dbo.GetObjectId('m_sgnotes')
										
										
										
										Select o.[sgn_idkey] Id, ''Name , o.[sgn_title], o.[sgn_body], o.[sgn_userid], o.[sgn_status], o.[sgn_datecreated], o.[sgn_fileduserid] 
										  from [_datos.dbo.m_sgnotes] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[sgn_idkey]
										end