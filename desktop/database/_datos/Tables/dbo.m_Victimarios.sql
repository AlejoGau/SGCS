IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_Victimarios] (
    [vic_idKey] int NOT NULL,
    [vic_cApellido] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cApellido] DEFAULT ('') NOT NULL,
    [vic_cNombre] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cNombre] DEFAULT ('') NOT NULL,
    [vic_cIdentificacion] nvarchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cIdentificacion] DEFAULT ('') NOT NULL,
    [vic_iRestriccion] int CONSTRAINT [DF_m_Victimarios_vic_cRestriccion] DEFAULT ((0)) NOT NULL,
    [vic_cCalle] nvarchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cCalle] DEFAULT ('') NOT NULL,
    [vic_cCalleNro] nvarchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cCalleNro] DEFAULT ('') NOT NULL,
    [vic_cCallePiso] nvarchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cCallePiso] DEFAULT ('') NOT NULL,
    [vic_cCalleDpto] nvarchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cCalleDpto] DEFAULT ('') NOT NULL,
    [vic_cCodigoPostal] nvarchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cCodigoPostal] DEFAULT ('') NOT NULL,
    [vic_cPartido] nvarchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cPartido] DEFAULT ('') NOT NULL,
    [vic_cLocalidad] nvarchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cLocalidad] DEFAULT ('') NOT NULL,
    [vic_cUbicacion] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_Ubicacion] DEFAULT ('') NOT NULL,
    [vic_cPathPicture] varchar(512) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cPathPicture] DEFAULT ('') NOT NULL,
    [vic_iStatus] int CONSTRAINT [DF_m_Victimarios_vic_iStatus] DEFAULT ((0)) NOT NULL,
    [vic_tFechaAlta] datetime CONSTRAINT [DF_m_Victimarios_vic_tFechaAlta] DEFAULT (getdate()) NOT NULL,
    [vic_iEdad] int CONSTRAINT [DF_m_Victimarios_vic_iEdad] DEFAULT ((0)) NOT NULL,
    [vic_iPeso] int CONSTRAINT [DF_m_Victimarios_vic_iPeso] DEFAULT ((0)) NOT NULL,
    [vic_iAltura] int CONSTRAINT [DF_m_Victimarios_vic_iAltura] DEFAULT ((0)) NOT NULL,
    [vic_iAspectoRaza] int CONSTRAINT [DF_m_Victimarios_vic_iAspectoRaza] DEFAULT ((0)) NOT NULL,
    [vic_iAspectoTez] int CONSTRAINT [DF_m_Victimarios_vic_iAspectoTez] DEFAULT ((0)) NOT NULL,
    [vic_iAspectoContextura] int CONSTRAINT [DF_m_Victimarios_vic_iAspectoContextura] DEFAULT ((0)) NOT NULL,
    [vic_iCabelloTipo] int CONSTRAINT [DF_m_Victimarios_vic_iCabelloTipo] DEFAULT ((0)) NOT NULL,
    [vic_iCabelloColor] int CONSTRAINT [DF_m_Victimarios_vic_iCabelloColor] DEFAULT ((0)) NOT NULL,
    [vic_iCabelloEstilo] int CONSTRAINT [DF_m_Victimarios_vic_iCabelloEstilo] DEFAULT ((0)) NOT NULL,
    [vic_iRostroForma] int CONSTRAINT [DF_m_Victimarios_vic_iRostroForma] DEFAULT ((0)) NOT NULL,
    [vic_iOjosForma] int CONSTRAINT [DF_m_Victimarios_vic_iOjosForma] DEFAULT ((0)) NOT NULL,
    [vic_iOjosColor] int CONSTRAINT [DF_m_Victimarios_vic_iOjosColor] DEFAULT ((0)) NOT NULL,
    [vic_iNarizFrente] int CONSTRAINT [DF_m_Victimarios_vic_iNarizFrente] DEFAULT ((0)) NOT NULL,
    [vic_iNarizPerfil] int CONSTRAINT [DF_m_Victimarios_vic_iNarizPerfil] DEFAULT ((0)) NOT NULL,
    [vic_iNarizSize] int CONSTRAINT [DF_m_Victimarios_vic_iNarizSize] DEFAULT ((0)) NOT NULL,
    [vic_iBocaLabios] int CONSTRAINT [DF_m_Victimarios_vic_iBocaLabios] DEFAULT ((0)) NOT NULL,
    [vic_iBocaSize] int CONSTRAINT [DF_m_Victimarios_vic_iBocaSize] DEFAULT ((0)) NOT NULL,
    [vic_iMentonForma] int CONSTRAINT [DF_m_Victimarios_vic_iMentonForma] DEFAULT ((0)) NOT NULL,
    [vic_iOrejasForma] int CONSTRAINT [DF_m_Victimarios_vic_iOrejasForma] DEFAULT ((0)) NOT NULL,
    [vic_iOrejasSize] int CONSTRAINT [DF_m_Victimarios_vic_iOrejasSize] DEFAULT ((0)) NOT NULL,
    [vic_iCejasForma] int CONSTRAINT [DF_m_Victimarios_vic_iCejasForma] DEFAULT ((0)) NOT NULL,
    [vic_iCejasSize] int CONSTRAINT [DF_m_Victimarios_vic_iCejasSize] DEFAULT ((0)) NOT NULL,
    [vic_iPilosidadTipo] int CONSTRAINT [DF_m_Victimarios_vic_iPilosidadTipo] DEFAULT ((0)) NOT NULL,
    [vic_iPilosidadForma] int CONSTRAINT [DF_m_Victimarios_vic_iPilosidadForma] DEFAULT ((0)) NOT NULL,
    [vic_cObservaciones] nvarchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cObservaciones] DEFAULT ('') NOT NULL,
    [vic_cCaractSocial] nvarchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cCaractSocial] DEFAULT ('') NOT NULL,
    [vic_cAdicciones] nvarchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_Victimarios_vic_cAdicciones] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_Victimarios] PRIMARY KEY CLUSTERED ([vic_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_VictimariosSearchDNI] ON [dbo].[m_Victimarios] ([vic_idKey] ASC, [vic_cApellido] ASC, [vic_cNombre] ASC, [vic_cIdentificacion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_VictimariosSearchLoc] ON [dbo].[m_Victimarios] ([vic_idKey] ASC, [vic_cApellido] ASC, [vic_cNombre] ASC, [vic_cLocalidad] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_VictimariosSearchName] ON [dbo].[m_Victimarios] ([vic_idKey] ASC, [vic_cApellido] ASC, [vic_cNombre] ASC);
GO
