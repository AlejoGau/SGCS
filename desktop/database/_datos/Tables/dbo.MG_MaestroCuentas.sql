IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_MaestroCuentas] (
    [mgmc_idkey] int NOT NULL,
    [mgmc_idorganizacion] int NOT NULL,
    [mgmc_ccodigo] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mgmc_descripcion] nvarchar(250) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mgmc_ctipo] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mgmc_lastupdate] datetime NOT NULL,
    [mgmc_saldo] money NOT NULL,
    [mgmc_moncodigo] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mgmc_metadata] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mgmc_capitulo] int NOT NULL,
    [mgmc_rubro] int NOT NULL,
    [mgmc_subrubro] int NOT NULL,
    [mgmc_imputacion] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [nc_mgmc_ctipo] ON [dbo].[MG_MaestroCuentas] ([mgmc_ccodigo] ASC, [mgmc_descripcion] ASC, [mgmc_saldo] ASC, [mgmc_ctipo] ASC, [mgmc_idorganizacion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_mgmc_idorganizacion] ON [dbo].[MG_MaestroCuentas] ([mgmc_descripcion] ASC, [mgmc_ctipo] ASC, [mgmc_lastupdate] ASC, [mgmc_saldo] ASC, [mgmc_idorganizacion] ASC, [mgmc_ccodigo] ASC);
GO

CREATE CLUSTERED INDEX [PK_mgmc_idkey] ON [dbo].[MG_MaestroCuentas] ([mgmc_idkey] ASC);
GO
