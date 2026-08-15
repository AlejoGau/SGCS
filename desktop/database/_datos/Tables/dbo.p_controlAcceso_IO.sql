IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_controlAcceso_IO] (
    [cac_idkey] int NOT NULL,
    [cac_tipoacceso] int NOT NULL,
    [cac_idpuerta] int NOT NULL,
    [cac_fecha] datetime NOT NULL,
    [cac_idautorizado] int NOT NULL,
    [cac_autorizatipo] int NOT NULL,
    [cac_autorizaid] int NOT NULL,
    [cac_autorizacodigo] nvarchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cac_cobservacion] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cac_autorizadotipoid] int NOT NULL,
    CONSTRAINT [PK_p_controlAcceso_IO] PRIMARY KEY CLUSTERED ([cac_idkey] ASC)
);
GO
