
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
    ///t_WeSafeFunctionsOptions Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_WeSafeFunctionsOptions : SimpleBaseObject
    { 
			 ///<summary>
     ///wco_idKey   
     ///</summary>
	 [DataMember]
     public int wco_idKey { get;set;} 
	  ///<summary>
     ///wco_cDescripcion   
     ///</summary>
	 [DataMember]
     public string wco_cDescripcion { get;set;} 
	 ///<summary>
        ///t_WeSafeFunctionsOptions Constructor
        ///</summary>
        public Simplet_WeSafeFunctionsOptions() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_WeSafeFunctionsOptions Constructor
        ///</summary>
        public Simplet_WeSafeFunctionsOptions(int Id, string Name, int wco_idKey, string wco_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.wco_idKey = wco_idKey;
this.wco_cDescripcion = wco_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7042, "t_WeSafeFunctionsOptions");
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
			BaseObject Object = new Dalt_WeSafeFunctionsOptions(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_WeSafeFunctionsOptions Caller = new Callert_WeSafeFunctionsOptions();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.wco_idKey = this.wco_idKey;
Caller.wco_cDescripcion = this.wco_cDescripcion;

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
               dt.Columns.Add(new DataColumn("wco_idKey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wco_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wco_idKey"] = (object)this.wco_idKey ?? System.DBNull.Value;
dr["wco_cDescripcion"] = (object)this.wco_cDescripcion ?? System.DBNull.Value;
							 
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
