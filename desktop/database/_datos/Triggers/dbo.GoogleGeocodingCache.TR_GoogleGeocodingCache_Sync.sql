-- 2. Crear el Trigger para mantener la tabla espejo actualizada automáticamente
CREATE OR ALTER TRIGGER [dbo].[TR_GoogleGeocodingCache_Sync]
ON [dbo].[GoogleGeocodingCache]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Insertamos en la tabla pequeña solo si la conversión a FLOAT es válida
    INSERT INTO [dbo].[GoogleGeocodingCache_Spatial] (IdCache, LatFloat, LngFloat)
    SELECT 
        Id, 
        TRY_CAST([Lat] AS FLOAT), 
        TRY_CAST([Lng] AS FLOAT)
    FROM inserted
    WHERE TRY_CAST([Lat] AS FLOAT) IS NOT NULL 
      AND TRY_CAST([Lng] AS FLOAT) IS NOT NULL;
END