-- =============================================
-- Author:		Román Rodrigo
-- Create date: 4/6/2018
-- Description:	Genera evento de restauracion de comunicación
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[IPRS_RestauraComunicacion]
	-- Add the parameters for the stored procedure here
	@rec_cdll varchar(50),
	@cue_iid int
AS
BEGIN

	SET NOCOUNT ON;
	-- Me fijo si es X28 (pedido por Pablo)
	PRINT '[IPRS_RestauraComunicacion] me fijo si es X28 '+@rec_cdll
	if @rec_cdll ='X28GprsPacketParser'
	BEGIN
		-- Genero evento
		PRINT '[IPRS_RestauraComunicacion] genero evento restauración _RC'
		declare @fecha datetime;
		select @fecha = getdate()
		EXECUTE _desktop..[AlarmaGenerar]
			@idCta = @cue_iid,
			@cDll = @rec_cdll,
			@cAlarma = '_RC'
	END
    
END