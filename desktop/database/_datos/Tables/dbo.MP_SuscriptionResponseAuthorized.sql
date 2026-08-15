IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MP_SuscriptionResponseAuthorized] (
    [id] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [payer_id] int NOT NULL,
    [payer_email] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [back_url] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [collector_id] int NOT NULL,
    [application_id] bigint NOT NULL,
    [status] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [reason] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [external_reference] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [date_created] datetime NOT NULL,
    [last_modified] datetime NOT NULL,
    [init_point] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [preapproval_plan_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [frequency] int NOT NULL,
    [frequency_type] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [transaction_amount] decimal(16,2) NOT NULL,
    [currency_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [start_date] datetime NOT NULL,
    [billing_day] int NOT NULL,
    [billing_day_proportional] bit NOT NULL,
    [has_billing_day] bit NOT NULL,
    [free_trial] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [next_payment_date] datetime NOT NULL,
    [payment_method_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [card_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [first_invoice_offset] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [token] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_SuscriptionResponse] PRIMARY KEY CLUSTERED ([id] ASC)
);
GO
