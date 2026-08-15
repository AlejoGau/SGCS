IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_nivelsenal] (
    [nvs_iid] int NOT NULL,
    [nvs_tfechahora] datetime CONSTRAINT [DF_p_nivelsenal_nvs_tfechahora] DEFAULT (getdate()) NOT NULL,
    [nvs_idCuenta] int CONSTRAINT [DF_p_nivelsenal_nvs_idCuenta] DEFAULT ((0)) NOT NULL,
    [nvs_nNivel] numeric(4,0) CONSTRAINT [DF_p_nivelsenal_nvs_nNivel] DEFAULT ((0)) NOT NULL,
    [nvs_nTension] numeric(3,0) CONSTRAINT [DF_p_nivelsenal_nvs_nTension] DEFAULT ((0)) NOT NULL,
    [nvs_iCantidad] smallint CONSTRAINT [DF_p_nivelsenal_nvs_iCantidad] DEFAULT ((0)) NOT NULL,
    [nvs_iRuido] int NOT NULL,
    CONSTRAINT [PK_p_nivelsenal] PRIMARY KEY CLUSTERED ([nvs_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_NivelSenalFechaHora] ON [dbo].[p_nivelsenal] ([nvs_iid] ASC, [nvs_tfechahora] ASC, [nvs_idCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_NivelSenalIdCta] ON [dbo].[p_nivelsenal] ([nvs_iid] ASC, [nvs_idCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_nivelsenal_IdcuentaIN] ON [dbo].[p_nivelsenal] ([nvs_tfechahora] ASC, [nvs_nNivel] ASC, [nvs_idCuenta] ASC);
GO
