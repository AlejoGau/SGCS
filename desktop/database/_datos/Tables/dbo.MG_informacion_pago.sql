IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_informacion_pago] (
    [mip_idkey] int NOT NULL,
    [mip_fpgidkey] int NOT NULL,
    [mip_idcliente] int NOT NULL,
    [mip_codigo] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mip_fechadesde] date NOT NULL,
    [mip_fechahasta] date NOT NULL,
    [mip_emisor] int NOT NULL,
    [mip_clave] nvarchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mip_nombreusuario] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MG_datos_pago] PRIMARY KEY CLUSTERED ([mip_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [nc_cliente_formapago] ON [dbo].[MG_informacion_pago] ([mip_fpgidkey] ASC, [mip_idcliente] ASC);
GO
