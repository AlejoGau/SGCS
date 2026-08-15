CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSHeartBeats]
	@iPuerto Int = 0,
	@tFechaHora DateTime = Null,
	@cIMEI nVarChar(20) = '',
	@cCorteLinea Char(3) = '',
	@cEntDigital Char(2) = '',
	@iNivel Int = 0,
	@iTension Int = 0,
	@iConexion Int = 0
As
--Actualiza pHeartBeats  para IRServices
--Autor : Pablo O. Canónico
--Fecha : 03/07/2017
--Modificado 05-01-2022 Se agrego grabacion con el valor de la conexion

Set NoCount ON
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = ''

If @cIMEI = '' Or @iPuerto = 0
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | IMEI o Puerto sin valor'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

Declare @cInfoExtra nVarChar(200) = ''
If @cCorteLinea IN('ED','SC','RK','NT','AL','WI')		--En @cEntDigital viene info extra de los Nanocomm,Scanner,RKTracker,NTCom,AlonsoUniversal y WiConnect
	Set @cInfoExtra= Rtrim(@cEntDigital)

MERGE INTO [dbo].[p_HeartBeats] AS TGT
USING ( Select @tFechaHora As tFechaHora, @iPuerto As iPuerto, @cIMEI As cIMEI, @cCorteLinea As cCorteLinea, @cEntDigital As cEntDigital, @iNivel As iNivel, @cInfoExtra As cInfoExtra, @iConexion As iConexion ) As SRC 
		ON TGT.[hbs_ipuerto] = SRC.[iPuerto] And TGT.[hbs_cIMEI] = SRC.[cIMEI] And TGT.[hbs_iConexion] = SRC.[iConexion]
WHEN MATCHED THEN
	UPDATE SET
	   TGT.[hbs_tfechahora] = SRC.[tFechaHora],
       TGT.[hbs_cCorteLinea] = SRC.[cCorteLinea],
       TGT.[hbs_cEntDigital] = SRC.[cEntDigital],
       TGT.[hbs_nNivel] = SRC.[iNivel],
       TGT.[hbs_cInfoExtra] = SRC.[cInfoExtra]	  
WHEN NOT MATCHED THEN 
	INSERT  ([hbs_tfechahora],[hbs_ipuerto],[hbs_cIMEI],[hbs_cCorteLinea],[hbs_cEntDigital],[hbs_nNivel],[hbs_cInfoExtra],[hbs_iConexion])
     VALUES (SRC.[tFechaHora],SRC.[iPuerto],SRC.[cIMEI],SRC.[cCorteLinea],SRC.[cEntDigital],SRC.[iNivel],SRC.[cInfoExtra],SRC.[iConexion]);

/*Se paso a un trigger
If @cIMEI <> '' And @cIMEI <> '####'
	Begin
		--Actualizo 2do Testeo
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | --Actualizo 2do Testeo--'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @iCta Int = 0
		Select Top 1 @iCta=cue_iid From m_cuentas 
			Left Outer Join m_tst_prueba On cue_iid=tst_iidCuenta
			Where ( cue_ncuenta=@cIMEI Or cue_cIMEI=@cIMEI )
			And tst_ncada2>0 And tst_calarmaesperada ='_KA' 

		If @iCta > 0 
			UPDATE m_status
				SET sta_dfechaultimo2dotst=GetDate(), sta_nCuentaEnFallo2doTST = 0 
				Where sta_iidcuenta=@iCta
	End
*/
Set NoExec Off		
END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH