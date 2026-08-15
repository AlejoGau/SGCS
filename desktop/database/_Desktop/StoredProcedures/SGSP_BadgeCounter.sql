CREATE OR ALTER PROCEDURE [dbo].[SGSP_BadgeCounter]
   @spid Int = 0,
   @badge Int OUTPUT
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta para obtener los "mensajes" sin leer para mostrar en el badge de SmartPanics
--Autor :Pablo O. Canónico
--Fecha :28/01/2026
--05/02/2026 Pablo . le agregue Select con pending para el Rest/Search
Set NoCount On

Select @badge = Count(*)
From (
	Select [chs_status] AS Status
		From [_Datos].[dbo].[p_ChatSession] 
	Inner Join [_Datos].[dbo].[p_ChatMembers] cm On [chs_idKey] = cm.[chm_chatid]
	Where cm.[chm_objectType] = 3067 
		And cm.[chm_objectId] = @spid
		And chs_status = 1
		
	Union All
		
	Select [enr_estado] As Status
		From [_Datos].[dbo].[p_encuesta_respondidas] enr
	WHERE enr.enr_eprspidkey = @spid
		And enr_estado = 0
	
	Union All

	Select [Status]
		From [_Datos].[dbo].[Message] 
	Where [ToId] = @spid
		And [Status]=0
	) As BadgeCounter

Select @badge As Pending