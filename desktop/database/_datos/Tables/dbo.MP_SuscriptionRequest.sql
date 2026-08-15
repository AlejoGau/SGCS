IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MP_SuscriptionRequest] (
    [id] int NOT NULL,
    [fecha] datetime NOT NULL,
    [token] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mail] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [preapproval_plan_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [reason] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [external_reference] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [payer_email] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [card_token_id] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [back_url] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [status] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [estado] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [message] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [code] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MP_SuscriptionRequest] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_MP_SuscriptionRequest_MP_SuscriptionRequest] FOREIGN KEY ([id]) REFERENCES [dbo].[MP_SuscriptionRequest] ([id])
);
GO
