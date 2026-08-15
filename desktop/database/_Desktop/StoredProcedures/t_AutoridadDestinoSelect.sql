-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/1/2020
-- Description:	Sivve agrego busqueda de destino con la autoridad
-- =============================================
CREATE OR ALTER PROCEDURE t_AutoridadDestinoSelect 
	-- Add the parameters for the stored procedure here
	@tad_idKey int = 5
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select * from _tablas..t_AutoridadDestino
	inner join _tablas..t_autoridades on tad_idKey = aut_iDestino
	where tad_idKey = @tad_idKey
END