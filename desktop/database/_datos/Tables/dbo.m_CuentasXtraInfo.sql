IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_CuentasXtraInfo] (
    [cue_idKey] int NOT NULL,
    [cue_iidCuenta] int NOT NULL,
    [cue_iLicenciasSP] int NOT NULL,
    [cue_cConfig] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cCustom] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_iEngineStatus] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iEngineStatus] DEFAULT ((0)) NOT NULL,
    [cue_iImportancia] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iImportancia] DEFAULT ((0)) NOT NULL,
    [cue_iTeclado] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iTeclado] DEFAULT ((0)) NOT NULL,
    [cue_cUltimaAlarmaRecibida] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_CuentasXtraInfo_cue_cUltimaAlarmaRecibida] DEFAULT ('') NOT NULL,
    [cue_dFechaUltimaAlarmaRecibida] datetime NOT NULL,
    [cue_dFechaOPN] datetime NOT NULL,
    [cue_dFechaCLO] datetime NOT NULL,
    [cue_cHoraAperturaAutomonitoreo] char(5) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cHoraCierreAutomonitoreo] char(5) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_ilicenciapar] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_ilicenciapar] DEFAULT ((2)) NOT NULL,
    [cue_cUltimaAlarmaRecibidaAWCC] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_CuentasXtraInfo_cue_cUltimaAlarmaRecibidaAWCC] DEFAULT ('') NOT NULL,
    [cue_cUltimaAlertaAWCC] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_CuentasXtraInfo_cue_cUltimaAlertaAWCC] DEFAULT ('') NOT NULL,
    [cue_dFechaUltimaAlertaAWCC] datetime NOT NULL,
    [cue_dFechaUltimaAlarmaRecibidaAWCC] datetime NOT NULL,
    [cue_iidIRS] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iidIRS] DEFAULT ((0)) NOT NULL,
    [cue_iTipoServicio] int NOT NULL,
    [cue_iExcesoLimiteDia] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iExcesoLimiteDia] DEFAULT ((0)) NOT NULL,
    [cue_iExcesoLimiteHora] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iExcesoLimiteHora] DEFAULT ((0)) NOT NULL,
    [cue_cHorasVC] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_cHorasVC] DEFAULT ((0)) NOT NULL,
    [cue_cInstrucciones] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_iInstrMostrar] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iInstrMostrar] DEFAULT ((0)) NOT NULL,
    [cue_iVigiladoresVC] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_cVigiladoresVC] DEFAULT ((0)) NOT NULL,
    [cue_iMQTTDeviceID] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iMQTTDeviceID] DEFAULT ((0)) NOT NULL,
    [cue_iEnFalla] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iEnFalla] DEFAULT ((0)) NOT NULL,
    [cue_iStatusRD] int CONSTRAINT [DF_m_CuentasXtraInfo_cue_iStatusRD] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_CuentasXtraInfo] PRIMARY KEY CLUSTERED ([cue_iidCuenta] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_CuentasXtraInfo_Idkey] ON [dbo].[m_CuentasXtraInfo] ([cue_idKey] ASC);
GO
