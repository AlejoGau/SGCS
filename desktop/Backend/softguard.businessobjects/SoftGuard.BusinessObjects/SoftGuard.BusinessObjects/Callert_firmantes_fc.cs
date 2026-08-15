
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
    public class Callert_firmantes_fc : CallerObject
    { 	
				     private string _fir_ccodigo;
					
				     private string _fir_cnombre;
					
				     private string _fir_ccuenta;
					
				     private Decimal _fir_nlimite;
					
				     private Decimal _fir_nestado;
					
				     private string _fir_mlegajo;
				 ///<summary>
     ///fir_ccodigo property   
     ///</summary>   
     public string fir_ccodigo 
		 { 
		        
                    get{ return this._fir_ccodigo; }
        						set{ this._fir_ccodigo = value; } 										
	   }
	  ///<summary>
     ///fir_cnombre property   
     ///</summary>   
     public string fir_cnombre 
		 { 
		        
                    get{ return this._fir_cnombre; }
        						set{ this._fir_cnombre = value; } 										
	   }
	  ///<summary>
     ///fir_ccuenta property   
     ///</summary>   
     public string fir_ccuenta 
		 { 
		        
                    get{ return this._fir_ccuenta; }
        						set{ this._fir_ccuenta = value; } 										
	   }
	  ///<summary>
     ///fir_nlimite property   
     ///</summary>   
     public Decimal fir_nlimite 
		 { 
		        
                    get{ return this._fir_nlimite; }
        						set{ this._fir_nlimite = value; } 										
	   }
	  ///<summary>
     ///fir_nestado property   
     ///</summary>   
     public Decimal fir_nestado 
		 { 
		        
                    get{ return this._fir_nestado; }
        						set{ this._fir_nestado = value; } 										
	   }
	  ///<summary>
     ///fir_mlegajo property   
     ///</summary>   
     public string fir_mlegajo 
		 { 
		        
                    get{ return this._fir_mlegajo; }
        						set{ this._fir_mlegajo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_firmantes_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_firmantes_fc(int Id, string Name, string fir_ccodigo, string fir_cnombre, string fir_ccuenta, Decimal fir_nlimite, Decimal fir_nestado, string fir_mlegajo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._fir_ccodigo = fir_ccodigo;
this._fir_cnombre = fir_cnombre;
this._fir_ccuenta = fir_ccuenta;
this._fir_nlimite = fir_nlimite;
this._fir_nestado = fir_nestado;
this._fir_mlegajo = fir_mlegajo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3190, "t_firmantes_fc");
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
			Simplet_firmantes_fc Simple = new Simplet_firmantes_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.fir_ccodigo = this._fir_ccodigo;
Simple.fir_cnombre = this._fir_cnombre;
Simple.fir_ccuenta = this._fir_ccuenta;
Simple.fir_nlimite = this._fir_nlimite;
Simple.fir_nestado = this._fir_nestado;
Simple.fir_mlegajo = this._fir_mlegajo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_firmantes_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._fir_ccodigo = Simple.fir_ccodigo;
this._fir_cnombre = Simple.fir_cnombre;
this._fir_ccuenta = Simple.fir_ccuenta;
this._fir_nlimite = Simple.fir_nlimite;
this._fir_nestado = Simple.fir_nestado;
this._fir_mlegajo = Simple.fir_mlegajo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_firmantes_fc(SqlConfig, UserId, (Simplet_firmantes_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("fir_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fir_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fir_ccuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fir_nlimite", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fir_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fir_mlegajo", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["fir_ccodigo"] = this._fir_ccodigo;
dr["fir_cnombre"] = this._fir_cnombre;
dr["fir_ccuenta"] = this._fir_ccuenta;
dr["fir_nlimite"] = this._fir_nlimite;
dr["fir_nestado"] = this._fir_nestado;
dr["fir_mlegajo"] = this._fir_mlegajo;
							 
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
