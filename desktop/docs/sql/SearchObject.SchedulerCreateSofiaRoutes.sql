-- Registra el SearchObject para exponer el scheduler de rutas SofIA vía /rest/search/SchedulerCreateSofiaRoutes.
-- Notas:
--   * Name define el segmento de la URL (SchedulerCreateSofiaRoutes).
--   * ObjectTypeId puede mantenerse en 0 cuando no existe un modelo específico asociado.
--   * Content apunta al stored procedure que se ejecutará.
--   * SearchType 'Sql' indica que se invoca un stored procedure/consulta SQL.
--   * TokenProperty y TotalRowsParameterName permanecen en NULL si el SP no utiliza token ni devuelve total explícito.

USE [_Desktop];
GO

INSERT INTO [dbo].[SearchObject] (
       [Name],
       [ObjectTypeId],
       [Content],
       [SearchType],
       [IdProperty],
       [TokenProperty],
       [TotalRowsParameterName]
) VALUES (
       'SchedulerCreateSofiaRoutes',
       0,
       'SchedulerCreateSofiaRoutes',
       'Sql',
       NULL,
       NULL,
       NULL
);
GO
