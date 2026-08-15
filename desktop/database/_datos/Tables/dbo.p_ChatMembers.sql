IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_ChatMembers] (
    [chm_idKey] int NOT NULL,
    [chm_objectType] int NOT NULL,
    [chm_objectId] int NOT NULL,
    [chm_status] int CONSTRAINT [DF_p_ChatMembers_chm_status] DEFAULT ((1)) NOT NULL,
    [chm_isAdmin] int CONSTRAINT [DF_p_ChatMembers_chm_isAdmin] DEFAULT ((0)) NOT NULL,
    [chm_chatid] int CONSTRAINT [DF_p_ChatMembers_chm_chatid] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_ChatMembers] PRIMARY KEY CLUSTERED ([chm_idKey] ASC)
);
GO
