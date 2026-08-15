
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
    ///MG_Afip_Cae Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_Afip_Cae : SimpleBaseObject
    { 
			 ///<summary>
     ///mac_idcbte   
     ///</summary>
	 [DataMember]
     public int mac_idcbte { get;set;} 
	  ///<summary>
     ///mac_estado   
     ///</summary>
	 [DataMember]
     public int mac_estado { get;set;} 
	  ///<summary>
     ///mac_fechaalta   
     ///</summary>
	 [DataMember]
     public DateTime? mac_fechaalta { get;set;} 
	  ///<summary>
     ///mac_fechamod   
     ///</summary>
	 [DataMember]
     public DateTime? mac_fechamod { get;set;} 
	 ///<summary>
        ///MG_Afip_Cae Constructor
        ///</summary>
        public SimpleMG_Afip_Cae() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_Afip_Cae Constructor
        ///</summary>
        public SimpleMG_Afip_Cae(int Id, string Name, int mac_idcbte, int mac_estado, DateTime? mac_fechaalta, DateTime? mac_fechamod) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mac_idcbte = mac_idcbte;
this.mac_estado = mac_estado;
this.mac_fechaalta = mac_fechaalta;
this.mac_fechamod = mac_fechamod;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3197, "MG_Afip_Cae");
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
			BaseObject Object = new DalMG_Afip_Cae(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_Afip_Cae Caller = new CallerMG_Afip_Cae();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mac_idcbte = this.mac_idcbte;
Caller.mac_estado = this.mac_estado;
Caller.mac_fechaalta = this.mac_fechaalta;
Caller.mac_fechamod = this.mac_fechamod;

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
               dt.Columns.Add(new DataColumn("mac_idcbte", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mac_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mac_fechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mac_fechamod", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mac_idcbte"] = (object)this.mac_idcbte ?? System.DBNull.Value;
dr["mac_estado"] = (object)this.mac_estado ?? System.DBNull.Value;
dr["mac_fechaalta"] = (object)this.mac_fechaalta ?? System.DBNull.Value;
dr["mac_fechamod"] = (object)this.mac_fechamod ?? System.DBNull.Value;
							 
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
