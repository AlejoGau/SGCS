
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
    ///p_vcrestricciones Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_vcrestricciones : SimpleBaseObject
    { 
			 ///<summary>
     ///vcr_name   
     ///</summary>
	 [DataMember]
     public string vcr_name { get;set;} 
	  ///<summary>
     ///vcr_list   
     ///</summary>
	 [DataMember]
     public string vcr_list { get;set;} 
	  ///<summary>
     ///vcr_distance   
     ///</summary>
	 [DataMember]
     public int vcr_distance { get;set;} 
	  ///<summary>
     ///vcr_status   
     ///</summary>
	 [DataMember]
     public int vcr_status { get;set;} 
	  ///<summary>
     ///vcr_idorganizacion   
     ///</summary>
	 [DataMember]
     public int vcr_idorganizacion { get;set;} 
	 ///<summary>
        ///p_vcrestricciones Constructor
        ///</summary>
        public Simplep_vcrestricciones() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_vcrestricciones Constructor
        ///</summary>
        public Simplep_vcrestricciones(int Id, string Name, string vcr_name, string vcr_list, int vcr_distance, int vcr_status, int vcr_idorganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.vcr_name = vcr_name;
this.vcr_list = vcr_list;
this.vcr_distance = vcr_distance;
this.vcr_status = vcr_status;
this.vcr_idorganizacion = vcr_idorganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3201, "p_vcrestricciones");
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
			BaseObject Object = new Dalp_vcrestricciones(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_vcrestricciones Caller = new Callerp_vcrestricciones();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.vcr_name = this.vcr_name;
Caller.vcr_list = this.vcr_list;
Caller.vcr_distance = this.vcr_distance;
Caller.vcr_status = this.vcr_status;
Caller.vcr_idorganizacion = this.vcr_idorganizacion;

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
               dt.Columns.Add(new DataColumn("vcr_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vcr_list", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vcr_distance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vcr_status", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vcr_idorganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["vcr_name"] = (object)this.vcr_name ?? System.DBNull.Value;
dr["vcr_list"] = (object)this.vcr_list ?? System.DBNull.Value;
dr["vcr_distance"] = (object)this.vcr_distance ?? System.DBNull.Value;
dr["vcr_status"] = (object)this.vcr_status ?? System.DBNull.Value;
dr["vcr_idorganizacion"] = (object)this.vcr_idorganizacion ?? System.DBNull.Value;
							 
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
