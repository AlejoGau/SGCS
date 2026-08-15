IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_Moviles] (
    [mov_iid] int NOT NULL,
    [mov_tfechahora] datetime CONSTRAINT [DF_p_Moviles_mov_tfechahora] DEFAULT (getdate()) NOT NULL,
    [mov_idCuenta] int CONSTRAINT [DF_p_Moviles_mov_idCuenta] DEFAULT ((0)) NOT NULL,
    [mov_idMovil] int CONSTRAINT [DF_p_Moviles_mov_idMovi] DEFAULT ((0)) NOT NULL,
    [mov_idRec] int CONSTRAINT [DF_p_Moviles_mov_idRec] DEFAULT ((0)) NOT NULL,
    [mov_nEstado] numeric(1,0) CONSTRAINT [DF_p_Moviles_mov_nEstado] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_p_Moviles] PRIMARY KEY CLUSTERED ([mov_iid] ASC)
);
GO
