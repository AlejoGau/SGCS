
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
    ///Cuenta Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleCuenta : SimpleBaseObject
    { 
			 ///<summary>
     ///cue_clinea   
     ///</summary>
	 [DataMember]
     public string cue_clinea { get;set;} 
	  ///<summary>
     ///cue_ncuenta   
     ///</summary>
	 [DataMember]
     public string cue_ncuenta { get;set;} 
	  ///<summary>
     ///cue_cnombre   
     ///</summary>
	 [DataMember]
     public string cue_cnombre { get;set;} 
	  ///<summary>
     ///cue_ccalle   
     ///</summary>
	 [DataMember]
     public string cue_ccalle { get;set;} 
	  ///<summary>
     ///cue_clocalidad   
     ///</summary>
	 [DataMember]
     public string cue_clocalidad { get;set;} 
	  ///<summary>
     ///cue_cprovincia   
     ///</summary>
	 [DataMember]
     public string cue_cprovincia { get;set;} 
	  ///<summary>
     ///cue_ccodigopostal   
     ///</summary>
	 [DataMember]
     public string cue_ccodigopostal { get;set;} 
	  ///<summary>
     ///cue_ccallecorreo   
     ///</summary>
	 [DataMember]
     public string cue_ccallecorreo { get;set;} 
	  ///<summary>
     ///cue_clocalidadcorreo   
     ///</summary>
	 [DataMember]
     public string cue_clocalidadcorreo { get;set;} 
	  ///<summary>
     ///cue_cprovinciacorreo   
     ///</summary>
	 [DataMember]
     public string cue_cprovinciacorreo { get;set;} 
	  ///<summary>
     ///cue_ccodigopostalcorreo   
     ///</summary>
	 [DataMember]
     public string cue_ccodigopostalcorreo { get;set;} 
	  ///<summary>
     ///cue_ctelefono   
     ///</summary>
	 [DataMember]
     public string cue_ctelefono { get;set;} 
	  ///<summary>
     ///cue_cclave   
     ///</summary>
	 [DataMember]
     public string cue_cclave { get;set;} 
	  ///<summary>
     ///cue_cpermiso   
     ///</summary>
	 [DataMember]
     public string cue_cpermiso { get;set;} 
	  ///<summary>
     ///cue_ctipo   
     ///</summary>
	 [DataMember]
     public string cue_ctipo { get;set;} 
	  ///<summary>
     ///cue_cubicacion   
     ///</summary>
	 [DataMember]
     public string cue_cubicacion { get;set;} 
	  ///<summary>
     ///cue_nparticion   
     ///</summary>
	 [DataMember]
     public int cue_nparticion { get;set;} 
	  ///<summary>
     ///cue_cobservacion   
     ///</summary>
	 [DataMember]
     public string cue_cobservacion { get;set;} 
	  ///<summary>
     ///cue_cfoto   
     ///</summary>
	 [DataMember]
     public string cue_cfoto { get;set;} 
	  ///<summary>
     ///cue_dfechaalta   
     ///</summary>
	 [DataMember]
     public DateTime? cue_dfechaalta { get;set;} 
	  ///<summary>
     ///cue_dservicio   
     ///</summary>
	 [DataMember]
     public DateTime? cue_dservicio { get;set;} 
	  ///<summary>
     ///cue_nmostrar   
     ///</summary>
	 [DataMember]
     public Decimal cue_nmostrar { get;set;} 
	  ///<summary>
     ///cue_nsonidoul   
     ///</summary>
	 [DataMember]
     public Decimal cue_nsonidoul { get;set;} 
	  ///<summary>
     ///cue_nllaveul   
     ///</summary>
	 [DataMember]
     public Decimal cue_nllaveul { get;set;} 
	  ///<summary>
     ///cue_cemail   
     ///</summary>
	 [DataMember]
     public string cue_cemail { get;set;} 
	  ///<summary>
     ///cue_cinstalador   
     ///</summary>
	 [DataMember]
     public string cue_cinstalador { get;set;} 
	  ///<summary>
     ///cue_cIMEI   
     ///</summary>
	 [DataMember]
     public string cue_cIMEI { get;set;} 
	  ///<summary>
     ///cue_cLatLng   
     ///</summary>
	 [DataMember]
     public string cue_cLatLng { get;set;} 
	  ///<summary>
     ///Situacion   
     ///</summary>
	 [DataMember]
     public string Situacion { get;set;} 
	  ///<summary>
     ///cue_nEfectiva   
     ///</summary>
	 [DataMember]
     public Decimal cue_nEfectiva { get;set;} 
	  ///<summary>
     ///cue_cIdExtendido   
     ///</summary>
	 [DataMember]
     public string cue_cIdExtendido { get;set;} 
	  ///<summary>
     ///cue_iZonaHoraria   
     ///</summary>
	 [DataMember]
     public int cue_iZonaHoraria { get;set;} 
	  ///<summary>
     ///cue_cPartitionInfo   
     ///</summary>
	 [DataMember]
     public string cue_cPartitionInfo { get;set;} 
	  ///<summary>
     ///cue_nAutoMonitoreo   
     ///</summary>
	 [DataMember]
     public Decimal cue_nAutoMonitoreo { get;set;} 
	  ///<summary>
     ///cue_nPrioridad   
     ///</summary>
	 [DataMember]
     public Decimal cue_nPrioridad { get;set;} 
	  ///<summary>
     ///cue_cCustom   
     ///</summary>
	 [DataMember]
     public string cue_cCustom { get;set;} 
	 ///<summary>
        ///Cuenta Constructor
        ///</summary>
        public SimpleCuenta() : base()
  {
  InitClass();
  }
        ///<summary>
        ///Cuenta Constructor
        ///</summary>
        public SimpleCuenta(int Id, string Name, string cue_clinea, string cue_ncuenta, string cue_cnombre, string cue_ccalle, string cue_clocalidad, string cue_cprovincia, string cue_ccodigopostal, string cue_ccallecorreo, string cue_clocalidadcorreo, string cue_cprovinciacorreo, string cue_ccodigopostalcorreo, string cue_ctelefono, string cue_cclave, string cue_cpermiso, string cue_ctipo, string cue_cubicacion, int cue_nparticion, string cue_cobservacion, string cue_cfoto, DateTime? cue_dfechaalta, DateTime? cue_dservicio, Decimal cue_nmostrar, Decimal cue_nsonidoul, Decimal cue_nllaveul, string cue_cemail, string cue_cinstalador, string cue_cIMEI, string cue_cLatLng, string Situacion, Decimal cue_nEfectiva, string cue_cIdExtendido, int cue_iZonaHoraria, string cue_cPartitionInfo, Decimal cue_nAutoMonitoreo, Decimal cue_nPrioridad, string cue_cCustom) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cue_clinea = cue_clinea;
this.cue_ncuenta = cue_ncuenta;
this.cue_cnombre = cue_cnombre;
this.cue_ccalle = cue_ccalle;
this.cue_clocalidad = cue_clocalidad;
this.cue_cprovincia = cue_cprovincia;
this.cue_ccodigopostal = cue_ccodigopostal;
this.cue_ccallecorreo = cue_ccallecorreo;
this.cue_clocalidadcorreo = cue_clocalidadcorreo;
this.cue_cprovinciacorreo = cue_cprovinciacorreo;
this.cue_ccodigopostalcorreo = cue_ccodigopostalcorreo;
this.cue_ctelefono = cue_ctelefono;
this.cue_cclave = cue_cclave;
this.cue_cpermiso = cue_cpermiso;
this.cue_ctipo = cue_ctipo;
this.cue_cubicacion = cue_cubicacion;
this.cue_nparticion = cue_nparticion;
this.cue_cobservacion = cue_cobservacion;
this.cue_cfoto = cue_cfoto;
this.cue_dfechaalta = cue_dfechaalta;
this.cue_dservicio = cue_dservicio;
this.cue_nmostrar = cue_nmostrar;
this.cue_nsonidoul = cue_nsonidoul;
this.cue_nllaveul = cue_nllaveul;
this.cue_cemail = cue_cemail;
this.cue_cinstalador = cue_cinstalador;
this.cue_cIMEI = cue_cIMEI;
this.cue_cLatLng = cue_cLatLng;
this.Situacion = Situacion;
this.cue_nEfectiva = cue_nEfectiva;
this.cue_cIdExtendido = cue_cIdExtendido;
this.cue_iZonaHoraria = cue_iZonaHoraria;
this.cue_cPartitionInfo = cue_cPartitionInfo;
this.cue_nAutoMonitoreo = cue_nAutoMonitoreo;
this.cue_nPrioridad = cue_nPrioridad;
this.cue_cCustom = cue_cCustom;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3001, "Cuenta");
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
			BaseObject Object = new DalCuenta(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerCuenta Caller = new CallerCuenta();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cue_clinea = this.cue_clinea;
Caller.cue_ncuenta = this.cue_ncuenta;
Caller.cue_cnombre = this.cue_cnombre;
Caller.cue_ccalle = this.cue_ccalle;
Caller.cue_clocalidad = this.cue_clocalidad;
Caller.cue_cprovincia = this.cue_cprovincia;
Caller.cue_ccodigopostal = this.cue_ccodigopostal;
Caller.cue_ccallecorreo = this.cue_ccallecorreo;
Caller.cue_clocalidadcorreo = this.cue_clocalidadcorreo;
Caller.cue_cprovinciacorreo = this.cue_cprovinciacorreo;
Caller.cue_ccodigopostalcorreo = this.cue_ccodigopostalcorreo;
Caller.cue_ctelefono = this.cue_ctelefono;
Caller.cue_cclave = this.cue_cclave;
Caller.cue_cpermiso = this.cue_cpermiso;
Caller.cue_ctipo = this.cue_ctipo;
Caller.cue_cubicacion = this.cue_cubicacion;
Caller.cue_nparticion = this.cue_nparticion;
Caller.cue_cobservacion = this.cue_cobservacion;
Caller.cue_cfoto = this.cue_cfoto;
Caller.cue_dfechaalta = this.cue_dfechaalta;
Caller.cue_dservicio = this.cue_dservicio;
Caller.cue_nmostrar = this.cue_nmostrar;
Caller.cue_nsonidoul = this.cue_nsonidoul;
Caller.cue_nllaveul = this.cue_nllaveul;
Caller.cue_cemail = this.cue_cemail;
Caller.cue_cinstalador = this.cue_cinstalador;
Caller.cue_cIMEI = this.cue_cIMEI;
Caller.cue_cLatLng = this.cue_cLatLng;
Caller.Situacion = this.Situacion;
Caller.cue_nEfectiva = this.cue_nEfectiva;
Caller.cue_cIdExtendido = this.cue_cIdExtendido;
Caller.cue_iZonaHoraria = this.cue_iZonaHoraria;
Caller.cue_cPartitionInfo = this.cue_cPartitionInfo;
Caller.cue_nAutoMonitoreo = this.cue_nAutoMonitoreo;
Caller.cue_nPrioridad = this.cue_nPrioridad;
Caller.cue_cCustom = this.cue_cCustom;

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
dr["cue_clinea"] = (object)this.cue_clinea ?? System.DBNull.Value;
dr["cue_ncuenta"] = (object)this.cue_ncuenta ?? System.DBNull.Value;
dr["cue_cnombre"] = (object)this.cue_cnombre ?? System.DBNull.Value;
dr["cue_ccalle"] = (object)this.cue_ccalle ?? System.DBNull.Value;
dr["cue_clocalidad"] = (object)this.cue_clocalidad ?? System.DBNull.Value;
dr["cue_cprovincia"] = (object)this.cue_cprovincia ?? System.DBNull.Value;
dr["cue_ccodigopostal"] = (object)this.cue_ccodigopostal ?? System.DBNull.Value;
dr["cue_ccallecorreo"] = (object)this.cue_ccallecorreo ?? System.DBNull.Value;
dr["cue_clocalidadcorreo"] = (object)this.cue_clocalidadcorreo ?? System.DBNull.Value;
dr["cue_cprovinciacorreo"] = (object)this.cue_cprovinciacorreo ?? System.DBNull.Value;
dr["cue_ccodigopostalcorreo"] = (object)this.cue_ccodigopostalcorreo ?? System.DBNull.Value;
dr["cue_ctelefono"] = (object)this.cue_ctelefono ?? System.DBNull.Value;
dr["cue_cclave"] = (object)this.cue_cclave ?? System.DBNull.Value;
dr["cue_cpermiso"] = (object)this.cue_cpermiso ?? System.DBNull.Value;
dr["cue_ctipo"] = (object)this.cue_ctipo ?? System.DBNull.Value;
dr["cue_cubicacion"] = (object)this.cue_cubicacion ?? System.DBNull.Value;
dr["cue_nparticion"] = (object)this.cue_nparticion ?? System.DBNull.Value;
dr["cue_cobservacion"] = (object)this.cue_cobservacion ?? System.DBNull.Value;
dr["cue_cfoto"] = (object)this.cue_cfoto ?? System.DBNull.Value;
dr["cue_dfechaalta"] = (object)this.cue_dfechaalta ?? System.DBNull.Value;
dr["cue_dservicio"] = (object)this.cue_dservicio ?? System.DBNull.Value;
dr["cue_nmostrar"] = (object)this.cue_nmostrar ?? System.DBNull.Value;
dr["cue_nsonidoul"] = (object)this.cue_nsonidoul ?? System.DBNull.Value;
dr["cue_nllaveul"] = (object)this.cue_nllaveul ?? System.DBNull.Value;
dr["cue_cemail"] = (object)this.cue_cemail ?? System.DBNull.Value;
dr["cue_cinstalador"] = (object)this.cue_cinstalador ?? System.DBNull.Value;
dr["cue_cIMEI"] = (object)this.cue_cIMEI ?? System.DBNull.Value;
dr["cue_cLatLng"] = (object)this.cue_cLatLng ?? System.DBNull.Value;
dr["Situacion"] = (object)this.Situacion ?? System.DBNull.Value;
dr["cue_nEfectiva"] = (object)this.cue_nEfectiva ?? System.DBNull.Value;
dr["cue_cIdExtendido"] = (object)this.cue_cIdExtendido ?? System.DBNull.Value;
dr["cue_iZonaHoraria"] = (object)this.cue_iZonaHoraria ?? System.DBNull.Value;
dr["cue_cPartitionInfo"] = (object)this.cue_cPartitionInfo ?? System.DBNull.Value;
dr["cue_nAutoMonitoreo"] = (object)this.cue_nAutoMonitoreo ?? System.DBNull.Value;
dr["cue_nPrioridad"] = (object)this.cue_nPrioridad ?? System.DBNull.Value;
dr["cue_cCustom"] = (object)this.cue_cCustom ?? System.DBNull.Value;
							 
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

		public IEnumerable<dynamic> Falsas(){
			var v = Slbf.ObjectFactoryService.CreateByName("Falsa");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasFalsas()
        {
            foreach (var h in Falsas())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Horarios(){
			var v = Slbf.ObjectFactoryService.CreateByName("Horario");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasHorarios()
        {
            foreach (var h in Horarios())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> HorarioAlternativos(){
			var v = Slbf.ObjectFactoryService.CreateByName("HorarioAlternativo");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasHorarioAlternativos()
        {
            foreach (var h in HorarioAlternativos())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> HorarioExcepcions(){
			var v = Slbf.ObjectFactoryService.CreateByName("HorarioExcepcion");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasHorarioExcepcions()
        {
            foreach (var h in HorarioExcepcions())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> HorarioTolerancias(){
			var v = Slbf.ObjectFactoryService.CreateByName("HorarioTolerancia");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasHorarioTolerancias()
        {
            foreach (var h in HorarioTolerancias())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Notas(){
			var v = Slbf.ObjectFactoryService.CreateByName("Nota");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasNotas()
        {
            foreach (var h in Notas())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Panels(){
			var v = Slbf.ObjectFactoryService.CreateByName("Panel");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasPanels()
        {
            foreach (var h in Panels())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Telefonos(){
			var v = Slbf.ObjectFactoryService.CreateByName("Telefono");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasTelefonos()
        {
            foreach (var h in Telefonos())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Usuarios(){
			var v = Slbf.ObjectFactoryService.CreateByName("Usuario");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasUsuarios()
        {
            foreach (var h in Usuarios())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Zonas(){
			var v = Slbf.ObjectFactoryService.CreateByName("Zona");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasZonas()
        {
            foreach (var h in Zonas())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> ZonaTemps(){
			var v = Slbf.ObjectFactoryService.CreateByName("ZonaTemp");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasZonaTemps()
        {
            foreach (var h in ZonaTemps())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> MedicalInfos(){
			var v = Slbf.ObjectFactoryService.CreateByName("MedicalInfo");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasMedicalInfos()
        {
            foreach (var h in MedicalInfos())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Smss(){
			var v = Slbf.ObjectFactoryService.CreateByName("Sms");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasSmss()
        {
            foreach (var h in Smss())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Tests(){
			var v = Slbf.ObjectFactoryService.CreateByName("Test");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasTests()
        {
            foreach (var h in Tests())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Reportes(){
			var v = Slbf.ObjectFactoryService.CreateByName("Reporte");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasReportes()
        {
            foreach (var h in Reportes())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> Estados(){
			var v = Slbf.ObjectFactoryService.CreateByName("Estado");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasEstados()
        {
            foreach (var h in Estados())
                return true;
            return false;
        }
	
		public IEnumerable<dynamic> EstadoItems(){
			var v = Slbf.ObjectFactoryService.CreateByName("EstadoItem");
            var t = v.GetType();
            var objectOut = t.InvokeMember("GetByParent", 
                System.Reflection.BindingFlags.InvokeMethod, 
                null, v, new[] { (object)"Cuenta", this.Id });

            return (IEnumerable<dynamic>)objectOut;
		}
		
		public bool HasEstadoItems()
        {
            foreach (var h in EstadoItems())
                return true;
            return false;
        }
	 
			}

}
