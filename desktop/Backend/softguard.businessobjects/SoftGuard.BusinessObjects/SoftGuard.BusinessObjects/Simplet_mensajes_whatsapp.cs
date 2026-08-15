
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
    ///t_mensajes_whatsapp Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_mensajes_whatsapp : SimpleBaseObject
    { 
			 ///<summary>
     ///tmw_ctitulo   
     ///</summary>
	 [DataMember]
     public string tmw_ctitulo { get;set;} 
	  ///<summary>
     ///tmw_cmensaje   
     ///</summary>
	 [DataMember]
     public string tmw_cmensaje { get;set;} 
	 ///<summary>
        ///t_mensajes_whatsapp Constructor
        ///</summary>
        public Simplet_mensajes_whatsapp() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_mensajes_whatsapp Constructor
        ///</summary>
        public Simplet_mensajes_whatsapp(int Id, string Name, string tmw_ctitulo, string tmw_cmensaje) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tmw_ctitulo = tmw_ctitulo;
this.tmw_cmensaje = tmw_cmensaje;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3220, "t_mensajes_whatsapp");
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
			BaseObject Object = new Dalt_mensajes_whatsapp(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_mensajes_whatsapp Caller = new Callert_mensajes_whatsapp();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tmw_ctitulo = this.tmw_ctitulo;
Caller.tmw_cmensaje = this.tmw_cmensaje;

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
               dt.Columns.Add(new DataColumn("tmw_ctitulo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmw_cmensaje", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tmw_ctitulo"] = (object)this.tmw_ctitulo ?? System.DBNull.Value;
dr["tmw_cmensaje"] = (object)this.tmw_cmensaje ?? System.DBNull.Value;
							 
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
