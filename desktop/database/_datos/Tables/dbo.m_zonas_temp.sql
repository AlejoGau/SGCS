IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_zonas_temp] (
    [zon_idregistro] bigint NOT NULL,
    [zon_iidcuenta] int NOT NULL,
    [zon_usuario] int NOT NULL,
    [zon_ccodigo] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cdescripcion] nvarchar(60) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_codigoalarma] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_tipo] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cimagen] nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [zon_clistaemergencia] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
