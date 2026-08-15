IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_recepcion_proceso] (
    [pro_iid] int NOT NULL,
    [pro_recid] int CONSTRAINT [DF_p_recepcion_proceso_pro_recid] DEFAULT ((0)) NOT NULL,
    [pro_cterminal] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_recepcion_proceso_pro_cterminal] DEFAULT ('') NOT NULL,
    [pro_tfechahora] datetime CONSTRAINT [DF_p_recepcion_proceso_pro_tfechahora] DEFAULT (getdate()) NOT NULL,
    [pro_nProceso] numeric(2,0) CONSTRAINT [DF_p_recepcion_proceso_pro_nProceso] DEFAULT ((0)) NOT NULL,
    [pro_iOperador] int CONSTRAINT [DF_p_recepcion_proceso_pro_iOperador] DEFAULT ((0)) NOT NULL,
    [pro_iRecIdPadre] int NOT NULL,
    CONSTRAINT [PK_p_recepcion_proceso] PRIMARY KEY NONCLUSTERED ([pro_iid] ASC)
);
GO

CREATE CLUSTERED INDEX [IX_p_recepcion_proceso] ON [dbo].[p_recepcion_proceso] ([pro_recid] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_pRecepcionProcesoRecId] ON [dbo].[p_recepcion_proceso] ([pro_tfechahora] ASC, [pro_nProceso] ASC, [pro_iOperador] ASC, [pro_iRecIdPadre] ASC, [pro_recid] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_pRecepcionProcesoRecIdPadre] ON [dbo].[p_recepcion_proceso] ([pro_iRecIdPadre] ASC);
GO
