--Objects
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (1,'UserAccount','UserAccount','UserAccount','Slbf.Objects','Slbf.Objects.UserAccount','Slbf.Objects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (2,'Role','Role','Role','Slbf.Objects','Slbf.Objects.Role','Slbf.Objects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3,'Permission','Permission','Permission','Slbf.Objects','Slbf.Objects.Permission','Slbf.Objects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (4,'Taxonomy','','','','','')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (10,'MetaData','MetaData','MetaData','Slbf.Objects','Slbf.Objects.MetaData','Slbf.Objects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (20,'Relation','Relation','RelationObject','Slbf.Objects','Slbf.Objects.Relation','Slbf.Objects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (50,'Razor','Razor','Razor','Slbf.UI','Slbf.UI.Razor','Slbf.UI.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (51,'UIApplication','UIApplication','UIApplication','Slbf.UI','Slbf.UI.UIApplication','Slbf.UI.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (55,'SearchObject','SearchObject','SearchObject','Slbf.Objects','Slbf.Objects.SearchObject','Slbf.Objects.dll')
GO
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (680,'Application','Application','Application','Slbf.Crm','Slbf.Crm.Application','Slbf.Crm.dll')
GO

--UserAccount
SET IDENTITY_INSERT [UserAccount] ON
GO
INSERT INTO UserAccount (Id, Name, Password, FirstName, LastName, Email, Organization, Phone, Extention, WorkPlace, Status, Audit) VALUES (1,'Desktop','L3jJD7bneEFcR0uu9A7Kyw==','Administrador','Administrador','info@softguard.com.ar','', '','','','A',1)
GO
SET IDENTITY_INSERT [UserAccount] OFF
GO

--Function
SET IDENTITY_INSERT [Function] ON
GO
INSERT INTO [Function] (Id, Name) VALUES (1,'Consultar')
GO
INSERT INTO [Function] (Id, Name) VALUES (3,'Eliminar')
GO
INSERT INTO [Function] (Id, Name) VALUES (4,'Insertar')
GO
INSERT INTO [Function] (Id, Name) VALUES (6,'Modificar')
GO
SET IDENTITY_INSERT [Function] OFF
GO


--Role
SET IDENTITY_INSERT [Role] ON
GO
INSERT INTO [Role] (Id, Name) VALUES (1,'Administrator')
GO
SET IDENTITY_INSERT [Role] OFF
GO


INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (1,1,2,1)
GO

--Permission
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (1,2,3,4,10,20,50,51,55,680)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (1,2,3,4,10,20,50,51,55,680)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (1,2,3,4,10,20,50,51,55,680)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (1,2,3,4,10,20,50,51,55,680)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (1,2,3,4,10,20,50,51,55,680)
GO


--Application
INSERT INTO Application (Name, RequestURI, ClientId, ClientSecret, UserAccount) VALUES ('Desktop', '/OAuthCallback.ashx', '191B8347-F356-48DE-8EC1-B996112E80C1', '5D7E0702-803A-4FF9-9A4B-94F51D85A959', 1)
GO

--UIApplication
INSERT INTO UIApplication (Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport) VALUES ('Razor','Razor', '', '', '', 146, 'ApplicationViewport')
GO
INSERT INTO UIApplication (Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport) VALUES ('Desktop','Desktop', '', '', '', 223, '')
GO
INSERT INTO UIApplication (Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport) VALUES ('WebDealer','WebDealer', '', '', '', 247, 'MetadataViewport')
GO

--MetaData
INSERT INTO MetaData (Name, DataType, XmlData, ObjectTypeId, ObjectId, Model) VALUES ('_properties', 'json', '{"NorthView":"moduletoolbar","CenterView":"tabpanel","SouthView":"statusbar","WestView":""}', 51, 2, null)
GO

INSERT INTO MetaData (Name, DataType, XmlData, ObjectTypeId, ObjectId, Model) VALUES ('_properties', 'json', '{"DoorKeyProviders":["one","two"],"NorthView":"razornorthview"}', 51, 3, null)
GO

--Search Razor
INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType, IdProperty, TokenProperty, TotalRowsParameterName) VALUES ('Razor', 50, 'RazorSearch', 'Sql', NULL, NULL, 'RowTotal')
GO
