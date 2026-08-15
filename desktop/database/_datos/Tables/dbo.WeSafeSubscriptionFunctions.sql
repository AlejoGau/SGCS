IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[WeSafeSubscriptionFunctions] (
    [wsf_idKey] int NOT NULL,
    [wsf_iSubscriptionID] int CONSTRAINT [DF_WeSafeSubscriptionFunctions_wsf_iSubscriptionID] DEFAULT ((0)) NOT NULL,
    [wsf_iFunctionID] int CONSTRAINT [DF_WeSafeSubscriptionFunctions_wsf_iFunctionID] DEFAULT ((1)) NOT NULL,
    [wsu_iSelected] int CONSTRAINT [DF_WeSafeSubscriptionFunctions_wsu_iSelected] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_WeSafeSubscriptionFunctions] PRIMARY KEY CLUSTERED ([wsf_idKey] ASC)
);
GO
