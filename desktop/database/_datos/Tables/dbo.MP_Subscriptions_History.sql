IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MP_Subscriptions_History] (
    [_Id] int NOT NULL,
    [id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [payer_id] int NOT NULL,
    [payer_email] varchar(250) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [status] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plan_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [plan_name] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [external_reference] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [date_created] datetime NOT NULL,
    [last_modified] datetime NOT NULL,
    [auto_recurring_frequency] int NOT NULL,
    [auto_recurring_frequency_type] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [auto_recurring_transaction_amount] decimal(9,2) NOT NULL,
    [auto_recurring_currency_id] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [auto_recurring_start_date] datetime NOT NULL,
    [auto_recurring_end_date] datetime NOT NULL,
    [last_payment_date] datetime NOT NULL,
    [next_payment_date] datetime NOT NULL,
    [payment_method_id] varchar(250) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [card_id] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [payment_gateway] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [meta_data] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [fecha_modificacion] datetime NOT NULL,
    CONSTRAINT [PK_MPSubscriptions_History] PRIMARY KEY CLUSTERED ([_Id] ASC)
);
GO
