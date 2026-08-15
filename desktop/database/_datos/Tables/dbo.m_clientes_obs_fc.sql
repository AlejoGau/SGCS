IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_clientes_obs_fc] (
    [obs_icodigo_ID] int NOT NULL,
    [obs_mObservacion] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [obs_dfechahora] datetime CONSTRAINT [DF_m_clientes_obs_fc_obs_dfechahora] DEFAULT (getdate()) NOT NULL
);
GO
