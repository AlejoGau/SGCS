IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_encuesta_respondidas] (
    [enr_idkey] int NOT NULL,
    [enr_encidkey] int NOT NULL,
    [enr_encname] nvarchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [enr_epricuenta] int NOT NULL,
    [enr_eprspidkey] int NOT NULL,
    [enr_eprcuser] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [enr_estado] int NOT NULL,
    [enr_fechaAlta] datetime CONSTRAINT [DF_p_encuesta_respondidas_enr_fechaAlta] DEFAULT (getdate()) NOT NULL,
    [enr_fechaModificacion] datetime CONSTRAINT [DF_p_encuesta_respondidas_enr_fechaModificacion] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_p_encuesta_respondidas] PRIMARY KEY CLUSTERED ([enr_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_p_encuesta_respondidas_EprcuserEstado] ON [dbo].[p_encuesta_respondidas] ([enr_eprcuser] ASC, [enr_estado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_encuesta_respondidas_EprspidkeyEstado] ON [dbo].[p_encuesta_respondidas] ([enr_eprspidkey] ASC, [enr_estado] ASC);
GO
