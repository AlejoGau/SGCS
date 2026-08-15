CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosPendientesPorPrioridad]
AS
					SET NOCOUNT ON

					Select top 1000  rec_tfechahora, cast(cod_nprioridad as int) As nPrioridad
	                                            FROM _Datos.dbo.p_recepcion With (NOLOCK)
	                                                 Left Outer Join _Datos.dbo.m_cuentas ON rec_iidCuenta=cue_iid
	                                                 Left Outer Join _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo
	                                                 Left Outer Join _sistema.dbo.s_operadores ON rec_ioperador= ope_iid
	                                                 Left Outer Join _Datos.dbo.m_usuarios On rec_iidcuenta = usu_iidcuenta AND rec_iusuario= usu_icodigo And usu_iCodigo<>0
	                                           WHERE (rec_nestado = 0 or rec_nestado=1)
	                                                 and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
	                                        ORDER BY rec_tfechaHora DESC