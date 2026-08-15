IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_encuesta_pregunta_respuesta] (
    [epr_idkey] int NOT NULL,
    [epr_epgidkey] int NOT NULL,
    [epr_cvalue] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epr_ivalue] int NOT NULL,
    [epr_cuser] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epr_itipousuario] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epr_cnombreusuario] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epr_cnombrecuenta] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epr_icuenta] int NOT NULL,
    [epr_ctelefono] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epr_enridkey] int NOT NULL,
    CONSTRAINT [PK_p_encuesta_pregunta_respuesta] PRIMARY KEY CLUSTERED ([epr_idkey] ASC)
);
GO
