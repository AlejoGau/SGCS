IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_EstadosDinamicos] (
    [ped_idKey] int NOT NULL,
    [ped_cCodigo] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ped_iValor] int NOT NULL,
    [ped_iUsuario] int NOT NULL,
    [ped_iCtaId] int NOT NULL,
    CONSTRAINT [PK_p_EstadosDinamicos] PRIMARY KEY CLUSTERED ([ped_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EstadosDinamicos_Eventos] ON [dbo].[p_EstadosDinamicos] ([ped_iValor] ASC, [ped_cCodigo] ASC, [ped_iUsuario] ASC, [ped_iCtaId] ASC);
GO
