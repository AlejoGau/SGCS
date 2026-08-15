IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_paneles] (
    [pan_iidcuenta] int NOT NULL,
    [pan_ccodigo] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_ccodigo] DEFAULT ('') NOT NULL,
    [pan_mubicacion] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_mubicacion] DEFAULT ('') NOT NULL,
    [pan_ccallerid1] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_ccallerid1] DEFAULT ('') NOT NULL,
    [pan_ccallerid2] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_ccallerid2] DEFAULT ('') NOT NULL,
    [pan_ccallerid3] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_ccallerid3] DEFAULT ('') NOT NULL,
    [pan_ccallerid4] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_ccallerid4] DEFAULT ('') NOT NULL,
    [pan_ccallerid5] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_ccallerid5] DEFAULT ('') NOT NULL,
    [pan_nmostrar] numeric(1,0) CONSTRAINT [DF_m_paneles_pan_nmostrar] DEFAULT ((0)) NOT NULL,
    [pan_csender] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_csender] DEFAULT ('') NOT NULL,
    [pan_idKey] int NOT NULL,
    [pan_cNroSim1] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cNroSim1] DEFAULT ('') NOT NULL,
    [pan_cCompania1] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cCompania1] DEFAULT ('') NOT NULL,
    [pan_cNroSim2] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cNroSim2] DEFAULT ('') NOT NULL,
    [pan_cCompania2] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cCompania2] DEFAULT ('') NOT NULL,
    [pan_cGPRS] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cGPRS] DEFAULT ('') NOT NULL,
    [pan_cRemoteIP] varchar(15) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cRemoteIP] DEFAULT ('') NOT NULL,
    [pan_iRemotePort] int CONSTRAINT [DF_m_paneles_pan_iRemotePort] DEFAULT ((0)) NOT NULL,
    [pan_iReceptor] int CONSTRAINT [DF_m_paneles_pan_iReceptor] DEFAULT ((0)) NOT NULL,
    [pan_cConfig] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pan_rpmidKey] int CONSTRAINT [DF_m_paneles_pan_rpmidKey] DEFAULT ((0)) NOT NULL,
    [pan_iTipoCom] int CONSTRAINT [DF_m_paneles_pan_iTipoCom] DEFAULT ((0)) NOT NULL,
    [pan_cClavePanel] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_paneles_pan_cClavePanel] DEFAULT ('') NOT NULL,
    [pan_cModemSMS] int CONSTRAINT [DF_m_paneles_pan_cModemSMS] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_paneles] PRIMARY KEY CLUSTERED ([pan_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_CuentaCodigo_MPaneles] ON [dbo].[m_paneles] ([pan_ccodigo] ASC, [pan_iidcuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_CuentaGPRS_MPaneles] ON [dbo].[m_paneles] ([pan_cGPRS] ASC, [pan_iidcuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_CuentaIdKey_MPaneles] ON [dbo].[m_paneles] ([pan_rpmidKey] ASC, [pan_iidcuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_paneles] ON [dbo].[m_paneles] ([pan_idKey] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_paneles_RpmidkeyIN] ON [dbo].[m_paneles] ([pan_iidcuenta] ASC, [pan_cConfig] ASC, [pan_rpmidKey] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Update_MPaneles] ON [dbo].[m_paneles] ([pan_iRemotePort] ASC, [pan_cRemoteIP] ASC, [pan_iidcuenta] ASC);
GO
