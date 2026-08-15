--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3013,'Usuario','Usuario','m_usuarios','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Usuario','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3013
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3013)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3013)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3013)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3013)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3013)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[UsuarioDel]    Script Date: 01/05/2012 10:45:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UsuarioDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Usuario')
																		
										 Delete 
							  			 from _Datos.dbo.m_usuarios
							 			  where [usu_iid] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[UsuarioIns]    Script Date: 01/05/2012 10:45:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UsuarioIns]
													@Name VarChar(128),							
										 
										 			@usu_iidcuenta Int = 0,
										 			@usu_icodigo Int = 0,
										 			@usu_cnombre VarChar (30) = '',
										 			@usu_iid Int = 0,
										 			@usu_cclave VarChar (20) = '',
										 			@usu_ntipo numeric (18,1) = 0,
										 			@usu_cimagen VarChar (60) = '',
										 			@usu_mobservacion Text = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_usuarios] (usu_iidcuenta,
usu_icodigo,
usu_cnombre,
usu_iid,
usu_cclave,
usu_ntipo,
usu_cimagen,
usu_mobservacion)
										 						 values (@usu_iidcuenta,
@usu_icodigo,
@usu_cnombre,
@usu_iid,
@usu_cclave,
@usu_ntipo,
@usu_cimagen,
@usu_mobservacion)
										
										 exec UsuarioSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[UsuarioSel]    Script Date: 01/05/2012 10:45:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UsuarioSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [usu_iid] Id, '' Name, usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_cclave, usu_ntipo, usu_cimagen, usu_mobservacion
							  			 from _Datos.dbo.[m_usuarios]
							 			  where [usu_iid] = @Id

GO

/****** Object:  StoredProcedure [dbo].[UsuarioUpd]    Script Date: 01/05/2012 10:45:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[UsuarioUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@usu_iidcuenta Int ,
										 			@usu_icodigo Int ,
										 			@usu_cnombre VarChar (30),
										 			@usu_iid Int ,
										 			@usu_cclave VarChar (20),
										 			@usu_ntipo Numeric (18,1) ,
										 			@usu_cimagen VarChar (60),
										 			@usu_mobservacion Text
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_usuarios] set usu_iidcuenta = @usu_iidcuenta,
usu_icodigo = @usu_icodigo,
usu_cnombre = @usu_cnombre,
usu_cclave = @usu_cclave,
usu_ntipo = @usu_ntipo,
usu_cimagen = @usu_cimagen,
usu_mobservacion = @usu_mobservacion										
										 where [usu_iid] = @Id										 
										 exec UsuarioSel @Id 						 

GO


							Create Procedure [dbo].[UsuarioByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentausu_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[usu_iid] Id, '' Name, o.usu_iidcuenta, o.usu_icodigo, o.usu_cnombre, o.usu_iid, o.usu_cclave, o.usu_ntipo, o.usu_cimagen, o.usu_mobservacion 
											from _Datos.dbo.[m_usuarios] o
											where [usu_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Usuario')
										
										
										
										Select o.[usu_iid] Id, '' Name, o.usu_iidcuenta, o.usu_icodigo, o.usu_cnombre, o.usu_iid, o.usu_cclave, o.usu_ntipo, o.usu_cimagen, o.usu_mobservacion 
										  from _Datos.dbo.[m_usuarios] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[usu_iid]
										end

GO

