IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMail_Program] (
    [Id] int NOT NULL,
    [Name] nvarchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [From] nvarchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Body] ntext COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateStart] datetime NOT NULL,
    [DateEnd] datetime NOT NULL,
    [Count] int NOT NULL,
    [Status] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Query] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [TransportType] varchar(3000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Recurrent] bit NOT NULL,
    [Priority] int CONSTRAINT [DF_SmartMail_Program_Priority] DEFAULT ((0)) NOT NULL,
    [CueIid] int CONSTRAINT [DF_SmartMail_Program_CueIid] DEFAULT (NULL) NOT NULL,
    [RecurrentType] varchar(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [RecurrentTime] int NOT NULL,
    [RecurrentDateEnd] datetime NOT NULL,
    CONSTRAINT [PK_SmartMail_Program] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_SmartMailIdCta] ON [dbo].[SmartMail_Program] ([Id] ASC, [CueIid] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SMP_StatusDate] ON [dbo].[SmartMail_Program] ([Priority] ASC, [Status] ASC, [DateStart] ASC);
GO
