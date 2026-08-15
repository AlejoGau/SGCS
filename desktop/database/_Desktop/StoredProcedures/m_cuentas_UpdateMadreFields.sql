-- =============================================
-- Author:		Rodrigo Román
-- Create date: 06/03/2020
-- Description:	Inserta valores de la cuenta madre dentro de las particione para análisis de rangos
-- =============================================
CREATE OR ALTER PROCEDURE m_cuentas_UpdateMadreFields 
	-- Add the parameters for the stored procedure here
	@cue_iid int = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	if @cue_iid > 0
	BEGIN
		UPDATE
			c
		SET
			c.cue_cMadreLinea = cm.cue_clinea,
			c.cue_cMadreCuenta = cm.cue_ncuenta
		FROM
			_datos..m_cuentas AS c
			INNER JOIN _datos..m_cuentas AS cm
				ON c.cue_nparticion = cm.cue_iid
		WHERE
			(c.cue_cMadreLinea is null or c.cue_cMadreLinea = '' ) and c.cue_nparticion > 0 
			and @cue_iid = c.cue_iid
	END
	ELSE
	BEGIN
		UPDATE
			c
		SET
			c.cue_cMadreLinea = cm.cue_clinea,
			c.cue_cMadreCuenta = cm.cue_ncuenta
		FROM
			_datos..m_cuentas AS c
			INNER JOIN _datos..m_cuentas AS cm
				ON c.cue_nparticion = cm.cue_iid
		WHERE
			(c.cue_cMadreLinea is null or c.cue_cMadreLinea = '' ) and c.cue_nparticion > 0 
	END
END