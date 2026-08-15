
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
    ///m_EstadosPanel Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_EstadosPanel : SimpleBaseObject
    { 
			 ///<summary>
     ///mep_idCuenta   
     ///</summary>
	 [DataMember]
     public int mep_idCuenta { get;set;} 
	  ///<summary>
     ///mep_cAlarmaControl   
     ///</summary>
	 [DataMember]
     public string mep_cAlarmaControl { get;set;} 
	  ///<summary>
     ///mep_iUsuarioControl   
     ///</summary>
	 [DataMember]
     public int mep_iUsuarioControl { get;set;} 
	  ///<summary>
     ///mep_cAlarmaEsperada   
     ///</summary>
	 [DataMember]
     public string mep_cAlarmaEsperada { get;set;} 
	  ///<summary>
     ///mep_iUsuarioEsperado   
     ///</summary>
	 [DataMember]
     public int mep_iUsuarioEsperado { get;set;} 
	  ///<summary>
     ///mep_iMinutos   
     ///</summary>
	 [DataMember]
     public int mep_iMinutos { get;set;} 
	  ///<summary>
     ///mep_iAutoProcesa   
     ///</summary>
	 [DataMember]
     public int mep_iAutoProcesa { get;set;} 
	  ///<summary>
     ///mep_cAlarmaAGenerar   
     ///</summary>
	 [DataMember]
     public string mep_cAlarmaAGenerar { get;set;} 
	 ///<summary>
        ///m_EstadosPanel Constructor
        ///</summary>
        public Simplem_EstadosPanel() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_EstadosPanel Constructor
        ///</summary>
        public Simplem_EstadosPanel(int Id, string Name, int mep_idCuenta, string mep_cAlarmaControl, int mep_iUsuarioControl, string mep_cAlarmaEsperada, int mep_iUsuarioEsperado, int mep_iMinutos, int mep_iAutoProcesa, string mep_cAlarmaAGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mep_idCuenta = mep_idCuenta;
this.mep_cAlarmaControl = mep_cAlarmaControl;
this.mep_iUsuarioControl = mep_iUsuarioControl;
this.mep_cAlarmaEsperada = mep_cAlarmaEsperada;
this.mep_iUsuarioEsperado = mep_iUsuarioEsperado;
this.mep_iMinutos = mep_iMinutos;
this.mep_iAutoProcesa = mep_iAutoProcesa;
this.mep_cAlarmaAGenerar = mep_cAlarmaAGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3194, "m_EstadosPanel");
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
			BaseObject Object = new Dalm_EstadosPanel(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_EstadosPanel Caller = new Callerm_EstadosPanel();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mep_idCuenta = this.mep_idCuenta;
Caller.mep_cAlarmaControl = this.mep_cAlarmaControl;
Caller.mep_iUsuarioControl = this.mep_iUsuarioControl;
Caller.mep_cAlarmaEsperada = this.mep_cAlarmaEsperada;
Caller.mep_iUsuarioEsperado = this.mep_iUsuarioEsperado;
Caller.mep_iMinutos = this.mep_iMinutos;
Caller.mep_iAutoProcesa = this.mep_iAutoProcesa;
Caller.mep_cAlarmaAGenerar = this.mep_cAlarmaAGenerar;

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
               dt.Columns.Add(new DataColumn("mep_idCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_cAlarmaControl", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mep_iUsuarioControl", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mep_iUsuarioEsperado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_iMinutos", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_iAutoProcesa", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mep_cAlarmaAGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mep_idCuenta"] = (object)this.mep_idCuenta ?? System.DBNull.Value;
dr["mep_cAlarmaControl"] = (object)this.mep_cAlarmaControl ?? System.DBNull.Value;
dr["mep_iUsuarioControl"] = (object)this.mep_iUsuarioControl ?? System.DBNull.Value;
dr["mep_cAlarmaEsperada"] = (object)this.mep_cAlarmaEsperada ?? System.DBNull.Value;
dr["mep_iUsuarioEsperado"] = (object)this.mep_iUsuarioEsperado ?? System.DBNull.Value;
dr["mep_iMinutos"] = (object)this.mep_iMinutos ?? System.DBNull.Value;
dr["mep_iAutoProcesa"] = (object)this.mep_iAutoProcesa ?? System.DBNull.Value;
dr["mep_cAlarmaAGenerar"] = (object)this.mep_cAlarmaAGenerar ?? System.DBNull.Value;
							 
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
