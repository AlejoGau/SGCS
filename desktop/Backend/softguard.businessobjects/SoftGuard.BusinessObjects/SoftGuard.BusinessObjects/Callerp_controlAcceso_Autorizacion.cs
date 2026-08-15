
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
    public class Callerp_controlAcceso_Autorizacion : CallerObject
    { 	
				     private int _caa_idautorizado;
					
				     private int _caa_tipo;
					
				     private DateTime? _caa_fechadesde;
					
				     private DateTime? _caa_fechahasta;
					
				     private int _caa_diasemana;
					
				     private string _caa_horadesde;
					
				     private string _caa_horahasta;
					
				     private int _caa_estado;
					
				     private string _caa_codigo;
					
				     private int _caa_usuautoriza;
					
				     private string _caa_marcavehiculo;
					
				     private string _caa_patenteVehiculo;
					
				     private int _caa_tipoVisita;
					
				     private string _caa_comentarios;
				 ///<summary>
     ///caa_idautorizado property   
     ///</summary>   
     public int caa_idautorizado 
		 { 
		        
                    get{ return this._caa_idautorizado; }
        						set{ this._caa_idautorizado = value; } 										
	   }
	  ///<summary>
     ///caa_tipo property   
     ///</summary>   
     public int caa_tipo 
		 { 
		        
                    get{ return this._caa_tipo; }
        						set{ this._caa_tipo = value; } 										
	   }
	  ///<summary>
     ///caa_fechadesde property   
     ///</summary>   
     public DateTime? caa_fechadesde 
		 { 
		        
                    get{ return this._caa_fechadesde; }
        						set{ this._caa_fechadesde = value; } 										
	   }
	  ///<summary>
     ///caa_fechahasta property   
     ///</summary>   
     public DateTime? caa_fechahasta 
		 { 
		        
                    get{ return this._caa_fechahasta; }
        						set{ this._caa_fechahasta = value; } 										
	   }
	  ///<summary>
     ///caa_diasemana property   
     ///</summary>   
     public int caa_diasemana 
		 { 
		        
                    get{ return this._caa_diasemana; }
        						set{ this._caa_diasemana = value; } 										
	   }
	  ///<summary>
     ///caa_horadesde property   
     ///</summary>   
     public string caa_horadesde 
		 { 
		        
                    get{ return this._caa_horadesde; }
        						set{ this._caa_horadesde = value; } 										
	   }
	  ///<summary>
     ///caa_horahasta property   
     ///</summary>   
     public string caa_horahasta 
		 { 
		        
                    get{ return this._caa_horahasta; }
        						set{ this._caa_horahasta = value; } 										
	   }
	  ///<summary>
     ///caa_estado property   
     ///</summary>   
     public int caa_estado 
		 { 
		        
                    get{ return this._caa_estado; }
        						set{ this._caa_estado = value; } 										
	   }
	  ///<summary>
     ///caa_codigo property   
     ///</summary>   
     public string caa_codigo 
		 { 
		        
                    get{ return this._caa_codigo; }
        						set{ this._caa_codigo = value; } 										
	   }
	  ///<summary>
     ///caa_usuautoriza property   
     ///</summary>   
     public int caa_usuautoriza 
		 { 
		        
                    get{ return this._caa_usuautoriza; }
        						set{ this._caa_usuautoriza = value; } 										
	   }
	  ///<summary>
     ///caa_marcavehiculo property   
     ///</summary>   
     public string caa_marcavehiculo 
		 { 
		        
                    get{ return this._caa_marcavehiculo; }
        						set{ this._caa_marcavehiculo = value; } 										
	   }
	  ///<summary>
     ///caa_patenteVehiculo property   
     ///</summary>   
     public string caa_patenteVehiculo 
		 { 
		        
                    get{ return this._caa_patenteVehiculo; }
        						set{ this._caa_patenteVehiculo = value; } 										
	   }
	  ///<summary>
     ///caa_tipoVisita property   
     ///</summary>   
     public int caa_tipoVisita 
		 { 
		        
                    get{ return this._caa_tipoVisita; }
        						set{ this._caa_tipoVisita = value; } 										
	   }
	  ///<summary>
     ///caa_comentarios property   
     ///</summary>   
     public string caa_comentarios 
		 { 
		        
                    get{ return this._caa_comentarios; }
        						set{ this._caa_comentarios = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_controlAcceso_Autorizacion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_controlAcceso_Autorizacion(int Id, string Name, int caa_idautorizado, int caa_tipo, DateTime? caa_fechadesde, DateTime? caa_fechahasta, int caa_diasemana, string caa_horadesde, string caa_horahasta, int caa_estado, string caa_codigo, int caa_usuautoriza, string caa_marcavehiculo, string caa_patenteVehiculo, int caa_tipoVisita, string caa_comentarios) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._caa_idautorizado = caa_idautorizado;
this._caa_tipo = caa_tipo;
this._caa_fechadesde = caa_fechadesde;
this._caa_fechahasta = caa_fechahasta;
this._caa_diasemana = caa_diasemana;
this._caa_horadesde = caa_horadesde;
this._caa_horahasta = caa_horahasta;
this._caa_estado = caa_estado;
this._caa_codigo = caa_codigo;
this._caa_usuautoriza = caa_usuautoriza;
this._caa_marcavehiculo = caa_marcavehiculo;
this._caa_patenteVehiculo = caa_patenteVehiculo;
this._caa_tipoVisita = caa_tipoVisita;
this._caa_comentarios = caa_comentarios;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3207, "p_controlAcceso_Autorizacion");
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
			Simplep_controlAcceso_Autorizacion Simple = new Simplep_controlAcceso_Autorizacion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.caa_idautorizado = this._caa_idautorizado;
Simple.caa_tipo = this._caa_tipo;
Simple.caa_fechadesde = this._caa_fechadesde;
Simple.caa_fechahasta = this._caa_fechahasta;
Simple.caa_diasemana = this._caa_diasemana;
Simple.caa_horadesde = this._caa_horadesde;
Simple.caa_horahasta = this._caa_horahasta;
Simple.caa_estado = this._caa_estado;
Simple.caa_codigo = this._caa_codigo;
Simple.caa_usuautoriza = this._caa_usuautoriza;
Simple.caa_marcavehiculo = this._caa_marcavehiculo;
Simple.caa_patenteVehiculo = this._caa_patenteVehiculo;
Simple.caa_tipoVisita = this._caa_tipoVisita;
Simple.caa_comentarios = this._caa_comentarios;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_controlAcceso_Autorizacion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._caa_idautorizado = Simple.caa_idautorizado;
this._caa_tipo = Simple.caa_tipo;
this._caa_fechadesde = Simple.caa_fechadesde;
this._caa_fechahasta = Simple.caa_fechahasta;
this._caa_diasemana = Simple.caa_diasemana;
this._caa_horadesde = Simple.caa_horadesde;
this._caa_horahasta = Simple.caa_horahasta;
this._caa_estado = Simple.caa_estado;
this._caa_codigo = Simple.caa_codigo;
this._caa_usuautoriza = Simple.caa_usuautoriza;
this._caa_marcavehiculo = Simple.caa_marcavehiculo;
this._caa_patenteVehiculo = Simple.caa_patenteVehiculo;
this._caa_tipoVisita = Simple.caa_tipoVisita;
this._caa_comentarios = Simple.caa_comentarios;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_controlAcceso_Autorizacion(SqlConfig, UserId, (Simplep_controlAcceso_Autorizacion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("caa_idautorizado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_fechadesde", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("caa_fechahasta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("caa_diasemana", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_horadesde", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_horahasta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_codigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_usuautoriza", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_marcavehiculo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_patenteVehiculo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("caa_tipoVisita", typeof (int)));               
							 dt.Columns.Add(new DataColumn("caa_comentarios", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["caa_idautorizado"] = this._caa_idautorizado;
dr["caa_tipo"] = this._caa_tipo;
dr["caa_fechadesde"] = this._caa_fechadesde;
dr["caa_fechahasta"] = this._caa_fechahasta;
dr["caa_diasemana"] = this._caa_diasemana;
dr["caa_horadesde"] = this._caa_horadesde;
dr["caa_horahasta"] = this._caa_horahasta;
dr["caa_estado"] = this._caa_estado;
dr["caa_codigo"] = this._caa_codigo;
dr["caa_usuautoriza"] = this._caa_usuautoriza;
dr["caa_marcavehiculo"] = this._caa_marcavehiculo;
dr["caa_patenteVehiculo"] = this._caa_patenteVehiculo;
dr["caa_tipoVisita"] = this._caa_tipoVisita;
dr["caa_comentarios"] = this._caa_comentarios;
							 
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
