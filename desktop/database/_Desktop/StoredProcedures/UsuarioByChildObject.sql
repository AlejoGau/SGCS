CREATE OR ALTER PROCEDURE [dbo].[UsuarioByChildObject]  
 @ObjectType VarChar(50),  
 @Id Int  
AS  
 set noCount on  
   
 if(0 = 1) select 1  
 /*  
 1  
 **  
 Cuentausu_iidcuentam_cuentas  
 */   
 else if(@ObjectType = 'Cuenta')  
 begin  
  Select o.[usu_idKey] Id, '' Name, o.usu_iidcuenta, o.usu_icodigo, o.usu_cnombre, o.usu_iid, o.usu_cclave, o.usu_ntipo, o.usu_cimagen, o.usu_mobservacion,o.usu_cidextendido
  from _Datos.dbo.[m_usuarios] o  
  where [usu_iidcuenta] = @Id and [usu_icodigo] != 0 and [usu_cnombre] != ''
 end  
   
 else  
 begin  
  declare @ObjectTypeId int  
  declare @RelationObjectTypeId int  
  
  Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)  
  Select @RelationObjectTypeId = dbo.GetObjectId('Usuario')  
  
  
  
  Select o.[usu_idKey] Id, '' Name, o.usu_iidcuenta, o.usu_icodigo, o.usu_cnombre, o.usu_iid, o.usu_cclave, o.usu_ntipo, o.usu_cimagen, o.usu_mobservacion,o.usu_cidextendido
    from _Datos.dbo.[m_usuarios] o  
    inner join RelationObject r   
      on r.ObjectTypeId = @ObjectTypeId  
        and r.ObjectId = @Id  
        and r.RelationObjectTypeId = @RelationObjectTypeId  
        and r.RelationObjectId = o.[usu_idKey]  
 end