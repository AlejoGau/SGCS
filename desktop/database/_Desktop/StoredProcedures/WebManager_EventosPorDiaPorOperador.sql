CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosPorDiaPorOperador]
AS
					SET NOCOUNT ON

					Select Max(ope_cnombre) As cDesc, Count(*) As nCant
	                                            From [_Datos].[dbo].p_recepcion With (NOLOCK)
	                                                 Inner Join _Sistema.dbo.s_operadores On ope_iid = rec_ioperador 
	                                           Where rec_ioperador>0 
                                                     and ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112) 
	                                                 And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) )
	                                        Group By rec_ioperador