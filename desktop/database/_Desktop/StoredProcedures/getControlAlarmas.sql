--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.087 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[getControlAlarmas]
	@dia NVARCHAR(30),
	@hora NVARCHAR(5),
	@rango int,
	@diasemana int
AS

declare @cantidad int

SELECT @cantidad = count(*) FROM [_Tablas].[dbo].[t_eventos_feriados]
WHERE cast(@dia  as datetime) <= eve_dfechahasta and cast(@dia  as datetime) >= eve_dfechadesdes

if @cantidad > 0
begin

Select cod_cuenta, cod_evento, cod_zona, cod_tipoalarma, desde, hasta, tolerancia 
from s_eventos e inner join s_eventos_repeticion er on e.id_evento = er.id_evento 
where cast(@hora as datetime) <= 
cast(CONVERT(NVARCHAR(20), dateadd(n, tolerancia + @rango, hasta), 108)as datetime)
and cast(@hora as datetime) > cast(CONVERT(NVARCHAR(20), dateadd(n, tolerancia, hasta), 108) as datetime) and dia_semana = @diaSemana  
AND [controla_excepciones] = 1
end

else
begin

Select cod_cuenta, cod_evento, cod_zona, cod_tipoalarma, desde, hasta, tolerancia 
from s_eventos e inner join s_eventos_repeticion er on e.id_evento = er.id_evento 
where cast(@hora as datetime) <= 
cast(CONVERT(NVARCHAR(20), dateadd(n, tolerancia + @rango, hasta), 108) as datetime)  
and cast(@hora  as datetime) > cast(CONVERT(NVARCHAR(20), dateadd(n, tolerancia, hasta), 108) as datetime) and dia_semana = @diaSemana  

end