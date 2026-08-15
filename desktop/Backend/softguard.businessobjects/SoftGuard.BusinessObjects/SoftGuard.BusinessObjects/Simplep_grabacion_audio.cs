
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
    ///p_grabacion_audio Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_grabacion_audio : SimpleBaseObject
    { 
			 ///<summary>
     ///gra_iidcuenta   
     ///</summary>
	 [DataMember]
     public int gra_iidcuenta { get;set;} 
	  ///<summary>
     ///gra_iidrecepcion   
     ///</summary>
	 [DataMember]
     public int gra_iidrecepcion { get;set;} 
	  ///<summary>
     ///gra_dfechahora   
     ///</summary>
	 [DataMember]
     public DateTime? gra_dfechahora { get;set;} 
	  ///<summary>
     ///gra_carchivo   
     ///</summary>
	 [DataMember]
     public string gra_carchivo { get;set;} 
	  ///<summary>
     ///gra_nduracion   
     ///</summary>
	 [DataMember]
     public Decimal gra_nduracion { get;set;} 
	  ///<summary>
     ///gra_ioperador   
     ///</summary>
	 [DataMember]
     public int gra_ioperador { get;set;} 
	  ///<summary>
     ///gra_cterminal   
     ///</summary>
	 [DataMember]
     public string gra_cterminal { get;set;} 
	  ///<summary>
     ///gra_nestado   
     ///</summary>
	 [DataMember]
     public Decimal gra_nestado { get;set;} 
	  ///<summary>
     ///gra_ctelefono   
     ///</summary>
	 [DataMember]
     public string gra_ctelefono { get;set;} 
	 ///<summary>
        ///p_grabacion_audio Constructor
        ///</summary>
        public Simplep_grabacion_audio() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_grabacion_audio Constructor
        ///</summary>
        public Simplep_grabacion_audio(int Id, string Name, int gra_iidcuenta, int gra_iidrecepcion, DateTime? gra_dfechahora, string gra_carchivo, Decimal gra_nduracion, int gra_ioperador, string gra_cterminal, Decimal gra_nestado, string gra_ctelefono) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.gra_iidcuenta = gra_iidcuenta;
this.gra_iidrecepcion = gra_iidrecepcion;
this.gra_dfechahora = gra_dfechahora;
this.gra_carchivo = gra_carchivo;
this.gra_nduracion = gra_nduracion;
this.gra_ioperador = gra_ioperador;
this.gra_cterminal = gra_cterminal;
this.gra_nestado = gra_nestado;
this.gra_ctelefono = gra_ctelefono;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3129, "p_grabacion_audio");
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
			BaseObject Object = new Dalp_grabacion_audio(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_grabacion_audio Caller = new Callerp_grabacion_audio();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.gra_iidcuenta = this.gra_iidcuenta;
Caller.gra_iidrecepcion = this.gra_iidrecepcion;
Caller.gra_dfechahora = this.gra_dfechahora;
Caller.gra_carchivo = this.gra_carchivo;
Caller.gra_nduracion = this.gra_nduracion;
Caller.gra_ioperador = this.gra_ioperador;
Caller.gra_cterminal = this.gra_cterminal;
Caller.gra_nestado = this.gra_nestado;
Caller.gra_ctelefono = this.gra_ctelefono;

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
               dt.Columns.Add(new DataColumn("gra_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gra_iidrecepcion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gra_dfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("gra_carchivo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gra_nduracion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("gra_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gra_cterminal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gra_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("gra_ctelefono", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gra_iidcuenta"] = (object)this.gra_iidcuenta ?? System.DBNull.Value;
dr["gra_iidrecepcion"] = (object)this.gra_iidrecepcion ?? System.DBNull.Value;
dr["gra_dfechahora"] = (object)this.gra_dfechahora ?? System.DBNull.Value;
dr["gra_carchivo"] = (object)this.gra_carchivo ?? System.DBNull.Value;
dr["gra_nduracion"] = (object)this.gra_nduracion ?? System.DBNull.Value;
dr["gra_ioperador"] = (object)this.gra_ioperador ?? System.DBNull.Value;
dr["gra_cterminal"] = (object)this.gra_cterminal ?? System.DBNull.Value;
dr["gra_nestado"] = (object)this.gra_nestado ?? System.DBNull.Value;
dr["gra_ctelefono"] = (object)this.gra_ctelefono ?? System.DBNull.Value;
							 
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
