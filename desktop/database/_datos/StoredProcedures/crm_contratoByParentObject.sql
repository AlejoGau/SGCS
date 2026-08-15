CREATE OR ALTER PROCEDURE crm_contratoByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('crm_contrato')
										
										Select o.[cnt_iid] Id, '' Name , o.[cnt_org_fc], o.[cnt_idcliente], o.[cnt_fechaalta], o.[cnt_fechavto], o.[cnt_formapago], o.[cnt_metadata], o.[cnt_estado], o.[cnt_tmp_id], o.[cnt_dinamico] 
										  from [_datos.dbo.crm_contrato] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[cnt_iid]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id