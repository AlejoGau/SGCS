IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_tolerancia_planilla] (
    [tol_iid] int NOT NULL,
    [tol_naperturaantes] smallint CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_naperturaantes] DEFAULT ((1)) NOT NULL,
    [tol_caperturaantesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_caperturaantesalarma] DEFAULT ('') NOT NULL,
    [tol_naperturadespues] smallint CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_naperturadespues] DEFAULT ((1)) NOT NULL,
    [tol_caperturadespuesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_caperturadespuesalarma] DEFAULT ('') NOT NULL,
    [tol_ncierreantes] smallint CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_ncierreantes] DEFAULT ((1)) NOT NULL,
    [tol_ccierreantesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_ccierreantesalarma] DEFAULT ('') NOT NULL,
    [tol_ncierredespues] smallint CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_ncierredespues] DEFAULT ((1)) NOT NULL,
    [tol_ccierredespuesalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_ccierredespuesalarma] DEFAULT ('') NOT NULL,
    [tol_nnyo] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_nnyo] DEFAULT ((1)) NOT NULL,
    [tol_nnyc] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_nnyc] DEFAULT ((1)) NOT NULL,
    [tol_nControl] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_nControl] DEFAULT ((2)) NOT NULL,
    [tol_nModo] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_nModo] DEFAULT ((0)) NOT NULL,
    [tol_nAPNYO] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_nAPNYO] DEFAULT ((2)) NOT NULL,
    [tol_nAPNYC] numeric(1,0) CONSTRAINT [DF_m_horarios_tolerancia_planilla_tol_nAPNYC] DEFAULT ((2)) NOT NULL,
    CONSTRAINT [PK_m_horarios_tolerancia_planilla] PRIMARY KEY NONCLUSTERED ([tol_iid] ASC)
);
GO
