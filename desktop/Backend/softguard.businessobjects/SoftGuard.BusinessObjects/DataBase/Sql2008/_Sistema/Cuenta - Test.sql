--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3031,'Test','Test','t_tst_prueba','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Test','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3031)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3031)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3031)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3031)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3031)
GO

--Stores

/****** Object:  StoredProcedure [dbo].[TestByChildObject]    Script Date: 01/09/2012 13:17:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TestByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentatst_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[tst_iidcuenta] Id, '' Name, o.[tst_ncada], o.[tst_ntipo], o.[tst_ireinicio], o.[tst_calarma], o.[tst_ncada2], o.[tst_ntipo2], o.[tst_calarmaesperada], o.[tst_calarmagenerar], o.[tst_ncada3], o.[tst_ntipo3], o.[tst_calarma3esperada], o.[tst_calarma3generar] 
											from _Datos.dbo.[m_tst_prueba] o
											where [tst_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Test')
										
										
										
										Select o.[tst_iidcuenta] Id, '' Name, o.[tst_ncada], o.[tst_ntipo], o.[tst_ireinicio], o.[tst_calarma], o.[tst_ncada2], o.[tst_ntipo2], o.[tst_calarmaesperada], o.[tst_calarmagenerar], o.[tst_ncada3], o.[tst_ntipo3], o.[tst_calarma3esperada], o.[tst_calarma3generar] 
										  from _Datos.dbo.[m_tst_prueba] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tst_iidcuenta]
										end

GO

/****** Object:  StoredProcedure [dbo].[TestDel]    Script Date: 01/09/2012 13:17:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TestDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Test')
																		
										 Delete 
							  			 from _Datos.dbo.m_tst_prueba
							 			  where [tst_iidcuenta] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[TestIns]    Script Date: 01/09/2012 13:17:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TestIns]
													@Name VarChar(128),							
										 
										 			@tst_ncada numeric (4,1) = 0,
										 			@tst_ntipo numeric (1,1) = 0,
										 			@tst_ireinicio Int = 0,
										 			@tst_calarma Char (3) = '' ,
										 			@tst_ncada2 numeric (4,1) = 0,
										 			@tst_ntipo2 numeric (1,1) = 0,
										 			@tst_calarmaesperada Char (3) = '' ,
										 			@tst_calarmagenerar Char (3) = '' ,
										 			@tst_ncada3 numeric (4,1) = 0,
										 			@tst_ntipo3 numeric (1,1) = 0,
										 			@tst_calarma3esperada Char (3) = '' ,
										 			@tst_calarma3generar Char (3) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_tst_prueba] ([tst_ncada],
[tst_ntipo],
[tst_ireinicio],
[tst_calarma],
[tst_ncada2],
[tst_ntipo2],
[tst_calarmaesperada],
[tst_calarmagenerar],
[tst_ncada3],
[tst_ntipo3],
[tst_calarma3esperada],
[tst_calarma3generar])
										 						 values (@tst_ncada,
@tst_ntipo,
@tst_ireinicio,
@tst_calarma,
@tst_ncada2,
@tst_ntipo2,
@tst_calarmaesperada,
@tst_calarmagenerar,
@tst_ncada3,
@tst_ntipo3,
@tst_calarma3esperada,
@tst_calarma3generar)
										
										 exec TestSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[TestSel]    Script Date: 01/09/2012 13:17:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[TestSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [tst_iidcuenta] Id, '' Name, [tst_ncada], [tst_ntipo], [tst_ireinicio], [tst_calarma], [tst_ncada2], [tst_ntipo2], [tst_calarmaesperada], [tst_calarmagenerar], [tst_ncada3], [tst_ntipo3], [tst_calarma3esperada], [tst_calarma3generar]
							  			 from _Datos.dbo.[m_tst_prueba]
							 			  where [tst_iidcuenta] = @Id

GO

/****** Object:  StoredProcedure [dbo].[TestUpd]    Script Date: 01/09/2012 13:17:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


							CREATE Procedure [dbo].[TestUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@tst_ncada numeric (4,0) ,
										 			@tst_ntipo numeric (1,0) ,
										 			@tst_ireinicio Int,
										 			@tst_calarma Char (3) ,
										 			@tst_ncada2 numeric (4,0) ,
										 			@tst_ntipo2 numeric (1,0) ,
										 			@tst_calarmaesperada Char (3) ,
										 			@tst_calarmagenerar Char (3) ,
										 			@tst_ncada3 numeric (4,0) ,
										 			@tst_ntipo3 numeric (1,0) ,
										 			@tst_calarma3esperada Char (3) ,
										 			@tst_calarma3generar Char (3) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_tst_prueba] set [tst_ncada] = @tst_ncada,
[tst_ntipo] = @tst_ntipo,
[tst_ireinicio] = @tst_ireinicio,
[tst_calarma] = @tst_calarma,
[tst_ncada2] = @tst_ncada2,
[tst_ntipo2] = @tst_ntipo2,
[tst_calarmaesperada] = @tst_calarmaesperada,
[tst_calarmagenerar] = @tst_calarmagenerar,
[tst_ncada3] = @tst_ncada3,
[tst_ntipo3] = @tst_ntipo3,
[tst_calarma3esperada] = @tst_calarma3esperada,
[tst_calarma3generar] = @tst_calarma3generar										
										 where [tst_iidcuenta] = @Id										 
										 exec TestSel @Id 						 


GO


