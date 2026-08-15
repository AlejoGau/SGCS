
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
    public class Callerm_AccesosProveedores : CallerObject
    { 	
				     private string _apr_cNombre;
					
				     private string _apr_cIdentificacion;
					
				     private string _apr_cDireccion;
					
				     private string _apr_cCodigoPostal;
					
				     private string _apr_cLocalidad;
					
				     private int _apr_iProvincia;
					
				     private string _apr_cTelefono;
					
				     private int _apr_iCategoria;
					
				     private DateTime? _apr_tFechaAlta;
					
				     private int _apr_iStatus;
					
				     private string _apr_cObservaciones;
					
				     private string _apr_cPathPicture;
				 ///<summary>
     ///apr_cNombre property   
     ///</summary>   
     public string apr_cNombre 
		 { 
		        
                    get{ return this._apr_cNombre; }
        						set{ this._apr_cNombre = value; } 										
	   }
	  ///<summary>
     ///apr_cIdentificacion property   
     ///</summary>   
     public string apr_cIdentificacion 
		 { 
		        
                    get{ return this._apr_cIdentificacion; }
        						set{ this._apr_cIdentificacion = value; } 										
	   }
	  ///<summary>
     ///apr_cDireccion property   
     ///</summary>   
     public string apr_cDireccion 
		 { 
		        
                    get{ return this._apr_cDireccion; }
        						set{ this._apr_cDireccion = value; } 										
	   }
	  ///<summary>
     ///apr_cCodigoPostal property   
     ///</summary>   
     public string apr_cCodigoPostal 
		 { 
		        
                    get{ return this._apr_cCodigoPostal; }
        						set{ this._apr_cCodigoPostal = value; } 										
	   }
	  ///<summary>
     ///apr_cLocalidad property   
     ///</summary>   
     public string apr_cLocalidad 
		 { 
		        
                    get{ return this._apr_cLocalidad; }
        						set{ this._apr_cLocalidad = value; } 										
	   }
	  ///<summary>
     ///apr_iProvincia property   
     ///</summary>   
     public int apr_iProvincia 
		 { 
		        
                    get{ return this._apr_iProvincia; }
        						set{ this._apr_iProvincia = value; } 										
	   }
	  ///<summary>
     ///apr_cTelefono property   
     ///</summary>   
     public string apr_cTelefono 
		 { 
		        
                    get{ return this._apr_cTelefono; }
        						set{ this._apr_cTelefono = value; } 										
	   }
	  ///<summary>
     ///apr_iCategoria property   
     ///</summary>   
     public int apr_iCategoria 
		 { 
		        
                    get{ return this._apr_iCategoria; }
        						set{ this._apr_iCategoria = value; } 										
	   }
	  ///<summary>
     ///apr_tFechaAlta property   
     ///</summary>   
     public DateTime? apr_tFechaAlta 
		 { 
		        
                    get{ return this._apr_tFechaAlta; }
        						set{ this._apr_tFechaAlta = value; } 										
	   }
	  ///<summary>
     ///apr_iStatus property   
     ///</summary>   
     public int apr_iStatus 
		 { 
		        
                    get{ return this._apr_iStatus; }
        						set{ this._apr_iStatus = value; } 										
	   }
	  ///<summary>
     ///apr_cObservaciones property   
     ///</summary>   
     public string apr_cObservaciones 
		 { 
		        
                    get{ return this._apr_cObservaciones; }
        						set{ this._apr_cObservaciones = value; } 										
	   }
	  ///<summary>
     ///apr_cPathPicture property   
     ///</summary>   
     public string apr_cPathPicture 
		 { 
		        
                    get{ return this._apr_cPathPicture; }
        						set{ this._apr_cPathPicture = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_AccesosProveedores() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_AccesosProveedores(int Id, string Name, string apr_cNombre, string apr_cIdentificacion, string apr_cDireccion, string apr_cCodigoPostal, string apr_cLocalidad, int apr_iProvincia, string apr_cTelefono, int apr_iCategoria, DateTime? apr_tFechaAlta, int apr_iStatus, string apr_cObservaciones, string apr_cPathPicture) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._apr_cNombre = apr_cNombre;
this._apr_cIdentificacion = apr_cIdentificacion;
this._apr_cDireccion = apr_cDireccion;
this._apr_cCodigoPostal = apr_cCodigoPostal;
this._apr_cLocalidad = apr_cLocalidad;
this._apr_iProvincia = apr_iProvincia;
this._apr_cTelefono = apr_cTelefono;
this._apr_iCategoria = apr_iCategoria;
this._apr_tFechaAlta = apr_tFechaAlta;
this._apr_iStatus = apr_iStatus;
this._apr_cObservaciones = apr_cObservaciones;
this._apr_cPathPicture = apr_cPathPicture;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3227, "m_AccesosProveedores");
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
			Simplem_AccesosProveedores Simple = new Simplem_AccesosProveedores();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.apr_cNombre = this._apr_cNombre;
Simple.apr_cIdentificacion = this._apr_cIdentificacion;
Simple.apr_cDireccion = this._apr_cDireccion;
Simple.apr_cCodigoPostal = this._apr_cCodigoPostal;
Simple.apr_cLocalidad = this._apr_cLocalidad;
Simple.apr_iProvincia = this._apr_iProvincia;
Simple.apr_cTelefono = this._apr_cTelefono;
Simple.apr_iCategoria = this._apr_iCategoria;
Simple.apr_tFechaAlta = this._apr_tFechaAlta;
Simple.apr_iStatus = this._apr_iStatus;
Simple.apr_cObservaciones = this._apr_cObservaciones;
Simple.apr_cPathPicture = this._apr_cPathPicture;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_AccesosProveedores Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._apr_cNombre = Simple.apr_cNombre;
this._apr_cIdentificacion = Simple.apr_cIdentificacion;
this._apr_cDireccion = Simple.apr_cDireccion;
this._apr_cCodigoPostal = Simple.apr_cCodigoPostal;
this._apr_cLocalidad = Simple.apr_cLocalidad;
this._apr_iProvincia = Simple.apr_iProvincia;
this._apr_cTelefono = Simple.apr_cTelefono;
this._apr_iCategoria = Simple.apr_iCategoria;
this._apr_tFechaAlta = Simple.apr_tFechaAlta;
this._apr_iStatus = Simple.apr_iStatus;
this._apr_cObservaciones = Simple.apr_cObservaciones;
this._apr_cPathPicture = Simple.apr_cPathPicture;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_AccesosProveedores(SqlConfig, UserId, (Simplem_AccesosProveedores) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("apr_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cIdentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cDireccion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cCodigoPostal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cLocalidad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_iProvincia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apr_cTelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_iCategoria", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apr_tFechaAlta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("apr_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apr_cObservaciones", typeof (string)));               
							 dt.Columns.Add(new DataColumn("apr_cPathPicture", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apr_cNombre"] = this._apr_cNombre;
dr["apr_cIdentificacion"] = this._apr_cIdentificacion;
dr["apr_cDireccion"] = this._apr_cDireccion;
dr["apr_cCodigoPostal"] = this._apr_cCodigoPostal;
dr["apr_cLocalidad"] = this._apr_cLocalidad;
dr["apr_iProvincia"] = this._apr_iProvincia;
dr["apr_cTelefono"] = this._apr_cTelefono;
dr["apr_iCategoria"] = this._apr_iCategoria;
dr["apr_tFechaAlta"] = this._apr_tFechaAlta;
dr["apr_iStatus"] = this._apr_iStatus;
dr["apr_cObservaciones"] = this._apr_cObservaciones;
dr["apr_cPathPicture"] = this._apr_cPathPicture;
							 
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
