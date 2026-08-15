IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_sgnotes] (
    [sgn_idkey] int NOT NULL,
    [sgn_title] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sgn_body] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sgn_userid] int NOT NULL,
    [sgn_status] int CONSTRAINT [DF_m_sgnotes_sgn_status] DEFAULT ((0)) NOT NULL,
    [sgn_datecreated] datetime CONSTRAINT [DF_m_sgnotes_sgn_datecreated] DEFAULT (getdate()) NOT NULL,
    [sgn_fileduserid] int NOT NULL
);
GO
