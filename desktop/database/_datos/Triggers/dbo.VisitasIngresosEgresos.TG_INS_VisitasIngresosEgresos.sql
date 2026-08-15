CREATE OR ALTER TRIGGER [dbo].[TG_INS_VisitasIngresosEgresos]
ON [dbo].[VisitasIngresosEgresos]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -----------------------------------------------------------------
    -- 1. Eliminar SOLO si la matrícula es exactamente uno de esos valores
    -----------------------------------------------------------------
    DELETE V
    FROM [dbo].[VisitasIngresosEgresos] V
    INNER JOIN inserted I
        ON V.vie_idKey = I.vie_idKey
    WHERE UPPER(LTRIM(RTRIM(I.vie_cMatricula))) IN
    (
        'MOTO',
        'UNKNOW',
        'BICI',
        'DUMPER',
        'MICROCAR',
        'TRACTOR'
    );

    -----------------------------------------------------------------
    -- 2. Eliminar duplicados por matrícula (dejar solo uno)
    -----------------------------------------------------------------
    ;WITH CTE_Duplicados AS
    (
        SELECT
            vie_idKey,
            vie_cMatricula,
            ROW_NUMBER() OVER
            (
                PARTITION BY UPPER(LTRIM(RTRIM(vie_cMatricula)))
                ORDER BY vie_idKey
            ) AS RN
        FROM [dbo].[VisitasIngresosEgresos]
        WHERE vie_cMatricula IS NOT NULL
    )
    DELETE FROM CTE_Duplicados
    WHERE RN > 1;
END