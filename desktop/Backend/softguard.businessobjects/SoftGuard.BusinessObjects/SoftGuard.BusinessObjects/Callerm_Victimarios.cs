
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
    public class Callerm_Victimarios : CallerObject
    { 	
				     private string _vic_cApellido;
					
				     private string _vic_cNombre;
					
				     private string _vic_cIdentificacion;
					
				     private int _vic_iRestriccion;
					
				     private string _vic_cCalle;
					
				     private string _vic_cCalleNro;
					
				     private string _vic_cCallePiso;
					
				     private string _vic_cCalleDpto;
					
				     private string _vic_cCodigoPostal;
					
				     private string _vic_cPartido;
					
				     private string _vic_cLocalidad;
					
				     private string _vic_cUbicacion;
					
				     private string _vic_cPathPicture;
					
				     private int _vic_iStatus;
					
				     private DateTime? _vic_tFechaAlta;
					
				     private int _vic_iEdad;
					
				     private int _vic_iAltura;
					
				     private int _vic_iAspectoRaza;
					
				     private int _vic_iAspectoTez;
					
				     private int _vic_iAspectoContextura;
					
				     private int _vic_iCabelloTipo;
					
				     private int _vic_iCabelloColor;
					
				     private int _vic_iCabelloEstilo;
					
				     private int _vic_iRostroForma;
					
				     private int _vic_iOjosForma;
					
				     private int _vic_iOjosColor;
					
				     private int _vic_iNarizFrente;
					
				     private int _vic_iNarizPerfil;
					
				     private int _vic_iNarizSize;
					
				     private int _vic_iBocaLabios;
					
				     private int _vic_iBocaSize;
					
				     private int _vic_iMentonForma;
					
				     private int _vic_iOrejasForma;
					
				     private int _vic_iOrejasSize;
					
				     private int _vic_iCejasForma;
					
				     private int _vic_iCejasSize;
					
				     private int _vic_iPilosidadTipo;
					
				     private int _vic_iPilosidadForma;
					
				     private string _vic_cObservaciones;
					
				     private string _vic_cCaractSocial;
					
				     private string _vic_cAdicciones;
					
				     private int _vic_iPeso;
				 ///<summary>
     ///vic_cApellido property   
     ///</summary>   
     public string vic_cApellido 
		 { 
		        
                    get{ return this._vic_cApellido; }
        						set{ this._vic_cApellido = value; } 										
	   }
	  ///<summary>
     ///vic_cNombre property   
     ///</summary>   
     public string vic_cNombre 
		 { 
		        
                    get{ return this._vic_cNombre; }
        						set{ this._vic_cNombre = value; } 										
	   }
	  ///<summary>
     ///vic_cIdentificacion property   
     ///</summary>   
     public string vic_cIdentificacion 
		 { 
		        
                    get{ return this._vic_cIdentificacion; }
        						set{ this._vic_cIdentificacion = value; } 										
	   }
	  ///<summary>
     ///vic_iRestriccion property   
     ///</summary>   
     public int vic_iRestriccion 
		 { 
		        
                    get{ return this._vic_iRestriccion; }
        						set{ this._vic_iRestriccion = value; } 										
	   }
	  ///<summary>
     ///vic_cCalle property   
     ///</summary>   
     public string vic_cCalle 
		 { 
		        
                    get{ return this._vic_cCalle; }
        						set{ this._vic_cCalle = value; } 										
	   }
	  ///<summary>
     ///vic_cCalleNro property   
     ///</summary>   
     public string vic_cCalleNro 
		 { 
		        
                    get{ return this._vic_cCalleNro; }
        						set{ this._vic_cCalleNro = value; } 										
	   }
	  ///<summary>
     ///vic_cCallePiso property   
     ///</summary>   
     public string vic_cCallePiso 
		 { 
		        
                    get{ return this._vic_cCallePiso; }
        						set{ this._vic_cCallePiso = value; } 										
	   }
	  ///<summary>
     ///vic_cCalleDpto property   
     ///</summary>   
     public string vic_cCalleDpto 
		 { 
		        
                    get{ return this._vic_cCalleDpto; }
        						set{ this._vic_cCalleDpto = value; } 										
	   }
	  ///<summary>
     ///vic_cCodigoPostal property   
     ///</summary>   
     public string vic_cCodigoPostal 
		 { 
		        
                    get{ return this._vic_cCodigoPostal; }
        						set{ this._vic_cCodigoPostal = value; } 										
	   }
	  ///<summary>
     ///vic_cPartido property   
     ///</summary>   
     public string vic_cPartido 
		 { 
		        
                    get{ return this._vic_cPartido; }
        						set{ this._vic_cPartido = value; } 										
	   }
	  ///<summary>
     ///vic_cLocalidad property   
     ///</summary>   
     public string vic_cLocalidad 
		 { 
		        
                    get{ return this._vic_cLocalidad; }
        						set{ this._vic_cLocalidad = value; } 										
	   }
	  ///<summary>
     ///vic_cUbicacion property   
     ///</summary>   
     public string vic_cUbicacion 
		 { 
		        
                    get{ return this._vic_cUbicacion; }
        						set{ this._vic_cUbicacion = value; } 										
	   }
	  ///<summary>
     ///vic_cPathPicture property   
     ///</summary>   
     public string vic_cPathPicture 
		 { 
		        
                    get{ return this._vic_cPathPicture; }
        						set{ this._vic_cPathPicture = value; } 										
	   }
	  ///<summary>
     ///vic_iStatus property   
     ///</summary>   
     public int vic_iStatus 
		 { 
		        
                    get{ return this._vic_iStatus; }
        						set{ this._vic_iStatus = value; } 										
	   }
	  ///<summary>
     ///vic_tFechaAlta property   
     ///</summary>   
     public DateTime? vic_tFechaAlta 
		 { 
		        
                    get{ return this._vic_tFechaAlta; }
        						set{ this._vic_tFechaAlta = value; } 										
	   }
	  ///<summary>
     ///vic_iEdad property   
     ///</summary>   
     public int vic_iEdad 
		 { 
		        
                    get{ return this._vic_iEdad; }
        						set{ this._vic_iEdad = value; } 										
	   }
	  ///<summary>
     ///vic_iAltura property   
     ///</summary>   
     public int vic_iAltura 
		 { 
		        
                    get{ return this._vic_iAltura; }
        						set{ this._vic_iAltura = value; } 										
	   }
	  ///<summary>
     ///vic_iAspectoRaza property   
     ///</summary>   
     public int vic_iAspectoRaza 
		 { 
		        
                    get{ return this._vic_iAspectoRaza; }
        						set{ this._vic_iAspectoRaza = value; } 										
	   }
	  ///<summary>
     ///vic_iAspectoTez property   
     ///</summary>   
     public int vic_iAspectoTez 
		 { 
		        
                    get{ return this._vic_iAspectoTez; }
        						set{ this._vic_iAspectoTez = value; } 										
	   }
	  ///<summary>
     ///vic_iAspectoContextura property   
     ///</summary>   
     public int vic_iAspectoContextura 
		 { 
		        
                    get{ return this._vic_iAspectoContextura; }
        						set{ this._vic_iAspectoContextura = value; } 										
	   }
	  ///<summary>
     ///vic_iCabelloTipo property   
     ///</summary>   
     public int vic_iCabelloTipo 
		 { 
		        
                    get{ return this._vic_iCabelloTipo; }
        						set{ this._vic_iCabelloTipo = value; } 										
	   }
	  ///<summary>
     ///vic_iCabelloColor property   
     ///</summary>   
     public int vic_iCabelloColor 
		 { 
		        
                    get{ return this._vic_iCabelloColor; }
        						set{ this._vic_iCabelloColor = value; } 										
	   }
	  ///<summary>
     ///vic_iCabelloEstilo property   
     ///</summary>   
     public int vic_iCabelloEstilo 
		 { 
		        
                    get{ return this._vic_iCabelloEstilo; }
        						set{ this._vic_iCabelloEstilo = value; } 										
	   }
	  ///<summary>
     ///vic_iRostroForma property   
     ///</summary>   
     public int vic_iRostroForma 
		 { 
		        
                    get{ return this._vic_iRostroForma; }
        						set{ this._vic_iRostroForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOjosForma property   
     ///</summary>   
     public int vic_iOjosForma 
		 { 
		        
                    get{ return this._vic_iOjosForma; }
        						set{ this._vic_iOjosForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOjosColor property   
     ///</summary>   
     public int vic_iOjosColor 
		 { 
		        
                    get{ return this._vic_iOjosColor; }
        						set{ this._vic_iOjosColor = value; } 										
	   }
	  ///<summary>
     ///vic_iNarizFrente property   
     ///</summary>   
     public int vic_iNarizFrente 
		 { 
		        
                    get{ return this._vic_iNarizFrente; }
        						set{ this._vic_iNarizFrente = value; } 										
	   }
	  ///<summary>
     ///vic_iNarizPerfil property   
     ///</summary>   
     public int vic_iNarizPerfil 
		 { 
		        
                    get{ return this._vic_iNarizPerfil; }
        						set{ this._vic_iNarizPerfil = value; } 										
	   }
	  ///<summary>
     ///vic_iNarizSize property   
     ///</summary>   
     public int vic_iNarizSize 
		 { 
		        
                    get{ return this._vic_iNarizSize; }
        						set{ this._vic_iNarizSize = value; } 										
	   }
	  ///<summary>
     ///vic_iBocaLabios property   
     ///</summary>   
     public int vic_iBocaLabios 
		 { 
		        
                    get{ return this._vic_iBocaLabios; }
        						set{ this._vic_iBocaLabios = value; } 										
	   }
	  ///<summary>
     ///vic_iBocaSize property   
     ///</summary>   
     public int vic_iBocaSize 
		 { 
		        
                    get{ return this._vic_iBocaSize; }
        						set{ this._vic_iBocaSize = value; } 										
	   }
	  ///<summary>
     ///vic_iMentonForma property   
     ///</summary>   
     public int vic_iMentonForma 
		 { 
		        
                    get{ return this._vic_iMentonForma; }
        						set{ this._vic_iMentonForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOrejasForma property   
     ///</summary>   
     public int vic_iOrejasForma 
		 { 
		        
                    get{ return this._vic_iOrejasForma; }
        						set{ this._vic_iOrejasForma = value; } 										
	   }
	  ///<summary>
     ///vic_iOrejasSize property   
     ///</summary>   
     public int vic_iOrejasSize 
		 { 
		        
                    get{ return this._vic_iOrejasSize; }
        						set{ this._vic_iOrejasSize = value; } 										
	   }
	  ///<summary>
     ///vic_iCejasForma property   
     ///</summary>   
     public int vic_iCejasForma 
		 { 
		        
                    get{ return this._vic_iCejasForma; }
        						set{ this._vic_iCejasForma = value; } 										
	   }
	  ///<summary>
     ///vic_iCejasSize property   
     ///</summary>   
     public int vic_iCejasSize 
		 { 
		        
                    get{ return this._vic_iCejasSize; }
        						set{ this._vic_iCejasSize = value; } 										
	   }
	  ///<summary>
     ///vic_iPilosidadTipo property   
     ///</summary>   
     public int vic_iPilosidadTipo 
		 { 
		        
                    get{ return this._vic_iPilosidadTipo; }
        						set{ this._vic_iPilosidadTipo = value; } 										
	   }
	  ///<summary>
     ///vic_iPilosidadForma property   
     ///</summary>   
     public int vic_iPilosidadForma 
		 { 
		        
                    get{ return this._vic_iPilosidadForma; }
        						set{ this._vic_iPilosidadForma = value; } 										
	   }
	  ///<summary>
     ///vic_cObservaciones property   
     ///</summary>   
     public string vic_cObservaciones 
		 { 
		        
                    get{ return this._vic_cObservaciones; }
        						set{ this._vic_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///vic_cCaractSocial property   
     ///</summary>   
     public string vic_cCaractSocial 
		 { 
		        
                    get{ return this._vic_cCaractSocial; }
        						set{ this._vic_cCaractSocial = value; } 										
	   }
	  ///<summary>
     ///vic_cAdicciones property   
     ///</summary>   
     public string vic_cAdicciones 
		 { 
		        
                    get{ return this._vic_cAdicciones; }
        						set{ this._vic_cAdicciones = value; } 										
	   }
	  ///<summary>
     ///vic_iPeso property   
     ///</summary>   
     public int vic_iPeso 
		 { 
		        
                    get{ return this._vic_iPeso; }
        						set{ this._vic_iPeso = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_Victimarios() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_Victimarios(int Id, string Name, string vic_cApellido, string vic_cNombre, string vic_cIdentificacion, int vic_iRestriccion, string vic_cCalle, string vic_cCalleNro, string vic_cCallePiso, string vic_cCalleDpto, string vic_cCodigoPostal, string vic_cPartido, string vic_cLocalidad, string vic_cUbicacion, string vic_cPathPicture, int vic_iStatus, DateTime? vic_tFechaAlta, int vic_iEdad, int vic_iAltura, int vic_iAspectoRaza, int vic_iAspectoTez, int vic_iAspectoContextura, int vic_iCabelloTipo, int vic_iCabelloColor, int vic_iCabelloEstilo, int vic_iRostroForma, int vic_iOjosForma, int vic_iOjosColor, int vic_iNarizFrente, int vic_iNarizPerfil, int vic_iNarizSize, int vic_iBocaLabios, int vic_iBocaSize, int vic_iMentonForma, int vic_iOrejasForma, int vic_iOrejasSize, int vic_iCejasForma, int vic_iCejasSize, int vic_iPilosidadTipo, int vic_iPilosidadForma, string vic_cObservaciones, string vic_cCaractSocial, string vic_cAdicciones, int vic_iPeso) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._vic_cApellido = vic_cApellido;
this._vic_cNombre = vic_cNombre;
this._vic_cIdentificacion = vic_cIdentificacion;
this._vic_iRestriccion = vic_iRestriccion;
this._vic_cCalle = vic_cCalle;
this._vic_cCalleNro = vic_cCalleNro;
this._vic_cCallePiso = vic_cCallePiso;
this._vic_cCalleDpto = vic_cCalleDpto;
this._vic_cCodigoPostal = vic_cCodigoPostal;
this._vic_cPartido = vic_cPartido;
this._vic_cLocalidad = vic_cLocalidad;
this._vic_cUbicacion = vic_cUbicacion;
this._vic_cPathPicture = vic_cPathPicture;
this._vic_iStatus = vic_iStatus;
this._vic_tFechaAlta = vic_tFechaAlta;
this._vic_iEdad = vic_iEdad;
this._vic_iAltura = vic_iAltura;
this._vic_iAspectoRaza = vic_iAspectoRaza;
this._vic_iAspectoTez = vic_iAspectoTez;
this._vic_iAspectoContextura = vic_iAspectoContextura;
this._vic_iCabelloTipo = vic_iCabelloTipo;
this._vic_iCabelloColor = vic_iCabelloColor;
this._vic_iCabelloEstilo = vic_iCabelloEstilo;
this._vic_iRostroForma = vic_iRostroForma;
this._vic_iOjosForma = vic_iOjosForma;
this._vic_iOjosColor = vic_iOjosColor;
this._vic_iNarizFrente = vic_iNarizFrente;
this._vic_iNarizPerfil = vic_iNarizPerfil;
this._vic_iNarizSize = vic_iNarizSize;
this._vic_iBocaLabios = vic_iBocaLabios;
this._vic_iBocaSize = vic_iBocaSize;
this._vic_iMentonForma = vic_iMentonForma;
this._vic_iOrejasForma = vic_iOrejasForma;
this._vic_iOrejasSize = vic_iOrejasSize;
this._vic_iCejasForma = vic_iCejasForma;
this._vic_iCejasSize = vic_iCejasSize;
this._vic_iPilosidadTipo = vic_iPilosidadTipo;
this._vic_iPilosidadForma = vic_iPilosidadForma;
this._vic_cObservaciones = vic_cObservaciones;
this._vic_cCaractSocial = vic_cCaractSocial;
this._vic_cAdicciones = vic_cAdicciones;
this._vic_iPeso = vic_iPeso;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3238, "m_Victimarios");
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
			Simplem_Victimarios Simple = new Simplem_Victimarios();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.vic_cApellido = this._vic_cApellido;
Simple.vic_cNombre = this._vic_cNombre;
Simple.vic_cIdentificacion = this._vic_cIdentificacion;
Simple.vic_iRestriccion = this._vic_iRestriccion;
Simple.vic_cCalle = this._vic_cCalle;
Simple.vic_cCalleNro = this._vic_cCalleNro;
Simple.vic_cCallePiso = this._vic_cCallePiso;
Simple.vic_cCalleDpto = this._vic_cCalleDpto;
Simple.vic_cCodigoPostal = this._vic_cCodigoPostal;
Simple.vic_cPartido = this._vic_cPartido;
Simple.vic_cLocalidad = this._vic_cLocalidad;
Simple.vic_cUbicacion = this._vic_cUbicacion;
Simple.vic_cPathPicture = this._vic_cPathPicture;
Simple.vic_iStatus = this._vic_iStatus;
Simple.vic_tFechaAlta = this._vic_tFechaAlta;
Simple.vic_iEdad = this._vic_iEdad;
Simple.vic_iAltura = this._vic_iAltura;
Simple.vic_iAspectoRaza = this._vic_iAspectoRaza;
Simple.vic_iAspectoTez = this._vic_iAspectoTez;
Simple.vic_iAspectoContextura = this._vic_iAspectoContextura;
Simple.vic_iCabelloTipo = this._vic_iCabelloTipo;
Simple.vic_iCabelloColor = this._vic_iCabelloColor;
Simple.vic_iCabelloEstilo = this._vic_iCabelloEstilo;
Simple.vic_iRostroForma = this._vic_iRostroForma;
Simple.vic_iOjosForma = this._vic_iOjosForma;
Simple.vic_iOjosColor = this._vic_iOjosColor;
Simple.vic_iNarizFrente = this._vic_iNarizFrente;
Simple.vic_iNarizPerfil = this._vic_iNarizPerfil;
Simple.vic_iNarizSize = this._vic_iNarizSize;
Simple.vic_iBocaLabios = this._vic_iBocaLabios;
Simple.vic_iBocaSize = this._vic_iBocaSize;
Simple.vic_iMentonForma = this._vic_iMentonForma;
Simple.vic_iOrejasForma = this._vic_iOrejasForma;
Simple.vic_iOrejasSize = this._vic_iOrejasSize;
Simple.vic_iCejasForma = this._vic_iCejasForma;
Simple.vic_iCejasSize = this._vic_iCejasSize;
Simple.vic_iPilosidadTipo = this._vic_iPilosidadTipo;
Simple.vic_iPilosidadForma = this._vic_iPilosidadForma;
Simple.vic_cObservaciones = this._vic_cObservaciones;
Simple.vic_cCaractSocial = this._vic_cCaractSocial;
Simple.vic_cAdicciones = this._vic_cAdicciones;
Simple.vic_iPeso = this._vic_iPeso;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_Victimarios Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._vic_cApellido = Simple.vic_cApellido;
this._vic_cNombre = Simple.vic_cNombre;
this._vic_cIdentificacion = Simple.vic_cIdentificacion;
this._vic_iRestriccion = Simple.vic_iRestriccion;
this._vic_cCalle = Simple.vic_cCalle;
this._vic_cCalleNro = Simple.vic_cCalleNro;
this._vic_cCallePiso = Simple.vic_cCallePiso;
this._vic_cCalleDpto = Simple.vic_cCalleDpto;
this._vic_cCodigoPostal = Simple.vic_cCodigoPostal;
this._vic_cPartido = Simple.vic_cPartido;
this._vic_cLocalidad = Simple.vic_cLocalidad;
this._vic_cUbicacion = Simple.vic_cUbicacion;
this._vic_cPathPicture = Simple.vic_cPathPicture;
this._vic_iStatus = Simple.vic_iStatus;
this._vic_tFechaAlta = Simple.vic_tFechaAlta;
this._vic_iEdad = Simple.vic_iEdad;
this._vic_iAltura = Simple.vic_iAltura;
this._vic_iAspectoRaza = Simple.vic_iAspectoRaza;
this._vic_iAspectoTez = Simple.vic_iAspectoTez;
this._vic_iAspectoContextura = Simple.vic_iAspectoContextura;
this._vic_iCabelloTipo = Simple.vic_iCabelloTipo;
this._vic_iCabelloColor = Simple.vic_iCabelloColor;
this._vic_iCabelloEstilo = Simple.vic_iCabelloEstilo;
this._vic_iRostroForma = Simple.vic_iRostroForma;
this._vic_iOjosForma = Simple.vic_iOjosForma;
this._vic_iOjosColor = Simple.vic_iOjosColor;
this._vic_iNarizFrente = Simple.vic_iNarizFrente;
this._vic_iNarizPerfil = Simple.vic_iNarizPerfil;
this._vic_iNarizSize = Simple.vic_iNarizSize;
this._vic_iBocaLabios = Simple.vic_iBocaLabios;
this._vic_iBocaSize = Simple.vic_iBocaSize;
this._vic_iMentonForma = Simple.vic_iMentonForma;
this._vic_iOrejasForma = Simple.vic_iOrejasForma;
this._vic_iOrejasSize = Simple.vic_iOrejasSize;
this._vic_iCejasForma = Simple.vic_iCejasForma;
this._vic_iCejasSize = Simple.vic_iCejasSize;
this._vic_iPilosidadTipo = Simple.vic_iPilosidadTipo;
this._vic_iPilosidadForma = Simple.vic_iPilosidadForma;
this._vic_cObservaciones = Simple.vic_cObservaciones;
this._vic_cCaractSocial = Simple.vic_cCaractSocial;
this._vic_cAdicciones = Simple.vic_cAdicciones;
this._vic_iPeso = Simple.vic_iPeso;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_Victimarios(SqlConfig, UserId, (Simplem_Victimarios) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("vic_cApellido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cIdentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_iRestriccion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_cCalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCalleNro", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCallePiso", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCalleDpto", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCodigoPostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cPartido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cLocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cUbicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cPathPicture", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_tFechaAlta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("vic_iEdad", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAltura", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAspectoRaza", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAspectoTez", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iAspectoContextura", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCabelloTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCabelloColor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCabelloEstilo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iRostroForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOjosForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOjosColor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iNarizFrente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iNarizPerfil", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iNarizSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iBocaLabios", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iBocaSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iMentonForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOrejasForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iOrejasSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCejasForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iCejasSize", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iPilosidadTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_iPilosidadForma", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vic_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cCaractSocial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_cAdicciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vic_iPeso", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["vic_cApellido"] = this._vic_cApellido;
dr["vic_cNombre"] = this._vic_cNombre;
dr["vic_cIdentificacion"] = this._vic_cIdentificacion;
dr["vic_iRestriccion"] = this._vic_iRestriccion;
dr["vic_cCalle"] = this._vic_cCalle;
dr["vic_cCalleNro"] = this._vic_cCalleNro;
dr["vic_cCallePiso"] = this._vic_cCallePiso;
dr["vic_cCalleDpto"] = this._vic_cCalleDpto;
dr["vic_cCodigoPostal"] = this._vic_cCodigoPostal;
dr["vic_cPartido"] = this._vic_cPartido;
dr["vic_cLocalidad"] = this._vic_cLocalidad;
dr["vic_cUbicacion"] = this._vic_cUbicacion;
dr["vic_cPathPicture"] = this._vic_cPathPicture;
dr["vic_iStatus"] = this._vic_iStatus;
dr["vic_tFechaAlta"] = this._vic_tFechaAlta;
dr["vic_iEdad"] = this._vic_iEdad;
dr["vic_iAltura"] = this._vic_iAltura;
dr["vic_iAspectoRaza"] = this._vic_iAspectoRaza;
dr["vic_iAspectoTez"] = this._vic_iAspectoTez;
dr["vic_iAspectoContextura"] = this._vic_iAspectoContextura;
dr["vic_iCabelloTipo"] = this._vic_iCabelloTipo;
dr["vic_iCabelloColor"] = this._vic_iCabelloColor;
dr["vic_iCabelloEstilo"] = this._vic_iCabelloEstilo;
dr["vic_iRostroForma"] = this._vic_iRostroForma;
dr["vic_iOjosForma"] = this._vic_iOjosForma;
dr["vic_iOjosColor"] = this._vic_iOjosColor;
dr["vic_iNarizFrente"] = this._vic_iNarizFrente;
dr["vic_iNarizPerfil"] = this._vic_iNarizPerfil;
dr["vic_iNarizSize"] = this._vic_iNarizSize;
dr["vic_iBocaLabios"] = this._vic_iBocaLabios;
dr["vic_iBocaSize"] = this._vic_iBocaSize;
dr["vic_iMentonForma"] = this._vic_iMentonForma;
dr["vic_iOrejasForma"] = this._vic_iOrejasForma;
dr["vic_iOrejasSize"] = this._vic_iOrejasSize;
dr["vic_iCejasForma"] = this._vic_iCejasForma;
dr["vic_iCejasSize"] = this._vic_iCejasSize;
dr["vic_iPilosidadTipo"] = this._vic_iPilosidadTipo;
dr["vic_iPilosidadForma"] = this._vic_iPilosidadForma;
dr["vic_cObservaciones"] = this._vic_cObservaciones;
dr["vic_cCaractSocial"] = this._vic_cCaractSocial;
dr["vic_cAdicciones"] = this._vic_cAdicciones;
dr["vic_iPeso"] = this._vic_iPeso;
							 
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
