IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_AccesosProveedores] (
    [apr_idKey] int NOT NULL,
    [apr_cNombre] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cNombre] DEFAULT ('') NOT NULL,
    [apr_cIdentificacion] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cIdentificacion] DEFAULT ('') NOT NULL,
    [apr_cDireccion] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cDireccion] DEFAULT ('') NOT NULL,
    [apr_cCodigoPostal] nvarchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cCodigoPostal] DEFAULT ('') NOT NULL,
    [apr_cLocalidad] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cLocalidad] DEFAULT ('') NOT NULL,
    [apr_iProvincia] int CONSTRAINT [DF_m_AccesosProveedores_apr_iProvincia] DEFAULT ((0)) NOT NULL,
    [apr_cTelefono] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cTelefono] DEFAULT ('') NOT NULL,
    [apr_iCategoria] int CONSTRAINT [DF_m_AccesosProveedores_apr_iCategoria] DEFAULT ((0)) NOT NULL,
    [apr_tFechaAlta] datetime CONSTRAINT [DF_m_AccesosProveedores_apr_tFechaAlta] DEFAULT (getdate()) NOT NULL,
    [apr_iStatus] int CONSTRAINT [DF_m_AccesosProveedores_apr_iStatus] DEFAULT ((0)) NOT NULL,
    [apr_cObservaciones] nvarchar(2048) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cObservaciones] DEFAULT ('') NOT NULL,
    [apr_cPathPicture] varchar(512) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_AccesosProveedores_apr_cPathPicture] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_AccesosProveedores] PRIMARY KEY CLUSTERED ([apr_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_AccesosProveedoresStatus] ON [dbo].[m_AccesosProveedores] ([apr_idKey] ASC, [apr_iStatus] ASC);
GO
