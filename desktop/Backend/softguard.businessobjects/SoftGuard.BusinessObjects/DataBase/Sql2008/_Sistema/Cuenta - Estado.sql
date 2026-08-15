--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3033,'Estado','Estado','m_estado_cuenta_cab','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Estado','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3033)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3033)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3033)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3033)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3033)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[EstadoByChildObject]    Script Date: 01/09/2012 13:30:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentaest_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[est_iidcuenta] Id, '' Name, o.[est_nestado], o.[est_ntipo], o.[est_dfechadesde], o.[est_nduracion], o.[est_dfechahasta], o.[est_mnota] 
											from _Datos.dbo.[m_estado_cuenta_cab] o
											where [est_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Estado')
										
										
										
										Select o.[est_iidcuenta] Id, '' Name, o.[est_nestado], o.[est_ntipo], o.[est_dfechadesde], o.[est_nduracion], o.[est_dfechahasta], o.[est_mnota] 
										  from _Datos.dbo.[m_estado_cuenta_cab] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[est_iidcuenta]
										end

GO

/****** Object:  StoredProcedure [dbo].[EstadoDel]    Script Date: 01/09/2012 13:30:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Estado')
																		
										 Delete 
							  			 from _Datos.dbo.m_estado_cuenta_cab
							 			  where [est_iidcuenta] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[EstadoIns]    Script Date: 01/09/2012 13:30:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoIns]
													@Name VarChar(128),							
										 
										 			@est_nestado numeric (1,1) = 0,
										 			@est_ntipo numeric (1,1) = 0,
										 			@est_dfechadesde DateTime = 0,
										 			@est_nduracion numeric (3,1) = 0,
										 			@est_dfechahasta DateTime = 0,
										 			@est_mnota Text = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_estado_cuenta_cab] ([est_nestado],
[est_ntipo],
[est_dfechadesde],
[est_nduracion],
[est_dfechahasta],
[est_mnota])
										 						 values (@est_nestado,
@est_ntipo,
@est_dfechadesde,
@est_nduracion,
@est_dfechahasta,
@est_mnota)
										
										 exec EstadoSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[EstadoSel]    Script Date: 01/09/2012 13:30:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[EstadoSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [est_iidcuenta] Id, '' Name, [est_nestado], [est_ntipo], [est_dfechadesde], [est_nduracion], [est_dfechahasta], [est_mnota]
							  			 from _Datos.dbo.[m_estado_cuenta_cab]
							 			  where [est_iidcuenta] = @Id

GO

/****** Object:  StoredProcedure [dbo].[EstadoUpd]    Script Date: 01/09/2012 13:30:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


							CREATE Procedure [dbo].[EstadoUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@est_nestado numeric (1,0) ,
										 			@est_ntipo numeric (1,0) ,
										 			@est_dfechadesde DateTime,
										 			@est_nduracion numeric (3,0) ,
										 			@est_dfechahasta DateTime,
										 			@est_mnota  Text
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_estado_cuenta_cab] set [est_nestado] = @est_nestado,
[est_ntipo] = @est_ntipo,
[est_dfechadesde] = @est_dfechadesde,
[est_nduracion] = @est_nduracion,
[est_dfechahasta] = @est_dfechahasta,
[est_mnota] = @est_mnota										
										 where [est_iidcuenta] = @Id										 
										 exec EstadoSel @Id 						 


GO


