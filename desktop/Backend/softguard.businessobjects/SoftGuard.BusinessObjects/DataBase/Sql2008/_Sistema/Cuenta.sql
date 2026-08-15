--Objects
DELETE FROM Object WHERE Id = 3001
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3001,'Cuenta','Cuenta','m_cuentas','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Cuenta','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3001
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3001)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3001)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3001)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3001)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3001)
GO

/****** Object:  StoredProcedure [dbo].[CuentaSel]    Script Date: 01/04/2012 15:03:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[CuentaSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
							
 
 
 
										 Select [cue_iid] Id, '' Name, cue_clinea, cue_ncuenta, cue_cnombre, cue_ccalle, cue_clocalidad, cue_cprovincia, cue_ccodigopostal, cue_ccallecorreo, cue_clocalidadcorreo, cue_cprovinciacorreo, cue_ccodigopostalcorreo, cue_ctelefono, cue_cclave, cue_cpermiso, cue_ctipo, cue_cubicacion, cue_nparticion, cue_cobservacion, cue_cfoto, cue_dfechaalta, cue_dservicio, cue_nmostrar, cue_nsonidoul, cue_nllaveul, cue_cemail, cue_cinstalador, cue_cIMEI, cue_cLatLng, 
										 (Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then 'Prueba'
                       When est_nEstado=2 Then 'No Habilitado'
                       When est_nEstado=3 Then 'Prueba x Zonas '
                               Else 'Habilitado' End ) As Situacion
                               
							  			 from _Datos.dbo.[m_cuentas]
							  			 Left Outer Join _Datos.dbo.m_estado_cuenta_cab On cue_iid = est_iidcuenta
							 			  where [cue_iid] = @Id

GO

/****** Object:  StoredProcedure [dbo].[CuentaDel]    Script Date: 01/04/2012 15:03:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[CuentaDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Cuenta')
																		
										 Delete 
							  			 from _Datos.dbo.m_cuentas
							 			  where [cue_iid] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[CuentaIns]    Script Date: 01/04/2012 15:03:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



							CREATE Procedure [dbo].[CuentaIns]
													@Name VarChar(128),							
										 
										 			@cue_clinea Char (3) = '' ,
										 			@cue_ncuenta Char (10) = '' ,
										 			@cue_cnombre VarChar (60) = '',
										 			@cue_ccalle VarChar (80) = '',
										 			@cue_clocalidad VarChar (40) = '',
										 			@cue_cprovincia Char (3) = '' ,
										 			@cue_ccodigopostal VarChar (8) = '',
										 			@cue_ccallecorreo VarChar (80) = '',
										 			@cue_clocalidadcorreo VarChar (40) = '',
										 			@cue_cprovinciacorreo Char (3) = '' ,
										 			@cue_ccodigopostalcorreo VarChar (8) = '',
										 			@cue_ctelefono VarChar (30) = '',
										 			@cue_cclave VarChar (40) = '',
										 			@cue_cpermiso VarChar (40) = '',
										 			@cue_ctipo Char (3) = '' ,
										 			@cue_cubicacion Text = '',
										 			@cue_nparticion numeric (18,1) = 0,
										 			@cue_cobservacion Text = '',
										 			@cue_cfoto VarChar (60) = '',
										 			@cue_dfechaalta DateTime = 0,
										 			@cue_dservicio DateTime = 0,
										 			@cue_nmostrar numeric (18,1) = 0,
										 			@cue_nsonidoul numeric (18,1) = 0,
										 			@cue_nllaveul numeric (18,1) = 0,
										 			@cue_cemail VarChar (150) = '',
										 			@cue_cinstalador Char (3) = '' ,
										 			@cue_cIMEI VarChar (20) = '',
										 			@cue_cLatLng VarChar (30) = '',
										 			@Situacion VarChar (128) = ''
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 
declare @cue_iid int
select @cue_iid = max(cue_iid) + 1 from _Datos.dbo.m_cuentas --No tiene campo autonumeric
										 
										 Insert into _Datos.dbo.[m_cuentas] (cue_iid, 
										 cue_clinea,
cue_ncuenta,
cue_cnombre,
cue_ccalle,
cue_clocalidad,
cue_cprovincia,
cue_ccodigopostal,
cue_ccallecorreo,
cue_clocalidadcorreo,
cue_cprovinciacorreo,
cue_ccodigopostalcorreo,
cue_ctelefono,
cue_cclave,
cue_cpermiso,
cue_ctipo,
cue_cubicacion,
cue_nparticion,
cue_cobservacion,
cue_cfoto,
cue_dfechaalta,
cue_dservicio,
cue_nmostrar,
cue_nsonidoul,
cue_nllaveul,
cue_cemail,
cue_cinstalador,
cue_cIMEI,
cue_cLatLng)
										 						 values (
										 						 @cue_iid,
										 						 @cue_clinea,
@cue_ncuenta,
@cue_cnombre,
@cue_ccalle,
@cue_clocalidad,
@cue_cprovincia,
@cue_ccodigopostal,
@cue_ccallecorreo,
@cue_clocalidadcorreo,
@cue_cprovinciacorreo,
@cue_ccodigopostalcorreo,
@cue_ctelefono,
@cue_cclave,
@cue_cpermiso,
@cue_ctipo,
@cue_cubicacion,
@cue_nparticion,
@cue_cobservacion,
@cue_cfoto,
@cue_dfechaalta,
@cue_dservicio,
@cue_nmostrar,
@cue_nsonidoul,
@cue_nllaveul,
@cue_cemail,
@cue_cinstalador,
@cue_cIMEI,
@cue_cLatLng)
										
										 exec CuentaSel @cue_iid 						 



GO
							Create Procedure [dbo].[CuentaUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@cue_clinea Char (3) ,
										 			@cue_ncuenta Char (10) ,
										 			@cue_cnombre VarChar (60),
										 			@cue_ccalle VarChar (80),
										 			@cue_clocalidad VarChar (40),
										 			@cue_cprovincia Char (3) ,
										 			@cue_ccodigopostal VarChar (8),
										 			@cue_ccallecorreo VarChar (80),
										 			@cue_clocalidadcorreo VarChar (40),
										 			@cue_cprovinciacorreo Char (3) ,
										 			@cue_ccodigopostalcorreo VarChar (8),
										 			@cue_ctelefono VarChar (30),
										 			@cue_cclave VarChar (40),
										 			@cue_cpermiso VarChar (40),
										 			@cue_ctipo Char (3) ,
										 			@cue_cubicacion Text,
										 			@cue_nparticion Numeric (18,1) ,
										 			@cue_cobservacion Text,
										 			@cue_cfoto VarChar (60),
										 			@cue_dfechaalta DateTime ,
										 			@cue_dservicio DateTime ,
										 			@cue_nmostrar Numeric (18,1) ,
										 			@cue_nsonidoul Numeric (18,1) ,
										 			@cue_nllaveul Numeric (18,1) ,
										 			@cue_cemail VarChar (150),
										 			@cue_cinstalador Char (3) ,
										 			@cue_cIMEI VarChar (20),
										 			@cue_cLatLng VarChar (30),
										 			@Situacion VarChar (128)
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_cuentas] set cue_clinea = @cue_clinea,
cue_ncuenta = @cue_ncuenta,
cue_cnombre = @cue_cnombre,
cue_ccalle = @cue_ccalle,
cue_clocalidad = @cue_clocalidad,
cue_cprovincia = @cue_cprovincia,
cue_ccodigopostal = @cue_ccodigopostal,
cue_ccallecorreo = @cue_ccallecorreo,
cue_clocalidadcorreo = @cue_clocalidadcorreo,
cue_cprovinciacorreo = @cue_cprovinciacorreo,
cue_ccodigopostalcorreo = @cue_ccodigopostalcorreo,
cue_ctelefono = @cue_ctelefono,
cue_cclave = @cue_cclave,
cue_cpermiso = @cue_cpermiso,
cue_ctipo = @cue_ctipo,
cue_cubicacion = @cue_cubicacion,
cue_nparticion = @cue_nparticion,
cue_cobservacion = @cue_cobservacion,
cue_cfoto = @cue_cfoto,
cue_dfechaalta = @cue_dfechaalta,
cue_dservicio = @cue_dservicio,
cue_nmostrar = @cue_nmostrar,
cue_nsonidoul = @cue_nsonidoul,
cue_nllaveul = @cue_nllaveul,
cue_cemail = @cue_cemail,
cue_cinstalador = @cue_cinstalador,
cue_cIMEI = @cue_cIMEI,
cue_cLatLng = @cue_cLatLng
										 where [cue_iid] = @Id										 
										 exec CuentaSel @Id 						 

GO

