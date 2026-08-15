CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosAutoprocesados]
AS
					SET NOCOUNT ON

					Select count(rec_nestado) as conta,
                                                     (Case When rec_nEstado=5 Then 'No emergencia '
                                                           When rec_nEstado=6 Then 'Modo Prueba'
                                                           When rec_nEstado=7 Then 'Cuenta Inhabilitada '
                                                       End ) As Situacion
                                                FROM [_Datos].[dbo].p_recepcion 
                                               Where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) 
                                                     And DATEPART(hh,CONVERT(CHAR,rec_tfechahora,14))<= DATEPART(hh,CONVERT(CHAR,GETDATE(),14)) 
                                                     and (rec_nEstado>4 and rec_nEstado<8) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            group by rec_nestado