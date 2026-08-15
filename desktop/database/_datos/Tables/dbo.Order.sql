IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Order] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Email] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Address] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [City] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [State] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Country] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [HomePhone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MobilePhone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ZipCode] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Cuit] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [TotalPrice] decimal(18,2) NOT NULL,
    [Currency] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Description] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime NOT NULL,
    [ClientTypeId] int NOT NULL,
    [ClientId] int NOT NULL,
    [PriceList] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Discount] int NOT NULL,
    [DiscountDescription] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [OwnerTypeId] int NOT NULL,
    [OwnerId] int NOT NULL,
    [VAT] decimal(9,2) NOT NULL,
    [ForecastDate] datetime NOT NULL,
    CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
