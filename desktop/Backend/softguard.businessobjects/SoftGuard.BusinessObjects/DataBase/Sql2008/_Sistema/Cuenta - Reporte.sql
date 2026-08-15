--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3032,'Reporte','Reporte','m_reportes_automaticos','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Reporte','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3032)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3032)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3032)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3032)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3032)
GO

--Alter Table
ALTER TABLE _Datos.dbo.m_reportes_automaticos ADD rep_idKey INT IDENTITY(1,1)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[ReporteByChildObject]    Script Date: 01/09/2012 13:20:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ReporteByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentarep_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[rep_idKey] Id, '' Name , o.[rep_ntipo], o.[rep_iidcuenta], o.[rep_tproximoenvio], o.[rep_nfrecuencia], o.[rep_cmail], o.[rep_meventos], o.[rep_cmailparaeventos], o.[rep_csmsparaeventos], o.[rep_imodemsms], o.[rep_cplantillasms] 
											from _datos.dbo.[m_reportes_automaticos] o
											where [rep_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Reporte')
										
										
										
										Select o.[rep_idKey] Id, ''Name , o.[rep_ntipo], o.[rep_iidcuenta], o.[rep_tproximoenvio], o.[rep_nfrecuencia], o.[rep_cmail], o.[rep_meventos], o.[rep_cmailparaeventos], o.[rep_csmsparaeventos], o.[rep_imodemsms], o.[rep_cplantillasms] 
										  from _Datos.dbo.[m_reportes_automaticos] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[rep_idKey]
										end

GO

/****** Object:  StoredProcedure [dbo].[ReporteDel]    Script Date: 01/09/2012 13:20:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ReporteDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('Reporte')
																		
										 Delete 
							  			 from _Datos.dbo.m_reportes_automaticos
							 			  where [rep_idKey] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[ReporteIns]    Script Date: 01/09/2012 13:20:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ReporteIns]
													@Name VarChar(128)		
										 ,
										 			@rep_ntipo numeric (1,0) = 0,
										 			@rep_iidcuenta Int = 0,
										 			@rep_tproximoenvio DateTime = 0,
										 			@rep_nfrecuencia numeric (1,0) = 0,
										 			@rep_cmail VarChar (150) = '',
										 			@rep_meventos Text = '',
										 			@rep_cmailparaeventos VarChar (150) = '',
										 			@rep_csmsparaeventos VarChar (150) = '',
										 			@rep_imodemsms Int = 0,
										 			@rep_cplantillasms Char (3) = '' 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_reportes_automaticos] ([rep_ntipo],[rep_iidcuenta],[rep_tproximoenvio],[rep_nfrecuencia],[rep_cmail],[rep_meventos],[rep_cmailparaeventos],[rep_csmsparaeventos],[rep_imodemsms],[rep_cplantillasms])
										 						 values ( @rep_ntipo, @rep_iidcuenta, @rep_tproximoenvio, @rep_nfrecuencia, @rep_cmail, @rep_meventos, @rep_cmailparaeventos, @rep_csmsparaeventos, @rep_imodemsms, @rep_cplantillasms)
										
										 exec ReporteSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[ReporteSel]    Script Date: 01/09/2012 13:20:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ReporteSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [rep_idKey] Id, '' Name
										 , [rep_ntipo], [rep_iidcuenta], [rep_tproximoenvio], [rep_nfrecuencia], [rep_cmail], [rep_meventos], [rep_cmailparaeventos], [rep_csmsparaeventos], [rep_imodemsms], [rep_cplantillasms]
							  			 from _Datos.dbo.[m_reportes_automaticos]
							 			  where [rep_idKey] = @Id

GO

/****** Object:  StoredProcedure [dbo].[ReporteUpd]    Script Date: 01/09/2012 13:20:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[ReporteUpd]
										 @Id Int,
										 @Name VarChar(128)
										 ,
										 			@rep_ntipo numeric (1,0) ,
										 			@rep_iidcuenta Int,
										 			@rep_tproximoenvio DateTime,
										 			@rep_nfrecuencia numeric (1,0) ,
										 			@rep_cmail VarChar (150),
										 			@rep_meventos  Text,
										 			@rep_cmailparaeventos VarChar (150),
										 			@rep_csmsparaeventos VarChar (150),
										 			@rep_imodemsms Int,
										 			@rep_cplantillasms Char (3) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_reportes_automaticos] set [rep_ntipo] = @rep_ntipo,[rep_iidcuenta] = @rep_iidcuenta,[rep_tproximoenvio] = @rep_tproximoenvio,[rep_nfrecuencia] = @rep_nfrecuencia,[rep_cmail] = @rep_cmail,[rep_meventos] = @rep_meventos,[rep_cmailparaeventos] = @rep_cmailparaeventos,[rep_csmsparaeventos] = @rep_csmsparaeventos,[rep_imodemsms] = @rep_imodemsms,[rep_cplantillasms] = @rep_cplantillasms										
										 where [rep_idKey] = @Id										 
										 exec ReporteSel @Id 						 

GO


