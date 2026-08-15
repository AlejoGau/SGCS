IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_tst_pruebaCopia] (
    [tst_iidcuenta] int NOT NULL,
    [tst_ncada] numeric(4,0) NOT NULL,
    [tst_ntipo] numeric(1,0) NOT NULL,
    [tst_ireinicio] int NOT NULL,
    [tst_calarma] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_ncada2] numeric(4,0) NOT NULL,
    [tst_ntipo2] numeric(1,0) NOT NULL,
    [tst_calarmaesperada] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_calarmagenerar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_ncada3] numeric(4,0) NOT NULL,
    [tst_ntipo3] numeric(1,0) NOT NULL,
    [tst_calarma3esperada] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_calarma3generar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_cAlarmaAutoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_cAlarma2Autoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_cAlarma3Autoprocesa] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_iTiempoCtrl] int NOT NULL,
    [tst_cAlarmaCtrlGenerar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tst_iCtrlExec] int NOT NULL
);
GO
