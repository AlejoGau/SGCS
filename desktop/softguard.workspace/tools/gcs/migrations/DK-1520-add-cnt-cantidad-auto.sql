-- DK-1520: Migración de base de datos
-- Agrega el campo cnt_cantidad_auto a la tabla crm_contrato en _Datos
-- 0 = manual (default)
-- 1 = por cuentas activas del cliente

USE _Datos;
GO

IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'crm_contrato'
      AND COLUMN_NAME = 'cnt_cantidad_auto'
)
BEGIN
    ALTER TABLE dbo.crm_contrato
    ADD cnt_cantidad_auto INT NOT NULL DEFAULT 0;

    PRINT 'Campo cnt_cantidad_auto agregado correctamente a crm_contrato';
END
ELSE
BEGIN
    PRINT 'El campo cnt_cantidad_auto ya existe en crm_contrato, no se realizaron cambios';
END
GO
