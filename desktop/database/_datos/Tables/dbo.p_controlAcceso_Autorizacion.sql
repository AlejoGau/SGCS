IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_controlAcceso_Autorizacion] (
    [caa_idkey] int NOT NULL,
    [caa_idautorizado] int NOT NULL,
    [caa_tipo] int NOT NULL,
    [caa_fechadesde] datetime NOT NULL,
    [caa_fechahasta] datetime NOT NULL,
    [caa_diasemana] int NOT NULL,
    [caa_horadesde] varchar(5) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [caa_horahasta] varchar(5) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [caa_estado] int NOT NULL,
    [caa_codigo] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [caa_usuautoriza] int NOT NULL,
    [caa_marcavehiculo] nvarchar(255) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_controlAcceso_Autorizacion_caa_marcavehiculo] DEFAULT ('') NOT NULL,
    [caa_patenteVehiculo] nvarchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_controlAcceso_Autorizacion_caa_patenteVehiculo] DEFAULT ('') NOT NULL,
    [caa_tipoVisita] int CONSTRAINT [DF_p_controlAcceso_Autorizacion_caa_tipoVisita] DEFAULT ('') NOT NULL,
    [caa_comentarios] nvarchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_controlAcceso_Autorizacion_caa_comentarios] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_p_controlAcceso_Autorizacion] PRIMARY KEY CLUSTERED ([caa_idkey] ASC)
);
GO
