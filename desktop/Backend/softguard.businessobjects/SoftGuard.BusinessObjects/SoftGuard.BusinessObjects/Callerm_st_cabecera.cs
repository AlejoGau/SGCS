
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
    public class Callerm_st_cabecera : CallerObject
    { 	
				     private int _stc_iid_cuenta;
					
				     private int _stc_inumero;
					
				     private string _stc_ctipo_servicio;
					
				     private string _stc_mobservaciones;
					
				     private DateTime? _stc_dfecha_desde_1;
					
				     private DateTime? _stc_dfecha_hasta_1;
					
				     private DateTime? _stc_dfecha_desde_2;
					
				     private DateTime? _stc_dfecha_hasta_2;
					
				     private DateTime? _stc_dfecha_desde_3;
					
				     private DateTime? _stc_dfecha_hasta_3;
					
				     private DateTime? _stc_dfecha_cierre;
					
				     private string _stc_ccontacto;
					
				     private Decimal _stc_nestado;
					
				     private string _stc_ctecnico_1;
					
				     private string _stc_ctecnico_2;
					
				     private string _stc_ctecnico_3;
					
				     private string _stc_ctecnico_4;
					
				     private string _stc_ctecnico_5;
					
				     private Decimal _stc_yValor;
					
				     private Decimal _stc_nreclamo_1;
					
				     private string _stc_creclamo_1;
					
				     private Decimal _stc_nreclamo_2;
					
				     private string _stc_creclamo_2;
					
				     private Decimal _stc_nreclamo_3;
					
				     private string _stc_creclamo_3;
					
				     private Decimal _stc_nreclamo_4;
					
				     private string _stc_creclamo_4;
					
				     private Decimal _stc_nreclamo_5;
					
				     private string _stc_creclamo_5;
					
				     private string _stc_cmovil_1;
					
				     private string _stc_cmovil_2;
					
				     private DateTime? _stc_dfecha_modificacion;
					
				     private int _stc_ioperador;
					
				     private string _stc_minsumos;
					
				     private DateTime? _stc_dintecnico_1;
					
				     private DateTime? _stc_doutecnico_1;
					
				     private DateTime? _stc_dintecnico_2;
					
				     private DateTime? _stc_doutecnico_2;
					
				     private DateTime? _stc_dintecnico_3;
					
				     private DateTime? _stc_doutecnico_3;
					
				     private string _stc_cdeposito;
					
				     private DateTime? _stf_dfecha_vto_orden;
					
				     private DateTime? _stc_dsalida_al_cliente_DSS;
					
				     private DateTime? _stc_darribo_al_cliente_DSS;
					
				     private DateTime? _stc_dsalida_desde_cliente_DSS;
					
				     private int _stc_iforma_viaje_DSS;
					
				     private string _stc_cconformidad_html ;
					
				     private int _stc_idorigenorden;
					
				     private DateTime? _stc_dfechapago;
					
				     private Decimal _stc_nvalorpagotecnico;
					
				     private Decimal _stc_ncostomanodeobra;
					
				     private int _stc_iPrioridad;
					
				     private int _stc_iOrganizacion;
				 ///<summary>
     ///stc_iid_cuenta property   
     ///</summary>   
     public int stc_iid_cuenta 
		 { 
		        
                    get{ return this._stc_iid_cuenta; }
        						set{ this._stc_iid_cuenta = value; } 										
	   }
	  ///<summary>
     ///stc_inumero property   
     ///</summary>   
     public int stc_inumero 
		 { 
		        
                    get{ return this._stc_inumero; }
        						set{ this._stc_inumero = value; } 										
	   }
	  ///<summary>
     ///stc_ctipo_servicio property   
     ///</summary>   
     public string stc_ctipo_servicio 
		 { 
		        
                    get{ return this._stc_ctipo_servicio; }
        						set{ this._stc_ctipo_servicio = value; } 										
	   }
	  ///<summary>
     ///stc_mobservaciones property   
     ///</summary>   
     public string stc_mobservaciones 
		 { 
		        
                    get{ return this._stc_mobservaciones; }
        						set{ this._stc_mobservaciones = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_desde_1 property   
     ///</summary>   
     public DateTime? stc_dfecha_desde_1 
		 { 
		        
                    get{ return this._stc_dfecha_desde_1; }
        						set{ this._stc_dfecha_desde_1 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_hasta_1 property   
     ///</summary>   
     public DateTime? stc_dfecha_hasta_1 
		 { 
		        
                    get{ return this._stc_dfecha_hasta_1; }
        						set{ this._stc_dfecha_hasta_1 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_desde_2 property   
     ///</summary>   
     public DateTime? stc_dfecha_desde_2 
		 { 
		        
                    get{ return this._stc_dfecha_desde_2; }
        						set{ this._stc_dfecha_desde_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_hasta_2 property   
     ///</summary>   
     public DateTime? stc_dfecha_hasta_2 
		 { 
		        
                    get{ return this._stc_dfecha_hasta_2; }
        						set{ this._stc_dfecha_hasta_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_desde_3 property   
     ///</summary>   
     public DateTime? stc_dfecha_desde_3 
		 { 
		        
                    get{ return this._stc_dfecha_desde_3; }
        						set{ this._stc_dfecha_desde_3 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_hasta_3 property   
     ///</summary>   
     public DateTime? stc_dfecha_hasta_3 
		 { 
		        
                    get{ return this._stc_dfecha_hasta_3; }
        						set{ this._stc_dfecha_hasta_3 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_cierre property   
     ///</summary>   
     public DateTime? stc_dfecha_cierre 
		 { 
		        
                    get{ return this._stc_dfecha_cierre; }
        						set{ this._stc_dfecha_cierre = value; } 										
	   }
	  ///<summary>
     ///stc_ccontacto property   
     ///</summary>   
     public string stc_ccontacto 
		 { 
		        
                    get{ return this._stc_ccontacto; }
        						set{ this._stc_ccontacto = value; } 										
	   }
	  ///<summary>
     ///stc_nestado property   
     ///</summary>   
     public Decimal stc_nestado 
		 { 
		        
                    get{ return this._stc_nestado; }
        						set{ this._stc_nestado = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_1 property   
     ///</summary>   
     public string stc_ctecnico_1 
		 { 
		        
                    get{ return this._stc_ctecnico_1; }
        						set{ this._stc_ctecnico_1 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_2 property   
     ///</summary>   
     public string stc_ctecnico_2 
		 { 
		        
                    get{ return this._stc_ctecnico_2; }
        						set{ this._stc_ctecnico_2 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_3 property   
     ///</summary>   
     public string stc_ctecnico_3 
		 { 
		        
                    get{ return this._stc_ctecnico_3; }
        						set{ this._stc_ctecnico_3 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_4 property   
     ///</summary>   
     public string stc_ctecnico_4 
		 { 
		        
                    get{ return this._stc_ctecnico_4; }
        						set{ this._stc_ctecnico_4 = value; } 										
	   }
	  ///<summary>
     ///stc_ctecnico_5 property   
     ///</summary>   
     public string stc_ctecnico_5 
		 { 
		        
                    get{ return this._stc_ctecnico_5; }
        						set{ this._stc_ctecnico_5 = value; } 										
	   }
	  ///<summary>
     ///stc_yValor property   
     ///</summary>   
     public Decimal stc_yValor 
		 { 
		        
                    get{ return this._stc_yValor; }
        						set{ this._stc_yValor = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_1 property   
     ///</summary>   
     public Decimal stc_nreclamo_1 
		 { 
		        
                    get{ return this._stc_nreclamo_1; }
        						set{ this._stc_nreclamo_1 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_1 property   
     ///</summary>   
     public string stc_creclamo_1 
		 { 
		        
                    get{ return this._stc_creclamo_1; }
        						set{ this._stc_creclamo_1 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_2 property   
     ///</summary>   
     public Decimal stc_nreclamo_2 
		 { 
		        
                    get{ return this._stc_nreclamo_2; }
        						set{ this._stc_nreclamo_2 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_2 property   
     ///</summary>   
     public string stc_creclamo_2 
		 { 
		        
                    get{ return this._stc_creclamo_2; }
        						set{ this._stc_creclamo_2 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_3 property   
     ///</summary>   
     public Decimal stc_nreclamo_3 
		 { 
		        
                    get{ return this._stc_nreclamo_3; }
        						set{ this._stc_nreclamo_3 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_3 property   
     ///</summary>   
     public string stc_creclamo_3 
		 { 
		        
                    get{ return this._stc_creclamo_3; }
        						set{ this._stc_creclamo_3 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_4 property   
     ///</summary>   
     public Decimal stc_nreclamo_4 
		 { 
		        
                    get{ return this._stc_nreclamo_4; }
        						set{ this._stc_nreclamo_4 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_4 property   
     ///</summary>   
     public string stc_creclamo_4 
		 { 
		        
                    get{ return this._stc_creclamo_4; }
        						set{ this._stc_creclamo_4 = value; } 										
	   }
	  ///<summary>
     ///stc_nreclamo_5 property   
     ///</summary>   
     public Decimal stc_nreclamo_5 
		 { 
		        
                    get{ return this._stc_nreclamo_5; }
        						set{ this._stc_nreclamo_5 = value; } 										
	   }
	  ///<summary>
     ///stc_creclamo_5 property   
     ///</summary>   
     public string stc_creclamo_5 
		 { 
		        
                    get{ return this._stc_creclamo_5; }
        						set{ this._stc_creclamo_5 = value; } 										
	   }
	  ///<summary>
     ///stc_cmovil_1 property   
     ///</summary>   
     public string stc_cmovil_1 
		 { 
		        
                    get{ return this._stc_cmovil_1; }
        						set{ this._stc_cmovil_1 = value; } 										
	   }
	  ///<summary>
     ///stc_cmovil_2 property   
     ///</summary>   
     public string stc_cmovil_2 
		 { 
		        
                    get{ return this._stc_cmovil_2; }
        						set{ this._stc_cmovil_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dfecha_modificacion property   
     ///</summary>   
     public DateTime? stc_dfecha_modificacion 
		 { 
		        
                    get{ return this._stc_dfecha_modificacion; }
        						set{ this._stc_dfecha_modificacion = value; } 										
	   }
	  ///<summary>
     ///stc_ioperador property   
     ///</summary>   
     public int stc_ioperador 
		 { 
		        
                    get{ return this._stc_ioperador; }
        						set{ this._stc_ioperador = value; } 										
	   }
	  ///<summary>
     ///stc_minsumos property   
     ///</summary>   
     public string stc_minsumos 
		 { 
		        
                    get{ return this._stc_minsumos; }
        						set{ this._stc_minsumos = value; } 										
	   }
	  ///<summary>
     ///stc_dintecnico_1 property   
     ///</summary>   
     public DateTime? stc_dintecnico_1 
		 { 
		        
                    get{ return this._stc_dintecnico_1; }
        						set{ this._stc_dintecnico_1 = value; } 										
	   }
	  ///<summary>
     ///stc_doutecnico_1 property   
     ///</summary>   
     public DateTime? stc_doutecnico_1 
		 { 
		        
                    get{ return this._stc_doutecnico_1; }
        						set{ this._stc_doutecnico_1 = value; } 										
	   }
	  ///<summary>
     ///stc_dintecnico_2 property   
     ///</summary>   
     public DateTime? stc_dintecnico_2 
		 { 
		        
                    get{ return this._stc_dintecnico_2; }
        						set{ this._stc_dintecnico_2 = value; } 										
	   }
	  ///<summary>
     ///stc_doutecnico_2 property   
     ///</summary>   
     public DateTime? stc_doutecnico_2 
		 { 
		        
                    get{ return this._stc_doutecnico_2; }
        						set{ this._stc_doutecnico_2 = value; } 										
	   }
	  ///<summary>
     ///stc_dintecnico_3 property   
     ///</summary>   
     public DateTime? stc_dintecnico_3 
		 { 
		        
                    get{ return this._stc_dintecnico_3; }
        						set{ this._stc_dintecnico_3 = value; } 										
	   }
	  ///<summary>
     ///stc_doutecnico_3 property   
     ///</summary>   
     public DateTime? stc_doutecnico_3 
		 { 
		        
                    get{ return this._stc_doutecnico_3; }
        						set{ this._stc_doutecnico_3 = value; } 										
	   }
	  ///<summary>
     ///stc_cdeposito property   
     ///</summary>   
     public string stc_cdeposito 
		 { 
		        
                    get{ return this._stc_cdeposito; }
        						set{ this._stc_cdeposito = value; } 										
	   }
	  ///<summary>
     ///stf_dfecha_vto_orden property   
     ///</summary>   
     public DateTime? stf_dfecha_vto_orden 
		 { 
		        
                    get{ return this._stf_dfecha_vto_orden; }
        						set{ this._stf_dfecha_vto_orden = value; } 										
	   }
	  ///<summary>
     ///stc_dsalida_al_cliente_DSS property   
     ///</summary>   
     public DateTime? stc_dsalida_al_cliente_DSS 
		 { 
		        
                    get{ return this._stc_dsalida_al_cliente_DSS; }
        						set{ this._stc_dsalida_al_cliente_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_darribo_al_cliente_DSS property   
     ///</summary>   
     public DateTime? stc_darribo_al_cliente_DSS 
		 { 
		        
                    get{ return this._stc_darribo_al_cliente_DSS; }
        						set{ this._stc_darribo_al_cliente_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_dsalida_desde_cliente_DSS property   
     ///</summary>   
     public DateTime? stc_dsalida_desde_cliente_DSS 
		 { 
		        
                    get{ return this._stc_dsalida_desde_cliente_DSS; }
        						set{ this._stc_dsalida_desde_cliente_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_iforma_viaje_DSS property   
     ///</summary>   
     public int stc_iforma_viaje_DSS 
		 { 
		        
                    get{ return this._stc_iforma_viaje_DSS; }
        						set{ this._stc_iforma_viaje_DSS = value; } 										
	   }
	  ///<summary>
     ///stc_cconformidad_html  property   
     ///</summary>   
     public string stc_cconformidad_html  
		 { 
		        
                    get{ return this._stc_cconformidad_html ; }
        						set{ this._stc_cconformidad_html  = value; } 										
	   }
	  ///<summary>
     ///stc_idorigenorden property   
     ///</summary>   
     public int stc_idorigenorden 
		 { 
		        
                    get{ return this._stc_idorigenorden; }
        						set{ this._stc_idorigenorden = value; } 										
	   }
	  ///<summary>
     ///stc_dfechapago property   
     ///</summary>   
     public DateTime? stc_dfechapago 
		 { 
		        
                    get{ return this._stc_dfechapago; }
        						set{ this._stc_dfechapago = value; } 										
	   }
	  ///<summary>
     ///stc_nvalorpagotecnico property   
     ///</summary>   
     public Decimal stc_nvalorpagotecnico 
		 { 
		        
                    get{ return this._stc_nvalorpagotecnico; }
        						set{ this._stc_nvalorpagotecnico = value; } 										
	   }
	  ///<summary>
     ///stc_ncostomanodeobra property   
     ///</summary>   
     public Decimal stc_ncostomanodeobra 
		 { 
		        
                    get{ return this._stc_ncostomanodeobra; }
        						set{ this._stc_ncostomanodeobra = value; } 										
	   }
	  ///<summary>
     ///stc_iPrioridad property   
     ///</summary>   
     public int stc_iPrioridad 
		 { 
		        
                    get{ return this._stc_iPrioridad; }
        						set{ this._stc_iPrioridad = value; } 										
	   }
	  ///<summary>
     ///stc_iOrganizacion property   
     ///</summary>   
     public int stc_iOrganizacion 
		 { 
		        
                    get{ return this._stc_iOrganizacion; }
        						set{ this._stc_iOrganizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_st_cabecera() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_st_cabecera(int Id, string Name, int stc_iid_cuenta, int stc_inumero, string stc_ctipo_servicio, string stc_mobservaciones, DateTime? stc_dfecha_desde_1, DateTime? stc_dfecha_hasta_1, DateTime? stc_dfecha_desde_2, DateTime? stc_dfecha_hasta_2, DateTime? stc_dfecha_desde_3, DateTime? stc_dfecha_hasta_3, DateTime? stc_dfecha_cierre, string stc_ccontacto, Decimal stc_nestado, string stc_ctecnico_1, string stc_ctecnico_2, string stc_ctecnico_3, string stc_ctecnico_4, string stc_ctecnico_5, Decimal stc_yValor, Decimal stc_nreclamo_1, string stc_creclamo_1, Decimal stc_nreclamo_2, string stc_creclamo_2, Decimal stc_nreclamo_3, string stc_creclamo_3, Decimal stc_nreclamo_4, string stc_creclamo_4, Decimal stc_nreclamo_5, string stc_creclamo_5, string stc_cmovil_1, string stc_cmovil_2, DateTime? stc_dfecha_modificacion, int stc_ioperador, string stc_minsumos, DateTime? stc_dintecnico_1, DateTime? stc_doutecnico_1, DateTime? stc_dintecnico_2, DateTime? stc_doutecnico_2, DateTime? stc_dintecnico_3, DateTime? stc_doutecnico_3, string stc_cdeposito, DateTime? stf_dfecha_vto_orden, DateTime? stc_dsalida_al_cliente_DSS, DateTime? stc_darribo_al_cliente_DSS, DateTime? stc_dsalida_desde_cliente_DSS, int stc_iforma_viaje_DSS, string stc_cconformidad_html , int stc_idorigenorden, DateTime? stc_dfechapago, Decimal stc_nvalorpagotecnico, Decimal stc_ncostomanodeobra, int stc_iPrioridad, int stc_iOrganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._stc_iid_cuenta = stc_iid_cuenta;
this._stc_inumero = stc_inumero;
this._stc_ctipo_servicio = stc_ctipo_servicio;
this._stc_mobservaciones = stc_mobservaciones;
this._stc_dfecha_desde_1 = stc_dfecha_desde_1;
this._stc_dfecha_hasta_1 = stc_dfecha_hasta_1;
this._stc_dfecha_desde_2 = stc_dfecha_desde_2;
this._stc_dfecha_hasta_2 = stc_dfecha_hasta_2;
this._stc_dfecha_desde_3 = stc_dfecha_desde_3;
this._stc_dfecha_hasta_3 = stc_dfecha_hasta_3;
this._stc_dfecha_cierre = stc_dfecha_cierre;
this._stc_ccontacto = stc_ccontacto;
this._stc_nestado = stc_nestado;
this._stc_ctecnico_1 = stc_ctecnico_1;
this._stc_ctecnico_2 = stc_ctecnico_2;
this._stc_ctecnico_3 = stc_ctecnico_3;
this._stc_ctecnico_4 = stc_ctecnico_4;
this._stc_ctecnico_5 = stc_ctecnico_5;
this._stc_yValor = stc_yValor;
this._stc_nreclamo_1 = stc_nreclamo_1;
this._stc_creclamo_1 = stc_creclamo_1;
this._stc_nreclamo_2 = stc_nreclamo_2;
this._stc_creclamo_2 = stc_creclamo_2;
this._stc_nreclamo_3 = stc_nreclamo_3;
this._stc_creclamo_3 = stc_creclamo_3;
this._stc_nreclamo_4 = stc_nreclamo_4;
this._stc_creclamo_4 = stc_creclamo_4;
this._stc_nreclamo_5 = stc_nreclamo_5;
this._stc_creclamo_5 = stc_creclamo_5;
this._stc_cmovil_1 = stc_cmovil_1;
this._stc_cmovil_2 = stc_cmovil_2;
this._stc_dfecha_modificacion = stc_dfecha_modificacion;
this._stc_ioperador = stc_ioperador;
this._stc_minsumos = stc_minsumos;
this._stc_dintecnico_1 = stc_dintecnico_1;
this._stc_doutecnico_1 = stc_doutecnico_1;
this._stc_dintecnico_2 = stc_dintecnico_2;
this._stc_doutecnico_2 = stc_doutecnico_2;
this._stc_dintecnico_3 = stc_dintecnico_3;
this._stc_doutecnico_3 = stc_doutecnico_3;
this._stc_cdeposito = stc_cdeposito;
this._stf_dfecha_vto_orden = stf_dfecha_vto_orden;
this._stc_dsalida_al_cliente_DSS = stc_dsalida_al_cliente_DSS;
this._stc_darribo_al_cliente_DSS = stc_darribo_al_cliente_DSS;
this._stc_dsalida_desde_cliente_DSS = stc_dsalida_desde_cliente_DSS;
this._stc_iforma_viaje_DSS = stc_iforma_viaje_DSS;
this._stc_cconformidad_html  = stc_cconformidad_html ;
this._stc_idorigenorden = stc_idorigenorden;
this._stc_dfechapago = stc_dfechapago;
this._stc_nvalorpagotecnico = stc_nvalorpagotecnico;
this._stc_ncostomanodeobra = stc_ncostomanodeobra;
this._stc_iPrioridad = stc_iPrioridad;
this._stc_iOrganizacion = stc_iOrganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3102, "m_st_cabecera");
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
			Simplem_st_cabecera Simple = new Simplem_st_cabecera();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.stc_iid_cuenta = this._stc_iid_cuenta;
Simple.stc_inumero = this._stc_inumero;
Simple.stc_ctipo_servicio = this._stc_ctipo_servicio;
Simple.stc_mobservaciones = this._stc_mobservaciones;
Simple.stc_dfecha_desde_1 = this._stc_dfecha_desde_1;
Simple.stc_dfecha_hasta_1 = this._stc_dfecha_hasta_1;
Simple.stc_dfecha_desde_2 = this._stc_dfecha_desde_2;
Simple.stc_dfecha_hasta_2 = this._stc_dfecha_hasta_2;
Simple.stc_dfecha_desde_3 = this._stc_dfecha_desde_3;
Simple.stc_dfecha_hasta_3 = this._stc_dfecha_hasta_3;
Simple.stc_dfecha_cierre = this._stc_dfecha_cierre;
Simple.stc_ccontacto = this._stc_ccontacto;
Simple.stc_nestado = this._stc_nestado;
Simple.stc_ctecnico_1 = this._stc_ctecnico_1;
Simple.stc_ctecnico_2 = this._stc_ctecnico_2;
Simple.stc_ctecnico_3 = this._stc_ctecnico_3;
Simple.stc_ctecnico_4 = this._stc_ctecnico_4;
Simple.stc_ctecnico_5 = this._stc_ctecnico_5;
Simple.stc_yValor = this._stc_yValor;
Simple.stc_nreclamo_1 = this._stc_nreclamo_1;
Simple.stc_creclamo_1 = this._stc_creclamo_1;
Simple.stc_nreclamo_2 = this._stc_nreclamo_2;
Simple.stc_creclamo_2 = this._stc_creclamo_2;
Simple.stc_nreclamo_3 = this._stc_nreclamo_3;
Simple.stc_creclamo_3 = this._stc_creclamo_3;
Simple.stc_nreclamo_4 = this._stc_nreclamo_4;
Simple.stc_creclamo_4 = this._stc_creclamo_4;
Simple.stc_nreclamo_5 = this._stc_nreclamo_5;
Simple.stc_creclamo_5 = this._stc_creclamo_5;
Simple.stc_cmovil_1 = this._stc_cmovil_1;
Simple.stc_cmovil_2 = this._stc_cmovil_2;
Simple.stc_dfecha_modificacion = this._stc_dfecha_modificacion;
Simple.stc_ioperador = this._stc_ioperador;
Simple.stc_minsumos = this._stc_minsumos;
Simple.stc_dintecnico_1 = this._stc_dintecnico_1;
Simple.stc_doutecnico_1 = this._stc_doutecnico_1;
Simple.stc_dintecnico_2 = this._stc_dintecnico_2;
Simple.stc_doutecnico_2 = this._stc_doutecnico_2;
Simple.stc_dintecnico_3 = this._stc_dintecnico_3;
Simple.stc_doutecnico_3 = this._stc_doutecnico_3;
Simple.stc_cdeposito = this._stc_cdeposito;
Simple.stf_dfecha_vto_orden = this._stf_dfecha_vto_orden;
Simple.stc_dsalida_al_cliente_DSS = this._stc_dsalida_al_cliente_DSS;
Simple.stc_darribo_al_cliente_DSS = this._stc_darribo_al_cliente_DSS;
Simple.stc_dsalida_desde_cliente_DSS = this._stc_dsalida_desde_cliente_DSS;
Simple.stc_iforma_viaje_DSS = this._stc_iforma_viaje_DSS;
Simple.stc_cconformidad_html  = this._stc_cconformidad_html ;
Simple.stc_idorigenorden = this._stc_idorigenorden;
Simple.stc_dfechapago = this._stc_dfechapago;
Simple.stc_nvalorpagotecnico = this._stc_nvalorpagotecnico;
Simple.stc_ncostomanodeobra = this._stc_ncostomanodeobra;
Simple.stc_iPrioridad = this._stc_iPrioridad;
Simple.stc_iOrganizacion = this._stc_iOrganizacion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_st_cabecera Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._stc_iid_cuenta = Simple.stc_iid_cuenta;
this._stc_inumero = Simple.stc_inumero;
this._stc_ctipo_servicio = Simple.stc_ctipo_servicio;
this._stc_mobservaciones = Simple.stc_mobservaciones;
this._stc_dfecha_desde_1 = Simple.stc_dfecha_desde_1;
this._stc_dfecha_hasta_1 = Simple.stc_dfecha_hasta_1;
this._stc_dfecha_desde_2 = Simple.stc_dfecha_desde_2;
this._stc_dfecha_hasta_2 = Simple.stc_dfecha_hasta_2;
this._stc_dfecha_desde_3 = Simple.stc_dfecha_desde_3;
this._stc_dfecha_hasta_3 = Simple.stc_dfecha_hasta_3;
this._stc_dfecha_cierre = Simple.stc_dfecha_cierre;
this._stc_ccontacto = Simple.stc_ccontacto;
this._stc_nestado = Simple.stc_nestado;
this._stc_ctecnico_1 = Simple.stc_ctecnico_1;
this._stc_ctecnico_2 = Simple.stc_ctecnico_2;
this._stc_ctecnico_3 = Simple.stc_ctecnico_3;
this._stc_ctecnico_4 = Simple.stc_ctecnico_4;
this._stc_ctecnico_5 = Simple.stc_ctecnico_5;
this._stc_yValor = Simple.stc_yValor;
this._stc_nreclamo_1 = Simple.stc_nreclamo_1;
this._stc_creclamo_1 = Simple.stc_creclamo_1;
this._stc_nreclamo_2 = Simple.stc_nreclamo_2;
this._stc_creclamo_2 = Simple.stc_creclamo_2;
this._stc_nreclamo_3 = Simple.stc_nreclamo_3;
this._stc_creclamo_3 = Simple.stc_creclamo_3;
this._stc_nreclamo_4 = Simple.stc_nreclamo_4;
this._stc_creclamo_4 = Simple.stc_creclamo_4;
this._stc_nreclamo_5 = Simple.stc_nreclamo_5;
this._stc_creclamo_5 = Simple.stc_creclamo_5;
this._stc_cmovil_1 = Simple.stc_cmovil_1;
this._stc_cmovil_2 = Simple.stc_cmovil_2;
this._stc_dfecha_modificacion = Simple.stc_dfecha_modificacion;
this._stc_ioperador = Simple.stc_ioperador;
this._stc_minsumos = Simple.stc_minsumos;
this._stc_dintecnico_1 = Simple.stc_dintecnico_1;
this._stc_doutecnico_1 = Simple.stc_doutecnico_1;
this._stc_dintecnico_2 = Simple.stc_dintecnico_2;
this._stc_doutecnico_2 = Simple.stc_doutecnico_2;
this._stc_dintecnico_3 = Simple.stc_dintecnico_3;
this._stc_doutecnico_3 = Simple.stc_doutecnico_3;
this._stc_cdeposito = Simple.stc_cdeposito;
this._stf_dfecha_vto_orden = Simple.stf_dfecha_vto_orden;
this._stc_dsalida_al_cliente_DSS = Simple.stc_dsalida_al_cliente_DSS;
this._stc_darribo_al_cliente_DSS = Simple.stc_darribo_al_cliente_DSS;
this._stc_dsalida_desde_cliente_DSS = Simple.stc_dsalida_desde_cliente_DSS;
this._stc_iforma_viaje_DSS = Simple.stc_iforma_viaje_DSS;
this._stc_cconformidad_html  = Simple.stc_cconformidad_html ;
this._stc_idorigenorden = Simple.stc_idorigenorden;
this._stc_dfechapago = Simple.stc_dfechapago;
this._stc_nvalorpagotecnico = Simple.stc_nvalorpagotecnico;
this._stc_ncostomanodeobra = Simple.stc_ncostomanodeobra;
this._stc_iPrioridad = Simple.stc_iPrioridad;
this._stc_iOrganizacion = Simple.stc_iOrganizacion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_st_cabecera(SqlConfig, UserId, (Simplem_st_cabecera) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("stc_iid_cuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_ctipo_servicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_mobservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_desde_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_hasta_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_desde_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_hasta_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_desde_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_hasta_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_cierre", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_ccontacto", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_4", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_ctecnico_5", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_yValor", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_1", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_4", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_4", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_nreclamo_5", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_creclamo_5", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_cmovil_1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_cmovil_2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_dfecha_modificacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_minsumos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_dintecnico_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_doutecnico_1", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dintecnico_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_doutecnico_2", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dintecnico_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_doutecnico_3", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_cdeposito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stf_dfecha_vto_orden", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dsalida_al_cliente_DSS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_darribo_al_cliente_DSS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_dsalida_desde_cliente_DSS", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_iforma_viaje_DSS", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_cconformidad_html ", typeof (string)));               
							 dt.Columns.Add(new DataColumn("stc_idorigenorden", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_dfechapago", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("stc_nvalorpagotecnico", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_ncostomanodeobra", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("stc_iPrioridad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("stc_iOrganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["stc_iid_cuenta"] = this._stc_iid_cuenta;
dr["stc_inumero"] = this._stc_inumero;
dr["stc_ctipo_servicio"] = this._stc_ctipo_servicio;
dr["stc_mobservaciones"] = this._stc_mobservaciones;
dr["stc_dfecha_desde_1"] = this._stc_dfecha_desde_1;
dr["stc_dfecha_hasta_1"] = this._stc_dfecha_hasta_1;
dr["stc_dfecha_desde_2"] = this._stc_dfecha_desde_2;
dr["stc_dfecha_hasta_2"] = this._stc_dfecha_hasta_2;
dr["stc_dfecha_desde_3"] = this._stc_dfecha_desde_3;
dr["stc_dfecha_hasta_3"] = this._stc_dfecha_hasta_3;
dr["stc_dfecha_cierre"] = this._stc_dfecha_cierre;
dr["stc_ccontacto"] = this._stc_ccontacto;
dr["stc_nestado"] = this._stc_nestado;
dr["stc_ctecnico_1"] = this._stc_ctecnico_1;
dr["stc_ctecnico_2"] = this._stc_ctecnico_2;
dr["stc_ctecnico_3"] = this._stc_ctecnico_3;
dr["stc_ctecnico_4"] = this._stc_ctecnico_4;
dr["stc_ctecnico_5"] = this._stc_ctecnico_5;
dr["stc_yValor"] = this._stc_yValor;
dr["stc_nreclamo_1"] = this._stc_nreclamo_1;
dr["stc_creclamo_1"] = this._stc_creclamo_1;
dr["stc_nreclamo_2"] = this._stc_nreclamo_2;
dr["stc_creclamo_2"] = this._stc_creclamo_2;
dr["stc_nreclamo_3"] = this._stc_nreclamo_3;
dr["stc_creclamo_3"] = this._stc_creclamo_3;
dr["stc_nreclamo_4"] = this._stc_nreclamo_4;
dr["stc_creclamo_4"] = this._stc_creclamo_4;
dr["stc_nreclamo_5"] = this._stc_nreclamo_5;
dr["stc_creclamo_5"] = this._stc_creclamo_5;
dr["stc_cmovil_1"] = this._stc_cmovil_1;
dr["stc_cmovil_2"] = this._stc_cmovil_2;
dr["stc_dfecha_modificacion"] = this._stc_dfecha_modificacion;
dr["stc_ioperador"] = this._stc_ioperador;
dr["stc_minsumos"] = this._stc_minsumos;
dr["stc_dintecnico_1"] = this._stc_dintecnico_1;
dr["stc_doutecnico_1"] = this._stc_doutecnico_1;
dr["stc_dintecnico_2"] = this._stc_dintecnico_2;
dr["stc_doutecnico_2"] = this._stc_doutecnico_2;
dr["stc_dintecnico_3"] = this._stc_dintecnico_3;
dr["stc_doutecnico_3"] = this._stc_doutecnico_3;
dr["stc_cdeposito"] = this._stc_cdeposito;
dr["stf_dfecha_vto_orden"] = this._stf_dfecha_vto_orden;
dr["stc_dsalida_al_cliente_DSS"] = this._stc_dsalida_al_cliente_DSS;
dr["stc_darribo_al_cliente_DSS"] = this._stc_darribo_al_cliente_DSS;
dr["stc_dsalida_desde_cliente_DSS"] = this._stc_dsalida_desde_cliente_DSS;
dr["stc_iforma_viaje_DSS"] = this._stc_iforma_viaje_DSS;
dr["stc_cconformidad_html "] = this._stc_cconformidad_html ;
dr["stc_idorigenorden"] = this._stc_idorigenorden;
dr["stc_dfechapago"] = this._stc_dfechapago;
dr["stc_nvalorpagotecnico"] = this._stc_nvalorpagotecnico;
dr["stc_ncostomanodeobra"] = this._stc_ncostomanodeobra;
dr["stc_iPrioridad"] = this._stc_iPrioridad;
dr["stc_iOrganizacion"] = this._stc_iOrganizacion;
							 
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
