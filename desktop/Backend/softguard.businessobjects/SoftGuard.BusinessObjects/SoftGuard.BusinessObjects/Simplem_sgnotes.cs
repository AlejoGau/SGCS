
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
    ///m_sgnotes Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_sgnotes : SimpleBaseObject
    { 
			 ///<summary>
     ///sgn_title   
     ///</summary>
	 [DataMember]
     public string sgn_title { get;set;} 
	  ///<summary>
     ///sgn_body   
     ///</summary>
	 [DataMember]
     public string sgn_body { get;set;} 
	  ///<summary>
     ///sgn_userid   
     ///</summary>
	 [DataMember]
     public int sgn_userid { get;set;} 
	  ///<summary>
     ///sgn_status   
     ///</summary>
	 [DataMember]
     public int sgn_status { get;set;} 
	  ///<summary>
     ///sgn_datecreated   
     ///</summary>
	 [DataMember]
     public DateTime? sgn_datecreated { get;set;} 
	  ///<summary>
     ///sgn_fileduserid   
     ///</summary>
	 [DataMember]
     public int sgn_fileduserid { get;set;} 
	 ///<summary>
        ///m_sgnotes Constructor
        ///</summary>
        public Simplem_sgnotes() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_sgnotes Constructor
        ///</summary>
        public Simplem_sgnotes(int Id, string Name, string sgn_title, string sgn_body, int sgn_userid, int sgn_status, DateTime? sgn_datecreated, int sgn_fileduserid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sgn_title = sgn_title;
this.sgn_body = sgn_body;
this.sgn_userid = sgn_userid;
this.sgn_status = sgn_status;
this.sgn_datecreated = sgn_datecreated;
this.sgn_fileduserid = sgn_fileduserid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3222, "m_sgnotes");
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
			BaseObject Object = new Dalm_sgnotes(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_sgnotes Caller = new Callerm_sgnotes();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sgn_title = this.sgn_title;
Caller.sgn_body = this.sgn_body;
Caller.sgn_userid = this.sgn_userid;
Caller.sgn_status = this.sgn_status;
Caller.sgn_datecreated = this.sgn_datecreated;
Caller.sgn_fileduserid = this.sgn_fileduserid;

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
               dt.Columns.Add(new DataColumn("sgn_title", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sgn_body", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sgn_userid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sgn_status", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sgn_datecreated", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sgn_fileduserid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sgn_title"] = (object)this.sgn_title ?? System.DBNull.Value;
dr["sgn_body"] = (object)this.sgn_body ?? System.DBNull.Value;
dr["sgn_userid"] = (object)this.sgn_userid ?? System.DBNull.Value;
dr["sgn_status"] = (object)this.sgn_status ?? System.DBNull.Value;
dr["sgn_datecreated"] = (object)this.sgn_datecreated ?? System.DBNull.Value;
dr["sgn_fileduserid"] = (object)this.sgn_fileduserid ?? System.DBNull.Value;
							 
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
