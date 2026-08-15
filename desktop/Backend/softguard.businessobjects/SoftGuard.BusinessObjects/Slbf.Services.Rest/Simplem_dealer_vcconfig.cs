
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
    ///m_dealer_vcconfig Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_dealer_vcconfig : SimpleBaseObject
    { 
			 ///<summary>
     ///dvc_cdealer   
     ///</summary>
	 [DataMember]
     public string dvc_cdealer { get;set;} 
	  ///<summary>
     ///dvc_config   
     ///</summary>
	 [DataMember]
     public string dvc_config { get;set;} 
	 ///<summary>
        ///m_dealer_vcconfig Constructor
        ///</summary>
        public Simplem_dealer_vcconfig() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_dealer_vcconfig Constructor
        ///</summary>
        public Simplem_dealer_vcconfig(int Id, string Name, string dvc_cdealer, string dvc_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.dvc_cdealer = dvc_cdealer;
this.dvc_config = dvc_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3213, "m_dealer_vcconfig");
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
			BaseObject Object = new Dalm_dealer_vcconfig(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_dealer_vcconfig Caller = new Callerm_dealer_vcconfig();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.dvc_cdealer = this.dvc_cdealer;
Caller.dvc_config = this.dvc_config;

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
               dt.Columns.Add(new DataColumn("dvc_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dvc_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dvc_cdealer"] = (object)this.dvc_cdealer ?? System.DBNull.Value;
dr["dvc_config"] = (object)this.dvc_config ?? System.DBNull.Value;
							 
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
