CREATE OR ALTER TRIGGER [dbo].[Trg_vc_RoutesDelete] ON [dbo].[VC_Routes] AFTER DELETE AS
BEGIN
	SET NOCOUNT ON;
	Declare @iroute Int 
    
	Select @iroute = Id From deleted

	delete from _datos..vc_route_checkpoints where routeid = @iroute
	delete from _datos..vc_route_programs where routeid = @iroute
END