
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
    public class Callert_TG_mantenimiento_servicios : CallerObject
    { 	
				     private string _tgms_cnombre;
					
				     private string _tgms_cdescripcion;
					
				     private int _tgms_kilometros;
					
				     private int _tgms_meses;
					
				     private int _tgms_iorganizacion;
					
				     private int _tgms_iestado;
					
				     private int _tgms_icuentatipo;
				 ///<summary>
     ///tgms_cnombre property   
     ///</summary>   
     public string tgms_cnombre 
		 { 
		        
                    get{ return this._tgms_cnombre; }
        						set{ this._tgms_cnombre = value; } 										
	   }
	  ///<summary>
     ///tgms_cdescripcion property   
     ///</summary>   
     public string tgms_cdescripcion 
		 { 
		        
                    get{ return this._tgms_cdescripcion; }
        						set{ this._tgms_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///tgms_kilometros property   
     ///</summary>   
     public int tgms_kilometros 
		 { 
		        
                    get{ return this._tgms_kilometros; }
        						set{ this._tgms_kilometros = value; } 										
	   }
	  ///<summary>
     ///tgms_meses property   
     ///</summary>   
     public int tgms_meses 
		 { 
		        
                    get{ return this._tgms_meses; }
        						set{ this._tgms_meses = value; } 										
	   }
	  ///<summary>
     ///tgms_iorganizacion property   
     ///</summary>   
     public int tgms_iorganizacion 
		 { 
		        
                    get{ return this._tgms_iorganizacion; }
        						set{ this._tgms_iorganizacion = value; } 										
	   }
	  ///<summary>
     ///tgms_iestado property   
     ///</summary>   
     public int tgms_iestado 
		 { 
		        
                    get{ return this._tgms_iestado; }
        						set{ this._tgms_iestado = value; } 										
	   }
	  ///<summary>
     ///tgms_icuentatipo property   
     ///</summary>   
     public int tgms_icuentatipo 
		 { 
		        
                    get{ return this._tgms_icuentatipo; }
        						set{ this._tgms_icuentatipo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_TG_mantenimiento_servicios() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_TG_mantenimiento_servicios(int Id, string Name, string tgms_cnombre, string tgms_cdescripcion, int tgms_kilometros, int tgms_meses, int tgms_iorganizacion, int tgms_iestado, int tgms_icuentatipo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tgms_cnombre = tgms_cnombre;
this._tgms_cdescripcion = tgms_cdescripcion;
this._tgms_kilometros = tgms_kilometros;
this._tgms_meses = tgms_meses;
this._tgms_iorganizacion = tgms_iorganizacion;
this._tgms_iestado = tgms_iestado;
this._tgms_icuentatipo = tgms_icuentatipo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3187, "t_TG_mantenimiento_servicios");
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
			Simplet_TG_mantenimiento_servicios Simple = new Simplet_TG_mantenimiento_servicios();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tgms_cnombre = this._tgms_cnombre;
Simple.tgms_cdescripcion = this._tgms_cdescripcion;
Simple.tgms_kilometros = this._tgms_kilometros;
Simple.tgms_meses = this._tgms_meses;
Simple.tgms_iorganizacion = this._tgms_iorganizacion;
Simple.tgms_iestado = this._tgms_iestado;
Simple.tgms_icuentatipo = this._tgms_icuentatipo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_TG_mantenimiento_servicios Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tgms_cnombre = Simple.tgms_cnombre;
this._tgms_cdescripcion = Simple.tgms_cdescripcion;
this._tgms_kilometros = Simple.tgms_kilometros;
this._tgms_meses = Simple.tgms_meses;
this._tgms_iorganizacion = Simple.tgms_iorganizacion;
this._tgms_iestado = Simple.tgms_iestado;
this._tgms_icuentatipo = Simple.tgms_icuentatipo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_TG_mantenimiento_servicios(SqlConfig, UserId, (Simplet_TG_mantenimiento_servicios) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tgms_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgms_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tgms_kilometros", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_meses", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_iorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_iestado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tgms_icuentatipo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tgms_cnombre"] = this._tgms_cnombre;
dr["tgms_cdescripcion"] = this._tgms_cdescripcion;
dr["tgms_kilometros"] = this._tgms_kilometros;
dr["tgms_meses"] = this._tgms_meses;
dr["tgms_iorganizacion"] = this._tgms_iorganizacion;
dr["tgms_iestado"] = this._tgms_iestado;
dr["tgms_icuentatipo"] = this._tgms_icuentatipo;
							 
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
