/****** Object:  StoredProcedure [dbo].[Tables_CodigosAlarmasAll]    Script Date: 01/03/2012 14:14:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_CodigosAlarmasAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_codigos_alarma

GO

/****** Object:  StoredProcedure [dbo].[Tables_DepositoAll]    Script Date: 01/03/2012 14:14:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_DepositoAll]
(
@dep_ccodigo CHAR(3) = null,@dep_cdescripcion CHAR(30) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_depositos
	where 1=0 
	 or (@dep_ccodigo is null or dep_ccodigo like  '%' + @dep_ccodigo + '%') or (@dep_cdescripcion is null or dep_cdescripcion like  '%' + @dep_cdescripcion + '%')
GO

/****** Object:  StoredProcedure [dbo].[Tables_EventosFeriadosAll]    Script Date: 01/03/2012 14:14:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_EventosFeriadosAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_eventos_feriados

GO

/****** Object:  StoredProcedure [dbo].[Tables_InstaladoresAll]    Script Date: 01/03/2012 14:14:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_InstaladoresAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_instaladores
GO

/****** Object:  StoredProcedure [dbo].[Tables_LineasAll]    Script Date: 01/03/2012 14:14:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_LineasAll]
AS
	SET NOCOUNT ON
	
	SELECT lin_ccodigo, lin_ccodigo + ' - ' + lin_crazonsocial AS lin_crazonsocial,lin_ccalle,lin_inumero,lin_npiso,lin_cdepartamento,lin_clocalidad,lin_cprovincia,lin_cestado,lin_ccodigopostal,lin_ctelfono,lin_cfax,lin_cimagen,lin_cusuario,lin_cclave,lin_nacceso,lin_cmail FROM t_lineas
GO

/****** Object:  StoredProcedure [dbo].[Tables_ListasEmergenciaAll]    Script Date: 01/03/2012 14:14:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_ListasEmergenciaAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_listas_emergencia

GO

/****** Object:  StoredProcedure [dbo].[Tables_MedicosAll]    Script Date: 01/03/2012 14:14:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_MedicosAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_medicos
GO

/****** Object:  StoredProcedure [dbo].[Tables_ModemsSmsAll]    Script Date: 01/03/2012 14:14:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_ModemsSmsAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_modems_sms
GO

/****** Object:  StoredProcedure [dbo].[Tables_MovilAll]    Script Date: 01/03/2012 14:14:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_MovilAll]
(
@mov_ccodigo CHAR(3) = null,@mov_cdescripcion CHAR(30) = null,@mov_mobservaciones TEXT = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_moviles
	where 1=0 
	 or (@mov_ccodigo is null or mov_ccodigo like  '%' + @mov_ccodigo + '%') or (@mov_cdescripcion is null or mov_cdescripcion like  '%' + @mov_cdescripcion + '%') or (@mov_mobservaciones is null or mov_mobservaciones like  '%' + cast(@mov_mobservaciones as varchar(256)) + '%')
GO

/****** Object:  StoredProcedure [dbo].[Tables_PanelesAll]    Script Date: 01/03/2012 14:14:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_PanelesAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_paneles

GO

/****** Object:  StoredProcedure [dbo].[Tables_ParametrosAll]    Script Date: 01/03/2012 14:14:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_ParametrosAll]
(@par_ccodigo varchar(30) = null)
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_parametros
	where 1=1 and (@par_ccodigo is null or par_ccodigo like '%' + @par_ccodigo + '%')
GO

/****** Object:  StoredProcedure [dbo].[Tables_PlantillasSmsAll]    Script Date: 01/03/2012 14:14:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Tables_PlantillasSmsAll]
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_plantillas_sms
GO

/****** Object:  StoredProcedure [dbo].[Tables_ProductoAll]    Script Date: 01/03/2012 14:14:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[Tables_ProductoAll]
(
@pro_ccodigo CHAR(3) = null,@pro_cdescripcion CHAR(50) = null,@pro_nstockminimo NUMERIC(6) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_productos
	where 1=0 
	 or (@pro_ccodigo is null or pro_ccodigo like  '%' + @pro_ccodigo + '%') or (@pro_cdescripcion is null or pro_cdescripcion like  '%' + @pro_cdescripcion + '%') 

GO

/****** Object:  StoredProcedure [dbo].[Tables_ProvinciasAll]    Script Date: 01/03/2012 14:14:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_ProvinciasAll]	
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_provincias

GO

/****** Object:  StoredProcedure [dbo].[Tables_TecnicoAll]    Script Date: 01/03/2012 14:14:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[Tables_TecnicoAll]
(
@tec_ccodigo CHAR(3) = null,
@tec_cnombre CHAR(30) = null,
@tec_ctelefono VARCHAR(30) = null,
@tec_cmail VARCHAR(60) = null,
@tec_ningreso NUMERIC(1) = null,
@tec_negreso NUMERIC(1) = null,
@tec_cobservaciones TEXT = null,
@tec_nestado NUMERIC(1) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_tecnicos
	where 1=0 
	 or (@tec_ccodigo is null or tec_ccodigo like  '%' + @tec_ccodigo + '%') or (@tec_cnombre is null or tec_cnombre like  '%' + @tec_cnombre + '%') or (@tec_ctelefono is null or tec_ctelefono like  '%' + @tec_ctelefono + '%') or (@tec_cmail is null or tec_cmail like  '%' + @tec_cmail + '%') or (@tec_cobservaciones is null or tec_cobservaciones like  '%' + cast(@tec_cobservaciones as varchar(256))+ '%') 

GO

/****** Object:  StoredProcedure [dbo].[Tables_TiposAll]    Script Date: 01/03/2012 14:14:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Tables_TiposAll]	
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_tipos

GO

/****** Object:  StoredProcedure [dbo].[Tables_TipoServicioAll]    Script Date: 01/03/2012 14:14:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[Tables_TipoServicioAll]
(
@tip_ccodigo CHAR(3) = null,
@tip_cdescripcion CHAR(30) = null,
@tip_yvalor MONEY = null,
@tip_ndias NUMERIC(3) = null
)
AS
	SET NOCOUNT ON
	
	SELECT * FROM t_tiposervicio
	where 1=0 
	 or (@tip_ccodigo is null or tip_ccodigo like '%' + @tip_ccodigo + '%') 
	 or (@tip_cdescripcion is null or tip_cdescripcion like '%' + @tip_cdescripcion + '%') 

GO

