--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.830 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.980 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchAtencionEventoEsperaByEventos]
(
@rec_iidArray NVARCHAR(max) = '',
@rec_iMinutosEspera int,
@rec_cObservaciones NVARCHAR(max),
@rec_idResolucion NVARCHAR(3),
@rec_cCategorizacion NVARCHAR(3),
@token NVARCHAR(256),
@_dc NVARCHAR(256) = '',                
@totalrows INT = 1 OUTPUT  

)
as
begin
set nocount on

declare @cTerminal char(3) = '_WW'

if(@token is null or @token = '')
begin
	select 1 Error, 'El token no es valido' Message
	return;	
end

declare @udw_usuario NVARCHAR(128)
select @udw_usuario = userid from _desktop..Token where AccessToken = @token
if(@udw_usuario is null or @udw_usuario = '')
begin
	select 2 Error, 'No se puede obtener el usuario del token' Message
	return;	
end

--declare @t table (rownum int primary key identity(1,1), rec_iid int)

CREATE TABLE #Temp (rownum int primary key identity(1,1), rec_iid int)         
 
IF @rec_iidArray != ''
BEGIN
	DECLARE @Sql NVARCHAR(MAX)
	
	SET @Sql = 'insert into #Temp (rec_iid)
	select r.rec_iid from _datos..p_recepcion r where rec_iid IN ('+@rec_iidArray+')
	and rec_nestado in (0,1,4,9)'

	exec (@Sql);

	declare @rec_iid int = 0

	declare @rowcount int = 0
	declare @rowcurrent int = 0
	select @rowcount = COUNT(*) from #Temp
	while(@rowcurrent < @rowcount)
	begin
		set @rowcurrent = @rowcurrent + 1
		select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent
		
		exec SearchAtencionEventoEspera  @rec_iid, @rec_iMinutosEspera, @rec_cobservaciones, @rec_idResolucion,@rec_cCategorizacion, @token 
	end

	select 0 Error, 'OK' Message

END
ELSE
BEGIN
	select 1 Error, 'No hay eventos separados por coma' Message
END
end