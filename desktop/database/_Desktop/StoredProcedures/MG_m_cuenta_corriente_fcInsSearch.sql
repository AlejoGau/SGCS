CREATE OR ALTER PROCEDURE [dbo].[MG_m_cuenta_corriente_fcInsSearch]
	@cta_iCodigoCbte Int = 0,
	@cta_nCuota numeric (2,0) = 0,
	@cta_yTotal  Money = 0,
	@cta_ySaldo  Money = 0,
	@cta_dVencimiento DateTime = 0,
	@cta_dCobro DateTime = 0,

	@idCondicionPago INT
--WITH ENCRYPTION			 
AS
	set noCount on


	print '[MG_m_cuenta_corriente_fcInsSearch] me fijo si el comprobante ya existe en la cuenta corriente antes de insertar'
	declare @ixiste int;
	select @ixiste=count(*) from _datos.dbo.m_cuenta_corriente_fc where [cta_iCodigoCbte] = @cta_iCodigoCbte
	if @ixiste > 0
	BEGIN
		print '[MG_m_cuenta_corriente_fcInsSearch] el comprobante ya existe en la cuenta corriente, no hago nada'
		SET NOEXEC ON
	END

	--traigo las cuotas
	DECLARE @Cuotas INT
	DECLARE @Frecuencia INT
	DECLARE @DiaVencimiento INT
	SELECT top 1 @Cuotas = con_ncuotas,
		@Frecuencia = con_ifrecuencia,
		@DiaVencimiento = con_idias
	FROM _Tablas..t_condiciones_pago_fc WHERE con_idKey = @idCondicionPago --MG_LoteFacturasSearch envia idkey

	print @idCondicionPago
	--si no tiene cutas lo hago en 1 sola cuota
	IF @Cuotas = 0 OR @Cuotas = null
		BEGIN
			SET @Cuotas = 1;
		END


	DECLARE @ImporteCuota float 
	DECLARE @Diferencia float 
	SET @ImporteCuota = @cta_yTotal / @Cuotas
	SET @Diferencia = 0

	--TODO: ACA SE PUEDE CALCULAR UN INTERES
	IF @Cuotas > 1		
		SET @Diferencia = @cta_yTotal - ( @ImporteCuota * @Cuotas )
	ELSE
		SET @Diferencia = 0


	--inserto las cuotas
	DECLARE @cnt INT = 0;
	DECLARE @CualculoVencimiento Datetime
	print '[MG_m_cuenta_corriente_fcInsSearch] Recorro las cuotas: '+convert(varchar(10),@Cuotas)+' Condicion de pago:'+convert(varchar(10), @idCondicionPago)
	WHILE @cnt < @Cuotas
	BEGIN

		IF @cnt = 0
			SET @CualculoVencimiento = DateADD(dd, @DiaVencimiento , @cta_dVencimiento )
		ELSE
			SET @CualculoVencimiento = DateADD(dd, @Frecuencia , @CualculoVencimiento ) 
	

		DECLARE @Total float = ROUND((@ImporteCuota+@Diferencia), 2)

		print @Total
			
		print '[MG_m_cuenta_corriente_fcInsSearch] Inserto cuenta corriente'
		Insert into _datos.dbo.m_cuenta_corriente_fc ([cta_iCodigoCbte],[cta_nCuota],[cta_yTotal],[cta_ySaldo],[cta_dVencimiento],[cta_dCobro])
		values ( @cta_iCodigoCbte, @cnt, @Total, @Total, @CualculoVencimiento, @cta_dCobro)
		
		SET @cnt = @cnt + 1;

		--en el primer ciclo limpio la diferencia
		SET @Diferencia = 0
	END;

	SET NOEXEC OFF
	-- DEDALO 20/02/2020 el select trae problemas cuando se inserta desde el trigger al guardar un cambio de estado en m_comprobantes_cab
	--SELECT @Cuotas as cuotas