IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_AccesosProveedoresAutorizaciones] (
    [apa_idKey] int NOT NULL,
    [apa_idKeyProveedor] int CONSTRAINT [DF_m_AccesosProveedoresAutorizaciones_apa_idKeyProveedor] DEFAULT ((0)) NOT NULL,
    [apa_idKeyUF] int CONSTRAINT [DF_m_AccesosProveedoresAutorizaciones_apa_idKeyUF] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_AccesosProveedoresAutorizaciones] PRIMARY KEY CLUSTERED ([apa_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_AccesosProveedoresAutorizacionesUF] ON [dbo].[m_AccesosProveedoresAutorizaciones] ([apa_idKeyUF] ASC, [apa_idKeyProveedor] ASC);
GO
