IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[AccesosPendientes] (
    [acp_idKey] int NOT NULL,
    [acp_iPuntoAcceso] int NOT NULL,
    [acp_iRecID] int NOT NULL,
    [acp_tEventoFechaHora] datetime NOT NULL,
    [acp_iidCuenta] int NOT NULL,
    [acp_cLinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cCuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cIdentificacion] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cIdExtendido] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cUsuarioNombre] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cUsuarioFoto] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cVehiculoDominio] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_cVehiculoFoto] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [acp_iStatus] int CONSTRAINT [DF_AccesosPendientes_acp_iStatus] DEFAULT ((0)) NOT NULL,
    [acp_tStatusExec] datetime NOT NULL,
    CONSTRAINT [PK_AccesosPendientes] PRIMARY KEY CLUSTERED ([acp_idKey] ASC, [acp_iStatus] ASC)
);
GO
