IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TG_mantenimiento_historico] (
    [tgmh_idkey] int NOT NULL,
    [tgmh_idservicio] int NOT NULL,
    [tgmh_cdescripcion] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tgmh_iodometro] int NOT NULL,
    [tgmh_idispositivomovil] int NOT NULL,
    [tgmh_dfecha] datetime NOT NULL,
    CONSTRAINT [PK_TG_mantenimiento_historico] PRIMARY KEY CLUSTERED ([tgmh_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [TG_MH_dispositivo] ON [dbo].[TG_mantenimiento_historico] ([tgmh_idservicio] ASC, [tgmh_cdescripcion] ASC, [tgmh_iodometro] ASC, [tgmh_idispositivomovil] ASC, [tgmh_dfecha] ASC);
GO

CREATE NONCLUSTERED INDEX [TG_MH_fecha] ON [dbo].[TG_mantenimiento_historico] ([tgmh_idservicio] ASC, [tgmh_cdescripcion] ASC, [tgmh_iodometro] ASC, [tgmh_idispositivomovil] ASC, [tgmh_dfecha] ASC);
GO
