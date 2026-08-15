-- =============================================  
-- Author:  Rodrigo Román  
-- Create date: 2018/08/16  
-- Description: Devuelve los datos necesarios de facturas pendientes para el sistema AFIP   
-- =============================================  
CREATE OR ALTER PROCEDURE [dbo].[AfipCaePendingSearch]  
  
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
  
    -- Insert statements for procedure here  
 SELECT *
   FROM [_Datos].[dbo].[MG_Afip_Cae]  
   inner join _datos..m_comprobantes_cab_fc  on mac_idcbte = cbc_icodigo_id  
   inner join _tablas..t_organizacion_fc  on cbc_iorganizacionfacturadora = org_icodigo_id  
   inner join _Datos..Organization o on Account = cbc_iCliente
   inner join _Tablas..t_comprobantes_fc on (cbt_ccodigo = cbc_ctipocbte and cbt_idOrganizacionFacturadora = org_icodigo_id)
   where mac_estado IS NULL  
END