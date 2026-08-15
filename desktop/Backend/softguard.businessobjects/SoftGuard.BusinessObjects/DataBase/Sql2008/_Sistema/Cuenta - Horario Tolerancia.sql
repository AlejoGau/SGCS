--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3008,'HorarioTolerancia','HorarioTolerancia','m_horarios_tolerancia','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.HorarioTolerancia','SoftGuard.BusinessObjects.dll')
GO

--Permissions
DELETE FROM Permission WHERE ObjectId = 3006
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3008)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3008)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3008)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3008)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3008)
GO

--Stores
/****** Object:  StoredProcedure [dbo].[HorarioToleranciaByChildObject]    Script Date: 01/09/2012 12:32:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioToleranciaByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentatol_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[tol_iidcuenta] Id, '' Name, o.[tol_naperturaantes], o.[tol_caperturaantesalarma], o.[tol_naperturadespues], o.[tol_caperturadespuesalarma], o.[tol_ncierreantes], o.[tol_ccierreantesalarma], o.[tol_ncierredespues], o.[tol_ccierredespuesalarma], o.[tol_nnyo], o.[tol_nnyc], o.[tol_nControl], o.[tol_nModo], o.[tol_nAPNYO], o.[tol_nAPNYC] 
											from _Datos.dbo.[m_horarios_tolerancia] o
											where [tol_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('HorarioTolerancia')
										
										
										
										Select o.[tol_iidcuenta] Id, '' Name, o.[tol_naperturaantes], o.[tol_caperturaantesalarma], o.[tol_naperturadespues], o.[tol_caperturadespuesalarma], o.[tol_ncierreantes], o.[tol_ccierreantesalarma], o.[tol_ncierredespues], o.[tol_ccierredespuesalarma], o.[tol_nnyo], o.[tol_nnyc], o.[tol_nControl], o.[tol_nModo], o.[tol_nAPNYO], o.[tol_nAPNYC] 
										  from _Datos.dbo.[m_horarios_tolerancia] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[tol_iidcuenta]
										end

GO

/****** Object:  StoredProcedure [dbo].[HorarioToleranciaDel]    Script Date: 01/09/2012 12:32:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioToleranciaDel]
										 @Id Int
							--WITH ENCRYPTION			 
							AS
 										 Declare @ObjectTypeId int
                     Select @ObjectTypeId = dbo.GetObjectId('HorarioTolerancia')
																		
										 Delete 
							  			 from _Datos.dbo.m_horarios_tolerancia
							 			  where [tol_iidcuenta] = @Id										

                     exec RelationsByRelationDel  @ObjectTypeId,  @Id
											

GO

/****** Object:  StoredProcedure [dbo].[HorarioToleranciaIns]    Script Date: 01/09/2012 12:32:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioToleranciaIns]
													@Name VarChar(128),							
										 
										 			@tol_naperturaantes SmallInt = 0,
										 			@tol_caperturaantesalarma Char (3) = '' ,
										 			@tol_naperturadespues SmallInt = 0,
										 			@tol_caperturadespuesalarma Char (3) = '' ,
										 			@tol_ncierreantes SmallInt = 0,
										 			@tol_ccierreantesalarma Char (3) = '' ,
										 			@tol_ncierredespues SmallInt = 0,
										 			@tol_ccierredespuesalarma Char (3) = '' ,
										 			@tol_nnyo numeric (18,1) = 0,
										 			@tol_nnyc numeric (18,1) = 0,
										 			@tol_nControl numeric (18,1) = 0,
										 			@tol_nModo numeric (18,1) = 0,
										 			@tol_nAPNYO numeric (18,1) = 0,
										 			@tol_nAPNYC numeric (18,1) = 0
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 Insert into _Datos.dbo.[m_horarios_tolerancia] ([tol_naperturaantes],
[tol_caperturaantesalarma],
[tol_naperturadespues],
[tol_caperturadespuesalarma],
[tol_ncierreantes],
[tol_ccierreantesalarma],
[tol_ncierredespues],
[tol_ccierredespuesalarma],
[tol_nnyo],
[tol_nnyc],
[tol_nControl],
[tol_nModo],
[tol_nAPNYO],
[tol_nAPNYC])
										 						 values (@tol_naperturaantes,
@tol_caperturaantesalarma,
@tol_naperturadespues,
@tol_caperturadespuesalarma,
@tol_ncierreantes,
@tol_ccierreantesalarma,
@tol_ncierredespues,
@tol_ccierredespuesalarma,
@tol_nnyo,
@tol_nnyc,
@tol_nControl,
@tol_nModo,
@tol_nAPNYO,
@tol_nAPNYC)
										
										 exec HorarioToleranciaSel @@Identity 						 

GO

/****** Object:  StoredProcedure [dbo].[HorarioToleranciaSel]    Script Date: 01/09/2012 12:32:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioToleranciaSel]
										 @Id Int
						  --WITH ENCRYPTION
							AS
										 Select [tol_iidcuenta] Id, '' Name, [tol_naperturaantes], [tol_caperturaantesalarma], [tol_naperturadespues], [tol_caperturadespuesalarma], [tol_ncierreantes], [tol_ccierreantesalarma], [tol_ncierredespues], [tol_ccierredespuesalarma], [tol_nnyo], [tol_nnyc], [tol_nControl], [tol_nModo], [tol_nAPNYO], [tol_nAPNYC]
							  			 from _Datos.dbo.[m_horarios_tolerancia]
							 			  where [tol_iidcuenta] = @Id

GO

/****** Object:  StoredProcedure [dbo].[HorarioToleranciaUpd]    Script Date: 01/09/2012 12:32:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[HorarioToleranciaUpd]
										 @Id Int,
										 @Name VarChar(128),
										 
										 			@tol_naperturaantes SmallInt,
										 			@tol_caperturaantesalarma Char (3) ,
										 			@tol_naperturadespues SmallInt,
										 			@tol_caperturadespuesalarma Char (3) ,
										 			@tol_ncierreantes SmallInt,
										 			@tol_ccierreantesalarma Char (3) ,
										 			@tol_ncierredespues SmallInt,
										 			@tol_ccierredespuesalarma Char (3) ,
										 			@tol_nnyo numeric (18,1) ,
										 			@tol_nnyc numeric (18,1) ,
										 			@tol_nControl numeric (18,1) ,
										 			@tol_nModo numeric (18,1) ,
										 			@tol_nAPNYO numeric (18,1) ,
										 			@tol_nAPNYC numeric (18,1) 
							--WITH ENCRYPTION			 
							AS
										 set noCount on
										 update _Datos.dbo.[m_horarios_tolerancia] set [tol_naperturaantes] = @tol_naperturaantes,
[tol_caperturaantesalarma] = @tol_caperturaantesalarma,
[tol_naperturadespues] = @tol_naperturadespues,
[tol_caperturadespuesalarma] = @tol_caperturadespuesalarma,
[tol_ncierreantes] = @tol_ncierreantes,
[tol_ccierreantesalarma] = @tol_ccierreantesalarma,
[tol_ncierredespues] = @tol_ncierredespues,
[tol_ccierredespuesalarma] = @tol_ccierredespuesalarma,
[tol_nnyo] = @tol_nnyo,
[tol_nnyc] = @tol_nnyc,
[tol_nControl] = @tol_nControl,
[tol_nModo] = @tol_nModo,
[tol_nAPNYO] = @tol_nAPNYO,
[tol_nAPNYC] = @tol_nAPNYC										
										 where [tol_iidcuenta] = @Id										 
										 exec HorarioToleranciaSel @Id 						 

GO

