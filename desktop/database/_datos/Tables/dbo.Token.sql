IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Token] (
    [id] int NOT NULL,
    [ClientId] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [UserId] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Code] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AccessToken] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [UserData] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_Token] PRIMARY KEY CLUSTERED ([id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_Token_AccessToken] ON [dbo].[Token] ([AccessToken] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Token_Code] ON [dbo].[Token] ([Code] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Token_User] ON [dbo].[Token] ([AccessToken] ASC, [UserId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Tokwen_Client_User] ON [dbo].[Token] ([AccessToken] ASC, [ClientId] ASC, [UserId] ASC);
GO
