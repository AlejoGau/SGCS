IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Organization] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Address] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Country] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [State] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [City] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Zip] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Phone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Mobile] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Fax] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Email] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [NationalTax] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [StateTax] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Account] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Web] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [LegalName] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [EmployeeCount] int NOT NULL,
    [Turnover] decimal(16,2) NOT NULL,
    [Location] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AddressLat] decimal(14,6) NOT NULL,
    [AddressLong] decimal(14,6) NOT NULL,
    [Facebook] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Twitter] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [OrganizationType] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] int NOT NULL,
    [SmallComment] varchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [LargeComment] varchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Body] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Linkedin] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Google] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Currency] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime CONSTRAINT [DF_Organization_DateCreated] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_Organization_Nam] ON [dbo].[Organization] ([Name] ASC);
GO
