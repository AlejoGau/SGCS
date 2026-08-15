IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_tst_prueba] (
    [tst_iidcuenta] int NOT NULL,
    [tst_ncada] numeric(4,0) CONSTRAINT [DF_m_tst_prueba_tst_ncada] DEFAULT ((0)) NOT NULL,
    [tst_ntipo] numeric(1,0) CONSTRAINT [DF_m_tst_prueba_tst_ntipo] DEFAULT ((0)) NOT NULL,
    [tst_ireinicio] int CONSTRAINT [DF_m_tst_prueba_tst_ireinicio] DEFAULT ((0)) NOT NULL,
    [tst_calarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_calarma] DEFAULT ('') NOT NULL,
    [tst_ncada2] numeric(4,0) CONSTRAINT [DF_m_tst_prueba_tst_ncada2] DEFAULT ((0)) NOT NULL,
    [tst_ntipo2] numeric(1,0) CONSTRAINT [DF_m_tst_prueba_tst_ntipo2] DEFAULT ((0)) NOT NULL,
    [tst_calarmaesperada] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_calarmaesperada] DEFAULT ('') NOT NULL,
    [tst_calarmagenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_calarmagenerar] DEFAULT ('') NOT NULL,
    [tst_ncada3] numeric(4,0) CONSTRAINT [DF_m_tst_prueba_tst_ncada3] DEFAULT ((0)) NOT NULL,
    [tst_ntipo3] numeric(1,0) CONSTRAINT [DF_m_tst_prueba_tst_ntipo3] DEFAULT ((0)) NOT NULL,
    [tst_calarma3esperada] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_calarma3esperada] DEFAULT ('') NOT NULL,
    [tst_calarma3generar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_calarma3generar] DEFAULT ('') NOT NULL,
    [tst_cAlarmaAutoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_cAlarmaAutoprocesa] DEFAULT ('') NOT NULL,
    [tst_cAlarma2Autoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_cAlarma2Autoprocesa] DEFAULT ('') NOT NULL,
    [tst_cAlarma3Autoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_cAlarma3Autoprocesa] DEFAULT ('') NOT NULL,
    [tst_iTiempoCtrl] int CONSTRAINT [DF_m_tst_prueba_tst_iTiempoCtrl] DEFAULT ((0)) NOT NULL,
    [tst_cAlarmaCtrlGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_tst_prueba_tst_cAlarmaCtrlGenerar] DEFAULT ('') NOT NULL,
    [tst_iCtrlExec] int CONSTRAINT [DF_m_tst_prueba_tst_iCtrlExec] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_tst_prueba] PRIMARY KEY CLUSTERED ([tst_iidcuenta] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_tst_prueba_IctrlexecItiempoctrlIN] ON [dbo].[m_tst_prueba] ([tst_cAlarmaCtrlGenerar] ASC, [tst_iCtrlExec] ASC, [tst_iTiempoCtrl] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TST_3] ON [dbo].[m_tst_prueba] ([tst_iidcuenta] ASC, [tst_ntipo3] ASC, [tst_cAlarmaAutoprocesa] ASC, [tst_ncada3] ASC, [tst_calarma3generar] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TST_Alarma] ON [dbo].[m_tst_prueba] ([tst_iidcuenta] ASC, [tst_calarma] ASC);
GO
