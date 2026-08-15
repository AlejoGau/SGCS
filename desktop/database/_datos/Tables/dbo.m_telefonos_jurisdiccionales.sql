IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_telefonos_jurisdiccionales] (
    [tel_idKey] int NOT NULL,
    [tel_clista] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_clista] DEFAULT ('') NOT NULL,
    [tel_cnombre] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_cnombre] DEFAULT ('') NOT NULL,
    [tel_cobservacion] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_cobservacion] DEFAULT ('') NOT NULL,
    [tel_ctelefono] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_ctelefono] DEFAULT ('') NOT NULL,
    [tel_ndiscado] numeric(1,0) CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_ndiscado] DEFAULT ((0)) NOT NULL,
    [tel_cpredigito] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_cpredigito] DEFAULT ('') NOT NULL,
    [tel_cpostdigito] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_cpostdigito] DEFAULT ('') NOT NULL,
    [tel_cprovincia] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_jurisdiccionales_tel_cprovincia] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_telefonos_jurisdiccionales] PRIMARY KEY CLUSTERED ([tel_idKey] ASC)
);
GO
