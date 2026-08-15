CREATE OR ALTER PROCEDURE m_simcardByChildObject
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
										Select @RelationObjectTypeId = dbo.GetObjectId('m_simcard')
										
										
										
										Select o.[sim_id] Id, ''Name , o.[sim_cuenta], o.[sim_apn], o.[sim_abonado], o.[sim_csid], o.[sim_fecha_activacion], o.[sim_iccid], o.[sim_marca], o.[sim_cliente], o.[sim_agente], o.[sim_estado], o.[sim_codigo], o.[sim_observaciones] 
										  from [_Datos.dbo.m_simcard] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[sim_id]
										end