
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
    ///p_comandos_ip Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_comandos_ip : SimpleBaseObject
    { 
			 ///<summary>
     ///cmd_tfechahora   
     ///</summary>
	 [DataMember]
     public DateTime? cmd_tfechahora { get;set;} 
	  ///<summary>
     ///cmd_idCuenta   
     ///</summary>
	 [DataMember]
     public int cmd_idCuenta { get;set;} 
	  ///<summary>
     ///cmd_idReceptor   
     ///</summary>
	 [DataMember]
     public int cmd_idReceptor { get;set;} 
	  ///<summary>
     ///cmd_iComando   
     ///</summary>
	 [DataMember]
     public int cmd_iComando { get;set;} 
	  ///<summary>
     ///cmd_cValores   
     ///</summary>
	 [DataMember]
     public string cmd_cValores { get;set;} 
	  ///<summary>
     ///cmd_nEstado   
     ///</summary>
	 [DataMember]
     public Decimal cmd_nEstado { get;set;} 
	  ///<summary>
     ///cmd_cObservaciones   
     ///</summary>
	 [DataMember]
     public string cmd_cObservaciones { get;set;} 
	  ///<summary>
     ///cmd_iEsCustom   
     ///</summary>
	 [DataMember]
     public int cmd_iEsCustom { get;set;} 
	  ///<summary>
     ///cmd_cAlarmaGenerar   
     ///</summary>
	 [DataMember]
     public string cmd_cAlarmaGenerar { get;set;} 
	 ///<summary>
        ///p_comandos_ip Constructor
        ///</summary>
        public Simplep_comandos_ip() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_comandos_ip Constructor
        ///</summary>
        public Simplep_comandos_ip(int Id, string Name, DateTime? cmd_tfechahora, int cmd_idCuenta, int cmd_idReceptor, int cmd_iComando, string cmd_cValores, Decimal cmd_nEstado, string cmd_cObservaciones, int cmd_iEsCustom, string cmd_cAlarmaGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cmd_tfechahora = cmd_tfechahora;
this.cmd_idCuenta = cmd_idCuenta;
this.cmd_idReceptor = cmd_idReceptor;
this.cmd_iComando = cmd_iComando;
this.cmd_cValores = cmd_cValores;
this.cmd_nEstado = cmd_nEstado;
this.cmd_cObservaciones = cmd_cObservaciones;
this.cmd_iEsCustom = cmd_iEsCustom;
this.cmd_cAlarmaGenerar = cmd_cAlarmaGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3065, "p_comandos_ip");
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
			BaseObject Object = new Dalp_comandos_ip(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_comandos_ip Caller = new Callerp_comandos_ip();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cmd_tfechahora = this.cmd_tfechahora;
Caller.cmd_idCuenta = this.cmd_idCuenta;
Caller.cmd_idReceptor = this.cmd_idReceptor;
Caller.cmd_iComando = this.cmd_iComando;
Caller.cmd_cValores = this.cmd_cValores;
Caller.cmd_nEstado = this.cmd_nEstado;
Caller.cmd_cObservaciones = this.cmd_cObservaciones;
Caller.cmd_iEsCustom = this.cmd_iEsCustom;
Caller.cmd_cAlarmaGenerar = this.cmd_cAlarmaGenerar;

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
               dt.Columns.Add(new DataColumn("cmd_tfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cmd_idCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_idReceptor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_iComando", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_cValores", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cmd_nEstado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cmd_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cmd_iEsCustom", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cmd_cAlarmaGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cmd_tfechahora"] = (object)this.cmd_tfechahora ?? System.DBNull.Value;
dr["cmd_idCuenta"] = (object)this.cmd_idCuenta ?? System.DBNull.Value;
dr["cmd_idReceptor"] = (object)this.cmd_idReceptor ?? System.DBNull.Value;
dr["cmd_iComando"] = (object)this.cmd_iComando ?? System.DBNull.Value;
dr["cmd_cValores"] = (object)this.cmd_cValores ?? System.DBNull.Value;
dr["cmd_nEstado"] = (object)this.cmd_nEstado ?? System.DBNull.Value;
dr["cmd_cObservaciones"] = (object)this.cmd_cObservaciones ?? System.DBNull.Value;
dr["cmd_iEsCustom"] = (object)this.cmd_iEsCustom ?? System.DBNull.Value;
dr["cmd_cAlarmaGenerar"] = (object)this.cmd_cAlarmaGenerar ?? System.DBNull.Value;
							 
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
