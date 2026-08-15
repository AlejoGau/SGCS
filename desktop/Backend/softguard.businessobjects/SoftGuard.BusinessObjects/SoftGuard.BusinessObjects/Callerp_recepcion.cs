
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
    public class Callerp_recepcion : CallerObject
    { 	
				     private int _rec_iidcuenta;
					
				     private string _rec_calarma;
					
				     private string _rec_czona;
					
				     private int _rec_iusuario;
					
				     private DateTime? _rec_tfechahora;
					
				     private Decimal _rec_nestado;
					
				     private string _rec_cContenido;
					
				     private DateTime? _rec_tFechaProceso;
					
				     private int _rec_ioperador;
					
				     private string _rec_cObservaciones;
					
				     private string _rec_cTerminal;
					
				     private string _rec_idResolucion;
					
				     private int _rec_idReceptor;
					
				     private string _rec_cCategorizacion;
					
				     private int _rec_iNYR;
					
				     private int _rec_iTE;
					
				     private DateTime? _rec_tFechaRecepcion;
					
				     private Decimal _rec_nOrigen;
					
				     private int _rec_idMap;
					
				     private int _rec_idFwd;
					
				     private int _rec_iMinutosEspera;
					
				     private int _rec_iPuerto;
					
				     private int _rec_idLoc;
				 ///<summary>
     ///rec_iidcuenta property   
     ///</summary>   
     public int rec_iidcuenta 
		 { 
		        
                    get{ return this._rec_iidcuenta; }
        						set{ this._rec_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///rec_calarma property   
     ///</summary>   
     public string rec_calarma 
		 { 
		        
                    get{ return this._rec_calarma; }
        						set{ this._rec_calarma = value; } 										
	   }
	  ///<summary>
     ///rec_czona property   
     ///</summary>   
     public string rec_czona 
		 { 
		        
                    get{ return this._rec_czona; }
        						set{ this._rec_czona = value; } 										
	   }
	  ///<summary>
     ///rec_iusuario property   
     ///</summary>   
     public int rec_iusuario 
		 { 
		        
                    get{ return this._rec_iusuario; }
        						set{ this._rec_iusuario = value; } 										
	   }
	  ///<summary>
     ///rec_tfechahora property   
     ///</summary>   
     public DateTime? rec_tfechahora 
		 { 
		        
                    get{ return this._rec_tfechahora; }
        						set{ this._rec_tfechahora = value; } 										
	   }
	  ///<summary>
     ///rec_nestado property   
     ///</summary>   
     public Decimal rec_nestado 
		 { 
		        
                    get{ return this._rec_nestado; }
        						set{ this._rec_nestado = value; } 										
	   }
	  ///<summary>
     ///rec_cContenido property   
     ///</summary>   
     public string rec_cContenido 
		 { 
		        
                    get{ return this._rec_cContenido; }
        						set{ this._rec_cContenido = value; } 										
	   }
	  ///<summary>
     ///rec_tFechaProceso property   
     ///</summary>   
     public DateTime? rec_tFechaProceso 
		 { 
		        
                    get{ return this._rec_tFechaProceso; }
        						set{ this._rec_tFechaProceso = value; } 										
	   }
	  ///<summary>
     ///rec_ioperador property   
     ///</summary>   
     public int rec_ioperador 
		 { 
		        
                    get{ return this._rec_ioperador; }
        						set{ this._rec_ioperador = value; } 										
	   }
	  ///<summary>
     ///rec_cObservaciones property   
     ///</summary>   
     public string rec_cObservaciones 
		 { 
		        
                    get{ return this._rec_cObservaciones; }
        						set{ this._rec_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///rec_cTerminal property   
     ///</summary>   
     public string rec_cTerminal 
		 { 
		        
                    get{ return this._rec_cTerminal; }
        						set{ this._rec_cTerminal = value; } 										
	   }
	  ///<summary>
     ///rec_idResolucion property   
     ///</summary>   
     public string rec_idResolucion 
		 { 
		        
                    get{ return this._rec_idResolucion; }
        						set{ this._rec_idResolucion = value; } 										
	   }
	  ///<summary>
     ///rec_idReceptor property   
     ///</summary>   
     public int rec_idReceptor 
		 { 
		        
                    get{ return this._rec_idReceptor; }
        						set{ this._rec_idReceptor = value; } 										
	   }
	  ///<summary>
     ///rec_cCategorizacion property   
     ///</summary>   
     public string rec_cCategorizacion 
		 { 
		        
                    get{ return this._rec_cCategorizacion; }
        						set{ this._rec_cCategorizacion = value; } 										
	   }
	  ///<summary>
     ///rec_iNYR property   
     ///</summary>   
     public int rec_iNYR 
		 { 
		        
                    get{ return this._rec_iNYR; }
        						set{ this._rec_iNYR = value; } 										
	   }
	  ///<summary>
     ///rec_iTE property   
     ///</summary>   
     public int rec_iTE 
		 { 
		        
                    get{ return this._rec_iTE; }
        						set{ this._rec_iTE = value; } 										
	   }
	  ///<summary>
     ///rec_tFechaRecepcion property   
     ///</summary>   
     public DateTime? rec_tFechaRecepcion 
		 { 
		        
                    get{ return this._rec_tFechaRecepcion; }
        						set{ this._rec_tFechaRecepcion = value; } 										
	   }
	  ///<summary>
     ///rec_nOrigen property   
     ///</summary>   
     public Decimal rec_nOrigen 
		 { 
		        
                    get{ return this._rec_nOrigen; }
        						set{ this._rec_nOrigen = value; } 										
	   }
	  ///<summary>
     ///rec_idMap property   
     ///</summary>   
     public int rec_idMap 
		 { 
		        
                    get{ return this._rec_idMap; }
        						set{ this._rec_idMap = value; } 										
	   }
	  ///<summary>
     ///rec_idFwd property   
     ///</summary>   
     public int rec_idFwd 
		 { 
		        
                    get{ return this._rec_idFwd; }
        						set{ this._rec_idFwd = value; } 										
	   }
	  ///<summary>
     ///rec_iMinutosEspera property   
     ///</summary>   
     public int rec_iMinutosEspera 
		 { 
		        
                    get{ return this._rec_iMinutosEspera; }
        						set{ this._rec_iMinutosEspera = value; } 										
	   }
	  ///<summary>
     ///rec_iPuerto property   
     ///</summary>   
     public int rec_iPuerto 
		 { 
		        
                    get{ return this._rec_iPuerto; }
        						set{ this._rec_iPuerto = value; } 										
	   }
	  ///<summary>
     ///rec_idLoc property   
     ///</summary>   
     public int rec_idLoc 
		 { 
		        
                    get{ return this._rec_idLoc; }
        						set{ this._rec_idLoc = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_recepcion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_recepcion(int Id, string Name, int rec_iidcuenta, string rec_calarma, string rec_czona, int rec_iusuario, DateTime? rec_tfechahora, Decimal rec_nestado, string rec_cContenido, DateTime? rec_tFechaProceso, int rec_ioperador, string rec_cObservaciones, string rec_cTerminal, string rec_idResolucion, int rec_idReceptor, string rec_cCategorizacion, int rec_iNYR, int rec_iTE, DateTime? rec_tFechaRecepcion, Decimal rec_nOrigen, int rec_idMap, int rec_idFwd, int rec_iMinutosEspera, int rec_iPuerto, int rec_idLoc) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rec_iidcuenta = rec_iidcuenta;
this._rec_calarma = rec_calarma;
this._rec_czona = rec_czona;
this._rec_iusuario = rec_iusuario;
this._rec_tfechahora = rec_tfechahora;
this._rec_nestado = rec_nestado;
this._rec_cContenido = rec_cContenido;
this._rec_tFechaProceso = rec_tFechaProceso;
this._rec_ioperador = rec_ioperador;
this._rec_cObservaciones = rec_cObservaciones;
this._rec_cTerminal = rec_cTerminal;
this._rec_idResolucion = rec_idResolucion;
this._rec_idReceptor = rec_idReceptor;
this._rec_cCategorizacion = rec_cCategorizacion;
this._rec_iNYR = rec_iNYR;
this._rec_iTE = rec_iTE;
this._rec_tFechaRecepcion = rec_tFechaRecepcion;
this._rec_nOrigen = rec_nOrigen;
this._rec_idMap = rec_idMap;
this._rec_idFwd = rec_idFwd;
this._rec_iMinutosEspera = rec_iMinutosEspera;
this._rec_iPuerto = rec_iPuerto;
this._rec_idLoc = rec_idLoc;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3100, "p_recepcion");
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
			Simplep_recepcion Simple = new Simplep_recepcion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rec_iidcuenta = this._rec_iidcuenta;
Simple.rec_calarma = this._rec_calarma;
Simple.rec_czona = this._rec_czona;
Simple.rec_iusuario = this._rec_iusuario;
Simple.rec_tfechahora = this._rec_tfechahora;
Simple.rec_nestado = this._rec_nestado;
Simple.rec_cContenido = this._rec_cContenido;
Simple.rec_tFechaProceso = this._rec_tFechaProceso;
Simple.rec_ioperador = this._rec_ioperador;
Simple.rec_cObservaciones = this._rec_cObservaciones;
Simple.rec_cTerminal = this._rec_cTerminal;
Simple.rec_idResolucion = this._rec_idResolucion;
Simple.rec_idReceptor = this._rec_idReceptor;
Simple.rec_cCategorizacion = this._rec_cCategorizacion;
Simple.rec_iNYR = this._rec_iNYR;
Simple.rec_iTE = this._rec_iTE;
Simple.rec_tFechaRecepcion = this._rec_tFechaRecepcion;
Simple.rec_nOrigen = this._rec_nOrigen;
Simple.rec_idMap = this._rec_idMap;
Simple.rec_idFwd = this._rec_idFwd;
Simple.rec_iMinutosEspera = this._rec_iMinutosEspera;
Simple.rec_iPuerto = this._rec_iPuerto;
Simple.rec_idLoc = this._rec_idLoc;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_recepcion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rec_iidcuenta = Simple.rec_iidcuenta;
this._rec_calarma = Simple.rec_calarma;
this._rec_czona = Simple.rec_czona;
this._rec_iusuario = Simple.rec_iusuario;
this._rec_tfechahora = Simple.rec_tfechahora;
this._rec_nestado = Simple.rec_nestado;
this._rec_cContenido = Simple.rec_cContenido;
this._rec_tFechaProceso = Simple.rec_tFechaProceso;
this._rec_ioperador = Simple.rec_ioperador;
this._rec_cObservaciones = Simple.rec_cObservaciones;
this._rec_cTerminal = Simple.rec_cTerminal;
this._rec_idResolucion = Simple.rec_idResolucion;
this._rec_idReceptor = Simple.rec_idReceptor;
this._rec_cCategorizacion = Simple.rec_cCategorizacion;
this._rec_iNYR = Simple.rec_iNYR;
this._rec_iTE = Simple.rec_iTE;
this._rec_tFechaRecepcion = Simple.rec_tFechaRecepcion;
this._rec_nOrigen = Simple.rec_nOrigen;
this._rec_idMap = Simple.rec_idMap;
this._rec_idFwd = Simple.rec_idFwd;
this._rec_iMinutosEspera = Simple.rec_iMinutosEspera;
this._rec_iPuerto = Simple.rec_iPuerto;
this._rec_idLoc = Simple.rec_idLoc;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_recepcion(SqlConfig, UserId, (Simplep_recepcion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rec_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_iusuario", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_tfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rec_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rec_cContenido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_tFechaProceso", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rec_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_cTerminal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_idResolucion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_idReceptor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_cCategorizacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_iNYR", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_iTE", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_tFechaRecepcion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rec_nOrigen", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rec_idMap", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_idFwd", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_iMinutosEspera", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_iPuerto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_idLoc", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rec_iidcuenta"] = this._rec_iidcuenta;
dr["rec_calarma"] = this._rec_calarma;
dr["rec_czona"] = this._rec_czona;
dr["rec_iusuario"] = this._rec_iusuario;
dr["rec_tfechahora"] = this._rec_tfechahora;
dr["rec_nestado"] = this._rec_nestado;
dr["rec_cContenido"] = this._rec_cContenido;
dr["rec_tFechaProceso"] = this._rec_tFechaProceso;
dr["rec_ioperador"] = this._rec_ioperador;
dr["rec_cObservaciones"] = this._rec_cObservaciones;
dr["rec_cTerminal"] = this._rec_cTerminal;
dr["rec_idResolucion"] = this._rec_idResolucion;
dr["rec_idReceptor"] = this._rec_idReceptor;
dr["rec_cCategorizacion"] = this._rec_cCategorizacion;
dr["rec_iNYR"] = this._rec_iNYR;
dr["rec_iTE"] = this._rec_iTE;
dr["rec_tFechaRecepcion"] = this._rec_tFechaRecepcion;
dr["rec_nOrigen"] = this._rec_nOrigen;
dr["rec_idMap"] = this._rec_idMap;
dr["rec_idFwd"] = this._rec_idFwd;
dr["rec_iMinutosEspera"] = this._rec_iMinutosEspera;
dr["rec_iPuerto"] = this._rec_iPuerto;
dr["rec_idLoc"] = this._rec_idLoc;
							 
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
