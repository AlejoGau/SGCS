IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_st_insumos] (
    [sti_iid_cabecera] int NOT NULL,
    [sti_cproducto] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_st_insumos_sti_cproducto] DEFAULT ('') NOT NULL,
    [sti_ncantidad] numeric(6,0) CONSTRAINT [DF_m_st_insumos_sti_ncantidad] DEFAULT ((0)) NOT NULL
);
GO
