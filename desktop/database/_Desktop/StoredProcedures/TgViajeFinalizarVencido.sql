-- =============================================
-- Author:		Rodrigo Román
-- Create date: 16/1/2020
-- Description:	Termina viajes de TG comenzados que superaron en tiempo la tolerancia
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[TgViajeFinalizarVencido]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @VIAJEHORATOLERANCIA int = 15
    -- Busco los viajes vencidos
	declare @tgv_idkey int 
	declare @tgv_cueiid int 
	declare @fechahora datetime

	select @fechahora = getdate()
	DECLARE gps_viaje_cursor CURSOR READ_ONLY FORWARD_ONLY FOR 
	select 
		tgv_idkey
		, tgv_cueiid
	from _datos..m_tgviaje
	where tgv_estado = 1 -- tiene que estar comenzado
	and DATEADD (minute , @VIAJEHORATOLERANCIA , tgv_fecha_prg_fin  ) < @fechahora -- tiene que estar vencido

	OPEN gps_viaje_cursor  
	FETCH NEXT FROM gps_viaje_cursor INTO @tgv_idkey,@tgv_cueiid

	WHILE @@FETCH_STATUS = 0  
	BEGIN 
		print '[GeoFenceExecute] grabo fecha de fin'
		update _datos..m_tgviaje set tgv_estado=4, tgv_fechafin = @fechahora where tgv_idkey = @tgv_idkey

		print '[GeoFenceExecute] creo evento fin'
		exec [_desktop]..[AlarmaGenerar] @idCta = @tgv_cueiid
				,@cAlarma = '_VF'
				,@rawFechaHora =@fechahora
		FETCH NEXT FROM gps_viaje_cursor INTO @tgv_idkey,@tgv_cueiid
	END  
	CLOSE gps_viaje_cursor  
	DEALLOCATE gps_viaje_cursor 
END