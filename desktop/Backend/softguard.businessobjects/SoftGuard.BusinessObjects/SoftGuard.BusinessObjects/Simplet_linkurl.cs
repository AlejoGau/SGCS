
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
    ///t_linkurl Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_linkurl : SimpleBaseObject
    { 
			 ///<summary>
     ///url_cname   
     ///</summary>
	 [DataMember]
     public string url_cname { get;set;} 
	  ///<summary>
     ///url_cdescripcion   
     ///</summary>
	 [DataMember]
     public string url_cdescripcion { get;set;} 
	  ///<summary>
     ///url_curl   
     ///</summary>
	 [DataMember]
     public string url_curl { get;set;} 
	  ///<summary>
     ///url_cDealer   
     ///</summary>
	 [DataMember]
     public string url_cDealer { get;set;} 
	 ///<summary>
        ///t_linkurl Constructor
        ///</summary>
        public Simplet_linkurl() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_linkurl Constructor
        ///</summary>
        public Simplet_linkurl(int Id, string Name, string url_cname, string url_cdescripcion, string url_curl, string url_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.url_cname = url_cname;
this.url_cdescripcion = url_cdescripcion;
this.url_curl = url_curl;
this.url_cDealer = url_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3136, "t_linkurl");
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
			BaseObject Object = new Dalt_linkurl(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_linkurl Caller = new Callert_linkurl();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.url_cname = this.url_cname;
Caller.url_cdescripcion = this.url_cdescripcion;
Caller.url_curl = this.url_curl;
Caller.url_cDealer = this.url_cDealer;

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
               dt.Columns.Add(new DataColumn("url_cname", typeof (string)));               
							 dt.Columns.Add(new DataColumn("url_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("url_curl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("url_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["url_cname"] = (object)this.url_cname ?? System.DBNull.Value;
dr["url_cdescripcion"] = (object)this.url_cdescripcion ?? System.DBNull.Value;
dr["url_curl"] = (object)this.url_curl ?? System.DBNull.Value;
dr["url_cDealer"] = (object)this.url_cDealer ?? System.DBNull.Value;
							 
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
