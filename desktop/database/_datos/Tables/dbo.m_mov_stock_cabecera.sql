IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_mov_stock_cabecera] (
    [msc_iid] int NOT NULL,
    [msc_dFecha] datetime CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_dFecha] DEFAULT ('') NOT NULL,
    [msc_cTipoMov] char(1) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_cTipoMov] DEFAULT ('') NOT NULL,
    [msc_cComp_Tipo] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_cComp_Tipo] DEFAULT ('') NOT NULL,
    [msc_cComp_Numero] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_iComp_Numero] DEFAULT ((0)) NOT NULL,
    [msc_cDeposito] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_cDeposito] DEFAULT ('') NOT NULL,
    [msc_cTecnico] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_cTecnico] DEFAULT ('') NOT NULL,
    [msc_mObservaciones] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Mov_Stock_Cabecera_msc_mObservaciones] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_mov_stock_cabecera] PRIMARY KEY CLUSTERED ([msc_iid] ASC)
);
GO
