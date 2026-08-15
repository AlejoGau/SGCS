
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
    ///t_WeSafePeriodicityOptions Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_WeSafePeriodicityOptions : SimpleBaseObject
    { 
			 ///<summary>
     ///wpo_cDescripcion   
     ///</summary>
	 [DataMember]
     public string wpo_cDescripcion { get;set;} 
	 ///<summary>
        ///t_WeSafePeriodicityOptions Constructor
        ///</summary>
        public Simplet_WeSafePeriodicityOptions() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_WeSafePeriodicityOptions Constructor
        ///</summary>
        public Simplet_WeSafePeriodicityOptions(int Id, string Name, string wpo_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.wpo_cDescripcion = wpo_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7039, "t_WeSafePeriodicityOptions");
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
			BaseObject Object = new Dalt_WeSafePeriodicityOptions(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_WeSafePeriodicityOptions Caller = new Callert_WeSafePeriodicityOptions();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.wpo_cDescripcion = this.wpo_cDescripcion;

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
               dt.Columns.Add(new DataColumn("wpo_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wpo_cDescripcion"] = (object)this.wpo_cDescripcion ?? System.DBNull.Value;
							 
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
