IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosEnAutoProceso] (
    [eap_idKey] int NOT NULL,
    [eap_iRecID] int NOT NULL,
    [eap_cAlarmaAutoprocesa] varchar(300) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_EventosEnAutoProceso] PRIMARY KEY CLUSTERED ([eap_iRecID] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosEnAutoProceso_AlarmaAP] ON [dbo].[EventosEnAutoProceso] ([eap_iRecID] ASC, [eap_cAlarmaAutoprocesa] ASC);
GO
