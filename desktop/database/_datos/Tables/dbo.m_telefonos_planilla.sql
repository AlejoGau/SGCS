IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_telefonos_planilla] (
    [tel_iidpla] int CONSTRAINT [DF_m_telefonos_planilla_tel_iidpla] DEFAULT ((0)) NOT NULL,
    [tel_iid] int CONSTRAINT [DF_m_telefonos_planilla_tel_iid] DEFAULT ((0)) NOT NULL,
    [tel_clista] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_clista] DEFAULT ('') NOT NULL,
    [tel_cnombre] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_cnombre] DEFAULT ('') NOT NULL,
    [tel_cobservacion] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_cobservacion] DEFAULT ('') NOT NULL,
    [tel_ctelefono] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_ctelefono] DEFAULT ('') NOT NULL,
    [tel_ndiscado] numeric(1,0) CONSTRAINT [DF_m_telefonos_planilla_tel_ndiscado] DEFAULT ((0)) NOT NULL,
    [tel_cpredigito] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_cpredigito] DEFAULT ('') NOT NULL,
    [tel_cpostdigito] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_cpostdigito] DEFAULT ('') NOT NULL,
    [tel_norden] smallint CONSTRAINT [DF_m_telefonos_planilla_tel_norden] DEFAULT ((0)) NOT NULL,
    [tel_ntr] numeric(1,0) CONSTRAINT [DF_m_telefonos_planilla_tel_ntr] DEFAULT ((2)) NOT NULL,
    [tel_cclave] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_cclave] DEFAULT ('') NOT NULL,
    [tel_cpermiso] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_telefonos_planilla_tel_cpermiso] DEFAULT ('') NOT NULL,
    [tel_nsms] numeric(1,0) CONSTRAINT [DF_m_telefonos_planilla_tel_nsms] DEFAULT ((2)) NOT NULL,
    [tel_cinternacional] varchar(15) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tel_ccountrycode] varchar(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tel_iismobile] int NOT NULL
);
GO
