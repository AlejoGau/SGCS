
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
    public class CallerResourceModule : CallerObject
    { 	
				     private string _rmo_cNombre;
					
				     private int _rmo_iTypeId;
					
				     private string _rmo_cImagen;
					
				     private string _rmo_cObservacion;
					
				     private string _rmo_cMarcaModelo;
					
				     private string _rmo_cNumeroSerie;
					
				     private int _rmo_iCuentaId;
				 ///<summary>
     ///rmo_cNombre property   
     ///</summary>   
     public string rmo_cNombre 
		 { 
		        
                    get{ return this._rmo_cNombre; }
        						set{ this._rmo_cNombre = value; } 										
	   }
	  ///<summary>
     ///rmo_iTypeId property   
     ///</summary>   
     public int rmo_iTypeId 
		 { 
		        
                    get{ return this._rmo_iTypeId; }
        						set{ this._rmo_iTypeId = value; } 										
	   }
	  ///<summary>
     ///rmo_cImagen property   
     ///</summary>   
     public string rmo_cImagen 
		 { 
		        
                    get{ return this._rmo_cImagen; }
        						set{ this._rmo_cImagen = value; } 										
	   }
	  ///<summary>
     ///rmo_cObservacion property   
     ///</summary>   
     public string rmo_cObservacion 
		 { 
		        
                    get{ return this._rmo_cObservacion; }
        						set{ this._rmo_cObservacion = value; } 										
	   }
	  ///<summary>
     ///rmo_cMarcaModelo property   
     ///</summary>   
     public string rmo_cMarcaModelo 
		 { 
		        
                    get{ return this._rmo_cMarcaModelo; }
        						set{ this._rmo_cMarcaModelo = value; } 										
	   }
	  ///<summary>
     ///rmo_cNumeroSerie property   
     ///</summary>   
     public string rmo_cNumeroSerie 
		 { 
		        
                    get{ return this._rmo_cNumeroSerie; }
        						set{ this._rmo_cNumeroSerie = value; } 										
	   }
	  ///<summary>
     ///rmo_iCuentaId property   
     ///</summary>   
     public int rmo_iCuentaId 
		 { 
		        
                    get{ return this._rmo_iCuentaId; }
        						set{ this._rmo_iCuentaId = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerResourceModule() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerResourceModule(int Id, string Name, string rmo_cNombre, int rmo_iTypeId, string rmo_cImagen, string rmo_cObservacion, string rmo_cMarcaModelo, string rmo_cNumeroSerie, int rmo_iCuentaId) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rmo_cNombre = rmo_cNombre;
this._rmo_iTypeId = rmo_iTypeId;
this._rmo_cImagen = rmo_cImagen;
this._rmo_cObservacion = rmo_cObservacion;
this._rmo_cMarcaModelo = rmo_cMarcaModelo;
this._rmo_cNumeroSerie = rmo_cNumeroSerie;
this._rmo_iCuentaId = rmo_iCuentaId;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7057, "ResourceModule");
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
			SimpleResourceModule Simple = new SimpleResourceModule();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rmo_cNombre = this._rmo_cNombre;
Simple.rmo_iTypeId = this._rmo_iTypeId;
Simple.rmo_cImagen = this._rmo_cImagen;
Simple.rmo_cObservacion = this._rmo_cObservacion;
Simple.rmo_cMarcaModelo = this._rmo_cMarcaModelo;
Simple.rmo_cNumeroSerie = this._rmo_cNumeroSerie;
Simple.rmo_iCuentaId = this._rmo_iCuentaId;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleResourceModule Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rmo_cNombre = Simple.rmo_cNombre;
this._rmo_iTypeId = Simple.rmo_iTypeId;
this._rmo_cImagen = Simple.rmo_cImagen;
this._rmo_cObservacion = Simple.rmo_cObservacion;
this._rmo_cMarcaModelo = Simple.rmo_cMarcaModelo;
this._rmo_cNumeroSerie = Simple.rmo_cNumeroSerie;
this._rmo_iCuentaId = Simple.rmo_iCuentaId;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalResourceModule(SqlConfig, UserId, (SimpleResourceModule) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rmo_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_iTypeId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rmo_cImagen", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_cObservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_cMarcaModelo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_cNumeroSerie", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmo_iCuentaId", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rmo_cNombre"] = this._rmo_cNombre;
dr["rmo_iTypeId"] = this._rmo_iTypeId;
dr["rmo_cImagen"] = this._rmo_cImagen;
dr["rmo_cObservacion"] = this._rmo_cObservacion;
dr["rmo_cMarcaModelo"] = this._rmo_cMarcaModelo;
dr["rmo_cNumeroSerie"] = this._rmo_cNumeroSerie;
dr["rmo_iCuentaId"] = this._rmo_iCuentaId;
							 
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
