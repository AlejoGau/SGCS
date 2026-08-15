IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_recepcion_proceso202603] (
    [pro_iid] int NOT NULL,
    [pro_recid] int NOT NULL,
    [pro_cterminal] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pro_tfechahora] datetime NOT NULL,
    [pro_nProceso] numeric(2,0) NOT NULL,
    [pro_iOperador] int NOT NULL,
    [pro_iRecIdPadre] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_p_recepcion_proceso202603RecId] ON [dbo].[p_recepcion_proceso202603] ([pro_recid] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_recepcion_proceso202603RecIdPadre] ON [dbo].[p_recepcion_proceso202603] ([pro_iRecIdPadre] ASC);
GO

CREATE CLUSTERED INDEX [PK_p_recepcion_proceso202603] ON [dbo].[p_recepcion_proceso202603] ([pro_iid] ASC);
GO
