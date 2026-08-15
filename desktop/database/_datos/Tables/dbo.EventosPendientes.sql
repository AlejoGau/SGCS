IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosPendientes] (
    [evp_idKey] int NOT NULL,
    [rec_iid] int NOT NULL,
    [rec_iidCuenta] int NOT NULL,
    [rec_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosPendientes_rec_cAlarma] DEFAULT ('') NOT NULL,
    [rec_cZona] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosPendientes_rec_cZona] DEFAULT ('') NOT NULL,
    [rec_iUsuario] int CONSTRAINT [DF_EventosPendientes_rec_iUsuario] DEFAULT ((0)) NOT NULL,
    [rec_nEstado] numeric(1,0) CONSTRAINT [DF_EventosPendientes_rec_nEstado] DEFAULT ((0)) NOT NULL,
    [rec_nOrigen] numeric(1,0) CONSTRAINT [DF_EventosPendientes_rec_nOrigen] DEFAULT ((1)) NOT NULL,
    [rec_cContenido] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_tFechaHora] datetime CONSTRAINT [DF_EventosPendientes_rec_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [rec_tFechaRecepcion] datetime NOT NULL,
    [rec_tFechaProceso] datetime NOT NULL,
    [rec_iOperador] int NOT NULL,
    [rec_cObservaciones] ntext COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_cTerminal] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_idResolucion] nchar(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_idReceptor] int NOT NULL,
    [rec_cCategorizacion] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_iNYR] int NOT NULL,
    [rec_iTE] int NOT NULL,
    [rec_idMap] int NOT NULL,
    [rec_idFwd] int NOT NULL,
    [rec_iMinutosEspera] smallint CONSTRAINT [DF_EventosPendientes_rec_iMinutosEspera] DEFAULT ((1)) NOT NULL,
    [rec_iPuerto] int CONSTRAINT [DF_EventosPendientes_rec_iPuerto] DEFAULT ((0)) NOT NULL,
    [rec_idLoc] int NOT NULL,
    [rec_iPrioridad] smallint NOT NULL,
    [rec_isoFechaHora] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_isoFechaProceso] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_isoFechaRecepcion] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_Origen] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_Puerto] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tsp_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tsp_cPathIcon] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxl_cLog] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxl_cEvento] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cLinkVideo] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cvl_cLinkDSS] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cLinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_nCuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cCalle] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cLocalidad] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cProvincia] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cClave] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cPermiso] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_nParticion] int NOT NULL,
    [cue_ctelefono] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cue_cUbicacion] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [madre_cLinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [madre_nCuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [madre_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cRemoteHostIP] char(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cImagen] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cAlarmaAGenerar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cCodigo] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosPendientes_zon_cCodigo] DEFAULT ('') NOT NULL,
    [zon_cCodigoRestauracion] char(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cDealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cCuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_cListaEmergencia] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_CodigoAlarma] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_mObservacion] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zon_nAutoProcesa] numeric(1,0) CONSTRAINT [DF_EventosPendientes_zon_nAutoProcesa] DEFAULT ((0)) NOT NULL,
    [zon_nMinutosRestauracion] numeric(3,0) CONSTRAINT [DF_EventosPendientes_zon_nMinutosRestauracion] DEFAULT ((0)) NOT NULL,
    [zon_nMostrar] numeric(1,0) CONSTRAINT [DF_EventosPendientes_zon_nMostrar] DEFAULT ((0)) NOT NULL,
    [usu_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_Morosidad] numeric(1,0) CONSTRAINT [DF_EventosPendientes__Morosidad] DEFAULT ((0)) NOT NULL,
    [_NotaTemporal] numeric(1,0) CONSTRAINT [DF_EventosPendientes__NotaTemporal] DEFAULT ((0)) NOT NULL,
    [_SituacionCuenta] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_EventoEnPruebaPorZona] numeric(1,0) CONSTRAINT [DF_EventosPendientes__EventoEnPruebaPorZona] DEFAULT ((0)) NOT NULL,
    [_WorkFlowStatus] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_idOrganizacion] int NOT NULL,
    [cod_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cod_nColor] int NOT NULL,
    [cod_nColorLetra] int NOT NULL,
    [cod_nTipo] int CONSTRAINT [DF_EventosPendientes_cod_nTipo] DEFAULT ((0)) NOT NULL,
    [cod_nLeeSonido] numeric(1,0) CONSTRAINT [DF_EventosPendientes_cod_nLeeSonido] DEFAULT ((0)) NOT NULL,
    [cod_cSonido] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ope_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ope_cLogin] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_cDll] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_nTcpIp] numeric(1,0) CONSTRAINT [DF_EventosPendientes_rec_nTcpIp] DEFAULT ((0)) NOT NULL,
    [rxi_cImg] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxi_cCarpeta] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxi_nEstado] numeric(1,0) CONSTRAINT [DF_EventosPendientes_rxi_nEstado] DEFAULT ((0)) NOT NULL,
    [rxi_cTipo] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosPendientes_rxi_cTipo] DEFAULT ('jpg') NOT NULL,
    [rxi_cConfig] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [res_cCodigo] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [res_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [res_nFalsaAlarma] numeric(1,0) CONSTRAINT [DF_EventosPendientes_res_nFalsaAlarma] DEFAULT ((0)) NOT NULL,
    [res_nEstado] numeric(1,0) CONSTRAINT [DF_EventosPendientes_res_nEstado] DEFAULT ((0)) NOT NULL,
    [cat_cCodigo] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cat_cDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [gps_rLatitud] real NOT NULL,
    [gps_rLongitud] real NOT NULL,
    [sta_nContadorFA] int NOT NULL,
    [fal_nMargen] numeric(3,0) CONSTRAINT [DF_EventosPendientes_fal_nMargen] DEFAULT ((0)) NOT NULL,
    [tip_nTipo] int CONSTRAINT [DF_EventosPendientes_tip_nTipo] DEFAULT ((0)) NOT NULL,
    [cue_cLatLng] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosPendientes_cue_cLatLng] DEFAULT ('0.0,0.0') NOT NULL,
    [sp_rLatitud] real NOT NULL,
    [sp_rLongitud] real NOT NULL,
    [tip_nCondicion] int NOT NULL,
    [_Update] datetime CONSTRAINT [DF_EventosPendientes__Update] DEFAULT (getdate()) NOT NULL,
    [pro_nProceso] int NOT NULL,
    [_ZonaParticion] char(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [_Tagged] int CONSTRAINT [DF_EventosPendientes_Tagged] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_EventosPendientes] PRIMARY KEY CLUSTERED ([evp_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EP_cAlarma] ON [dbo].[EventosPendientes] ([rec_cAlarma] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_cDealerCuenta] ON [dbo].[EventosPendientes] ([cue_cLinea] ASC, [cue_nCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_cResolucion] ON [dbo].[EventosPendientes] ([rec_idResolucion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_cZona] ON [dbo].[EventosPendientes] ([rec_cZona] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_EstadoOrgFecha] ON [dbo].[EventosPendientes] ([rec_iidCuenta] ASC, [rec_cAlarma] ASC, [pro_nProceso] ASC, [rec_nEstado] ASC, [_idOrganizacion] ASC, [rec_tFechaHora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_idCuenta] ON [dbo].[EventosPendientes] ([rec_iidCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_iID] ON [dbo].[EventosPendientes] ([rec_iid] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_iOperador] ON [dbo].[EventosPendientes] ([rec_iOperador] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_iPrioridad] ON [dbo].[EventosPendientes] ([rec_iPrioridad] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_iUsuario] ON [dbo].[EventosPendientes] ([rec_iUsuario] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_nEstado] ON [dbo].[EventosPendientes] ([rec_nEstado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_nOrigen] ON [dbo].[EventosPendientes] ([rec_nOrigen] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_Organizacion] ON [dbo].[EventosPendientes] ([evp_idKey] ASC, [rec_iidCuenta] ASC, [cue_cLinea] ASC, [_idOrganizacion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EP_tFechaHora] ON [dbo].[EventosPendientes] ([rec_tFechaHora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosPendientes_IidcuentaIN] ON [dbo].[EventosPendientes] ([rec_tFechaHora] ASC, [rec_tFechaRecepcion] ASC, [cod_cDescripcion] ASC, [rec_iidCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosPendientes_NestadoIN] ON [dbo].[EventosPendientes] ([rec_iid] ASC, [rec_iidCuenta] ASC, [rec_cAlarma] ASC, [rec_tFechaHora] ASC, [rec_tFechaRecepcion] ASC, [rec_iOperador] ASC, [rec_iPrioridad] ASC, [cue_cLinea] ASC, [cue_nCuenta] ASC, [cue_cNombre] ASC, [_idOrganizacion] ASC, [cod_cDescripcion] ASC, [rec_nEstado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosPendientes_NestadoNcuentaTfechahora] ON [dbo].[EventosPendientes] ([rec_nEstado] ASC, [cue_nCuenta] ASC, [rec_tFechaHora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosPendientes_NestadoTfechahoraIN] ON [dbo].[EventosPendientes] ([rec_iidCuenta] ASC, [rec_cAlarma] ASC, [pro_nProceso] ASC, [rec_nEstado] ASC, [rec_tFechaHora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosPendientes_pro_nproceso] ON [dbo].[EventosPendientes] ([evp_idKey] ASC, [rec_iid] ASC, [rec_tFechaProceso] ASC, [rec_iOperador] ASC, [pro_nProceso] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosPendientes_TaggedNestadoIN] ON [dbo].[EventosPendientes] ([rec_iid] ASC, [rec_cAlarma] ASC, [cue_cLinea] ASC, [gps_rLatitud] ASC, [gps_rLongitud] ASC, [cue_cLatLng] ASC, [_Tagged] ASC, [rec_nEstado] ASC);
GO
