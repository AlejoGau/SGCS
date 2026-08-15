CREATE OR ALTER PROCEDURE [dbo].[SearchOperadorByLogin]
(@id int, @nombre varchar(256))
as 
begin
set nocount on 
select * from _sistema..s_operadores
where ope_iid = @id and ope_clogin = @nombre
end