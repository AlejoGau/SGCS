
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
    ///t_condiciones_pago_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_condiciones_pago_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///con_ccodigo   
     ///</summary>
	 [DataMember]
     public string con_ccodigo { get;set;} 
	  ///<summary>
     ///con_cdescripcion   
     ///</summary>
	 [DataMember]
     public string con_cdescripcion { get;set;} 
	  ///<summary>
     ///con_ncuotas   
     ///</summary>
	 [DataMember]
     public Decimal con_ncuotas { get;set;} 
	  ///<summary>
     ///con_idias   
     ///</summary>
	 [DataMember]
     public int con_idias { get;set;} 
	  ///<summary>
     ///con_ifrecuencia   
     ///</summary>
	 [DataMember]
     public int con_ifrecuencia { get;set;} 
	  ///<summary>
     ///con_nPideDatos   
     ///</summary>
	 [DataMember]
     public Decimal con_nPideDatos { get;set;} 
	  ///<summary>
     ///con_nCobranzaAut   
     ///</summary>
	 [DataMember]
     public Decimal con_nCobranzaAut { get;set;} 
	  ///<summary>
     ///con_cCodigoBarra   
     ///</summary>
	 [DataMember]
     public string con_cCodigoBarra { get;set;} 
	  ///<summary>
     ///con_iRemesa   
     ///</summary>
	 [DataMember]
     public int con_iRemesa { get;set;} 
	  ///<summary>
     ///con_cDatosExtra   
     ///</summary>
	 [DataMember]
     public string con_cDatosExtra { get;set;} 
	  ///<summary>
     ///con_cFormaPagoCobrAut   
     ///</summary>
	 [DataMember]
     public string con_cFormaPagoCobrAut { get;set;} 
	  ///<summary>
     ///con_orgidcodigoid   
     ///</summary>
	 [DataMember]
     public int con_orgidcodigoid { get;set;} 
	 ///<summary>
        ///t_condiciones_pago_fc Constructor
        ///</summary>
        public Simplet_condiciones_pago_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_condiciones_pago_fc Constructor
        ///</summary>
        public Simplet_condiciones_pago_fc(int Id, string Name, string con_ccodigo, string con_cdescripcion, Decimal con_ncuotas, int con_idias, int con_ifrecuencia, Decimal con_nPideDatos, Decimal con_nCobranzaAut, string con_cCodigoBarra, int con_iRemesa, string con_cDatosExtra, string con_cFormaPagoCobrAut, int con_orgidcodigoid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.con_ccodigo = con_ccodigo;
this.con_cdescripcion = con_cdescripcion;
this.con_ncuotas = con_ncuotas;
this.con_idias = con_idias;
this.con_ifrecuencia = con_ifrecuencia;
this.con_nPideDatos = con_nPideDatos;
this.con_nCobranzaAut = con_nCobranzaAut;
this.con_cCodigoBarra = con_cCodigoBarra;
this.con_iRemesa = con_iRemesa;
this.con_cDatosExtra = con_cDatosExtra;
this.con_cFormaPagoCobrAut = con_cFormaPagoCobrAut;
this.con_orgidcodigoid = con_orgidcodigoid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3149, "t_condiciones_pago_fc");
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
			BaseObject Object = new Dalt_condiciones_pago_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_condiciones_pago_fc Caller = new Callert_condiciones_pago_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.con_ccodigo = this.con_ccodigo;
Caller.con_cdescripcion = this.con_cdescripcion;
Caller.con_ncuotas = this.con_ncuotas;
Caller.con_idias = this.con_idias;
Caller.con_ifrecuencia = this.con_ifrecuencia;
Caller.con_nPideDatos = this.con_nPideDatos;
Caller.con_nCobranzaAut = this.con_nCobranzaAut;
Caller.con_cCodigoBarra = this.con_cCodigoBarra;
Caller.con_iRemesa = this.con_iRemesa;
Caller.con_cDatosExtra = this.con_cDatosExtra;
Caller.con_cFormaPagoCobrAut = this.con_cFormaPagoCobrAut;
Caller.con_orgidcodigoid = this.con_orgidcodigoid;

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
               dt.Columns.Add(new DataColumn("con_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("con_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("con_ncuotas", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("con_idias", typeof (int)));               
							 dt.Columns.Add(new DataColumn("con_ifrecuencia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("con_nPideDatos", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("con_nCobranzaAut", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("con_cCodigoBarra", typeof (string)));               
							 dt.Columns.Add(new DataColumn("con_iRemesa", typeof (int)));               
							 dt.Columns.Add(new DataColumn("con_cDatosExtra", typeof (string)));               
							 dt.Columns.Add(new DataColumn("con_cFormaPagoCobrAut", typeof (string)));               
							 dt.Columns.Add(new DataColumn("con_orgidcodigoid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["con_ccodigo"] = (object)this.con_ccodigo ?? System.DBNull.Value;
dr["con_cdescripcion"] = (object)this.con_cdescripcion ?? System.DBNull.Value;
dr["con_ncuotas"] = (object)this.con_ncuotas ?? System.DBNull.Value;
dr["con_idias"] = (object)this.con_idias ?? System.DBNull.Value;
dr["con_ifrecuencia"] = (object)this.con_ifrecuencia ?? System.DBNull.Value;
dr["con_nPideDatos"] = (object)this.con_nPideDatos ?? System.DBNull.Value;
dr["con_nCobranzaAut"] = (object)this.con_nCobranzaAut ?? System.DBNull.Value;
dr["con_cCodigoBarra"] = (object)this.con_cCodigoBarra ?? System.DBNull.Value;
dr["con_iRemesa"] = (object)this.con_iRemesa ?? System.DBNull.Value;
dr["con_cDatosExtra"] = (object)this.con_cDatosExtra ?? System.DBNull.Value;
dr["con_cFormaPagoCobrAut"] = (object)this.con_cFormaPagoCobrAut ?? System.DBNull.Value;
dr["con_orgidcodigoid"] = (object)this.con_orgidcodigoid ?? System.DBNull.Value;
							 
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
