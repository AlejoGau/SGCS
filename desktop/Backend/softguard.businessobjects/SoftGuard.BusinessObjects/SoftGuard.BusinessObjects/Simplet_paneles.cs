
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
    ///t_paneles Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_paneles : SimpleBaseObject
    { 
			 ///<summary>
     ///pan_ccodigo   
     ///</summary>
	 [DataMember]
     public string pan_ccodigo { get;set;} 
	  ///<summary>
     ///pan_cdescripcion   
     ///</summary>
	 [DataMember]
     public string pan_cdescripcion { get;set;} 
	  ///<summary>
     ///pan_mobservacion   
     ///</summary>
	 [DataMember]
     public string pan_mobservacion { get;set;} 
	  ///<summary>
     ///pan_nesgprs   
     ///</summary>
	 [DataMember]
     public Decimal pan_nesgprs { get;set;} 
	  ///<summary>
     ///pan_iModelo   
     ///</summary>
	 [DataMember]
     public int pan_iModelo { get;set;} 
	  ///<summary>
     ///pan_cImagen   
     ///</summary>
	 [DataMember]
     public string pan_cImagen { get;set;} 
	 ///<summary>
        ///t_paneles Constructor
        ///</summary>
        public Simplet_paneles() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_paneles Constructor
        ///</summary>
        public Simplet_paneles(int Id, string Name, string pan_ccodigo, string pan_cdescripcion, string pan_mobservacion, Decimal pan_nesgprs, int pan_iModelo, string pan_cImagen) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.pan_ccodigo = pan_ccodigo;
this.pan_cdescripcion = pan_cdescripcion;
this.pan_mobservacion = pan_mobservacion;
this.pan_nesgprs = pan_nesgprs;
this.pan_iModelo = pan_iModelo;
this.pan_cImagen = pan_cImagen;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3072, "t_paneles");
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
			BaseObject Object = new Dalt_paneles(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_paneles Caller = new Callert_paneles();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.pan_ccodigo = this.pan_ccodigo;
Caller.pan_cdescripcion = this.pan_cdescripcion;
Caller.pan_mobservacion = this.pan_mobservacion;
Caller.pan_nesgprs = this.pan_nesgprs;
Caller.pan_iModelo = this.pan_iModelo;
Caller.pan_cImagen = this.pan_cImagen;

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
               dt.Columns.Add(new DataColumn("pan_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_mobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_nesgprs", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("pan_iModelo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cImagen", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pan_ccodigo"] = (object)this.pan_ccodigo ?? System.DBNull.Value;
dr["pan_cdescripcion"] = (object)this.pan_cdescripcion ?? System.DBNull.Value;
dr["pan_mobservacion"] = (object)this.pan_mobservacion ?? System.DBNull.Value;
dr["pan_nesgprs"] = (object)this.pan_nesgprs ?? System.DBNull.Value;
dr["pan_iModelo"] = (object)this.pan_iModelo ?? System.DBNull.Value;
dr["pan_cImagen"] = (object)this.pan_cImagen ?? System.DBNull.Value;
							 
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
