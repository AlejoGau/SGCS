CREATE OR ALTER TRIGGER [dbo].[TG_UPD_AcumuladosPrioridad] ON [dbo].[p_recepcion] AFTER INSERT AS
BEGIN
	SET NOCOUNT ON;

	Declare @cCodAlarma Char(3) = '',
			@cZona Char(3) = ''
	Declare @idCuenta Int = 0,
			@iOperador Int = 0,
			@iExcesoLimiteDia Int = 0,
			@iExcesoLimiteHora Int = 0,
			@idRec Int = 0,
			@iPrioridad Int = 0,
			@iImportancia Int = 0
	Declare @nAlarma Numeric(1,0)

	Select @idCuenta=rec_iidcuenta, @cCodAlarma=rec_cAlarma, @iOperador=rec_ioperador, @cZona=rec_czona, @iPrioridad=IsNull(rec_iPrioridad,0), @idRec=rec_iId, @iImportancia=IsNull(cue_iImportancia,4), @iExcesoLimiteDia=IsNull(cue_iExcesoLimiteDia,0), @iExcesoLimiteHora=IsNull(cue_iExcesoLimiteHora,0) 
		From inserted 
		Left Outer Join [dbo].[m_CuentasXtraInfo] On [cue_iidCuenta]=rec_iidcuenta

	--Control Exceso--
	If @iExcesoLimiteDia>0 Or @iExcesoLimiteHora>0	--Si tiene algun control se guarda
	Begin
		If @idCuenta > 0 And @cCodAlarma <> '' And @cCodAlarma <> '_XC'
			INSERT INTO p_RXAcumulado (rxa_idCuenta,rxa_cAlarma) VALUES (@idCuenta,@cCodAlarma)
	End

	--Prioridad--
	If @iPrioridad = 0
	Begin
		Set @nAlarma = (Select TOP 1 cod_nprioridad From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cCodAlarma)
		If @nAlarma > 0
		Begin
			If @iImportancia = 0
				Set @iImportancia = 4

			Declare @cSuma Char(2) = ''
			Select @cSuma = Cast(@nAlarma As Char(1)) + Cast(@iImportancia As Char(1))
			
			UPDATE p_recepcion
				Set rec_iPrioridad = Cast(@cSuma As int)
				Where rec_iId = @idRec
		End
	End

	--[EventosEnFalloTesteo]--
	Declare @cCual Char(1) = '1'
	--For perfomance issues--
	If Exists ( Select Top 1 [eft_idKey] From [EventosEnFalloTesteo] With (NOLOCK)
		Inner Join [p_recepcion] With (NOLOCK) On [rec_iid] = [eft_iRecID]
		Where CHARINDEX(@cCodAlarma, eft_cAlarmaAutoprocesa) > 0 
			And [eft_iidCuenta] = @idCuenta And [rec_nEstado] In(0,2) )

		Begin
			Declare @iConexion Int = 0
			Declare cCtrl CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
				For	Select [eft_iRecID],Left([eft_cAlarmaAutoprocesa],1) As Cual, IsNull(rxt_iConexion,0) From [EventosEnFalloTesteo] With (NOLOCK)
					Inner Join [p_recepcion] With (NOLOCK) On [rec_iid] = [eft_iRecID]
					Left Outer Join [p_RXtraInfo] With (NOLOCK) On [rxt_iRecId] = [eft_iRecID]
					Where CHARINDEX(@cCodAlarma, eft_cAlarmaAutoprocesa) > 0 
						And [eft_iidCuenta] = @idCuenta 
						And [rec_nEstado] In(0,2)

			Open cCtrl
			Fetch Next From cCtrl Into @idRec,@cCual,@iConexion
			While @@FETCH_STATUS = 0
			Begin
				If @idRec > 0
					Begin
						--1ero actualizo pRecepcion--	
						Update p_recepcion
							Set rec_nEstado = 3, rec_tFechaProceso = GetDate()
						Where rec_iid = @idRec
	
						--2do inserto TimeLine
						Insert Into [dbo].[EventosTimeLine]
								   ([etl_iRecID]
								   ,[etl_iCuenta]
								   ,[etl_tFechaHora]
								   ,[etl_cAccion]
								   ,[etl_cObservacion]
								   ,[etl_cOwner]
								   ,[etl_iOperador])
						 Values
								   (@idRec
								   ,@idCuenta
								   ,GetDate()
								   ,'Autoproceso'
								   ,'%Procesado Automaticamente x Evento : %'+@cCodAlarma
								   ,'%SISTEMA%'
								   ,@iOperador)

						--3ro actualizo mStatus/m_TSTConexion
						If @cCual = '1'
							Update m_status Set sta_ncuentaenfallodetst=0,sta_dfechaultimotst=null Where sta_iidcuenta=@idCuenta
						Else If @cCual = '2'
							Update m_status Set sta_ncuentaenfallo2dotst=0,sta_dfechaultimo2dotst=null Where sta_iidcuenta=@idCuenta
						Else If @cCual = '3'
							Update m_status Set sta_ncuentaenfallo3ertst=0,sta_dfechaultimo3ertst=null Where sta_iidcuenta=@idCuenta
						Else If @cCual = 'C' And @iConexion>0
							Update [m_TSTConexion] Set [txc_tEnFalloDeDesde] = Null, txc_tFechaUltimaRX = GetDate() Where [txc_idCuenta]=@idCuenta And [txc_idIRSConn]=@iConexion

						--4to elimino de [EventosEnFalloTesteo]
						Delete From [EventosEnFalloTesteo]
							Where  [eft_iRecID] = @idRec
							And [eft_iidCuenta] = @idCuenta 

					End

				Fetch Next From cCtrl Into @idRec,@cCual,@iConexion
			End

			Close cCtrl
			Deallocate cCtrl
		End

	--[m_TSTConexion]--Si no se configuro autoproceso hay que ver si llego [txc_cAlarmaEsperada] 
	If Exists (	Select [txc_idKey] From [dbo].[m_TSTConexion] Where [txc_idCuenta]=@idCuenta And [txc_cAlarmaEsperada]=@cCodAlarma And [txc_tEnFalloDeDesde] Is Not Null)
	Begin
		Update [m_TSTConexion] Set [txc_tEnFalloDeDesde] = Null, txc_tFechaUltimaRX = GetDate() Where [txc_idCuenta]=@idCuenta And [txc_cAlarmaEsperada]=@cCodAlarma
	End
END