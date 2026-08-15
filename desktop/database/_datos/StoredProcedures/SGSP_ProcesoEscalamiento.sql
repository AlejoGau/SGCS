CREATE OR ALTER PROCEDURE [dbo].[SGSP_ProcesoEscalamiento]
WITH EXECUTE AS CALLER
AS
SET NOCOUNT ON
Declare @DiaHoy DateTime  = GetDate()

Declare @iID Int = 0,
	@iidCuenta Int = 0,
	@iEnviaMail Int = 0,
	@iControla Int = 0,
	@iOperador Int = 0,
	@iTiempo Int = 0,
	@iPrioridad Int = 0

Declare @cFecha Char(10) = '',
	@cHora Char(10) = '',
	@cAlarma Char(3) = '',
	@cCuenta Char(10) = '',
	@cGrabo Char(1) = 'S'

--1ero verifico si hay escalamiento para verificar
--Deberia existir al menos una prioridad con controla en SI y tiempo > 0
Set @iControla =(SELECT Top 1 [tep_iid] From [_Tablas].[dbo].[t_EscalamientoPrioridades] With (NOLOCK) Where [tep_nControla]=1 And [tep_iTiempo]>0) 
If @iControla Is Null Or @iControla = 0
Begin
	--Deberia existir al menos una prioridad con controla en SI y tiempo > 0 para la organizacion
	Set @iControla =(SELECT Top 1 [teo_iid] From [_Tablas].[dbo].[t_EscalamientoPorOrganizacion] With (NOLOCK) Where [teo_nControla]=1 And [teo_iTiempo]>0) 
End
If @iControla > 0
   Begin
	-- Aviso que la tarea esta funcionando	
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ProcesoEscalamiento', @Repetition = 6
	--	   

	Set @iEnviaMail = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE' )		
	
	Declare @Query nVarChar(255) = '',  
			@cFrom nVarChar(100) = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER' ),
			@cFromName nVarChar(100) = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME' ),
			@cTo nVarChar(100) = '',
			@cToOriginal nVarChar(100) = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILDEMORAENPROCESAR' ),
			@cSubject nVarChar(100) = '',
			@cMessage nVarChar(4000) = '',
			@cMessageMerge nVarChar(max) = '',
			@cImagenes nVarChar(max) = '',
			@cMail As nVarChar(100) = '',
			@cDonde Char(3) = '',
			@AlarmaGenerar Char(3) = '',
			@cNombre As nVarChar(100) = '',
			@cDescripcion As nVarChar(100) = '',
			@cObs As nVarChar(max) = ''

	Declare @nFin Int = 1,
			@idOrganizacion Int = 0,
			@iDiez Int = 10,
			@iIdSGInte Int = 0,
			@iValor Int = 0,
			@iEscala Int = 1,	--1-Si / 2-No
			@iTipoAlarma Int = 1

	Set @cFrom = Ltrim(Rtrim(@cFrom))
	Set @cFromName = Ltrim(Rtrim(@cFromName))
	Set @cTo = Ltrim(Rtrim(@cToOriginal))

	Set @iIdSGInte = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)	Where cue_clinea='_SG' And cue_ncuenta = 'INTE' )

	Declare @translation nVarChar(Max)=''
	Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Demora en Procesar', @soloOutput=1, @translation = @translation OUTPUT
	Set @cSubject = @translation 

	Declare cEspera CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	Select rec_iid,CONVERT(char(10), rec_tFechaHora,103),CONVERT(char(10), rec_tFechaHora,108),rec_iidCuenta,rec_cAlarma,rec_iOperador,rec_iPrioridad,_idOrganizacion,Case When IsNull([tep_iid],0) > 0 Then 'CRA' When IsNull([teo_iid],0) > 0 Then 'ORG' Else 'CRA' End,
		cue_cLinea+'-'+cue_nCuenta,cue_cNombre,EP.cod_cDescripcion,IsNull(lin_iEscala,1) As iEscala,CA.cod_ntipo As iTipoAlarma
			From [dbo].[EventosPendientes] EP
			Left Outer Join [_Tablas].[dbo].[t_EscalamientoPrioridades] On [tep_iid]=Left([rec_iPrioridad],1) And [_idOrganizacion] = 0
			Left Outer Join [_Tablas].[dbo].[t_EscalamientoPorOrganizacion] On [teo_iid]=Left([rec_iPrioridad],1) And [_idOrganizacion] > 0
			Left Outer Join [_Tablas].[dbo].[t_lineas] On [cue_cLinea]=[lin_ccodigo]
			Inner Join [_Tablas].[dbo].[t_codigos_alarma] CA On [cod_cCodigo]=[rec_cAlarma]
		Where [rec_nEstado]=0
	--Where [rec_nEstado] IN(0,1,4,9)
	--Estado  Descripcion
	--                0             Evento Nuevo/Pendiente           
	--                1             Evento esta siendo Procesado
	--                4             Evento esta siendo Procesado en Espera
	--                9             Evento en estado Temporal usado por ProcesaTodo
	--Se pidio por BC el 14-09-2018 que solo escale los eventos pendientes
		And (( [tep_nControla]=1 And [tep_iTiempo]>0 And DATEADD(MINUTE,[tep_iTiempo],IsNull([rec_tFechaRecepcion],[rec_tFechaHora]))<@DiaHoy )
		    Or  ( [teo_nControla]=1 And [teo_iTiempo]>0 And DATEADD(MINUTE,[teo_iTiempo],IsNull([rec_tFechaRecepcion],[rec_tFechaHora]))<@DiaHoy ))

	Open cEspera
	Fetch Next From cEspera Into @iID,@cFecha,@cHora,@iidCuenta,@cAlarma,@iOperador,@iPrioridad,@idOrganizacion,@cDonde,@cCuenta,@cNombre,@cDescripcion,@iEscala,@iTipoAlarma
	While @@FETCH_STATUS = 0
	Begin
	   If @cGrabo = 'S'	
	      Begin		
		  
			--Print 'rec_iid'
			--Print @iID  

			--Se pidio por BC que siga escalando cuando llegue a 1 pero que no suba la prioridad
			--If Left(@iPrioridad,1) > 1	--Cuando llego a prioridad 1 ya no escala
			--	Begin
			If Left(@iPrioridad,1) = 1
				Set @iDiez = 0
			Else
				Set @iDiez = 10

			UPDATE [p_recepcion] WITH (ROWLOCK)
				SET rec_tFechaRecepcion=@DiaHoy,rec_cContenido=Left(Rtrim(Ltrim(rec_cContenido))+' |NPR',50),rec_iPrioridad=rec_iPrioridad-@iDiez
				WHERE rec_iid=@iID

			--If @idOrganizacion > 0
			If @iEscala = 1 --Si
				UPDATE [EventosPendientes] WITH (ROWLOCK) SET _idOrganizacion=0 WHERE rec_iid=@iID

			Insert Into [dbo].[EventosTimeLine]
					([etl_iRecID]
					,[etl_iCuenta]
					,[etl_tFechaHora]
					,[etl_cAccion]
					,[etl_cObservacion]
					,[etl_cOwner]
					,[etl_iOperador])
				Values
					(@iID
					,@iidCuenta
					,GETDATE()
					,'Escalamiento'
					,'%Escaló a Prioridad% '+Cast( Left(@iPrioridad-@iDiez,1) As nVarChar(10))
					,'%SISTEMA%'
					,@iOperador)
				--End

				If @iTipoAlarma = 7	-- (Asignacion de tarea)
					Set @AlarmaGenerar = '_ET'
				Else
				Begin
					If @cDonde = 'CRA'
						Set @AlarmaGenerar = '_ES'
					Else
						Set @AlarmaGenerar = '_EO'
				End

				If @iIdSGInte Is Null
					Print '@iIdSGInte es null. No genera evento interno'
				Else
					Begin
						Set @cObs = @cCuenta + ' ' + Rtrim(@cNombre) +' '+ @cAlarma + ' '+ Rtrim(@cDescripcion )+ ' '+ @cFecha + ' ' + @cHora 
						EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@iIdSGInte, @cAlarma=@AlarmaGenerar,@cObs=@cObs, @iValor=@iValor OUTPUT
					End
          End

	   If @cTo <> ''
	      Begin
		   Set @cMail = @cTo +';'
		   --2018-08-12 Ahora se resuelve en el query del cursor
		   --Set @cCuenta	= ( SELECT cue_clinea+'-'+cue_ncuenta FROM m_cuentas Where cue_iid=@iidCuenta )	
		   Set @cMessage = @cCuenta + ' ' +@cAlarma + ' '+ @cFecha + ' '+ @cHora 

		   WHILE CHARINDEX(';',@cMail) > 0
		   BEGIN
			Set @nFin = CHARINDEX(';',@cMail)	
			Set @cTo = SUBSTRING( @cMail, 1, @nFin-1 )
			Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'
			
			If @cGrabo = 'S' And @iEnviaMail = 1		
				EXEC _Sistema.dbo.sp_SendMail @cFrom, @cTo, @cSubject, @cMessage	

		    If @cGrabo = 'S' And @iEnviaMail = 2		
			   Begin	
			    Set @cMessageMerge = ''
				EXEC SGSP_TextMerge	@iidCuenta,'',@cAlarma,'NPR',@cFecha,@cHora,@iID, @cMessageMerge OUTPUT, @cImagenes OUTPUT
				If @cMessageMerge Is Null
					Set @cMessageMerge = @cMessage

				EXEC _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @DiaHoy, 1, @Query, 'MAIL', @cImagenes, 802, @iidCuenta							
			  End

			Set @cMail = SUBSTRING( @cMail, @nFin+1, 100-@nFin )
		   END
	
		   Set @cTo = Ltrim(Rtrim(@cToOriginal))
	      End

	   Fetch Next From cEspera Into @iID,@cFecha,@cHora,@iidCuenta,@cAlarma,@iOperador,@iPrioridad,@idOrganizacion,@cDonde,@cCuenta,@cNombre,@cDescripcion,@iEscala,@iTipoAlarma
	End
	Close cEspera
	Deallocate cEspera
   End
Else	-- Aviso que la tarea no cumple las condiciones para funcionar
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ProcesoEscalamiento', @Repetition = 6, @Date = null, @Status = 0