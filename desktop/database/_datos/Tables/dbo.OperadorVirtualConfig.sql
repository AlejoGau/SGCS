IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[OperadorVirtualConfig] (
    [ovc_idKey] int NOT NULL,
    [ovc_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_OperadorVirtualConfig_ovc_cDescripcion] DEFAULT ('') NOT NULL,
    [ovc_cEventType] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_OperadorVirtualConfig_ovc_cEventType] DEFAULT ('') NOT NULL,
    [ovc_iStatus] int CONSTRAINT [DF_OperadorVirtualConfig_ovc_iStatus] DEFAULT ((0)) NOT NULL,
    [ovc_cDealers] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_OperadorVirtualConfig_ovc_cDealers] DEFAULT ('') NOT NULL,
    [ovc_cEventos] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_OperadorVirtualConfig_ovc_cEventos] DEFAULT ('') NOT NULL,
    [ovc_tLastUpdated] datetime CONSTRAINT [DF_OperadorVirtualConfig_ovc_tLastUpdated] DEFAULT (getdate()) NOT NULL,
    [ovc_tCreatedDate] datetime CONSTRAINT [DF_OperadorVirtualConfig_ovc_tCreatedDate] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_OperadorVirtualConfig] PRIMARY KEY CLUSTERED ([ovc_idKey] ASC),
    CONSTRAINT [CK_OperadorVirtualConfig_Dealers_NotEmpty] CHECK (len(ltrim(rtrim([ovc_cDealers])))>(0)),
    CONSTRAINT [CK_OperadorVirtualConfig_Descripcion_NotEmpty] CHECK (len(ltrim(rtrim([ovc_cDescripcion])))>(0)),
    CONSTRAINT [CK_OperadorVirtualConfig_Eventos_NotEmpty] CHECK (len(ltrim(rtrim([ovc_cEventos])))>(0)),
    CONSTRAINT [CK_OperadorVirtualConfig_EventType_NotEmpty] CHECK (len(ltrim(rtrim([ovc_cEventType])))>(0)),
    CONSTRAINT [CK_OperadorVirtualConfig_Status] CHECK ([ovc_iStatus]=(1) OR [ovc_iStatus]=(0))
);
GO

CREATE NONCLUSTERED INDEX [NC_OperadorVirtualConfig_Status] ON [dbo].[OperadorVirtualConfig] ([ovc_cDescripcion] ASC, [ovc_iStatus] ASC);
GO
