
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
    public class Callert_organizacion_fc : CallerObject
    { 	
				     private string _org_cnombre;
					
				     private string _org_ccallefiscal;
					
				     private string _org_clocalidadfiscal;
					
				     private string _org_cprovinciafiscal;
					
				     private string _org_ccodigopostalfiscal;
					
				     private string _org_ctelefono;
					
				     private string _org_cmail;
					
				     private string _org_ccategoriaimpositiva;
					
				     private string _org_cidentificacion;
					
				     private string _org_cinicioactividades;
					
				     private string _org_cempresacb;
					
				     private string _org_cheadercbte;
					
				     private string _org_csymbol;
					
				     private string _org_cmetadata;
					
				     private string _org_factelect;
					
				     private int _org_organizacionId;
				 ///<summary>
     ///org_cnombre property   
     ///</summary>   
     public string org_cnombre 
		 { 
		        
                    get{ return this._org_cnombre; }
        						set{ this._org_cnombre = value; } 										
	   }
	  ///<summary>
     ///org_ccallefiscal property   
     ///</summary>   
     public string org_ccallefiscal 
		 { 
		        
                    get{ return this._org_ccallefiscal; }
        						set{ this._org_ccallefiscal = value; } 										
	   }
	  ///<summary>
     ///org_clocalidadfiscal property   
     ///</summary>   
     public string org_clocalidadfiscal 
		 { 
		        
                    get{ return this._org_clocalidadfiscal; }
        						set{ this._org_clocalidadfiscal = value; } 										
	   }
	  ///<summary>
     ///org_cprovinciafiscal property   
     ///</summary>   
     public string org_cprovinciafiscal 
		 { 
		        
                    get{ return this._org_cprovinciafiscal; }
        						set{ this._org_cprovinciafiscal = value; } 										
	   }
	  ///<summary>
     ///org_ccodigopostalfiscal property   
     ///</summary>   
     public string org_ccodigopostalfiscal 
		 { 
		        
                    get{ return this._org_ccodigopostalfiscal; }
        						set{ this._org_ccodigopostalfiscal = value; } 										
	   }
	  ///<summary>
     ///org_ctelefono property   
     ///</summary>   
     public string org_ctelefono 
		 { 
		        
                    get{ return this._org_ctelefono; }
        						set{ this._org_ctelefono = value; } 										
	   }
	  ///<summary>
     ///org_cmail property   
     ///</summary>   
     public string org_cmail 
		 { 
		        
                    get{ return this._org_cmail; }
        						set{ this._org_cmail = value; } 										
	   }
	  ///<summary>
     ///org_ccategoriaimpositiva property   
     ///</summary>   
     public string org_ccategoriaimpositiva 
		 { 
		        
                    get{ return this._org_ccategoriaimpositiva; }
        						set{ this._org_ccategoriaimpositiva = value; } 										
	   }
	  ///<summary>
     ///org_cidentificacion property   
     ///</summary>   
     public string org_cidentificacion 
		 { 
		        
                    get{ return this._org_cidentificacion; }
        						set{ this._org_cidentificacion = value; } 										
	   }
	  ///<summary>
     ///org_cinicioactividades property   
     ///</summary>   
     public string org_cinicioactividades 
		 { 
		        
                    get{ return this._org_cinicioactividades; }
        						set{ this._org_cinicioactividades = value; } 										
	   }
	  ///<summary>
     ///org_cempresacb property   
     ///</summary>   
     public string org_cempresacb 
		 { 
		        
                    get{ return this._org_cempresacb; }
        						set{ this._org_cempresacb = value; } 										
	   }
	  ///<summary>
     ///org_cheadercbte property   
     ///</summary>   
     public string org_cheadercbte 
		 { 
		        
                    get{ return this._org_cheadercbte; }
        						set{ this._org_cheadercbte = value; } 										
	   }
	  ///<summary>
     ///org_csymbol property   
     ///</summary>   
     public string org_csymbol 
		 { 
		        
                    get{ return this._org_csymbol; }
        						set{ this._org_csymbol = value; } 										
	   }
	  ///<summary>
     ///org_cmetadata property   
     ///</summary>   
     public string org_cmetadata 
		 { 
		        
                    get{ return this._org_cmetadata; }
        						set{ this._org_cmetadata = value; } 										
	   }
	  ///<summary>
     ///org_factelect property   
     ///</summary>   
     public string org_factelect 
		 { 
		        
                    get{ return this._org_factelect; }
        						set{ this._org_factelect = value; } 										
	   }
	  ///<summary>
     ///org_organizacionId property   
     ///</summary>   
     public int org_organizacionId 
		 { 
		        
                    get{ return this._org_organizacionId; }
        						set{ this._org_organizacionId = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_organizacion_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_organizacion_fc(int Id, string Name, string org_cnombre, string org_ccallefiscal, string org_clocalidadfiscal, string org_cprovinciafiscal, string org_ccodigopostalfiscal, string org_ctelefono, string org_cmail, string org_ccategoriaimpositiva, string org_cidentificacion, string org_cinicioactividades, string org_cempresacb, string org_cheadercbte, string org_csymbol, string org_cmetadata, string org_factelect, int org_organizacionId) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._org_cnombre = org_cnombre;
this._org_ccallefiscal = org_ccallefiscal;
this._org_clocalidadfiscal = org_clocalidadfiscal;
this._org_cprovinciafiscal = org_cprovinciafiscal;
this._org_ccodigopostalfiscal = org_ccodigopostalfiscal;
this._org_ctelefono = org_ctelefono;
this._org_cmail = org_cmail;
this._org_ccategoriaimpositiva = org_ccategoriaimpositiva;
this._org_cidentificacion = org_cidentificacion;
this._org_cinicioactividades = org_cinicioactividades;
this._org_cempresacb = org_cempresacb;
this._org_cheadercbte = org_cheadercbte;
this._org_csymbol = org_csymbol;
this._org_cmetadata = org_cmetadata;
this._org_factelect = org_factelect;
this._org_organizacionId = org_organizacionId;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3147, "t_organizacion_fc");
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
			Simplet_organizacion_fc Simple = new Simplet_organizacion_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.org_cnombre = this._org_cnombre;
Simple.org_ccallefiscal = this._org_ccallefiscal;
Simple.org_clocalidadfiscal = this._org_clocalidadfiscal;
Simple.org_cprovinciafiscal = this._org_cprovinciafiscal;
Simple.org_ccodigopostalfiscal = this._org_ccodigopostalfiscal;
Simple.org_ctelefono = this._org_ctelefono;
Simple.org_cmail = this._org_cmail;
Simple.org_ccategoriaimpositiva = this._org_ccategoriaimpositiva;
Simple.org_cidentificacion = this._org_cidentificacion;
Simple.org_cinicioactividades = this._org_cinicioactividades;
Simple.org_cempresacb = this._org_cempresacb;
Simple.org_cheadercbte = this._org_cheadercbte;
Simple.org_csymbol = this._org_csymbol;
Simple.org_cmetadata = this._org_cmetadata;
Simple.org_factelect = this._org_factelect;
Simple.org_organizacionId = this._org_organizacionId;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_organizacion_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._org_cnombre = Simple.org_cnombre;
this._org_ccallefiscal = Simple.org_ccallefiscal;
this._org_clocalidadfiscal = Simple.org_clocalidadfiscal;
this._org_cprovinciafiscal = Simple.org_cprovinciafiscal;
this._org_ccodigopostalfiscal = Simple.org_ccodigopostalfiscal;
this._org_ctelefono = Simple.org_ctelefono;
this._org_cmail = Simple.org_cmail;
this._org_ccategoriaimpositiva = Simple.org_ccategoriaimpositiva;
this._org_cidentificacion = Simple.org_cidentificacion;
this._org_cinicioactividades = Simple.org_cinicioactividades;
this._org_cempresacb = Simple.org_cempresacb;
this._org_cheadercbte = Simple.org_cheadercbte;
this._org_csymbol = Simple.org_csymbol;
this._org_cmetadata = Simple.org_cmetadata;
this._org_factelect = Simple.org_factelect;
this._org_organizacionId = Simple.org_organizacionId;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_organizacion_fc(SqlConfig, UserId, (Simplet_organizacion_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("org_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ccallefiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_clocalidadfiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cprovinciafiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ccodigopostalfiscal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_ccategoriaimpositiva", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cidentificacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cinicioactividades", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cempresacb", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cheadercbte", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_csymbol", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_cmetadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_factelect", typeof (string)));               
							 dt.Columns.Add(new DataColumn("org_organizacionId", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["org_cnombre"] = this._org_cnombre;
dr["org_ccallefiscal"] = this._org_ccallefiscal;
dr["org_clocalidadfiscal"] = this._org_clocalidadfiscal;
dr["org_cprovinciafiscal"] = this._org_cprovinciafiscal;
dr["org_ccodigopostalfiscal"] = this._org_ccodigopostalfiscal;
dr["org_ctelefono"] = this._org_ctelefono;
dr["org_cmail"] = this._org_cmail;
dr["org_ccategoriaimpositiva"] = this._org_ccategoriaimpositiva;
dr["org_cidentificacion"] = this._org_cidentificacion;
dr["org_cinicioactividades"] = this._org_cinicioactividades;
dr["org_cempresacb"] = this._org_cempresacb;
dr["org_cheadercbte"] = this._org_cheadercbte;
dr["org_csymbol"] = this._org_csymbol;
dr["org_cmetadata"] = this._org_cmetadata;
dr["org_factelect"] = this._org_factelect;
dr["org_organizacionId"] = this._org_organizacionId;
							 
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
