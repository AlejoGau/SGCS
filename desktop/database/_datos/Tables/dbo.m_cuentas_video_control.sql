IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuentas_video_control] (
    [cvc_idKey] int NOT NULL,
    [cvc_iIdCta] int CONSTRAINT [DF_m_cuentas_video_contro_cvc_iIdCta] DEFAULT ((0)) NOT NULL,
    [cvc_iActivacionTotal] int CONSTRAINT [DF_m_cuentas_video_control_cvc_iActivacionTotal] DEFAULT ((0)) NOT NULL,
    [cvc_cActivacionParcial] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_control_cvc_cActivacionParcial] DEFAULT ('') NOT NULL,
    [cvc_iDesactivacion] int CONSTRAINT [DF_m_cuentas_video_control_iDesactivacion] DEFAULT ((0)) NOT NULL,
    [cvc_iActivacionParcial] int CONSTRAINT [DF_m_cuentas_video_control_cvc_iActivacionParcial] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_cuentas_video_control] PRIMARY KEY CLUSTERED ([cvc_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [UX_m_cuentas_video_control_idCta] ON [dbo].[m_cuentas_video_control] ([cvc_iIdCta] ASC);
GO
