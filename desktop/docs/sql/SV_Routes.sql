USE [_Datos]
GO

/****** Object:  Table [dbo].[SV_Routes]    Script Date: 13/10/2025 07:48:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SV_Routes](
	[svr_iid] [int] IDENTITY(1,1) NOT NULL,
	[svr_iCuentaId] [int] NULL,
	[svr_cName] [nvarchar](256) NULL,
	[svr_cDescripcion] [nvarchar](1024) NULL,
	[svr_cRouteType] [varchar](64) NULL,
	[svr_dDateStart] [datetime] NULL,
	[svr_iParallel] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[svr_iid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


