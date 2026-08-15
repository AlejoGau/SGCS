
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
    ///m_dealer_stconfig Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_dealer_stconfig : SimpleBaseObject
    { 
			 ///<summary>
     ///dst_cdealer   
     ///</summary>
	 [DataMember]
     public string dst_cdealer { get;set;} 
	  ///<summary>
     ///dst_config   
     ///</summary>
	 [DataMember]
     public string dst_config { get;set;} 
	 ///<summary>
        ///m_dealer_stconfig Constructor
        ///</summary>
        public Simplem_dealer_stconfig() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_dealer_stconfig Constructor
        ///</summary>
        public Simplem_dealer_stconfig(int Id, string Name, string dst_cdealer, string dst_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.dst_cdealer = dst_cdealer;
this.dst_config = dst_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3237, "m_dealer_stconfig");
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
			BaseObject Object = new Dalm_dealer_stconfig(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_dealer_stconfig Caller = new Callerm_dealer_stconfig();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.dst_cdealer = this.dst_cdealer;
Caller.dst_config = this.dst_config;

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
               dt.Columns.Add(new DataColumn("dst_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dst_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dst_cdealer"] = (object)this.dst_cdealer ?? System.DBNull.Value;
dr["dst_config"] = (object)this.dst_config ?? System.DBNull.Value;
							 
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
