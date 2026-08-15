IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_SMSqueue] (
    [que_iid] int NOT NULL,
    [que_tfechahora] datetime CONSTRAINT [DF_p_SMSqueue_que_tfechahora] DEFAULT (getdate()) NOT NULL,
    [que_idCuenta] int CONSTRAINT [DF_p_SMSqueue_que_idCuenta] DEFAULT ((0)) NOT NULL,
    [que_iModemSMS] int CONSTRAINT [DF_p_SMSqueue_que_iModemSMS] DEFAULT ((0)) NOT NULL,
    [que_cAsunto] varchar(4000) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_SMSqueue_que_cAsunto] DEFAULT ('') NOT NULL,
    [que_cDestino] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_SMSqueue_que_cDestino] DEFAULT ('') NOT NULL,
    [que_nEstado] numeric(1,0) CONSTRAINT [DF_p_SMSqueue_que_nEstado] DEFAULT ((0)) NOT NULL,
    [que_idCmd] int CONSTRAINT [DF_p_SMSqueue_que_idCmd] DEFAULT ((0)) NOT NULL,
    [que_nRechazo] numeric(2,0) CONSTRAINT [DF_p_SMSqueue_que_nRechazo] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_SMSqueue] PRIMARY KEY CLUSTERED ([que_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_SMSqueue_CtaEstado] ON [dbo].[p_SMSqueue] ([que_idCuenta] ASC, [que_nEstado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SMSqueue_ModemEstado] ON [dbo].[p_SMSqueue] ([que_idCuenta] ASC, [que_iModemSMS] ASC, [que_nEstado] ASC);
GO
