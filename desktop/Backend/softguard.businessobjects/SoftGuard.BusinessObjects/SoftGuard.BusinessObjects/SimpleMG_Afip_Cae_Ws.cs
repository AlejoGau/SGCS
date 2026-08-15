
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
    ///MG_Afip_Cae_Ws Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_Afip_Cae_Ws : SimpleBaseObject
    { 
			 ///<summary>
     ///mcw_macidkey   
     ///</summary>
	 [DataMember]
     public int mcw_macidkey { get;set;} 
	  ///<summary>
     ///mcw_estado   
     ///</summary>
	 [DataMember]
     public int mcw_estado { get;set;} 
	  ///<summary>
     ///mcw_fecha   
     ///</summary>
	 [DataMember]
     public DateTime? mcw_fecha { get;set;} 
	  ///<summary>
     ///mcw_requesturl   
     ///</summary>
	 [DataMember]
     public string mcw_requesturl { get;set;} 
	  ///<summary>
     ///mcw_requestxml   
     ///</summary>
	 [DataMember]
     public string mcw_requestxml { get;set;} 
	  ///<summary>
     ///mcw_responsexml   
     ///</summary>
	 [DataMember]
     public string mcw_responsexml { get;set;} 
	 ///<summary>
        ///MG_Afip_Cae_Ws Constructor
        ///</summary>
        public SimpleMG_Afip_Cae_Ws() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_Afip_Cae_Ws Constructor
        ///</summary>
        public SimpleMG_Afip_Cae_Ws(int Id, string Name, int mcw_macidkey, int mcw_estado, DateTime? mcw_fecha, string mcw_requesturl, string mcw_requestxml, string mcw_responsexml) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mcw_macidkey = mcw_macidkey;
this.mcw_estado = mcw_estado;
this.mcw_fecha = mcw_fecha;
this.mcw_requesturl = mcw_requesturl;
this.mcw_requestxml = mcw_requestxml;
this.mcw_responsexml = mcw_responsexml;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3198, "MG_Afip_Cae_Ws");
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
			BaseObject Object = new DalMG_Afip_Cae_Ws(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_Afip_Cae_Ws Caller = new CallerMG_Afip_Cae_Ws();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mcw_macidkey = this.mcw_macidkey;
Caller.mcw_estado = this.mcw_estado;
Caller.mcw_fecha = this.mcw_fecha;
Caller.mcw_requesturl = this.mcw_requesturl;
Caller.mcw_requestxml = this.mcw_requestxml;
Caller.mcw_responsexml = this.mcw_responsexml;

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
               dt.Columns.Add(new DataColumn("mcw_macidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mcw_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mcw_fecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mcw_requesturl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mcw_requestxml", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mcw_responsexml", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mcw_macidkey"] = (object)this.mcw_macidkey ?? System.DBNull.Value;
dr["mcw_estado"] = (object)this.mcw_estado ?? System.DBNull.Value;
dr["mcw_fecha"] = (object)this.mcw_fecha ?? System.DBNull.Value;
dr["mcw_requesturl"] = (object)this.mcw_requesturl ?? System.DBNull.Value;
dr["mcw_requestxml"] = (object)this.mcw_requestxml ?? System.DBNull.Value;
dr["mcw_responsexml"] = (object)this.mcw_responsexml ?? System.DBNull.Value;
							 
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
