-- =============================================
-- Author:		Rodrigo Roman
-- Create date: 2020-11-30
-- Description:	Genera eventos contra el insert de IO de control de accesos
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[CAIO_genera_evento] 
   ON  [dbo].[p_controlAcceso_IO] 
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @calarma char(3);-- _IN, _SA
	declare @cue_iid int;
	declare @usu_iid int;
	declare @cac_cobservacion [varchar](max) = '';

	select top 1 @cue_iid = usu_iidcuenta, @usu_iid = usu_icodigo 
		,@cac_cobservacion = cac_cobservacion
		,@calarma = case cac_tipoacceso
			when 1 then '_IN'
			when 0 then '_SA'
			END
		from inserted 
		inner join _datos..m_usuarios on usu_idKey = cac_idautorizado

	-- me fijo si es un ingreso o egreso
	
	-- generi el evento
	EXECUTE _Desktop.[dbo].[AlarmaGenerar] 
	   @idCta = @cue_iid
	  ,@cAlarma = @calarma
	  ,@idUsuario = @usu_iid
	  ,@cObservaciones = @cac_cobservacion

END