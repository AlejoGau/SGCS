-- =============================================
-- Author:		Rodrigo Román
-- Create date: 3/5/2017
-- Description:	Funcion para alarmagenerar pasada por pablo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[actualizoP_Timer]
	@iID int
	,@tFechaHora datetime
	,@IdCuenta int
	,@Alarma NVARCHAR(10)
	,@iUsuario int
	,@Zona NVARCHAR(10)
	,@cOpnClo NVARCHAR(10)
AS
BEGIN
	SET NOCOUNT ON;

	declare @AlarmaAGenerar NVARCHAR(10) = 'NYR'	
	
	If @iID = 0
	BEGIN
		Print 'Ya no se usa mas p_Timer'
			/*
			INSERT INTO _datos..p_timer (tim_iidcuenta,tim_tfechahora,tim_calarma,tim_czona,tim_cusuario,tim_copnclo,tim_irecid,tim_cAlarmaAGenerar,tim_iIdEventoNR)
     			VALUES (@IdCuenta,@tFechaHora,@Alarma,@Zona,@iUsuario,@cOpnClo,0,@AlarmaAGenerar,0)
			*/
	END
	Else
		DELETE FROM _datos..p_timer	WHERE tim_iid = @iID

END