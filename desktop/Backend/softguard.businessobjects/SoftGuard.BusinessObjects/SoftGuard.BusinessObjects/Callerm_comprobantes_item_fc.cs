
    using System;
    using System.Xml;
    using System.Data;
    using Slbf;
    using Slbf.Helpers;	    	 

namespace SoftGuard.BusinessObjects
{ 	
   ///<summary>
     ///Caller object class   
     ///</summary>
    public class Callerm_comprobantes_item_fc : CallerObject
    { 	
				     private int _cbi_icodigocab;
					
				     private int _cbi_irenglon;
					
				     private int _cbi_iproducto;
					
				     private string _cbi_cdescripcion;
					
				     private string _cbi_ccodigo;
					
				     private int _cbi_inovedad;
					
				     private int _cbi_inovedadTabla;
					
				     private Decimal _cbi_yimporte;
					
				     private int _cbi_icantidad;
					
				     private Decimal _cbi_ndescuento;
					
				     private string _cbi_cimpuestos;
				 ///<summary>
     ///cbi_icodigocab property   
     ///</summary>   
     public int cbi_icodigocab 
		 { 
		        
                    get{ return this._cbi_icodigocab; }
        						set{ this._cbi_icodigocab = value; } 										
	   }
	  ///<summary>
     ///cbi_irenglon property   
     ///</summary>   
     public int cbi_irenglon 
		 { 
		        
                    get{ return this._cbi_irenglon; }
        						set{ this._cbi_irenglon = value; } 										
	   }
	  ///<summary>
     ///cbi_iproducto property   
     ///</summary>   
     public int cbi_iproducto 
		 { 
		        
                    get{ return this._cbi_iproducto; }
        						set{ this._cbi_iproducto = value; } 										
	   }
	  ///<summary>
     ///cbi_cdescripcion property   
     ///</summary>   
     public string cbi_cdescripcion 
		 { 
		        
                    get{ return this._cbi_cdescripcion; }
        						set{ this._cbi_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///cbi_ccodigo property   
     ///</summary>   
     public string cbi_ccodigo 
		 { 
		        
                    get{ return this._cbi_ccodigo; }
        						set{ this._cbi_ccodigo = value; } 										
	   }
	  ///<summary>
     ///cbi_inovedad property   
     ///</summary>   
     public int cbi_inovedad 
		 { 
		        
                    get{ return this._cbi_inovedad; }
        						set{ this._cbi_inovedad = value; } 										
	   }
	  ///<summary>
     ///cbi_inovedadTabla property   
     ///</summary>   
     public int cbi_inovedadTabla 
		 { 
		        
                    get{ return this._cbi_inovedadTabla; }
        						set{ this._cbi_inovedadTabla = value; } 										
	   }
	  ///<summary>
     ///cbi_yimporte property   
     ///</summary>   
     public Decimal cbi_yimporte 
		 { 
		        
                    get{ return this._cbi_yimporte; }
        						set{ this._cbi_yimporte = value; } 										
	   }
	  ///<summary>
     ///cbi_icantidad property   
     ///</summary>   
     public int cbi_icantidad 
		 { 
		        
                    get{ return this._cbi_icantidad; }
        						set{ this._cbi_icantidad = value; } 										
	   }
	  ///<summary>
     ///cbi_ndescuento property   
     ///</summary>   
     public Decimal cbi_ndescuento 
		 { 
		        
                    get{ return this._cbi_ndescuento; }
        						set{ this._cbi_ndescuento = value; } 										
	   }
	  ///<summary>
     ///cbi_cimpuestos property   
     ///</summary>   
     public string cbi_cimpuestos 
		 { 
		        
                    get{ return this._cbi_cimpuestos; }
        						set{ this._cbi_cimpuestos = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_comprobantes_item_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_comprobantes_item_fc(int Id, string Name, int cbi_icodigocab, int cbi_irenglon, int cbi_iproducto, string cbi_cdescripcion, string cbi_ccodigo, int cbi_inovedad, int cbi_inovedadTabla, Decimal cbi_yimporte, int cbi_icantidad, Decimal cbi_ndescuento, string cbi_cimpuestos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cbi_icodigocab = cbi_icodigocab;
this._cbi_irenglon = cbi_irenglon;
this._cbi_iproducto = cbi_iproducto;
this._cbi_cdescripcion = cbi_cdescripcion;
this._cbi_ccodigo = cbi_ccodigo;
this._cbi_inovedad = cbi_inovedad;
this._cbi_inovedadTabla = cbi_inovedadTabla;
this._cbi_yimporte = cbi_yimporte;
this._cbi_icantidad = cbi_icantidad;
this._cbi_ndescuento = cbi_ndescuento;
this._cbi_cimpuestos = cbi_cimpuestos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3152, "m_comprobantes_item_fc");
        }
 ///<summary>
     ///Gets the caller object   
     ///</summary>		
		public override CallerObject GetObject()
		{
			return (CallerObject) this;
		}
 ///<summary>
     ///Gets a simpleobject   
     ///</summary>	
		public override SimpleBaseObject GetSimpleObject()
		{
			Simplem_comprobantes_item_fc Simple = new Simplem_comprobantes_item_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cbi_icodigocab = this._cbi_icodigocab;
Simple.cbi_irenglon = this._cbi_irenglon;
Simple.cbi_iproducto = this._cbi_iproducto;
Simple.cbi_cdescripcion = this._cbi_cdescripcion;
Simple.cbi_ccodigo = this._cbi_ccodigo;
Simple.cbi_inovedad = this._cbi_inovedad;
Simple.cbi_inovedadTabla = this._cbi_inovedadTabla;
Simple.cbi_yimporte = this._cbi_yimporte;
Simple.cbi_icantidad = this._cbi_icantidad;
Simple.cbi_ndescuento = this._cbi_ndescuento;
Simple.cbi_cimpuestos = this._cbi_cimpuestos;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_comprobantes_item_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cbi_icodigocab = Simple.cbi_icodigocab;
this._cbi_irenglon = Simple.cbi_irenglon;
this._cbi_iproducto = Simple.cbi_iproducto;
this._cbi_cdescripcion = Simple.cbi_cdescripcion;
this._cbi_ccodigo = Simple.cbi_ccodigo;
this._cbi_inovedad = Simple.cbi_inovedad;
this._cbi_inovedadTabla = Simple.cbi_inovedadTabla;
this._cbi_yimporte = Simple.cbi_yimporte;
this._cbi_icantidad = Simple.cbi_icantidad;
this._cbi_ndescuento = Simple.cbi_ndescuento;
this._cbi_cimpuestos = Simple.cbi_cimpuestos;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_comprobantes_item_fc(SqlConfig, UserId, (Simplem_comprobantes_item_fc) GetSimpleObject());
		}
 ///<summary>
     ///Get object's data   
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
dr["cbi_icodigocab"] = this._cbi_icodigocab;
dr["cbi_irenglon"] = this._cbi_irenglon;
dr["cbi_iproducto"] = this._cbi_iproducto;
dr["cbi_cdescripcion"] = this._cbi_cdescripcion;
dr["cbi_ccodigo"] = this._cbi_ccodigo;
dr["cbi_inovedad"] = this._cbi_inovedad;
dr["cbi_inovedadTabla"] = this._cbi_inovedadTabla;
dr["cbi_yimporte"] = this._cbi_yimporte;
dr["cbi_icantidad"] = this._cbi_icantidad;
dr["cbi_ndescuento"] = this._cbi_ndescuento;
dr["cbi_cimpuestos"] = this._cbi_cimpuestos;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
 ///<summary>
     ///Get object's Xml representation   
     ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
			DataSet ds = new DataSet("Caller"); 
			ds.EnforceConstraints = false;														                
               							 
			ds.Tables.Add(GetDataObject());
			ds.Tables.Add(this.Type.GetDataObject());
			XmlDataDocument XmlDoc = new XmlDataDocument(ds);
			if(this.Relation != null)
				XmlDoc.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
			return XmlDoc;	
    }
 }

}
