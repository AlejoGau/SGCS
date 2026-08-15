--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.927 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[novedadFacturacionSerTecSearch]
	@idServicio INT
AS
BEGIN
			
	DECLARE @utilizafc INT;

	SELECT @utilizafc = par_ivalor FROM [_tablas]..[t_parametros]
				WHERE par_ccodigo = 'UTILIZAFC'

	IF @utilizafc = 1
		BEGIN
			
			DECLARE @cli_icodigo_ID INT
			DECLARE @Dealer NVARCHAR(3)
			DECLARE @Cuenta NVARCHAR(4)
			DECLARE @tip_cdescripcion NVARCHAR(MAX)
			DECLARE @idCuenta INT
			DECLARE @idTipoServicio NVARCHAR(3)
			DECLARE @ImporteTotalOrden DECIMAL

		  -- traigo datos de serivicio
			SELECT
				@idCuenta = stc_iid_cuenta,
				@idTipoServicio = stc_ctipo_servicio,
				@ImporteTotalOrden = stc_yValor,
				@Dealer = cue_clinea, 
				@Cuenta = cue_ncuenta
				FROM _Datos..m_st_cabecera 
					INNER JOIN _Datos..m_cuentas ON stc_iid_cuenta = cue_iid
					WHERE stc_iid = @idServicio 

			IF @idCuenta != 0 
				BEGIN
						
							DECLARE @cDesc NVARCHAR(MAX)
							DECLARE @iCodigoNovedad INT

							--Busco si la cuenta pertenece a un Cliente de MoneyGuard
							SELECT TOP 1 @cli_icodigo_ID = cli_icodigo_ID 
								FROM _Datos..m_clientes_fc
								INNER JOIN _Datos..m_relacion_cliente_cuentas_fc ON cli_icodigo_ID = rel_icliente
									WHERE rel_icuenta = @idCuenta 

							IF @cli_icodigo_ID != 0
								BEGIN
									
										--Busco el Servicio Realizado
										SELECT @tip_cdescripcion = tip_cdescripcion FROM _Tablas..t_tiposervicio
											WHERE tip_ccodigo = @idTipoServicio

										--Obtengo @tip_cdescripcion

										--Si usa MoneyGuard grabo novedad para facturacion
										SET @cDesc = Left('ST Cuenta: '+@Dealer+'-'+@Cuenta+' '+@tip_cdescripcion,50)

										INSERT INTO _Tablas..t_novedades_fc (nov_cdescripcion,nov_mimporte,nov_cimpuesto1,nov_cimpuesto2,nov_cimpuesto3)
											VALUES( @cDesc, @ImporteTotalOrden,'','','')

										SET @iCodigoNovedad = @@IDENTITY 
										
										--Inserto la Novedad en el Maestro de Novedades
										INSERT INTO _Datos..m_novedades_facturacion_fc (nfc_icliente,nfc_inovedad,nfc_nrecurrente,nfc_nestado)
											VALUES(@cli_icodigo_ID,@iCodigoNovedad,2,1)

									
										select 0 Error, 'noverdad insertada' Message
										RETURN
								END
						ELSE
							BEGIN
								select 1 Error, 'no tiene moneyguard' Message
								RETURN
							END
							
				END

		END
END