
using System;
using System.Xml;
using System.Data;
using Slbf;
using Slbf.Helpers;    	    	 
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 	
  ///<summary>
    ///crm_contrato Slbf Class
    ///</summary>
    [DataContract]
    public class Simplecrm_contrato : SimpleBaseObject
    { 
			 ///<summary>
     ///cnt_org_fc   
     ///</summary>
	 [DataMember]
     public int cnt_org_fc { get;set;} 
	  ///<summary>
     ///cnt_idcliente   
     ///</summary>
	 [DataMember]
     public int cnt_idcliente { get;set;} 
	  ///<summary>
     ///cnt_fechaalta   
     ///</summary>
	 [DataMember]
     public DateTime? cnt_fechaalta { get;set;} 
	  ///<summary>
     ///cnt_fechavto   
     ///</summary>
	 [DataMember]
     public DateTime? cnt_fechavto { get;set;} 
	  ///<summary>
     ///cnt_formapago   
     ///</summary>
	 [DataMember]
     public int cnt_formapago { get;set;} 
	  ///<summary>
     ///cnt_metadata   
     ///</summary>
	 [DataMember]
     public string cnt_metadata { get;set;} 
	  ///<summary>
     ///cnt_estado   
     ///</summary>
	 [DataMember]
     public int cnt_estado { get;set;} 
	  ///<summary>
     ///cnt_tmp_id   
     ///</summary>
	 [DataMember]
     public int cnt_tmp_id { get;set;} 
	  ///<summary>
     ///cnt_dinamico   
     ///</summary>
	 [DataMember]
     public int cnt_dinamico { get;set;} 
	  ///<summary>
     ///cnt_cantidad_auto   
     ///</summary>
	 [DataMember]
     public int cnt_cantidad_auto { get;set;} 
	 ///<summary>
        ///crm_contrato Constructor
        ///</summary>
        public Simplecrm_contrato() : base()
  {
  InitClass();
  }
        ///<summary>
        ///crm_contrato Constructor
        ///</summary>
        public Simplecrm_contrato(int Id, string Name, int cnt_org_fc, int cnt_idcliente, DateTime? cnt_fechaalta, DateTime? cnt_fechavto, int cnt_formapago, string cnt_metadata, int cnt_estado, int cnt_tmp_id, int cnt_dinamico, int cnt_cantidad_auto) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cnt_org_fc = cnt_org_fc;
this.cnt_idcliente = cnt_idcliente;
this.cnt_fechaalta = cnt_fechaalta;
this.cnt_fechavto = cnt_fechavto;
this.cnt_formapago = cnt_formapago;
this.cnt_metadata = cnt_metadata;
this.cnt_estado = cnt_estado;
this.cnt_tmp_id = cnt_tmp_id;
this.cnt_dinamico = cnt_dinamico;
this.cnt_cantidad_auto = cnt_cantidad_auto;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3148, "crm_contrato");
        }
///<summary>
    ///Returns SimpleBaseObject
    ///</summary>
		public override SimpleBaseObject GetObject()
		{
			return (SimpleBaseObject) this;
		}
///<summary>
    ///Returns BaseObject
    ///</summary>  
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			BaseObject Object = new Dalcrm_contrato(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callercrm_contrato Caller = new Callercrm_contrato();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cnt_org_fc = this.cnt_org_fc;
Caller.cnt_idcliente = this.cnt_idcliente;
Caller.cnt_fechaalta = this.cnt_fechaalta;
Caller.cnt_fechavto = this.cnt_fechavto;
Caller.cnt_formapago = this.cnt_formapago;
Caller.cnt_metadata = this.cnt_metadata;
Caller.cnt_estado = this.cnt_estado;
Caller.cnt_tmp_id = this.cnt_tmp_id;
Caller.cnt_dinamico = this.cnt_dinamico;
Caller.cnt_cantidad_auto = this.cnt_cantidad_auto;

			return (CallerObject) Caller;
		}
///<summary>
    ///Get DataTable of objetdata
    ///</summary>
		public override DataTable GetDataObject()
    {												                
               //create Table
               DataTable dt = new DataTable("Data");                              
               DataRow dr;
							 
							 dt.Columns.Add(new DataColumn("Id", typeof(int)));
							 dt.Columns.Add(new DataColumn("Name", typeof(string)));							 
               dt.Columns.Add(new DataColumn("cnt_org_fc", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_idcliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_fechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cnt_fechavto", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cnt_formapago", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cnt_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_tmp_id", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_dinamico", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cnt_cantidad_auto", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cnt_org_fc"] = (object)this.cnt_org_fc ?? System.DBNull.Value;
dr["cnt_idcliente"] = (object)this.cnt_idcliente ?? System.DBNull.Value;
dr["cnt_fechaalta"] = (object)this.cnt_fechaalta ?? System.DBNull.Value;
dr["cnt_fechavto"] = (object)this.cnt_fechavto ?? System.DBNull.Value;
dr["cnt_formapago"] = (object)this.cnt_formapago ?? System.DBNull.Value;
dr["cnt_metadata"] = (object)this.cnt_metadata ?? System.DBNull.Value;
dr["cnt_estado"] = (object)this.cnt_estado ?? System.DBNull.Value;
dr["cnt_tmp_id"] = (object)this.cnt_tmp_id ?? System.DBNull.Value;
dr["cnt_dinamico"] = (object)this.cnt_dinamico ?? System.DBNull.Value;
dr["cnt_cantidad_auto"] = (object)this.cnt_cantidad_auto ?? System.DBNull.Value;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
///<summary>
  ///Get XmlDataDocument
  ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
		  DataSet ds = new DataSet("Object"); 
		  ds.EnforceConstraints = false;														                
               							 
 		  ds.Tables.Add(GetDataObject());
	  	  ds.Tables.Add(this.Type.GetDataObject());  	  

          XmlDataDocument XmlDoc = new XmlDataDocument(ds);
		  if(this.CallerObject != null)			 	 
		     XmlDoc.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;                    
		  if(this.Dependencies.Count != 0)
			 XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;          
			 
          return XmlDoc;							    
    }
 
			}

}
