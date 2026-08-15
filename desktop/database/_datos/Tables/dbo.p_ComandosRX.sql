IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_ComandosRX] (
    [crx_idKey] int NOT NULL,
    [crx_tFechaHora] datetime CONSTRAINT [DF_p_ComandosRX_crx_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [crx_iCmdId] int CONSTRAINT [DF_p_ComandosRX_crx_iCmdId] DEFAULT ((0)) NOT NULL,
    [crx_iRecId] int CONSTRAINT [DF_p_ComandosRX_crx_iRecId] DEFAULT ((0)) NOT NULL,
    [crx_iStatus] int CONSTRAINT [DF_p_ComandosRX_crx_iStatus] DEFAULT ((0)) NOT NULL,
    [crx_tStatusExec] datetime NOT NULL,
    CONSTRAINT [PK_ComandosRX] PRIMARY KEY CLUSTERED ([crx_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_ComandosRX_IdCmd] ON [dbo].[p_ComandosRX] ([crx_iCmdId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_ComandosRXFecha] ON [dbo].[p_ComandosRX] ([crx_iCmdId] ASC, [crx_tFechaHora] ASC, [crx_iStatus] ASC);
GO
