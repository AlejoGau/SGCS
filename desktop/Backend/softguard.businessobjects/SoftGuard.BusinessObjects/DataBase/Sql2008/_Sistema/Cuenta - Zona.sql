--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3014,'Zona','Zona','m_zonas','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Zona','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3014)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3014)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3014)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3014)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3014)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[ZonaByChildObject]    Script Date: 01/09/2012 12:37:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentazon_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[zon_idKey] Id, '' Name, o.zon_iidcuenta, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_clistaemergencia, o.zon_cimagen, o.zon_mobservacion, o.zon_ccodigorestauracion, o.zon_nminutosrestauracion, o.zon_nmostrar, o.zon_cdealer, o.zon_ccuenta, o.zon_nautoprocesa 
											from _Datos.dbo.[m_zonas] o
											where [zon_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Zona')
										
										
										
										Select o.[zon_idKey] Id, '' Name, o.zon_iidcuenta, o.zon_ccodigo, o.zon_cdescripcion, o.zon_codigoalarma, o.zon_clistaemergencia, o.zon_cimagen, o.zon_mobservacion, o.zon_ccodigorestauracion, o.zon_nminutosrestauracion, o.zon_nmostrar, o.zon_cdealer, o.zon_ccuenta, o.zon_nautoprocesa 
										  from _Datos.dbo.[m_zonas] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[zon_idKey]
										end

GO

/****** Object:  StoredProcedure [dbo].[ZonaDel]    Script Date: 01/09/2012 12:37:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Zona')
																		
										 Delete 
							  			 from _Datos.dbo.m_zonas
							 			  where [zon_idKey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[ZonaIns]    Script Date: 01/09/2012 12:37:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaIns]
													@Name VarChar(128),							
										 
										 			@zon_iidcuenta Int = 0,
										 			@zon_ccodigo Char (10) = '' ,
										 			@zon_cdescripcion VarChar (60) = '',
										 			@zon_codigoalarma Char (3) = '' ,
										 			@zon_clistaemergencia Char (3) = '' ,
										 			@zon_cimagen VarChar (60) = '',
										 			@zon_mobservacion Text = '',
										 			@zon_ccodigorestauracion Char (3) = '' ,
										 			@zon_nminutosrestauracion numeric (18,1) = 0,
										 			@zon_nmostrar numeric (18,1) = 0,
										 			@zon_cdealer Char (3) = '' ,
										 			@zon_ccuenta Char (10) = '' ,
										 			@zon_nautoprocesa numeric (18,1) = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_zonas] (zon_iidcuenta,
zon_ccodigo,
zon_cdescripcion,
zon_codigoalarma,
zon_clistaemergencia,
zon_cimagen,
zon_mobservacion,
zon_ccodigorestauracion,
zon_nminutosrestauracion,
zon_nmostrar,
zon_cdealer,
zon_ccuenta,
zon_nautoprocesa)
										 						 values (@zon_iidcuenta,
@zon_ccodigo,
@zon_cdescripcion,
@zon_codigoalarma,
@zon_clistaemergencia,
@zon_cimagen,
@zon_mobservacion,
@zon_ccodigorestauracion,
@zon_nminutosrestauracion,
@zon_nmostrar,
@zon_cdealer,
@zon_ccuenta,
@zon_nautoprocesa)
										
										 exec ZonaSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[ZonaSel]    Script Date: 01/09/2012 12:37:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [zon_idKey] Id, '' Name, zon_iidcuenta, zon_ccodigo, zon_cdescripcion, zon_codigoalarma, zon_clistaemergencia, zon_cimagen, zon_mobservacion, zon_ccodigorestauracion, zon_nminutosrestauracion, zon_nmostrar, zon_cdealer, zon_ccuenta, zon_nautoprocesa
							  			 from _Datos.dbo.[m_zonas]
							 			  where [zon_idKey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[ZonaUpd]    Script Date: 01/09/2012 12:37:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ZonaUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@zon_iidcuenta Int ,
										 			@zon_ccodigo Char (10) ,
										 			@zon_cdescripcion VarChar (60),
										 			@zon_codigoalarma Char (3) ,
										 			@zon_clistaemergencia Char (3) ,
										 			@zon_cimagen VarChar (60),
										 			@zon_mobservacion Text,
										 			@zon_ccodigorestauracion Char (3) ,
										 			@zon_nminutosrestauracion Numeric (18,1) ,
										 			@zon_nmostrar Numeric (18,1) ,
										 			@zon_cdealer Char (3) ,
										 			@zon_ccuenta Char (10) ,
										 			@zon_nautoprocesa Numeric (18,1) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_zonas] set zon_iidcuenta = @zon_iidcuenta,
zon_ccodigo = @zon_ccodigo,
zon_cdescripcion = @zon_cdescripcion,
zon_codigoalarma = @zon_codigoalarma,
zon_clistaemergencia = @zon_clistaemergencia,
zon_cimagen = @zon_cimagen,
zon_mobservacion = @zon_mobservacion,
zon_ccodigorestauracion = @zon_ccodigorestauracion,
zon_nminutosrestauracion = @zon_nminutosrestauracion,
zon_nmostrar = @zon_nmostrar,
zon_cdealer = @zon_cdealer,
zon_ccuenta = @zon_ccuenta,
zon_nautoprocesa = @zon_nautoprocesa										
										 where [zon_idKey] = @Id										 
										 exec ZonaSel @Id 						 

GO

