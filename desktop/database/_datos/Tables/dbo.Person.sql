IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Person] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [LastName] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Address] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [State] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Country] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PostalCode] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [HomePhone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MobilePhone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [BusinessPhone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Email] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Web] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Birthday] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [JobTitle] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Company] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Email2] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Occupation] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [XId] int NOT NULL,
    [MobileCompany] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [City] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Location] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AddressLat] decimal(14,6) NOT NULL,
    [AddressLong] decimal(14,6) NOT NULL,
    [Skype] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Facebook] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Linkedin] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Twitter] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
