IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_recepcion_notas] (
    [rec_iidrecepcion] int NOT NULL,
    [rec_itipo] int NOT NULL,
    [rec_mnota] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_idKey] int NOT NULL,
    CONSTRAINT [PK_p_recepcion_notas] PRIMARY KEY CLUSTERED ([rec_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_Precepcion_Notas] ON [dbo].[p_recepcion_notas] ([rec_iidrecepcion] ASC);
GO
