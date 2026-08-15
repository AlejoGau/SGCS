USE [_Datos]
GO

/****** Object:  Table [dbo].[SV_Route_AnalysisPoints]    Script Date: 13/10/2025 07:46:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SV_Route_AnalysisPoints](
	[sra_iid] [int] IDENTITY(1,1) NOT NULL,
	[sra_iRouteId] [int] NULL,
	[sra_iAnalysisPointId] [int] NULL,
	[sra_iOrder] [int] NULL,
	[sra_cReference] [char](100) NULL,
	[sra_cCameraType] [nvarchar](20) NULL,
	[sra_iCameraRefId] [int] NULL,
	[sra_cConfig] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[sra_iid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


