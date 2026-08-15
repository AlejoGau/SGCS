CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofIAVoiceCallAttachRecording]
    @id_evento_softguard INT,
    @created_at DATETIME,
    @recording_url NVARCHAR(1000),
    @file_name VARCHAR(100),
    @call_duration_sec NUMERIC(10,2) = NULL,
    @contact_name NVARCHAR(200) = NULL,
    @phone_number VARCHAR(30) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ahora DATETIME = GETDATE();
    DECLARE @cue_iid INT = 0;
    DECLARE @iOpe INT = 0;
    DECLARE @obsTimeline NVARCHAR(MAX);
    DECLARE @gra_nduracion NUMERIC(10,2) = 0;

    BEGIN TRY
        SELECT
            @cue_iid = ISNULL(rec_iidcuenta, 0),
            @iOpe = ISNULL(rec_ioperador, 0)
        FROM dbo.p_recepcion WITH (UPDLOCK, ROWLOCK)
        WHERE rec_iid = @id_evento_softguard;

        IF @@ROWCOUNT = 0
        BEGIN
            RAISERROR('No existe p_recepcion para id_evento_softguard=%d', 16, 1, @id_evento_softguard);
            RETURN;
        END

        SET @recording_url = LTRIM(RTRIM(ISNULL(@recording_url, N'')));
        SET @file_name = LTRIM(RTRIM(ISNULL(@file_name, '')));
        SET @contact_name = LTRIM(RTRIM(ISNULL(@contact_name, N'')));
        SET @phone_number = LTRIM(RTRIM(ISNULL(@phone_number, '')));
        SET @gra_nduracion = ISNULL(@call_duration_sec, 0);

        IF (@recording_url = N'')
        BEGIN
            RAISERROR('recording_url es obligatorio.', 16, 1);
            RETURN;
        END

        IF (@file_name = '')
        BEGIN
            RAISERROR('file_name es obligatorio.', 16, 1);
            RETURN;
        END

        EXEC _Desktop.dbo.p_grabacion_audioIns
            @Name = '',
            @gra_iidcuenta = @cue_iid,
            @gra_iidrecepcion = @id_evento_softguard,
            @gra_dfechahora = @created_at,
            @gra_carchivo = @file_name,
            @gra_nduracion = @gra_nduracion,
            @gra_ioperador = @iOpe,
            @gra_cterminal = '_WW',
            @gra_nestado = 1,
            @gra_ctelefono = @phone_number;

        SET @obsTimeline = N'[' + CONVERT(VARCHAR, @ahora, 103) + N' ' + SUBSTRING(CONVERT(VARCHAR, @ahora, 114), 1, 5) + N'] [SofIA] Grabacion descargada';

        IF (@contact_name <> N'')
            SET @obsTimeline += N' - Contacto: ' + @contact_name;

        IF (@phone_number <> '')
            SET @obsTimeline += N' - Telefono: ' + @phone_number;

        IF (@call_duration_sec IS NOT NULL)
            SET @obsTimeline += N' - Duracion: ' + CAST(@call_duration_sec AS NVARCHAR(20)) + N's';

        SET @obsTimeline += N' - Archivo: ' + @file_name;

        INSERT INTO dbo.EventosTimeLine
        (
            etl_iRecID,
            etl_iCuenta,
            etl_tFechaHora,
            etl_cAccion,
            etl_cObservacion,
            etl_cOwner,
            etl_iOperador
        )
        VALUES
        (
            @id_evento_softguard,
            @cue_iid,
            @ahora,
            'IngresoComentarios',
            @obsTimeline,
            '%SISTEMA%',
            @iOpe
        );
    END TRY
    BEGIN CATCH
        IF ERROR_NUMBER() = 2627 PRINT 'Handling PK violation...';
        ELSE IF ERROR_NUMBER() = 547 PRINT 'Handling CHECK/FK constraint violation...';
        ELSE IF ERROR_NUMBER() = 515 PRINT 'Handling NULL violation...';
        ELSE IF ERROR_NUMBER() = 245 PRINT 'Handling conversion error...';
        ELSE PRINT 'Error detectado...';

        PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
        PRINT 'Error Message : ' + ERROR_MESSAGE();
        PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
        PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
        PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
        PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

        THROW;
    END CATCH
END