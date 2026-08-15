IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuentas] (
    [cue_iid] int NOT NULL,
    [cue_clinea] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_clinea] DEFAULT ('') NOT NULL,
    [cue_ncuenta] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ncuenta] DEFAULT ('') NOT NULL,
    [cue_cnombre] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cnombre] DEFAULT ('') NOT NULL,
    [cue_ccalle] varchar(160) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ccalle] DEFAULT ('') NOT NULL,
    [cue_clocalidad] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_clocalidad] DEFAULT ('') NOT NULL,
    [cue_cprovincia] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cprovincia] DEFAULT ('') NOT NULL,
    [cue_ccodigopostal] varchar(8) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ccodigopostal] DEFAULT ('') NOT NULL,
    [cue_ccallecorreo] varchar(80) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ccallecorreo] DEFAULT ('') NOT NULL,
    [cue_clocalidadcorreo] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_clocalidadcorreo] DEFAULT ('') NOT NULL,
    [cue_cprovinciacorreo] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cprovinciacorreo] DEFAULT ('') NOT NULL,
    [cue_ccodigopostalcorreo] varchar(8) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ccodigopostalcorreo] DEFAULT ('') NOT NULL,
    [cue_ctelefono] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ctelefono] DEFAULT ('') NOT NULL,
    [cue_cclave] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cclave] DEFAULT ('') NOT NULL,
    [cue_cpermiso] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cpermiso] DEFAULT ('') NOT NULL,
    [cue_ctipo] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_ctipo] DEFAULT ('001') NOT NULL,
    [cue_cubicacion] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cubicacion] DEFAULT ('') NOT NULL,
    [cue_nparticion] int CONSTRAINT [DF_m_cuentas_cue_nparticion] DEFAULT ((0)) NOT NULL,
    [cue_cobservacion] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cobservacion] DEFAULT ('') NOT NULL,
    [cue_cfoto] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cfoto] DEFAULT ('') NOT NULL,
    [cue_dfechaalta] datetime CONSTRAINT [DF_m_cuentas_cue_dfechaalta] DEFAULT (getdate()) NOT NULL,
    [cue_dservicio] datetime CONSTRAINT [DF_m_cuentas_cue_dservicio] DEFAULT (getdate()) NOT NULL,
    [cue_nmostrar] numeric(1,0) CONSTRAINT [DF_m_cuentas_cue_nmostrar] DEFAULT ((0)) NOT NULL,
    [cue_nsonidoul] numeric(1,0) CONSTRAINT [DF_m_cuentas_cue_nsonidoul] DEFAULT ((0)) NOT NULL,
    [cue_nllaveul] numeric(1,0) CONSTRAINT [DF_m_cuentas_cue_nllaveul] DEFAULT ((0)) NOT NULL,
    [cue_cemail] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cemail] DEFAULT ('') NOT NULL,
    [cue_cinstalador] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cinstalador] DEFAULT ('') NOT NULL,
    [cue_cIMEI] varchar(120) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cIMEI] DEFAULT ('') NOT NULL,
    [cue_cLatLng] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cLatLng] DEFAULT ('0.0,0.0') NOT NULL,
    [cue_nEfectiva] numeric(1,0) CONSTRAINT [DF_m_cuentas_cue_nEfectiva] DEFAULT ((1)) NOT NULL,
    [cue_cIdExtendido] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cIdExtendido] DEFAULT ('') NOT NULL,
    [cue_iZonaHoraria] int CONSTRAINT [DF_m_cuentas_cue_iZonaHoraria] DEFAULT ((0)) NOT NULL,
    [cue_cPartitionInfo] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cPartitionInfo] DEFAULT ('') NOT NULL,
    [cue_nAutoMonitoreo] numeric(1,0) CONSTRAINT [DF_m_cuentas_cue_nAutoMonitoreo] DEFAULT ((2)) NOT NULL,
    [cue_nPrioridad] numeric(1,0) CONSTRAINT [DF_m_cuentas_cue_nPrioridad] DEFAULT ((1)) NOT NULL,
    [cue_cMadreLinea] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cMadreLinea] DEFAULT ('') NOT NULL,
    [cue_cMadreCuenta] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_cue_cMadreCuenta] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_cuentas] PRIMARY KEY CLUSTERED ([cue_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [cuenta] ON [dbo].[m_cuentas] ([cue_ncuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_lineacuenta] ON [dbo].[m_cuentas] ([cue_clinea] ASC, [cue_ncuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_cuentas_cue_ccalle] ON [dbo].[m_cuentas] ([cue_ccalle] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_cuentas_cue_cnombre] ON [dbo].[m_cuentas] ([cue_cnombre] ASC);
GO

CREATE NONCLUSTERED INDEX [linea] ON [dbo].[m_cuentas] ([cue_clinea] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_IMEI] ON [dbo].[m_cuentas] ([cue_cIMEI] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_LineaInclude] ON [dbo].[m_cuentas] ([cue_clinea] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_LlaveIn] ON [dbo].[m_cuentas] ([cue_iid] ASC, [cue_clinea] ASC, [cue_ncuenta] ASC, [cue_cnombre] ASC, [cue_ctipo] ASC, [cue_cMadreLinea] ASC, [cue_cMadreCuenta] ASC, [cue_nllaveul] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_llaveul] ON [dbo].[m_cuentas] ([cue_iid] ASC, [cue_ncuenta] ASC, [cue_ctipo] ASC, [cue_nllaveul] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_Particion] ON [dbo].[m_cuentas] ([cue_iid] ASC, [cue_clinea] ASC, [cue_ncuenta] ASC, [cue_ctipo] ASC, [cue_cMadreLinea] ASC, [cue_cMadreCuenta] ASC, [cue_nparticion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_ParticionIN] ON [dbo].[m_cuentas] ([cue_iid] ASC, [cue_ncuenta] ASC, [cue_ccalle] ASC, [cue_ctipo] ASC, [cue_nparticion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuentas_Tipo] ON [dbo].[m_cuentas] ([cue_iid] ASC, [cue_ctipo] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_m_cuentas_madreFields] ON [dbo].[m_cuentas] ([cue_cMadreLinea] ASC, [cue_cMadreCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_mcuentas_CUEIID] ON [dbo].[m_cuentas] ([cue_iid] ASC);
GO

CREATE NONCLUSTERED INDEX [tipo] ON [dbo].[m_cuentas] ([cue_ctipo] ASC);
GO
