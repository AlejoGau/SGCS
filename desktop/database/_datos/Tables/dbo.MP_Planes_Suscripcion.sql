IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MP_Planes_Suscripcion] (
    [_id] int NOT NULL,
    [id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [name] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [status] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [date_created] datetime NOT NULL,
    [last_change] datetime NOT NULL,
    [currency_code] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [amount] decimal(16,2) NOT NULL,
    [frecuency_type] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [frecuency_unit] int NOT NULL,
    [pay_gateway] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MP_Planes_Suscripcion] PRIMARY KEY CLUSTERED ([_id] ASC)
);
GO
