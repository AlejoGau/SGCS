CREATE TABLE [dbo].[Application](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[RequestURI] [varchar](500) NULL,
	[ClientId] [varchar](500) NULL,
	[ClientSecret] [varchar](500) NULL,
	[UserAccount] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[FrameworkAudit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[ObjectTypeId] [int] NULL,
	[ObjectId] [int] NULL,
	[ObjectName] [varchar](128) NULL,
	[FunctionId] [int] NULL,
	[AuditDate] [datetime] NULL,
	[Xml] [varchar](max) NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[FrameworkAuditExtend](
	[Id] [int] NULL,
	[UserName] [varchar](200) NULL,
	[ParentObjectTypeId] [int] NULL,
	[ParentObjectId] [int] NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Function](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Function] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[MetaData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[DataType] [varchar](25) NULL,
	[XmlData] [text] NULL,
	[ObjectTypeId] [int] NULL,
	[ObjectId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[MetaData] ADD [Model] [varchar](25) NULL
GO


ALTER TABLE [dbo].[MetaData] ADD PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Object](
	[Id] [int] NOT NULL,
	[Name] [varchar](256) NOT NULL,
	[Description] [varchar](256) NULL,
	[TableName] [varchar](256) NULL,
	[Namespace] [varchar](256) NULL,
	[FullName] [varchar](256) NULL,
	[Assembly] [varchar](256) NULL,
	[AliasFromObject] [varchar](50) NULL,
	[AllowRelation] [char](1) NULL,
 CONSTRAINT [PK_Object] PRIMARY KEY CLUSTERED 
(
	[Id] ASC,
	[Name] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[ObjectTaxonomy](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ObjectTypeId] [int] NOT NULL,
	[ObjectId] [int] NOT NULL,
	[TaxonomyId] [int] NOT NULL,
	[FirstParentId] [int] NOT NULL,
	[DateCreated] [datetime] NULL,
 CONSTRAINT [PK_ObjectTaxonomy] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Razor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[SmallComment] [varchar](2048) NULL,
	[Razor] [text] NULL,
	[Version] [varchar](128) NULL,
	[DateCreated] [datetime] NULL,
	[DateModified] [datetime] NULL,
	[RazorType] [varchar](128) NULL,
	[OutputMimeType] [varchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[RelationObject](
	[RelationId] [int] IDENTITY(1,1) NOT NULL,
	[ObjectTypeId] [int] NOT NULL,
	[ObjectId] [int] NOT NULL,
	[RelationObjectTypeId] [int] NOT NULL,
	[RelationObjectId] [int] NOT NULL,
	[DateCreated] [datetime] NULL,
 CONSTRAINT [PK_RelationObject] PRIMARY KEY CLUSTERED 
(
	[RelationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[RelationValues](
	[RelationValueId] [int] IDENTITY(1,1) NOT NULL,
	[RelationId] [int] NOT NULL,
	[RelationType] [varchar](15) NOT NULL,
	[ValueType] [varchar](50) NOT NULL,
	[Value] [varchar](50) NOT NULL,
 CONSTRAINT [PK_RelationValues] PRIMARY KEY CLUSTERED 
(
	[RelationValueId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[Tag1] [varchar](25) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[SearchObject](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[ObjectTypeId] [int] NULL,
	[Content] [varchar](max) NULL,
	[SearchType] [varchar](256) NULL,
	[IdProperty] [varchar](256) NULL,
	[TokenProperty] [varchar](256) NULL,
	[TotalRowsParameterName] VarChar (256),
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[TaxonomyTree](
	[ParentId] [int] NOT NULL,
	[ChildId] [int] NOT NULL,
 CONSTRAINT [PK_TaxonomyTree] PRIMARY KEY CLUSTERED 
(
	[ParentId] ASC,
	[ChildId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[TaxonomyValue](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
 CONSTRAINT [PK_TaxonomyValue] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[Token](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [varchar](200) NULL,
	[UserId] [varchar](200) NULL,
	[Code] [varchar](500) NULL,
	[AccessToken] [varchar](500) NULL,
	[UserData] [varchar](max) NULL,
 CONSTRAINT [PK__Token__3213E83F6720E622] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[UIApplication](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[MenuName] [varchar](256) NULL,
	[Icon] [varchar](256) NULL,
	[SmallComment] [varchar](2048) NULL,
	[Description] [text] NULL,
	[RazorTemplateId] [int] NULL,
	[Viewport] [varchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


CREATE TABLE [dbo].[UserAccount](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[Password] [varchar](1000) NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Email] [varchar](100) NULL,
	[Organization] [varchar](78) NULL,
	[Phone] [varchar](25) NULL,
	[Extention] [varchar](5) NULL,
	[WorkPlace] [varchar](75) NULL,
	[Status] [char](1) NULL,
	[Audit] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ObjectTaxonomy] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO

ALTER TABLE [dbo].[RelationObject] ADD  DEFAULT (getdate()) FOR [DateCreated]
GO


CREATE TABLE [dbo].[Permission](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](128) NULL,
	[ObjectId] [int] NULL,
	[FunctionId] [int] NULL,
	[Audit] [int] NULL,
	[AuditXML] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


CREATE  View [dbo].[Taxonomies]
As
    select Value.Id, Value.Name, isnull(Tree.ParentId, 0) ParentId
      from TaxonomyValue Value left join TaxonomyTree Tree on Value.Id = Tree.ChildId


GO


