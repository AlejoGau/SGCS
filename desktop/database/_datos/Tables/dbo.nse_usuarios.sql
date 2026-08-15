IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[nse_usuarios] (
    [nse_iid] int NOT NULL,
    [nse_capellido] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_cnombre] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_cmail] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_ctel] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_cdni] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_cdireccion] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_clocalidad] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_cpassword] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [nse_icodigo] int NOT NULL,
    CONSTRAINT [PK_nse_usuarios] PRIMARY KEY CLUSTERED ([nse_iid] ASC)
);
GO
