
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
    public class CallerReporteAutoridades : CallerObject
    { 	
				     private string _rep_cautoridad;
					
				     private int _rep_iidcuenta;
					
				     private string _rep_calarma;
					
				     private DateTime? _rep_dfechahora;
					
				     private string _rep_mcomentario;
					
				     private Decimal _rep_nestado;
					
				     private DateTime? _rep_dresolfechahora;
					
				     private string _rep_czona;
					
				     private int _rep_iidrecepcion;
					
				     private int _rep_iresolucion;
					
				     private int _rep_icategorizacion;
				 ///<summary>
     ///rep_cautoridad property   
     ///</summary>   
     public string rep_cautoridad 
		 { 
		        
                    get{ return this._rep_cautoridad; }
        						set{ this._rep_cautoridad = value; } 										
	   }
	  ///<summary>
     ///rep_iidcuenta property   
     ///</summary>   
     public int rep_iidcuenta 
		 { 
		        
                    get{ return this._rep_iidcuenta; }
        						set{ this._rep_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///rep_calarma property   
     ///</summary>   
     public string rep_calarma 
		 { 
		        
                    get{ return this._rep_calarma; }
        						set{ this._rep_calarma = value; } 										
	   }
	  ///<summary>
     ///rep_dfechahora property   
     ///</summary>   
     public DateTime? rep_dfechahora 
		 { 
		        
                    get{ return this._rep_dfechahora; }
        						set{ this._rep_dfechahora = value; } 										
	   }
	  ///<summary>
     ///rep_mcomentario property   
     ///</summary>   
     public string rep_mcomentario 
		 { 
		        
                    get{ return this._rep_mcomentario; }
        						set{ this._rep_mcomentario = value; } 										
	   }
	  ///<summary>
     ///rep_nestado property   
     ///</summary>   
     public Decimal rep_nestado 
		 { 
		        
                    get{ return this._rep_nestado; }
        						set{ this._rep_nestado = value; } 										
	   }
	  ///<summary>
     ///rep_dresolfechahora property   
     ///</summary>   
     public DateTime? rep_dresolfechahora 
		 { 
		        
                    get{ return this._rep_dresolfechahora; }
        						set{ this._rep_dresolfechahora = value; } 										
	   }
	  ///<summary>
     ///rep_czona property   
     ///</summary>   
     public string rep_czona 
		 { 
		        
                    get{ return this._rep_czona; }
        						set{ this._rep_czona = value; } 										
	   }
	  ///<summary>
     ///rep_iidrecepcion property   
     ///</summary>   
     public int rep_iidrecepcion 
		 { 
		        
                    get{ return this._rep_iidrecepcion; }
        						set{ this._rep_iidrecepcion = value; } 										
	   }
	  ///<summary>
     ///rep_iresolucion property   
     ///</summary>   
     public int rep_iresolucion 
		 { 
		        
                    get{ return this._rep_iresolucion; }
        						set{ this._rep_iresolucion = value; } 										
	   }
	  ///<summary>
     ///rep_icategorizacion property   
     ///</summary>   
     public int rep_icategorizacion 
		 { 
		        
                    get{ return this._rep_icategorizacion; }
        						set{ this._rep_icategorizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerReporteAutoridades() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerReporteAutoridades(int Id, string Name, string rep_cautoridad, int rep_iidcuenta, string rep_calarma, DateTime? rep_dfechahora, string rep_mcomentario, Decimal rep_nestado, DateTime? rep_dresolfechahora, string rep_czona, int rep_iidrecepcion, int rep_iresolucion, int rep_icategorizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rep_cautoridad = rep_cautoridad;
this._rep_iidcuenta = rep_iidcuenta;
this._rep_calarma = rep_calarma;
this._rep_dfechahora = rep_dfechahora;
this._rep_mcomentario = rep_mcomentario;
this._rep_nestado = rep_nestado;
this._rep_dresolfechahora = rep_dresolfechahora;
this._rep_czona = rep_czona;
this._rep_iidrecepcion = rep_iidrecepcion;
this._rep_iresolucion = rep_iresolucion;
this._rep_icategorizacion = rep_icategorizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3052, "ReporteAutoridades");
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
			SimpleReporteAutoridades Simple = new SimpleReporteAutoridades();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rep_cautoridad = this._rep_cautoridad;
Simple.rep_iidcuenta = this._rep_iidcuenta;
Simple.rep_calarma = this._rep_calarma;
Simple.rep_dfechahora = this._rep_dfechahora;
Simple.rep_mcomentario = this._rep_mcomentario;
Simple.rep_nestado = this._rep_nestado;
Simple.rep_dresolfechahora = this._rep_dresolfechahora;
Simple.rep_czona = this._rep_czona;
Simple.rep_iidrecepcion = this._rep_iidrecepcion;
Simple.rep_iresolucion = this._rep_iresolucion;
Simple.rep_icategorizacion = this._rep_icategorizacion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleReporteAutoridades Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rep_cautoridad = Simple.rep_cautoridad;
this._rep_iidcuenta = Simple.rep_iidcuenta;
this._rep_calarma = Simple.rep_calarma;
this._rep_dfechahora = Simple.rep_dfechahora;
this._rep_mcomentario = Simple.rep_mcomentario;
this._rep_nestado = Simple.rep_nestado;
this._rep_dresolfechahora = Simple.rep_dresolfechahora;
this._rep_czona = Simple.rep_czona;
this._rep_iidrecepcion = Simple.rep_iidrecepcion;
this._rep_iresolucion = Simple.rep_iresolucion;
this._rep_icategorizacion = Simple.rep_icategorizacion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalReporteAutoridades(SqlConfig, UserId, (SimpleReporteAutoridades) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rep_cautoridad", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_dfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rep_mcomentario", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("rep_dresolfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rep_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rep_iidrecepcion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_iresolucion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rep_icategorizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rep_cautoridad"] = this._rep_cautoridad;
dr["rep_iidcuenta"] = this._rep_iidcuenta;
dr["rep_calarma"] = this._rep_calarma;
dr["rep_dfechahora"] = this._rep_dfechahora;
dr["rep_mcomentario"] = this._rep_mcomentario;
dr["rep_nestado"] = this._rep_nestado;
dr["rep_dresolfechahora"] = this._rep_dresolfechahora;
dr["rep_czona"] = this._rep_czona;
dr["rep_iidrecepcion"] = this._rep_iidrecepcion;
dr["rep_iresolucion"] = this._rep_iresolucion;
dr["rep_icategorizacion"] = this._rep_icategorizacion;
							 
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
