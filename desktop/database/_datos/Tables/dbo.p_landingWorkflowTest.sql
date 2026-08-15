IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_landingWorkflowTest] (
    [id] int NOT NULL,
    [plw_date] datetime NOT NULL,
    [plw_status] int NOT NULL,
    [plw_metaData] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plw_email] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plw_imei] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plw_iniciador] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sp_idSmartPanic] int NOT NULL,
    CONSTRAINT [PK_p_landingWorkflowTest] PRIMARY KEY CLUSTERED ([id] ASC)
);
GO
