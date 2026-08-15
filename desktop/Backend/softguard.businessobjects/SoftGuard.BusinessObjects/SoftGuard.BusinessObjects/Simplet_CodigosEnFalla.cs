
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
    ///t_CodigosEnFalla Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_CodigosEnFalla : SimpleBaseObject
    { 
			 ///<summary>
     ///cef_cEventosFalla   
     ///</summary>
	 [DataMember]
     public string cef_cEventosFalla { get;set;} 
	  ///<summary>
     ///cef_cEventosRest   
     ///</summary>
	 [DataMember]
     public string cef_cEventosRest { get;set;} 
	 ///<summary>
        ///t_CodigosEnFalla Constructor
        ///</summary>
        public Simplet_CodigosEnFalla() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_CodigosEnFalla Constructor
        ///</summary>
        public Simplet_CodigosEnFalla(int Id, string Name, string cef_cEventosFalla, string cef_cEventosRest) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cef_cEventosFalla = cef_cEventosFalla;
this.cef_cEventosRest = cef_cEventosRest;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7034, "t_CodigosEnFalla");
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
			BaseObject Object = new Dalt_CodigosEnFalla(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_CodigosEnFalla Caller = new Callert_CodigosEnFalla();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cef_cEventosFalla = this.cef_cEventosFalla;
Caller.cef_cEventosRest = this.cef_cEventosRest;

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
               dt.Columns.Add(new DataColumn("cef_cEventosFalla", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cef_cEventosRest", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cef_cEventosFalla"] = (object)this.cef_cEventosFalla ?? System.DBNull.Value;
dr["cef_cEventosRest"] = (object)this.cef_cEventosRest ?? System.DBNull.Value;
							 
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
