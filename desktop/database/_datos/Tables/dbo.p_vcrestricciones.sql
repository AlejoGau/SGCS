IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_vcrestricciones] (
    [vcr_idkey] int NOT NULL,
    [vcr_name] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [vcr_list] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [vcr_distance] int CONSTRAINT [DF_p_vcrestricciones_vcr_distance] DEFAULT ((20)) NOT NULL,
    [vcr_status] int CONSTRAINT [DF_p_vcrestricciones_vcr_status] DEFAULT ((1)) NOT NULL,
    [vcr_idorganizacion] int NOT NULL,
    CONSTRAINT [PK_p_vcrestricciones] PRIMARY KEY CLUSTERED ([vcr_idkey] ASC)
);
GO
