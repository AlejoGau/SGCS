
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
    ///OperadorVirtualConfigDealers Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleOperadorVirtualConfigDealers : SimpleBaseObject
    { 
			 ///<summary>
     ///ovd_iOperadorVirtualConfigId   
     ///</summary>
	 [DataMember]
     public int ovd_iOperadorVirtualConfigId { get;set;} 
	  ///<summary>
     ///ovd_cDealer   
     ///</summary>
	 [DataMember]
     public string ovd_cDealer { get;set;} 
	 ///<summary>
        ///OperadorVirtualConfigDealers Constructor
        ///</summary>
        public SimpleOperadorVirtualConfigDealers() : base()
  {
  InitClass();
  }
        ///<summary>
        ///OperadorVirtualConfigDealers Constructor
        ///</summary>
        public SimpleOperadorVirtualConfigDealers(int Id, string Name, int ovd_iOperadorVirtualConfigId, string ovd_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ovd_iOperadorVirtualConfigId = ovd_iOperadorVirtualConfigId;
this.ovd_cDealer = ovd_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7048, "OperadorVirtualConfigDealers");
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
			BaseObject Object = new DalOperadorVirtualConfigDealers(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerOperadorVirtualConfigDealers Caller = new CallerOperadorVirtualConfigDealers();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ovd_iOperadorVirtualConfigId = this.ovd_iOperadorVirtualConfigId;
Caller.ovd_cDealer = this.ovd_cDealer;

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
               dt.Columns.Add(new DataColumn("ovd_iOperadorVirtualConfigId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ovd_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ovd_iOperadorVirtualConfigId"] = (object)this.ovd_iOperadorVirtualConfigId ?? System.DBNull.Value;
dr["ovd_cDealer"] = (object)this.ovd_cDealer ?? System.DBNull.Value;
							 
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
