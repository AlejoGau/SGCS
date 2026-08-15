CREATE OR ALTER PROCEDURE dbo.SGSP_GetConfigByDealer
    @Dealer CHAR(3)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [wcf_idKey]
		,[wcf_cDealer]
		,[wcf_cAppNameAppStore]
		,[wcf_cIssuerID]
		,[wcf_cKeyIdAppStore]
		,[wcf_cPrivateKeyAppStore]
		,[wcf_cEndPointAppStore]
		,[wcf_cAppNameGoogleStore]
		,[wcf_cMailGoogleStore]
		,[wcf_cPrivateKeyGoogleStore]
		,[wcf_cEndPointGooglePlay]
    FROM dbo.WeSafeConfig
    WHERE ( @Dealer IS NULL OR wcf_cDealer = @Dealer)
END;