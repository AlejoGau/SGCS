IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_AccesosProveedoresDocumentos] (
    [apd_idKey] int NOT NULL,
    [apd_idKeyProveedor] int CONSTRAINT [DF_m_AccesosProveedoresDocumentos_apd_idKeyProveedor] DEFAULT ((0)) NOT NULL,
    [apd_idKeyTipoDoc] int NOT NULL,
    [apd_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [apd_tFechaVto] datetime CONSTRAINT [DF_m_AccesosProveedoresDocumentos_apd_tFechaVto] DEFAULT (getdate()) NOT NULL,
    [apd_cPathFile] varchar(512) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedoresDocumentos_apd_cPathFile] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_AccesosProveedoresDocumentos] PRIMARY KEY CLUSTERED ([apd_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_AccesosProveedoresDocumentosVto] ON [dbo].[m_AccesosProveedoresDocumentos] ([apd_tFechaVto] ASC, [apd_idKeyProveedor] ASC);
GO
