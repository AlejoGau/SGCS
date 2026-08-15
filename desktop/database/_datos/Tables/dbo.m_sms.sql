IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_sms] (
    [sms_iidcuenta] int CONSTRAINT [DF_m_sms_sms_iidcuenta] DEFAULT ((0)) NOT NULL,
    [sms_iid] int CONSTRAINT [DF_m_sms_sms_iid] DEFAULT ((0)) NOT NULL,
    [sms_meventos] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_meventos] DEFAULT ('') NOT NULL,
    [sms_csmsparaeventos] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_csmsparaeventos] DEFAULT ('') NOT NULL,
    [sms_imodemsms] int CONSTRAINT [DF_m_sms_sms_imodemsms] DEFAULT ((0)) NOT NULL,
    [sms_cplantillasms] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_cplantillasms] DEFAULT ('') NOT NULL,
    [sms_idKey] int NOT NULL,
    [sms_cmailparaeventos] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_cmailparaeventos] DEFAULT ('') NOT NULL,
    [sms_cplantillamail] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_cplantillamail] DEFAULT ('') NOT NULL,
    [sms_iNotificarAlertas] int CONSTRAINT [DF_m_sms_sms_iNotificarAlertas] DEFAULT ((0)) NOT NULL,
    [sms_cidsPushSmartpanic] varchar(1000) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_cidsPushSmartpanic] DEFAULT ('') NOT NULL,
    [sms_cPlantillaPush] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_cPlantillaPush] DEFAULT ('') NOT NULL,
    [sms_iGrupoAlarmas] int CONSTRAINT [DF_m_sms_sms_iGrupoAlarmas] DEFAULT ((0)) NOT NULL,
    [sms_cDescripcion] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sms_czona] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sms_iEventosSP] int CONSTRAINT [DF_m_sms_sms_iEventosSP] DEFAULT ((0)) NOT NULL,
    [sms_cSonido] char(1) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_sms_sms_cSonido] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_sms] PRIMARY KEY NONCLUSTERED ([sms_idKey] ASC)
);
GO

CREATE CLUSTERED INDEX [idcuenta] ON [dbo].[m_sms] ([sms_iidcuenta] ASC, [sms_iid] ASC);
GO
