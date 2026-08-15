
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
    ///Test Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleTest : SimpleBaseObject
    { 
			 ///<summary>
     ///tst_ncada   
     ///</summary>
	 [DataMember]
     public Decimal tst_ncada { get;set;} 
	  ///<summary>
     ///tst_ntipo   
     ///</summary>
	 [DataMember]
     public Decimal tst_ntipo { get;set;} 
	  ///<summary>
     ///tst_ireinicio   
     ///</summary>
	 [DataMember]
     public int tst_ireinicio { get;set;} 
	  ///<summary>
     ///tst_calarma   
     ///</summary>
	 [DataMember]
     public string tst_calarma { get;set;} 
	  ///<summary>
     ///tst_ncada2   
     ///</summary>
	 [DataMember]
     public Decimal tst_ncada2 { get;set;} 
	  ///<summary>
     ///tst_ntipo2   
     ///</summary>
	 [DataMember]
     public Decimal tst_ntipo2 { get;set;} 
	  ///<summary>
     ///tst_calarmaesperada   
     ///</summary>
	 [DataMember]
     public string tst_calarmaesperada { get;set;} 
	  ///<summary>
     ///tst_calarmagenerar   
     ///</summary>
	 [DataMember]
     public string tst_calarmagenerar { get;set;} 
	  ///<summary>
     ///tst_ncada3   
     ///</summary>
	 [DataMember]
     public Decimal tst_ncada3 { get;set;} 
	  ///<summary>
     ///tst_ntipo3   
     ///</summary>
	 [DataMember]
     public Decimal tst_ntipo3 { get;set;} 
	  ///<summary>
     ///tst_calarma3esperada   
     ///</summary>
	 [DataMember]
     public string tst_calarma3esperada { get;set;} 
	  ///<summary>
     ///tst_calarma3generar   
     ///</summary>
	 [DataMember]
     public string tst_calarma3generar { get;set;} 
	  ///<summary>
     ///tst_cAlarmaAutoprocesa   
     ///</summary>
	 [DataMember]
     public string tst_cAlarmaAutoprocesa { get;set;} 
	  ///<summary>
     ///tst_cAlarma2Autoprocesa   
     ///</summary>
	 [DataMember]
     public string tst_cAlarma2Autoprocesa { get;set;} 
	  ///<summary>
     ///tst_cAlarma3Autoprocesa   
     ///</summary>
	 [DataMember]
     public string tst_cAlarma3Autoprocesa { get;set;} 
	  ///<summary>
     ///tst_iTiempoCtrl   
     ///</summary>
	 [DataMember]
     public int tst_iTiempoCtrl { get;set;} 
	  ///<summary>
     ///tst_iCtrlExec   
     ///</summary>
	 [DataMember]
     public int tst_iCtrlExec { get;set;} 
	  ///<summary>
     ///tst_cAlarmaCtrlGenerar   
     ///</summary>
	 [DataMember]
     public string tst_cAlarmaCtrlGenerar { get;set;} 
	 ///<summary>
        ///Test Constructor
        ///</summary>
        public SimpleTest() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Test Constructor
        ///</summary>
        public SimpleTest(int Id, string Name, Decimal tst_ncada, Decimal tst_ntipo, int tst_ireinicio, string tst_calarma, Decimal tst_ncada2, Decimal tst_ntipo2, string tst_calarmaesperada, string tst_calarmagenerar, Decimal tst_ncada3, Decimal tst_ntipo3, string tst_calarma3esperada, string tst_calarma3generar, string tst_cAlarmaAutoprocesa, string tst_cAlarma2Autoprocesa, string tst_cAlarma3Autoprocesa, int tst_iTiempoCtrl, int tst_iCtrlExec, string tst_cAlarmaCtrlGenerar) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tst_ncada = tst_ncada;
this.tst_ntipo = tst_ntipo;
this.tst_ireinicio = tst_ireinicio;
this.tst_calarma = tst_calarma;
this.tst_ncada2 = tst_ncada2;
this.tst_ntipo2 = tst_ntipo2;
this.tst_calarmaesperada = tst_calarmaesperada;
this.tst_calarmagenerar = tst_calarmagenerar;
this.tst_ncada3 = tst_ncada3;
this.tst_ntipo3 = tst_ntipo3;
this.tst_calarma3esperada = tst_calarma3esperada;
this.tst_calarma3generar = tst_calarma3generar;
this.tst_cAlarmaAutoprocesa = tst_cAlarmaAutoprocesa;
this.tst_cAlarma2Autoprocesa = tst_cAlarma2Autoprocesa;
this.tst_cAlarma3Autoprocesa = tst_cAlarma3Autoprocesa;
this.tst_iTiempoCtrl = tst_iTiempoCtrl;
this.tst_iCtrlExec = tst_iCtrlExec;
this.tst_cAlarmaCtrlGenerar = tst_cAlarmaCtrlGenerar;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3031, "Test");
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
			BaseObject Object = new DalTest(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerTest Caller = new CallerTest();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tst_ncada = this.tst_ncada;
Caller.tst_ntipo = this.tst_ntipo;
Caller.tst_ireinicio = this.tst_ireinicio;
Caller.tst_calarma = this.tst_calarma;
Caller.tst_ncada2 = this.tst_ncada2;
Caller.tst_ntipo2 = this.tst_ntipo2;
Caller.tst_calarmaesperada = this.tst_calarmaesperada;
Caller.tst_calarmagenerar = this.tst_calarmagenerar;
Caller.tst_ncada3 = this.tst_ncada3;
Caller.tst_ntipo3 = this.tst_ntipo3;
Caller.tst_calarma3esperada = this.tst_calarma3esperada;
Caller.tst_calarma3generar = this.tst_calarma3generar;
Caller.tst_cAlarmaAutoprocesa = this.tst_cAlarmaAutoprocesa;
Caller.tst_cAlarma2Autoprocesa = this.tst_cAlarma2Autoprocesa;
Caller.tst_cAlarma3Autoprocesa = this.tst_cAlarma3Autoprocesa;
Caller.tst_iTiempoCtrl = this.tst_iTiempoCtrl;
Caller.tst_iCtrlExec = this.tst_iCtrlExec;
Caller.tst_cAlarmaCtrlGenerar = this.tst_cAlarmaCtrlGenerar;

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
               dt.Columns.Add(new DataColumn("tst_ncada", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ireinicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tst_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_ncada2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ntipo2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_calarmaesperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_calarmagenerar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_ncada3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_ntipo3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tst_calarma3esperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_calarma3generar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarmaAutoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarma2Autoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarma3Autoprocesa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tst_iTiempoCtrl", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tst_iCtrlExec", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tst_cAlarmaCtrlGenerar", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tst_ncada"] = (object)this.tst_ncada ?? System.DBNull.Value;
dr["tst_ntipo"] = (object)this.tst_ntipo ?? System.DBNull.Value;
dr["tst_ireinicio"] = (object)this.tst_ireinicio ?? System.DBNull.Value;
dr["tst_calarma"] = (object)this.tst_calarma ?? System.DBNull.Value;
dr["tst_ncada2"] = (object)this.tst_ncada2 ?? System.DBNull.Value;
dr["tst_ntipo2"] = (object)this.tst_ntipo2 ?? System.DBNull.Value;
dr["tst_calarmaesperada"] = (object)this.tst_calarmaesperada ?? System.DBNull.Value;
dr["tst_calarmagenerar"] = (object)this.tst_calarmagenerar ?? System.DBNull.Value;
dr["tst_ncada3"] = (object)this.tst_ncada3 ?? System.DBNull.Value;
dr["tst_ntipo3"] = (object)this.tst_ntipo3 ?? System.DBNull.Value;
dr["tst_calarma3esperada"] = (object)this.tst_calarma3esperada ?? System.DBNull.Value;
dr["tst_calarma3generar"] = (object)this.tst_calarma3generar ?? System.DBNull.Value;
dr["tst_cAlarmaAutoprocesa"] = (object)this.tst_cAlarmaAutoprocesa ?? System.DBNull.Value;
dr["tst_cAlarma2Autoprocesa"] = (object)this.tst_cAlarma2Autoprocesa ?? System.DBNull.Value;
dr["tst_cAlarma3Autoprocesa"] = (object)this.tst_cAlarma3Autoprocesa ?? System.DBNull.Value;
dr["tst_iTiempoCtrl"] = (object)this.tst_iTiempoCtrl ?? System.DBNull.Value;
dr["tst_iCtrlExec"] = (object)this.tst_iCtrlExec ?? System.DBNull.Value;
dr["tst_cAlarmaCtrlGenerar"] = (object)this.tst_cAlarmaCtrlGenerar ?? System.DBNull.Value;
							 
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
