IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_RXLog] (
    [rxl_iId] int NOT NULL,
    [rxl_iRecId] int CONSTRAINT [DF_p_RXLog_rxl_iRecId] DEFAULT ((0)) NOT NULL,
    [rxl_cLog] varchar(1000) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXLog_rxl_cLog] DEFAULT ('') NOT NULL,
    [rxl_cDll] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXLog_rxl_cDll] DEFAULT ('') NOT NULL,
    [rxl_cEvento] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXLog_rxl_cEvento] DEFAULT ('') NOT NULL,
    [rxl_cLineCard] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXLog_rxl_cLineCard] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_p_RXLog] PRIMARY KEY CLUSTERED ([rxl_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_RecIDEvento] ON [dbo].[p_RXLog] ([rxl_iRecId] ASC, [rxl_cEvento] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_RecIDLineCard] ON [dbo].[p_RXLog] ([rxl_cLineCard] ASC, [rxl_iRecId] ASC);
GO
