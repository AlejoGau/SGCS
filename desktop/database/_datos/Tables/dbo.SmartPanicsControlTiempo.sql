IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartPanicsControlTiempo] (
    [sct_idKey] int NOT NULL,
    [sct_tFechaHoraInicio] datetime CONSTRAINT [DF_SmartPanicsControlTiempo_sct_tFechaHoraInicio] DEFAULT (getdate()) NOT NULL,
    [sct_tFechaHoraLimite] datetime CONSTRAINT [DF_SmartPanicsControlTiempo_sct_tFechaHoraLimite] DEFAULT (getdate()) NOT NULL,
    [sct_idCuenta] int CONSTRAINT [DF_SmartPanicsControlTiempo_sct_idCuenta] DEFAULT ((0)) NOT NULL,
    [sct_iUsuario] int CONSTRAINT [DF_SmartPanicsControlTiempo_sct_iUsuario] DEFAULT ((0)) NOT NULL,
    [sct_iRecId] int CONSTRAINT [DF_SmartPanicsControlTiempo_sct_iRecId] DEFAULT ((0)) NOT NULL,
    [sct_cAlarmasAEsperar] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SmartPanicsControlTiempo_sct_cAlarmasAEsperar] DEFAULT ('') NOT NULL,
    [sct_iSmartPanicID] int NOT NULL,
    [sct_cPushToken] nvarchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_SmartPanicsControlTiempo] PRIMARY KEY CLUSTERED ([sct_idKey] ASC)
);
GO
