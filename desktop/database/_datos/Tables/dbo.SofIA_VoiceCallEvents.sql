IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SofIA_VoiceCallEvents] (
    [sve_idKey] int NOT NULL,
    [sve_iRecId] int CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_iRecId] DEFAULT ((0)) NOT NULL,
    [sve_iOVConfigId] int CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_iOVConfigId] DEFAULT ((0)) NOT NULL,
    [sve_cConfigDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_cConfigDescripcion] DEFAULT ('') NOT NULL,
    [sve_cEventType] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_cEventType] DEFAULT ('') NOT NULL,
    [sve_cDealer] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_cDealer] DEFAULT ('') NOT NULL,
    [sve_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_Alarma] DEFAULT ('') NOT NULL,
    [sve_tEventDate] datetime CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_tEventDate] DEFAULT (getdate()) NOT NULL,
    [sve_tCreatedDate] datetime CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_tCreatedDate] DEFAULT (getdate()) NOT NULL,
    [sve_tLastUpdated] datetime CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_tLastUpdated] DEFAULT (getdate()) NOT NULL,
    [sve_iStatus] int CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_iStatus] DEFAULT ((0)) NOT NULL,
    [sve_cMessage] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SofIA_VoiceCallEvents_sve_cMessage] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_SofIA_VoiceCallEvents] PRIMARY KEY CLUSTERED ([sve_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_SofIA_VoiceCallEvents_RecId] ON [dbo].[SofIA_VoiceCallEvents] ([sve_iRecId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SofIA_VoiceCallEvents_Status] ON [dbo].[SofIA_VoiceCallEvents] ([sve_iRecId] ASC, [sve_iOVConfigId] ASC, [sve_cDealer] ASC, [sve_cAlarma] ASC, [sve_tEventDate] ASC, [sve_iStatus] ASC);
GO
