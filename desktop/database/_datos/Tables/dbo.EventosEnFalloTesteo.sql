IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosEnFalloTesteo] (
    [eft_idKey] int NOT NULL,
    [eft_iRecID] int NOT NULL,
    [eft_iidCuenta] int NOT NULL,
    [eft_tEventoFechaHora] datetime NOT NULL,
    [eft_cLinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eft_cCuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eft_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eft_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eft_cAlarmaDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eft_nAlarmaColor] int NOT NULL,
    [eft_nAlarmaColorLetra] int NOT NULL,
    [eft_cAlarmaAutoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_EventosEnFalloTesteo] PRIMARY KEY CLUSTERED ([eft_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosEnFalloTesteo_Cuenta] ON [dbo].[EventosEnFalloTesteo] ([eft_iidCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosEnFalloTesteo_idCta] ON [dbo].[EventosEnFalloTesteo] ([eft_iidCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosEnFalloTesteo_RecID_idCta] ON [dbo].[EventosEnFalloTesteo] ([eft_cAlarmaAutoprocesa] ASC, [eft_iRecID] ASC, [eft_iidCuenta] ASC);
GO
