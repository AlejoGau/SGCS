IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_zonas_planilla] (
    [zon_iid] int NOT NULL,
    [zon_ccodigo] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_ccodigo] DEFAULT ('') NOT NULL,
    [zon_cdescripcion] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_cdescripcion] DEFAULT ('') NOT NULL,
    [zon_codigoalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_codigoalarma] DEFAULT ('') NOT NULL,
    [zon_clistaemergencia] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_clistaemergencia] DEFAULT ('') NOT NULL,
    [zon_cimagen] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_cimagen] DEFAULT ('') NOT NULL,
    [zon_mobservacion] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_mobservacion] DEFAULT ('') NOT NULL,
    [zon_ccodigorestauracion] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_ccodigorestauracion] DEFAULT ('') NOT NULL,
    [zon_nminutosrestauracion] numeric(3,0) CONSTRAINT [DF_m_zonas_planilla_zon_nminutosrestauracion] DEFAULT ((0)) NOT NULL,
    [zon_nmostrar] numeric(1,0) CONSTRAINT [DF_m_zonas_planilla_zon_nmostrar] DEFAULT ((0)) NOT NULL,
    [zon_cdealer] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_cdealer] DEFAULT ('') NOT NULL,
    [zon_ccuenta] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_ccuenta] DEFAULT ('') NOT NULL,
    [zon_nautoprocesa] numeric(1,0) CONSTRAINT [DF_m_zonas_planilla_zon_nautoprocesa] DEFAULT ((2)) NOT NULL,
    [zon_cAlarmaAGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_planilla_zon_cAlarmaAGenerar] DEFAULT ('') NOT NULL
);
GO
