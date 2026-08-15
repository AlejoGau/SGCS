--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3017,'Panel','Panel','m_paneles','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Panel','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3017)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3017)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3017)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3017)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3017)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[PanelByChildObject]    Script Date: 01/09/2012 13:09:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PanelByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentapan_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[pan_iidcuenta] Id, '' Name, o.pan_iidcuenta, o.pan_ccodigo, o.pan_mubicacion, o.pan_ccallerid1, o.pan_ccallerid2, o.pan_ccallerid3, o.pan_ccallerid4, o.pan_ccallerid5, o.pan_nmostrar, o.pan_csender 
											from _Datos.dbo.[m_paneles] o
											where [pan_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Panel')
										
										
										
										Select o.[pan_iidcuenta] Id, '' Name, o.pan_iidcuenta, o.pan_ccodigo, o.pan_mubicacion, o.pan_ccallerid1, o.pan_ccallerid2, o.pan_ccallerid3, o.pan_ccallerid4, o.pan_ccallerid5, o.pan_nmostrar, o.pan_csender 
										  from _Datos.dbo.[m_paneles] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[pan_iidcuenta]
										end

GO

/****** Object:  StoredProcedure [dbo].[PanelDel]    Script Date: 01/09/2012 13:09:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PanelDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Panel')
																		
										 Delete 
							  			 from _Datos.dbo.m_paneles
							 			  where [pan_iidcuenta] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[PanelIns]    Script Date: 01/09/2012 13:09:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PanelIns]
													@Name VarChar(128),							
										 
										 			@pan_iidcuenta Int = 0,
										 			@pan_ccodigo Char (3) = '' ,
										 			@pan_mubicacion Text = '',
										 			@pan_ccallerid1 VarChar (10) = '',
										 			@pan_ccallerid2 VarChar (10) = '',
										 			@pan_ccallerid3 VarChar (10) = '',
										 			@pan_ccallerid4 VarChar (10) = '',
										 			@pan_ccallerid5 VarChar (10) = '',
										 			@pan_nmostrar numeric (18,1) = 0,
										 			@pan_csender VarChar (20) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_paneles] (pan_iidcuenta,
pan_ccodigo,
pan_mubicacion,
pan_ccallerid1,
pan_ccallerid2,
pan_ccallerid3,
pan_ccallerid4,
pan_ccallerid5,
pan_nmostrar,
pan_csender)
										 						 values (@pan_iidcuenta,
@pan_ccodigo,
@pan_mubicacion,
@pan_ccallerid1,
@pan_ccallerid2,
@pan_ccallerid3,
@pan_ccallerid4,
@pan_ccallerid5,
@pan_nmostrar,
@pan_csender)
										
										 exec PanelSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[PanelSel]    Script Date: 01/09/2012 13:09:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PanelSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [pan_iidcuenta] Id, '' Name, pan_iidcuenta, pan_ccodigo, pan_mubicacion, pan_ccallerid1, pan_ccallerid2, pan_ccallerid3, pan_ccallerid4, pan_ccallerid5, pan_nmostrar, pan_csender
							  			 from _Datos.dbo.[m_paneles]
							 			  where [pan_iidcuenta] = @Id

GO

/****** Object:  StoredProcedure [dbo].[PanelUpd]    Script Date: 01/09/2012 13:09:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[PanelUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@pan_iidcuenta Int ,
										 			@pan_ccodigo Char (3) ,
										 			@pan_mubicacion Text,
										 			@pan_ccallerid1 VarChar (10),
										 			@pan_ccallerid2 VarChar (10),
										 			@pan_ccallerid3 VarChar (10),
										 			@pan_ccallerid4 VarChar (10),
										 			@pan_ccallerid5 VarChar (10),
										 			@pan_nmostrar Numeric (18,1) ,
										 			@pan_csender VarChar (20)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_paneles] set pan_ccodigo = @pan_ccodigo,
pan_mubicacion = @pan_mubicacion,
pan_ccallerid1 = @pan_ccallerid1,
pan_ccallerid2 = @pan_ccallerid2,
pan_ccallerid3 = @pan_ccallerid3,
pan_ccallerid4 = @pan_ccallerid4,
pan_ccallerid5 = @pan_ccallerid5,
pan_nmostrar = @pan_nmostrar,
pan_csender = @pan_csender										
										 where [pan_iidcuenta] = @Id										 
										 exec PanelSel @Id 						 

GO


