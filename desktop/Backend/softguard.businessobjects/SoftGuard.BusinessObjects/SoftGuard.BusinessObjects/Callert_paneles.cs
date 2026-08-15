
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
    public class Callert_paneles : CallerObject
    { 	
				     private string _pan_ccodigo;
					
				     private string _pan_cdescripcion;
					
				     private string _pan_mobservacion;
					
				     private Decimal _pan_nesgprs;
					
				     private int _pan_iModelo;
					
				     private string _pan_cImagen;
				 ///<summary>
     ///pan_ccodigo property   
     ///</summary>   
     public string pan_ccodigo 
		 { 
		        
                    get{ return this._pan_ccodigo; }
        						set{ this._pan_ccodigo = value; } 										
	   }
	  ///<summary>
     ///pan_cdescripcion property   
     ///</summary>   
     public string pan_cdescripcion 
		 { 
		        
                    get{ return this._pan_cdescripcion; }
        						set{ this._pan_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///pan_mobservacion property   
     ///</summary>   
     public string pan_mobservacion 
		 { 
		        
                    get{ return this._pan_mobservacion; }
        						set{ this._pan_mobservacion = value; } 										
	   }
	  ///<summary>
     ///pan_nesgprs property   
     ///</summary>   
     public Decimal pan_nesgprs 
		 { 
		        
                    get{ return this._pan_nesgprs; }
        						set{ this._pan_nesgprs = value; } 										
	   }
	  ///<summary>
     ///pan_iModelo property   
     ///</summary>   
     public int pan_iModelo 
		 { 
		        
                    get{ return this._pan_iModelo; }
        						set{ this._pan_iModelo = value; } 										
	   }
	  ///<summary>
     ///pan_cImagen property   
     ///</summary>   
     public string pan_cImagen 
		 { 
		        
                    get{ return this._pan_cImagen; }
        						set{ this._pan_cImagen = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_paneles() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_paneles(int Id, string Name, string pan_ccodigo, string pan_cdescripcion, string pan_mobservacion, Decimal pan_nesgprs, int pan_iModelo, string pan_cImagen) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._pan_ccodigo = pan_ccodigo;
this._pan_cdescripcion = pan_cdescripcion;
this._pan_mobservacion = pan_mobservacion;
this._pan_nesgprs = pan_nesgprs;
this._pan_iModelo = pan_iModelo;
this._pan_cImagen = pan_cImagen;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3072, "t_paneles");
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
			Simplet_paneles Simple = new Simplet_paneles();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.pan_ccodigo = this._pan_ccodigo;
Simple.pan_cdescripcion = this._pan_cdescripcion;
Simple.pan_mobservacion = this._pan_mobservacion;
Simple.pan_nesgprs = this._pan_nesgprs;
Simple.pan_iModelo = this._pan_iModelo;
Simple.pan_cImagen = this._pan_cImagen;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_paneles Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._pan_ccodigo = Simple.pan_ccodigo;
this._pan_cdescripcion = Simple.pan_cdescripcion;
this._pan_mobservacion = Simple.pan_mobservacion;
this._pan_nesgprs = Simple.pan_nesgprs;
this._pan_iModelo = Simple.pan_iModelo;
this._pan_cImagen = Simple.pan_cImagen;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_paneles(SqlConfig, UserId, (Simplet_paneles) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("pan_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_mobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pan_nesgprs", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("pan_iModelo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pan_cImagen", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pan_ccodigo"] = this._pan_ccodigo;
dr["pan_cdescripcion"] = this._pan_cdescripcion;
dr["pan_mobservacion"] = this._pan_mobservacion;
dr["pan_nesgprs"] = this._pan_nesgprs;
dr["pan_iModelo"] = this._pan_iModelo;
dr["pan_cImagen"] = this._pan_cImagen;
							 
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
