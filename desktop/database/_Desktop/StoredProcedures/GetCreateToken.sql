CREATE OR ALTER PROCEDURE [dbo].[GetCreateToken]
 @userId varchar(200),
 @clientId varchar(200) = N'191B8347-F356-48DE-8EC1-B996112E80C1',
 @delete int = 0
   
AS  
 SET NOCOUNT ON   

 -- me fijo si hay un token para ese usuario
 -- MS-117 elimino el token del usuario existente
 declare @tcount int = 0;

 if @delete = 1
 BEGIN
	delete from token where UserId = @userId-- and (@userId is not null AND @userId!='')
 END
 
 select @tcount = count(*) from token where UserId = @userId and (@userId is not null AND @userId!='')
 --print @tcount

 if (@tcount = 0)
 BEGIN
	-- no hay token, lo creo
	-- obtengo el nombre del usuario
	 --declare @useraccount varchar(200)='';
	 --select @useraccount from _sistema..usersdesktopweb  where udw_idkey = @userId
	 if (@userId is not null AND @userId!='') --agrego checkeo de usuario vacio o nulo por problema de token en smartpanics sin user awcc
	 begin
	  insert into token VALUES (@clientId, @userId, NEWID(),NEWID(), null) 
	  print '[GetCreateToken] se creo el token'
	 end
 END

if (@userId is not null AND @userId!='') --agrego checkeo de usuario vacio o nulo por problema de token en smartpanics sin user awcc
begin
	select AccessToken from token where UserId = @userId 
end

RETURN