
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
    ///ReporteAutoridades Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleReporteAutoridades : SimpleBaseObject
    { 
			 ///<summary>
     ///rep_cautoridad   
     ///</summary>
	 [DataMember]
     public string rep_cautoridad { get;set;} 
	  ///<summary>
     ///rep_iidcuenta   
     ///</summary>
	 [DataMember]
     public int rep_iidcuenta { get;set;} 
	  ///<summary>
     ///rep_calarma   
     ///</summary>
	 [DataMember]
     public string rep_calarma { get;set;} 
	  ///<summary>
     ///rep_dfechahora   
     ///</summary>
	 [DataMember]
     public DateTime? rep_dfechahora { get;set;} 
	  ///<summary>
     ///rep_mcomentario   
     ///</summary>
	 [DataMember]
     public string rep_mcomentario { get;set;} 
	  ///<summary>
     ///rep_nestado   
     ///</summary>
	 [DataMember]
     public Decimal rep_nestado { get;set;} 
	  ///<summary>
     ///rep_dresolfechahora   
     ///</summary>
	 [DataMember]
     public DateTime? rep_dresolfechahora { get;set;} 
	  ///<summary>
     ///rep_czona   
     ///</summary>
	 [DataMember]
     public string rep_czona { get;set;} 
	  ///<summary>
     ///rep_iidrecepcion   
     ///</summary>
	 [DataMember]
     public int rep_iidrecepcion { get;set;} 
	  ///<summary>
     ///rep_iresolucion   
     ///</summary>
	 [DataMember]
     public int rep_iresolucion { get;set;} 
	  ///<summary>
     ///rep_icategorizacion   
     ///</summary>
	 [DataMember]
     public int rep_icategorizacion { get;set;} 
	 ///<summary>
        ///ReporteAutoridades Constructor
        ///</summary>
        public SimpleReporteAutoridades() : base()
  {
  InitClass();
  }
        ///<summary>
        ///ReporteAutoridades Constructor
        ///</summary>
        public SimpleReporteAutoridades(int Id, string Name, string rep_cautoridad, int rep_iidcuenta, string rep_calarma, DateTime? rep_dfechahora, string rep_mcomentario, Decimal rep_nestado, DateTime? rep_dresolfechahora, string rep_czona, int rep_iidrecepcion, int rep_iresolucion, int rep_icategorizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rep_cautoridad = rep_cautoridad;
this.rep_iidcuenta = rep_iidcuenta;
this.rep_calarma = rep_calarma;
this.rep_dfechahora = rep_dfechahora;
this.rep_mcomentario = rep_mcomentario;
this.rep_nestado = rep_nestado;
this.rep_dresolfechahora = rep_dresolfechahora;
this.rep_czona = rep_czona;
this.rep_iidrecepcion = rep_iidrecepcion;
this.rep_iresolucion = rep_iresolucion;
this.rep_icategorizacion = rep_icategorizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3052, "ReporteAutoridades");
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
			BaseObject Object = new DalReporteAutoridades(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerReporteAutoridades Caller = new CallerReporteAutoridades();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rep_cautoridad = this.rep_cautoridad;
Caller.rep_iidcuenta = this.rep_iidcuenta;
Caller.rep_calarma = this.rep_calarma;
Caller.rep_dfechahora = this.rep_dfechahora;
Caller.rep_mcomentario = this.rep_mcomentario;
Caller.rep_nestado = this.rep_nestado;
Caller.rep_dresolfechahora = this.rep_dresolfechahora;
Caller.rep_czona = this.rep_czona;
Caller.rep_iidrecepcion = this.rep_iidrecepcion;
Caller.rep_iresolucion = this.rep_iresolucion;
Caller.rep_icategorizacion = this.rep_icategorizacion;

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
               dt.Columns.Add(new DataColumn("rep_cautoridad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_dfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rep_mcomentario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_dresolfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rep_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iidrecepcion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_iresolucion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_icategorizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rep_cautoridad"] = (object)this.rep_cautoridad ?? System.DBNull.Value;
dr["rep_iidcuenta"] = (object)this.rep_iidcuenta ?? System.DBNull.Value;
dr["rep_calarma"] = (object)this.rep_calarma ?? System.DBNull.Value;
dr["rep_dfechahora"] = (object)this.rep_dfechahora ?? System.DBNull.Value;
dr["rep_mcomentario"] = (object)this.rep_mcomentario ?? System.DBNull.Value;
dr["rep_nestado"] = (object)this.rep_nestado ?? System.DBNull.Value;
dr["rep_dresolfechahora"] = (object)this.rep_dresolfechahora ?? System.DBNull.Value;
dr["rep_czona"] = (object)this.rep_czona ?? System.DBNull.Value;
dr["rep_iidrecepcion"] = (object)this.rep_iidrecepcion ?? System.DBNull.Value;
dr["rep_iresolucion"] = (object)this.rep_iresolucion ?? System.DBNull.Value;
dr["rep_icategorizacion"] = (object)this.rep_icategorizacion ?? System.DBNull.Value;
							 
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
