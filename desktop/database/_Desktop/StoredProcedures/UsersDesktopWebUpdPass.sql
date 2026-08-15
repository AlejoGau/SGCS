CREATE OR ALTER PROCEDURE [dbo].[UsersDesktopWebUpdPass]
        @Id Int=0,
        @udw_usuario nvarchar(100) = '',
        @udw_clave NVARCHAR(100) = ''
    --WITH ENCRYPTION            
    AS
        set noCount on
        if @Id = 0
        BEGIN
            select @Id = udw_idkey from _sistema..UsersDesktopWeb where udw_usuario = @udw_usuario
        END
        update _sistema..UsersDesktopWeb set 
        [udw_clave] = @udw_clave                                
        where [udw_idKey] = @Id