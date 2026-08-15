--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3016,'ZonaTemp','ZonaTemp','m_zonas_temp','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.ZonaTemp','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3016)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3016)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3016)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3016)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3016)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[ZonaTempByChildObject]    Script Date: 01/09/2012 13:04:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaTempByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										4
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[zon_idregistro] Id, '' Name, o.zon_idregistro, o.zon_iidcuenta, o.zon_usuario, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_tipo, o.zon_cimagen 
											from _Datos.dbo.[m_zonas_temp] o
											where [zon_iidcuenta] = @Id
										end																														
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('ZonaTemp')
										
										
										
										Select o.[zon_idregistro] Id, '' Name, o.zon_idregistro, o.zon_iidcuenta, o.zon_usuario, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_tipo, o.zon_cimagen 
										  from _Datos.dbo.[m_zonas_temp] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[zon_idregistro]
										end

GO

/****** Object:  StoredProcedure [dbo].[ZonaTempDel]    Script Date: 01/09/2012 13:04:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaTempDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('ZonaTemp')
																		
										 Delete 
							  			 from _Datos.dbo.m_zonas_temp
							 			  where [zon_idregistro] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[ZonaTempIns]    Script Date: 01/09/2012 13:04:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaTempIns]
													@Name VarChar(128),							
										 
										 			@zon_idregistro Int = 0,
										 			@zon_iidcuenta Int = 0,
										 			@zon_usuario Int = 0,
										 			@zon_ccodigo Char (10) = '' ,
										 			@zon_cdescripcion VarChar (60) = '',
										 			@zon_codigoalarma Char (3) = '' ,
										 			@zon_tipo Char (1) = '' ,
										 			@zon_cimagen VarChar (100) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_zonas_temp] (zon_idregistro,
zon_iidcuenta,
zon_usuario,
zon_ccodigo,
zon_cdescripcion,
zon_codigoalarma,
zon_tipo,
zon_cimagen)
										 						 values (@zon_idregistro,
@zon_iidcuenta,
@zon_usuario,
@zon_ccodigo,
@zon_cdescripcion,
@zon_codigoalarma,
@zon_tipo,
@zon_cimagen)
										
										 exec ZonaTempSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[ZonaTempSel]    Script Date: 01/09/2012 13:04:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaTempSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [zon_idregistro] Id, '' Name, zon_idregistro, zon_iidcuenta, zon_usuario, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_tipo, zon_cimagen
							  			 from _Datos.dbo.[m_zonas_temp]
							 			  where [zon_idregistro] = @Id

GO

/****** Object:  StoredProcedure [dbo].[ZonaTempUpd]    Script Date: 01/09/2012 13:04:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaTempUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@zon_iidcuenta Int ,
										 			@zon_usuario Int ,
										 			@zon_ccodigo Char (10) ,
										 			@zon_cdescripcion VarChar (60),
										 			@zon_codigoalarma Char (3) ,
										 			@zon_tipo Char (1) ,
										 			@zon_cimagen VarChar (100)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_zonas_temp] set zon_iidcuenta = @zon_iidcuenta,
zon_usuario = @zon_usuario,
zon_ccodigo = @zon_ccodigo,
zon_cdescripcion = @zon_cdescripcion,
zon_codigoalarma = @zon_codigoalarma,
zon_tipo = @zon_tipo,
zon_cimagen = @zon_cimagen										
										 where [zon_idregistro] = @Id										 
										 exec ZonaTempSel @Id 						 

GO




