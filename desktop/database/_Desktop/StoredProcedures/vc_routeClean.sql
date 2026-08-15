-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[vc_routeClean]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    delete from _datos..vc_route_checkpoints where routeid not in (select id from _datos..vc_routes)
	delete from _datos..vc_route_programs where routeid not in (select id from _datos..vc_routes)
END