IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMailSender] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AccountName] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PopServer] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PopPort] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PortSsh] int NOT NULL,
    [SmtpServer] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [SmtpPort] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [SmtpSsh] int NOT NULL,
    [Signature] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_SmartMailSender] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
