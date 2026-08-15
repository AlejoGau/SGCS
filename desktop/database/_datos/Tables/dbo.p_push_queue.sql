IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_push_queue] (
    [Id] int NOT NULL,
    [ppq_msg] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ppq_estado] int NOT NULL,
    [ppq_fechacreacion] datetime NOT NULL,
    [ppq_fechaenvio] datetime NOT NULL,
    [ppq_idCuenta] int NOT NULL,
    [ppq_idMessage] int NOT NULL,
    CONSTRAINT [PK_p_push_queue] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
