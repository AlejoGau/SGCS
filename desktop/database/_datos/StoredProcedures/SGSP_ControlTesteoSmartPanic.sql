CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlTesteoSmartPanic]  As
--Controla el test periodico enviado por los dispositivos que utilizan SmartPanicsNG
--Autor :Pablo O. Canónico
--Fecha :19/07/2016
SET NOCOUNT ON

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTesteoSP', @Repetition = 20
--	

Declare @IMEI nVarChar(128)=''
Declare @CuentaID Int=0,
	 @UserID Int=0,
	 @iValor Int=0	

DECLARE CursorTSTSP CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select [IMEI],[CuentaId],[tel_iid] From [dbo].[SmartPanic]
	Inner Join [dbo].[m_telefonos] On [tel_iidcuenta]=[CuentaId] And Ltrim(Rtrim([Telefono]))=Ltrim(Rtrim([tel_ctelefono]))
	Where Replace([Config],' ','') Like '%"HBcontrol":true%' And IMEI <>''
	And [IMEI] Not IN ( Select [sp_cIMEI] From [dbo].[p_posicionesSP] Where sp_tfechahora Between DATEADD( MINUTE,-240,GetDate() ) And GetDate() )
	Group By [IMEI],[CuentaId],[tel_iid]

OPEN CursorTSTSP
FETCH NEXT FROM CursorTSTSP INTO @IMEI, @CuentaID, @UserID
WHILE @@FETCH_STATUS = 0
	Begin
		--1.Controlo que no este en falla
		IF Exists ( Select Top 1 [id] From [dbo].[SmartPanic] Where [IMEI]=@IMEI And [CuentaId]=@CuentaID And ( [EnFalloDeTesteo]=0 Or [EnFalloDeTesteo] Is Null)  )
			Begin
				Set @UserID = 700 + @UserID
				--2.Genere S68
				EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@CuentaID, @cAlarma='S68', @cQuien='SoftGuard' , @cObs='', @cContenido='', @iUsuario=@UserID, @iValor=@iValor OUTPUT

				--3.Actualizo Status
				Update [dbo].[SmartPanic] Set [EnFalloDeTesteo] = 1, [EnFalloDeTesteoDesde] = GetDate() Where [IMEI]=@IMEI And [CuentaId]=@CuentaID
			End
		Else
			Print 'Ya esta en FallaDeTesteoSP [IMEI]='+@IMEI

		FETCH NEXT FROM CursorTSTSP INTO @IMEI, @CuentaID, @UserID
	End

CLOSE CursorTSTSP
DEALLOCATE CursorTSTSP