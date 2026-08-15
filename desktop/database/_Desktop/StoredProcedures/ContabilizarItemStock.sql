--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.133 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.253 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ContabilizarItemStock]
@sti_idKey INT
AS
BEGIN
	
	DECLARE @cantidadPreOrigen INT;
	DECLARE @cantidadPreDestino INT;
	DECLARE @cantidadPreTecnico INT;

	DECLARE @idKeyTotalOrigen INT;
	DECLARE @idKeyTotalDestino INT;
	DECLARE @idKeyTotalTecnico INT;

	DECLARE @IdDepositoOrigen INT;
	DECLARE @IdDepositoDestino INT;	
	DECLARE @IdTecnico INT;

	DECLARE @idProducto INT;
	DECLARE @cantidadPost INT;
	DECLARE @tipoMovimiento NVARCHAR(2);
	DECLARE @cantidad INT;
	DECLARE @cantidadPre INT;

	SET @cantidad = 0;

	/* traigo el item y su cabecera */
	SELECT @IdDepositoOrigen = stc_iddepositoorigen
				,@IdDepositoDestino = stc_iddepositodestino
				,@idProducto = sti_idproducto
				,@cantidad = sti_cant
				,@tipoMovimiento = stc_tipomov
				--,@IdTecnico = stc_itecnico
		FROM _Datos..m_stock_item it
		INNER JOIN _Datos..m_stock_cabecera ca ON ca.stc_idKey = it.sti_idcabecera
	 WHERE sti_idKey = @sti_idKey


	  PRINT 'TIPO MOVIMIENTO: '+ @tipoMovimiento
		PRINT 'CANTIDAD: '+ CAST(@cantidad AS NVARCHAR(10))

		/* SI EL TIPO DE MOVIMIENTO ES INGRESO IGNORO EL ORIGEN */
		IF @tipoMovimiento != 'IN' 
			BEGIN
				/* TRAIGO SI TIENE TOTALES ORIGEN	*/
				SELECT @cantidadPreOrigen = stt_cant ,
							 @idKeyTotalOrigen = stt_idKey
					FROM _datos..m_stock_totales 
					WHERE stt_iddeposito = @IdDepositoOrigen
						AND stt_idProducto = @idProducto

				/* Verifico si hay registro sino lo creo ORIGEN */
				IF @idKeyTotalOrigen != 0 
					BEGIN
							SET @cantidadPost = @cantidadPreOrigen - @cantidad
							
							/* si la cantidad es negativa tiro error y no hago nada */
							IF @cantidadPost >= 0 
								BEGIN								
									UPDATE _datos..m_stock_totales
										 SET stt_cant = @cantidadPost,
												 stt_fecha = GETDATE()
									 WHERE stt_idKey = @idKeyTotalOrigen
								END
							ELSE
								BEGIN
									RAISERROR ('No hay stock en ORIGEN',10,1)								
								END

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
								@cantidad,
								GETDATE()				
							)
					END

			END
		

		/* SI EL TIPO DE MOVIMIENTO ES EGRESO IGNORO EL DESTINO */
		IF @tipoMovimiento != 'EG' 
			BEGIN


					/* TRAIGO SI TIENE TOTALES DESTINO	*/
					SELECT @cantidadPreDestino = stt_cant ,
								 @idKeyTotalDestino = stt_idKey
						FROM _datos..m_stock_totales 
						WHERE stt_iddeposito = @IdDepositoDestino
							AND stt_idProducto = @idProducto

					/* Verifico si hay registro sino lo creo DESTINO */
					IF @idKeyTotalDestino != 0
						BEGIN
								
								SET @cantidadPost = @cantidadPreDestino + @cantidad

								/* si la cantidad es negativa tiro error y no hago nada */
								IF @cantidadPost >= 0 
									BEGIN								
										UPDATE _datos..m_stock_totales
											 SET stt_cant = @cantidadPost,
													 stt_fecha = GETDATE()
										 WHERE stt_idKey = @idKeyTotalDestino
									END
								ELSE
									BEGIN
										RAISERROR ('No hay stock en DESTINO',10,1)								
									END		
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
		END
		
		/* SI EL MOVIMIENTO TIENE IDTECNICO */
		/*IF @IdTecnico > 0 
			BEGIN


					-- TRAIGO SI TIENE TOTALES DESTINO	
					SELECT @cantidadPreDestino = stt_cant ,
								 @idKeyTotalDestino = stt_idKey
						FROM _datos..m_stock_totales 
						WHERE stt_idtecnico = @IdTecnico
							AND stt_idProducto = @idProducto

					-- Verifico si hay registro sino lo creo DESTINO 
					IF @idKeyTotalTecnico != 0
						BEGIN
								
								SET @cantidadPost = @cantidadPreDestino + @cantidad

								-- si la cantidad es negativa tiro error y no hago nada 
								IF @cantidadPost >= 0 
									BEGIN								
										UPDATE _datos..m_stock_totales
											 SET stt_cant = @cantidadPost,
													 stt_fecha = GETDATE()
										 WHERE stt_idKey = @idKeyTotalDestino
									END
								ELSE
									BEGIN
										RAISERROR ('No hay stock en DESTINO',10,1)								
									END		
						END	
					ELSE
						BEGIN
							-- nuevo registro de totales 
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
		END*/
	
	

END