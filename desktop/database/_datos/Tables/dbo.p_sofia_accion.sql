IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_sofia_accion] (
    [sof_iidkey] bigint NOT NULL,
    [sof_reciid] int NOT NULL,
    [sof_ccodaccion] nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sof_cueiid] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sof_cestado] nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sof_cdetalle] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sof_isofechahora] datetime2(7) CONSTRAINT [DF__p_sofia_a__sof_i__43525E0A] DEFAULT (sysdatetime()) NOT NULL,
    CONSTRAINT [PK__p_sofia___C80D07792D514270] PRIMARY KEY CLUSTERED ([sof_iidkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_p_sofia_accion_ReciidCcodaccion] ON [dbo].[p_sofia_accion] ([sof_reciid] ASC, [sof_ccodaccion] ASC);
GO
