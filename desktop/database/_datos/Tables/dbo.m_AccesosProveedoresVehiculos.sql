IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_AccesosProveedoresVehiculos] (
    [apv_idKey] int NOT NULL,
    [apv_idKeyProveedor] int CONSTRAINT [DF_m_AccesosProveedoresVehiculos_apv_idKeyProveedor] DEFAULT ((0)) NOT NULL,
    [apv_idKeyVehiculo] int CONSTRAINT [DF_m_AccesosProveedoresVehiculos_apv_idKeyVehiculo] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_AccesosProveedoresVehiculos] PRIMARY KEY CLUSTERED ([apv_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_AccesosProveedoresVehiculos] ON [dbo].[m_AccesosProveedoresVehiculos] ([apv_idKeyVehiculo] ASC, [apv_idKeyProveedor] ASC);
GO
