IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_medical_info] (
    [mnf_iidcuenta] int CONSTRAINT [DF_m_medical_info_mnf_iidcuenta] DEFAULT ((0)) NOT NULL,
    [mnf_iid] int CONSTRAINT [DF_m_medical_info_mnf_iid] DEFAULT ((0)) NOT NULL,
    [mnf_cprotegido] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_medical_info_mnf_cprotegido] DEFAULT ('') NOT NULL,
    [mnf_cdoctor] char(4) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_medical_info_mnf_cdoctor] DEFAULT ('') NOT NULL,
    [mnf_cobrasocial] char(4) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_medical_info_mnf_cobrasocial] DEFAULT ('') NOT NULL,
    [mnf_nsexo] numeric(1,0) CONSTRAINT [DF_m_medical_info_mnf_nsexo] DEFAULT ((0)) NOT NULL,
    [mnf_ndiscapacitado] numeric(1,0) CONSTRAINT [DF_m_medical_info_mnf_ndiscapacitado] DEFAULT ((0)) NOT NULL,
    [mnf_nambulancia] numeric(1,0) CONSTRAINT [DF_m_medical_info_mnf_nambulancia] DEFAULT ((0)) NOT NULL,
    [mnf_nvivesolo] numeric(1,0) CONSTRAINT [DF_m_medical_info_mnf_nvivesolo] DEFAULT ((0)) NOT NULL,
    [mnf_dfechanacimiento] datetime NOT NULL,
    [mnf_nedad] int CONSTRAINT [DF_m_medical_info_mnf_nedad] DEFAULT ((0)) NOT NULL,
    [mnf_tobservaciones] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_medical_info_mnf_tobservaciones] DEFAULT ('') NOT NULL,
    [mnf_casociado] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_medical_info_mnf_casociado] DEFAULT ('') NOT NULL,
    [mnf_idKey] int NOT NULL,
    CONSTRAINT [PK_m_medical_info] PRIMARY KEY NONCLUSTERED ([mnf_idKey] ASC)
);
GO

CREATE CLUSTERED INDEX [idcuenta] ON [dbo].[m_medical_info] ([mnf_iidcuenta] ASC, [mnf_iid] ASC);
GO
