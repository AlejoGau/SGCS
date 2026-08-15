-- DK-1498: Migración de base de datos
-- Agrega el campo pro_cantidad_auto a la tabla Product en _Datos
-- Ejecutar una sola vez

USE _Datos;
GO

-- Verificar que no exista el campo antes de agregarlo
IF NOT EXISTS (
    SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Product' AND COLUMN_NAME = 'pro_cantidad_auto'
)
BEGIN
    ALTER TABLE dbo.Product 
    ADD pro_cantidad_auto INT NOT NULL DEFAULT 0;
    
    PRINT 'Campo pro_cantidad_auto agregado correctamente a Product';
END
ELSE
BEGIN
    PRINT 'El campo pro_cantidad_auto ya existe en Product, no se realizaron cambios';
END
GO
