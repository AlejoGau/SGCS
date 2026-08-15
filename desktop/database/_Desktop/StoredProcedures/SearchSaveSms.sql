CREATE OR ALTER PROCEDURE [dbo].[SearchSaveSms]
	@iCuenta INT = 0,
	@iModemSMS INT = 0,
	@cMessageMerge VARCHAR(2048) ,
	@cDestinoSMS VARCHAR(2048),
	@idCmd Int = 0,
	@sim_idkey Int = 0
AS
BEGIN
  DECLARE @sim_ClaveMaster AS Varchar(256)
  if @sim_idkey>0
	begin
		select @cDestinoSMS= sim_codigo, @sim_ClaveMaster = sim_ClaveMaster from _Datos..m_simcard where sim_idkey = @sim_idkey
		SET @cMessageMerge = replace(@cMessageMerge,'<<sim_ClaveMaster>>',@sim_ClaveMaster)
		end

	
  EXEC _datos..SGSP_SaveSMSQueue @iCuenta,@iModemSMS,@cMessageMerge,@cDestinoSMS,@idCmd
	select @iCuenta iCuenta,@iModemSMS iModemSMS,@cMessageMerge cMessageMerge,@cDestinoSMS cDestinoSMS,@idCmd idCmd
END