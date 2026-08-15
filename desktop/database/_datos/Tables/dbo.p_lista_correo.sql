IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_lista_correo] (
    [plc_idkey] int NOT NULL,
    [plc_name] nvarchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plc_dealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plc_correos] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_lista_correo] PRIMARY KEY CLUSTERED ([plc_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_nombre] ON [dbo].[p_lista_correo] ([plc_name] ASC, [plc_dealer] ASC);
GO
