
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
    ///p_encuesta Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_encuesta : SimpleBaseObject
    { 
			 ///<summary>
     ///enc_name   
     ///</summary>
	 [DataMember]
     public string enc_name { get;set;} 
	  ///<summary>
     ///enc_descripcion   
     ///</summary>
	 [DataMember]
     public string enc_descripcion { get;set;} 
	  ///<summary>
     ///enc_status   
     ///</summary>
	 [DataMember]
     public int enc_status { get;set;} 
	 ///<summary>
        ///p_encuesta Constructor
        ///</summary>
        public Simplep_encuesta() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_encuesta Constructor
        ///</summary>
        public Simplep_encuesta(int Id, string Name, string enc_name, string enc_descripcion, int enc_status) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.enc_name = enc_name;
this.enc_descripcion = enc_descripcion;
this.enc_status = enc_status;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3202, "p_encuesta");
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
			BaseObject Object = new Dalp_encuesta(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_encuesta Caller = new Callerp_encuesta();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.enc_name = this.enc_name;
Caller.enc_descripcion = this.enc_descripcion;
Caller.enc_status = this.enc_status;

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
               dt.Columns.Add(new DataColumn("enc_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("enc_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("enc_status", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["enc_name"] = (object)this.enc_name ?? System.DBNull.Value;
dr["enc_descripcion"] = (object)this.enc_descripcion ?? System.DBNull.Value;
dr["enc_status"] = (object)this.enc_status ?? System.DBNull.Value;
							 
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
