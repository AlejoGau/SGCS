CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofIAVoiceCallQueueGetPending]
    @BatchSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    WITH CTE_Queue AS (
        SELECT TOP (@BatchSize)
            [iwq_idKey],
            [iwq_cType],
            [iwq_cPayload],
            [iwq_iIntentos],
            [iwq_iEstado],
            [iwq_tFprocesado],
            [iwq_tFcreacion]
        FROM [dbo].[ia_webhooks_queue] WITH (UPDLOCK, READPAST)
        WHERE [iwq_iEstado] = 0
        ORDER BY [iwq_idKey] ASC
    )
    UPDATE CTE_Queue
    SET
        [iwq_iEstado] = 1,
        [iwq_tFprocesado] = GETDATE()
    OUTPUT
        inserted.[iwq_idKey]     AS [Id],
        inserted.[iwq_cType]     AS [Type],
        inserted.[iwq_cPayload]  AS [PayloadJson],
        inserted.[iwq_iIntentos] AS [Attempts],
        inserted.[iwq_tFcreacion] AS [CreatedAt];

END