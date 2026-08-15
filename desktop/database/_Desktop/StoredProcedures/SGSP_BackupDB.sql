CREATE OR ALTER PROCEDURE [dbo].[SGSP_BackupDB]
	@DBName VarChar(100) = '',
	@EsFull CHAR(1) = 'N'
As
--Rutina de backup
--Autor : Pablo O. Canónico
--Fecha : 24/07/2019
--Para activar compression
/*
EXEC sys.sp_configure N'backup compression default', N'1'
GO
RECONFIGURE WITH OVERRIDE
GO
*/
--Para restaurar
/*
1.Primero el full con la opcion WITH REPLACE , state WITH NO RECOVERY , sin Tail_Log y con Close Connections
2.La base queda en modo ...restoring...
3.Seguir con los diferenciales WITH NO RECOVERY hasta el ultimo que hay que dejarlo en WITH RECOVERY
	(NO es necesario restorear todos los dif. Con el Full y el Ultimo queda la base completa)
*/

Set NoCount ON
BEGIN TRY
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(Max)=''

	--Declare @DBName VarChar(100) = DB_NAME()
	If @DBName Not IN('_Audit','_Datos','_Desktop','_History','_LogDB','_Sistema','_Tablas')
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Backup de ['+@DBName+'] | DB no Valida'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

	Declare @Nombre VarChar(200) = ''
	Declare @backup_date DateTime
	Declare @DOW Int = DATEPART(WEEKDAY,GETDATE())
	Declare @BupDir VarChar(500) = (Select par_cValor From _Tablas.dbo.t_parametros Where par_cCodigo ='PATHBACKUPSDB')	--C:\Data\Bup
	Declare @version Int = 5

	Select Top 1 @backup_date = s.backup_start_date, @Nombre = m.physical_device_name
		From msdb.dbo.backupset s
	Inner Join msdb.dbo.backupmediafamily m ON s.media_set_id = m.media_set_id
		Where s.database_name = @DBName 
			And s.type= 'D' --'Full'  
			And s.is_copy_only = 0	--Para soportar diferenciales
			And s.backup_size >= s.compressed_backup_size 
	Order By backup_start_date DESC

	If @backup_date Is Not NUll
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Backup de ['+@DBName+'] | Ultimo Full : '+ Rtrim(Convert(VarChar, @backup_date,120) )+' | Ubicacion : '+ @Nombre
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @version = Len(@Nombre) - Len(Replace(@Nombre, '_', ''))
		If @version != 5
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Backup de ['+@DBName+'] | Version anterior de backup detectada. Se realiza una nueva Full'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
	End
	
	--Declare @EsFull CHAR(1) = 'N'
	--Si es Domingo o no hay un Full o hay un Full mayor a 7 dias o el Full es version anterior se hace Backup Full
	If @EsFull = 'N'
	Begin
		If @DOW = 1	Or @backup_date Is NUll Or DATEDIFF(DAY, GETDATE(), @backup_date) < -7 Or @version != 5
			Set @EsFull = 'S'

	End

	Declare @Name VarChar(20) = ( Select Left(REPLACE(REPLACE(REPLACE(CONVERT(char(20), GETDATE(), 120),'-','_'),':',''),' ','_'),17) )
	Declare @BupName VarChar(100) = Rtrim(@DBName)
	If Right(Rtrim(@BupDir),1) != '\'
		Set @BupDir += '\'

	Set @Nombre = Rtrim(@BupDir)+Rtrim(@BupName)+'_'+@Name

	If @EsFull = 'S'
	Begin
		Set @Nombre +='.Bak'
		Set @BupName +=' Backup Full'
	End
	Else
	Begin
		Set @Nombre +='.Dif_'+Cast(@DOW-1 As Char(1))
		Set @BupName +=' Backup Dif'
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | ['+@BupName+'] | '+@Nombre
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	CHECKPOINT

	Declare @BackupCompression sql_variant
	Select @BackupCompression = ISNULL((Select value From sys.configurations Where name = 'backup compression default'),2)
	IF @BackupCompression = 0
		Begin	
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | ['+@BupName+'] | Backup Compression esta soportado pero en modo Disable por defecto'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @EsFull = 'S'	--Si es FULL
				BACKUP DATABASE @DBName TO DISK = @Nombre WITH  NOINIT, NOUNLOAD, NAME = @BupName, NOSKIP, STATS = 10, NOFORMAT, COMPRESSION
			Else				--Si ya hay un FULL hago DIFFERENTIAL
				BACKUP DATABASE @DBName TO DISK = @Nombre WITH  NOINIT, NOUNLOAD, NAME = @BupName, NOSKIP, STATS = 10, NOFORMAT, COMPRESSION, DIFFERENTIAL
		End
	Else
		Begin
			IF @BackupCompression = 1
				Set @message = 'Start DateTime : %s | ['+@BupName+'] | Backup Compression esta soportado y en modo Enabled'
			IF @BackupCompression = 2
				Set @message = 'Start DateTime : %s | ['+@BupName+'] | No hay soporte en esta version de SQL Server para Backup Compression'

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @EsFull = 'S'	--Si es FULL
				BACKUP DATABASE @DBName TO DISK = @Nombre WITH  NOINIT, NOUNLOAD, NAME = @BupName, NOSKIP, STATS = 10, NOFORMAT
			Else				--Si ya hay un FULL hago DIFFERENTIAL
				BACKUP DATABASE @DBName TO DISK = @Nombre WITH  NOINIT, NOUNLOAD, NAME = @BupName, NOSKIP, STATS = 10, NOFORMAT, DIFFERENTIAL
		End

	If @EsFull = 'S'
	Begin
		Set @BupName = Rtrim(@DBName)
		Set @Nombre = Rtrim(@BupDir)+Rtrim(@BupName)+'_Log.bak' 
		Set @BupName +=' Transaction Log Backup'

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | ['+@BupName+'] | '+@Nombre
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		BACKUP Log @DBName  TO DISK = @Nombre
			With NOFORMAT,NAME = @BupName,
			NOINIT,  SKIP, NOREWIND, NOUNLOAD, STATS = 10 
	End
	
	Set NoExec Off
END TRY
BEGIN CATCH
	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH