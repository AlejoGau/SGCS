-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/7/2018
-- Description:	Valida que no se pueda cambiar de estado una asignación cancelada
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[trg_amv_updatecancel]
   ON  [dbo].[m_asignacion_movil]
   INSTEAD OF UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    IF EXISTS (
      SELECT *
      FROM deleted
      WHERE amv_estado = 2
   )
   BEGIN
      RAISERROR ('Asignación cancelada' ,10,1)
      ROLLBACK TRANSACTION
   END 
   ELSE    
      BEGIN
         update amv set 
			amv.[amv_objecttypeid] = i.[amv_objecttypeid]
			,amv.[amv_objectid] = i.[amv_objectid]
			,amv.[amv_rec_iid] = i.[amv_rec_iid]
			,amv.[amv_estado] = i.[amv_estado]
			,amv.[amv_prioridad] = i.[amv_prioridad]
			from _datos..m_asignacion_movil as amv
			inner join inserted as i on amv.amv_idkey = i.amv_idkey
   END    

END