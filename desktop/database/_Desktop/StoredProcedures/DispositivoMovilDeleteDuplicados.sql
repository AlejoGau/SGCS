-- =============================================
-- Author:		rodrigo roman
-- Create date: 17/10/2017
-- Description:	elimina registros duplicados de dispositivos moviles (trackguard)
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[DispositivoMovilDeleteDuplicados]
	-- Add the parameters for the stored procedure here
	@nodelete int = 1
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    if (@nodelete = 1)
	begin 
		print 'solo muestro duplicados'
		SELECT OwnerId,count (*)
		  FROM [_Datos]..[DispositivoMovil]
		  group by OwnerId
			  having count (*)>1
	end
	else
	begin
		print 'elimino duplicados';
		WITH dm AS (
		  SELECT OwnerId,Id,
			 row_number() OVER(PARTITION BY OwnerId ORDER BY id desc) AS [rn]
		  FROM [_Datos]..[DispositivoMovil]
		)
		DELETE dm WHERE [rn] > 1
	end
END