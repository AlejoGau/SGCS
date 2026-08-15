IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuenta_grupo_usuarios] (
    [cgu_idkey] int NOT NULL,
    [cgu_idgrupo] int NOT NULL,
    [cgu_idusuario] int NOT NULL,
    CONSTRAINT [PK_m_cuenta_grupo_usuarios] PRIMARY KEY CLUSTERED ([cgu_idkey] ASC)
);
GO
