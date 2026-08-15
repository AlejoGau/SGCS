IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_RegExIR] (
    [rir_iId] int NOT NULL,
    [rir_cDll] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RegExIR_rir_cDll] DEFAULT ('') NOT NULL,
    [rir_iOrden] int CONSTRAINT [DF_p_RegExIR_rir_iOrden] DEFAULT ((0)) NOT NULL,
    [rir_cRegExVerif] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RegExIR_rir_cRegExVerif] DEFAULT ('') NOT NULL,
    [rir_cRegExACK] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RegExIR_rir_cRegExACK] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_p_RegExIR] PRIMARY KEY CLUSTERED ([rir_iId] ASC)
);
GO
