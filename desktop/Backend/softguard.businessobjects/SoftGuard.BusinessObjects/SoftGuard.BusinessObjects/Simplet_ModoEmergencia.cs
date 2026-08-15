
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
    ///t_ModoEmergencia Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_ModoEmergencia : SimpleBaseObject
    { 
			 ///<summary>
     ///tme_nEstado   
     ///</summary>
	 [DataMember]
     public int tme_nEstado { get;set;} 
	  ///<summary>
     ///tme_cEventos   
     ///</summary>
	 [DataMember]
     public string tme_cEventos { get;set;} 
	  ///<summary>
     ///tme_cDealer   
     ///</summary>
	 [DataMember]
     public string tme_cDealer { get;set;} 
	 ///<summary>
        ///t_ModoEmergencia Constructor
        ///</summary>
        public Simplet_ModoEmergencia() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_ModoEmergencia Constructor
        ///</summary>
        public Simplet_ModoEmergencia(int Id, string Name, int tme_nEstado, string tme_cEventos, string tme_cDealer) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tme_nEstado = tme_nEstado;
this.tme_cEventos = tme_cEventos;
this.tme_cDealer = tme_cDealer;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7032, "t_ModoEmergencia");
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
			BaseObject Object = new Dalt_ModoEmergencia(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_ModoEmergencia Caller = new Callert_ModoEmergencia();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tme_nEstado = this.tme_nEstado;
Caller.tme_cEventos = this.tme_cEventos;
Caller.tme_cDealer = this.tme_cDealer;

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
               dt.Columns.Add(new DataColumn("tme_nEstado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tme_cEventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tme_cDealer", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tme_nEstado"] = (object)this.tme_nEstado ?? System.DBNull.Value;
dr["tme_cEventos"] = (object)this.tme_cEventos ?? System.DBNull.Value;
dr["tme_cDealer"] = (object)this.tme_cDealer ?? System.DBNull.Value;
							 
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
