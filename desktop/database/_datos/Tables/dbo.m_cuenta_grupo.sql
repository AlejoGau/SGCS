IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuenta_grupo] (
    [cgr_idkey] int NOT NULL,
    [cgr_cnombre] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cgr_itipo] int CONSTRAINT [DF_m_cuenta_grupo_cgr_itipo] DEFAULT ((1)) NOT NULL,
    [cgr_iidcuenta] int NOT NULL,
    CONSTRAINT [PK_m_cuenta_grupo] PRIMARY KEY CLUSTERED ([cgr_idkey] ASC)
);
GO
