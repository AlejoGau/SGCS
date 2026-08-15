IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_InfoDxRadial] (
    [idr_iid] int NOT NULL,
    [idr_tfechahora] datetime CONSTRAINT [DF_p_InfoDxRadial_idr_tfechahora] DEFAULT (getdate()) NOT NULL,
    [idr_idCuenta] int CONSTRAINT [DF_p_InfoDxRadial_idr_idCuenta] DEFAULT ((0)) NOT NULL,
    [idr_cNroRXRadial] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_InfoDxRadial_idr_cNroRXRadial] DEFAULT ('0') NOT NULL,
    [idr_cNroPaqRadial] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_InfoDxRadial_idr_cNroPaqRadial] DEFAULT ('0') NOT NULL,
    [idr_cSenial] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_InfoDxRadial_idr_cSenial] DEFAULT ('0') NOT NULL,
    [idr_cOrigen] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_InfoDxRadial_idr_cOrigen] DEFAULT ('0') NOT NULL,
    [idr_cSaltos] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_InfoDxRadial_idr_cSaltos] DEFAULT ('0') NOT NULL,
    [idr_cDestino] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_InfoDxRadial_idr_cDestino] DEFAULT ('0') NOT NULL,
    CONSTRAINT [PK_p_InfoDxRadial] PRIMARY KEY CLUSTERED ([idr_iid] ASC)
);
GO
