IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VigicontrolUserCurrentSession] (
    [vucs_idkey] int NOT NULL,
    [vucs_usuidkey] int NOT NULL,
    [vucs_cueiid] int NOT NULL,
    [vucs_loginidrec] int NOT NULL,
    [vucs_vcid] int NOT NULL,
    [vucs_token] varchar(255) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_VigicontrolUserCurrentSession_vucs_token] DEFAULT (newid()) NOT NULL,
    [vucs_lastmodification] datetime CONSTRAINT [DF_VigicontrolUserCurrentSession_vucs_lastmodification] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_VigicontrolUserCurrentSession] PRIMARY KEY CLUSTERED ([vucs_idkey] ASC)
);
GO
