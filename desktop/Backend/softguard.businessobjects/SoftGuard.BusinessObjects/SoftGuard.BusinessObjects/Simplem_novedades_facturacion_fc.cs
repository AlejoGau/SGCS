
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
    ///m_novedades_facturacion_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_novedades_facturacion_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///nfc_icliente   
     ///</summary>
	 [DataMember]
     public int nfc_icliente { get;set;} 
	  ///<summary>
     ///nfc_inovedad   
     ///</summary>
	 [DataMember]
     public int nfc_inovedad { get;set;} 
	  ///<summary>
     ///nfc_nrecurrente   
     ///</summary>
	 [DataMember]
     public Decimal nfc_nrecurrente { get;set;} 
	  ///<summary>
     ///nfc_nestado   
     ///</summary>
	 [DataMember]
     public Decimal nfc_nestado { get;set;} 
	 ///<summary>
        ///m_novedades_facturacion_fc Constructor
        ///</summary>
        public Simplem_novedades_facturacion_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_novedades_facturacion_fc Constructor
        ///</summary>
        public Simplem_novedades_facturacion_fc(int Id, string Name, int nfc_icliente, int nfc_inovedad, Decimal nfc_nrecurrente, Decimal nfc_nestado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.nfc_icliente = nfc_icliente;
this.nfc_inovedad = nfc_inovedad;
this.nfc_nrecurrente = nfc_nrecurrente;
this.nfc_nestado = nfc_nestado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3191, "m_novedades_facturacion_fc");
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
			BaseObject Object = new Dalm_novedades_facturacion_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_novedades_facturacion_fc Caller = new Callerm_novedades_facturacion_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.nfc_icliente = this.nfc_icliente;
Caller.nfc_inovedad = this.nfc_inovedad;
Caller.nfc_nrecurrente = this.nfc_nrecurrente;
Caller.nfc_nestado = this.nfc_nestado;

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
               dt.Columns.Add(new DataColumn("nfc_icliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("nfc_inovedad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("nfc_nrecurrente", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("nfc_nestado", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["nfc_icliente"] = (object)this.nfc_icliente ?? System.DBNull.Value;
dr["nfc_inovedad"] = (object)this.nfc_inovedad ?? System.DBNull.Value;
dr["nfc_nrecurrente"] = (object)this.nfc_nrecurrente ?? System.DBNull.Value;
dr["nfc_nestado"] = (object)this.nfc_nestado ?? System.DBNull.Value;
							 
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
