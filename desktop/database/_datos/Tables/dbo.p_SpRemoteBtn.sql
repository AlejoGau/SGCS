IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_SpRemoteBtn] (
    [srb_idkey] int NOT NULL,
    [srb_spimei] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [srb_button_uuid] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [srb_action] varchar(64) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_SpRemoteBtn] PRIMARY KEY CLUSTERED ([srb_idkey] ASC)
);
GO
