
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
    ///GeoFense Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleGeoFense : SimpleBaseObject
    { 
			 ///<summary>
     ///GeoType   
     ///</summary>
	 [DataMember]
     public string GeoType { get;set;} 
	  ///<summary>
     ///Dealer   
     ///</summary>
	 [DataMember]
     public string Dealer { get;set;} 
	  ///<summary>
     ///MetaData   
     ///</summary>
	 [DataMember]
     public string MetaData { get;set;} 
	  ///<summary>
     ///Style   
     ///</summary>
	 [DataMember]
     public string Style { get;set;} 
	  ///<summary>
     ///MaxSpeed   
     ///</summary>
	 [DataMember]
     public int MaxSpeed { get;set;} 
	  ///<summary>
     ///GeoGroup   
     ///</summary>
	 [DataMember]
     public int GeoGroup { get;set;} 
	 ///<summary>
        ///GeoFense Constructor
        ///</summary>
        public SimpleGeoFense() : base()
  {
  InitClass();
  }
        ///<summary>
        ///GeoFense Constructor
        ///</summary>
        public SimpleGeoFense(int Id, string Name, string GeoType, string Dealer, string MetaData, string Style, int MaxSpeed, int GeoGroup) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.GeoType = GeoType;
this.Dealer = Dealer;
this.MetaData = MetaData;
this.Style = Style;
this.MaxSpeed = MaxSpeed;
this.GeoGroup = GeoGroup;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3060, "GeoFense");
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
			BaseObject Object = new DalGeoFense(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerGeoFense Caller = new CallerGeoFense();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.GeoType = this.GeoType;
Caller.Dealer = this.Dealer;
Caller.MetaData = this.MetaData;
Caller.Style = this.Style;
Caller.MaxSpeed = this.MaxSpeed;
Caller.GeoGroup = this.GeoGroup;

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
               dt.Columns.Add(new DataColumn("GeoType", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Dealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MetaData", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Style", typeof (string)));               
							 dt.Columns.Add(new DataColumn("MaxSpeed", typeof (int)));               
							 dt.Columns.Add(new DataColumn("GeoGroup", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["GeoType"] = (object)this.GeoType ?? System.DBNull.Value;
dr["Dealer"] = (object)this.Dealer ?? System.DBNull.Value;
dr["MetaData"] = (object)this.MetaData ?? System.DBNull.Value;
dr["Style"] = (object)this.Style ?? System.DBNull.Value;
dr["MaxSpeed"] = (object)this.MaxSpeed ?? System.DBNull.Value;
dr["GeoGroup"] = (object)this.GeoGroup ?? System.DBNull.Value;
							 
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
