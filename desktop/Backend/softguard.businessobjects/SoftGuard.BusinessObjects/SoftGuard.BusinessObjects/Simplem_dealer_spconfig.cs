
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
    ///m_dealer_spconfig Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_dealer_spconfig : SimpleBaseObject
    { 
			 ///<summary>
     ///dsp_cdealer   
     ///</summary>
	 [DataMember]
     public string dsp_cdealer { get;set;} 
	  ///<summary>
     ///dsp_config   
     ///</summary>
	 [DataMember]
     public string dsp_config { get;set;} 
	 ///<summary>
        ///m_dealer_spconfig Constructor
        ///</summary>
        public Simplem_dealer_spconfig() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_dealer_spconfig Constructor
        ///</summary>
        public Simplem_dealer_spconfig(int Id, string Name, string dsp_cdealer, string dsp_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.dsp_cdealer = dsp_cdealer;
this.dsp_config = dsp_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3193, "m_dealer_spconfig");
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
			BaseObject Object = new Dalm_dealer_spconfig(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_dealer_spconfig Caller = new Callerm_dealer_spconfig();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.dsp_cdealer = this.dsp_cdealer;
Caller.dsp_config = this.dsp_config;

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
               dt.Columns.Add(new DataColumn("dsp_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dsp_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dsp_cdealer"] = (object)this.dsp_cdealer ?? System.DBNull.Value;
dr["dsp_config"] = (object)this.dsp_config ?? System.DBNull.Value;
							 
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
