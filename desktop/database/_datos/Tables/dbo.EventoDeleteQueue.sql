IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventoDeleteQueue] (
    [edq_id] bigint NOT NULL,
    [edq_idRec] int NOT NULL,
    [edq_tDateTime] datetime NOT NULL,
    [edq_cPeriodo] char(6) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [edq_iRxtrainfoStatus] tinyint CONSTRAINT [DF__EventoDel__edq_i__05202167] DEFAULT ((0)) NOT NULL,
    [edq_iTimelineStatus] tinyint CONSTRAINT [DF__EventoDel__edq_i__061445A0] DEFAULT ((0)) NOT NULL,
    [edq_iGeneralStatus] tinyint CONSTRAINT [DF__EventoDel__edq_i__070869D9] DEFAULT ((0)) NOT NULL,
    [edq_tDateQueue] datetime2(3) CONSTRAINT [DF__EventoDel__edq_t__07FC8E12] DEFAULT (sysdatetime()) NOT NULL,
    [edq_tDateLastExecute] datetime2(3) NOT NULL,
    [edq_iAttempts] tinyint CONSTRAINT [DF__EventoDel__edq_i__08F0B24B] DEFAULT ((0)) NOT NULL,
    [edq_cLastError] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_EventoDeleteQueue] PRIMARY KEY CLUSTERED ([edq_id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_EDQ_GeneralStatus_Periodo] ON [dbo].[EventoDeleteQueue] ([edq_iGeneralStatus] ASC, [edq_cPeriodo] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_EDQ_RecID] ON [dbo].[EventoDeleteQueue] ([edq_iRxtrainfoStatus] ASC, [edq_iTimelineStatus] ASC, [edq_idRec] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_EDQ_RxtrainfoStatus_Periodo] ON [dbo].[EventoDeleteQueue] ([edq_idRec] ASC, [edq_tDateTime] ASC, [edq_iRxtrainfoStatus] ASC, [edq_cPeriodo] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_EDQ_TimelineStatus_Periodo] ON [dbo].[EventoDeleteQueue] ([edq_idRec] ASC, [edq_iTimelineStatus] ASC, [edq_cPeriodo] ASC);
GO
