CREATE OR ALTER PROCEDURE dbo.SGSP_UpdateSubscriptionStatus
    @SubscriptionId INT,
    @NewStatus INT,
    @Platform VARCHAR(10) -- 'Android' o 'iOS'
AS
BEGIN
    SET NOCOUNT ON;

    IF @Platform = 'Android'
    BEGIN
        UPDATE dbo.WeSafeSubscription
        SET
            wsu_iStatusAndroid = @NewStatus,
            wsu_tDateUpdateAndroid = GETDATE()
        WHERE
            wsu_idKey = @SubscriptionId;
    END
    ELSE IF @Platform = 'iOS'
    BEGIN
        UPDATE dbo.WeSafeSubscription
        SET
            wsu_iStatusIOS = @NewStatus,
            wsu_tDateUpdateIOS = GETDATE()
        WHERE
            wsu_idKey = @SubscriptionId;
    END
END;