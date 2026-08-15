CREATE OR ALTER PROCEDURE [dbo].[GetFunctionsByUserId] @UserId int
AS
DECLARE @UserAccountTypeId INT
DECLARE @RoleTypeId INT
DECLARE @PermissionId INT
SET @UserAccountTypeId = dbo.GetObjectId('UserAccount')
SET @RoleTypeId  = dbo.GetObjectId('Role')
SET @PermissionId  = dbo.GetObjectId('Permission')
SELECT 
idFuncion = Per.FunctionId, 
Funcion = Fu.Name,
idObjeto = Per.ObjectId,
Objeto = Obj.Name
FROM RelationObject RoRole
JOIN RelationObject RoPerm ON
(RoPerm.ObjectTypeId = @RoleTypeId
AND RoPerm.ObjectId = RoRole.RelationObjectId
AND RoPerm.RelationObjectTypeId = @PermissionId)
INNER JOIN Permission Per ON ( RoPerm.RelationObjectId = Per.Id )
INNER JOIN [Function] Fu ON ( Fu.Id = Per.FunctionId )
INNER JOIN Object Obj ON ( Obj.Id = Per.ObjectId )
WHERE RoRole.ObjectTypeId = @UserAccountTypeId
AND RoRole.ObjectId = @UserId
AND RoRole.RelationObjectTypeId = @RoleTypeId