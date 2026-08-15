IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_VirtualIR] (
    [vir_iId] int NOT NULL,
    [vir_cDll] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_VirtualIR_vir_cDll] DEFAULT ('') NOT NULL,
    [vir_tFechaHora] datetime CONSTRAINT [DF_p_VirtualIR_vir_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [vir_nStatus] numeric(1,0) CONSTRAINT [DF_p_VirtualIR_vir_nStatus] DEFAULT ((0)) NOT NULL,
    [vir_cPackage] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_VirtualIR_vir_cPackage] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_p_VirtualIR] PRIMARY KEY CLUSTERED ([vir_iId] ASC)
);
GO
