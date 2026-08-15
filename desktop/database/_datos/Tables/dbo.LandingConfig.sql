IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[LandingConfig] (
    [lcfg_iid] int NOT NULL,
    [lcfg_cname] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [lcfg_ccontent] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [lcfg_cdealer] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_Landing_config] PRIMARY KEY CLUSTERED ([lcfg_iid] ASC)
);
GO
