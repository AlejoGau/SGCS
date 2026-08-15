CREATE OR ALTER PROCEDURE [dbo].[SearchUserDesktopWebByUsername](@usuario varchar(128))
as 
begin
set nocount on
select * from _Sistema.dbo.[UsersDesktopWeb]
where udw_usuario = @usuario
end