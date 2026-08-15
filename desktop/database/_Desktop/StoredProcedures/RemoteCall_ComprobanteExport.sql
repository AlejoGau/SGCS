-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 27/2/2918
-- Description:	Inserta el llamado en remotecall para imprimir una factura
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[RemoteCall_ComprobanteExport]
	-- Add the parameters for the stored procedure here
	@idComprobante int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO _datos..[RemoteCallQueue]
           ([rcq_estado]
           ,[rcq_tipo]
           ,[rcq_url]
           ,[rcq_result]
           ,[rcq_fechaprograma]
           ,[rcq_fechaalta]
           ,[rcq_fechamodificacion]
           ,[rcq_config])
     VALUES
           (0
           ,'EXE'
           ,'C:\CloudSecuritySuite\SgComprobanteViewer\SgComprobanteExport.exe'
           ,''
           ,null
           ,getdate()
           ,null
           ,@idComprobante)

END


/*
insert into [_Datos].[dbo].[RemoteCallQueue] (
      [rcq_estado]
      ,[rcq_tipo]
      ,[rcq_url]
      ,[rcq_config])
	  select
	0,
	'EXE',
	'C:\CloudSecuritySuite\SgComprobanteViewer\SgComprobanteExport.exe',
	cbc_icodigo_id
	from _datos..[m_comprobantes_cab_fc]
	*/