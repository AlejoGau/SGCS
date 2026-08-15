IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_RXtraInfo] (
    [rxt_iId] int NOT NULL,
    [rxt_iRecId] int CONSTRAINT [DF_p_RXtraInfo_rxt_iRecId] DEFAULT ((0)) NOT NULL,
    [rxt_nSPIP] numeric(1,0) CONSTRAINT [DF_p_RXtraInfo_rxt_nSPIP] DEFAULT ((0)) NOT NULL,
    [rxt_nSPSMS] numeric(1,0) CONSTRAINT [DF_p_RXtraInfo_rxt_nSPSMS] DEFAULT ((0)) NOT NULL,
    [rxt_cEvento] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXtraInfo_rxt_cEvento] DEFAULT ('') NOT NULL,
    [rxt_iSecuencia] smallint CONSTRAINT [DF_p_RXtraInfo_rxt_iSecuencia] DEFAULT ((0)) NOT NULL,
    [rxt_cGeoFenceName] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxt_cRoute] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxt_iRouteID] int NOT NULL,
    [rxt_nVCIP] numeric(1,0) CONSTRAINT [DF_p_RXtraInfo_rxt_nVCIP] DEFAULT ((0)) NOT NULL,
    [rxt_nVCSMS] numeric(1,0) CONSTRAINT [DF_p_RXtraInfo_rxt_nVCSMS] DEFAULT ((0)) NOT NULL,
    [rxt_cData] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxt_dFechaHoraProcesaEvento] datetime NOT NULL,
    [rxt_iProceso] int NOT NULL,
    [rxt_iConexion] int NOT NULL,
    [rxt_cimei] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_RXtraInfo] PRIMARY KEY CLUSTERED ([rxt_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_p_RXtraInfo_iRecID] ON [dbo].[p_RXtraInfo] ([rxt_iRecId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_RXtraInfo_IrouteidIN] ON [dbo].[p_RXtraInfo] ([rxt_iRecId] ASC, [rxt_iRouteID] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_RXtraInfo_SP] ON [dbo].[p_RXtraInfo] ([rxt_iRecId] ASC, [rxt_cEvento] ASC, [rxt_iSecuencia] ASC, [rxt_cGeoFenceName] ASC, [rxt_iRouteID] ASC, [rxt_nSPIP] ASC, [rxt_nSPSMS] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_RXtraInfo_VC] ON [dbo].[p_RXtraInfo] ([rxt_iId] ASC, [rxt_cEvento] ASC, [rxt_iSecuencia] ASC, [rxt_cGeoFenceName] ASC, [rxt_iRouteID] ASC, [rxt_iRecId] ASC, [rxt_nVCIP] ASC, [rxt_nVCSMS] ASC);
GO
