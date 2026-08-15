IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_comandos_ip] (
    [cmd_iid] int NOT NULL,
    [cmd_tfechahora] datetime CONSTRAINT [DF_p_comandos_ip_cmd_tfechahora] DEFAULT (getdate()) NOT NULL,
    [cmd_idCuenta] int CONSTRAINT [DF_p_comandos_ip_cmd_idCuenta] DEFAULT ((0)) NOT NULL,
    [cmd_idReceptor] int CONSTRAINT [DF_p_comandos_ip_cmd_idReceptor] DEFAULT ((0)) NOT NULL,
    [cmd_iComando] int CONSTRAINT [DF_p_comandos_ip_cmd_iComando] DEFAULT ((0)) NOT NULL,
    [cmd_cValores] varchar(500) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_comandos_ip_cmd_cValores] DEFAULT ('') NOT NULL,
    [cmd_nEstado] numeric(1,0) CONSTRAINT [DF_p_comandos_ip_cmd_nEstado] DEFAULT ((1)) NOT NULL,
    [cmd_cObservaciones] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_comandos_ip_cmd_cObservaciones] DEFAULT ('') NOT NULL,
    [cmd_iOperador] int NOT NULL,
    [cmd_tEnvioFechaHora] datetime NOT NULL,
    [cmd_iEsCustom] int CONSTRAINT [DF_p_comandos_ip_cmd_iEsCustom] DEFAULT ((0)) NOT NULL,
    [cmd_cRespuesta] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cmd_cAlarmaGenerar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_comandos_ip] PRIMARY KEY CLUSTERED ([cmd_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_ComandosIP_Get] ON [dbo].[p_comandos_ip] ([cmd_tfechahora] ASC, [cmd_idCuenta] ASC, [cmd_idReceptor] ASC, [cmd_nEstado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_comandos_ip_IdcuentaNestadoIescustomIN] ON [dbo].[p_comandos_ip] ([cmd_idReceptor] ASC, [cmd_iComando] ASC, [cmd_idCuenta] ASC, [cmd_nEstado] ASC, [cmd_iEsCustom] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_comandos_ip_IdreceptorNestadoIescustomIN] ON [dbo].[p_comandos_ip] ([cmd_idCuenta] ASC, [cmd_iComando] ASC, [cmd_idReceptor] ASC, [cmd_nEstado] ASC, [cmd_iEsCustom] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_comandos_ip_NestadoIescustomIN] ON [dbo].[p_comandos_ip] ([cmd_tfechahora] ASC, [cmd_idCuenta] ASC, [cmd_idReceptor] ASC, [cmd_nEstado] ASC, [cmd_iEsCustom] ASC);
GO
