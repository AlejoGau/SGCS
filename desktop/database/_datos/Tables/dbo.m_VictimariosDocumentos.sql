IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_VictimariosDocumentos] (
    [vdc_idKey] int NOT NULL,
    [vdc_idKeyVictimario] int CONSTRAINT [DF_m_VictimariosDocumentos_vdc_idKeyVictimario] DEFAULT ((0)) NOT NULL,
    [vdc_tFechaCreacion] datetime CONSTRAINT [DF_m_VictimariosDocumentos_vdc_tFechaCreacion] DEFAULT (getdate()) NOT NULL,
    [vdc_cPathFile] varchar(512) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_VictimariosDocumentos_vdc_cPathFile] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_VictimariosDocumentos] PRIMARY KEY CLUSTERED ([vdc_idKey] ASC)
);
GO
