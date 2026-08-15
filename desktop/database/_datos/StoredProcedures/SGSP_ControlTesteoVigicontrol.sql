CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlTesteoVigicontrol] As
--Controla el test periodico enviado por los dispositivos que utilizan Vigicontrol
--Autor :Pablo O. Canónico
--Fecha :02/10/2017
--2019-09-02 : Se agrego control solamente sobre los VC logueados
--2019-09-02 : Se incluye el usuario del dispositivo al generar VFH
--2019-10-14 : Se decidio por BC tener una tolerancia de +1 minuto
SET NOCOUNT ON

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTesteoVC', @Repetition = 5
--	

Declare @IMEI nVarChar(128)='',
		@Nombre nVarChar(256)='',
		@cObs nVarChar(Max) = ''
Declare @ID Int=0,
		@iValor Int=0,
		@EnFallo Int=0,
		@CuentaID Int=0,
		@UsuarioID Int=0

DECLARE CursorTSTVC CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
Select [IMEI],[Id],[CuentaID],IsNull([EnFalloDeTesteo],0) As EnFalloDeTesteo,[Nombre]
	From [dbo].[SmartTrack] With (NOLOCK)
Where [Config] Like '%"HBcontrol":true%' And IMEI <>''
	And ( Select Top 1 [sp_iid] From [dbo].[p_posicionesSP] With (NOLOCK) Where [sp_cIMEI]=[IMEI] And [sp_tfechahora] Between DATEADD( MINUTE,-[HBTime]-1,GetDate() ) And GetDate() Order By [sp_iid] Desc )  Is Null
	Order By [IMEI],[CuentaId]

OPEN CursorTSTVC
FETCH NEXT FROM CursorTSTVC INTO @IMEI, @ID, @CuentaID, @EnFallo, @Nombre
WHILE @@FETCH_STATUS = 0
	Begin
		Print 'Controlo que no este en falla [IMEI]='+@IMEI
		--1.Controlo que no este en falla
		IF @EnFallo=0
			Begin
				--2.Me fijo si esta logueado
				Print 'Me fijo si esta logueado [CuentaID]='+Cast(@CuentaID As Varchar(10)) + ' - [Id]='+Cast(@ID As Varchar(10))
				If (Select Top 1 [vucs_vcid] from [_Datos].[dbo].[VigicontrolUserCurrentSession] With (NOLOCK) Where [vucs_cueiid]=@CuentaID And [vucs_vcid]=@ID) > 0
				Begin
					Print 'Esta Logueado [IMEI]='+@IMEI
					Select @UsuarioID = IsNull([usu_iid],0) From [_Datos].[dbo].[VigicontrolUserCurrentSession] With (NOLOCK)
						Left Join [_Datos].[dbo].[m_usuarios] On [usu_idKey] = [vucs_usuidkey]
					Where [vucs_cueiid]=@CuentaID And [vucs_vcid]=@ID

					--3.Genero VFH 
					Set @cObs = Rtrim(@IMEI)+' - '+Rtrim(@Nombre)
					Execute [_Datos].[dbo].[SGSP_AlarmaGenerar] @CuentaID, 'VFH', 'SoftGuard' , @cObs, '', @UsuarioID, @iValor OUTPUT
					
					--4.Actualizo Status
					Update [dbo].[SmartTrack] With (UPDLOCK) Set [EnFalloDeTesteo] = 1, [EnFalloDeTesteoDesde] = GetDate() Where [Id]=@ID
				End
				Else
					Print 'No esta Logueado [IMEI]='+@IMEI
			End
		Else
			Print 'Ya esta en FallaDeTesteoVC [IMEI]='+@IMEI

		FETCH NEXT FROM CursorTSTVC INTO @IMEI, @ID, @CuentaID, @EnFallo, @Nombre
	End

CLOSE CursorTSTVC
DEALLOCATE CursorTSTVC