
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
    public class Callerp_grabacion_audio : CallerObject
    { 	
				     private int _gra_iidcuenta;
					
				     private int _gra_iidrecepcion;
					
				     private DateTime? _gra_dfechahora;
					
				     private string _gra_carchivo;
					
				     private Decimal _gra_nduracion;
					
				     private int _gra_ioperador;
					
				     private string _gra_cterminal;
					
				     private Decimal _gra_nestado;
					
				     private string _gra_ctelefono;
				 ///<summary>
     ///gra_iidcuenta property   
     ///</summary>   
     public int gra_iidcuenta 
		 { 
		        
                    get{ return this._gra_iidcuenta; }
        						set{ this._gra_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///gra_iidrecepcion property   
     ///</summary>   
     public int gra_iidrecepcion 
		 { 
		        
                    get{ return this._gra_iidrecepcion; }
        						set{ this._gra_iidrecepcion = value; } 										
	   }
	  ///<summary>
     ///gra_dfechahora property   
     ///</summary>   
     public DateTime? gra_dfechahora 
		 { 
		        
                    get{ return this._gra_dfechahora; }
        						set{ this._gra_dfechahora = value; } 										
	   }
	  ///<summary>
     ///gra_carchivo property   
     ///</summary>   
     public string gra_carchivo 
		 { 
		        
                    get{ return this._gra_carchivo; }
        						set{ this._gra_carchivo = value; } 										
	   }
	  ///<summary>
     ///gra_nduracion property   
     ///</summary>   
     public Decimal gra_nduracion 
		 { 
		        
                    get{ return this._gra_nduracion; }
        						set{ this._gra_nduracion = value; } 										
	   }
	  ///<summary>
     ///gra_ioperador property   
     ///</summary>   
     public int gra_ioperador 
		 { 
		        
                    get{ return this._gra_ioperador; }
        						set{ this._gra_ioperador = value; } 										
	   }
	  ///<summary>
     ///gra_cterminal property   
     ///</summary>   
     public string gra_cterminal 
		 { 
		        
                    get{ return this._gra_cterminal; }
        						set{ this._gra_cterminal = value; } 										
	   }
	  ///<summary>
     ///gra_nestado property   
     ///</summary>   
     public Decimal gra_nestado 
		 { 
		        
                    get{ return this._gra_nestado; }
        						set{ this._gra_nestado = value; } 										
	   }
	  ///<summary>
     ///gra_ctelefono property   
     ///</summary>   
     public string gra_ctelefono 
		 { 
		        
                    get{ return this._gra_ctelefono; }
        						set{ this._gra_ctelefono = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_grabacion_audio() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_grabacion_audio(int Id, string Name, int gra_iidcuenta, int gra_iidrecepcion, DateTime? gra_dfechahora, string gra_carchivo, Decimal gra_nduracion, int gra_ioperador, string gra_cterminal, Decimal gra_nestado, string gra_ctelefono) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._gra_iidcuenta = gra_iidcuenta;
this._gra_iidrecepcion = gra_iidrecepcion;
this._gra_dfechahora = gra_dfechahora;
this._gra_carchivo = gra_carchivo;
this._gra_nduracion = gra_nduracion;
this._gra_ioperador = gra_ioperador;
this._gra_cterminal = gra_cterminal;
this._gra_nestado = gra_nestado;
this._gra_ctelefono = gra_ctelefono;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3129, "p_grabacion_audio");
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
			Simplep_grabacion_audio Simple = new Simplep_grabacion_audio();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.gra_iidcuenta = this._gra_iidcuenta;
Simple.gra_iidrecepcion = this._gra_iidrecepcion;
Simple.gra_dfechahora = this._gra_dfechahora;
Simple.gra_carchivo = this._gra_carchivo;
Simple.gra_nduracion = this._gra_nduracion;
Simple.gra_ioperador = this._gra_ioperador;
Simple.gra_cterminal = this._gra_cterminal;
Simple.gra_nestado = this._gra_nestado;
Simple.gra_ctelefono = this._gra_ctelefono;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_grabacion_audio Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._gra_iidcuenta = Simple.gra_iidcuenta;
this._gra_iidrecepcion = Simple.gra_iidrecepcion;
this._gra_dfechahora = Simple.gra_dfechahora;
this._gra_carchivo = Simple.gra_carchivo;
this._gra_nduracion = Simple.gra_nduracion;
this._gra_ioperador = Simple.gra_ioperador;
this._gra_cterminal = Simple.gra_cterminal;
this._gra_nestado = Simple.gra_nestado;
this._gra_ctelefono = Simple.gra_ctelefono;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_grabacion_audio(SqlConfig, UserId, (Simplep_grabacion_audio) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("gra_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gra_iidrecepcion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gra_dfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("gra_carchivo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gra_nduracion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("gra_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("gra_cterminal", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gra_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("gra_ctelefono", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gra_iidcuenta"] = this._gra_iidcuenta;
dr["gra_iidrecepcion"] = this._gra_iidrecepcion;
dr["gra_dfechahora"] = this._gra_dfechahora;
dr["gra_carchivo"] = this._gra_carchivo;
dr["gra_nduracion"] = this._gra_nduracion;
dr["gra_ioperador"] = this._gra_ioperador;
dr["gra_cterminal"] = this._gra_cterminal;
dr["gra_nestado"] = this._gra_nestado;
dr["gra_ctelefono"] = this._gra_ctelefono;
							 
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
