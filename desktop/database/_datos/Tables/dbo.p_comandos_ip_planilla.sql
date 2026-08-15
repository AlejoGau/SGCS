IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_comandos_ip_planilla] (
    [cmd_iidpla] int CONSTRAINT [DF_p_comandos_ip_planilla_cmd_iidpla] DEFAULT ((0)) NOT NULL,
    [cmd_cvalores] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_comandos_ip_planilla_cmd_cvalores] DEFAULT ('') NOT NULL
);
GO
