IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_tgviaje] (
    [tgv_idkey] int NOT NULL,
    [tgv_nombre] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tgv_fechainicio] datetime NOT NULL,
    [tgv_fechafin] datetime NOT NULL,
    [tgv_reciid_inicio] int NOT NULL,
    [tgv_reciid_fin] int NOT NULL,
    [tgv_usuiid] int NOT NULL,
    [tgv_cueiid] int NOT NULL,
    [tgv_codigoexterno] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tgv_estado] int NOT NULL,
    [tgv_geofenseinicio] int NOT NULL,
    [tgv_geofensefin] int NOT NULL,
    [tgv_metadata] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tgv_fecha_prg_inicio] datetime NOT NULL,
    [tgv_fecha_prg_fin] datetime NOT NULL,
    [tgv_cuenta_cliente] int NOT NULL,
    [tgv_movil_transportista] int NOT NULL,
    [tgv_lugar_inicio] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tgv_lugar_fin] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_tgviaje] PRIMARY KEY CLUSTERED ([tgv_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_tgviaje_EstadoIN] ON [dbo].[m_tgviaje] ([tgv_cueiid] ASC, [tgv_fecha_prg_fin] ASC, [tgv_estado] ASC);
GO

CREATE NONCLUSTERED INDEX [tgv_cueiid_estado] ON [dbo].[m_tgviaje] ([tgv_cueiid] ASC, [tgv_estado] ASC);
GO
