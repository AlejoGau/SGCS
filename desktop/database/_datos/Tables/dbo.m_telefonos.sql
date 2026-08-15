IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_telefonos] (
    [tel_iidcuenta] int NOT NULL,
    [tel_iid] int NOT NULL,
    [tel_clista] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_clista] DEFAULT ('') NOT NULL,
    [tel_cnombre] varchar(256) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_cnombre] DEFAULT ('') NOT NULL,
    [tel_cobservacion] varchar(300) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_cobservacion] DEFAULT ('') NOT NULL,
    [tel_ctelefono] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_ctelefono] DEFAULT ('') NOT NULL,
    [tel_ndiscado] numeric(1,0) CONSTRAINT [DF_m_telefonos_tel_ndiscado] DEFAULT ((0)) NOT NULL,
    [tel_cpredigito] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_cpredigito] DEFAULT ('') NOT NULL,
    [tel_cpostdigito] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_cpostdigito] DEFAULT ('') NOT NULL,
    [tel_norden] smallint CONSTRAINT [DF_m_telefonos_tel_norden] DEFAULT ((1)) NOT NULL,
    [tel_ntr] numeric(1,0) CONSTRAINT [DF_m_telefonos_tel_ntr] DEFAULT ((2)) NOT NULL,
    [tel_cclave] varchar(80) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_cclave] DEFAULT ('') NOT NULL,
    [tel_cpermiso] varchar(80) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_tel_cpermiso] DEFAULT ('') NOT NULL,
    [tel_nsms] numeric(1,0) CONSTRAINT [DF_m_telefonos_tel_nsms] DEFAULT ((2)) NOT NULL,
    [tel_idKey] int NOT NULL,
    [tel_nsp] numeric(1,0) CONSTRAINT [DF_m_telefonos_tel_nsp] DEFAULT ((2)) NOT NULL,
    [tel_cinternacional] varchar(15) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tel_ccountrycode] varchar(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tel_iismobile] int NOT NULL,
    CONSTRAINT [PK_m_telefonos] PRIMARY KEY NONCLUSTERED ([tel_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_telefonos_tel_cnombre] ON [dbo].[m_telefonos] ([tel_cnombre] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_telefonos_tel_iidcuenta] ON [dbo].[m_telefonos] ([tel_iidcuenta] ASC);
GO

CREATE CLUSTERED INDEX [nc_cuentaid] ON [dbo].[m_telefonos] ([tel_iidcuenta] ASC, [tel_iid] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_tel_ctelefono] ON [dbo].[m_telefonos] ([tel_ctelefono] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_tel_nsp] ON [dbo].[m_telefonos] ([tel_iidcuenta] ASC, [tel_iid] ASC, [tel_ctelefono] ASC, [tel_nsp] ASC);
GO
