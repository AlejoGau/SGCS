
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
    ///p_encuesta_pregunta_opcion Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_encuesta_pregunta_opcion : SimpleBaseObject
    { 
			 ///<summary>
     ///epo_epgidkey   
     ///</summary>
	 [DataMember]
     public int epo_epgidkey { get;set;} 
	  ///<summary>
     ///epo_name   
     ///</summary>
	 [DataMember]
     public string epo_name { get;set;} 
	  ///<summary>
     ///epo_descripcion   
     ///</summary>
	 [DataMember]
     public string epo_descripcion { get;set;} 
	  ///<summary>
     ///epo_status   
     ///</summary>
	 [DataMember]
     public int epo_status { get;set;} 
	  ///<summary>
     ///epo_tipo   
     ///</summary>
	 [DataMember]
     public int epo_tipo { get;set;} 
	  ///<summary>
     ///epo_values   
     ///</summary>
	 [DataMember]
     public string epo_values { get;set;} 
	 ///<summary>
        ///p_encuesta_pregunta_opcion Constructor
        ///</summary>
        public Simplep_encuesta_pregunta_opcion() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_encuesta_pregunta_opcion Constructor
        ///</summary>
        public Simplep_encuesta_pregunta_opcion(int Id, string Name, int epo_epgidkey, string epo_name, string epo_descripcion, int epo_status, int epo_tipo, string epo_values) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.epo_epgidkey = epo_epgidkey;
this.epo_name = epo_name;
this.epo_descripcion = epo_descripcion;
this.epo_status = epo_status;
this.epo_tipo = epo_tipo;
this.epo_values = epo_values;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3204, "p_encuesta_pregunta_opcion");
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
			BaseObject Object = new Dalp_encuesta_pregunta_opcion(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_encuesta_pregunta_opcion Caller = new Callerp_encuesta_pregunta_opcion();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.epo_epgidkey = this.epo_epgidkey;
Caller.epo_name = this.epo_name;
Caller.epo_descripcion = this.epo_descripcion;
Caller.epo_status = this.epo_status;
Caller.epo_tipo = this.epo_tipo;
Caller.epo_values = this.epo_values;

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
               dt.Columns.Add(new DataColumn("epo_epgidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epo_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epo_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("epo_status", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epo_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("epo_values", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["epo_epgidkey"] = (object)this.epo_epgidkey ?? System.DBNull.Value;
dr["epo_name"] = (object)this.epo_name ?? System.DBNull.Value;
dr["epo_descripcion"] = (object)this.epo_descripcion ?? System.DBNull.Value;
dr["epo_status"] = (object)this.epo_status ?? System.DBNull.Value;
dr["epo_tipo"] = (object)this.epo_tipo ?? System.DBNull.Value;
dr["epo_values"] = (object)this.epo_values ?? System.DBNull.Value;
							 
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
