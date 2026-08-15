IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_RXImg] (
    [rxi_iId] int NOT NULL,
    [rxi_iRecId] int CONSTRAINT [DF_p_RXImg_rxi_iRecId] DEFAULT ((0)) NOT NULL,
    [rxi_cImg] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXImg_rxi_cImg] DEFAULT ('') NOT NULL,
    [rxi_cCarpeta] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXImg_rxi_cCarpeta] DEFAULT ('') NOT NULL,
    [rxi_nEstado] numeric(1,0) CONSTRAINT [DF_p_RXImg_rxi_nEstado] DEFAULT ((0)) NOT NULL,
    [rxi_cTipo] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXImg_rxi_cTipo] DEFAULT ('jpg') NOT NULL,
    [rxi_cConfig] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_RXImg] PRIMARY KEY CLUSTERED ([rxi_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_RxImg_iRecId] ON [dbo].[p_RXImg] ([rxi_iId] ASC, [rxi_cImg] ASC, [rxi_cCarpeta] ASC, [rxi_nEstado] ASC, [rxi_cTipo] ASC, [rxi_cConfig] ASC, [rxi_iRecId] ASC);
GO
