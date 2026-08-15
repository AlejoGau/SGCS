CREATE OR ALTER PROCEDURE m_dealer_tgconfigByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('m_dealer_tgconfig')
										
										Select o.[dtg_idKey] Id, '' Name , o.[dtg_cdealer], o.[dtg_config], o.[dtg_parking_velocidad], o.[dtg_parking_eventos], o.[dtg_parking_eventos_hide] 
										  from [_datos..m_dealer_tgconfig] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[dtg_idKey]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id