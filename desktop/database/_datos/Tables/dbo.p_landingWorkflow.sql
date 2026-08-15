IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_landingWorkflow] (
    [plw_idkey] int NOT NULL,
    [plw_token] varchar(255) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_landingWorkflow_plw_token] DEFAULT (newid()) NOT NULL,
    [plw_date] datetime CONSTRAINT [DF_p_landingWorkflow_plw_date] DEFAULT (getdate()) NOT NULL,
    [plw_status] int CONSTRAINT [DF_p_landingWorkflow_plw_status] DEFAULT ((0)) NOT NULL,
    [plw_metadata] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plw_email] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plw_imei] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plw_iniciador] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sp_idSmartPanic] int NOT NULL,
    [sp_id_suscriptions] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_landingWorkflow] PRIMARY KEY CLUSTERED ([plw_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_p_landingWorkflow_Imei] ON [dbo].[p_landingWorkflow] ([plw_imei] ASC);
GO

CREATE NONCLUSTERED INDEX [NonClusteredIndex-20221103-122444] ON [dbo].[p_landingWorkflow] ([plw_token] ASC);
GO
