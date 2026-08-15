--Object
INSERT INTO Object (Id, Name, Description, TableName, Namespace, FullName, Assembly) VALUES (3020,'Sms','Sms','m_sms','SoftGuard.BusinessObjects','SoftGuard.BusinessObjects.Sms','SoftGuard.BusinessObjects.dll')
GO

--Permissions
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Consultar', Id, 1, 2, NULL FROM Object WHERE Id in (3020)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Eliminar', Id, 3, 2, NULL FROM Object WHERE Id in (3020)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Insertar', Id, 4, 2, NULL FROM Object WHERE Id in (3020)
GO
INSERT INTO Permission (Name, ObjectId, FunctionId, Audit, AuditXML) SELECT 'Modificar', Id, 6, 2, NULL FROM Object WHERE Id in (3020)
GO

INSERT INTO RelationObject (ObjectTypeId, ObjectId, RelationObjectTypeId, RelationObjectId) SELECT 2,1,3,Id FROM Permission WHERE ObjectId in (3020)
GO

--Alter Table
ALTER TABLE _Datos.dbo.[m_sms] ADD sms_idKey INT IDENTITY(1,1) PRIMARY kEY

--Stores
/****** Object:  StoredProcedure [dbo].[SmsByChildObject]    Script Date: 01/09/2012 13:12:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

							Create Procedure [dbo].[SmsByChildObject]
										@ObjectType VarChar(50),
										@Id Int
							AS
										set noCount on
										
										if(0 = 1) select 1
										/*
										1
										**
										Cuentasms_iidcuentam_cuentas
										*/
										
										else if(@ObjectType = 'Cuenta')
										begin
											Select o.[sms_idKey] Id, '' Name, o.sms_iidcuenta, o.sms_iid, o.sms_meventos, o.sms_csmsparaeventos, o.sms_imodemsms, o.sms_cplantillasms 
											from _Datos.dbo.[m_sms] o
											where [sms_iidcuenta] = @Id
										end
										
										else
										begin
										declare @ObjectTypeId int
										declare @RelationObjectTypeId int

										Select @ObjectTypeId = dbo.GetObjectId(@ObjectType)
										Select @RelationObjectTypeId = dbo.GetObjectId('Sms')
										
										
										
										Select o.[sms_idKey] Id, '' Name, o.sms_iidcuenta, o.sms_iid, o.sms_meventos, o.sms_csmsparaeventos, o.sms_imodemsms, o.sms_cplantillasms 
										  from _Datos.dbo.[m_sms] o
												inner join RelationObject r 
												        on r.ObjectTypeId = @ObjectTypeId
													   and r.ObjectId = @Id
													   and r.RelationObjectTypeId = @RelationObjectTypeId
													   and r.RelationObjectId = o.[sms_idKey]
										end

GO


  
       CREATE Procedure [dbo].[SmsSel]  
           @Id Int  
        --WITH ENCRYPTION  
       AS  
           Select [sms_idKey] Id, '' Name, sms_iidcuenta, sms_iid, sms_meventos, sms_csmsparaeventos, sms_imodemsms, sms_cplantillasms  
             from _Datos.dbo.[m_sms]  
             where [sms_idKey] = @Id  
	   GO
  
       ALTER Procedure [dbo].[SmsDel]  
           @Id Int  
       --WITH ENCRYPTION      
       AS  
            Declare @ObjectTypeId int  
            Select @ObjectTypeId = dbo.GetObjectId('Sms')  
                    
           Delete   
             from _Datos.dbo.m_sms  
             where [sms_idKey] = @Id            
  
            exec RelationsByRelationDel  @ObjectTypeId,  @Id  
             
	   GO
	     
       CREATE Procedure [dbo].[SmsUpd]  
			  @Id Int,  
			  @Name VarChar(128),               
              @sms_iidcuenta Int ,  
              @sms_iid Int ,  
              @sms_meventos Text,  
              @sms_csmsparaeventos VarChar (150),  
              @sms_imodemsms Int ,  
              @sms_cplantillasms Char (3)   
       --WITH ENCRYPTION      
       AS  
           set noCount on  
  
           update _Datos.dbo.[m_sms] set sms_meventos = @sms_meventos,  sms_csmsparaeventos = @sms_csmsparaeventos,  sms_imodemsms = @sms_imodemsms,  sms_cplantillasms = @sms_cplantillasms            
						           where [sms_idKey] = @Id             
						       
           exec SmsSel @Id          
       GO  

  
       CREATE Procedure [dbo].[SmsIns]  
              @Name VarChar(128),                      
              @sms_iidcuenta Int = 0,  
              @sms_iid Int = 0,  
              @sms_meventos Text = '',  
              @sms_csmsparaeventos VarChar (150) = '',  
              @sms_imodemsms Int = 0,  
              @sms_cplantillasms Char (3) = ''   
       --WITH ENCRYPTION      
       AS  
           set noCount on  

		   SELECT @sms_iid = MAX(sms_iid) FROM _Datos.dbo.m_sms WHERE sms_iidcuenta = @sms_iidcuenta

           Insert into _Datos.dbo.[m_sms] (sms_iidcuenta,  sms_iid,  sms_meventos,  sms_csmsparaeventos,  sms_imodemsms,  sms_cplantillasms)  
                  values (@sms_iidcuenta,  @sms_iid,  @sms_meventos,  @sms_csmsparaeventos,  @sms_imodemsms,  @sms_cplantillasms)  
            
           exec SmsSel @@Identity          
	   GO  