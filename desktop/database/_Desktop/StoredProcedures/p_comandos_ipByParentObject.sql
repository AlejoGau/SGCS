CREATE OR ALTER PROCEDURE p_comandos_ipByParentObject
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('p_comandos_ip')
										
										Select o.[cmd_iid] Id, '' Name , o.[cmd_tfechahora], o.[cmd_idCuenta], o.[cmd_idReceptor], o.[cmd_iComando], o.[cmd_cValores], o.[cmd_nEstado], o.[cmd_cObservaciones], o.[cmd_iEsCustom], o.[cmd_cAlarmaGenerar] 
										  from [_Datos.dbo.p_comandos_ip] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @RelationObjectTypeId
													   and r.ObjectId = o.[cmd_iid]
													   and r.RelationObjectTypeId = @ObjectTypeId
													   and r.RelationObjectId = @Id