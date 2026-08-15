-- =============================================
-- Author:		Rodrigo Román
-- Create date: 6/12/2018
-- Description:	Envío de push para cambio de ip y puerto smartpanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartPanics_SendPushREMOTEDESKTOPURL]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
DECLARE  @ConfigIP varchar(255) = ( Select par_cvalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DESKTOPEXTERNALURL' )
declare  @date datetime = (select getdate())
insert into _datos..p_push_queue select
		'{ 
			"message":{
				"data": {
					"action": "UPDATE_IP_PORT",
					"content_available":"true",
					"ConfigIP": "'+@ConfigIP+'"
						},
				"token":"' + pushtoken + '"
				}
        }' as ppq_msg
		/*
		'{ "data": {
            "action": "UPDATE_IP_PORT",
            "ConfigIP": "'+@ConfigIP+'"
          },
          "notification": {
            "content_available":true
          },
          "to":"'+pushtoken+'"
        }' as ppq_msg
		*/
		,0 as estado,@date as ppq_fechacreacion,null as ppq_fechaenvio, null as ppq_idmesage
		,cuentaid as ppq_idcuenta  from _Datos..smartpanic where tipo = 'ANDROID' and pushtoken is not null
END