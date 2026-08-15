CREATE OR ALTER PROCEDURE [dbo].[p_PadLocksUpdResponseStatusSearch]
										@Id Int=0,
										@pdl_cResponse  NVarChar (max) = null,
										@pdl_iStatus Int = 0
	
										 
							--WITH ENCRYPTION		
							
							AS
							
							update _Datos.dbo.p_PadLocks 
							set pdl_iStatus=@pdl_iStatus, pdl_cResponse=@pdl_cResponse
								,pdl_tStatusExec = GETDATE()
							where pdl_idKey = @Id