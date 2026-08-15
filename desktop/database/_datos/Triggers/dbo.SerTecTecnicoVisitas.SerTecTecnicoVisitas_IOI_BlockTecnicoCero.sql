CREATE OR ALTER TRIGGER [dbo].[SerTecTecnicoVisitas_IOI_BlockTecnicoCero]
ON [dbo].[SerTecTecnicoVisitas]
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[SerTecTecnicoVisitas]
    (
        [stv_iTecnico],
        [stv_iVisita],
        [stv_iFormaDeViaje],
        [stv_iusuarioDss]
    )
    SELECT
        i.[stv_iTecnico],
        i.[stv_iVisita],
        i.[stv_iFormaDeViaje],
        i.[stv_iusuarioDss]
    FROM inserted i
    WHERE ISNULL(i.[stv_iTecnico], 0) > 0;
END