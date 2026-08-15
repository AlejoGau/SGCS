CREATE OR ALTER PROCEDURE [dbo].[IPRS_UPD_m_status]
	@idCta [int] = 0,
	@cod_nalerta [int] = 0,
	@cAlarma [char](3) = '',
	@cod_ntipo [int] = 0,
	@cod_nprioridad [int] = 0,
	@idUsuario [int] = 0,
	@cZona [varchar](3) = '',
	@rec_idFwd [int] = 0,
	@rec_cdll [varchar](50) = '',
	@bGuardoPTimer [int] = 0 OUTPUT
WITH EXECUTE AS CALLER
AS
BEGIN
	SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	If @idCta=0
		Set @idCta = NUll

	IF (@idCta IS NULL)
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Se descarto por idCta null';
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	END

	---------------------
	----- MSTATUS -------
	---------------------
	--Primero me traigo todos los valores actuales de mStatus para "retener" los valores si hay que Updatear
	DECLARE @sta_iidCuenta INT
	DECLARE @iReinicio INT
	DECLARE @sta_dfechaultimotst DATETIME
	DECLARE @mst_sta_nestado INT
	DECLARE @sta_dfechaultimooc DATETIME
	DECLARE @tst_calarmaesperada NVARCHAR(10)
	DECLARE @tst_calarma3esperada NVARCHAR(10)
	DECLARE @sta_dfechaultimo2dotst DATETIME
	DECLARE @sta_dfechaultimo3ertst DATETIME
	DECLARE @sta_nCuentaEnFalloDeTST INT = 0
	DECLARE @sta_nCuentaEnFallo2doTST INT = 0
	DECLARE @sta_nCuentaEnFallo3erTST INT = 0
	DECLARE @sta_dfechaOPNdesde DATETIME
	DECLARE @sta_nEventoParaOPV INT = 0
	DECLARE @sta_cultimaalarma NVARCHAR(10)
	DECLARE @sta_dfechautimaalarma DATETIME
	DECLARE @mst_cod_nalerta INT = 0
	DECLARE @mst_cod_nprioridad INT = 0
	DECLARE @sta_cUltimaAlerta NVARCHAR(10)
	DECLARE @sta_dFechaUltimaAlerta DATETIME
	DECLARE @sta_tEnFalloDeTSTDesde DATETIME
	DECLARE @sta_tEnFalloDeTST2Desde DATETIME
	DECLARE @sta_tEnFalloDeTST3Desde DATETIME
	DECLARE @sta_nEnFalloDeAC INT = 0
	DECLARE @fecha DATETIME = getdate()

	SELECT @sta_iidCuenta = sta_iidCuenta
		,@iReinicio = IsNull(tst_ireinicio, 0)
		,@sta_dfechaultimotst = sta_dfechaultimotst
		,@mst_sta_nestado = sta_nestado
		,@sta_dfechaultimooc = sta_dfechaultimooc
		,@tst_calarmaesperada = tst_calarmaesperada
		,@tst_calarma3esperada = tst_calarma3esperada
		,@sta_dfechaultimo2dotst = sta_dfechaultimo2dotst
		,@sta_dfechaultimo3ertst = sta_dfechaultimo3ertst
		,@sta_nCuentaEnFalloDeTST = IsNull(sta_nCuentaEnFalloDeTST, 0)
		,@sta_nCuentaEnFallo2doTST = IsNull(sta_nCuentaEnFallo2doTST, 0)
		,@sta_nCuentaEnFallo3erTST = IsNull(sta_nCuentaEnFallo3erTST, 0)
		,@sta_dfechaOPNdesde = sta_dfechaOPNdesde
		,@sta_nEventoParaOPV = sta_nEventoParaOPV
		,@sta_cultimaalarma = sta_cultimaalarma
		,@sta_dfechautimaalarma = sta_dfechautimaalarma
		,@mst_cod_nalerta = IsNull(cod_nalerta, 0)
		,@mst_cod_nprioridad = IsNull(cod_nprioridad, 9)
		,@sta_cUltimaAlerta = sta_cUltimaAlerta
		,@sta_dFechaUltimaAlerta = sta_dFechaUltimaAlerta
		,@sta_tEnFalloDeTSTDesde = sta_tEnFalloDeTSTDesde
		,@sta_tEnFalloDeTST2Desde = sta_tEnFalloDeTST2Desde
		,@sta_tEnFalloDeTST3Desde = sta_tEnFalloDeTST3Desde
		,@sta_nEnFalloDeAC = sta_nEnFalloDeAC
	FROM _Datos.dbo.m_status WITH (NOLOCK)
		LEFT JOIN _Datos.dbo.m_tst_prueba ON sta_iidCuenta = tst_iidCuenta
		LEFT JOIN _Tablas.dbo.t_codigos_alarma ON sta_cultimaalarma = cod_ccodigo
	WHERE sta_iidCuenta = @idCta

	DECLARE @iGeneraOPV INT = 0;
	DECLARE @nEventoParaOPV INT = IsNull(@sta_nEventoParaOPV,0);

	--Si el evento se FWDeo no hay que hacer esto	
	IF (@rec_idFwd = 0 Or @rec_idFwd Is Null)
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV | Controlar si hay que generar OPV despues de Evento de Alerta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		--Tengo que ver si tiene OPNDESPUESDEALERTA por dealer
		--0 = No Genera / 1 = Genera  / 2 = Genera controlando historia / 3-Utiliza configuracion del parametro OPNDESPUESDEALERTA
		Select @iGeneraOPV = [lin_iOpnDespuesAlerta] 
			From _Tablas.dbo.t_lineas WITH (NOLOCK)
		Inner Join _Datos.dbo.m_cuentas On cue_clinea=lin_ccodigo
			WHERE cue_iid = @idCta
		
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV | iOpnDespuesAlerta : '+Cast(@iGeneraOPV As Char(1))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @iGeneraOPV = 3 --Busco la configuracion del parametro
		Begin
			--0 = No Genera / 1 = Genera  / 2 = Genera controlando historia
			SELECT @iGeneraOPV = par_ivalor
				FROM _Tablas.dbo.t_parametros WITH (NOLOCK)
				WHERE par_cCodigo = 'OPNDESPUESDEALERTA'
		End

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV | iGeneraOPV : '+Cast(@iGeneraOPV As Char(1))+' | nEventoParaOPV : '+Cast(@nEventoParaOPV As Char(1))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @iGeneraOPV = 2 AND @nEventoParaOPV = 0 --x que si nEventoParaOPV ya esta en 1 debe quedar asi
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV |cod_nalerta : '+Cast(@cod_nalerta As Char(1))+' | cod_nprioridad : '+Cast(@cod_nprioridad As Char(1))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cod_nalerta = 1	AND @cod_nprioridad < 4
				SET @nEventoParaOPV = 1
		END
	END
	-- HASTA ACA NO HACER si se FWDeo

	--DECLARE @bGuardoPTimer INT = 0;
	DECLARE @bRestauraComunicacion INT = 0;

	IF @iReinicio = 1 --Es que resetee x cualquiera
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Resetea x cualquiera'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		--Tengo que fijarme si son codigos internos. Estos no deberian actualizar TST
		IF EXISTS (	SELECT cod_idKey FROM _Tablas.dbo.t_codigos_alarma WITH (NOLOCK) WHERE cod_ccodigo = @cAlarma And cod_nsistema=1 And Left(@cAlarma,1)='_' )
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Codigo de alarma es interno no se actualiza TST de Status'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END
		ELSE
			BEGIN
				If @sta_nCuentaEnFalloDeTST >0
					SET @bRestauraComunicacion = 1

				SET @sta_dfechaultimotst = @fecha
				SET @sta_nCuentaEnFalloDeTST = 0
				SET @sta_tEnFalloDeTSTDesde = NULL
			END
	END
	ELSE IF @cAlarma = 'TST'
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Resetea x TST'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @sta_nCuentaEnFalloDeTST >0
			SET @bRestauraComunicacion = 1

		SET @sta_dfechaultimotst = @fecha
		SET @sta_nCuentaEnFalloDeTST = 0
		SET @sta_tEnFalloDeTSTDesde = NULL
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] 2do testeo @cAlarma = '+@cAlarma+' @tst_calarmaesperada='+@tst_calarmaesperada + ' @sta_nCuentaEnFallo2doTST=' +convert(varchar(1),@sta_nCuentaEnFallo2doTST)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--2do Testeo
	IF @cAlarma = @tst_calarmaesperada Or @tst_calarmaesperada = '_Q_'
	BEGIN
		--Tengo que fijarme si son codigos internos. Estos no deberian actualizar 2TST. Salvo que sea _KA
		IF EXISTS (	SELECT cod_idKey FROM _Tablas.dbo.t_codigos_alarma WITH (NOLOCK) WHERE cod_ccodigo = @cAlarma And cod_nsistema=1 And Left(@cAlarma,1)='_' And @cAlarma != '_KA')
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Codigo de alarma es interno no se actualiza 2TST de Status'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END
		ELSE
			BEGIN
				If @sta_nCuentaEnFallo2doTST >0
					SET @bRestauraComunicacion = 1

				SET @sta_dfechaultimo2dotst = @fecha
				SET @sta_nCuentaEnFallo2doTST = 0
				SET @sta_tEnFalloDeTST2Desde = NULL
			END

	END

	/*
	IF @cAlarma = @tst_calarma3esperada --Or @cOpnClo = 'C'	--Testeo Seguidor
	BEGIN
		If @sta_nCuentaEnFallo3erTST >0
			SET @bRestauraComunicacion = 1

		SET @sta_dFechaUltimo3erTst = @fecha
		SET @sta_nCuentaEnFallo3erTST = 0
		SET @sta_tEnFalloDeTST3Desde = NULL
	END

	If @bRestauraComunicacion=1
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Cambio de estado llamo a IPRS_RestauraComunicacion'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute _Desktop.dbo.IPRS_RestauraComunicacion @rec_cdll, @idCta
	END
	*/
	DECLARE @cOpnClo NVARCHAR(10) = ''
	DECLARE @nEstado INT = 0

	IF @cod_ntipo = 1
	BEGIN
		SET @nEstado = 1 -- Abierta
		SET @bGuardoPTimer = 1
		SET @cOpnClo = 'O'
	END

	IF @cod_ntipo = 2
	BEGIN
		SET @nEstado = 0 -- Cerrada
		SET @bGuardoPTimer = 1
		SET @cOpnClo = 'C'
	END

	IF @cAlarma = @tst_calarma3esperada Or @cOpnClo = 'C'	--Testeo Seguidor
	BEGIN
		If @sta_nCuentaEnFallo3erTST >0
			SET @bRestauraComunicacion = 1

		SET @sta_dFechaUltimo3erTst = @fecha
		SET @sta_nCuentaEnFallo3erTST = 0
		SET @sta_tEnFalloDeTST3Desde = NULL
	END

	If @bRestauraComunicacion=1
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Cambio de estado llamo a IPRS_RestauraComunicacion'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute _Desktop.dbo.IPRS_RestauraComunicacion @rec_cdll, @idCta
	END

	IF @bGuardoPTimer = 1
	BEGIN
		SET @sta_dFechaUltimoOC = @fecha

		IF @cOpnClo = 'O'
			SET @sta_dFechaOPNdesde = @fecha
	END

	SET @sta_cultimaalarma = @cAlarma
	SET @sta_dfechautimaalarma = @fecha

	IF @cod_nalerta = 1 --Es evento que genera alerta
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Es evento que genera alerta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SET @sta_cUltimaAlerta = @cAlarma
		SET @sta_dFechaUltimaAlerta = @fecha
	END
	/*
	else
	BEGIN
		-- no cambia fecha si no es alerta 
		-- SET @sta_dFechaUltimaAlerta = @fecha
	END
	*/

	DECLARE @cFallaAC NVARCHAR(10) = '';
	DECLARE @cRestAC NVARCHAR(10) = '';

	SELECT @cFallaAC = par_cvalor
		FROM _tablas..t_parametros
	WHERE par_ccodigo = 'CODALRFALLAAC';

	SELECT @cRestAC = par_cvalor
		FROM _tablas..t_parametros
	WHERE par_ccodigo = 'CODALRRESTFALLAAC';

	--Son los valores obtenidos de mStatus, si era null se lo considera o (cero)
	--@sta_nEnFalloDeAC	
	IF CHARINDEX(@cAlarma, @cFallaAC) > 0
		SET @sta_nEnFalloDeAC = 1
	ELSE IF CHARINDEX(@cAlarma, @cRestAC) > 0 --Es Codigo de Restauracion de Falla de AC
		SET @sta_nEnFalloDeAC = 0

	DECLARE @sta_nestado AS INT = NULL;

	IF @cod_ntipo = 1
		SET @sta_nestado = 1;

	IF @cod_ntipo = 2
		SET @sta_nestado = 0;

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] @sta_nestado = ' + isnull(CONVERT(NVARCHAR(5), @sta_nestado), 'null') + ' Cuenta: ' + CONVERT(NVARCHAR(10), @idCta);
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Tengo que actualizar Status con ultima alarma y fecha si no existe el registro lo creo
	IF EXISTS (	SELECT sta_iidCuenta FROM _datos..m_status WITH (NOLOCK) WHERE sta_iidCuenta = @idCta )
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Existe m_status actualizo sta_nCuentaEnFallo2doTST = '+Convert(Varchar(10),@sta_nCuentaEnFallo2doTST) + '  | sta_nEventoParaOPV = ' +Convert(Varchar(10),@nEventoParaOPV)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		UPDATE _datos..m_status
		SET sta_cUltimaAlerta = @sta_cUltimaAlerta
			,sta_dfechautimaalarma = @sta_dfechautimaalarma
			,sta_cultimaalarma = @sta_cultimaalarma
			,sta_dFechaUltimaAlerta = @sta_dFechaUltimaAlerta
			,sta_nestado = isnull(@sta_nestado, @mst_sta_nestado)
			,sta_dfechaultimotst = @sta_dfechaultimotst
			,sta_nCuentaEnFalloDeTST = @sta_nCuentaEnFalloDeTST
			,sta_tEnFalloDeTSTDesde = @sta_tEnFalloDeTSTDesde
			,sta_dfechaultimo2dotst = @sta_dfechaultimo2dotst
			,sta_nCuentaEnFallo2doTST = @sta_nCuentaEnFallo2doTST
			,sta_tEnFalloDeTST2Desde = @sta_tEnFalloDeTST2Desde
			,sta_dFechaUltimo3erTst = @sta_dFechaUltimo3erTst
			,sta_nCuentaEnFallo3erTST = @sta_nCuentaEnFallo3erTST
			,sta_tEnFalloDeTST3Desde = @sta_tEnFalloDeTST3Desde
			,sta_dFechaOPNdesde = @sta_dFechaOPNdesde
			,sta_dFechaUltimoOC = @sta_dFechaUltimoOC
			,sta_nEnFalloDeAC = isnull(@sta_nEnFalloDeAC, 0)
			,sta_nEventoParaOPV = @nEventoParaOPV
		WHERE sta_iidCuenta = @idCta
	END
	ELSE
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Inserto en m_status'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		INSERT INTO _datos..m_status (
			sta_iidCuenta
			,sta_cultimaalarma
			,sta_dfechautimaalarma
			,sta_cUltimaAlerta
			,sta_dFechaUltimaAlerta
			,sta_nestado
			,sta_dfechaultimotst
			,sta_nCuentaEnFalloDeTST
			,sta_tEnFalloDeTSTDesde
			,sta_dfechaultimo2dotst
			,sta_nCuentaEnFallo2doTST
			,sta_tEnFalloDeTST2Desde
			,sta_dFechaUltimo3erTst
			,sta_nCuentaEnFallo3erTST
			,sta_tEnFalloDeTST3Desde
			,sta_dFechaOPNdesde
			,sta_dFechaUltimoOC
			,sta_nEnFalloDeAC
			,sta_nEventoParaOPV
			)
		VALUES (
			@idCta
			,isnull(@cAlarma,'')
			,GetDate()
			,isnull(@sta_cUltimaAlerta,'')
			,@sta_dFechaUltimaAlerta
			,isnull(@sta_nestado, 0)
			,@sta_dfechaultimotst
			,isnull(@sta_nCuentaEnFalloDeTST, 0)
			,@sta_tEnFalloDeTSTDesde
			,@sta_dfechaultimo2dotst
			,isnull(@sta_nCuentaEnFallo2doTST, 0)
			,@sta_tEnFalloDeTST2Desde
			,@sta_dFechaUltimo3erTst
			,isnull(@sta_nCuentaEnFallo3erTST, 0)
			,@sta_tEnFalloDeTST3Desde
			,@sta_dFechaOPNdesde
			,@sta_dFechaUltimoOC
			,isnull(@sta_nEnFalloDeAC, 0)
			,@nEventoParaOPV
			);
	END

	DECLARE @bGeneraOPV INT = 0;

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV | @cOpnClo : '+@cOpnClo
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @cOpnClo = 'O'
	BEGIN
		IF @iGeneraOPV = 1 --Open despues de ultimo evento Alerta
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV |mst_cod_nalerta : '+Cast(@mst_cod_nalerta As Char(1))+' | mst_cod_nprioridad : '+Cast(@mst_cod_nprioridad As Char(1))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @mst_cod_nalerta = 1	AND @mst_cod_nprioridad < 4
			Begin
				SET @nEventoParaOPV = 1
				SET @bGeneraOPV = 1
			End 
		END

		IF @iGeneraOPV = 2 --Open despues de cualquier anterior evento Alerta
		BEGIN
			IF @nEventoParaOPV = 1
				SET @bGeneraOPV = 1
		END

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] GenerarOPV | bGeneraOPV : '+Cast(@bGeneraOPV As Char(1))+' | nEventoParaOPV : '+Cast(@nEventoParaOPV As Char(1))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @bGeneraOPV = 1
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Execute GeneroOPV con OPV'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			EXECUTE [GeneroOPV] @iUsuario = @idUsuario,	@iCuenta = @idCta,	@cAlarmaAGenerar = 'OPV',	@tFechaHoraEvento = @fecha

			UPDATE _datos..m_status
			SET sta_nEventoParaOPV = 0
			WHERE sta_iidcuenta = @idCta

			--Sacar de EventosTimer el evento para que Timer no vuelva a controlar
			Set @bGuardoPTimer = 0
		END
	END

	IF @bGuardoPTimer = 1
	BEGIN
		DECLARE @iCtrlUsuarioI INT
		DECLARE @usu_nTipo INT
		DECLARE @tol_nControl INT

		SELECT @iCtrlUsuarioI = par_ivalor
			FROM _tablas..t_parametros
		WHERE par_ccodigo = 'CONTROLDEUSUARIOINEXISTENTE';

		IF @iCtrlUsuarioI = 1
		BEGIN
			SET @bGuardoPTimer = 0
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] CONTROLDEUSUARIOINEXISTENTE esta en SI'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--Se pidio que si la cuenta no controla horarios ni tiene en SI el sin horario controla eventos, que ante el OPN/CLO de un usuario no existente genere un OPV/CLV si tiene el parametro en SI
			--Busco Usuario			
			SELECT @usu_nTipo = usu_nTipo
				FROM _datos..m_usuarios
			WHERE usu_iidCuenta = @idCta
				AND usu_icodigo > 0
				AND usu_iid = @idUsuario

			IF @usu_nTipo IS NOT NULL
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] Buscar si ya controla horarios'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @tol_nControl = tol_nControl
						FROM _Datos.dbo.m_horarios_tolerancia WITH (NOLOCK)
					LEFT JOIN _Datos.dbo.m_horarios ON hor_iidcuenta = tol_iidcuenta
					WHERE tol_iidcuenta = @idCta

					IF NOT @tol_nControl IS NULL
						IF @tol_nControl = 1 --Sin horarios controla eventos en SI
							SET @bGuardoPTimer = 1
						Else
							SET @bGuardoPTimer = 3	--Sin horarios controla eventos en No
					Else
						Begin
							SET @bGuardoPTimer = 2	--NO tiene ni que actualizar pTimer ni generar OPV
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] NO tiene ni que actualizar pTimer ni generar OPV'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End

				END
			Else
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] @usu_nTipo es null - tiene que generar OPV/CLV'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
		END
		
		IF @bGuardoPTimer = 1
			EXECUTE [actualizoP_Timer]
				 @iID = 0
				,@tFechaHora = @fecha
				,@IdCuenta = @idCta
				,@Alarma = @cAlarma
				,@iUsuario = @idUsuario
				,@Zona = @cZona
				,@cOpnClo = @cOpnClo
		ELSE
			BEGIN
				IF @bGuardoPTimer = 0
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] | GeneroOPV con @cOpnClo =>'+@cOpnClo+' y tFechaHoraEvento =>'+  Convert(VarChar(MAX), @fecha, 20)
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					
					IF @cOpnClo = 'O'
						EXECUTE [GeneroOPV] @iUsuario = @idUsuario ,@iCuenta = @idCta ,@cAlarmaAGenerar = 'OPV' ,@tFechaHoraEvento = @fecha
					ELSE
						EXECUTE [GeneroOPV] @iUsuario = @idUsuario ,@iCuenta = @idCta ,@cAlarmaAGenerar = 'CLV' ,@tFechaHoraEvento = @fecha
				End
			END
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_UPD_m_status] | @bGuardoPTimer : '+  Cast(@bGuardoPTimer As Char(1))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec Off
END