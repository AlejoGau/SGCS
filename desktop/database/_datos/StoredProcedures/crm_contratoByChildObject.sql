CREATE OR ALTER PROCEDURE crm_contratoByChildObject
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
										Select @RelationObjectTypeId = dbo.GetObjectId('crm_contrato')
										
										
										
										Select o.[cnt_iid] Id, ''Name , o.[cnt_org_fc], o.[cnt_idcliente], o.[cnt_fechaalta], o.[cnt_fechavto], o.[cnt_formapago], o.[cnt_metadata], o.[cnt_estado], o.[cnt_tmp_id], o.[cnt_dinamico] 
										  from [_datos.dbo.crm_contrato] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[cnt_iid]
										end