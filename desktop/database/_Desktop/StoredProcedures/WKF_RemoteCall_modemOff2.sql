-- =============================================
-- Author:		Rodrigo Román	
-- Create date: 21/06/2017
-- Description:	Inserta un llamado para apagar el modem
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[WKF_RemoteCall_modemOff2]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	declare @DESKTOPEXTERNALURL varchar(250);
	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
	INSERT INTO _datos..[RemoteCallQueue]
           ([rcq_estado]
           ,[rcq_tipo]
           ,[rcq_url])
     VALUES
           (0
           ,'HTTPGET'
           ,@DESKTOPEXTERNALURL+'/handler/KMtronicHandlerOff2')
END