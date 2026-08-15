IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_dealer_vcconfig_desnormalized] (
    [dealer_idKey] int CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_dealer_idKey] DEFAULT ((0)) NOT NULL,
    [aa_Enabled] int CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_Enabled] DEFAULT ((0)) NOT NULL,
    [aa_eventos] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_eventos] DEFAULT ('') NOT NULL,
    [aa_nearEnabled] int CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_nearEnabled] DEFAULT ((0)) NOT NULL,
    [aa_nearDistance] int CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_nearDistance] DEFAULT ((500)) NOT NULL,
    [aa_categorizacion] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_categorizacion] DEFAULT ('') NOT NULL,
    [aa_resolucion] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_resolucion] DEFAULT ('') NOT NULL,
    [aa_operador] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_dealer_vcconfig_desnormalized_aa_operador] DEFAULT ('oper@sg.com') NOT NULL,
    CONSTRAINT [PK_m_dealer_vcconfig_desnormalized] PRIMARY KEY CLUSTERED ([dealer_idKey] ASC)
);
GO
