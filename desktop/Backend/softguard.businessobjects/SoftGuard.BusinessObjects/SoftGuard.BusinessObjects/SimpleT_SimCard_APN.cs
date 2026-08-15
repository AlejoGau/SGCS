
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
    ///T_SimCard_APN Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleT_SimCard_APN : SimpleBaseObject
    { 
			 ///<summary>
     ///tsa_cDescripcion   
     ///</summary>
	 [DataMember]
     public string tsa_cDescripcion { get;set;} 
	  ///<summary>
     ///tsa_cURL   
     ///</summary>
	 [DataMember]
     public string tsa_cURL { get;set;} 
	  ///<summary>
     ///tsa_cUser   
     ///</summary>
	 [DataMember]
     public string tsa_cUser { get;set;} 
	  ///<summary>
     ///tnd_cPassword   
     ///</summary>
	 [DataMember]
     public string tnd_cPassword { get;set;} 
	 ///<summary>
        ///T_SimCard_APN Constructor
        ///</summary>
        public SimpleT_SimCard_APN() : base()
  {
  InitClass();
  }
        ///<summary>
        ///T_SimCard_APN Constructor
        ///</summary>
        public SimpleT_SimCard_APN(int Id, string Name, string tsa_cDescripcion, string tsa_cURL, string tsa_cUser, string tnd_cPassword) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tsa_cDescripcion = tsa_cDescripcion;
this.tsa_cURL = tsa_cURL;
this.tsa_cUser = tsa_cUser;
this.tnd_cPassword = tnd_cPassword;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3234, "T_SimCard_APN");
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
			BaseObject Object = new DalT_SimCard_APN(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerT_SimCard_APN Caller = new CallerT_SimCard_APN();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tsa_cDescripcion = this.tsa_cDescripcion;
Caller.tsa_cURL = this.tsa_cURL;
Caller.tsa_cUser = this.tsa_cUser;
Caller.tnd_cPassword = this.tnd_cPassword;

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
               dt.Columns.Add(new DataColumn("tsa_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tsa_cURL", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tsa_cUser", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tnd_cPassword", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tsa_cDescripcion"] = (object)this.tsa_cDescripcion ?? System.DBNull.Value;
dr["tsa_cURL"] = (object)this.tsa_cURL ?? System.DBNull.Value;
dr["tsa_cUser"] = (object)this.tsa_cUser ?? System.DBNull.Value;
dr["tnd_cPassword"] = (object)this.tnd_cPassword ?? System.DBNull.Value;
							 
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
