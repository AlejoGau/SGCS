
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
    ///p_lista_correo Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_lista_correo : SimpleBaseObject
    { 
			 ///<summary>
     ///plc_name   
     ///</summary>
	 [DataMember]
     public string plc_name { get;set;} 
	  ///<summary>
     ///plc_dealer   
     ///</summary>
	 [DataMember]
     public string plc_dealer { get;set;} 
	  ///<summary>
     ///plc_correos   
     ///</summary>
	 [DataMember]
     public string plc_correos { get;set;} 
	 ///<summary>
        ///p_lista_correo Constructor
        ///</summary>
        public Simplep_lista_correo() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_lista_correo Constructor
        ///</summary>
        public Simplep_lista_correo(int Id, string Name, string plc_name, string plc_dealer, string plc_correos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.plc_name = plc_name;
this.plc_dealer = plc_dealer;
this.plc_correos = plc_correos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3181, "p_lista_correo");
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
			BaseObject Object = new Dalp_lista_correo(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_lista_correo Caller = new Callerp_lista_correo();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.plc_name = this.plc_name;
Caller.plc_dealer = this.plc_dealer;
Caller.plc_correos = this.plc_correos;

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
               dt.Columns.Add(new DataColumn("plc_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("plc_dealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("plc_correos", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["plc_name"] = (object)this.plc_name ?? System.DBNull.Value;
dr["plc_dealer"] = (object)this.plc_dealer ?? System.DBNull.Value;
dr["plc_correos"] = (object)this.plc_correos ?? System.DBNull.Value;
							 
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
