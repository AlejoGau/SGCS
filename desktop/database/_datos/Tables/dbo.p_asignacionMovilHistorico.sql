IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_asignacionMovilHistorico] (
    [amh_fechahora] datetime NOT NULL,
    [amh_observacion] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [amh_rec_iid] int NOT NULL,
    [amh_cue_iid] int NOT NULL,
    [amh_idKey] int NOT NULL,
    [amh_amv_objectid] int NOT NULL,
    [amh_amv_objecttypeid] int NOT NULL
);
GO
