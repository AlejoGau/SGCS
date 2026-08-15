--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.437 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.513 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchReasignarEventosAUsuario]
@idOperadorFrom int,
@idOperadorTo int
AS
BEGIN
	declare @sqlpage NVARCHAR(MAX);

	set @sqlpage = 'UPDATE _datos..p_recepcion 
	SET rec_ioperador = '+CAST(@idOperadorTo as VARCHAR)+ '
	WHERE rec_nestado IN (1,2,9) AND rec_ioperador = '+CAST(@idOperadorFrom AS VARCHAR);

	EXEC(@sqlpage);
	select * from _datos..p_recepcion where rec_ioperador = CONVERT(INT,@idOperadorTo)  and rec_nestado IN (1,2,9)
END