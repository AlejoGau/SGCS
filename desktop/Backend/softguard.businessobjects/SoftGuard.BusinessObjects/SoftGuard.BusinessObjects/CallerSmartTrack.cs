
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
    public class CallerSmartTrack : CallerObject
    { 	
				     private string _Telefono;
					
				     private string _Imei;
					
				     private string _Modelo;
					
				     private string _Marca;
					
				     private string _Version;
					
				     private string _Tipo;
					
				     private int _CuentaId;
					
				     private string _Nombre;
					
				     private string _Config;
					
				     private string _pushToken;
					
				     private string _AppType;
				 ///<summary>
     ///Telefono property   
     ///</summary>   
     public string Telefono 
		 { 
		        
                    get{ return this._Telefono; }
        						set{ this._Telefono = value; } 										
	   }
	  ///<summary>
     ///Imei property   
     ///</summary>   
     public string Imei 
		 { 
		        
                    get{ return this._Imei; }
        						set{ this._Imei = value; } 										
	   }
	  ///<summary>
     ///Modelo property   
     ///</summary>   
     public string Modelo 
		 { 
		        
                    get{ return this._Modelo; }
        						set{ this._Modelo = value; } 										
	   }
	  ///<summary>
     ///Marca property   
     ///</summary>   
     public string Marca 
		 { 
		        
                    get{ return this._Marca; }
        						set{ this._Marca = value; } 										
	   }
	  ///<summary>
     ///Version property   
     ///</summary>   
     public string Version 
		 { 
		        
                    get{ return this._Version; }
        						set{ this._Version = value; } 										
	   }
	  ///<summary>
     ///Tipo property   
     ///</summary>   
     public string Tipo 
		 { 
		        
                    get{ return this._Tipo; }
        						set{ this._Tipo = value; } 										
	   }
	  ///<summary>
     ///CuentaId property   
     ///</summary>   
     public int CuentaId 
		 { 
		        
                    get{ return this._CuentaId; }
        						set{ this._CuentaId = value; } 										
	   }
	  ///<summary>
     ///Nombre property   
     ///</summary>   
     public string Nombre 
		 { 
		        
                    get{ return this._Nombre; }
        						set{ this._Nombre = value; } 										
	   }
	  ///<summary>
     ///Config property   
     ///</summary>   
     public string Config 
		 { 
		        
                    get{ return this._Config; }
        						set{ this._Config = value; } 										
	   }
	  ///<summary>
     ///pushToken property   
     ///</summary>   
     public string pushToken 
		 { 
		        
                    get{ return this._pushToken; }
        						set{ this._pushToken = value; } 										
	   }
	  ///<summary>
     ///AppType property   
     ///</summary>   
     public string AppType 
		 { 
		        
                    get{ return this._AppType; }
        						set{ this._AppType = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerSmartTrack() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerSmartTrack(int Id, string Name, string Telefono, string Imei, string Modelo, string Marca, string Version, string Tipo, int CuentaId, string Nombre, string Config, string pushToken, string AppType) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._Telefono = Telefono;
this._Imei = Imei;
this._Modelo = Modelo;
this._Marca = Marca;
this._Version = Version;
this._Tipo = Tipo;
this._CuentaId = CuentaId;
this._Nombre = Nombre;
this._Config = Config;
this._pushToken = pushToken;
this._AppType = AppType;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3113, "SmartTrack");
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
			SimpleSmartTrack Simple = new SimpleSmartTrack();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.Telefono = this._Telefono;
Simple.Imei = this._Imei;
Simple.Modelo = this._Modelo;
Simple.Marca = this._Marca;
Simple.Version = this._Version;
Simple.Tipo = this._Tipo;
Simple.CuentaId = this._CuentaId;
Simple.Nombre = this._Nombre;
Simple.Config = this._Config;
Simple.pushToken = this._pushToken;
Simple.AppType = this._AppType;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleSmartTrack Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._Telefono = Simple.Telefono;
this._Imei = Simple.Imei;
this._Modelo = Simple.Modelo;
this._Marca = Simple.Marca;
this._Version = Simple.Version;
this._Tipo = Simple.Tipo;
this._CuentaId = Simple.CuentaId;
this._Nombre = Simple.Nombre;
this._Config = Simple.Config;
this._pushToken = Simple.pushToken;
this._AppType = Simple.AppType;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalSmartTrack(SqlConfig, UserId, (SimpleSmartTrack) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("Telefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Imei", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Modelo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Marca", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Version", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Tipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("CuentaId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("Nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("Config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pushToken", typeof (string)));               
							 dt.Columns.Add(new DataColumn("AppType", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["Telefono"] = this._Telefono;
dr["Imei"] = this._Imei;
dr["Modelo"] = this._Modelo;
dr["Marca"] = this._Marca;
dr["Version"] = this._Version;
dr["Tipo"] = this._Tipo;
dr["CuentaId"] = this._CuentaId;
dr["Nombre"] = this._Nombre;
dr["Config"] = this._Config;
dr["pushToken"] = this._pushToken;
dr["AppType"] = this._AppType;
							 
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
