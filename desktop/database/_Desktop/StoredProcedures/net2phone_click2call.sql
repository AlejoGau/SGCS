-- =============================================
-- Author:		Rodrigo Román
-- Create date: 03/06/2020
-- Description:	crea una nueva llamada net2phone
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[net2phone_click2call]
	-- Add the parameters for the stored procedure here
	@callid varchar(500),
	@reciid int,
	@response varchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @misc varchar(max)
	declare @filename varchar(max)

	-- busco la carpeta misc
	select @misc = par_cvalor from _tablas..t_parametros where par_ccodigo = 'SEARCHSOFTGUARDMISCFILE'
    
	-- armo filename
	select @filename = @misc + '\logger\'+@callid+'.mp3'

	insert into _datos..m_net2phone_call (n2p_callid, n2p_reciid, n2p_click2call_response, n2p_status, n2p_recording_filename) values (@callid,@reciid,@response,1,@filename)
END