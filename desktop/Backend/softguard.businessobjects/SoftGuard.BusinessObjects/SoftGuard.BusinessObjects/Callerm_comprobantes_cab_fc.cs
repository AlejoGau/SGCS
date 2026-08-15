
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
    public class Callerm_comprobantes_cab_fc : CallerObject
    { 	
				     private int _cbc_icliente;
					
				     private DateTime? _cbc_dfecha;
					
				     private string _cbc_ctipocbte;
					
				     private string _cbc_cprefijocbte;
					
				     private int _cbc_inumerocbte;
					
				     private Decimal _cbc_ysubtotal;
					
				     private Decimal _cbc_yimpuesto1;
					
				     private Decimal _cbc_yimpuesto2;
					
				     private Decimal _cbc_yimpuesto3;
					
				     private Decimal _cbc_ytotal;
					
				     private string _cbc_cestado;
					
				     private string _cbc_ccae;
					
				     private string _cbc_cvtocae;
					
				     private int _cbc_iversion;
				 ///<summary>
     ///cbc_icliente property   
     ///</summary>   
     public int cbc_icliente 
		 { 
		        
                    get{ return this._cbc_icliente; }
        						set{ this._cbc_icliente = value; } 										
	   }
	  ///<summary>
     ///cbc_dfecha property   
     ///</summary>   
     public DateTime? cbc_dfecha 
		 { 
		        
                    get{ return this._cbc_dfecha; }
        						set{ this._cbc_dfecha = value; } 										
	   }
	  ///<summary>
     ///cbc_ctipocbte property   
     ///</summary>   
     public string cbc_ctipocbte 
		 { 
		        
                    get{ return this._cbc_ctipocbte; }
        						set{ this._cbc_ctipocbte = value; } 										
	   }
	  ///<summary>
     ///cbc_cprefijocbte property   
     ///</summary>   
     public string cbc_cprefijocbte 
		 { 
		        
                    get{ return this._cbc_cprefijocbte; }
        						set{ this._cbc_cprefijocbte = value; } 										
	   }
	  ///<summary>
     ///cbc_inumerocbte property   
     ///</summary>   
     public int cbc_inumerocbte 
		 { 
		        
                    get{ return this._cbc_inumerocbte; }
        						set{ this._cbc_inumerocbte = value; } 										
	   }
	  ///<summary>
     ///cbc_ysubtotal property   
     ///</summary>   
     public Decimal cbc_ysubtotal 
		 { 
		        
                    get{ return this._cbc_ysubtotal; }
        						set{ this._cbc_ysubtotal = value; } 										
	   }
	  ///<summary>
     ///cbc_yimpuesto1 property   
     ///</summary>   
     public Decimal cbc_yimpuesto1 
		 { 
		        
                    get{ return this._cbc_yimpuesto1; }
        						set{ this._cbc_yimpuesto1 = value; } 										
	   }
	  ///<summary>
     ///cbc_yimpuesto2 property   
     ///</summary>   
     public Decimal cbc_yimpuesto2 
		 { 
		        
                    get{ return this._cbc_yimpuesto2; }
        						set{ this._cbc_yimpuesto2 = value; } 										
	   }
	  ///<summary>
     ///cbc_yimpuesto3 property   
     ///</summary>   
     public Decimal cbc_yimpuesto3 
		 { 
		        
                    get{ return this._cbc_yimpuesto3; }
        						set{ this._cbc_yimpuesto3 = value; } 										
	   }
	  ///<summary>
     ///cbc_ytotal property   
     ///</summary>   
     public Decimal cbc_ytotal 
		 { 
		        
                    get{ return this._cbc_ytotal; }
        						set{ this._cbc_ytotal = value; } 										
	   }
	  ///<summary>
     ///cbc_cestado property   
     ///</summary>   
     public string cbc_cestado 
		 { 
		        
                    get{ return this._cbc_cestado; }
        						set{ this._cbc_cestado = value; } 										
	   }
	  ///<summary>
     ///cbc_ccae property   
     ///</summary>   
     public string cbc_ccae 
		 { 
		        
                    get{ return this._cbc_ccae; }
        						set{ this._cbc_ccae = value; } 										
	   }
	  ///<summary>
     ///cbc_cvtocae property   
     ///</summary>   
     public string cbc_cvtocae 
		 { 
		        
                    get{ return this._cbc_cvtocae; }
        						set{ this._cbc_cvtocae = value; } 										
	   }
	  ///<summary>
     ///cbc_iversion property   
     ///</summary>   
     public int cbc_iversion 
		 { 
		        
                    get{ return this._cbc_iversion; }
        						set{ this._cbc_iversion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_comprobantes_cab_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_comprobantes_cab_fc(int Id, string Name, int cbc_icliente, DateTime? cbc_dfecha, string cbc_ctipocbte, string cbc_cprefijocbte, int cbc_inumerocbte, Decimal cbc_ysubtotal, Decimal cbc_yimpuesto1, Decimal cbc_yimpuesto2, Decimal cbc_yimpuesto3, Decimal cbc_ytotal, string cbc_cestado, string cbc_ccae, string cbc_cvtocae, int cbc_iversion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cbc_icliente = cbc_icliente;
this._cbc_dfecha = cbc_dfecha;
this._cbc_ctipocbte = cbc_ctipocbte;
this._cbc_cprefijocbte = cbc_cprefijocbte;
this._cbc_inumerocbte = cbc_inumerocbte;
this._cbc_ysubtotal = cbc_ysubtotal;
this._cbc_yimpuesto1 = cbc_yimpuesto1;
this._cbc_yimpuesto2 = cbc_yimpuesto2;
this._cbc_yimpuesto3 = cbc_yimpuesto3;
this._cbc_ytotal = cbc_ytotal;
this._cbc_cestado = cbc_cestado;
this._cbc_ccae = cbc_ccae;
this._cbc_cvtocae = cbc_cvtocae;
this._cbc_iversion = cbc_iversion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3151, "m_comprobantes_cab_fc");
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
			Simplem_comprobantes_cab_fc Simple = new Simplem_comprobantes_cab_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cbc_icliente = this._cbc_icliente;
Simple.cbc_dfecha = this._cbc_dfecha;
Simple.cbc_ctipocbte = this._cbc_ctipocbte;
Simple.cbc_cprefijocbte = this._cbc_cprefijocbte;
Simple.cbc_inumerocbte = this._cbc_inumerocbte;
Simple.cbc_ysubtotal = this._cbc_ysubtotal;
Simple.cbc_yimpuesto1 = this._cbc_yimpuesto1;
Simple.cbc_yimpuesto2 = this._cbc_yimpuesto2;
Simple.cbc_yimpuesto3 = this._cbc_yimpuesto3;
Simple.cbc_ytotal = this._cbc_ytotal;
Simple.cbc_cestado = this._cbc_cestado;
Simple.cbc_ccae = this._cbc_ccae;
Simple.cbc_cvtocae = this._cbc_cvtocae;
Simple.cbc_iversion = this._cbc_iversion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_comprobantes_cab_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cbc_icliente = Simple.cbc_icliente;
this._cbc_dfecha = Simple.cbc_dfecha;
this._cbc_ctipocbte = Simple.cbc_ctipocbte;
this._cbc_cprefijocbte = Simple.cbc_cprefijocbte;
this._cbc_inumerocbte = Simple.cbc_inumerocbte;
this._cbc_ysubtotal = Simple.cbc_ysubtotal;
this._cbc_yimpuesto1 = Simple.cbc_yimpuesto1;
this._cbc_yimpuesto2 = Simple.cbc_yimpuesto2;
this._cbc_yimpuesto3 = Simple.cbc_yimpuesto3;
this._cbc_ytotal = Simple.cbc_ytotal;
this._cbc_cestado = Simple.cbc_cestado;
this._cbc_ccae = Simple.cbc_ccae;
this._cbc_cvtocae = Simple.cbc_cvtocae;
this._cbc_iversion = Simple.cbc_iversion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_comprobantes_cab_fc(SqlConfig, UserId, (Simplem_comprobantes_cab_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cbc_icliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbc_dfecha", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cbc_ctipocbte", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_cprefijocbte", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_inumerocbte", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cbc_ysubtotal", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_yimpuesto1", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_yimpuesto2", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_yimpuesto3", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_ytotal", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cbc_cestado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_ccae", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_cvtocae", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cbc_iversion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cbc_icliente"] = this._cbc_icliente;
dr["cbc_dfecha"] = this._cbc_dfecha;
dr["cbc_ctipocbte"] = this._cbc_ctipocbte;
dr["cbc_cprefijocbte"] = this._cbc_cprefijocbte;
dr["cbc_inumerocbte"] = this._cbc_inumerocbte;
dr["cbc_ysubtotal"] = this._cbc_ysubtotal;
dr["cbc_yimpuesto1"] = this._cbc_yimpuesto1;
dr["cbc_yimpuesto2"] = this._cbc_yimpuesto2;
dr["cbc_yimpuesto3"] = this._cbc_yimpuesto3;
dr["cbc_ytotal"] = this._cbc_ytotal;
dr["cbc_cestado"] = this._cbc_cestado;
dr["cbc_ccae"] = this._cbc_ccae;
dr["cbc_cvtocae"] = this._cbc_cvtocae;
dr["cbc_iversion"] = this._cbc_iversion;
							 
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
