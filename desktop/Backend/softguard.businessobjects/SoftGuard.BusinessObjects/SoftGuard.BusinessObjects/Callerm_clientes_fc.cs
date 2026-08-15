
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
    public class Callerm_clientes_fc : CallerObject
    { 	
				     private string _cli_cnombre;
					
				     private string _cli_cidentificacion;
					
				     private string _cli_ccategoriaimpositiva;
					
				     private int _cli_ivendedor;
					
				     private int _cli_icobrador;
					
				     private string _cli_czona;
					
				     private string _cli_ccallefiscal;
					
				     private string _cli_clocalidadfiscal;
					
				     private string _cli_cprovinciafiscal;
					
				     private string _cli_ccodigopostalfiscal;
					
				     private string _cli_ccallecobranza;
					
				     private string _cli_clocalidadcobranza;
					
				     private string _cli_cprovinciacobranza;
					
				     private string _cli_ccodigopostalcobranza;
					
				     private Decimal _cli_nlunes;
					
				     private Decimal _cli_nmartes;
					
				     private Decimal _cli_nmiercoles;
					
				     private Decimal _cli_njueves;
					
				     private Decimal _cli_nviernes;
					
				     private Decimal _cli_nsabado;
					
				     private Decimal _cli_ndomingo;
					
				     private string _cli_chora;
					
				     private string _cli_cservicio;
					
				     private DateTime? _cli_dproximafactura;
					
				     private string _cli_cformatoimpresion;
					
				     private string _cli_ccondicionpago;
					
				     private string _cli_ctelefono;
					
				     private string _cli_ccontacto;
					
				     private string _cli_cobservacion;
					
				     private Decimal _cli_nsituacion;
					
				     private int _cli_inumero;
					
				     private Decimal _cli_nDocCAE;
					
				     private string _cli_cDatosExtra;
					
				     private int _cli_iorganizacion;
				 ///<summary>
     ///cli_cnombre property   
     ///</summary>   
     public string cli_cnombre 
		 { 
		        
                    get{ return this._cli_cnombre; }
        						set{ this._cli_cnombre = value; } 										
	   }
	  ///<summary>
     ///cli_cidentificacion property   
     ///</summary>   
     public string cli_cidentificacion 
		 { 
		        
                    get{ return this._cli_cidentificacion; }
        						set{ this._cli_cidentificacion = value; } 										
	   }
	  ///<summary>
     ///cli_ccategoriaimpositiva property   
     ///</summary>   
     public string cli_ccategoriaimpositiva 
		 { 
		        
                    get{ return this._cli_ccategoriaimpositiva; }
        						set{ this._cli_ccategoriaimpositiva = value; } 										
	   }
	  ///<summary>
     ///cli_ivendedor property   
     ///</summary>   
     public int cli_ivendedor 
		 { 
		        
                    get{ return this._cli_ivendedor; }
        						set{ this._cli_ivendedor = value; } 										
	   }
	  ///<summary>
     ///cli_icobrador property   
     ///</summary>   
     public int cli_icobrador 
		 { 
		        
                    get{ return this._cli_icobrador; }
        						set{ this._cli_icobrador = value; } 										
	   }
	  ///<summary>
     ///cli_czona property   
     ///</summary>   
     public string cli_czona 
		 { 
		        
                    get{ return this._cli_czona; }
        						set{ this._cli_czona = value; } 										
	   }
	  ///<summary>
     ///cli_ccallefiscal property   
     ///</summary>   
     public string cli_ccallefiscal 
		 { 
		        
                    get{ return this._cli_ccallefiscal; }
        						set{ this._cli_ccallefiscal = value; } 										
	   }
	  ///<summary>
     ///cli_clocalidadfiscal property   
     ///</summary>   
     public string cli_clocalidadfiscal 
		 { 
		        
                    get{ return this._cli_clocalidadfiscal; }
        						set{ this._cli_clocalidadfiscal = value; } 										
	   }
	  ///<summary>
     ///cli_cprovinciafiscal property   
     ///</summary>   
     public string cli_cprovinciafiscal 
		 { 
		        
                    get{ return this._cli_cprovinciafiscal; }
        						set{ this._cli_cprovinciafiscal = value; } 										
	   }
	  ///<summary>
     ///cli_ccodigopostalfiscal property   
     ///</summary>   
     public string cli_ccodigopostalfiscal 
		 { 
		        
                    get{ return this._cli_ccodigopostalfiscal; }
        						set{ this._cli_ccodigopostalfiscal = value; } 										
	   }
	  ///<summary>
     ///cli_ccallecobranza property   
     ///</summary>   
     public string cli_ccallecobranza 
		 { 
		        
                    get{ return this._cli_ccallecobranza; }
        						set{ this._cli_ccallecobranza = value; } 										
	   }
	  ///<summary>
     ///cli_clocalidadcobranza property   
     ///</summary>   
     public string cli_clocalidadcobranza 
		 { 
		        
                    get{ return this._cli_clocalidadcobranza; }
        						set{ this._cli_clocalidadcobranza = value; } 										
	   }
	  ///<summary>
     ///cli_cprovinciacobranza property   
     ///</summary>   
     public string cli_cprovinciacobranza 
		 { 
		        
                    get{ return this._cli_cprovinciacobranza; }
        						set{ this._cli_cprovinciacobranza = value; } 										
	   }
	  ///<summary>
     ///cli_ccodigopostalcobranza property   
     ///</summary>   
     public string cli_ccodigopostalcobranza 
		 { 
		        
                    get{ return this._cli_ccodigopostalcobranza; }
        						set{ this._cli_ccodigopostalcobranza = value; } 										
	   }
	  ///<summary>
     ///cli_nlunes property   
     ///</summary>   
     public Decimal cli_nlunes 
		 { 
		        
                    get{ return this._cli_nlunes; }
        						set{ this._cli_nlunes = value; } 										
	   }
	  ///<summary>
     ///cli_nmartes property   
     ///</summary>   
     public Decimal cli_nmartes 
		 { 
		        
                    get{ return this._cli_nmartes; }
        						set{ this._cli_nmartes = value; } 										
	   }
	  ///<summary>
     ///cli_nmiercoles property   
     ///</summary>   
     public Decimal cli_nmiercoles 
		 { 
		        
                    get{ return this._cli_nmiercoles; }
        						set{ this._cli_nmiercoles = value; } 										
	   }
	  ///<summary>
     ///cli_njueves property   
     ///</summary>   
     public Decimal cli_njueves 
		 { 
		        
                    get{ return this._cli_njueves; }
        						set{ this._cli_njueves = value; } 										
	   }
	  ///<summary>
     ///cli_nviernes property   
     ///</summary>   
     public Decimal cli_nviernes 
		 { 
		        
                    get{ return this._cli_nviernes; }
        						set{ this._cli_nviernes = value; } 										
	   }
	  ///<summary>
     ///cli_nsabado property   
     ///</summary>   
     public Decimal cli_nsabado 
		 { 
		        
                    get{ return this._cli_nsabado; }
        						set{ this._cli_nsabado = value; } 										
	   }
	  ///<summary>
     ///cli_ndomingo property   
     ///</summary>   
     public Decimal cli_ndomingo 
		 { 
		        
                    get{ return this._cli_ndomingo; }
        						set{ this._cli_ndomingo = value; } 										
	   }
	  ///<summary>
     ///cli_chora property   
     ///</summary>   
     public string cli_chora 
		 { 
		        
                    get{ return this._cli_chora; }
        						set{ this._cli_chora = value; } 										
	   }
	  ///<summary>
     ///cli_cservicio property   
     ///</summary>   
     public string cli_cservicio 
		 { 
		        
                    get{ return this._cli_cservicio; }
        						set{ this._cli_cservicio = value; } 										
	   }
	  ///<summary>
     ///cli_dproximafactura property   
     ///</summary>   
     public DateTime? cli_dproximafactura 
		 { 
		        
                    get{ return this._cli_dproximafactura; }
        						set{ this._cli_dproximafactura = value; } 										
	   }
	  ///<summary>
     ///cli_cformatoimpresion property   
     ///</summary>   
     public string cli_cformatoimpresion 
		 { 
		        
                    get{ return this._cli_cformatoimpresion; }
        						set{ this._cli_cformatoimpresion = value; } 										
	   }
	  ///<summary>
     ///cli_ccondicionpago property   
     ///</summary>   
     public string cli_ccondicionpago 
		 { 
		        
                    get{ return this._cli_ccondicionpago; }
        						set{ this._cli_ccondicionpago = value; } 										
	   }
	  ///<summary>
     ///cli_ctelefono property   
     ///</summary>   
     public string cli_ctelefono 
		 { 
		        
                    get{ return this._cli_ctelefono; }
        						set{ this._cli_ctelefono = value; } 										
	   }
	  ///<summary>
     ///cli_ccontacto property   
     ///</summary>   
     public string cli_ccontacto 
		 { 
		        
                    get{ return this._cli_ccontacto; }
        						set{ this._cli_ccontacto = value; } 										
	   }
	  ///<summary>
     ///cli_cobservacion property   
     ///</summary>   
     public string cli_cobservacion 
		 { 
		        
                    get{ return this._cli_cobservacion; }
        						set{ this._cli_cobservacion = value; } 										
	   }
	  ///<summary>
     ///cli_nsituacion property   
     ///</summary>   
     public Decimal cli_nsituacion 
		 { 
		        
                    get{ return this._cli_nsituacion; }
        						set{ this._cli_nsituacion = value; } 										
	   }
	  ///<summary>
     ///cli_inumero property   
     ///</summary>   
     public int cli_inumero 
		 { 
		        
                    get{ return this._cli_inumero; }
        						set{ this._cli_inumero = value; } 										
	   }
	  ///<summary>
     ///cli_nDocCAE property   
     ///</summary>   
     public Decimal cli_nDocCAE 
		 { 
		        
                    get{ return this._cli_nDocCAE; }
        						set{ this._cli_nDocCAE = value; } 										
	   }
	  ///<summary>
     ///cli_cDatosExtra property   
     ///</summary>   
     public string cli_cDatosExtra 
		 { 
		        
                    get{ return this._cli_cDatosExtra; }
        						set{ this._cli_cDatosExtra = value; } 										
	   }
	  ///<summary>
     ///cli_iorganizacion property   
     ///</summary>   
     public int cli_iorganizacion 
		 { 
		        
                    get{ return this._cli_iorganizacion; }
        						set{ this._cli_iorganizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_clientes_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_clientes_fc(int Id, string Name, string cli_cnombre, string cli_cidentificacion, string cli_ccategoriaimpositiva, int cli_ivendedor, int cli_icobrador, string cli_czona, string cli_ccallefiscal, string cli_clocalidadfiscal, string cli_cprovinciafiscal, string cli_ccodigopostalfiscal, string cli_ccallecobranza, string cli_clocalidadcobranza, string cli_cprovinciacobranza, string cli_ccodigopostalcobranza, Decimal cli_nlunes, Decimal cli_nmartes, Decimal cli_nmiercoles, Decimal cli_njueves, Decimal cli_nviernes, Decimal cli_nsabado, Decimal cli_ndomingo, string cli_chora, string cli_cservicio, DateTime? cli_dproximafactura, string cli_cformatoimpresion, string cli_ccondicionpago, string cli_ctelefono, string cli_ccontacto, string cli_cobservacion, Decimal cli_nsituacion, int cli_inumero, Decimal cli_nDocCAE, string cli_cDatosExtra, int cli_iorganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cli_cnombre = cli_cnombre;
this._cli_cidentificacion = cli_cidentificacion;
this._cli_ccategoriaimpositiva = cli_ccategoriaimpositiva;
this._cli_ivendedor = cli_ivendedor;
this._cli_icobrador = cli_icobrador;
this._cli_czona = cli_czona;
this._cli_ccallefiscal = cli_ccallefiscal;
this._cli_clocalidadfiscal = cli_clocalidadfiscal;
this._cli_cprovinciafiscal = cli_cprovinciafiscal;
this._cli_ccodigopostalfiscal = cli_ccodigopostalfiscal;
this._cli_ccallecobranza = cli_ccallecobranza;
this._cli_clocalidadcobranza = cli_clocalidadcobranza;
this._cli_cprovinciacobranza = cli_cprovinciacobranza;
this._cli_ccodigopostalcobranza = cli_ccodigopostalcobranza;
this._cli_nlunes = cli_nlunes;
this._cli_nmartes = cli_nmartes;
this._cli_nmiercoles = cli_nmiercoles;
this._cli_njueves = cli_njueves;
this._cli_nviernes = cli_nviernes;
this._cli_nsabado = cli_nsabado;
this._cli_ndomingo = cli_ndomingo;
this._cli_chora = cli_chora;
this._cli_cservicio = cli_cservicio;
this._cli_dproximafactura = cli_dproximafactura;
this._cli_cformatoimpresion = cli_cformatoimpresion;
this._cli_ccondicionpago = cli_ccondicionpago;
this._cli_ctelefono = cli_ctelefono;
this._cli_ccontacto = cli_ccontacto;
this._cli_cobservacion = cli_cobservacion;
this._cli_nsituacion = cli_nsituacion;
this._cli_inumero = cli_inumero;
this._cli_nDocCAE = cli_nDocCAE;
this._cli_cDatosExtra = cli_cDatosExtra;
this._cli_iorganizacion = cli_iorganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3039, "m_clientes_fc");
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
			Simplem_clientes_fc Simple = new Simplem_clientes_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cli_cnombre = this._cli_cnombre;
Simple.cli_cidentificacion = this._cli_cidentificacion;
Simple.cli_ccategoriaimpositiva = this._cli_ccategoriaimpositiva;
Simple.cli_ivendedor = this._cli_ivendedor;
Simple.cli_icobrador = this._cli_icobrador;
Simple.cli_czona = this._cli_czona;
Simple.cli_ccallefiscal = this._cli_ccallefiscal;
Simple.cli_clocalidadfiscal = this._cli_clocalidadfiscal;
Simple.cli_cprovinciafiscal = this._cli_cprovinciafiscal;
Simple.cli_ccodigopostalfiscal = this._cli_ccodigopostalfiscal;
Simple.cli_ccallecobranza = this._cli_ccallecobranza;
Simple.cli_clocalidadcobranza = this._cli_clocalidadcobranza;
Simple.cli_cprovinciacobranza = this._cli_cprovinciacobranza;
Simple.cli_ccodigopostalcobranza = this._cli_ccodigopostalcobranza;
Simple.cli_nlunes = this._cli_nlunes;
Simple.cli_nmartes = this._cli_nmartes;
Simple.cli_nmiercoles = this._cli_nmiercoles;
Simple.cli_njueves = this._cli_njueves;
Simple.cli_nviernes = this._cli_nviernes;
Simple.cli_nsabado = this._cli_nsabado;
Simple.cli_ndomingo = this._cli_ndomingo;
Simple.cli_chora = this._cli_chora;
Simple.cli_cservicio = this._cli_cservicio;
Simple.cli_dproximafactura = this._cli_dproximafactura;
Simple.cli_cformatoimpresion = this._cli_cformatoimpresion;
Simple.cli_ccondicionpago = this._cli_ccondicionpago;
Simple.cli_ctelefono = this._cli_ctelefono;
Simple.cli_ccontacto = this._cli_ccontacto;
Simple.cli_cobservacion = this._cli_cobservacion;
Simple.cli_nsituacion = this._cli_nsituacion;
Simple.cli_inumero = this._cli_inumero;
Simple.cli_nDocCAE = this._cli_nDocCAE;
Simple.cli_cDatosExtra = this._cli_cDatosExtra;
Simple.cli_iorganizacion = this._cli_iorganizacion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_clientes_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cli_cnombre = Simple.cli_cnombre;
this._cli_cidentificacion = Simple.cli_cidentificacion;
this._cli_ccategoriaimpositiva = Simple.cli_ccategoriaimpositiva;
this._cli_ivendedor = Simple.cli_ivendedor;
this._cli_icobrador = Simple.cli_icobrador;
this._cli_czona = Simple.cli_czona;
this._cli_ccallefiscal = Simple.cli_ccallefiscal;
this._cli_clocalidadfiscal = Simple.cli_clocalidadfiscal;
this._cli_cprovinciafiscal = Simple.cli_cprovinciafiscal;
this._cli_ccodigopostalfiscal = Simple.cli_ccodigopostalfiscal;
this._cli_ccallecobranza = Simple.cli_ccallecobranza;
this._cli_clocalidadcobranza = Simple.cli_clocalidadcobranza;
this._cli_cprovinciacobranza = Simple.cli_cprovinciacobranza;
this._cli_ccodigopostalcobranza = Simple.cli_ccodigopostalcobranza;
this._cli_nlunes = Simple.cli_nlunes;
this._cli_nmartes = Simple.cli_nmartes;
this._cli_nmiercoles = Simple.cli_nmiercoles;
this._cli_njueves = Simple.cli_njueves;
this._cli_nviernes = Simple.cli_nviernes;
this._cli_nsabado = Simple.cli_nsabado;
this._cli_ndomingo = Simple.cli_ndomingo;
this._cli_chora = Simple.cli_chora;
this._cli_cservicio = Simple.cli_cservicio;
this._cli_dproximafactura = Simple.cli_dproximafactura;
this._cli_cformatoimpresion = Simple.cli_cformatoimpresion;
this._cli_ccondicionpago = Simple.cli_ccondicionpago;
this._cli_ctelefono = Simple.cli_ctelefono;
this._cli_ccontacto = Simple.cli_ccontacto;
this._cli_cobservacion = Simple.cli_cobservacion;
this._cli_nsituacion = Simple.cli_nsituacion;
this._cli_inumero = Simple.cli_inumero;
this._cli_nDocCAE = Simple.cli_nDocCAE;
this._cli_cDatosExtra = Simple.cli_cDatosExtra;
this._cli_iorganizacion = Simple.cli_iorganizacion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_clientes_fc(SqlConfig, UserId, (Simplem_clientes_fc) GetSimpleObject());
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
dr["cli_cnombre"] = this._cli_cnombre;
dr["cli_cidentificacion"] = this._cli_cidentificacion;
dr["cli_ccategoriaimpositiva"] = this._cli_ccategoriaimpositiva;
dr["cli_ivendedor"] = this._cli_ivendedor;
dr["cli_icobrador"] = this._cli_icobrador;
dr["cli_czona"] = this._cli_czona;
dr["cli_ccallefiscal"] = this._cli_ccallefiscal;
dr["cli_clocalidadfiscal"] = this._cli_clocalidadfiscal;
dr["cli_cprovinciafiscal"] = this._cli_cprovinciafiscal;
dr["cli_ccodigopostalfiscal"] = this._cli_ccodigopostalfiscal;
dr["cli_ccallecobranza"] = this._cli_ccallecobranza;
dr["cli_clocalidadcobranza"] = this._cli_clocalidadcobranza;
dr["cli_cprovinciacobranza"] = this._cli_cprovinciacobranza;
dr["cli_ccodigopostalcobranza"] = this._cli_ccodigopostalcobranza;
dr["cli_nlunes"] = this._cli_nlunes;
dr["cli_nmartes"] = this._cli_nmartes;
dr["cli_nmiercoles"] = this._cli_nmiercoles;
dr["cli_njueves"] = this._cli_njueves;
dr["cli_nviernes"] = this._cli_nviernes;
dr["cli_nsabado"] = this._cli_nsabado;
dr["cli_ndomingo"] = this._cli_ndomingo;
dr["cli_chora"] = this._cli_chora;
dr["cli_cservicio"] = this._cli_cservicio;
dr["cli_dproximafactura"] = this._cli_dproximafactura;
dr["cli_cformatoimpresion"] = this._cli_cformatoimpresion;
dr["cli_ccondicionpago"] = this._cli_ccondicionpago;
dr["cli_ctelefono"] = this._cli_ctelefono;
dr["cli_ccontacto"] = this._cli_ccontacto;
dr["cli_cobservacion"] = this._cli_cobservacion;
dr["cli_nsituacion"] = this._cli_nsituacion;
dr["cli_inumero"] = this._cli_inumero;
dr["cli_nDocCAE"] = this._cli_nDocCAE;
dr["cli_cDatosExtra"] = this._cli_cDatosExtra;
dr["cli_iorganizacion"] = this._cli_iorganizacion;
							 
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
