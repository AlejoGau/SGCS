IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Message] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Body] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime NOT NULL,
    [DateRead] datetime NOT NULL,
    [FromTypeId] int NOT NULL,
    [FromId] int NOT NULL,
    [ToTypeId] int NOT NULL,
    [ToId] int NOT NULL,
    [MessageType] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_Message_Status] DEFAULT ((0)) NOT NULL,
    [Customdata] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [EventoID] int CONSTRAINT [DF_Message_EventoID] DEFAULT ((0)) NOT NULL,
    [CuentaID] int CONSTRAINT [DF_Message_CuentaID] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_Message_EventoiCuentai] ON [dbo].[Message] ([EventoID] ASC, [CuentaID] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Message_Toi] ON [dbo].[Message] ([ToId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Message_ToTypeToIDDate] ON [dbo].[Message] ([Id] ASC, [Name] ASC, [Body] ASC, [DateCreated] ASC, [FromTypeId] ASC, [FromId] ASC, [MessageType] ASC, [Status] ASC, [Customdata] ASC, [EventoID] ASC, [CuentaID] ASC, [ToTypeId] ASC, [ToId] ASC, [DateRead] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_ToIdDateStatus_Message] ON [dbo].[Message] ([ToTypeId] ASC, [ToId] ASC, [DateRead] ASC, [Status] ASC);
GO
