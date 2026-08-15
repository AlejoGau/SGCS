IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_stock_totales] (
    [stt_idkey] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stt_iddeposito] int NOT NULL,
    [stt_idproducto] int NOT NULL,
    [stt_idtecnico] int NOT NULL,
    [stt_cant] real NOT NULL,
    [stt_fecha] datetime NOT NULL,
    CONSTRAINT [PK_m_stock_totales] PRIMARY KEY CLUSTERED ([stt_idkey] ASC)
);
GO
