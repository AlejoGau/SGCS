
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
    ///m_comprobantes_item_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_comprobantes_item_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///cbi_icodigocab   
     ///</summary>
	 [DataMember]
     public int cbi_icodigocab { get;set;} 
	  ///<summary>
     ///cbi_irenglon   
     ///</summary>
	 [DataMember]
     public int cbi_irenglon { get;set;} 
	  ///<summary>
     ///cbi_iproducto   
     ///</summary>
	 [DataMember]
     public int cbi_iproducto { get;set;} 
	  ///<summary>
     ///cbi_cdescripcion   
     ///</summary>
	 [DataMember]
     public string cbi_cdescripcion { get;set;} 
	  ///<summary>
     ///cbi_ccodigo   
     ///</summary>
	 [DataMember]
     public string cbi_ccodigo { get;set;} 
	  ///<summary>
     ///cbi_inovedad   
     ///</summary>
	 [DataMember]
     public int cbi_inovedad { get;set;} 
	  ///<summary>
     ///cbi_inovedadTabla   
     ///</summary>
	 [DataMember]
     public int cbi_inovedadTabla { get;set;} 
	  ///<summary>
     ///cbi_yimporte   
     ///</summary>
	 [DataMember]
     public Decimal cbi_yimporte { get;set;} 
	  ///<summary>
     ///cbi_icantidad   
     ///</summary>
	 [DataMember]
     public int cbi_icantidad { get;set;} 
	  ///<summary>
     ///cbi_ndescuento   
     ///</summary>
	 [DataMember]
     public Decimal cbi_ndescuento { get;set;} 
	  ///<summary>
     ///cbi_cimpuestos   
     ///</summary>
	 [DataMember]
     public string cbi_cimpuestos { get;set;} 
	 ///<summary>
        ///m_comprobantes_item_fc Constructor
        ///</summary>
        public Simplem_comprobantes_item_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_comprobantes_item_fc Constructor
        ///</summary>
        public Simplem_comprobantes_item_fc(int Id, string Name, int cbi_icodigocab, int cbi_irenglon, int cbi_iproducto, string cbi_cdescripcion, string cbi_ccodigo, int cbi_inovedad, int cbi_inovedadTabla, Decimal cbi_yimporte, int cbi_icantidad, Decimal cbi_ndescuento, string cbi_cimpuestos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cbi_icodigocab = cbi_icodigocab;
this.cbi_irenglon = cbi_irenglon;
this.cbi_iproducto = cbi_iproducto;
this.cbi_cdescripcion = cbi_cdescripcion;
this.cbi_ccodigo = cbi_ccodigo;
this.cbi_inovedad = cbi_inovedad;
this.cbi_inovedadTabla = cbi_inovedadTabla;
this.cbi_yimporte = cbi_yimporte;
this.cbi_icantidad = cbi_icantidad;
this.cbi_ndescuento = cbi_ndescuento;
this.cbi_cimpuestos = cbi_cimpuestos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3152, "m_comprobantes_item_fc");
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
			BaseObject Object = new Dalm_comprobantes_item_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_comprobantes_item_fc Caller = new Callerm_comprobantes_item_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cbi_icodigocab = this.cbi_icodigocab;
Caller.cbi_irenglon = this.cbi_irenglon;
Caller.cbi_iproducto = this.cbi_iproducto;
Caller.cbi_cdescripcion = this.cbi_cdescripcion;
Caller.cbi_ccodigo = this.cbi_ccodigo;
Caller.cbi_inovedad = this.cbi_inovedad;
Caller.cbi_inovedadTabla = this.cbi_inovedadTabla;
Caller.cbi_yimporte = this.cbi_yimporte;
Caller.cbi_icantidad = this.cbi_icantidad;
Caller.cbi_ndescuento = this.cbi_ndescuento;
Caller.cbi_cimpuestos = this.cbi_cimpuestos;

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
               dt.Columns.Add(new DataColumn("cbi_icodigocab", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbi_irenglon", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbi_iproducto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbi_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbi_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbi_inovedad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbi_inovedadTabla", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbi_yimporte", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbi_icantidad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbi_ndescuento", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbi_cimpuestos", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cbi_icodigocab"] = (object)this.cbi_icodigocab ?? System.DBNull.Value;
dr["cbi_irenglon"] = (object)this.cbi_irenglon ?? System.DBNull.Value;
dr["cbi_iproducto"] = (object)this.cbi_iproducto ?? System.DBNull.Value;
dr["cbi_cdescripcion"] = (object)this.cbi_cdescripcion ?? System.DBNull.Value;
dr["cbi_ccodigo"] = (object)this.cbi_ccodigo ?? System.DBNull.Value;
dr["cbi_inovedad"] = (object)this.cbi_inovedad ?? System.DBNull.Value;
dr["cbi_inovedadTabla"] = (object)this.cbi_inovedadTabla ?? System.DBNull.Value;
dr["cbi_yimporte"] = (object)this.cbi_yimporte ?? System.DBNull.Value;
dr["cbi_icantidad"] = (object)this.cbi_icantidad ?? System.DBNull.Value;
dr["cbi_ndescuento"] = (object)this.cbi_ndescuento ?? System.DBNull.Value;
dr["cbi_cimpuestos"] = (object)this.cbi_cimpuestos ?? System.DBNull.Value;
							 
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
