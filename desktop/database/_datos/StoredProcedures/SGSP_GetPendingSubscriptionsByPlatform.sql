CREATE OR ALTER PROCEDURE dbo.SGSP_GetPendingSubscriptionsByPlatform
    @Dealer CHAR(3) = NULL,
    @Platform VARCHAR(10) = 'Ambos' -- 'Android', 'iOS' o 'Ambos'
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        wsu_idKey AS ID,
        wsu_cDealer AS Dealer,
        wsu_cID AS SubscriptionID,
        wsu_cName AS SubscriptionName,
        wsu_cDesc AS SubscriptionDescription,
        wsu_iPriceID AS PriceID,
        wsu_iPeriodicityID AS PeriodicityID,
        wsu_iStatusAndroid AS StatusAndroid,
        wsu_tDateUpdateAndroid AS DateUpdateAndroid,
        wsu_iStatusIOS AS StatusIOS,
        wsu_tDateUpdateIOS AS DateUpdateIOS,
		wsu_cSubscriptionGroupIdIOS AS SubscriptionGroupIdIOS,
		wsu_cSubscriptionIdIOS AS SubscriptionIdIOS
    FROM dbo.WeSafeSubscription
    WHERE 
        (
            @Platform = 'Ambos'
            OR (@Platform = 'Android' AND wsu_iStatusAndroid = 0)
            OR (@Platform = 'iOS' AND wsu_iStatusIOS = 0)
        )
        AND (@Dealer IS NULL OR wsu_cDealer = @Dealer)
    ORDER BY wsu_tDateCreation ASC;
END;