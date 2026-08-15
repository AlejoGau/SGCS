IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuentas_BKP] (
    [cue_iid] int NOT NULL,
    [cue_clinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ncuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cnombre] varchar(60) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ccalle] varchar(160) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_clocalidad] varchar(40) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cprovincia] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ccodigopostal] varchar(8) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ccallecorreo] varchar(80) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_clocalidadcorreo] varchar(40) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cprovinciacorreo] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ccodigopostalcorreo] varchar(8) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ctelefono] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cclave] varchar(40) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cpermiso] varchar(40) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ctipo] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cubicacion] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_nparticion] int NOT NULL,
    [cue_cobservacion] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cfoto] varchar(60) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_dfechaalta] datetime NOT NULL,
    [cue_dservicio] datetime NOT NULL,
    [cue_nmostrar] numeric(1,0) NOT NULL,
    [cue_nsonidoul] numeric(1,0) NOT NULL,
    [cue_nllaveul] numeric(1,0) NOT NULL,
    [cue_cemail] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cinstalador] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cIMEI] varchar(120) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cLatLng] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_nEfectiva] numeric(1,0) NOT NULL,
    [cue_cIdExtendido] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_iZonaHoraria] int NOT NULL,
    [cue_cPartitionInfo] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_nAutoMonitoreo] numeric(1,0) NOT NULL,
    [cue_nPrioridad] numeric(1,0) NOT NULL,
    [cue_cMadreLinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cMadreCuenta] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
