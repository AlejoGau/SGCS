CREATE OR ALTER PROCEDURE [dbo].[GeneroOPV]
	@iUsuario [int],
	@iCuenta [int],
	@cAlarmaAGenerar [nvarchar](10),
	@tFechaHoraEvento [datetime]
WITH EXECUTE AS CALLER
AS
BEGIN
	SET NOCOUNT ON;

	--Print 'PROCEDURE [dbo].[GeneroOPV] '
	--Print ' @iUsuario            : ' + CONVERT(VARCHAR(10), @iUsuario)
	--Print ' @iCuenta             : ' + CONVERT(VARCHAR(10), @iCuenta)
	--Print ' @cAlarmaAGenerar     : ' + @cAlarmaAGenerar
	--Print ' @tFechaHoraEvento    : ' + Convert(VarChar(MAX), @tFechaHoraEvento, 20);

	--Pablo : el 30-10-18 comente todo lo de situacion porque el [SGSP_pRecepcionINS] ya lo hace

	/*
	declare @est_iidcuenta int
	 SELECT @est_iidcuenta = est_iidcuenta FROM _datos..m_estado_cuenta_cab
     WHERE est_iidCuenta=@iCuenta AND est_nEstado=2
	 */
	 -- MEJORAR performance manejo de estado verificar si se repite calculo

	 /*
	 *!*Busco si la cuenta esta No Habilitada
	SELECT est_iidcuenta FROM m_estado_cuenta_cab
     WHERE est_iidCuenta=@iCuenta AND est_nEstado=2


	If Not @est_iidcuenta Is Null
	begin
		*!*La cuenta esta No Habilitada. Grabar con Resolucion Desactivada y Estado 7
		@iResolucion = busca_parametro('MODO NO HABILITADO')
		@nEstado = 7
		@cMsg = busca_mensaje('EVENTOMODODESACTIVADO')
		@cObservaciones = '['+GetDate()+'] [IpReader] '+@cMsg
	end
	 */
	
	declare @iResolucion int = 0
	declare @nestado int = 0
	declare @cObservaciones NVARCHAR(max) = ''

	--If  @est_iidcuenta Is Not Null
	--begin
	--	-- La cuenta esta No Habilitada. Grabar con Resolucion Desactivada y Estado 7
	--	select  @iResolucion = par_ivalor from _tablas..t_parametros where par_ccodigo = 'MODO NO HABILITADO';
	--	set @nEstado = 7
	--	DECLARE @translation AS NVARCHAR(1024);
	--	EXECUTE [dbo].[LocalizationGetLocale] @Name = N'En Modo No Habilitado', @soloOutput=1, @translation = @translation OUTPUT;
	--	Set @cObservaciones = '['+GetDate()+'] [IpReader] '+@translation
	--end

	--/*
	--If @nEstado = 0		&&Si la cuenta NO esta No Habilitada verifico Modo de Prueba
	--	Begin
	--	*!*Busco si la cuenta esta en Modo de Prueba
	--	@tHoraActual = Getdate()
	--	Select est_iidcuenta From m_estado_cuenta_Cab
	--			Where est_iidcuenta=<<Alltrim(tcIdCuenta)>> AND 
	--			est_nEstado=1 And est_dfechadesde <= @tHoraActual AND est_dfechaHasta >= @tHoraActual
	
	--		If Not @est_iidcuenta Is Null
	--			Begin
	--			*!*La cuenta esta en Modo de Prueba. Grabar con Resolucion y Estado 6 solo si el parametro esta en 1
	--			@iResolucion = busca_parametro('MODO PRUEBA')
	--			If Busca_parametro('SETEOMODODEPRUEBA') = 1 	&&Seteado para que Modo de Prueba Trabaje como desactivado
	--				@nEstado = 6
			 
	--			@cMsg = busca_mensaje('EVENTOMODODEPRUEBA')
	--			@cObservaciones = '['+GetDate()+'] [IpReader] '+@cMsg
	--		End 
	--End
	--*/
	--If @nEstado = 0		--Si la cuenta NO esta No Habilitada verifico Modo de Prueba
	--Begin
	--	--Busco si la cuenta esta en Modo de Prueba
	--	declare @tHoraActual datetime
	--	set @tHoraActual = Getdate()
	--	Select @est_iidcuenta = est_iidcuenta From _datos..m_estado_cuenta_Cab
	--			Where est_iidcuenta=@iCuenta AND 
	--			est_nEstado=1 And est_dfechadesde <= @tHoraActual AND est_dfechaHasta >= @tHoraActual
	
	--		If  @est_iidcuenta Is Not Null
	--		Begin
	--			--La cuenta esta en Modo de Prueba. Grabar con Resolucion y Estado 6 solo si el parametro esta en 1
	--			select  @iResolucion = par_ivalor from _tablas..t_parametros where par_ccodigo = 'MODO PRUEBA';
	--			declare @SETEOMODODEPRUEBA int
	--			select  @SETEOMODODEPRUEBA = par_ivalor from _tablas..t_parametros where par_ccodigo = 'SETEOMODODEPRUEBA';
	--			If @SETEOMODODEPRUEBA = 1 	--Seteado para que Modo de Prueba Trabaje como desactivado
	--			BEGIN
	--				set @nEstado = 6
	--				EXECUTE [dbo].[LocalizationGetLocale] @Name = N'En Modo de Prueba', @soloOutput=1, @translation = @translation OUTPUT;
	--				Set @cObservaciones = '['+GetDate()+'] [IpReader] '+@translation
	--			END
	--		End 
	--End


	/*

*!*Veo si tcAlarmaAGenerar es un codigo que Genera Alerta

SELECT cod_nalerta From t_codigos_alarma Where cod_ccodigo=@cAlarmaAGenerar

	If @cod_nalerta = 2
		&&Es un Evento de NO GENERAR, NO se graba p_recepcion
	Else
		Begin
		*!*Si NO Genera Alerta (0) lo grabo con estado 5
		If @cod_nalerta = 0
			@nEstado = 5
			
		@cDiaDesde = SELECT DATEADD(Second, 1, @tFechaHoraEvento) 		--Es mas 1 segundo para que no pierda relacion de correlatividad
		
		EXEC [dbo].[SGSP_pRecepcionINS]
				@rec_iidcuenta = @IdCuenta
				@rec_calarma = @cAlarmaAGenerar,
				@rec_iusuario = @iUsuario,
				@rec_tfechahora  = @cDiaDesde,
				@rec_nestado  =  @nEstado,
				@rec_tFechaProceso = @cDiaDesde,
				@rec_cObservaciones = @cObservaciones,
				@rec_idResolucion = @iResolucion,
				@rec_nOrigen = 5
	End
	
	*/

	declare @cod_nalerta int
	SELECT @cod_nalerta=cod_nalerta From _tablas..t_codigos_alarma Where cod_ccodigo=@cAlarmaAGenerar

	--Print ' @cod_nalerta             : ' + CONVERT(VARCHAR(10), @cod_nalerta)

	If @cod_nalerta != 2
	Begin
		--Si NO Genera Alerta (0) lo grabo con estado 5
		If @cod_nalerta = 0
			set @nEstado = 5
			
		declare @cDiaDesde datetime
		SELECT @cDiaDesde = DATEADD(Second, 1, @tFechaHoraEvento) 		--Es mas 1 segundo para que no pierda relacion de correlatividad
		
	    --Print ' @cDiaDesde    : ' + Convert(VarChar(MAX), @cDiaDesde, 20);

		EXEC _datos..[SGSP_pRecepcionINS]
				@rec_iidcuenta = @iCuenta,
				@rec_calarma = @cAlarmaAGenerar,
				@rec_iusuario = @iUsuario,
				@rec_tfechahora  = @cDiaDesde,
				@rec_nestado  =  @nEstado,
				@rec_tFechaProceso = @cDiaDesde,
				@rec_cObservaciones = @cObservaciones,
				@rec_idResolucion = @iResolucion,
				@rec_nOrigen = 5
	End


END