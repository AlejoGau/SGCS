
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
    public class Callerm_novedades_facturacion_fc : CallerObject
    { 	
				     private int _nfc_icliente;
					
				     private int _nfc_inovedad;
					
				     private Decimal _nfc_nrecurrente;
					
				     private Decimal _nfc_nestado;
				 ///<summary>
     ///nfc_icliente property   
     ///</summary>   
     public int nfc_icliente 
		 { 
		        
                    get{ return this._nfc_icliente; }
        						set{ this._nfc_icliente = value; } 										
	   }
	  ///<summary>
     ///nfc_inovedad property   
     ///</summary>   
     public int nfc_inovedad 
		 { 
		        
                    get{ return this._nfc_inovedad; }
        						set{ this._nfc_inovedad = value; } 										
	   }
	  ///<summary>
     ///nfc_nrecurrente property   
     ///</summary>   
     public Decimal nfc_nrecurrente 
		 { 
		        
                    get{ return this._nfc_nrecurrente; }
        						set{ this._nfc_nrecurrente = value; } 										
	   }
	  ///<summary>
     ///nfc_nestado property   
     ///</summary>   
     public Decimal nfc_nestado 
		 { 
		        
                    get{ return this._nfc_nestado; }
        						set{ this._nfc_nestado = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_novedades_facturacion_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_novedades_facturacion_fc(int Id, string Name, int nfc_icliente, int nfc_inovedad, Decimal nfc_nrecurrente, Decimal nfc_nestado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._nfc_icliente = nfc_icliente;
this._nfc_inovedad = nfc_inovedad;
this._nfc_nrecurrente = nfc_nrecurrente;
this._nfc_nestado = nfc_nestado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3191, "m_novedades_facturacion_fc");
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
			Simplem_novedades_facturacion_fc Simple = new Simplem_novedades_facturacion_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.nfc_icliente = this._nfc_icliente;
Simple.nfc_inovedad = this._nfc_inovedad;
Simple.nfc_nrecurrente = this._nfc_nrecurrente;
Simple.nfc_nestado = this._nfc_nestado;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_novedades_facturacion_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._nfc_icliente = Simple.nfc_icliente;
this._nfc_inovedad = Simple.nfc_inovedad;
this._nfc_nrecurrente = Simple.nfc_nrecurrente;
this._nfc_nestado = Simple.nfc_nestado;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_novedades_facturacion_fc(SqlConfig, UserId, (Simplem_novedades_facturacion_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("nfc_icliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("nfc_inovedad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("nfc_nrecurrente", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("nfc_nestado", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["nfc_icliente"] = this._nfc_icliente;
dr["nfc_inovedad"] = this._nfc_inovedad;
dr["nfc_nrecurrente"] = this._nfc_nrecurrente;
dr["nfc_nestado"] = this._nfc_nestado;
							 
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
