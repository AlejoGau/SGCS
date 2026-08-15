IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_asignacion_movil] (
    [amv_idkey] int NOT NULL,
    [amv_objecttypeid] int NOT NULL,
    [amv_objectid] int NOT NULL,
    [amv_rec_iid] int NOT NULL,
    [amv_estado] int NOT NULL,
    [amv_prioridad] int NOT NULL,
    [amv_datecreated] datetime CONSTRAINT [DF_m_asignacion_movil_amv_datecreated] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_m_asignacion_movil] PRIMARY KEY CLUSTERED ([amv_idkey] ASC)
);
GO
