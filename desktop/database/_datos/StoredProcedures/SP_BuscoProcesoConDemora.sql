CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoProcesoConDemora] AS 
SET NOCOUNT ON
Declare @DiaHoy DateTime
Declare @iID Int
Declare @cFecha Char(10)
Declare @cHora Char(10)
Declare @iidCuenta Int
Declare @cAlarma Char(3)
Declare @cCuenta Char(10)
Declare @cGrabo Char(1)
Declare @iEnviaMail Int
Declare @iControla Int
Declare @iOperador Int
Declare @iTiempo Int
Declare @iPrioridad Int

SET @DiaHoy = GetDate()

--1ero verifico si hay escalamiento para verificar
--Deberia existir al menos una prioridad con controla en SI y tiempo > 0
SET @iControla =(SELECT Top 1 tep_iid From _Tablas.dbo.t_EscalamientoPrioridades Where tep_nControla=1 And tep_iTiempo>0) 
If @iControla > 0
   Begin
	-- Aviso que la tarea esta funcionando	
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'BuscoProcesoConDemora', @Repetition = 6
	--	   
	Set @cGrabo = 'S'
	Set @iEnviaMail = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE' )		
	
	Declare @Query nVarChar(255)  
	Declare @cFrom nVarChar(100)
	Declare @cFromName nVarChar(100)
	Declare @cTo nVarChar(100)
	Declare @cSubject nVarChar(100)
	Declare @cMessage nVarChar(4000)
	Declare @cMessageMerge nVarChar(max)
	Declare @cImagenes nVarChar(max)
	Declare @cMail As nVarChar(100)
	Declare @cToOriginal nVarChar(100)
	Declare @nFin As int

	Set @nFin= 1
	set @cFrom = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
	set @cFrom = Ltrim(Rtrim(@cFrom))

	Set @cFromName = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
	Set @cFromName = Ltrim(Rtrim(@cFromName))

	set @cToOriginal = ( Select par_cValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILDEMORAENPROCESAR')
	set @cTo = Ltrim(Rtrim(@cToOriginal))

	--Print '@cFrom '+@cFrom
	--Print '@cTo '+@cTo
	Declare @translation nVarChar(Max)=''
	Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Demora en Procesar', @soloOutput=1, @translation = @translation OUTPUT
	Set @cSubject = @translation 

	Declare cEspera CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	SELECT rec_iid,CONVERT(char(10), rec_tFechaHora,103),CONVERT(char(10), rec_tFechaHora,108) ,rec_iidCuenta,rec_cAlarma,rec_iOperador,tep_iTiempo,rec_iPrioridad
	 FROM P_recepcion With (NOLOCK)
		Inner Join _Tablas.dbo.t_EscalamientoPrioridades On tep_iid=Left(rec_iPrioridad,1) 
		 WHERE rec_nEstado IN(0,1,4,9)
			And tep_nControla=1 And tep_iTiempo>0
			And DATEADD(MINUTE,tep_iTiempo,rec_tFechaRecepcion)<@DiaHoy
	
	Open cEspera
	Fetch Next From cEspera Into @iID,@cFecha,@cHora,@iidCuenta,@cAlarma,@iOperador,@iTiempo,@iPrioridad 
	While @@FETCH_STATUS = 0
	Begin
	   If @cGrabo = 'S'	
	      Begin		   
			
			If Left(@iPrioridad,1) > 1	--Cuando llego a prioridad 1 ya no escala
				Begin

					UPDATE p_recepcion
						SET rec_tFechaRecepcion=@DiaHoy,rec_cContenido=Left(Rtrim(Ltrim(rec_cContenido))+' |NPR',50),rec_iPrioridad=rec_iPrioridad-10
						WHERE rec_iid=@iID

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
						   ,'%Escaló a Prioridad% '+Cast( Left(@iPrioridad-10,1) As nVarChar(10))
						   ,'%SISTEMA%'
						   ,@iOperador)
				End
          End

	   If @cTo <> ''
	      Begin
		   Set @cMail = @cTo +';'
		   Set @cCuenta	= ( SELECT cue_clinea+'-'+cue_ncuenta FROM m_cuentas Where cue_iid=@iidCuenta )	
		   Set @cMessage = @cCuenta + ' ' +@cAlarma + ' '+ @cFecha + ' '+ @cHora 

		   WHILE CHARINDEX(';',@cMail) > 0
		   BEGIN
			Set @nFin = CHARINDEX(';',@cMail)	
			--Print '@nFin '+Cast(@nFin As varchar(10))
			
			Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
			--Print '@cTo DESTINO '+@cTo
			
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
			--Print '@cMail  '+@cMail
		   END
	
		   Set @cTo = Ltrim(Rtrim(@cToOriginal))
	      End

	   Fetch Next From cEspera Into @iID,@cFecha,@cHora,@iidCuenta,@cAlarma,@iOperador,@iTiempo,@iPrioridad
	End
	Close cEspera
	Deallocate cEspera
   End
Else	-- Aviso que la tarea no cumple las condiciones para funcionar
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'BuscoProcesoConDemora', @Repetition = 6, @Date = null, @Status = 0