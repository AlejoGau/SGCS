
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
    ///t_WeSafePriceOptions Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_WeSafePriceOptions : SimpleBaseObject
    { 
			 ///<summary>
     ///wpr_nPrice   
     ///</summary>
	 [DataMember]
     public Decimal wpr_nPrice { get;set;} 
	 ///<summary>
        ///t_WeSafePriceOptions Constructor
        ///</summary>
        public Simplet_WeSafePriceOptions() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_WeSafePriceOptions Constructor
        ///</summary>
        public Simplet_WeSafePriceOptions(int Id, string Name, Decimal wpr_nPrice) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.wpr_nPrice = wpr_nPrice;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7040, "t_WeSafePriceOptions");
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
			BaseObject Object = new Dalt_WeSafePriceOptions(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_WeSafePriceOptions Caller = new Callert_WeSafePriceOptions();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.wpr_nPrice = this.wpr_nPrice;

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
               dt.Columns.Add(new DataColumn("wpr_nPrice", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wpr_nPrice"] = (object)this.wpr_nPrice ?? System.DBNull.Value;
							 
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
