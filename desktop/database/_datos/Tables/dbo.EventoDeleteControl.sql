IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventoDeleteControl] (
    [edc_id] int NOT NULL,
    [edc_cProcessType] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [edc_cPeriodo] char(6) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [edc_cTableName] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [edc_iAffectedRecords] int NOT NULL,
    [edc_iErrorRecords] int NOT NULL,
    [edc_iDurationMS] int NOT NULL,
    [edc_tDateStart] datetime2(3) CONSTRAINT [DF__EventoDel__edc_t__0BCD1EF6] DEFAULT (sysdatetime()) NOT NULL,
    [edc_tDateEnd] datetime2(3) NOT NULL,
    [edc_cStatus] varchar(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [edc_cMessage] nvarchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_EventoDeleteControl] PRIMARY KEY CLUSTERED ([edc_id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_EDC_DateStart_Status] ON [dbo].[EventoDeleteControl] ([edc_cProcessType] ASC, [edc_cPeriodo] ASC, [edc_iAffectedRecords] ASC, [edc_tDateStart] ASC, [edc_cStatus] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_EDC_Periodo_ProcessType] ON [dbo].[EventoDeleteControl] ([edc_cPeriodo] ASC, [edc_cProcessType] ASC, [edc_cStatus] ASC);
GO
