IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[OperadorVirtualConfigDealers] (
    [ovd_iOperadorVirtualConfigId] int NOT NULL,
    [ovd_cDealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_OperadorVirtualConfigDealers] PRIMARY KEY CLUSTERED ([ovd_iOperadorVirtualConfigId] ASC, [ovd_cDealer] ASC),
    CONSTRAINT [FK_OperadorVirtualConfigDealers_Config] FOREIGN KEY ([ovd_iOperadorVirtualConfigId]) REFERENCES [dbo].[OperadorVirtualConfig] ([ovc_idKey]) ON DELETE CASCADE
);
GO

CREATE NONCLUSTERED INDEX [NC_OperadorVirtualConfigDealers_Dealer] ON [dbo].[OperadorVirtualConfigDealers] ([ovd_iOperadorVirtualConfigId] ASC, [ovd_cDealer] ASC);
GO
