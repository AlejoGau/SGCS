CREATE OR ALTER PROCEDURE [dbo].[SP_BorraTelefonosPlanilla] @nId int AS 
SET NOCOUNT ON
BEGIN TRANSACTION
  DELETE m_planillas WHERE pla_iid = @nId
  IF @@Error <> 0
     ROLLBACK TRANSACTION
  Else  
  Begin
       DELETE m_telefonos_planilla WHERE tel_iidpla = @nId
       IF @@ERROR <> 0
          ROLLBACK TRANSACTION
       ELSE
          COMMIT TRANSACTION
  End