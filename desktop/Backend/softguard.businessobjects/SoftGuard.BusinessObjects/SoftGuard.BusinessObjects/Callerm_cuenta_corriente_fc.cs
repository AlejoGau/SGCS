
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
    public class Callerm_cuenta_corriente_fc : CallerObject
    { 	
				     private int _cta_iCodigoCbte;
					
				     private Decimal _cta_nCuota;
					
				     private Decimal _cta_yTotal;
					
				     private Decimal _cta_ySaldo;
					
				     private DateTime? _cta_dVencimiento;
					
				     private DateTime? _cta_dCobro;
				 ///<summary>
     ///cta_iCodigoCbte property   
     ///</summary>   
     public int cta_iCodigoCbte 
		 { 
		        
                    get{ return this._cta_iCodigoCbte; }
        						set{ this._cta_iCodigoCbte = value; } 										
	   }
	  ///<summary>
     ///cta_nCuota property   
     ///</summary>   
     public Decimal cta_nCuota 
		 { 
		        
                    get{ return this._cta_nCuota; }
        						set{ this._cta_nCuota = value; } 										
	   }
	  ///<summary>
     ///cta_yTotal property   
     ///</summary>   
     public Decimal cta_yTotal 
		 { 
		        
                    get{ return this._cta_yTotal; }
        						set{ this._cta_yTotal = value; } 										
	   }
	  ///<summary>
     ///cta_ySaldo property   
     ///</summary>   
     public Decimal cta_ySaldo 
		 { 
		        
                    get{ return this._cta_ySaldo; }
        						set{ this._cta_ySaldo = value; } 										
	   }
	  ///<summary>
     ///cta_dVencimiento property   
     ///</summary>   
     public DateTime? cta_dVencimiento 
		 { 
		        
                    get{ return this._cta_dVencimiento; }
        						set{ this._cta_dVencimiento = value; } 										
	   }
	  ///<summary>
     ///cta_dCobro property   
     ///</summary>   
     public DateTime? cta_dCobro 
		 { 
		        
                    get{ return this._cta_dCobro; }
        						set{ this._cta_dCobro = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_cuenta_corriente_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuenta_corriente_fc(int Id, string Name, int cta_iCodigoCbte, Decimal cta_nCuota, Decimal cta_yTotal, Decimal cta_ySaldo, DateTime? cta_dVencimiento, DateTime? cta_dCobro) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cta_iCodigoCbte = cta_iCodigoCbte;
this._cta_nCuota = cta_nCuota;
this._cta_yTotal = cta_yTotal;
this._cta_ySaldo = cta_ySaldo;
this._cta_dVencimiento = cta_dVencimiento;
this._cta_dCobro = cta_dCobro;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3168, "m_cuenta_corriente_fc");
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
			Simplem_cuenta_corriente_fc Simple = new Simplem_cuenta_corriente_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cta_iCodigoCbte = this._cta_iCodigoCbte;
Simple.cta_nCuota = this._cta_nCuota;
Simple.cta_yTotal = this._cta_yTotal;
Simple.cta_ySaldo = this._cta_ySaldo;
Simple.cta_dVencimiento = this._cta_dVencimiento;
Simple.cta_dCobro = this._cta_dCobro;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuenta_corriente_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cta_iCodigoCbte = Simple.cta_iCodigoCbte;
this._cta_nCuota = Simple.cta_nCuota;
this._cta_yTotal = Simple.cta_yTotal;
this._cta_ySaldo = Simple.cta_ySaldo;
this._cta_dVencimiento = Simple.cta_dVencimiento;
this._cta_dCobro = Simple.cta_dCobro;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuenta_corriente_fc(SqlConfig, UserId, (Simplem_cuenta_corriente_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cta_iCodigoCbte", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cta_nCuota", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cta_yTotal", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cta_ySaldo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cta_dVencimiento", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("cta_dCobro", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cta_iCodigoCbte"] = this._cta_iCodigoCbte;
dr["cta_nCuota"] = this._cta_nCuota;
dr["cta_yTotal"] = this._cta_yTotal;
dr["cta_ySaldo"] = this._cta_ySaldo;
dr["cta_dVencimiento"] = this._cta_dVencimiento;
dr["cta_dCobro"] = this._cta_dCobro;
							 
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
