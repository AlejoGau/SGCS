IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_Afip_Cae_Ws] (
    [mcw_idkey] int NOT NULL,
    [mcw_macidkey] int NOT NULL,
    [mcw_estado] int NOT NULL,
    [mcw_fecha] datetime NOT NULL,
    [mcw_requesturl] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mcw_requestxml] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mcw_responsexml] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MG_Afip_Cae_Ws] PRIMARY KEY CLUSTERED ([mcw_idkey] ASC)
);
GO
