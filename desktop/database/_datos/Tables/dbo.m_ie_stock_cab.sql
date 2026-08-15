IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_ie_stock_cab] (
    [msc_iCodigo_ID] int NOT NULL,
    [msc_dFecha] datetime CONSTRAINT [DF_m_ie_stock_cab_msc_dFecha] DEFAULT (getdate()) NOT NULL,
    [msc_nTipoMov] numeric(1,0) CONSTRAINT [DF_m_ie_stock_cab_msc_nTipoMov] DEFAULT ((0)) NOT NULL,
    [msc_cCbte_Tipo] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_ie_stock_cab_msc_cCbte_Tipo] DEFAULT ('') NOT NULL,
    [msc_cCbte_Numero] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_ie_stock_cab_msc_cCbte_Numero] DEFAULT ('') NOT NULL,
    [msc_mObservaciones] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [msc_iCodigoCbte] int CONSTRAINT [DF_m_ie_stock_cab_msc_iCodigoCbte] DEFAULT ((0)) NOT NULL,
    [msc_cDeposito] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_ie_stock_cab_msc_cDeposito] DEFAULT ('000') NOT NULL,
    CONSTRAINT [PK_m_ie_stock_cab] PRIMARY KEY CLUSTERED ([msc_iCodigo_ID] ASC)
);
GO
