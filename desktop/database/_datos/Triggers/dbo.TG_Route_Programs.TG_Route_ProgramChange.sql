CREATE OR ALTER TRIGGER [dbo].[TG_Route_ProgramChange] 
   ON  [dbo].[TG_Route_Programs] 
   AFTER INSERT,DELETE,UPDATE
AS 
BEGIN
SET NOCOUNT ON;
            
--si el cambio es de hoy, regenero
declare @date datetime = GETDATE()
declare @currentweekday int = datepart(dw,@date)
declare @currentday int = datepart(d,@date)
            
if exists (SELECT * from inserted rp 
                        where 1=1
                        --and rp.datestart <= @date -- el programa tiene que haber empezado
                        and (rp.programtype = 1 -- todos los días
                                    OR (
                                                rp.programtype = 2 -- de lunes a viernes
                                                AND (@currentweekday BETWEEN 2 and 6)
                                    )
                                    OR (
                                                rp.programtype = 3 -- un dia de la semana
                                                AND (@currentweekday = rp.[dayofweek]+1)
                                    )
                                    OR (
                                                rp.programtype = 4 -- un dia del mes
                                                AND (@currentday = rp.[dayofmonth]+1)
                                    )
                        ))
            BEGIN
                        -- hay programas para hoy, reprogramo
                        EXEC _desktop..[SchedulerCreateTGGeofenceProgram] @days = 0
            END
 
END