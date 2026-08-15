
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
    ///m_simcard Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_simcard : SimpleBaseObject
    { 
			 ///<summary>
     ///sim_cuenta   
     ///</summary>
	 [DataMember]
     public int sim_cuenta { get;set;} 
	  ///<summary>
     ///sim_apn   
     ///</summary>
	 [DataMember]
     public int sim_apn { get;set;} 
	  ///<summary>
     ///sim_csid   
     ///</summary>
	 [DataMember]
     public int sim_csid { get;set;} 
	  ///<summary>
     ///sim_fecha_activacion   
     ///</summary>
	 [DataMember]
     public DateTime? sim_fecha_activacion { get;set;} 
	  ///<summary>
     ///sim_iccid   
     ///</summary>
	 [DataMember]
     public string sim_iccid { get;set;} 
	  ///<summary>
     ///sim_marca   
     ///</summary>
	 [DataMember]
     public int sim_marca { get;set;} 
	  ///<summary>
     ///sim_estado   
     ///</summary>
	 [DataMember]
     public int sim_estado { get;set;} 
	  ///<summary>
     ///sim_codigo   
     ///</summary>
	 [DataMember]
     public string sim_codigo { get;set;} 
	  ///<summary>
     ///sim_observaciones   
     ///</summary>
	 [DataMember]
     public string sim_observaciones { get;set;} 
	  ///<summary>
     ///sim_ClaveMaster   
     ///</summary>
	 [DataMember]
     public string sim_ClaveMaster { get;set;} 
	  ///<summary>
     ///sim_udw_idKey   
     ///</summary>
	 [DataMember]
     public int sim_udw_idKey { get;set;} 
	 ///<summary>
        ///m_simcard Constructor
        ///</summary>
        public Simplem_simcard() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_simcard Constructor
        ///</summary>
        public Simplem_simcard(int Id, string Name, int sim_cuenta, int sim_apn, int sim_csid, DateTime? sim_fecha_activacion, string sim_iccid, int sim_marca, int sim_estado, string sim_codigo, string sim_observaciones, string sim_ClaveMaster, int sim_udw_idKey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.sim_cuenta = sim_cuenta;
this.sim_apn = sim_apn;
this.sim_csid = sim_csid;
this.sim_fecha_activacion = sim_fecha_activacion;
this.sim_iccid = sim_iccid;
this.sim_marca = sim_marca;
this.sim_estado = sim_estado;
this.sim_codigo = sim_codigo;
this.sim_observaciones = sim_observaciones;
this.sim_ClaveMaster = sim_ClaveMaster;
this.sim_udw_idKey = sim_udw_idKey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3233, "m_simcard");
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
			BaseObject Object = new Dalm_simcard(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_simcard Caller = new Callerm_simcard();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.sim_cuenta = this.sim_cuenta;
Caller.sim_apn = this.sim_apn;
Caller.sim_csid = this.sim_csid;
Caller.sim_fecha_activacion = this.sim_fecha_activacion;
Caller.sim_iccid = this.sim_iccid;
Caller.sim_marca = this.sim_marca;
Caller.sim_estado = this.sim_estado;
Caller.sim_codigo = this.sim_codigo;
Caller.sim_observaciones = this.sim_observaciones;
Caller.sim_ClaveMaster = this.sim_ClaveMaster;
Caller.sim_udw_idKey = this.sim_udw_idKey;

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
               dt.Columns.Add(new DataColumn("sim_cuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_apn", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_csid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_fecha_activacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("sim_iccid", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_marca", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("sim_codigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_observaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_ClaveMaster", typeof (string)));               
							 dt.Columns.Add(new DataColumn("sim_udw_idKey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["sim_cuenta"] = (object)this.sim_cuenta ?? System.DBNull.Value;
dr["sim_apn"] = (object)this.sim_apn ?? System.DBNull.Value;
dr["sim_csid"] = (object)this.sim_csid ?? System.DBNull.Value;
dr["sim_fecha_activacion"] = (object)this.sim_fecha_activacion ?? System.DBNull.Value;
dr["sim_iccid"] = (object)this.sim_iccid ?? System.DBNull.Value;
dr["sim_marca"] = (object)this.sim_marca ?? System.DBNull.Value;
dr["sim_estado"] = (object)this.sim_estado ?? System.DBNull.Value;
dr["sim_codigo"] = (object)this.sim_codigo ?? System.DBNull.Value;
dr["sim_observaciones"] = (object)this.sim_observaciones ?? System.DBNull.Value;
dr["sim_ClaveMaster"] = (object)this.sim_ClaveMaster ?? System.DBNull.Value;
dr["sim_udw_idKey"] = (object)this.sim_udw_idKey ?? System.DBNull.Value;
							 
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
