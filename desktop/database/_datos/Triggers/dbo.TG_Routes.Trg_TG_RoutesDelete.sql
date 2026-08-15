CREATE OR ALTER TRIGGER [dbo].[Trg_TG_RoutesDelete] ON [dbo].[TG_Routes] AFTER DELETE
AS 
BEGIN

    SET NOCOUNT ON;
Declare @iroute Int 
    
Select @iroute = Id From deleted

delete from _datos..tg_route_geofences where routeid = @iroute
delete from _datos..tg_route_programs where routeid = @iroute
END