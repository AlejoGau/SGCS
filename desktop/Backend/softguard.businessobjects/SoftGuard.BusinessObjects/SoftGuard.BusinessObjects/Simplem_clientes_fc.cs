
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
    ///m_clientes_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_clientes_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///cli_cnombre   
     ///</summary>
	 [DataMember]
     public string cli_cnombre { get;set;} 
	  ///<summary>
     ///cli_cidentificacion   
     ///</summary>
	 [DataMember]
     public string cli_cidentificacion { get;set;} 
	  ///<summary>
     ///cli_ccategoriaimpositiva   
     ///</summary>
	 [DataMember]
     public string cli_ccategoriaimpositiva { get;set;} 
	  ///<summary>
     ///cli_ivendedor   
     ///</summary>
	 [DataMember]
     public int cli_ivendedor { get;set;} 
	  ///<summary>
     ///cli_icobrador   
     ///</summary>
	 [DataMember]
     public int cli_icobrador { get;set;} 
	  ///<summary>
     ///cli_czona   
     ///</summary>
	 [DataMember]
     public string cli_czona { get;set;} 
	  ///<summary>
     ///cli_ccallefiscal   
     ///</summary>
	 [DataMember]
     public string cli_ccallefiscal { get;set;} 
	  ///<summary>
     ///cli_clocalidadfiscal   
     ///</summary>
	 [DataMember]
     public string cli_clocalidadfiscal { get;set;} 
	  ///<summary>
     ///cli_cprovinciafiscal   
     ///</summary>
	 [DataMember]
     public string cli_cprovinciafiscal { get;set;} 
	  ///<summary>
     ///cli_ccodigopostalfiscal   
     ///</summary>
	 [DataMember]
     public string cli_ccodigopostalfiscal { get;set;} 
	  ///<summary>
     ///cli_ccallecobranza   
     ///</summary>
	 [DataMember]
     public string cli_ccallecobranza { get;set;} 
	  ///<summary>
     ///cli_clocalidadcobranza   
     ///</summary>
	 [DataMember]
     public string cli_clocalidadcobranza { get;set;} 
	  ///<summary>
     ///cli_cprovinciacobranza   
     ///</summary>
	 [DataMember]
     public string cli_cprovinciacobranza { get;set;} 
	  ///<summary>
     ///cli_ccodigopostalcobranza   
     ///</summary>
	 [DataMember]
     public string cli_ccodigopostalcobranza { get;set;} 
	  ///<summary>
     ///cli_nlunes   
     ///</summary>
	 [DataMember]
     public Decimal cli_nlunes { get;set;} 
	  ///<summary>
     ///cli_nmartes   
     ///</summary>
	 [DataMember]
     public Decimal cli_nmartes { get;set;} 
	  ///<summary>
     ///cli_nmiercoles   
     ///</summary>
	 [DataMember]
     public Decimal cli_nmiercoles { get;set;} 
	  ///<summary>
     ///cli_njueves   
     ///</summary>
	 [DataMember]
     public Decimal cli_njueves { get;set;} 
	  ///<summary>
     ///cli_nviernes   
     ///</summary>
	 [DataMember]
     public Decimal cli_nviernes { get;set;} 
	  ///<summary>
     ///cli_nsabado   
     ///</summary>
	 [DataMember]
     public Decimal cli_nsabado { get;set;} 
	  ///<summary>
     ///cli_ndomingo   
     ///</summary>
	 [DataMember]
     public Decimal cli_ndomingo { get;set;} 
	  ///<summary>
     ///cli_chora   
     ///</summary>
	 [DataMember]
     public string cli_chora { get;set;} 
	  ///<summary>
     ///cli_cservicio   
     ///</summary>
	 [DataMember]
     public string cli_cservicio { get;set;} 
	  ///<summary>
     ///cli_dproximafactura   
     ///</summary>
	 [DataMember]
     public DateTime? cli_dproximafactura { get;set;} 
	  ///<summary>
     ///cli_cformatoimpresion   
     ///</summary>
	 [DataMember]
     public string cli_cformatoimpresion { get;set;} 
	  ///<summary>
     ///cli_ccondicionpago   
     ///</summary>
	 [DataMember]
     public string cli_ccondicionpago { get;set;} 
	  ///<summary>
     ///cli_ctelefono   
     ///</summary>
	 [DataMember]
     public string cli_ctelefono { get;set;} 
	  ///<summary>
     ///cli_ccontacto   
     ///</summary>
	 [DataMember]
     public string cli_ccontacto { get;set;} 
	  ///<summary>
     ///cli_cobservacion   
     ///</summary>
	 [DataMember]
     public string cli_cobservacion { get;set;} 
	  ///<summary>
     ///cli_nsituacion   
     ///</summary>
	 [DataMember]
     public Decimal cli_nsituacion { get;set;} 
	  ///<summary>
     ///cli_inumero   
     ///</summary>
	 [DataMember]
     public int cli_inumero { get;set;} 
	  ///<summary>
     ///cli_nDocCAE   
     ///</summary>
	 [DataMember]
     public Decimal cli_nDocCAE { get;set;} 
	  ///<summary>
     ///cli_cDatosExtra   
     ///</summary>
	 [DataMember]
     public string cli_cDatosExtra { get;set;} 
	  ///<summary>
     ///cli_iorganizacion   
     ///</summary>
	 [DataMember]
     public int cli_iorganizacion { get;set;} 
	 ///<summary>
        ///m_clientes_fc Constructor
        ///</summary>
        public Simplem_clientes_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_clientes_fc Constructor
        ///</summary>
        public Simplem_clientes_fc(int Id, string Name, string cli_cnombre, string cli_cidentificacion, string cli_ccategoriaimpositiva, int cli_ivendedor, int cli_icobrador, string cli_czona, string cli_ccallefiscal, string cli_clocalidadfiscal, string cli_cprovinciafiscal, string cli_ccodigopostalfiscal, string cli_ccallecobranza, string cli_clocalidadcobranza, string cli_cprovinciacobranza, string cli_ccodigopostalcobranza, Decimal cli_nlunes, Decimal cli_nmartes, Decimal cli_nmiercoles, Decimal cli_njueves, Decimal cli_nviernes, Decimal cli_nsabado, Decimal cli_ndomingo, string cli_chora, string cli_cservicio, DateTime? cli_dproximafactura, string cli_cformatoimpresion, string cli_ccondicionpago, string cli_ctelefono, string cli_ccontacto, string cli_cobservacion, Decimal cli_nsituacion, int cli_inumero, Decimal cli_nDocCAE, string cli_cDatosExtra, int cli_iorganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cli_cnombre = cli_cnombre;
this.cli_cidentificacion = cli_cidentificacion;
this.cli_ccategoriaimpositiva = cli_ccategoriaimpositiva;
this.cli_ivendedor = cli_ivendedor;
this.cli_icobrador = cli_icobrador;
this.cli_czona = cli_czona;
this.cli_ccallefiscal = cli_ccallefiscal;
this.cli_clocalidadfiscal = cli_clocalidadfiscal;
this.cli_cprovinciafiscal = cli_cprovinciafiscal;
this.cli_ccodigopostalfiscal = cli_ccodigopostalfiscal;
this.cli_ccallecobranza = cli_ccallecobranza;
this.cli_clocalidadcobranza = cli_clocalidadcobranza;
this.cli_cprovinciacobranza = cli_cprovinciacobranza;
this.cli_ccodigopostalcobranza = cli_ccodigopostalcobranza;
this.cli_nlunes = cli_nlunes;
this.cli_nmartes = cli_nmartes;
this.cli_nmiercoles = cli_nmiercoles;
this.cli_njueves = cli_njueves;
this.cli_nviernes = cli_nviernes;
this.cli_nsabado = cli_nsabado;
this.cli_ndomingo = cli_ndomingo;
this.cli_chora = cli_chora;
this.cli_cservicio = cli_cservicio;
this.cli_dproximafactura = cli_dproximafactura;
this.cli_cformatoimpresion = cli_cformatoimpresion;
this.cli_ccondicionpago = cli_ccondicionpago;
this.cli_ctelefono = cli_ctelefono;
this.cli_ccontacto = cli_ccontacto;
this.cli_cobservacion = cli_cobservacion;
this.cli_nsituacion = cli_nsituacion;
this.cli_inumero = cli_inumero;
this.cli_nDocCAE = cli_nDocCAE;
this.cli_cDatosExtra = cli_cDatosExtra;
this.cli_iorganizacion = cli_iorganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3039, "m_clientes_fc");
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
			BaseObject Object = new Dalm_clientes_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_clientes_fc Caller = new Callerm_clientes_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cli_cnombre = this.cli_cnombre;
Caller.cli_cidentificacion = this.cli_cidentificacion;
Caller.cli_ccategoriaimpositiva = this.cli_ccategoriaimpositiva;
Caller.cli_ivendedor = this.cli_ivendedor;
Caller.cli_icobrador = this.cli_icobrador;
Caller.cli_czona = this.cli_czona;
Caller.cli_ccallefiscal = this.cli_ccallefiscal;
Caller.cli_clocalidadfiscal = this.cli_clocalidadfiscal;
Caller.cli_cprovinciafiscal = this.cli_cprovinciafiscal;
Caller.cli_ccodigopostalfiscal = this.cli_ccodigopostalfiscal;
Caller.cli_ccallecobranza = this.cli_ccallecobranza;
Caller.cli_clocalidadcobranza = this.cli_clocalidadcobranza;
Caller.cli_cprovinciacobranza = this.cli_cprovinciacobranza;
Caller.cli_ccodigopostalcobranza = this.cli_ccodigopostalcobranza;
Caller.cli_nlunes = this.cli_nlunes;
Caller.cli_nmartes = this.cli_nmartes;
Caller.cli_nmiercoles = this.cli_nmiercoles;
Caller.cli_njueves = this.cli_njueves;
Caller.cli_nviernes = this.cli_nviernes;
Caller.cli_nsabado = this.cli_nsabado;
Caller.cli_ndomingo = this.cli_ndomingo;
Caller.cli_chora = this.cli_chora;
Caller.cli_cservicio = this.cli_cservicio;
Caller.cli_dproximafactura = this.cli_dproximafactura;
Caller.cli_cformatoimpresion = this.cli_cformatoimpresion;
Caller.cli_ccondicionpago = this.cli_ccondicionpago;
Caller.cli_ctelefono = this.cli_ctelefono;
Caller.cli_ccontacto = this.cli_ccontacto;
Caller.cli_cobservacion = this.cli_cobservacion;
Caller.cli_nsituacion = this.cli_nsituacion;
Caller.cli_inumero = this.cli_inumero;
Caller.cli_nDocCAE = this.cli_nDocCAE;
Caller.cli_cDatosExtra = this.cli_cDatosExtra;
Caller.cli_iorganizacion = this.cli_iorganizacion;

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
               dt.Columns.Add(new DataColumn("cli_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_cidentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccategoriaimpositiva", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ivendedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cli_icobrador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cli_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccallefiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_clocalidadfiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_cprovinciafiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccodigopostalfiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccallecobranza", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_clocalidadcobranza", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_cprovinciacobranza", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccodigopostalcobranza", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_nlunes", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_nmartes", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_nmiercoles", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_njueves", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_nviernes", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_nsabado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_ndomingo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_chora", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_cservicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_dproximafactura", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cli_cformatoimpresion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccondicionpago", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_ccontacto", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_nsituacion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cli_nDocCAE", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cli_cDatosExtra", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cli_iorganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cli_cnombre"] = (object)this.cli_cnombre ?? System.DBNull.Value;
dr["cli_cidentificacion"] = (object)this.cli_cidentificacion ?? System.DBNull.Value;
dr["cli_ccategoriaimpositiva"] = (object)this.cli_ccategoriaimpositiva ?? System.DBNull.Value;
dr["cli_ivendedor"] = (object)this.cli_ivendedor ?? System.DBNull.Value;
dr["cli_icobrador"] = (object)this.cli_icobrador ?? System.DBNull.Value;
dr["cli_czona"] = (object)this.cli_czona ?? System.DBNull.Value;
dr["cli_ccallefiscal"] = (object)this.cli_ccallefiscal ?? System.DBNull.Value;
dr["cli_clocalidadfiscal"] = (object)this.cli_clocalidadfiscal ?? System.DBNull.Value;
dr["cli_cprovinciafiscal"] = (object)this.cli_cprovinciafiscal ?? System.DBNull.Value;
dr["cli_ccodigopostalfiscal"] = (object)this.cli_ccodigopostalfiscal ?? System.DBNull.Value;
dr["cli_ccallecobranza"] = (object)this.cli_ccallecobranza ?? System.DBNull.Value;
dr["cli_clocalidadcobranza"] = (object)this.cli_clocalidadcobranza ?? System.DBNull.Value;
dr["cli_cprovinciacobranza"] = (object)this.cli_cprovinciacobranza ?? System.DBNull.Value;
dr["cli_ccodigopostalcobranza"] = (object)this.cli_ccodigopostalcobranza ?? System.DBNull.Value;
dr["cli_nlunes"] = (object)this.cli_nlunes ?? System.DBNull.Value;
dr["cli_nmartes"] = (object)this.cli_nmartes ?? System.DBNull.Value;
dr["cli_nmiercoles"] = (object)this.cli_nmiercoles ?? System.DBNull.Value;
dr["cli_njueves"] = (object)this.cli_njueves ?? System.DBNull.Value;
dr["cli_nviernes"] = (object)this.cli_nviernes ?? System.DBNull.Value;
dr["cli_nsabado"] = (object)this.cli_nsabado ?? System.DBNull.Value;
dr["cli_ndomingo"] = (object)this.cli_ndomingo ?? System.DBNull.Value;
dr["cli_chora"] = (object)this.cli_chora ?? System.DBNull.Value;
dr["cli_cservicio"] = (object)this.cli_cservicio ?? System.DBNull.Value;
dr["cli_dproximafactura"] = (object)this.cli_dproximafactura ?? System.DBNull.Value;
dr["cli_cformatoimpresion"] = (object)this.cli_cformatoimpresion ?? System.DBNull.Value;
dr["cli_ccondicionpago"] = (object)this.cli_ccondicionpago ?? System.DBNull.Value;
dr["cli_ctelefono"] = (object)this.cli_ctelefono ?? System.DBNull.Value;
dr["cli_ccontacto"] = (object)this.cli_ccontacto ?? System.DBNull.Value;
dr["cli_cobservacion"] = (object)this.cli_cobservacion ?? System.DBNull.Value;
dr["cli_nsituacion"] = (object)this.cli_nsituacion ?? System.DBNull.Value;
dr["cli_inumero"] = (object)this.cli_inumero ?? System.DBNull.Value;
dr["cli_nDocCAE"] = (object)this.cli_nDocCAE ?? System.DBNull.Value;
dr["cli_cDatosExtra"] = (object)this.cli_cDatosExtra ?? System.DBNull.Value;
dr["cli_iorganizacion"] = (object)this.cli_iorganizacion ?? System.DBNull.Value;
							 
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
