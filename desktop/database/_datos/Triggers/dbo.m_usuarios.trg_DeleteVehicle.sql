CREATE OR ALTER TRIGGER [dbo].[trg_DeleteVehicle]
ON [dbo].[m_usuarios]
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Crear una tabla temporal para guardar los dominios que van a desaparecer
    DECLARE @PatentesABorrar TABLE (Domain VarChar(128));

    INSERT INTO @PatentesABorrar (Domain)
    SELECT V.Domain
    FROM [dbo].[Vehicle] V
    INNER JOIN deleted D ON V.OwnerId = D.usu_idkey;

    -- 2. Borrado de la tabla Vehicle
    DELETE V
    FROM [dbo].[Vehicle] V
    INNER JOIN deleted D ON V.OwnerId = D.usu_idkey;

    -- 3. Limpieza de agenda futura por patente
    DELETE AG
    FROM dbo.VehicleAgenda AG
    INNER JOIN @PatentesABorrar P ON P.Domain = AG.vea_cDomain
    WHERE AG.vea_iProcessed = 0; --0: Significa que el evento es a futuro y todavía no pasó (el Job LPR_VehicleAgendaCheck no lo leyó)

END