
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
    public class CallerUsersDesktopWeb : CallerObject
    { 	
				     private int _udw_idKey;
					
				     private string _udw_usuario;
					
				     private string _udw_clave;
					
				     private string _udw_nombre;
					
				     private string _udw_apellido;
					
				     private string _udw_empresa;
					
				     private int _udw_tipo;
					
				     private int _udw_iperfil;
					
				     private Decimal _udw_estado;
					
				     private string _udw_metadata;
					
				     private int _udw_iloginfallido;
				 ///<summary>
     ///udw_idKey property   
     ///</summary>   
     public int udw_idKey 
		 { 
		        
                    get{ return this._udw_idKey; }
        						set{ this._udw_idKey = value; } 										
	   }
	  ///<summary>
     ///udw_usuario property   
     ///</summary>   
     public string udw_usuario 
		 { 
		        
                    get{ return this._udw_usuario; }
        						set{ this._udw_usuario = value; } 										
	   }
	  ///<summary>
     ///udw_clave property   
     ///</summary>   
     public string udw_clave 
		 { 
		        
                    get{ return this._udw_clave; }
        						set{ this._udw_clave = value; } 										
	   }
	  ///<summary>
     ///udw_nombre property   
     ///</summary>   
     public string udw_nombre 
		 { 
		        
                    get{ return this._udw_nombre; }
        						set{ this._udw_nombre = value; } 										
	   }
	  ///<summary>
     ///udw_apellido property   
     ///</summary>   
     public string udw_apellido 
		 { 
		        
                    get{ return this._udw_apellido; }
        						set{ this._udw_apellido = value; } 										
	   }
	  ///<summary>
     ///udw_empresa property   
     ///</summary>   
     public string udw_empresa 
		 { 
		        
                    get{ return this._udw_empresa; }
        						set{ this._udw_empresa = value; } 										
	   }
	  ///<summary>
     ///udw_tipo property   
     ///</summary>   
     public int udw_tipo 
		 { 
		        
                    get{ return this._udw_tipo; }
        						set{ this._udw_tipo = value; } 										
	   }
	  ///<summary>
     ///udw_iperfil property   
     ///</summary>   
     public int udw_iperfil 
		 { 
		        
                    get{ return this._udw_iperfil; }
        						set{ this._udw_iperfil = value; } 										
	   }
	  ///<summary>
     ///udw_estado property   
     ///</summary>   
     public Decimal udw_estado 
		 { 
		        
                    get{ return this._udw_estado; }
        						set{ this._udw_estado = value; } 										
	   }
	  ///<summary>
     ///udw_metadata property   
     ///</summary>   
     public string udw_metadata 
		 { 
		        
                    get{ return this._udw_metadata; }
        						set{ this._udw_metadata = value; } 										
	   }
	  ///<summary>
     ///udw_iloginfallido property   
     ///</summary>   
     public int udw_iloginfallido 
		 { 
		        
                    get{ return this._udw_iloginfallido; }
        						set{ this._udw_iloginfallido = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerUsersDesktopWeb() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerUsersDesktopWeb(int Id, string Name, int udw_idKey, string udw_usuario, string udw_clave, string udw_nombre, string udw_apellido, string udw_empresa, int udw_tipo, int udw_iperfil, Decimal udw_estado, string udw_metadata, int udw_iloginfallido) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._udw_idKey = udw_idKey;
this._udw_usuario = udw_usuario;
this._udw_clave = udw_clave;
this._udw_nombre = udw_nombre;
this._udw_apellido = udw_apellido;
this._udw_empresa = udw_empresa;
this._udw_tipo = udw_tipo;
this._udw_iperfil = udw_iperfil;
this._udw_estado = udw_estado;
this._udw_metadata = udw_metadata;
this._udw_iloginfallido = udw_iloginfallido;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3050, "UsersDesktopWeb");
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
			SimpleUsersDesktopWeb Simple = new SimpleUsersDesktopWeb();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.udw_idKey = this._udw_idKey;
Simple.udw_usuario = this._udw_usuario;
Simple.udw_clave = this._udw_clave;
Simple.udw_nombre = this._udw_nombre;
Simple.udw_apellido = this._udw_apellido;
Simple.udw_empresa = this._udw_empresa;
Simple.udw_tipo = this._udw_tipo;
Simple.udw_iperfil = this._udw_iperfil;
Simple.udw_estado = this._udw_estado;
Simple.udw_metadata = this._udw_metadata;
Simple.udw_iloginfallido = this._udw_iloginfallido;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleUsersDesktopWeb Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._udw_idKey = Simple.udw_idKey;
this._udw_usuario = Simple.udw_usuario;
this._udw_clave = Simple.udw_clave;
this._udw_nombre = Simple.udw_nombre;
this._udw_apellido = Simple.udw_apellido;
this._udw_empresa = Simple.udw_empresa;
this._udw_tipo = Simple.udw_tipo;
this._udw_iperfil = Simple.udw_iperfil;
this._udw_estado = Simple.udw_estado;
this._udw_metadata = Simple.udw_metadata;
this._udw_iloginfallido = Simple.udw_iloginfallido;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalUsersDesktopWeb(SqlConfig, UserId, (SimpleUsersDesktopWeb) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("udw_idKey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("udw_usuario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_clave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_apellido", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_empresa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("udw_iperfil", typeof (int)));               
							 dt.Columns.Add(new DataColumn("udw_estado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("udw_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("udw_iloginfallido", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["udw_idKey"] = this._udw_idKey;
dr["udw_usuario"] = this._udw_usuario;
dr["udw_clave"] = this._udw_clave;
dr["udw_nombre"] = this._udw_nombre;
dr["udw_apellido"] = this._udw_apellido;
dr["udw_empresa"] = this._udw_empresa;
dr["udw_tipo"] = this._udw_tipo;
dr["udw_iperfil"] = this._udw_iperfil;
dr["udw_estado"] = this._udw_estado;
dr["udw_metadata"] = this._udw_metadata;
dr["udw_iloginfallido"] = this._udw_iloginfallido;
							 
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
