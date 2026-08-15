CREATE OR ALTER PROCEDURE [dbo].[Tables_LineasAll]
AS
	SET NOCOUNT ON
	
	SELECT lin_ccodigo, lin_ccodigo + ' - ' + lin_crazonsocial AS lin_crazonsocial,lin_ccalle,lin_inumero,lin_npiso,lin_cdepartamento,lin_clocalidad,lin_cprovincia,lin_cestado,lin_ccodigopostal,lin_ctelfono,lin_cfax,lin_cimagen,lin_cusuario,lin_cclave,lin_nacceso,lin_cmail FROM _Tablas.dbo.t_lineas