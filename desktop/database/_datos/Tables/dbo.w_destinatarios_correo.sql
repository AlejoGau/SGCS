IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[w_destinatarios_correo] (
    [id_destinoemail] int NOT NULL,
    [destino] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [email_destino] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
