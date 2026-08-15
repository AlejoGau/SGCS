-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2020/09/23
-- Description:	Impide crear ttl sin nombre de servicio
-- =============================================
CREATE OR ALTER TRIGGER tg_ttl_emptyservice
   ON  dbo.timetolive
   instead of insert
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @service varchar(512) = ''

	select @service = service from inserted

	if @service != ''
	begin 
		insert into _datos..TimeToLive (Name,Token,DateCreated,Service) select Name,Token,DateCreated,Service from inserted
	end

END