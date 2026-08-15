CREATE OR ALTER PROCEDURE [dbo].[AfipCaeSetComprobante]    
 @cbc_icodigo INT,  
 @cbc_ccae VARCHAR(20),  
 @cbc_cvtocae VARCHAR(10)  
AS  
 SET NOCOUNT ON  
  
 UPDATE [_Datos].[dbo].m_comprobantes_cab_fc SET cbc_cCAE = @cbc_ccae, cbc_cvtocae = @cbc_cvtocae WHERE cbc_icodigo_id = @cbc_icodigo