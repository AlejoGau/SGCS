IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_objetos_modificaciones] (
    [pom_idkey] int NOT NULL,
    [pom_usuariopedido] int NOT NULL,
    [pom_fechapedido] datetime NOT NULL,
    [pom_idtipoobjeto] int NOT NULL,
    [pom_idobjeto] int NOT NULL,
    [pom_sinmodificar] nvarchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pom_modificado] nvarchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pom_estado] int NOT NULL,
    [pom_log] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pom_usuarioultcambio] int NOT NULL,
    [pom_fechaultcambio] datetime NOT NULL,
    [pom_cueiid] int NOT NULL,
    [pom_metadata] nvarchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_objetos_modificaciones] PRIMARY KEY CLUSTERED ([pom_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_estado_fecha] ON [dbo].[p_objetos_modificaciones] ([pom_fechapedido] ASC, [pom_estado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_tipo_objeto] ON [dbo].[p_objetos_modificaciones] ([pom_idtipoobjeto] ASC, [pom_idobjeto] ASC, [pom_estado] ASC);
GO
