IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosTimeLine202707] (
    [etl_idKey] bigint NOT NULL,
    [etl_iRecID] int NOT NULL,
    [etl_iCuenta] int NOT NULL,
    [etl_tFechaHora] datetime NOT NULL,
    [etl_cAccion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [etl_cObservacion] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [etl_cOwner] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [etl_iOperador] int NOT NULL,
    [etl_iAccionCode] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosTimeLine202707FechaHora] ON [dbo].[EventosTimeLine202707] ([etl_idKey] ASC, [etl_tFechaHora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosTimeLine202707iRecID] ON [dbo].[EventosTimeLine202707] ([etl_idKey] ASC, [etl_iCuenta] ASC, [etl_tFechaHora] ASC, [etl_cAccion] ASC, [etl_cObservacion] ASC, [etl_cOwner] ASC, [etl_iOperador] ASC, [etl_iAccionCode] ASC, [etl_iRecID] ASC);
GO

CREATE CLUSTERED INDEX [PK_EventosTimeLine202707] ON [dbo].[EventosTimeLine202707] ([etl_idKey] ASC);
GO
