
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
    ///t_tipos Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_tipos : SimpleBaseObject
    { 
			 ///<summary>
     ///tip_ccodigo   
     ///</summary>
	 [DataMember]
     public string tip_ccodigo { get;set;} 
	  ///<summary>
     ///tip_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tip_cdescripcion { get;set;} 
	  ///<summary>
     ///tip_curlimagen   
     ///</summary>
	 [DataMember]
     public string tip_curlimagen { get;set;} 
	  ///<summary>
     ///tip_cservicio   
     ///</summary>
	 [DataMember]
     public string tip_cservicio { get;set;} 
	  ///<summary>
     ///tip_nTipo   
     ///</summary>
	 [DataMember]
     public int tip_nTipo { get;set;} 
	  ///<summary>
     ///tip_nCondicion   
     ///</summary>
	 [DataMember]
     public int tip_nCondicion { get;set;} 
	  ///<summary>
     ///tip_cRubro   
     ///</summary>
	 [DataMember]
     public string tip_cRubro { get;set;} 
	 ///<summary>
        ///t_tipos Constructor
        ///</summary>
        public Simplet_tipos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_tipos Constructor
        ///</summary>
        public Simplet_tipos(int Id, string Name, string tip_ccodigo, string tip_cdescripcion, string tip_curlimagen, string tip_cservicio, int tip_nTipo, int tip_nCondicion, string tip_cRubro) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tip_ccodigo = tip_ccodigo;
this.tip_cdescripcion = tip_cdescripcion;
this.tip_curlimagen = tip_curlimagen;
this.tip_cservicio = tip_cservicio;
this.tip_nTipo = tip_nTipo;
this.tip_nCondicion = tip_nCondicion;
this.tip_cRubro = tip_cRubro;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3070, "t_tipos");
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
			BaseObject Object = new Dalt_tipos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_tipos Caller = new Callert_tipos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tip_ccodigo = this.tip_ccodigo;
Caller.tip_cdescripcion = this.tip_cdescripcion;
Caller.tip_curlimagen = this.tip_curlimagen;
Caller.tip_cservicio = this.tip_cservicio;
Caller.tip_nTipo = this.tip_nTipo;
Caller.tip_nCondicion = this.tip_nCondicion;
Caller.tip_cRubro = this.tip_cRubro;

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
               dt.Columns.Add(new DataColumn("tip_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_curlimagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_cservicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_nTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tip_nCondicion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tip_cRubro", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tip_ccodigo"] = (object)this.tip_ccodigo ?? System.DBNull.Value;
dr["tip_cdescripcion"] = (object)this.tip_cdescripcion ?? System.DBNull.Value;
dr["tip_curlimagen"] = (object)this.tip_curlimagen ?? System.DBNull.Value;
dr["tip_cservicio"] = (object)this.tip_cservicio ?? System.DBNull.Value;
dr["tip_nTipo"] = (object)this.tip_nTipo ?? System.DBNull.Value;
dr["tip_nCondicion"] = (object)this.tip_nCondicion ?? System.DBNull.Value;
dr["tip_cRubro"] = (object)this.tip_cRubro ?? System.DBNull.Value;
							 
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
