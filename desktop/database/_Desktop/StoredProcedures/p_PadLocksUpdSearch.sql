CREATE OR ALTER PROCEDURE [dbo].[p_PadLocksUpdSearch]
										@Id Int=0,
										@pdl_cAuthorized NVarChar (255) = null,
										@pdl_cAutObservacion NVarChar (max) = null,
										@pdl_iStatus Int = 0
	
										 
							--WITH ENCRYPTION		
							
							AS
							
							update _Datos.dbo.p_PadLocks 
							set pdl_iStatus=@pdl_iStatus, pdl_cAuthorized=@pdl_cAuthorized,
								pdl_cAutObservacion=@pdl_cAutObservacion, pdl_tAutFechaHora = GETDATE()
								,pdl_tStatusExec = GETDATE()
							where pdl_idKey = @Id