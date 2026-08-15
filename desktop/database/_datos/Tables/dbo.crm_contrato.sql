IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[crm_contrato] (
    [cnt_iid] int NOT NULL,
    [cnt_org_fc] int NOT NULL,
    [cnt_idcliente] int NOT NULL,
    [cnt_fechaalta] datetime NOT NULL,
    [cnt_fechavto] datetime CONSTRAINT [DF_crm_contrato_cnt_fechavto] DEFAULT ('20990101 00:00:00') NOT NULL,
    [cnt_formapago] int NOT NULL,
    [cnt_metadata] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cnt_estado] int NOT NULL,
    [cnt_tmp_id] int NOT NULL,
    [cnt_dinamico] int NOT NULL,
    [cnt_cantidad_auto] int CONSTRAINT [DF__crm_contr__cnt_c__1729C309] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_crm_contrato] PRIMARY KEY CLUSTERED ([cnt_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NonClusteredIndex-Cliente-Estado] ON [dbo].[crm_contrato] ([cnt_idcliente] ASC, [cnt_estado] ASC);
GO
