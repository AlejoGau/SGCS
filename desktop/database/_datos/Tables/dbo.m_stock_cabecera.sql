IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_stock_cabecera] (
    [stc_idkey] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stc_iddepositoorigen] int NOT NULL,
    [stc_iddepositodestino] int NOT NULL,
    [stc_iusuariodss] int NOT NULL,
    [stc_itecnico] int NOT NULL,
    [stc_tipomov] varchar(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stc_comprobantetipo] varchar(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stc_comprobante] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stc_referencia] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stc_descripcion] varchar(2048) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stc_fecha] datetime NOT NULL,
    CONSTRAINT [PK_m_stock_cabecera] PRIMARY KEY CLUSTERED ([stc_idkey] ASC)
);
GO
