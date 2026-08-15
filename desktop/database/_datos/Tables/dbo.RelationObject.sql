IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[RelationObject] (
    [RelationId] int NOT NULL,
    [ObjectTypeId] int NOT NULL,
    [ObjectId] int NOT NULL,
    [RelationObjectTypeId] int NOT NULL,
    [RelationObjectId] int NOT NULL,
    [DateCreated] datetime CONSTRAINT [DF_RelationObject_DateCreated] DEFAULT (getdate()) NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_RelationObject] ON [dbo].[RelationObject] ([ObjectTypeId] ASC, [ObjectId] ASC, [RelationObjectTypeId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_RelationObject_Objecti] ON [dbo].[RelationObject] ([ObjectId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_RelationObject_ObjTypeIDRel] ON [dbo].[RelationObject] ([ObjectTypeId] ASC, [ObjectId] ASC, [RelationObjectTypeId] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_RelationObject_RelationobjecttypeiRelationobjecti] ON [dbo].[RelationObject] ([RelationObjectTypeId] ASC, [RelationObjectId] ASC);
GO
