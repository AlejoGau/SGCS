IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VigicontrolUserSessions] (
    [vus_idkey] int NOT NULL,
    [vus_iusuario] int NOT NULL,
    [vus_idcuenta] int NOT NULL,
    [vus_dlogin] datetime NOT NULL,
    [vus_dlogout] datetime NOT NULL,
    [vus_login_idrec] int NOT NULL,
    [vus_logout_idrec] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [IX_VUS_login_idrec_idkey] ON [dbo].[VigicontrolUserSessions] ([vus_login_idrec] ASC, [vus_idkey] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_VigicontrolUserSessions_DlogoutDlogin] ON [dbo].[VigicontrolUserSessions] ([vus_dlogout] ASC, [vus_dlogin] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_VUS_general] ON [dbo].[VigicontrolUserSessions] ([vus_idkey] ASC, [vus_dlogout] ASC, [vus_login_idrec] ASC, [vus_iusuario] ASC, [vus_idcuenta] ASC, [vus_dlogin] ASC, [vus_logout_idrec] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_VUS_IdRec] ON [dbo].[VigicontrolUserSessions] ([vus_idkey] ASC, [vus_dlogout] ASC, [vus_logout_idrec] ASC, [vus_iusuario] ASC, [vus_idcuenta] ASC, [vus_dlogin] ASC, [vus_login_idrec] ASC);
GO

CREATE CLUSTERED INDEX [PK_VUS_idkey] ON [dbo].[VigicontrolUserSessions] ([vus_idkey] ASC);
GO
