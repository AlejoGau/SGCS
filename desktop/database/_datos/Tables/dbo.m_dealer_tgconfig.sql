IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_dealer_tgconfig] (
    [dtg_idKey] int NOT NULL,
    [dtg_cdealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dtg_config] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dtg_parking_velocidad] int NOT NULL,
    [dtg_parking_eventos] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dtg_parking_eventos_hide] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK__m_dealer__8E04DEBB813745D8] PRIMARY KEY CLUSTERED ([dtg_idKey] ASC)
);
GO
