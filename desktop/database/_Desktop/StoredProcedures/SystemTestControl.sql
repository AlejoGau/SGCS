CREATE OR ALTER PROCEDURE [dbo].[SystemTestControl]
	@control Varchar(100) = '',
	@message Varchar(1024) = '' OUTPUT,
	@status int = 0 OUTPUT
AS
BEGIN
	SET NOCOUNT ON

	If @control = 'DiskSpace'
	Begin
	    Declare @msg Varchar(1024) = ''
		Declare @exec Int = 1	--1.Si 2.No
		
		Declare @sys_usr Char(30)
		Set @sys_usr = SYSTEM_USER
		
		--If @sys_usr != 'sa' And @sys_usr != 'NT SERVICE\SQLSERVERAGENT'
		If @sys_usr != 'sa'
		Begin
			Declare @RolePrincipalName Varchar(20) = ''

			Select @RolePrincipalName=roles.name
				From sys.server_role_members As server_role_members
				Inner Join sys.server_principals As roles On server_role_members.role_principal_id = roles.principal_id
				Inner Join sys.server_principals As members On server_role_members.member_principal_id = members.principal_id  
			Where members.name='SGDesktopAccess'

			If @RolePrincipalName != 'sysadmin'
				Set @exec = 0
		End

		If @exec=1
		Begin
			/*Esta query ademas calcula el % de espacio libre
			 SELECT DISTINCT 
				  vs.volume_mount_point Drive
				, vs.logical_volume_name
				, vs.total_bytes/1024/1024/1024 CapacityGB
				, vs.available_bytes/1024/1024/1024 FreeGB
				, CAST(vs.available_bytes * 100. / vs.total_bytes AS DECIMAL(4,1)) FreePct 
				FROM   sys.master_files mf
					CROSS APPLY  sys.dm_os_volume_stats(mf.database_id, mf.file_id) AS vs;
			*/
			Declare @iParametro Int = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='ESPACIOENDISCO' ),30)
			Declare @NombreLogico Varchar(100) = '',
					@LetraDisco	Varchar(10) = ''
			Declare @EspacioLibreGB Int = 0

			DECLARE cDiscos CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
				Select Distinct dovs.logical_volume_name, dovs.volume_mount_point, CONVERT(INT,(dovs.available_bytes/1048576.0)/1024.0)
					FROM sys.master_files mf
				CROSS APPLY sys.dm_os_volume_stats(mf.database_id, mf.FILE_ID) dovs
				ORDER BY 2

			OPEN cDiscos
			FETCH NEXT FROM cDiscos INTO @NombreLogico,@LetraDisco,@EspacioLibreGB
				WHILE @@FETCH_STATUS = 0
				Begin
					If @EspacioLibreGB<=@iParametro
					Begin 
						If Rtrim(@NombreLogico) = ''
							Set @NombreLogico = 'HardDisk '+Rtrim(@LetraDisco)

						Set @msg += 'El disco '+Rtrim(@LetraDisco)+'('+@NombreLogico+') tiene poco espacio disponible. '
						Set @status = 3
					END
				
				FETCH NEXT FROM cDiscos INTO @NombreLogico,@LetraDisco,@EspacioLibreGB
				End

			CLOSE cDiscos
			DEALLOCATE cDiscos
		End

		If @msg!=''
		Begin
			Set @message = @msg
			Set @status = 3
		End
		Else
		Begin
			Set @message = 'OK'
			Set @status = 1
		End
	End

	If @control = 'SQLEvalEdition'
	Begin
		Declare @Edition nVarchar(100) = ''
		Declare @InitDay Datetime

		Select @Edition=Convert(Varchar(max),SERVERPROPERTY ('edition')), @InitDay=Create_Date
			From sys.server_principals
		Where sid = 0x010100000000000512000000

		Set @message = 'OK'
		Set @status = 1

		If @Edition Like '%Evalua%'
		Begin
			If (Select DATEDIFF(day,@InitDay,getdate())) >= 165
			Begin
				Declare @Limite Datetime = DATEADD(DAY,180,@InitDay)
				Set @message = 'La version del SQL es de evaluacion y expira : '+Convert(VarChar(MAX), @Limite, 20) 
				Set @status = 3
			End
		End
	End

	If @control = 'LimiteRegistrosAEliminar'
	Begin
		Declare @Max Int = 0

		Select @Max=Max(rae_idKey) From [_Datos].[dbo].[_RegistrosAEliminar]

		---Maximo campo Integer 2.147.483.648
		If @Max > 2100000000	
		Begin
			Set @message = 'La tabla [_Datos].[dbo].[_RegistrosAEliminar] esta llegando a su limite de registros'
			Set @status = 3
		End
	End
END