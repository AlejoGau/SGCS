IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[ia_webhooks_queue] (
    [iwq_idKey] bigint NOT NULL,
    [iwq_cType] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_ia_webhooks_queue_iwq_cType] DEFAULT ('SofIAVoiceCall') NOT NULL,
    [iwq_cPayload] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [iwq_tFcreacion] datetime CONSTRAINT [DF_ia_webhooks_queue_iwq_tFcreacion] DEFAULT (getdate()) NOT NULL,
    [iwq_tFprocesado] datetime NOT NULL,
    [iwq_iEstado] int CONSTRAINT [DF_ia_webhooks_queue_iwq_iEstado] DEFAULT ((0)) NOT NULL,
    [iwq_iIntentos] int CONSTRAINT [DF_ia_webhooks_queue_iwq_iIntentos] DEFAULT ((0)) NOT NULL,
    [iwq_cErrorDesc] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_ia_webhooks_queue] PRIMARY KEY CLUSTERED ([iwq_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_ia_webhooks_queue_iEstado] ON [dbo].[ia_webhooks_queue] ([iwq_iEstado] ASC);
GO
