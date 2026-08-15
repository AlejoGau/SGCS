-- =============================================
-- Author:		Rodrigo Román
-- Create date: 30/11/2018
-- Description:	impide repetición de sims.
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_dispmovil_simunique]
   ON  [dbo].[DispositivoMovil]
   AFTER INSERT,UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- verifico que el sim1 no este repetido
	declare @sim1 nvarchar(256)
	declare @sim2 nvarchar(256)

	if (@sim1 is not null and @sim1!='' and exists (select * from _datos..DispositivoMovil where sim1 = @sim1 or sim2 = @sim1))
	BEGIN
		raiserror('No se puede duplicar el SIM1',16,1)
	END
	if (@sim2 is not null and @sim2!='' and exists (select * from _datos..DispositivoMovil where sim1 = @sim2 or sim2 = @sim2))
	BEGIN
		raiserror('No se puede duplicar el SIM2',16,1)
	END

END