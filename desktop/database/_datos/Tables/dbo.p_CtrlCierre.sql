IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_CtrlCierre] (
    [ctc_iId] int NOT NULL,
    [ctc_iCta] int CONSTRAINT [DF_p_CtrlCierre_ctc_iCta] DEFAULT ((0)) NOT NULL,
    [ctc_tFechaHora] smalldatetime CONSTRAINT [DF_p_CtrlCierre_ctc_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [ctc_iRecId] int CONSTRAINT [DF_p_CtrlCierre_ctc_iRecId] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [p_CtrlCierrePK] PRIMARY KEY CLUSTERED ([ctc_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_CtrlCierreCta] ON [dbo].[p_CtrlCierre] ([ctc_iCta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_CtrlCierreFecha] ON [dbo].[p_CtrlCierre] ([ctc_tFechaHora] ASC);
GO
