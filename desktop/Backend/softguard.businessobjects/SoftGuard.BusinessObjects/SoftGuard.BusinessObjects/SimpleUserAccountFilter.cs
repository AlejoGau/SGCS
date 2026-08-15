
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
    ///UserAccountFilter Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleUserAccountFilter : SimpleBaseObject
    { 
			 ///<summary>
     ///uaf_userId   
     ///</summary>
	 [DataMember]
     public int uaf_userId { get;set;} 
	  ///<summary>
     ///uaf_provinciaCodigo   
     ///</summary>
	 [DataMember]
     public string uaf_provinciaCodigo { get;set;} 
	 ///<summary>
        ///UserAccountFilter Constructor
        ///</summary>
        public SimpleUserAccountFilter() : base()
  {
  InitClass();
  }
        ///<summary>
        ///UserAccountFilter Constructor
        ///</summary>
        public SimpleUserAccountFilter(int Id, string Name, int uaf_userId, string uaf_provinciaCodigo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.uaf_userId = uaf_userId;
this.uaf_provinciaCodigo = uaf_provinciaCodigo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7053, "UserAccountFilter");
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
			BaseObject Object = new DalUserAccountFilter(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerUserAccountFilter Caller = new CallerUserAccountFilter();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.uaf_userId = this.uaf_userId;
Caller.uaf_provinciaCodigo = this.uaf_provinciaCodigo;

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
               dt.Columns.Add(new DataColumn("uaf_userId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("uaf_provinciaCodigo", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["uaf_userId"] = (object)this.uaf_userId ?? System.DBNull.Value;
dr["uaf_provinciaCodigo"] = (object)this.uaf_provinciaCodigo ?? System.DBNull.Value;
							 
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
