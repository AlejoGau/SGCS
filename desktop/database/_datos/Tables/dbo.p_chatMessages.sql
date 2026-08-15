IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_chatMessages] (
    [cms_idKey] int NOT NULL,
    [cms_message] nvarchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cms_status] int NOT NULL,
    [cms_chatId] int NOT NULL,
    [cms_dateCreated] datetime CONSTRAINT [DF_p_chatMessages_cms_dateCreated] DEFAULT (getdate()) NOT NULL,
    [cms_fromObjectType] int NOT NULL,
    [cms_fromObjectId] int NOT NULL,
    CONSTRAINT [PK_p_chatMessages] PRIMARY KEY CLUSTERED ([cms_idKey] ASC)
);
GO
