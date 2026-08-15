CREATE OR ALTER PROCEDURE [dbo].[SGSP_VehicleAgendaProcess]
AS
BEGIN
    SET NOCOUNT ON;
    SET DATEFIRST 7;
    DECLARE @cDomainActual VarChar(128)

    -- 1. Declarar el cursor de lectura hacia adelante para barrer autos con perfil asignado
    DECLARE curVehicles CURSOR LOCAL FAST_FORWARD FOR
        SELECT Domain
        FROM dbo.Vehicle
        WHERE ProfileVehicleId > 0

    OPEN curVehicles
    FETCH NEXT FROM curVehicles INTO @cDomainActual

    -- 2. Recorrer el lote ejecutando el procesador por cada patente
    WHILE @@FETCH_STATUS = 0
    BEGIN
        BEGIN TRY
            -- Invocar SP para que calcule las próximas 48hs de este dominio
            EXECUTE dbo.SGSP_VehicleAgendaFill @cDomain = @cDomainActual
        END TRY
        BEGIN CATCH
            -- Si una patente falla (ej: caracteres rotos), se captura el error para no colgar el Job 
            -- y permitir que el cursor continúe procesando el resto de los vehículos
            PRINT 'Error procesando la agenda para el dominio: ' + ISNULL(@cDomainActual, 'NULL')
        END CATCH

        FETCH NEXT FROM curVehicles INTO @cDomainActual
    END

    CLOSE curVehicles
    DEALLOCATE curVehicles
END