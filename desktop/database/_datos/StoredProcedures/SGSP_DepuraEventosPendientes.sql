CREATE OR ALTER PROCEDURE [dbo].[SGSP_DepuraEventosPendientes] @idRec BigInt As
--Es el store que ejecuta el trigger de delete en [EventosPendientes] para depuracion automatica pRecepcion
--Autor :Pablo O. Canónico
--Fecha :21/04/2016
--2018-10-01: Pablo. Se modifico para que tome los datos de EventosPedientes. Se cambio el [Trg_PendientesDelete] a INSTEAD OFF
--2024-01-18: Pablo. Cambio nEstado a 3 si nEstado esta en 0 para que NO quede como pendiente en la depurada
--2025-07-22: Pablo. Se cambio SP_CreoHistoria por [SGSP_CreoPRDepurado]
--2025-07-25: Pablo. Se cambio a IF OBJECT_ID(@SynName, 'SN') 
SET NOCOUNT ON;

BEGIN TRY
--DBCC TRACEON (1224)

Declare @cCodAlarma Char(3)
Declare @iPrioridad Int
Declare @idCuenta Int
Declare @cZon  Char(10)
Declare @iUsu  Int
Declare @cName nVarChar(30)
Declare @cDesc nVarChar(60)
Declare @_Origen nVarChar(100)
Declare @_Puerto nVarChar(100)
Declare @cCierre Char(6)
Declare @rec_nEstado Numeric(1, 0) 
Declare @rec_nOrigen Numeric(1, 0)
Declare @rec_cContenido nVarChar(50) 
Declare @rec_iOperador Int
Declare @rec_cTerminal Char(3)
Declare @rec_idResolucion NChar(3)
Declare @rec_idReceptor Int
Declare @rec_cCategorizacion Char(3)
Declare @rec_iNYR bigInt
Declare @rec_iTE bigInt
Declare @rec_idMap bigInt
Declare @rec_idFwd bigInt
Declare @rec_iMinutosEspera Smallint
Declare @rec_iPuerto Int
Declare @rec_idLoc Int
Declare @rec_isoFechaHora Varchar(30)
Declare @rec_isoFechaProceso Varchar(30)
Declare @rec_isoFechaRecepcion Varchar(30)

Select Top 1 @cName = usu_cNombre, @cDesc = zon_cDescripcion, @_Origen = _Origen,	@_Puerto=_Puerto,
		@iPrioridad =rec_iPrioridad, @cCodAlarma = rec_cAlarma, @idCuenta = rec_iidcuenta, @cZon = rec_czona, @iUsu = rec_iusuario,
		@rec_nEstado=rec_nEstado, @rec_nOrigen=rec_nOrigen, @rec_cContenido=rec_cContenido,
		@rec_iOperador=rec_iOperador, @rec_cTerminal=rec_cTerminal, @rec_idResolucion=rec_idResolucion, @rec_idReceptor=IsNull(rec_idReceptor,0), @rec_cCategorizacion=IsNull(rec_cCategorizacion,''), @rec_iNYR=IsNull(rec_iNYR,0), @rec_iTE=IsNull(rec_iTE,0),
		@rec_idMap=IsNull(rec_idMap,0), @rec_idFwd=IsNull(rec_idFwd,0), @rec_iMinutosEspera=rec_iMinutosEspera,	@rec_iPuerto=rec_iPuerto, @rec_idLoc=IsNull(rec_idLoc,0), @rec_isoFechaHora=rec_isoFechaHora,
		@rec_isoFechaProceso=rec_isoFechaProceso, @rec_isoFechaRecepcion=rec_isoFechaRecepcion, @cCierre=Left(Convert(CHARACTER, rec_tfechahora, 112),6)
		From [dbo].[EventosPendientes]
		Where rec_iid = @idRec

If @cCierre is Null
	Set NoExec On

Declare @message nVarChar(Max) = '',
	@StartDateTimeText VarChar(max) = ''
		
--Observaciones--	
Declare @cObs NVarchar(MAX)
Set @cObs = (Select Top 1 Convert(NVarchar(MAX), rec_cObservaciones) From [EventosPendientes] Where rec_iid = @idRec)

--Creo el Historico Necesario
Declare	@nError Int = 0
Declare @SynName NVarchar(128) = 'p_recepcion' + @cCierre;
IF OBJECT_ID(@SynName, 'SN') Is NULL And OBJECT_ID(@SynName, 'U') Is NULL 
	Execute [SGSP_CreoPRDepurado] @cCierre, @nError = @nError OUTPUT

If @nError <> -9	--No pudo crear historico
	Begin		
		If @rec_nEstado=0
			Set @rec_nEstado=3

		--Verifico que no este guardado
		Declare @cSQL NVarchar(MAX)
		Set @cSQL = 'Select Top 1 rec_iid From [dbo].[p_recepcion' +  @cCierre  +  '] Where [rec_iId]='+Cast(@idRec As Varchar(10))
		Exec (@cSQL )
		IF @@rowcount = 0
			Begin
				Set @cSQL = 'INSERT INTO [dbo].[p_recepcion' +  @cCierre  + '] ([rec_iid], [rec_iidcuenta], [rec_calarma], [rec_czona], [rec_iusuario], [rec_tfechahora], [rec_nestado], [rec_cContenido], [rec_tFechaProceso], [rec_ioperador], [rec_cObservaciones], [rec_cTerminal], [rec_idResolucion], [rec_idReceptor], [rec_cCategorizacion], [rec_iNYR], [rec_iTE], [rec_tFechaRecepcion], [rec_nOrigen], [rec_idMap], [rec_idFwd], [rec_iMinutosEspera], [rec_iPuerto], [rec_idLoc], [rec_iPrioridad], [usuario_iCodigo], [usuario_cNombre], [zonas_cCodigo], [zonas_cDescripcion], [_Origen], [_Puerto] )'
				Set @cSQL = @cSQL + ' VALUES (@idRec,@idCuenta,@cCodAlarma,@cZon,@iUsu,@rec_isoFechaHora,@rec_nEstado,@rec_cContenido,@rec_isoFechaProceso,@rec_iOperador,@cObs,@rec_cTerminal,@rec_idResolucion,@rec_idReceptor,@rec_cCategorizacion,@rec_iNYR,@rec_iTE,@rec_isoFechaRecepcion,@rec_nOrigen,@rec_idMap,@rec_idFwd,@rec_iMinutosEspera,@rec_iPuerto,@rec_idLoc,@iPrioridad,@iUsu,@cName,@cZon,@cDesc,@_Origen,@_Puerto)'

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_DepuraEventosPendientes] | SQL : '+@cSQL
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @DynamicSqlParams NVarchar(MAX)
				Set @DynamicSqlParams = '@idRec Int,@idCuenta Int,@cCodAlarma Char(3),@cZon Char(10),@iUsu Int,@rec_isoFechaHora VarChar(30),@rec_nEstado Numeric(1,0),@rec_cContenido VarChar(50),@rec_isoFechaProceso VarChar(30),@rec_iOperador Int,@cObs nVarChar(Max),@rec_cTerminal Char(3),@rec_idResolucion nChar(3),@rec_idReceptor Int,@rec_cCategorizacion Char(3),@rec_iNYR Int,@rec_iTE Int,@rec_isoFechaRecepcion VarChar(30),@rec_nOrigen Numeric(1,0),@rec_idMap Int,@rec_idFwd Int,@rec_iMinutosEspera Int,@rec_iPuerto Int,@rec_idLoc Int,@iPrioridad Int,@cName nVarChar(30),@cDesc nVarChar(60),@_Origen nVarChar(100),@_Puerto nVarChar(100)'
		
				Execute sp_executesql @cSQL, @DynamicSqlParams, @idRec=@idRec, @idCuenta=@idCuenta, @cCodAlarma=@cCodAlarma, @cZon=@cZon ,@iUsu=@iUsu, @rec_isoFechaHora=@rec_isoFechaHora, @rec_nEstado=@rec_nEstado, @rec_cContenido=@rec_cContenido, @rec_isoFechaProceso=@rec_isoFechaProceso, @rec_iOperador=@rec_iOperador, @cObs=@cObs, @rec_cTerminal=@rec_cTerminal, @rec_idResolucion=@rec_idResolucion, @rec_idReceptor=@rec_idReceptor, @rec_cCategorizacion=@rec_cCategorizacion, @rec_iNYR=@rec_iNYR, @rec_iTE=@rec_iTE, @rec_isoFechaRecepcion=@rec_isoFechaRecepcion, @rec_nOrigen=@rec_nOrigen, @rec_idMap=@rec_idMap, @rec_idFwd=@rec_idFwd, @rec_iMinutosEspera=@rec_iMinutosEspera, @rec_iPuerto=@rec_iPuerto, @rec_idLoc=@rec_idLoc, @iPrioridad=@iPrioridad, @cName=@cName, @cDesc=@cDesc, @_Origen=@_Origen, @_Puerto=@_Puerto
			End
	End
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