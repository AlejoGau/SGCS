
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
    public class Callert_condiciones_pago_fc : CallerObject
    { 	
				     private string _con_ccodigo;
					
				     private string _con_cdescripcion;
					
				     private Decimal _con_ncuotas;
					
				     private int _con_idias;
					
				     private int _con_ifrecuencia;
					
				     private Decimal _con_nPideDatos;
					
				     private Decimal _con_nCobranzaAut;
					
				     private string _con_cCodigoBarra;
					
				     private int _con_iRemesa;
					
				     private string _con_cDatosExtra;
					
				     private string _con_cFormaPagoCobrAut;
					
				     private int _con_orgidcodigoid;
				 ///<summary>
     ///con_ccodigo property   
     ///</summary>   
     public string con_ccodigo 
		 { 
		        
                    get{ return this._con_ccodigo; }
        						set{ this._con_ccodigo = value; } 										
	   }
	  ///<summary>
     ///con_cdescripcion property   
     ///</summary>   
     public string con_cdescripcion 
		 { 
		        
                    get{ return this._con_cdescripcion; }
        						set{ this._con_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///con_ncuotas property   
     ///</summary>   
     public Decimal con_ncuotas 
		 { 
		        
                    get{ return this._con_ncuotas; }
        						set{ this._con_ncuotas = value; } 										
	   }
	  ///<summary>
     ///con_idias property   
     ///</summary>   
     public int con_idias 
		 { 
		        
                    get{ return this._con_idias; }
        						set{ this._con_idias = value; } 										
	   }
	  ///<summary>
     ///con_ifrecuencia property   
     ///</summary>   
     public int con_ifrecuencia 
		 { 
		        
                    get{ return this._con_ifrecuencia; }
        						set{ this._con_ifrecuencia = value; } 										
	   }
	  ///<summary>
     ///con_nPideDatos property   
     ///</summary>   
     public Decimal con_nPideDatos 
		 { 
		        
                    get{ return this._con_nPideDatos; }
        						set{ this._con_nPideDatos = value; } 										
	   }
	  ///<summary>
     ///con_nCobranzaAut property   
     ///</summary>   
     public Decimal con_nCobranzaAut 
		 { 
		        
                    get{ return this._con_nCobranzaAut; }
        						set{ this._con_nCobranzaAut = value; } 										
	   }
	  ///<summary>
     ///con_cCodigoBarra property   
     ///</summary>   
     public string con_cCodigoBarra 
		 { 
		        
                    get{ return this._con_cCodigoBarra; }
        						set{ this._con_cCodigoBarra = value; } 										
	   }
	  ///<summary>
     ///con_iRemesa property   
     ///</summary>   
     public int con_iRemesa 
		 { 
		        
                    get{ return this._con_iRemesa; }
        						set{ this._con_iRemesa = value; } 										
	   }
	  ///<summary>
     ///con_cDatosExtra property   
     ///</summary>   
     public string con_cDatosExtra 
		 { 
		        
                    get{ return this._con_cDatosExtra; }
        						set{ this._con_cDatosExtra = value; } 										
	   }
	  ///<summary>
     ///con_cFormaPagoCobrAut property   
     ///</summary>   
     public string con_cFormaPagoCobrAut 
		 { 
		        
                    get{ return this._con_cFormaPagoCobrAut; }
        						set{ this._con_cFormaPagoCobrAut = value; } 										
	   }
	  ///<summary>
     ///con_orgidcodigoid property   
     ///</summary>   
     public int con_orgidcodigoid 
		 { 
		        
                    get{ return this._con_orgidcodigoid; }
        						set{ this._con_orgidcodigoid = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_condiciones_pago_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_condiciones_pago_fc(int Id, string Name, string con_ccodigo, string con_cdescripcion, Decimal con_ncuotas, int con_idias, int con_ifrecuencia, Decimal con_nPideDatos, Decimal con_nCobranzaAut, string con_cCodigoBarra, int con_iRemesa, string con_cDatosExtra, string con_cFormaPagoCobrAut, int con_orgidcodigoid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._con_ccodigo = con_ccodigo;
this._con_cdescripcion = con_cdescripcion;
this._con_ncuotas = con_ncuotas;
this._con_idias = con_idias;
this._con_ifrecuencia = con_ifrecuencia;
this._con_nPideDatos = con_nPideDatos;
this._con_nCobranzaAut = con_nCobranzaAut;
this._con_cCodigoBarra = con_cCodigoBarra;
this._con_iRemesa = con_iRemesa;
this._con_cDatosExtra = con_cDatosExtra;
this._con_cFormaPagoCobrAut = con_cFormaPagoCobrAut;
this._con_orgidcodigoid = con_orgidcodigoid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3149, "t_condiciones_pago_fc");
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
			Simplet_condiciones_pago_fc Simple = new Simplet_condiciones_pago_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.con_ccodigo = this._con_ccodigo;
Simple.con_cdescripcion = this._con_cdescripcion;
Simple.con_ncuotas = this._con_ncuotas;
Simple.con_idias = this._con_idias;
Simple.con_ifrecuencia = this._con_ifrecuencia;
Simple.con_nPideDatos = this._con_nPideDatos;
Simple.con_nCobranzaAut = this._con_nCobranzaAut;
Simple.con_cCodigoBarra = this._con_cCodigoBarra;
Simple.con_iRemesa = this._con_iRemesa;
Simple.con_cDatosExtra = this._con_cDatosExtra;
Simple.con_cFormaPagoCobrAut = this._con_cFormaPagoCobrAut;
Simple.con_orgidcodigoid = this._con_orgidcodigoid;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_condiciones_pago_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._con_ccodigo = Simple.con_ccodigo;
this._con_cdescripcion = Simple.con_cdescripcion;
this._con_ncuotas = Simple.con_ncuotas;
this._con_idias = Simple.con_idias;
this._con_ifrecuencia = Simple.con_ifrecuencia;
this._con_nPideDatos = Simple.con_nPideDatos;
this._con_nCobranzaAut = Simple.con_nCobranzaAut;
this._con_cCodigoBarra = Simple.con_cCodigoBarra;
this._con_iRemesa = Simple.con_iRemesa;
this._con_cDatosExtra = Simple.con_cDatosExtra;
this._con_cFormaPagoCobrAut = Simple.con_cFormaPagoCobrAut;
this._con_orgidcodigoid = Simple.con_orgidcodigoid;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_condiciones_pago_fc(SqlConfig, UserId, (Simplet_condiciones_pago_fc) GetSimpleObject());
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
dr["con_ccodigo"] = this._con_ccodigo;
dr["con_cdescripcion"] = this._con_cdescripcion;
dr["con_ncuotas"] = this._con_ncuotas;
dr["con_idias"] = this._con_idias;
dr["con_ifrecuencia"] = this._con_ifrecuencia;
dr["con_nPideDatos"] = this._con_nPideDatos;
dr["con_nCobranzaAut"] = this._con_nCobranzaAut;
dr["con_cCodigoBarra"] = this._con_cCodigoBarra;
dr["con_iRemesa"] = this._con_iRemesa;
dr["con_cDatosExtra"] = this._con_cDatosExtra;
dr["con_cFormaPagoCobrAut"] = this._con_cFormaPagoCobrAut;
dr["con_orgidcodigoid"] = this._con_orgidcodigoid;
							 
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
