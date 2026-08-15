IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_ComprobanteFacturacionContrato] (
    [cfc_idkey] int NOT NULL,
    [cfc_cbcicodigoid] int NOT NULL,
    [cfc_iorganizacionfacturadora] int NOT NULL,
    [cfc_icliente] int NOT NULL,
    [cfc_fecha] date CONSTRAINT [DF_MG_ComprobanteFacturacionContrato_cfc_fecha] DEFAULT (getdate()) NOT NULL,
    [cfc_cntiid] int CONSTRAINT [DF_MG_ComprobanteFacturacionContrato_cfc_cntiid] DEFAULT ((0)) NOT NULL,
    [cfc_userid] int CONSTRAINT [DF_MG_ComprobanteFacturacionContrato_cfc_userid] DEFAULT ((0)) NOT NULL,
    [cfc_cbonificaciontipo] varchar(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cfc_nbonificacionvalor] numeric(18,2) NOT NULL,
    [cfc_ybonificacionimporte] money CONSTRAINT [DF_mg_comprobantefacturacioncontrato_bonif_importe] DEFAULT ((0)) NOT NULL,
    [cfc_nbonificacionpermanente] int CONSTRAINT [DF_mg_comprobantefacturacioncontrato_bonif_perm] DEFAULT ((0)) NOT NULL,
    [cfc_dbonificaciondesde] datetime NOT NULL,
    [cfc_dbonificacionhasta] datetime NOT NULL
);
GO
