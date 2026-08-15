
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
    public class CallerTelefono : CallerObject
    { 	
				     private int _tel_iidcuenta;
					
				     private int _tel_iid;
					
				     private string _tel_clista;
					
				     private string _tel_cnombre;
					
				     private string _tel_cobservacion;
					
				     private string _tel_ctelefono;
					
				     private Decimal _tel_ndiscado;
					
				     private string _tel_cpredigito;
					
				     private string _tel_cpostdigito;
					
				     private int _tel_norden;
					
				     private Decimal _tel_ntr;
					
				     private string _tel_cclave;
					
				     private string _tel_cpermiso;
					
				     private Decimal _tel_nsms;
					
				     private Decimal _tel_nsp;
					
				     private string _tel_cinternacional;
					
				     private string _tel_ccountrycode;
					
				     private int _tel_iismobile;
				 ///<summary>
     ///tel_iidcuenta property   
     ///</summary>   
     public int tel_iidcuenta 
		 { 
		        
                    get{ return this._tel_iidcuenta; }
        						set{ this._tel_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///tel_iid property   
     ///</summary>   
     public int tel_iid 
		 { 
		        
                    get{ return this._tel_iid; }
        						set{ this._tel_iid = value; } 										
	   }
	  ///<summary>
     ///tel_clista property   
     ///</summary>   
     public string tel_clista 
		 { 
		        
                    get{ return this._tel_clista; }
        						set{ this._tel_clista = value; } 										
	   }
	  ///<summary>
     ///tel_cnombre property   
     ///</summary>   
     public string tel_cnombre 
		 { 
		        
                    get{ return this._tel_cnombre; }
        						set{ this._tel_cnombre = value; } 										
	   }
	  ///<summary>
     ///tel_cobservacion property   
     ///</summary>   
     public string tel_cobservacion 
		 { 
		        
                    get{ return this._tel_cobservacion; }
        						set{ this._tel_cobservacion = value; } 										
	   }
	  ///<summary>
     ///tel_ctelefono property   
     ///</summary>   
     public string tel_ctelefono 
		 { 
		        
                    get{ return this._tel_ctelefono; }
        						set{ this._tel_ctelefono = value; } 										
	   }
	  ///<summary>
     ///tel_ndiscado property   
     ///</summary>   
     public Decimal tel_ndiscado 
		 { 
		        
                    get{ return this._tel_ndiscado; }
        						set{ this._tel_ndiscado = value; } 										
	   }
	  ///<summary>
     ///tel_cpredigito property   
     ///</summary>   
     public string tel_cpredigito 
		 { 
		        
                    get{ return this._tel_cpredigito; }
        						set{ this._tel_cpredigito = value; } 										
	   }
	  ///<summary>
     ///tel_cpostdigito property   
     ///</summary>   
     public string tel_cpostdigito 
		 { 
		        
                    get{ return this._tel_cpostdigito; }
        						set{ this._tel_cpostdigito = value; } 										
	   }
	  ///<summary>
     ///tel_norden property   
     ///</summary>   
     public int tel_norden 
		 { 
		        
                    get{ return this._tel_norden; }
        						set{ this._tel_norden = value; } 										
	   }
	  ///<summary>
     ///tel_ntr property   
     ///</summary>   
     public Decimal tel_ntr 
		 { 
		        
                    get{ return this._tel_ntr; }
        						set{ this._tel_ntr = value; } 										
	   }
	  ///<summary>
     ///tel_cclave property   
     ///</summary>   
     public string tel_cclave 
		 { 
		        
                    get{ return this._tel_cclave; }
        						set{ this._tel_cclave = value; } 										
	   }
	  ///<summary>
     ///tel_cpermiso property   
     ///</summary>   
     public string tel_cpermiso 
		 { 
		        
                    get{ return this._tel_cpermiso; }
        						set{ this._tel_cpermiso = value; } 										
	   }
	  ///<summary>
     ///tel_nsms property   
     ///</summary>   
     public Decimal tel_nsms 
		 { 
		        
                    get{ return this._tel_nsms; }
        						set{ this._tel_nsms = value; } 										
	   }
	  ///<summary>
     ///tel_nsp property   
     ///</summary>   
     public Decimal tel_nsp 
		 { 
		        
                    get{ return this._tel_nsp; }
        						set{ this._tel_nsp = value; } 										
	   }
	  ///<summary>
     ///tel_cinternacional property   
     ///</summary>   
     public string tel_cinternacional 
		 { 
		        
                    get{ return this._tel_cinternacional; }
        						set{ this._tel_cinternacional = value; } 										
	   }
	  ///<summary>
     ///tel_ccountrycode property   
     ///</summary>   
     public string tel_ccountrycode 
		 { 
		        
                    get{ return this._tel_ccountrycode; }
        						set{ this._tel_ccountrycode = value; } 										
	   }
	  ///<summary>
     ///tel_iismobile property   
     ///</summary>   
     public int tel_iismobile 
		 { 
		        
                    get{ return this._tel_iismobile; }
        						set{ this._tel_iismobile = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerTelefono() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerTelefono(int Id, string Name, int tel_iidcuenta, int tel_iid, string tel_clista, string tel_cnombre, string tel_cobservacion, string tel_ctelefono, Decimal tel_ndiscado, string tel_cpredigito, string tel_cpostdigito, int tel_norden, Decimal tel_ntr, string tel_cclave, string tel_cpermiso, Decimal tel_nsms, Decimal tel_nsp, string tel_cinternacional, string tel_ccountrycode, int tel_iismobile) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tel_iidcuenta = tel_iidcuenta;
this._tel_iid = tel_iid;
this._tel_clista = tel_clista;
this._tel_cnombre = tel_cnombre;
this._tel_cobservacion = tel_cobservacion;
this._tel_ctelefono = tel_ctelefono;
this._tel_ndiscado = tel_ndiscado;
this._tel_cpredigito = tel_cpredigito;
this._tel_cpostdigito = tel_cpostdigito;
this._tel_norden = tel_norden;
this._tel_ntr = tel_ntr;
this._tel_cclave = tel_cclave;
this._tel_cpermiso = tel_cpermiso;
this._tel_nsms = tel_nsms;
this._tel_nsp = tel_nsp;
this._tel_cinternacional = tel_cinternacional;
this._tel_ccountrycode = tel_ccountrycode;
this._tel_iismobile = tel_iismobile;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3011, "Telefono");
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
			SimpleTelefono Simple = new SimpleTelefono();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tel_iidcuenta = this._tel_iidcuenta;
Simple.tel_iid = this._tel_iid;
Simple.tel_clista = this._tel_clista;
Simple.tel_cnombre = this._tel_cnombre;
Simple.tel_cobservacion = this._tel_cobservacion;
Simple.tel_ctelefono = this._tel_ctelefono;
Simple.tel_ndiscado = this._tel_ndiscado;
Simple.tel_cpredigito = this._tel_cpredigito;
Simple.tel_cpostdigito = this._tel_cpostdigito;
Simple.tel_norden = this._tel_norden;
Simple.tel_ntr = this._tel_ntr;
Simple.tel_cclave = this._tel_cclave;
Simple.tel_cpermiso = this._tel_cpermiso;
Simple.tel_nsms = this._tel_nsms;
Simple.tel_nsp = this._tel_nsp;
Simple.tel_cinternacional = this._tel_cinternacional;
Simple.tel_ccountrycode = this._tel_ccountrycode;
Simple.tel_iismobile = this._tel_iismobile;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleTelefono Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tel_iidcuenta = Simple.tel_iidcuenta;
this._tel_iid = Simple.tel_iid;
this._tel_clista = Simple.tel_clista;
this._tel_cnombre = Simple.tel_cnombre;
this._tel_cobservacion = Simple.tel_cobservacion;
this._tel_ctelefono = Simple.tel_ctelefono;
this._tel_ndiscado = Simple.tel_ndiscado;
this._tel_cpredigito = Simple.tel_cpredigito;
this._tel_cpostdigito = Simple.tel_cpostdigito;
this._tel_norden = Simple.tel_norden;
this._tel_ntr = Simple.tel_ntr;
this._tel_cclave = Simple.tel_cclave;
this._tel_cpermiso = Simple.tel_cpermiso;
this._tel_nsms = Simple.tel_nsms;
this._tel_nsp = Simple.tel_nsp;
this._tel_cinternacional = Simple.tel_cinternacional;
this._tel_ccountrycode = Simple.tel_ccountrycode;
this._tel_iismobile = Simple.tel_iismobile;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalTelefono(SqlConfig, UserId, (SimpleTelefono) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tel_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tel_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tel_clista", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_ndiscado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_cpredigito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cpostdigito", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_norden", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tel_ntr", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_cclave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_cpermiso", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_nsms", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_nsp", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tel_cinternacional", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_ccountrycode", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tel_iismobile", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tel_iidcuenta"] = this._tel_iidcuenta;
dr["tel_iid"] = this._tel_iid;
dr["tel_clista"] = this._tel_clista;
dr["tel_cnombre"] = this._tel_cnombre;
dr["tel_cobservacion"] = this._tel_cobservacion;
dr["tel_ctelefono"] = this._tel_ctelefono;
dr["tel_ndiscado"] = this._tel_ndiscado;
dr["tel_cpredigito"] = this._tel_cpredigito;
dr["tel_cpostdigito"] = this._tel_cpostdigito;
dr["tel_norden"] = this._tel_norden;
dr["tel_ntr"] = this._tel_ntr;
dr["tel_cclave"] = this._tel_cclave;
dr["tel_cpermiso"] = this._tel_cpermiso;
dr["tel_nsms"] = this._tel_nsms;
dr["tel_nsp"] = this._tel_nsp;
dr["tel_cinternacional"] = this._tel_cinternacional;
dr["tel_ccountrycode"] = this._tel_ccountrycode;
dr["tel_iismobile"] = this._tel_iismobile;
							 
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
