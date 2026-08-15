IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MP_Facturas_History] (
    [id] bigint NOT NULL,
    [type] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [date_created] datetime NOT NULL,
    [last_modified] datetime NOT NULL,
    [suscription_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plan_name] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [currency_id] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [transaction_amount] decimal(16,2) NOT NULL,
    [status] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [payment_status] varchar(250) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [payment_gateway] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [meta_data] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [fecha_modificacion] datetime CONSTRAINT [DF_MP_Facturas_History_fecha_modificacion] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_MP_Facturas_History] PRIMARY KEY CLUSTERED ([id] ASC)
);
GO
