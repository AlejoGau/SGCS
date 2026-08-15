IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_tolerancia] (
    [tol_iidcuenta] int NOT NULL,
    [tol_naperturaantes] smallint CONSTRAINT [DF_m_horarios_tolerancia_tol_naperturaantes] DEFAULT ((1)) NOT NULL,
    [tol_caperturaantesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_tol_caperturaantesalarma] DEFAULT ('') NOT NULL,
    [tol_naperturadespues] smallint CONSTRAINT [DF_m_horarios_tolerancia_tol_naperturadespues] DEFAULT ((1)) NOT NULL,
    [tol_caperturadespuesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_tol_caperturadespuesalarma] DEFAULT ('') NOT NULL,
    [tol_ncierreantes] smallint CONSTRAINT [DF_m_horarios_tolerancia_tol_ncierreantes] DEFAULT ((1)) NOT NULL,
    [tol_ccierreantesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_tol_ccierreantesalarma] DEFAULT ('') NOT NULL,
    [tol_ncierredespues] smallint CONSTRAINT [DF_m_horarios_tolerancia_tol_ncierredespues] DEFAULT ((1)) NOT NULL,
    [tol_ccierredespuesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_tol_ccierredespuesalarma] DEFAULT ('') NOT NULL,
    [tol_nnyo] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_tol_nnyo] DEFAULT ((1)) NOT NULL,
    [tol_nnyc] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_tol_nnyc] DEFAULT ((1)) NOT NULL,
    [tol_nControl] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_tol_nControl] DEFAULT ((2)) NOT NULL,
    [tol_nModo] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_tol_nModo] DEFAULT ((0)) NOT NULL,
    [tol_nAPNYO] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_tol_nAPNYO] DEFAULT ((2)) NOT NULL,
    [tol_nAPNYC] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_tol_nAPNYC] DEFAULT ((2)) NOT NULL,
    [tol_dVacacionesDesde] datetime NOT NULL,
    [tol_dVacacionesHasta] datetime NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_HTolCtaInclude] ON [dbo].[m_horarios_tolerancia] ([tol_naperturaantes] ASC, [tol_caperturaantesalarma] ASC, [tol_naperturadespues] ASC, [tol_caperturadespuesalarma] ASC, [tol_ncierreantes] ASC, [tol_ccierreantesalarma] ASC, [tol_ncierredespues] ASC, [tol_ccierredespuesalarma] ASC, [tol_nModo] ASC, [tol_dVacacionesDesde] ASC, [tol_dVacacionesHasta] ASC, [tol_iidcuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_horarios_tolerancia_NmodoIN] ON [dbo].[m_horarios_tolerancia] ([tol_caperturaantesalarma] ASC, [tol_caperturadespuesalarma] ASC, [tol_nControl] ASC, [tol_dVacacionesDesde] ASC, [tol_dVacacionesHasta] ASC, [tol_nModo] ASC);
GO

CREATE CLUSTERED INDEX [PK_m_horarios_tolerancia] ON [dbo].[m_horarios_tolerancia] ([tol_iidcuenta] ASC);
GO
