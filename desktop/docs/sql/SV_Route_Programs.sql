USE [_Datos]
GO

/****** Object:  Table [dbo].[SV_Route_Programs]    Script Date: 13/10/2025 07:46:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SV_Route_Programs](
	[srp_iid] [int] IDENTITY(1,1) NOT NULL,
	[srp_iRouteId] [int] NULL,
	[srp_cProgramType] [nvarchar](256) NULL,
	[srp_iStartHour] [int] NULL,
	[srp_iStartMinutes] [int] NULL,
	[srp_iDayOfWeek] [int] NULL,
	[srp_iDayOfMonth] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[srp_iid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


