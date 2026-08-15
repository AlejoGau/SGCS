
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
    public class CallerCuenta : CallerObject
    { 	
				     private string _cue_clinea;
					
				     private string _cue_ncuenta;
					
				     private string _cue_cnombre;
					
				     private string _cue_ccalle;
					
				     private string _cue_clocalidad;
					
				     private string _cue_cprovincia;
					
				     private string _cue_ccodigopostal;
					
				     private string _cue_ccallecorreo;
					
				     private string _cue_clocalidadcorreo;
					
				     private string _cue_cprovinciacorreo;
					
				     private string _cue_ccodigopostalcorreo;
					
				     private string _cue_ctelefono;
					
				     private string _cue_cclave;
					
				     private string _cue_cpermiso;
					
				     private string _cue_ctipo;
					
				     private string _cue_cubicacion;
					
				     private int _cue_nparticion;
					
				     private string _cue_cobservacion;
					
				     private string _cue_cfoto;
					
				     private DateTime? _cue_dfechaalta;
					
				     private DateTime? _cue_dservicio;
					
				     private Decimal _cue_nmostrar;
					
				     private Decimal _cue_nsonidoul;
					
				     private Decimal _cue_nllaveul;
					
				     private string _cue_cemail;
					
				     private string _cue_cinstalador;
					
				     private string _cue_cIMEI;
					
				     private string _cue_cLatLng;
					
				     private string _Situacion;
					
				     private Decimal _cue_nEfectiva;
					
				     private string _cue_cIdExtendido;
					
				     private int _cue_iZonaHoraria;
					
				     private string _cue_cPartitionInfo;
					
				     private Decimal _cue_nAutoMonitoreo;
					
				     private Decimal _cue_nPrioridad;
					
				     private string _cue_cCustom;
				 ///<summary>
     ///cue_clinea property   
     ///</summary>   
     public string cue_clinea 
		 { 
		        
                    get{ return this._cue_clinea; }
        						set{ this._cue_clinea = value; } 										
	   }
	  ///<summary>
     ///cue_ncuenta property   
     ///</summary>   
     public string cue_ncuenta 
		 { 
		        
                    get{ return this._cue_ncuenta; }
        						set{ this._cue_ncuenta = value; } 										
	   }
	  ///<summary>
     ///cue_cnombre property   
     ///</summary>   
     public string cue_cnombre 
		 { 
		        
                    get{ return this._cue_cnombre; }
        						set{ this._cue_cnombre = value; } 										
	   }
	  ///<summary>
     ///cue_ccalle property   
     ///</summary>   
     public string cue_ccalle 
		 { 
		        
                    get{ return this._cue_ccalle; }
        						set{ this._cue_ccalle = value; } 										
	   }
	  ///<summary>
     ///cue_clocalidad property   
     ///</summary>   
     public string cue_clocalidad 
		 { 
		        
                    get{ return this._cue_clocalidad; }
        						set{ this._cue_clocalidad = value; } 										
	   }
	  ///<summary>
     ///cue_cprovincia property   
     ///</summary>   
     public string cue_cprovincia 
		 { 
		        
                    get{ return this._cue_cprovincia; }
        						set{ this._cue_cprovincia = value; } 										
	   }
	  ///<summary>
     ///cue_ccodigopostal property   
     ///</summary>   
     public string cue_ccodigopostal 
		 { 
		        
                    get{ return this._cue_ccodigopostal; }
        						set{ this._cue_ccodigopostal = value; } 										
	   }
	  ///<summary>
     ///cue_ccallecorreo property   
     ///</summary>   
     public string cue_ccallecorreo 
		 { 
		        
                    get{ return this._cue_ccallecorreo; }
        						set{ this._cue_ccallecorreo = value; } 										
	   }
	  ///<summary>
     ///cue_clocalidadcorreo property   
     ///</summary>   
     public string cue_clocalidadcorreo 
		 { 
		        
                    get{ return this._cue_clocalidadcorreo; }
        						set{ this._cue_clocalidadcorreo = value; } 										
	   }
	  ///<summary>
     ///cue_cprovinciacorreo property   
     ///</summary>   
     public string cue_cprovinciacorreo 
		 { 
		        
                    get{ return this._cue_cprovinciacorreo; }
        						set{ this._cue_cprovinciacorreo = value; } 										
	   }
	  ///<summary>
     ///cue_ccodigopostalcorreo property   
     ///</summary>   
     public string cue_ccodigopostalcorreo 
		 { 
		        
                    get{ return this._cue_ccodigopostalcorreo; }
        						set{ this._cue_ccodigopostalcorreo = value; } 										
	   }
	  ///<summary>
     ///cue_ctelefono property   
     ///</summary>   
     public string cue_ctelefono 
		 { 
		        
                    get{ return this._cue_ctelefono; }
        						set{ this._cue_ctelefono = value; } 										
	   }
	  ///<summary>
     ///cue_cclave property   
     ///</summary>   
     public string cue_cclave 
		 { 
		        
                    get{ return this._cue_cclave; }
        						set{ this._cue_cclave = value; } 										
	   }
	  ///<summary>
     ///cue_cpermiso property   
     ///</summary>   
     public string cue_cpermiso 
		 { 
		        
                    get{ return this._cue_cpermiso; }
        						set{ this._cue_cpermiso = value; } 										
	   }
	  ///<summary>
     ///cue_ctipo property   
     ///</summary>   
     public string cue_ctipo 
		 { 
		        
                    get{ return this._cue_ctipo; }
        						set{ this._cue_ctipo = value; } 										
	   }
	  ///<summary>
     ///cue_cubicacion property   
     ///</summary>   
     public string cue_cubicacion 
		 { 
		        
                    get{ return this._cue_cubicacion; }
        						set{ this._cue_cubicacion = value; } 										
	   }
	  ///<summary>
     ///cue_nparticion property   
     ///</summary>   
     public int cue_nparticion 
		 { 
		        
                    get{ return this._cue_nparticion; }
        						set{ this._cue_nparticion = value; } 										
	   }
	  ///<summary>
     ///cue_cobservacion property   
     ///</summary>   
     public string cue_cobservacion 
		 { 
		        
                    get{ return this._cue_cobservacion; }
        						set{ this._cue_cobservacion = value; } 										
	   }
	  ///<summary>
     ///cue_cfoto property   
     ///</summary>   
     public string cue_cfoto 
		 { 
		        
                    get{ return this._cue_cfoto; }
        						set{ this._cue_cfoto = value; } 										
	   }
	  ///<summary>
     ///cue_dfechaalta property   
     ///</summary>   
     public DateTime? cue_dfechaalta 
		 { 
		        
                    get{ return this._cue_dfechaalta; }
        						set{ this._cue_dfechaalta = value; } 										
	   }
	  ///<summary>
     ///cue_dservicio property   
     ///</summary>   
     public DateTime? cue_dservicio 
		 { 
		        
                    get{ return this._cue_dservicio; }
        						set{ this._cue_dservicio = value; } 										
	   }
	  ///<summary>
     ///cue_nmostrar property   
     ///</summary>   
     public Decimal cue_nmostrar 
		 { 
		        
                    get{ return this._cue_nmostrar; }
        						set{ this._cue_nmostrar = value; } 										
	   }
	  ///<summary>
     ///cue_nsonidoul property   
     ///</summary>   
     public Decimal cue_nsonidoul 
		 { 
		        
                    get{ return this._cue_nsonidoul; }
        						set{ this._cue_nsonidoul = value; } 										
	   }
	  ///<summary>
     ///cue_nllaveul property   
     ///</summary>   
     public Decimal cue_nllaveul 
		 { 
		        
                    get{ return this._cue_nllaveul; }
        						set{ this._cue_nllaveul = value; } 										
	   }
	  ///<summary>
     ///cue_cemail property   
     ///</summary>   
     public string cue_cemail 
		 { 
		        
                    get{ return this._cue_cemail; }
        						set{ this._cue_cemail = value; } 										
	   }
	  ///<summary>
     ///cue_cinstalador property   
     ///</summary>   
     public string cue_cinstalador 
		 { 
		        
                    get{ return this._cue_cinstalador; }
        						set{ this._cue_cinstalador = value; } 										
	   }
	  ///<summary>
     ///cue_cIMEI property   
     ///</summary>   
     public string cue_cIMEI 
		 { 
		        
                    get{ return this._cue_cIMEI; }
        						set{ this._cue_cIMEI = value; } 										
	   }
	  ///<summary>
     ///cue_cLatLng property   
     ///</summary>   
     public string cue_cLatLng 
		 { 
		        
                    get{ return this._cue_cLatLng; }
        						set{ this._cue_cLatLng = value; } 										
	   }
	  ///<summary>
     ///Situacion property   
     ///</summary>   
     public string Situacion 
		 { 
		        
                    get{ return this._Situacion; }
        						set{ this._Situacion = value; } 										
	   }
	  ///<summary>
     ///cue_nEfectiva property   
     ///</summary>   
     public Decimal cue_nEfectiva 
		 { 
		        
                    get{ return this._cue_nEfectiva; }
        						set{ this._cue_nEfectiva = value; } 										
	   }
	  ///<summary>
     ///cue_cIdExtendido property   
     ///</summary>   
     public string cue_cIdExtendido 
		 { 
		        
                    get{ return this._cue_cIdExtendido; }
        						set{ this._cue_cIdExtendido = value; } 										
	   }
	  ///<summary>
     ///cue_iZonaHoraria property   
     ///</summary>   
     public int cue_iZonaHoraria 
		 { 
		        
                    get{ return this._cue_iZonaHoraria; }
        						set{ this._cue_iZonaHoraria = value; } 										
	   }
	  ///<summary>
     ///cue_cPartitionInfo property   
     ///</summary>   
     public string cue_cPartitionInfo 
		 { 
		        
                    get{ return this._cue_cPartitionInfo; }
        						set{ this._cue_cPartitionInfo = value; } 										
	   }
	  ///<summary>
     ///cue_nAutoMonitoreo property   
     ///</summary>   
     public Decimal cue_nAutoMonitoreo 
		 { 
		        
                    get{ return this._cue_nAutoMonitoreo; }
        						set{ this._cue_nAutoMonitoreo = value; } 										
	   }
	  ///<summary>
     ///cue_nPrioridad property   
     ///</summary>   
     public Decimal cue_nPrioridad 
		 { 
		        
                    get{ return this._cue_nPrioridad; }
        						set{ this._cue_nPrioridad = value; } 										
	   }
	  ///<summary>
     ///cue_cCustom property   
     ///</summary>   
     public string cue_cCustom 
		 { 
		        
                    get{ return this._cue_cCustom; }
        						set{ this._cue_cCustom = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerCuenta() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerCuenta(int Id, string Name, string cue_clinea, string cue_ncuenta, string cue_cnombre, string cue_ccalle, string cue_clocalidad, string cue_cprovincia, string cue_ccodigopostal, string cue_ccallecorreo, string cue_clocalidadcorreo, string cue_cprovinciacorreo, string cue_ccodigopostalcorreo, string cue_ctelefono, string cue_cclave, string cue_cpermiso, string cue_ctipo, string cue_cubicacion, int cue_nparticion, string cue_cobservacion, string cue_cfoto, DateTime? cue_dfechaalta, DateTime? cue_dservicio, Decimal cue_nmostrar, Decimal cue_nsonidoul, Decimal cue_nllaveul, string cue_cemail, string cue_cinstalador, string cue_cIMEI, string cue_cLatLng, string Situacion, Decimal cue_nEfectiva, string cue_cIdExtendido, int cue_iZonaHoraria, string cue_cPartitionInfo, Decimal cue_nAutoMonitoreo, Decimal cue_nPrioridad, string cue_cCustom) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cue_clinea = cue_clinea;
this._cue_ncuenta = cue_ncuenta;
this._cue_cnombre = cue_cnombre;
this._cue_ccalle = cue_ccalle;
this._cue_clocalidad = cue_clocalidad;
this._cue_cprovincia = cue_cprovincia;
this._cue_ccodigopostal = cue_ccodigopostal;
this._cue_ccallecorreo = cue_ccallecorreo;
this._cue_clocalidadcorreo = cue_clocalidadcorreo;
this._cue_cprovinciacorreo = cue_cprovinciacorreo;
this._cue_ccodigopostalcorreo = cue_ccodigopostalcorreo;
this._cue_ctelefono = cue_ctelefono;
this._cue_cclave = cue_cclave;
this._cue_cpermiso = cue_cpermiso;
this._cue_ctipo = cue_ctipo;
this._cue_cubicacion = cue_cubicacion;
this._cue_nparticion = cue_nparticion;
this._cue_cobservacion = cue_cobservacion;
this._cue_cfoto = cue_cfoto;
this._cue_dfechaalta = cue_dfechaalta;
this._cue_dservicio = cue_dservicio;
this._cue_nmostrar = cue_nmostrar;
this._cue_nsonidoul = cue_nsonidoul;
this._cue_nllaveul = cue_nllaveul;
this._cue_cemail = cue_cemail;
this._cue_cinstalador = cue_cinstalador;
this._cue_cIMEI = cue_cIMEI;
this._cue_cLatLng = cue_cLatLng;
this._Situacion = Situacion;
this._cue_nEfectiva = cue_nEfectiva;
this._cue_cIdExtendido = cue_cIdExtendido;
this._cue_iZonaHoraria = cue_iZonaHoraria;
this._cue_cPartitionInfo = cue_cPartitionInfo;
this._cue_nAutoMonitoreo = cue_nAutoMonitoreo;
this._cue_nPrioridad = cue_nPrioridad;
this._cue_cCustom = cue_cCustom;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3001, "Cuenta");
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
			SimpleCuenta Simple = new SimpleCuenta();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cue_clinea = this._cue_clinea;
Simple.cue_ncuenta = this._cue_ncuenta;
Simple.cue_cnombre = this._cue_cnombre;
Simple.cue_ccalle = this._cue_ccalle;
Simple.cue_clocalidad = this._cue_clocalidad;
Simple.cue_cprovincia = this._cue_cprovincia;
Simple.cue_ccodigopostal = this._cue_ccodigopostal;
Simple.cue_ccallecorreo = this._cue_ccallecorreo;
Simple.cue_clocalidadcorreo = this._cue_clocalidadcorreo;
Simple.cue_cprovinciacorreo = this._cue_cprovinciacorreo;
Simple.cue_ccodigopostalcorreo = this._cue_ccodigopostalcorreo;
Simple.cue_ctelefono = this._cue_ctelefono;
Simple.cue_cclave = this._cue_cclave;
Simple.cue_cpermiso = this._cue_cpermiso;
Simple.cue_ctipo = this._cue_ctipo;
Simple.cue_cubicacion = this._cue_cubicacion;
Simple.cue_nparticion = this._cue_nparticion;
Simple.cue_cobservacion = this._cue_cobservacion;
Simple.cue_cfoto = this._cue_cfoto;
Simple.cue_dfechaalta = this._cue_dfechaalta;
Simple.cue_dservicio = this._cue_dservicio;
Simple.cue_nmostrar = this._cue_nmostrar;
Simple.cue_nsonidoul = this._cue_nsonidoul;
Simple.cue_nllaveul = this._cue_nllaveul;
Simple.cue_cemail = this._cue_cemail;
Simple.cue_cinstalador = this._cue_cinstalador;
Simple.cue_cIMEI = this._cue_cIMEI;
Simple.cue_cLatLng = this._cue_cLatLng;
Simple.Situacion = this._Situacion;
Simple.cue_nEfectiva = this._cue_nEfectiva;
Simple.cue_cIdExtendido = this._cue_cIdExtendido;
Simple.cue_iZonaHoraria = this._cue_iZonaHoraria;
Simple.cue_cPartitionInfo = this._cue_cPartitionInfo;
Simple.cue_nAutoMonitoreo = this._cue_nAutoMonitoreo;
Simple.cue_nPrioridad = this._cue_nPrioridad;
Simple.cue_cCustom = this._cue_cCustom;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleCuenta Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cue_clinea = Simple.cue_clinea;
this._cue_ncuenta = Simple.cue_ncuenta;
this._cue_cnombre = Simple.cue_cnombre;
this._cue_ccalle = Simple.cue_ccalle;
this._cue_clocalidad = Simple.cue_clocalidad;
this._cue_cprovincia = Simple.cue_cprovincia;
this._cue_ccodigopostal = Simple.cue_ccodigopostal;
this._cue_ccallecorreo = Simple.cue_ccallecorreo;
this._cue_clocalidadcorreo = Simple.cue_clocalidadcorreo;
this._cue_cprovinciacorreo = Simple.cue_cprovinciacorreo;
this._cue_ccodigopostalcorreo = Simple.cue_ccodigopostalcorreo;
this._cue_ctelefono = Simple.cue_ctelefono;
this._cue_cclave = Simple.cue_cclave;
this._cue_cpermiso = Simple.cue_cpermiso;
this._cue_ctipo = Simple.cue_ctipo;
this._cue_cubicacion = Simple.cue_cubicacion;
this._cue_nparticion = Simple.cue_nparticion;
this._cue_cobservacion = Simple.cue_cobservacion;
this._cue_cfoto = Simple.cue_cfoto;
this._cue_dfechaalta = Simple.cue_dfechaalta;
this._cue_dservicio = Simple.cue_dservicio;
this._cue_nmostrar = Simple.cue_nmostrar;
this._cue_nsonidoul = Simple.cue_nsonidoul;
this._cue_nllaveul = Simple.cue_nllaveul;
this._cue_cemail = Simple.cue_cemail;
this._cue_cinstalador = Simple.cue_cinstalador;
this._cue_cIMEI = Simple.cue_cIMEI;
this._cue_cLatLng = Simple.cue_cLatLng;
this._Situacion = Simple.Situacion;
this._cue_nEfectiva = Simple.cue_nEfectiva;
this._cue_cIdExtendido = Simple.cue_cIdExtendido;
this._cue_iZonaHoraria = Simple.cue_iZonaHoraria;
this._cue_cPartitionInfo = Simple.cue_cPartitionInfo;
this._cue_nAutoMonitoreo = Simple.cue_nAutoMonitoreo;
this._cue_nPrioridad = Simple.cue_nPrioridad;
this._cue_cCustom = Simple.cue_cCustom;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalCuenta(SqlConfig, UserId, (SimpleCuenta) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cue_clinea", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ncuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ccalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_clocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cprovincia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ccodigopostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ccallecorreo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_clocalidadcorreo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cprovinciacorreo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ccodigopostalcorreo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cpermiso", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cubicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_nparticion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cfoto", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_dfechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cue_dservicio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cue_nmostrar", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cue_nsonidoul", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cue_nllaveul", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cue_cemail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cinstalador", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cIMEI", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_cLatLng", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Situacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_nEfectiva", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cue_cIdExtendido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_iZonaHoraria", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cue_cPartitionInfo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cue_nAutoMonitoreo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cue_nPrioridad", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cue_cCustom", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cue_clinea"] = this._cue_clinea;
dr["cue_ncuenta"] = this._cue_ncuenta;
dr["cue_cnombre"] = this._cue_cnombre;
dr["cue_ccalle"] = this._cue_ccalle;
dr["cue_clocalidad"] = this._cue_clocalidad;
dr["cue_cprovincia"] = this._cue_cprovincia;
dr["cue_ccodigopostal"] = this._cue_ccodigopostal;
dr["cue_ccallecorreo"] = this._cue_ccallecorreo;
dr["cue_clocalidadcorreo"] = this._cue_clocalidadcorreo;
dr["cue_cprovinciacorreo"] = this._cue_cprovinciacorreo;
dr["cue_ccodigopostalcorreo"] = this._cue_ccodigopostalcorreo;
dr["cue_ctelefono"] = this._cue_ctelefono;
dr["cue_cclave"] = this._cue_cclave;
dr["cue_cpermiso"] = this._cue_cpermiso;
dr["cue_ctipo"] = this._cue_ctipo;
dr["cue_cubicacion"] = this._cue_cubicacion;
dr["cue_nparticion"] = this._cue_nparticion;
dr["cue_cobservacion"] = this._cue_cobservacion;
dr["cue_cfoto"] = this._cue_cfoto;
dr["cue_dfechaalta"] = this._cue_dfechaalta;
dr["cue_dservicio"] = this._cue_dservicio;
dr["cue_nmostrar"] = this._cue_nmostrar;
dr["cue_nsonidoul"] = this._cue_nsonidoul;
dr["cue_nllaveul"] = this._cue_nllaveul;
dr["cue_cemail"] = this._cue_cemail;
dr["cue_cinstalador"] = this._cue_cinstalador;
dr["cue_cIMEI"] = this._cue_cIMEI;
dr["cue_cLatLng"] = this._cue_cLatLng;
dr["Situacion"] = this._Situacion;
dr["cue_nEfectiva"] = this._cue_nEfectiva;
dr["cue_cIdExtendido"] = this._cue_cIdExtendido;
dr["cue_iZonaHoraria"] = this._cue_iZonaHoraria;
dr["cue_cPartitionInfo"] = this._cue_cPartitionInfo;
dr["cue_nAutoMonitoreo"] = this._cue_nAutoMonitoreo;
dr["cue_nPrioridad"] = this._cue_nPrioridad;
dr["cue_cCustom"] = this._cue_cCustom;
							 
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
