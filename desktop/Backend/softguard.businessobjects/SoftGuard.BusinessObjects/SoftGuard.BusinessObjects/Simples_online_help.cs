
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
    ///s_online_help Slbf Class
    ///</summary>
    [DataContract]
    public class Simples_online_help : SimpleBaseObject
    { 
			 ///<summary>
     ///UiApplication   
     ///</summary>
	 [DataMember]
     public string UiApplication { get;set;} 
	  ///<summary>
     ///Language   
     ///</summary>
	 [DataMember]
     public string Language { get;set;} 
	  ///<summary>
     ///Translation   
     ///</summary>
	 [DataMember]
     public string Translation { get;set;} 
	  ///<summary>
     ///Status   
     ///</summary>
	 [DataMember]
     public string Status { get;set;} 
	  ///<summary>
     ///Created   
     ///</summary>
	 [DataMember]
     public DateTime? Created { get;set;} 
	  ///<summary>
     ///Modified   
     ///</summary>
	 [DataMember]
     public DateTime? Modified { get;set;} 
	  ///<summary>
     ///UserId   
     ///</summary>
	 [DataMember]
     public int UserId { get;set;} 
	  ///<summary>
     ///UserName   
     ///</summary>
	 [DataMember]
     public string UserName { get;set;} 
	 ///<summary>
        ///s_online_help Constructor
        ///</summary>
        public Simples_online_help() : base()
  {
  InitClass();
  }
        ///<summary>
        ///s_online_help Constructor
        ///</summary>
        public Simples_online_help(int Id, string Name, string UiApplication, string Language, string Translation, string Status, DateTime? Created, DateTime? Modified, int UserId, string UserName) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.UiApplication = UiApplication;
this.Language = Language;
this.Translation = Translation;
this.Status = Status;
this.Created = Created;
this.Modified = Modified;
this.UserId = UserId;
this.UserName = UserName;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3167, "s_online_help");
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
			BaseObject Object = new Dals_online_help(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callers_online_help Caller = new Callers_online_help();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.UiApplication = this.UiApplication;
Caller.Language = this.Language;
Caller.Translation = this.Translation;
Caller.Status = this.Status;
Caller.Created = this.Created;
Caller.Modified = this.Modified;
Caller.UserId = this.UserId;
Caller.UserName = this.UserName;

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
               dt.Columns.Add(new DataColumn("UiApplication", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Language", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Translation", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Status", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Created", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("Modified", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("UserId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("UserName", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["UiApplication"] = (object)this.UiApplication ?? System.DBNull.Value;
dr["Language"] = (object)this.Language ?? System.DBNull.Value;
dr["Translation"] = (object)this.Translation ?? System.DBNull.Value;
dr["Status"] = (object)this.Status ?? System.DBNull.Value;
dr["Created"] = (object)this.Created ?? System.DBNull.Value;
dr["Modified"] = (object)this.Modified ?? System.DBNull.Value;
dr["UserId"] = (object)this.UserId ?? System.DBNull.Value;
dr["UserName"] = (object)this.UserName ?? System.DBNull.Value;
							 
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
