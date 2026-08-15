
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
    ///m_tstconexion Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_tstconexion : SimpleBaseObject
    { 
			 ///<summary>
     ///txc_idCuenta   
     ///</summary>
	 [DataMember]
     public int txc_idCuenta { get;set;} 
	  ///<summary>
     ///txc_idIRSConn   
     ///</summary>
	 [DataMember]
     public int txc_idIRSConn { get;set;} 
	  ///<summary>
     ///txc_cAlarmaEsperada   
     ///</summary>
	 [DataMember]
     public string txc_cAlarmaEsperada { get;set;} 
	  ///<summary>
     ///txc_iMinutos   
     ///</summary>
	 [DataMember]
     public int txc_iMinutos { get;set;} 
	  ///<summary>
     ///txc_cAlarmaAGenerar   
     ///</summary>
	 [DataMember]
     public string txc_cAlarmaAGenerar { get;set;} 
	  ///<summary>
     ///txc_cAlarmaAutoprocesa   
     ///</summary>
	 [DataMember]
     public string txc_cAlarmaAutoprocesa { get;set;} 
	 ///<summary>
        ///m_tstconexion Constructor
        ///</summary>
        public Simplem_tstconexion() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_tstconexion Constructor
        ///</summary>
        public Simplem_tstconexion(int Id, string Name, int txc_idCuenta, int txc_idIRSConn, string txc_cAlarmaEsperada, int txc_iMinutos, string txc_cAlarmaAGenerar, string txc_cAlarmaAutoprocesa) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.txc_idCuenta = txc_idCuenta;
this.txc_idIRSConn = txc_idIRSConn;
this.txc_cAlarmaEsperada = txc_cAlarmaEsperada;
this.txc_iMinutos = txc_iMinutos;
this.txc_cAlarmaAGenerar = txc_cAlarmaAGenerar;
this.txc_cAlarmaAutoprocesa = txc_cAlarmaAutoprocesa;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3216, "m_tstconexion");
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
			BaseObject Object = new Dalm_tstconexion(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_tstconexion Caller = new Callerm_tstconexion();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.txc_idCuenta = this.txc_idCuenta;
Caller.txc_idIRSConn = this.txc_idIRSConn;
Caller.txc_cAlarmaEsperada = this.txc_cAlarmaEsperada;
Caller.txc_iMinutos = this.txc_iMinutos;
Caller.txc_cAlarmaAGenerar = this.txc_cAlarmaAGenerar;
Caller.txc_cAlarmaAutoprocesa = this.txc_cAlarmaAutoprocesa;

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
               dt.Columns.Add(new DataColumn("txc_idCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("txc_idIRSConn", typeof (int)));               
							 dt.Columns.Add(new DataColumn("txc_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("txc_iMinutos", typeof (int)));               
							 dt.Columns.Add(new DataColumn("txc_cAlarmaAGenerar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("txc_cAlarmaAutoprocesa", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["txc_idCuenta"] = (object)this.txc_idCuenta ?? System.DBNull.Value;
dr["txc_idIRSConn"] = (object)this.txc_idIRSConn ?? System.DBNull.Value;
dr["txc_cAlarmaEsperada"] = (object)this.txc_cAlarmaEsperada ?? System.DBNull.Value;
dr["txc_iMinutos"] = (object)this.txc_iMinutos ?? System.DBNull.Value;
dr["txc_cAlarmaAGenerar"] = (object)this.txc_cAlarmaAGenerar ?? System.DBNull.Value;
dr["txc_cAlarmaAutoprocesa"] = (object)this.txc_cAlarmaAutoprocesa ?? System.DBNull.Value;
							 
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
