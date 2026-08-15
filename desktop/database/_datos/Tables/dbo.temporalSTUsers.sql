IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[temporalSTUsers] (
    [parcelaNumero] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cuentaNombre] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [direccion] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dispositivoNombre] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dispositivoTelefono] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [email] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [observacion] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ubicacion] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
