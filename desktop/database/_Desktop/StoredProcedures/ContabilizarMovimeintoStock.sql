--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.977 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.100 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ContabilizarMovimeintoStock]
/*	@IdDeposito INT = 0,
	@idProducto INT = 0,
	@cantidad INT = 0,
	@tipoMovimiento NVARCHAR(2) = ''*/

	@IdCabecera INT = 0

AS
BEGIN
 
			DECLARE @cantidadPreOrigen INT;
			DECLARE @cantidadPreDestino INT;
			DECLARE @idKeyTotalOrigen INT;
			DECLARE @idKeyTotalDestino INT;
			DECLARE @IdDepositoOrigen INT;
			DECLARE @IdDepositoDestino INT;
			DECLARE @idProducto INT;
			DECLARE @cantidadPost INT;
			DECLARE @tipoMovimiento NVARCHAR(2);
			DECLARE @cantidad INT;
			DECLARE @cantidadPre INT;


			SELECT 
					RowNum = ROW_NUMBER() OVER(ORDER BY it.sti_idKey)
					,stc_idkey
					,stc_iddepositoorigen
					,stc_iddepositodestino
					,stc_iusuariodss
					,stc_itecnico
					,stc_tipomov
					,stc_comprobantetipo
					,stc_comprobante
					,stc_referencia
					,stc_descripcion
					,stc_fecha
					,it.sti_idkey
					,it.Name
					,it.sti_idcabecera
					,it.sti_idproducto
					,it.sti_cant
			INTO #CabecerasItems
			FROM _datos..m_stock_cabecera ca
			INNER JOIN _datos..m_stock_item it ON it.sti_idcabecera = ca.stc_idKey
			WHERE stc_idKey = @IdCabecera

			DECLARE @MaxRownum INT
			SET @MaxRownum = (SELECT MAX(RowNum) FROM #CabecerasItems)

			DECLARE @Iter INT
			SET @Iter = (SELECT MIN(RowNum) FROM #CabecerasItems)

			WHILE @Iter <= @MaxRownum
			BEGIN

					SET @cantidadPost = 0;
					SET @cantidadPre = 0;
					SET @idKeyTotalOrigen = 0;
					SET @idKeyTotalDestino = 0;

					SELECT @tipoMovimiento = stc_tipomov,
								 @cantidad = sti_cant,
								 @IdDepositoOrigen = stc_iddepositoorigen,
								 @IdDepositoDestino = stc_iddepositodestino,
								 @idProducto = sti_idproducto
						FROM #CabecerasItems
					 WHERE RowNum = @Iter						
					


					
					/* TRAIGO SI TIENE TOTALES ORIGEN	*/
					SELECT @cantidadPreOrigen = stt_cant ,
								 @idKeyTotalOrigen = stt_idKey
						FROM _datos..m_stock_totales 
						WHERE stt_iddeposito = @IdDepositoOrigen
							AND stt_idProducto = @idProducto

					/* TRAIGO SI TIENE TOTALES DESTINO	*/
					SELECT @cantidadPreDestino = stt_cant ,
								 @idKeyTotalDestino = stt_idKey
						FROM _datos..m_stock_totales 
						WHERE stt_iddeposito = @IdDepositoDestino
							AND stt_idProducto = @idProducto


					/* Verifico si hay registro sino lo creo ORIGEN */
					IF @idKeyTotalOrigen != 0
						BEGIN
					
								
								
								SET @cantidadPost = @cantidadPreOrigen - @cantidad
									
								UPDATE _datos..m_stock_totales
									 SET stt_cant = @cantidadPost,
											 stt_fecha = GETDATE()
								 WHERE stt_idKey = @idKeyTotalOrigen

						END	
					ELSE
						BEGIN
							/* nuevo registro de totales */
							INSERT INTO _datos..m_stock_totales (
									--stt_idkey,
									Name,
									stt_iddeposito,
									stt_idproducto,
									stt_idtecnico,
									stt_cant,
									stt_fecha
								) VALUES (
								--	'',
									'',
									@IdDepositoOrigen,
									@idProducto,
									0,
									0,
									GETDATE()				
								)
						END



				  /* Verifico si hay registro sino lo creo DESTINO */
					IF @idKeyTotalDestino != 0
						BEGIN
					
								
								SET @cantidadPost = @cantidadPreDestino + @cantidad
								

								UPDATE _datos..m_stock_totales
									 SET stt_cant = @cantidadPost,
											 stt_fecha = GETDATE()
								 WHERE stt_idKey = @idKeyTotalDestino

						END	
					ELSE
						BEGIN
							/* nuevo registro de totales */
							INSERT INTO _datos..m_stock_totales (
									--stt_idkey,
									Name,
									stt_iddeposito,
									stt_idproducto,
									stt_idtecnico,
									stt_cant,
									stt_fecha
								) VALUES (
								--	'',
									'',
									@IdDepositoDestino,
									@idProducto,
									0,
									@cantidad,
									GETDATE()				
								)
						END


				
					
					
					SET @Iter = @Iter + 1
			END

			DROP TABLE #CabecerasItems



			

		

END