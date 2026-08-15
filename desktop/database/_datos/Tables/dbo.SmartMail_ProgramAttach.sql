IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMail_ProgramAttach] (
    [Id] int NOT NULL,
    [Name] varchar(2048) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ProgramId] int NOT NULL,
    CONSTRAINT [PK_SmartMail_ProgramAttach] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_Program] ON [dbo].[SmartMail_ProgramAttach] ([ProgramId] ASC);
GO
