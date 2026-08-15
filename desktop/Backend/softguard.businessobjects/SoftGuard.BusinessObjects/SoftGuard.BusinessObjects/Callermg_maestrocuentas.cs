
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
    public class Callermg_maestrocuentas : CallerObject
    { 	
				     private int _mgmc_idorganizacion;
					
				     private string _mgmc_ccodigo;
					
				     private string _mgmc_descripcion;
					
				     private string _mgmc_ctipo;
					
				     private DateTime? _mgmc_lastupdate;
					
				     private Decimal _mgmc_saldo;
					
				     private string _mgmc_moncodigo;
					
				     private string _mgmc_metadata;
					
				     private int _mgmc_capitulo;
					
				     private int _mgmc_rubro;
					
				     private int _mgmc_subrubro;
					
				     private int _mgmc_imputacion;
				 ///<summary>
     ///mgmc_idorganizacion property   
     ///</summary>   
     public int mgmc_idorganizacion 
		 { 
		        
                    get{ return this._mgmc_idorganizacion; }
        						set{ this._mgmc_idorganizacion = value; } 										
	   }
	  ///<summary>
     ///mgmc_ccodigo property   
     ///</summary>   
     public string mgmc_ccodigo 
		 { 
		        
                    get{ return this._mgmc_ccodigo; }
        						set{ this._mgmc_ccodigo = value; } 										
	   }
	  ///<summary>
     ///mgmc_descripcion property   
     ///</summary>   
     public string mgmc_descripcion 
		 { 
		        
                    get{ return this._mgmc_descripcion; }
        						set{ this._mgmc_descripcion = value; } 										
	   }
	  ///<summary>
     ///mgmc_ctipo property   
     ///</summary>   
     public string mgmc_ctipo 
		 { 
		        
                    get{ return this._mgmc_ctipo; }
        						set{ this._mgmc_ctipo = value; } 										
	   }
	  ///<summary>
     ///mgmc_lastupdate property   
     ///</summary>   
     public DateTime? mgmc_lastupdate 
		 { 
		        
                    get{ return this._mgmc_lastupdate; }
        						set{ this._mgmc_lastupdate = value; } 										
	   }
	  ///<summary>
     ///mgmc_saldo property   
     ///</summary>   
     public Decimal mgmc_saldo 
		 { 
		        
                    get{ return this._mgmc_saldo; }
        						set{ this._mgmc_saldo = value; } 										
	   }
	  ///<summary>
     ///mgmc_moncodigo property   
     ///</summary>   
     public string mgmc_moncodigo 
		 { 
		        
                    get{ return this._mgmc_moncodigo; }
        						set{ this._mgmc_moncodigo = value; } 										
	   }
	  ///<summary>
     ///mgmc_metadata property   
     ///</summary>   
     public string mgmc_metadata 
		 { 
		        
                    get{ return this._mgmc_metadata; }
        						set{ this._mgmc_metadata = value; } 										
	   }
	  ///<summary>
     ///mgmc_capitulo property   
     ///</summary>   
     public int mgmc_capitulo 
		 { 
		        
                    get{ return this._mgmc_capitulo; }
        						set{ this._mgmc_capitulo = value; } 										
	   }
	  ///<summary>
     ///mgmc_rubro property   
     ///</summary>   
     public int mgmc_rubro 
		 { 
		        
                    get{ return this._mgmc_rubro; }
        						set{ this._mgmc_rubro = value; } 										
	   }
	  ///<summary>
     ///mgmc_subrubro property   
     ///</summary>   
     public int mgmc_subrubro 
		 { 
		        
                    get{ return this._mgmc_subrubro; }
        						set{ this._mgmc_subrubro = value; } 										
	   }
	  ///<summary>
     ///mgmc_imputacion property   
     ///</summary>   
     public int mgmc_imputacion 
		 { 
		        
                    get{ return this._mgmc_imputacion; }
        						set{ this._mgmc_imputacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callermg_maestrocuentas() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callermg_maestrocuentas(int Id, string Name, int mgmc_idorganizacion, string mgmc_ccodigo, string mgmc_descripcion, string mgmc_ctipo, DateTime? mgmc_lastupdate, Decimal mgmc_saldo, string mgmc_moncodigo, string mgmc_metadata, int mgmc_capitulo, int mgmc_rubro, int mgmc_subrubro, int mgmc_imputacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mgmc_idorganizacion = mgmc_idorganizacion;
this._mgmc_ccodigo = mgmc_ccodigo;
this._mgmc_descripcion = mgmc_descripcion;
this._mgmc_ctipo = mgmc_ctipo;
this._mgmc_lastupdate = mgmc_lastupdate;
this._mgmc_saldo = mgmc_saldo;
this._mgmc_moncodigo = mgmc_moncodigo;
this._mgmc_metadata = mgmc_metadata;
this._mgmc_capitulo = mgmc_capitulo;
this._mgmc_rubro = mgmc_rubro;
this._mgmc_subrubro = mgmc_subrubro;
this._mgmc_imputacion = mgmc_imputacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3211, "mg_maestrocuentas");
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
			Simplemg_maestrocuentas Simple = new Simplemg_maestrocuentas();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mgmc_idorganizacion = this._mgmc_idorganizacion;
Simple.mgmc_ccodigo = this._mgmc_ccodigo;
Simple.mgmc_descripcion = this._mgmc_descripcion;
Simple.mgmc_ctipo = this._mgmc_ctipo;
Simple.mgmc_lastupdate = this._mgmc_lastupdate;
Simple.mgmc_saldo = this._mgmc_saldo;
Simple.mgmc_moncodigo = this._mgmc_moncodigo;
Simple.mgmc_metadata = this._mgmc_metadata;
Simple.mgmc_capitulo = this._mgmc_capitulo;
Simple.mgmc_rubro = this._mgmc_rubro;
Simple.mgmc_subrubro = this._mgmc_subrubro;
Simple.mgmc_imputacion = this._mgmc_imputacion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplemg_maestrocuentas Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mgmc_idorganizacion = Simple.mgmc_idorganizacion;
this._mgmc_ccodigo = Simple.mgmc_ccodigo;
this._mgmc_descripcion = Simple.mgmc_descripcion;
this._mgmc_ctipo = Simple.mgmc_ctipo;
this._mgmc_lastupdate = Simple.mgmc_lastupdate;
this._mgmc_saldo = Simple.mgmc_saldo;
this._mgmc_moncodigo = Simple.mgmc_moncodigo;
this._mgmc_metadata = Simple.mgmc_metadata;
this._mgmc_capitulo = Simple.mgmc_capitulo;
this._mgmc_rubro = Simple.mgmc_rubro;
this._mgmc_subrubro = Simple.mgmc_subrubro;
this._mgmc_imputacion = Simple.mgmc_imputacion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalmg_maestrocuentas(SqlConfig, UserId, (Simplemg_maestrocuentas) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mgmc_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_lastupdate", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mgmc_saldo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("mgmc_moncodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mgmc_capitulo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_rubro", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_subrubro", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mgmc_imputacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mgmc_idorganizacion"] = this._mgmc_idorganizacion;
dr["mgmc_ccodigo"] = this._mgmc_ccodigo;
dr["mgmc_descripcion"] = this._mgmc_descripcion;
dr["mgmc_ctipo"] = this._mgmc_ctipo;
dr["mgmc_lastupdate"] = this._mgmc_lastupdate;
dr["mgmc_saldo"] = this._mgmc_saldo;
dr["mgmc_moncodigo"] = this._mgmc_moncodigo;
dr["mgmc_metadata"] = this._mgmc_metadata;
dr["mgmc_capitulo"] = this._mgmc_capitulo;
dr["mgmc_rubro"] = this._mgmc_rubro;
dr["mgmc_subrubro"] = this._mgmc_subrubro;
dr["mgmc_imputacion"] = this._mgmc_imputacion;
							 
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
