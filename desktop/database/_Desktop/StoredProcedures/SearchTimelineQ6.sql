--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.550 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.607 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ6](
@IdEvento NVARCHAR(128), 
@page int = 0, 
@start int = 0, 
@limit int = 20,
@table varchar(255) = 'p_recepcion'
)

as 
begin
set nocount on
--Las observacioens del operador salen de
--Lo llamamos Q6

DECLARE @Sql VARCHAR(MAX)
SET @Sql = 'Select rec_cObservaciones As cObs 
	From _Datos..'+@table+'
	Where rec_iid='+convert(varchar(20),@IdEvento)

exec (@Sql)

end