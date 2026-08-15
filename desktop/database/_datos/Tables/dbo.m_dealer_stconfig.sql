IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_dealer_stconfig] (
    [dst_idKey] int NOT NULL,
    [dst_cdealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dst_config] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_dealer_stconfig] PRIMARY KEY CLUSTERED ([dst_idKey] ASC)
);
GO
