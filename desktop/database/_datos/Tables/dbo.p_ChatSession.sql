IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_ChatSession] (
    [chs_idKey] int NOT NULL,
    [chs_createDate] datetime CONSTRAINT [DF_p_ChatSession_chs_createDate] DEFAULT (getdate()) NOT NULL,
    [chs_lastModification] datetime CONSTRAINT [DF_p_ChatSession_chs_lastModification] DEFAULT (getdate()) NOT NULL,
    [chs_reciid] int NOT NULL,
    [chs_name] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [chs_status] int CONSTRAINT [DF_Table_1_chas_status] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_p_ChatSession] PRIMARY KEY CLUSTERED ([chs_idKey] ASC)
);
GO
