/*
DK-1498 / DK-1520 hotfix
Corrige persistencia de cnt_cantidad_auto en crm_contrato.

Contexto observado en GCS (2026-05-16):
- _Desktop: SPs ya tenían cnt_cantidad_auto.
- _Datos: SPs y trigger TG_INS_Contrato estaban desactualizados (sin cnt_cantidad_auto).

Este script deja ambos esquemas consistentes:
1) Recompone SPs en _Desktop (lectura/escritura sobre _Datos.dbo.crm_contrato)
2) Recompone SPs en _Datos
3) Recompone trigger TG_INS_Contrato en _Datos incluyendo cnt_cantidad_auto
*/

SET NOCOUNT ON;
GO

/* =========================================================
   A) _Desktop (SP runtime principal)
   ========================================================= */
USE [_Desktop];
GO

IF OBJECT_ID(N'dbo.crm_contratoSel', N'P') IS NOT NULL
    DROP PROCEDURE dbo.crm_contratoSel;
GO

CREATE PROCEDURE dbo.crm_contratoSel
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [cnt_iid] Id, '' Name,
           [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
           [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
           [cnt_dinamico], [cnt_cantidad_auto]
    FROM _Datos.dbo.crm_contrato
    WHERE [cnt_iid] = @Id;
END
GO

IF OBJECT_ID(N'dbo.crm_contratoIns', N'P') IS NOT NULL
    DROP PROCEDURE dbo.crm_contratoIns;
GO

CREATE PROCEDURE dbo.crm_contratoIns
    @Name VARCHAR(128),
    @cnt_org_fc INT = 0,
    @cnt_idcliente INT = 0,
    @cnt_fechaalta DATETIME = 0,
    @cnt_fechavto DATETIME = 0,
    @cnt_formapago INT = 0,
    @cnt_metadata VARCHAR(MAX) = '',
    @cnt_estado INT = 0,
    @cnt_tmp_id INT = 0,
    @cnt_dinamico INT = 0,
    @cnt_cantidad_auto INT = 0
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO _Datos.dbo.crm_contrato
    (
        [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
        [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
        [cnt_dinamico], [cnt_cantidad_auto]
    )
    VALUES
    (
        @cnt_org_fc, @cnt_idcliente, @cnt_fechaalta, @cnt_fechavto,
        @cnt_formapago, @cnt_metadata, @cnt_estado, @cnt_tmp_id,
        @cnt_dinamico, @cnt_cantidad_auto
    );

    EXEC dbo.crm_contratoSel @@IDENTITY;
END
GO

IF OBJECT_ID(N'dbo.crm_contratoUpd', N'P') IS NOT NULL
    DROP PROCEDURE dbo.crm_contratoUpd;
GO

CREATE PROCEDURE dbo.crm_contratoUpd
    @Id INT,
    @Name VARCHAR(128),
    @cnt_org_fc INT = 0,
    @cnt_idcliente INT = 0,
    @cnt_fechaalta DATETIME = 0,
    @cnt_fechavto DATETIME = 0,
    @cnt_formapago INT = 0,
    @cnt_metadata VARCHAR(MAX) = '',
    @cnt_estado INT = 0,
    @cnt_tmp_id INT = 0,
    @cnt_dinamico INT = 0,
    @cnt_cantidad_auto INT = 0
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE _Datos.dbo.crm_contrato
    SET [cnt_org_fc] = @cnt_org_fc,
        [cnt_idcliente] = @cnt_idcliente,
        [cnt_fechaalta] = @cnt_fechaalta,
        [cnt_fechavto] = @cnt_fechavto,
        [cnt_formapago] = @cnt_formapago,
        [cnt_metadata] = @cnt_metadata,
        [cnt_estado] = @cnt_estado,
        [cnt_tmp_id] = @cnt_tmp_id,
        [cnt_dinamico] = @cnt_dinamico,
        [cnt_cantidad_auto] = @cnt_cantidad_auto
    WHERE [cnt_iid] = @Id;

    EXEC dbo.crm_contratoSel @Id;
END
GO

/* =========================================================
   B) _Datos (tabla + trigger)
   ========================================================= */
USE [_Datos];
GO

IF COL_LENGTH('dbo.crm_contrato', 'cnt_cantidad_auto') IS NULL
BEGIN
    ALTER TABLE dbo.crm_contrato ADD cnt_cantidad_auto INT;
END
GO

IF OBJECT_ID(N'dbo.crm_contratoSel', N'P') IS NOT NULL
    DROP PROCEDURE dbo.crm_contratoSel;
GO

CREATE PROCEDURE dbo.crm_contratoSel
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [cnt_iid] Id, '' Name,
           [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
           [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
           [cnt_dinamico], [cnt_cantidad_auto]
    FROM dbo.crm_contrato
    WHERE [cnt_iid] = @Id;
END
GO

IF OBJECT_ID(N'dbo.crm_contratoIns', N'P') IS NOT NULL
    DROP PROCEDURE dbo.crm_contratoIns;
GO

CREATE PROCEDURE dbo.crm_contratoIns
    @Name VARCHAR(128),
    @cnt_org_fc INT = 0,
    @cnt_idcliente INT = 0,
    @cnt_fechaalta DATETIME = 0,
    @cnt_fechavto DATETIME = 0,
    @cnt_formapago INT = 0,
    @cnt_metadata VARCHAR(MAX) = '',
    @cnt_estado INT = 0,
    @cnt_tmp_id INT = 0,
    @cnt_dinamico INT = 0,
    @cnt_cantidad_auto INT = 0
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.crm_contrato
    (
        [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
        [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
        [cnt_dinamico], [cnt_cantidad_auto]
    )
    VALUES
    (
        @cnt_org_fc, @cnt_idcliente, @cnt_fechaalta, @cnt_fechavto,
        @cnt_formapago, @cnt_metadata, @cnt_estado, @cnt_tmp_id,
        @cnt_dinamico, @cnt_cantidad_auto
    );

    EXEC dbo.crm_contratoSel @@IDENTITY;
END
GO

IF OBJECT_ID(N'dbo.crm_contratoUpd', N'P') IS NOT NULL
    DROP PROCEDURE dbo.crm_contratoUpd;
GO

CREATE PROCEDURE dbo.crm_contratoUpd
    @Id INT,
    @Name VARCHAR(128),
    @cnt_org_fc INT = 0,
    @cnt_idcliente INT = 0,
    @cnt_fechaalta DATETIME = 0,
    @cnt_fechavto DATETIME = 0,
    @cnt_formapago INT = 0,
    @cnt_metadata VARCHAR(MAX) = '',
    @cnt_estado INT = 0,
    @cnt_tmp_id INT = 0,
    @cnt_dinamico INT = 0,
    @cnt_cantidad_auto INT = 0
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.crm_contrato
    SET [cnt_org_fc] = @cnt_org_fc,
        [cnt_idcliente] = @cnt_idcliente,
        [cnt_fechaalta] = @cnt_fechaalta,
        [cnt_fechavto] = @cnt_fechavto,
        [cnt_formapago] = @cnt_formapago,
        [cnt_metadata] = @cnt_metadata,
        [cnt_estado] = @cnt_estado,
        [cnt_tmp_id] = @cnt_tmp_id,
        [cnt_dinamico] = @cnt_dinamico,
        [cnt_cantidad_auto] = @cnt_cantidad_auto
    WHERE [cnt_iid] = @Id;

    EXEC dbo.crm_contratoSel @Id;
END
GO

IF OBJECT_ID(N'dbo.TG_INS_Contrato', N'TR') IS NOT NULL
    DROP TRIGGER dbo.TG_INS_Contrato;
GO

CREATE TRIGGER dbo.TG_INS_Contrato
ON dbo.crm_contrato
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idCliente INT = 0;

    SELECT TOP 1 @idCliente = [cnt_idcliente]
    FROM Inserted;

    IF @idCliente > 0
    BEGIN
        INSERT INTO dbo.crm_contrato
        (
            [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
            [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
            [cnt_dinamico], [cnt_cantidad_auto]
        )
        SELECT
            [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
            [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
            [cnt_dinamico], [cnt_cantidad_auto]
        FROM Inserted;
    END
END
GO

/* =========================================================
   C) Sanity checks
   ========================================================= */
USE [_Desktop];
GO

SELECT DB_NAME() AS DbName, p.name AS ProcName, prm.parameter_id, prm.name AS ParamName
FROM sys.procedures p
LEFT JOIN sys.parameters prm ON prm.object_id = p.object_id
WHERE p.name IN ('crm_contratoIns', 'crm_contratoUpd', 'crm_contratoSel')
ORDER BY p.name, prm.parameter_id;
GO

USE [_Datos];
GO

SELECT DB_NAME() AS DbName, p.name AS ProcName, prm.parameter_id, prm.name AS ParamName
FROM sys.procedures p
LEFT JOIN sys.parameters prm ON prm.object_id = p.object_id
WHERE p.name IN ('crm_contratoIns', 'crm_contratoUpd', 'crm_contratoSel')
ORDER BY p.name, prm.parameter_id;
GO

SELECT DB_NAME() AS DbName, t.name AS TriggerName
FROM sys.triggers t
WHERE t.parent_id = OBJECT_ID('dbo.crm_contrato');
GO
