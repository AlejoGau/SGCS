CREATE OR ALTER PROCEDURE m_dealer_tgconfigByChildObject
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
										Select @RelationObjectTypeId = dbo.GetObjectId('m_dealer_tgconfig')
										
										
										
										Select o.[dtg_idKey] Id, ''Name , o.[dtg_cdealer], o.[dtg_config], o.[dtg_parking_velocidad], o.[dtg_parking_eventos], o.[dtg_parking_eventos_hide] 
										  from [_datos..m_dealer_tgconfig] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[dtg_idKey]
										end