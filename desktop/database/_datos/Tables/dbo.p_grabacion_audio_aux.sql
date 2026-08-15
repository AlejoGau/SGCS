IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_grabacion_audio_aux] (
    [graaux_iid] int NOT NULL,
    [graaux_iidgra] int NOT NULL,
    [graaux_cjson] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [graaux_cprotocolo] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_grabacion_audio_aux] PRIMARY KEY CLUSTERED ([graaux_iid] ASC)
);
GO
