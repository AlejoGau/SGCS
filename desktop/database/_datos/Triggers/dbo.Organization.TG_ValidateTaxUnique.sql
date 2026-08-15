CREATE OR ALTER TRIGGER [dbo].[TG_ValidateTaxUnique]
ON [dbo].[Organization]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Solo validar si se tocaron las columnas relevantes
    IF NOT (UPDATE(NationalTax) OR UPDATE(StateTax))
        RETURN;

    -- 1) Mismo registro: NationalTax no puede ser igual a StateTax
    IF EXISTS (
        SELECT 1
        FROM inserted i
        WHERE NULLIF(TRIM(i.NationalTax), '') IS NOT NULL
          AND NULLIF(TRIM(i.StateTax), '') IS NOT NULL
          AND i.NationalTax = i.StateTax
    )
    BEGIN
        RAISERROR('No se permite que NationalTax y StateTax tengan el mismo valor dentro del mismo registro.', 16, 1) WITH NOWAIT;
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- 2) Armar todos los valores nuevos (de ambas columnas) con su Id de origen
    DECLARE @ValoresNuevos TABLE (Id INT NOT NULL, Valor VARCHAR(128) NOT NULL);

    INSERT INTO @ValoresNuevos (Id, Valor)
    SELECT i.Id, NULLIF(TRIM(i.NationalTax), '')
    FROM inserted i
    WHERE NULLIF(TRIM(i.NationalTax), '') IS NOT NULL
    UNION ALL
    SELECT i.Id, NULLIF(TRIM(i.StateTax), '')
    FROM inserted i
    WHERE NULLIF(TRIM(i.StateTax), '') IS NOT NULL;

    -- 3) Duplicados dentro del mismo lote (insert/update de varias filas a la vez)
    IF EXISTS (
        SELECT Valor
        FROM @ValoresNuevos
        GROUP BY Valor
        HAVING COUNT(*) > 1
    )
    BEGIN
        RAISERROR('Hay valores de NationalTax/StateTax duplicados entre los registros del mismo lote.', 16, 1) WITH NOWAIT;
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- 4) Duplicados contra el resto de la tabla (excluyendo los propios registros del lote)
    IF EXISTS (
        SELECT 1
        FROM @ValoresNuevos vn
        INNER JOIN dbo.Organization o
            ON (o.NationalTax = vn.Valor OR o.StateTax = vn.Valor)
            AND o.Id <> vn.Id
    )
    BEGIN
        RAISERROR('El valor de NationalTax/StateTax ya está en uso en otro registro de Organization.', 16, 1) WITH NOWAIT;
        ROLLBACK TRANSACTION;
        RETURN;
    END
END