IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_Recepcion_D] (
    [rec_iRecId] int NOT NULL,
    [usu_iCodigo] int CONSTRAINT [DF_p_Recepcion_D_usu_iCodigo] DEFAULT ((0)) NOT NULL,
    [usu_cNombre] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_Recepcion_D_usu_cNombre] DEFAULT ('') NOT NULL,
    [zon_cCodigo] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_Recepcion_D_zon_cCodigo] DEFAULT ('') NOT NULL,
    [zon_cDescripcion] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_Recepcion_D_zon_cDescripcion] DEFAULT ('') NOT NULL,
    [_Origen] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_Puerto] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_Recepcion_D] PRIMARY KEY CLUSTERED ([rec_iRecId] ASC)
);
GO
