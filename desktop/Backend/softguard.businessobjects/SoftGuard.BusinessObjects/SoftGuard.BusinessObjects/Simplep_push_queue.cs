
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
    ///p_push_queue Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_push_queue : SimpleBaseObject
    { 
			 ///<summary>
     ///ppq_msg   
     ///</summary>
	 [DataMember]
     public string ppq_msg { get;set;} 
	  ///<summary>
     ///ppq_estado   
     ///</summary>
	 [DataMember]
     public int ppq_estado { get;set;} 
	  ///<summary>
     ///ppq_fechacreacion   
     ///</summary>
	 [DataMember]
     public DateTime? ppq_fechacreacion { get;set;} 
	  ///<summary>
     ///ppq_fechaenvio   
     ///</summary>
	 [DataMember]
     public DateTime? ppq_fechaenvio { get;set;} 
	 ///<summary>
        ///p_push_queue Constructor
        ///</summary>
        public Simplep_push_queue() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_push_queue Constructor
        ///</summary>
        public Simplep_push_queue(int Id, string Name, string ppq_msg, int ppq_estado, DateTime? ppq_fechacreacion, DateTime? ppq_fechaenvio) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ppq_msg = ppq_msg;
this.ppq_estado = ppq_estado;
this.ppq_fechacreacion = ppq_fechacreacion;
this.ppq_fechaenvio = ppq_fechaenvio;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3163, "p_push_queue");
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
			BaseObject Object = new Dalp_push_queue(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_push_queue Caller = new Callerp_push_queue();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ppq_msg = this.ppq_msg;
Caller.ppq_estado = this.ppq_estado;
Caller.ppq_fechacreacion = this.ppq_fechacreacion;
Caller.ppq_fechaenvio = this.ppq_fechaenvio;

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
               dt.Columns.Add(new DataColumn("ppq_msg", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ppq_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ppq_fechacreacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ppq_fechaenvio", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ppq_msg"] = (object)this.ppq_msg ?? System.DBNull.Value;
dr["ppq_estado"] = (object)this.ppq_estado ?? System.DBNull.Value;
dr["ppq_fechacreacion"] = (object)this.ppq_fechacreacion ?? System.DBNull.Value;
dr["ppq_fechaenvio"] = (object)this.ppq_fechaenvio ?? System.DBNull.Value;
							 
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
