
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
    ///t_ResourcesModule_Type Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_ResourcesModule_Type : SimpleBaseObject
    { 
			 ///<summary>
     ///rmt_cNombre   
     ///</summary>
	 [DataMember]
     public string rmt_cNombre { get;set;} 
	  ///<summary>
     ///rmt_itipo   
     ///</summary>
	 [DataMember]
     public int rmt_itipo { get;set;} 
	  ///<summary>
     ///rmt_idOrg   
     ///</summary>
	 [DataMember]
     public int rmt_idOrg { get;set;} 
	  ///<summary>
     ///rmt_cIcono   
     ///</summary>
	 [DataMember]
     public string rmt_cIcono { get;set;} 
	 ///<summary>
        ///t_ResourcesModule_Type Constructor
        ///</summary>
        public Simplet_ResourcesModule_Type() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_ResourcesModule_Type Constructor
        ///</summary>
        public Simplet_ResourcesModule_Type(int Id, string Name, string rmt_cNombre, int rmt_itipo, int rmt_idOrg, string rmt_cIcono) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rmt_cNombre = rmt_cNombre;
this.rmt_itipo = rmt_itipo;
this.rmt_idOrg = rmt_idOrg;
this.rmt_cIcono = rmt_cIcono;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7054, "t_ResourcesModule_Type");
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
			BaseObject Object = new Dalt_ResourcesModule_Type(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_ResourcesModule_Type Caller = new Callert_ResourcesModule_Type();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rmt_cNombre = this.rmt_cNombre;
Caller.rmt_itipo = this.rmt_itipo;
Caller.rmt_idOrg = this.rmt_idOrg;
Caller.rmt_cIcono = this.rmt_cIcono;

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
               dt.Columns.Add(new DataColumn("rmt_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmt_itipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rmt_idOrg", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rmt_cIcono", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rmt_cNombre"] = (object)this.rmt_cNombre ?? System.DBNull.Value;
dr["rmt_itipo"] = (object)this.rmt_itipo ?? System.DBNull.Value;
dr["rmt_idOrg"] = (object)this.rmt_idOrg ?? System.DBNull.Value;
dr["rmt_cIcono"] = (object)this.rmt_cIcono ?? System.DBNull.Value;
							 
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
