CREATE OR ALTER PROCEDURE [dbo].[AWCC_CalculoDeudaInicialCliente]
	@cue_iid INT,
	@fechadesde DATETIME,
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT     
AS  
	SET NOCOUNT ON 
	
	DECLARE @IdCliente INT
	SELECT @IdCliente = rel_icliente FROM _Datos.dbo.m_relacion_cliente_cuentas_fc WHERE rel_icuenta=@Cue_IId

	EXEC _Datos.dbo.CalculoDeudaCliente @IdCliente, @fechadesde