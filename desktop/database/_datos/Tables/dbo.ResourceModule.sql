IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[ResourceModule] (
    [rmo_idKey] int NOT NULL,
    [rmo_cNombre] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_ResourceModule_rmo_cNombre] DEFAULT ('') NOT NULL,
    [rmo_iTypeId] int CONSTRAINT [DF_ResourceModule_rmo_iTypeId] DEFAULT ((0)) NOT NULL,
    [rmo_cImagen] varchar(300) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_ResourceModule_rmo_cImagen] DEFAULT ('') NOT NULL,
    [rmo_cObservacion] varchar(2048) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_ResourceModule_rmo_cObservacion] DEFAULT ('') NOT NULL,
    [rmo_cMarcaModelo] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_ResourceModule_rmo_cMarcaModelo] DEFAULT ('') NOT NULL,
    [rmo_cNumeroSerie] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_ResourceModule_rmo_cNumeroSerie] DEFAULT ('') NOT NULL,
    [rmo_iCuentaId] int CONSTRAINT [DF_ResourceModule_rmo_iCuentaId] DEFAULT ((0)) NOT NULL,
    [rmo_iestado] int NOT NULL,
    [rmo_tfechaasignacion] datetime NOT NULL,
    [rmo_tfechadevolucion] datetime NOT NULL,
    CONSTRAINT [PK_ResourceModule] PRIMARY KEY CLUSTERED ([rmo_idKey] ASC)
);
GO
