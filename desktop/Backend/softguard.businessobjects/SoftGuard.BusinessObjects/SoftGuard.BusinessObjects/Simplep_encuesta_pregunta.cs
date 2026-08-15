
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
    ///p_encuesta_pregunta Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_encuesta_pregunta : SimpleBaseObject
    { 
			 ///<summary>
     ///epg_encidkey   
     ///</summary>
	 [DataMember]
     public int epg_encidkey { get;set;} 
	  ///<summary>
     ///epg_name   
     ///</summary>
	 [DataMember]
     public string epg_name { get;set;} 
	  ///<summary>
     ///epg_descripcion   
     ///</summary>
	 [DataMember]
     public string epg_descripcion { get;set;} 
	  ///<summary>
     ///epg_tipo   
     ///</summary>
	 [DataMember]
     public int epg_tipo { get;set;} 
	  ///<summary>
     ///epg_status   
     ///</summary>
	 [DataMember]
     public int epg_status { get;set;} 
	 ///<summary>
        ///p_encuesta_pregunta Constructor
        ///</summary>
        public Simplep_encuesta_pregunta() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_encuesta_pregunta Constructor
        ///</summary>
        public Simplep_encuesta_pregunta(int Id, string Name, int epg_encidkey, string epg_name, string epg_descripcion, int epg_tipo, int epg_status) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.epg_encidkey = epg_encidkey;
this.epg_name = epg_name;
this.epg_descripcion = epg_descripcion;
this.epg_tipo = epg_tipo;
this.epg_status = epg_status;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3203, "p_encuesta_pregunta");
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
			BaseObject Object = new Dalp_encuesta_pregunta(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_encuesta_pregunta Caller = new Callerp_encuesta_pregunta();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.epg_encidkey = this.epg_encidkey;
Caller.epg_name = this.epg_name;
Caller.epg_descripcion = this.epg_descripcion;
Caller.epg_tipo = this.epg_tipo;
Caller.epg_status = this.epg_status;

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
               dt.Columns.Add(new DataColumn("epg_encidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epg_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epg_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epg_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epg_status", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["epg_encidkey"] = (object)this.epg_encidkey ?? System.DBNull.Value;
dr["epg_name"] = (object)this.epg_name ?? System.DBNull.Value;
dr["epg_descripcion"] = (object)this.epg_descripcion ?? System.DBNull.Value;
dr["epg_tipo"] = (object)this.epg_tipo ?? System.DBNull.Value;
dr["epg_status"] = (object)this.epg_status ?? System.DBNull.Value;
							 
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
