--TrackGuard
SET IDENTITY_INSERT UIApplication ON
GO

INSERT INTO UIApplication (Id, Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport) VALUES (4, 'Trackguard', 'TrackGuard', '', 'Seguimiento vehicular', '', 247, 'MetadataViewport')
GO

SET IDENTITY_INSERT UIApplication OFF
GO


INSERT INTO MetaData (Name, DataType, XmlData, ObjectTypeId, ObjectId) VALUES ('_properties', 'json', '{"NorthView":"moduletoolbar","CenterView":"tabpanel","SouthView":"statusbar","WestView":"panel"}', 51, 4)
GO

INSERT INTO SearchObject (Name, ObjectTypeId, Content, SearchType) VALUES ('Vehicle', 659, 'VehicleSearch', 'Sql')
GO

--TrackGuard Monitoreo
SET IDENTITY_INSERT UIApplication ON
GO

INSERT INTO UIApplication (Id, Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport) VALUES (5, 'TrackguardMonitoreo', 'TrackguardMonitoreo', '', 'Pantalla de monitoreo multiple para trackguard', '', 247, 'MetadataViewport')
GO

SET IDENTITY_INSERT UIApplication OFF
GO

INSERT INTO MetaData (Name, DataType, XmlData, ObjectTypeId, ObjectId) VALUES ('_properties', 'json', '{"NorthView":"","WestView":"panel","CenterView":"flotagpsview","SouthView":"statusbar"}', 51, 5)
GO

--TrackGuard Monitoreo - Admin de Marcas y Modelos
SET IDENTITY_INSERT UIApplication ON
GO

INSERT INTO UIApplication (Id, Name, MenuName, Icon, SmallComment, Description, RazorTemplateId, Viewport) VALUES (6, 'VehicleBrand', 'VehicleBrand', '', 'Pantalla de administracion de Tablas de TrackGuard', '', 247, 'MetadataViewport')
GO

SET IDENTITY_INSERT UIApplication OFF
GO

INSERT INTO MetaData (Name, DataType, XmlData, ObjectTypeId, ObjectId) VALUES ('_properties', 'json', '{"NorthView":"","CenterView":"tabpanel","WestView":"brandgridview","SouthView":""}', 51, 6)
GO


--TrackGuard
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,272) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,273) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,243) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,241) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,278) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,282) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,214) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,296) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,306) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,311) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,314) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,318) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,322) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,333) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,341) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,329) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,349) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,352) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,357) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,364) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,368) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,374) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,377) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,422) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,4,50,433) 
GO

--TrackGuardMonitoreo
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,241) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,243) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,306) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,399) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,400) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,402) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,404) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,407) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,409) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,374) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,420) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,5,50,422) 
GO

--TrackGuard Admin de Marcas y Modelos
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,6,50,414) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,6,50,415) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,6,50,241) 
GO
INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) VALUES (51,6,50,418) 
GO