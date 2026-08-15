IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_PadLocks] (
    [pdl_idKey] int NOT NULL,
    [pdl_iRecId] int CONSTRAINT [DF_p_PadLocks_crx_iRecId] DEFAULT ((0)) NOT NULL,
    [pdl_cRequested] nvarchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_cReqObservacion] nvarchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_cReference] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_cLockName] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_cReqMembershipId] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_tReqFechaHora] datetime CONSTRAINT [DF_p_PadLocks_pdl_tReqFechaHora] DEFAULT (getdate()) NOT NULL,
    [pdl_cAuthorized] nvarchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_cAutObservacion] nvarchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pdl_tAutFechaHora] datetime NOT NULL,
    [pdl_rLatitude] real NOT NULL,
    [pdl_rLongitude] real NOT NULL,
    [pdl_iStatus] int CONSTRAINT [DF_p_PadLocks_pdl_iStatus] DEFAULT ((1)) NOT NULL,
    [pdl_tStatusExec] datetime NOT NULL,
    [pdl_cResponse] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_PadLocks] PRIMARY KEY CLUSTERED ([pdl_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_PadLocksReqFechaStatus] ON [dbo].[p_PadLocks] ([pdl_tReqFechaHora] ASC, [pdl_iStatus] ASC);
GO
