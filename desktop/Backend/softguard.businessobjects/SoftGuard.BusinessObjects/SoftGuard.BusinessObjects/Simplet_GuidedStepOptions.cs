
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
    ///t_GuidedStepOptions Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_GuidedStepOptions : SimpleBaseObject
    { 
			 ///<summary>
     ///gso_cDescripcion   
     ///</summary>
	 [DataMember]
     public string gso_cDescripcion { get;set;} 
	  ///<summary>
     ///gso_cType   
     ///</summary>
	 [DataMember]
     public string gso_cType { get;set;} 
	 ///<summary>
        ///t_GuidedStepOptions Constructor
        ///</summary>
        public Simplet_GuidedStepOptions() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_GuidedStepOptions Constructor
        ///</summary>
        public Simplet_GuidedStepOptions(int Id, string Name, string gso_cDescripcion, string gso_cType) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.gso_cDescripcion = gso_cDescripcion;
this.gso_cType = gso_cType;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7044, "t_GuidedStepOptions");
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
			BaseObject Object = new Dalt_GuidedStepOptions(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_GuidedStepOptions Caller = new Callert_GuidedStepOptions();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.gso_cDescripcion = this.gso_cDescripcion;
Caller.gso_cType = this.gso_cType;

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
               dt.Columns.Add(new DataColumn("gso_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gso_cType", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gso_cDescripcion"] = (object)this.gso_cDescripcion ?? System.DBNull.Value;
dr["gso_cType"] = (object)this.gso_cType ?? System.DBNull.Value;
							 
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
