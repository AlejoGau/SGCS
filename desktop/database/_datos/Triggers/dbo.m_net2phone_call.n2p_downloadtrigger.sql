-- =============================================
-- Author:		Rodrigo Román
-- Create date: 04/05/2020
-- Description:	genera [p_grabacion_audio] luego de descargar el archivo con exito
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[n2p_downloadtrigger]
   ON  [_Datos].[dbo].[m_net2phone_call] 
   AFTER UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @n2p_status int

	select @n2p_status = n2p_status from inserted

	if @n2p_status = 4
	BEGIN 
		insert into _Datos..p_grabacion_audio ([gra_iidcuenta]
			  ,[gra_iidrecepcion]
			  ,[gra_dfechahora]
			  ,[gra_carchivo]
			  ,[gra_nduracion]
			  ,[gra_ioperador]
			  ,[gra_cTerminal]
			  )
			  select rec_iidcuenta, rec_iid, n2p_dcreate, n2p_callid, isnull(Datediff(s, n2p_dcreate,n2p_dhang),0), rec_ioperador, rec_cTerminal from inserted
			  inner join _datos..p_recepcion with (nolock) on rec_iid = n2p_reciid
	END

END