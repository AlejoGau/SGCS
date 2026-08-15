IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_dealer_spconfig] (
    [dsp_idKey] int NOT NULL,
    [dsp_cdealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dsp_config] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_dealer_spconfig] PRIMARY KEY CLUSTERED ([dsp_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_SPC_DEALER] ON [dbo].[m_dealer_spconfig] ([dsp_cdealer] ASC);
GO
