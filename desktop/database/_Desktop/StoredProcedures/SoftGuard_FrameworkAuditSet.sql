--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.017 
-- 2025-07-11 Pablo : agregue auditoria de m_CuentasXtraInfo - m_TSTConexion
-- 2025-07-14 Pablo : agregue auditoria de m_EstadosPanel - schedulerprograms
-- 2025-08-04 Pablo : Insert en m_EstadosPanel toma el idCta del XML
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_FrameworkAuditSet]      
 @UserId int,      
 @ObjectTypeId int,      
 @ObjectId int,      
 @FunctionName NVARCHAR(25),      
 @XmlOld NVARCHAR(max) = null,  
 @XmlNew NVARCHAR(max) = null,  
 @Token NVARCHAR(500)     
AS            
    
 SET NOCOUNT ON    
 Declare @iGuardoLog Int = 0 --1 es si

 Declare @message nVarChar(Max) = '',
		@StartDateTimeText nVarChar(max)=''
 
 DECLARE @TraceIDStr NVARCHAR(36);
 -- Obtener como string (porque así se guardó)
 SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

 -- Si nunca se seteó, @TraceID será NULL
 IF @TraceIDStr IS NULL
	SET @TraceIDStr = CAST(@@SPID AS NVARCHAR); 

 Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
 Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] Inicio'
 RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
 If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
 End
 declare @xxnew xml
 declare @cue_iid int = 0
     
 DECLARE @ObjectName NVARCHAR(64)    
 SELECT @ObjectName = Name FROM [Object] WHERE Id = @ObjectTypeId    
      
 DECLARE @FunctionId INT      
 SELECT @FunctionId = Id FROM [Function] WHERE Name = @FunctionName      

 Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
 Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] ObjectId : '+Cast(@ObjectId As varchar(10)) + ' | ObjectTypeId : '+Cast(@ObjectTypeId As varchar(10)) + ' | ObjectName : ' +@ObjectName + ' | FunctionId : '+Cast(@FunctionId As varchar(10))
 RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
 If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
 End
           
 DECLARE @Audit INT = ( Select isnull(Audit, 0) FROM Permission WHERE ObjectId = @ObjectTypeId and FunctionId = @FunctionId )  
 
 Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
 Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] Audit : '+Cast(@Audit As varchar(10))
 RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
 If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
 End
       
 IF @Audit <> 0      
 BEGIN      
  --INSERT AUDIT  
  DECLARE @AuditDate DATETIME      
  SELECT @AuditDate = getdate()      
    
  DECLARE @AuditId INT  
  
  If @ObjectName = 't_parametros'	--2025-10-03 Pablo, t_parametros no tiene que guardar idCta
	Set @ObjectId = 0
       
  INSERT INTO FrameworkAudit (UserId, ObjectTypeId, ObjectId, ObjectName, FunctionId, AuditDate, XmlOld, XmlNew)       
               VALUES (@UserId, @ObjectTypeId, @ObjectId, @ObjectName, @FunctionId, @AuditDate, @XmlOld, @XmlNew)   
   
  SET @AuditId = SCOPE_IDENTITY()  

  Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
  Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] AuditId : '+Cast(@AuditId As varchar(10))
  RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
  If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
  End

  --INSERT AUDIT EXTENT  
  DECLARE @UserName NVARCHAR(200)  
  SELECT @UserName = UserId FROM Token WHERE AccessToken = @Token  
  
  Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
  Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] @UserName : '+@UserName
  RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
  If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
  End

  --PARENT
  DECLARE @ParentObjectTypeId INT = 0
  DECLARE @ParentObjectId INT = 0
  DECLARE @ParentDescription NVARCHAR(528) = ''
  
  Declare @cue_clinea varchar(3) = '',
		  @cue_ncuenta varchar(10) = '',
		  @cue_cnombre varchar(250) = ''
  
  IF @ObjectTypeId = 3001 --m_cuenta
  begin
		if(@ObjectId is null or @ObjectId = 0)
		begin
			set @xxnew = CONVERT(xml, @XmlNew)
			select @cue_iid = convert(int, @xxnew.value('(Object/Data/cue_iid)[1]', 'int'))
			select @cue_clinea = @xxnew.value('(Object/Data/cue_clinea)[1]', 'nvarchar(3)')
			select @cue_ncuenta = @xxnew.value('(Object/Data/cue_ncuenta)[1]', 'nvarchar(10)')
			select @cue_cnombre = @xxnew.value('(Object/Data/cue_cnombre)[1]', 'nvarchar(250)')
			SELECT @ParentObjectTypeId = 3001, @ParentObjectId = @cue_iid, @ParentDescription = @cue_clinea + '-' + @cue_ncuenta + ' ' + @cue_cnombre 
		end
		else
		BEGIN
			SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @ObjectId
		END
	end

  IF @ObjectTypeId = 3002 --m_falsas  
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @ObjectId

  IF @ObjectTypeId = 3003 --m_horarios
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT hor_iidcuenta FROM _Datos.dbo.m_horarios WHERE hor_idKey = @ObjectId)
	 
  IF @ObjectTypeId = 3004 --m_horarios_alternativos
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT alt_iidcuenta FROM _Datos.dbo.m_horarios_alternativos WHERE alt_idKey = @ObjectId)
     
  IF @ObjectTypeId = 3006 --m_horarios_excepcion
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT exc_iidcuenta FROM _Datos.dbo.m_horarios_excepcion WHERE exc_idKey = @ObjectId)
	 
  IF @ObjectTypeId = 3008 --m_horarios_tolerancia
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @ObjectId

  IF @ObjectTypeId = 3010 --m_notas
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @ObjectId
	 
  IF @ObjectTypeId = 3011 --m_telefonos
	begin
		set @cue_iid = (SELECT tel_iidcuenta FROM _Datos.dbo.m_telefonos WHERE tel_idKey = @ObjectId)
		if(@cue_iid is null or @cue_iid = 0)
		begin
			set @xxnew = CONVERT(xml, @XmlNew)
			select @cue_iid = convert(int, @xxnew.value('(Object/Data/tel_iidcuenta)[1]', 'int'))
		end
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (@cue_iid)
	end
	 
  IF @ObjectTypeId = 3013 --m_usuarios
	begin
		set @cue_iid = (SELECT usu_iidcuenta FROM _Datos.dbo.m_usuarios WHERE usu_idKey = @ObjectId)
		if(@cue_iid is null or @cue_iid = 0)
		begin
			set @xxnew = CONVERT(xml, @XmlNew)
			select @cue_iid = convert(int, @xxnew.value('(Object/Data/usu_iidcuenta)[1]', 'int'))
		end
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (@cue_iid)
	end
	   
  IF @ObjectTypeId = 3014 --m_zonas
	begin
		set @cue_iid = (SELECT zon_iidcuenta FROM _Datos.dbo.m_zonas WHERE zon_idKey = @ObjectId)
		if(@cue_iid is null or @cue_iid = 0)
		begin
			set @xxnew = CONVERT(xml, @XmlNew)
			select @cue_iid = convert(int, @xxnew.value('(Object/Data/zon_iidcuenta)[1]', 'int'))
		end
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (@cue_iid)
	end
   
  IF @ObjectTypeId = 3017 --m_paneles
  BEGIN
	 set @cue_iid = (SELECT pan_iidcuenta FROM _Datos.dbo.m_paneles WHERE pan_idKey = @ObjectId)
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @cue_iid
  END 

  IF @ObjectTypeId = 3019 --m_medical_info
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT mnf_iidcuenta FROM _Datos.dbo.m_medical_info WHERE mnf_idKey = @ObjectId)
	 
  IF @ObjectTypeId = 3020 --m_sms
  	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT sms_iidcuenta FROM _Datos.dbo.m_sms WHERE sms_idKey = @ObjectId)
  	 
  IF @ObjectTypeId = 3031 --m_tst_prueba
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @ObjectId
       
  IF @ObjectTypeId = 3032 --m_reportes_automaticos
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT rep_iidcuenta FROM _Datos.dbo.m_reportes_automaticos WHERE rep_idKey = @ObjectId)  
	 
  IF @ObjectTypeId = 3033 --m_estado_cuenta_cab
	 SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @ObjectId
	 
  IF @ObjectTypeId = 3034 --m_estado_cuenta_item
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT est_iidcuenta FROM _Datos.dbo.m_estado_cuenta_item WHERE est_idKey = @ObjectId)    
    
  IF @ObjectTypeId = 3109 --m_cuentas_video
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT cuv_iidCuenta FROM _Datos.dbo.m_cuentas_video WHERE cuv_idKey = @ObjectId)

  IF @ObjectTypeId = 3110 --m_cuentas_video_links
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT cvl_iidCuenta FROM _Datos.dbo.m_cuentas_video_links WHERE cvl_idKey = @ObjectId)

  IF @ObjectTypeId = 3127 --m_CuentasXtraInfo
     SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT cue_iidCuenta FROM _Datos.dbo.m_CuentasXtraInfo WHERE cue_idKey = @ObjectId)

  IF @ObjectTypeId = 3216 --m_TSTConexion
  Begin
	If (@ObjectId Is Null Or @ObjectId = 0)
	Begin
		Set @xxnew = CONVERT(xml, @XmlNew)
		Select @cue_iid = Convert(Int, @xxnew.value('(Object/Data/txc_idCuenta)[1]', 'int'))
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = @cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @cue_iid
	End
	Else
       SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT txc_idCuenta FROM _Datos.dbo.m_TSTConexion WHERE txc_idKey = @ObjectId)
  End

  IF @ObjectTypeId = 3194 --m_EstadosPanel
  Begin
	If (@ObjectId Is Null Or @ObjectId = 0)
	Begin
		Set @xxnew = CONVERT(xml, @XmlNew)
		Select @cue_iid = Convert(Int, @xxnew.value('(Object/Data/mep_idCuenta)[1]', 'int'))
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = @cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @cue_iid
	End
	Else
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT mep_idCuenta FROM _Datos.dbo.m_EstadosPanel WHERE mep_idKey = @ObjectId)
  End

  IF @ObjectTypeId = 3133 --schedulerprograms
  Begin
	If (@ObjectId Is Null Or @ObjectId = 0)
	Begin
		Set @xxnew = CONVERT(xml, @XmlNew)
		Select @cue_iid = Convert(Int, @xxnew.value('(Object/Data/cuentaId)[1]', 'int'))
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = @cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = @cue_iid
	End
	Else
		SELECT @ParentObjectTypeId = 3001, @ParentObjectId = cue_iid, @ParentDescription = cue_clinea + '-' + cue_ncuenta + ' ' + cue_cnombre FROM _Datos.dbo.m_cuentas WHERE cue_iid = (SELECT cuentaId FROM _Datos.dbo.schedulerprograms WHERE id = @ObjectId)
  End

  Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
  Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] ParentObjectTypeId : '+Cast(@ParentObjectTypeId As varchar(10))
  RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
  If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
  End

  INSERT INTO FrameworkAuditExtend (Id, UserName, ParentObjectTypeId, ParentObjectId, ParentDescription)  
       VALUES (@AuditId, @UserName, @ParentObjectTypeId, @ParentObjectId, @ParentDescription)  

  Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
  Set @message = 'Start DateTime : %s | [SoftGuard_FrameworkAuditSet] Fin'
  RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
  If @iGuardoLog = 1
	 Begin
	 BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	 END TRY
	 BEGIN CATCH
	 END CATCH;
  End
 END