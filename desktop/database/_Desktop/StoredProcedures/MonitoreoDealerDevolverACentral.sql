-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MonitoreoDealerDevolverACentral] 
AS
BEGIN

	SET NOCOUNT ON;

	SET DATEFIRST 7;
	Declare @mydate datetime = getdate()
	Declare @mytime varchar(5) = convert(varchar(5), @mydate, 108)
	Declare @dow int = datepart(weekday,@mydate)

	-- devuelvo a la central todos los eventos que no tienen una organizacion con atencion activa.
	update _datos..eventospendientes set _idorganizacion = 0
		where _idorganizacion > 0
		-- me fijo que la cuenta no este siendo atendida en este momento
		and rec_iidcuenta not in(
			SELECT subre.rec_iidcuenta
				FROM _datos..EventosPendientes subre  WITH (NOLOCK)
				WHERE subre.rec_nestado in (1,2,4,9)
					AND rec_ioperador != 0
		) 
		-- me fijo si la organizacion tiene un horario activo
		and _idorganizacion not in (select tmd_iorganizacion from _tablas..t_monitoreo_dealer  WITH (NOLOCK) where 
			tmd_clinea = cue_clinea
			and tmd_diasemana = @dow
			and @mytime between tmd_horadesde and tmd_horahasta
			and tmd_estado = 1)
END