
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
    public class Callerm_tgviaje : CallerObject
    { 	
				     private string _tgv_nombre;
					
				     private DateTime? _tgv_fechainicio;
					
				     private DateTime? _tgv_fechafin;
					
				     private int _tgv_reciid_inicio;
					
				     private int _tgv_reciid_fin;
					
				     private int _tgv_usuiid;
					
				     private int _tgv_cueiid;
					
				     private string _tgv_codigoexterno;
					
				     private int _tgv_estado;
					
				     private int _tgv_geofenseinicio;
					
				     private int _tgv_geofensefin;
					
				     private string _tgv_metadata;
					
				     private DateTime? _tgv_fecha_prg_inicio;
					
				     private DateTime? _tgv_fecha_prg_fin;
					
				     private int _tgv_cuenta_cliente;
					
				     private int _tgv_movil_transportista;
					
				     private string _tgv_lugar_inicio;
					
				     private string _tgv_lugar_fin;
				 ///<summary>
     ///tgv_nombre property   
     ///</summary>   
     public string tgv_nombre 
		 { 
		        
                    get{ return this._tgv_nombre; }
        						set{ this._tgv_nombre = value; } 										
	   }
	  ///<summary>
     ///tgv_fechainicio property   
     ///</summary>   
     public DateTime? tgv_fechainicio 
		 { 
		        
                    get{ return this._tgv_fechainicio; }
        						set{ this._tgv_fechainicio = value; } 										
	   }
	  ///<summary>
     ///tgv_fechafin property   
     ///</summary>   
     public DateTime? tgv_fechafin 
		 { 
		        
                    get{ return this._tgv_fechafin; }
        						set{ this._tgv_fechafin = value; } 										
	   }
	  ///<summary>
     ///tgv_reciid_inicio property   
     ///</summary>   
     public int tgv_reciid_inicio 
		 { 
		        
                    get{ return this._tgv_reciid_inicio; }
        						set{ this._tgv_reciid_inicio = value; } 										
	   }
	  ///<summary>
     ///tgv_reciid_fin property   
     ///</summary>   
     public int tgv_reciid_fin 
		 { 
		        
                    get{ return this._tgv_reciid_fin; }
        						set{ this._tgv_reciid_fin = value; } 										
	   }
	  ///<summary>
     ///tgv_usuiid property   
     ///</summary>   
     public int tgv_usuiid 
		 { 
		        
                    get{ return this._tgv_usuiid; }
        						set{ this._tgv_usuiid = value; } 										
	   }
	  ///<summary>
     ///tgv_cueiid property   
     ///</summary>   
     public int tgv_cueiid 
		 { 
		        
                    get{ return this._tgv_cueiid; }
        						set{ this._tgv_cueiid = value; } 										
	   }
	  ///<summary>
     ///tgv_codigoexterno property   
     ///</summary>   
     public string tgv_codigoexterno 
		 { 
		        
                    get{ return this._tgv_codigoexterno; }
        						set{ this._tgv_codigoexterno = value; } 										
	   }
	  ///<summary>
     ///tgv_estado property   
     ///</summary>   
     public int tgv_estado 
		 { 
		        
                    get{ return this._tgv_estado; }
        						set{ this._tgv_estado = value; } 										
	   }
	  ///<summary>
     ///tgv_geofenseinicio property   
     ///</summary>   
     public int tgv_geofenseinicio 
		 { 
		        
                    get{ return this._tgv_geofenseinicio; }
        						set{ this._tgv_geofenseinicio = value; } 										
	   }
	  ///<summary>
     ///tgv_geofensefin property   
     ///</summary>   
     public int tgv_geofensefin 
		 { 
		        
                    get{ return this._tgv_geofensefin; }
        						set{ this._tgv_geofensefin = value; } 										
	   }
	  ///<summary>
     ///tgv_metadata property   
     ///</summary>   
     public string tgv_metadata 
		 { 
		        
                    get{ return this._tgv_metadata; }
        						set{ this._tgv_metadata = value; } 										
	   }
	  ///<summary>
     ///tgv_fecha_prg_inicio property   
     ///</summary>   
     public DateTime? tgv_fecha_prg_inicio 
		 { 
		        
                    get{ return this._tgv_fecha_prg_inicio; }
        						set{ this._tgv_fecha_prg_inicio = value; } 										
	   }
	  ///<summary>
     ///tgv_fecha_prg_fin property   
     ///</summary>   
     public DateTime? tgv_fecha_prg_fin 
		 { 
		        
                    get{ return this._tgv_fecha_prg_fin; }
        						set{ this._tgv_fecha_prg_fin = value; } 										
	   }
	  ///<summary>
     ///tgv_cuenta_cliente property   
     ///</summary>   
     public int tgv_cuenta_cliente 
		 { 
		        
                    get{ return this._tgv_cuenta_cliente; }
        						set{ this._tgv_cuenta_cliente = value; } 										
	   }
	  ///<summary>
     ///tgv_movil_transportista property   
     ///</summary>   
     public int tgv_movil_transportista 
		 { 
		        
                    get{ return this._tgv_movil_transportista; }
        						set{ this._tgv_movil_transportista = value; } 										
	   }
	  ///<summary>
     ///tgv_lugar_inicio property   
     ///</summary>   
     public string tgv_lugar_inicio 
		 { 
		        
                    get{ return this._tgv_lugar_inicio; }
        						set{ this._tgv_lugar_inicio = value; } 										
	   }
	  ///<summary>
     ///tgv_lugar_fin property   
     ///</summary>   
     public string tgv_lugar_fin 
		 { 
		        
                    get{ return this._tgv_lugar_fin; }
        						set{ this._tgv_lugar_fin = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_tgviaje() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_tgviaje(int Id, string Name, string tgv_nombre, DateTime? tgv_fechainicio, DateTime? tgv_fechafin, int tgv_reciid_inicio, int tgv_reciid_fin, int tgv_usuiid, int tgv_cueiid, string tgv_codigoexterno, int tgv_estado, int tgv_geofenseinicio, int tgv_geofensefin, string tgv_metadata, DateTime? tgv_fecha_prg_inicio, DateTime? tgv_fecha_prg_fin, int tgv_cuenta_cliente, int tgv_movil_transportista, string tgv_lugar_inicio, string tgv_lugar_fin) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tgv_nombre = tgv_nombre;
this._tgv_fechainicio = tgv_fechainicio;
this._tgv_fechafin = tgv_fechafin;
this._tgv_reciid_inicio = tgv_reciid_inicio;
this._tgv_reciid_fin = tgv_reciid_fin;
this._tgv_usuiid = tgv_usuiid;
this._tgv_cueiid = tgv_cueiid;
this._tgv_codigoexterno = tgv_codigoexterno;
this._tgv_estado = tgv_estado;
this._tgv_geofenseinicio = tgv_geofenseinicio;
this._tgv_geofensefin = tgv_geofensefin;
this._tgv_metadata = tgv_metadata;
this._tgv_fecha_prg_inicio = tgv_fecha_prg_inicio;
this._tgv_fecha_prg_fin = tgv_fecha_prg_fin;
this._tgv_cuenta_cliente = tgv_cuenta_cliente;
this._tgv_movil_transportista = tgv_movil_transportista;
this._tgv_lugar_inicio = tgv_lugar_inicio;
this._tgv_lugar_fin = tgv_lugar_fin;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3214, "m_tgviaje");
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
			Simplem_tgviaje Simple = new Simplem_tgviaje();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tgv_nombre = this._tgv_nombre;
Simple.tgv_fechainicio = this._tgv_fechainicio;
Simple.tgv_fechafin = this._tgv_fechafin;
Simple.tgv_reciid_inicio = this._tgv_reciid_inicio;
Simple.tgv_reciid_fin = this._tgv_reciid_fin;
Simple.tgv_usuiid = this._tgv_usuiid;
Simple.tgv_cueiid = this._tgv_cueiid;
Simple.tgv_codigoexterno = this._tgv_codigoexterno;
Simple.tgv_estado = this._tgv_estado;
Simple.tgv_geofenseinicio = this._tgv_geofenseinicio;
Simple.tgv_geofensefin = this._tgv_geofensefin;
Simple.tgv_metadata = this._tgv_metadata;
Simple.tgv_fecha_prg_inicio = this._tgv_fecha_prg_inicio;
Simple.tgv_fecha_prg_fin = this._tgv_fecha_prg_fin;
Simple.tgv_cuenta_cliente = this._tgv_cuenta_cliente;
Simple.tgv_movil_transportista = this._tgv_movil_transportista;
Simple.tgv_lugar_inicio = this._tgv_lugar_inicio;
Simple.tgv_lugar_fin = this._tgv_lugar_fin;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_tgviaje Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tgv_nombre = Simple.tgv_nombre;
this._tgv_fechainicio = Simple.tgv_fechainicio;
this._tgv_fechafin = Simple.tgv_fechafin;
this._tgv_reciid_inicio = Simple.tgv_reciid_inicio;
this._tgv_reciid_fin = Simple.tgv_reciid_fin;
this._tgv_usuiid = Simple.tgv_usuiid;
this._tgv_cueiid = Simple.tgv_cueiid;
this._tgv_codigoexterno = Simple.tgv_codigoexterno;
this._tgv_estado = Simple.tgv_estado;
this._tgv_geofenseinicio = Simple.tgv_geofenseinicio;
this._tgv_geofensefin = Simple.tgv_geofensefin;
this._tgv_metadata = Simple.tgv_metadata;
this._tgv_fecha_prg_inicio = Simple.tgv_fecha_prg_inicio;
this._tgv_fecha_prg_fin = Simple.tgv_fecha_prg_fin;
this._tgv_cuenta_cliente = Simple.tgv_cuenta_cliente;
this._tgv_movil_transportista = Simple.tgv_movil_transportista;
this._tgv_lugar_inicio = Simple.tgv_lugar_inicio;
this._tgv_lugar_fin = Simple.tgv_lugar_fin;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_tgviaje(SqlConfig, UserId, (Simplem_tgviaje) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tgv_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_fechainicio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_fechafin", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_reciid_inicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_reciid_fin", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_usuiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_cueiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_codigoexterno", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_geofenseinicio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_geofensefin", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_fecha_prg_inicio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_fecha_prg_fin", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("tgv_cuenta_cliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_movil_transportista", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgv_lugar_inicio", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgv_lugar_fin", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgv_nombre"] = this._tgv_nombre;
dr["tgv_fechainicio"] = this._tgv_fechainicio;
dr["tgv_fechafin"] = this._tgv_fechafin;
dr["tgv_reciid_inicio"] = this._tgv_reciid_inicio;
dr["tgv_reciid_fin"] = this._tgv_reciid_fin;
dr["tgv_usuiid"] = this._tgv_usuiid;
dr["tgv_cueiid"] = this._tgv_cueiid;
dr["tgv_codigoexterno"] = this._tgv_codigoexterno;
dr["tgv_estado"] = this._tgv_estado;
dr["tgv_geofenseinicio"] = this._tgv_geofenseinicio;
dr["tgv_geofensefin"] = this._tgv_geofensefin;
dr["tgv_metadata"] = this._tgv_metadata;
dr["tgv_fecha_prg_inicio"] = this._tgv_fecha_prg_inicio;
dr["tgv_fecha_prg_fin"] = this._tgv_fecha_prg_fin;
dr["tgv_cuenta_cliente"] = this._tgv_cuenta_cliente;
dr["tgv_movil_transportista"] = this._tgv_movil_transportista;
dr["tgv_lugar_inicio"] = this._tgv_lugar_inicio;
dr["tgv_lugar_fin"] = this._tgv_lugar_fin;
							 
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
