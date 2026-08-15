IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_UsuariosAccesos] (
    [acc_idKey] int NOT NULL,
    [acc_iCtaId] int CONSTRAINT [DF_m_UsuariosAccesos_acc_iCtaId] DEFAULT ((0)) NOT NULL,
    [acc_cIdExtendido] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_UsuariosAccesos_acc_cIdExtendido] DEFAULT ((0)) NOT NULL,
    [acc_iStatus] int CONSTRAINT [DF_m_UsuariosAccesos_acc_iStatus] DEFAULT ((0)) NOT NULL,
    [acc_iUsuIdK] int CONSTRAINT [DF_m_UsuariosAccesos_acc_iUsuIdK] DEFAULT ((0)) NOT NULL,
    [acc_cIdentificacion] varchar(255) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_UsuariosAccesos_acc_cIdentificacion] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_UsuariosAccesos] PRIMARY KEY CLUSTERED ([acc_iCtaId] ASC, [acc_idKey] ASC)
);
GO
