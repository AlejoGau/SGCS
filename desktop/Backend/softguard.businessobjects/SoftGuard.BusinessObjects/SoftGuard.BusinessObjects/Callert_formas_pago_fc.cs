
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
    public class Callert_formas_pago_fc : CallerObject
    { 	
				     private string _fpg_ccodigo;
					
				     private string _fpg_cdescripcion;
					
				     private string _fpg_cdescripcionreducida;
					
				     private Decimal _fpg_npidenumero;
					
				     private Decimal _fpg_npidevencimiento;
					
				     private Decimal _fpg_npidebanco;
					
				     private string _fpg_ctipo;
					
				     private int _fpg_mgmcidkey;
					
				     private int _fpg_orgidcodigoid;
				 ///<summary>
     ///fpg_ccodigo property   
     ///</summary>   
     public string fpg_ccodigo 
		 { 
		        
                    get{ return this._fpg_ccodigo; }
        						set{ this._fpg_ccodigo = value; } 										
	   }
	  ///<summary>
     ///fpg_cdescripcion property   
     ///</summary>   
     public string fpg_cdescripcion 
		 { 
		        
                    get{ return this._fpg_cdescripcion; }
        						set{ this._fpg_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///fpg_cdescripcionreducida property   
     ///</summary>   
     public string fpg_cdescripcionreducida 
		 { 
		        
                    get{ return this._fpg_cdescripcionreducida; }
        						set{ this._fpg_cdescripcionreducida = value; } 										
	   }
	  ///<summary>
     ///fpg_npidenumero property   
     ///</summary>   
     public Decimal fpg_npidenumero 
		 { 
		        
                    get{ return this._fpg_npidenumero; }
        						set{ this._fpg_npidenumero = value; } 										
	   }
	  ///<summary>
     ///fpg_npidevencimiento property   
     ///</summary>   
     public Decimal fpg_npidevencimiento 
		 { 
		        
                    get{ return this._fpg_npidevencimiento; }
        						set{ this._fpg_npidevencimiento = value; } 										
	   }
	  ///<summary>
     ///fpg_npidebanco property   
     ///</summary>   
     public Decimal fpg_npidebanco 
		 { 
		        
                    get{ return this._fpg_npidebanco; }
        						set{ this._fpg_npidebanco = value; } 										
	   }
	  ///<summary>
     ///fpg_ctipo property   
     ///</summary>   
     public string fpg_ctipo 
		 { 
		        
                    get{ return this._fpg_ctipo; }
        						set{ this._fpg_ctipo = value; } 										
	   }
	  ///<summary>
     ///fpg_mgmcidkey property   
     ///</summary>   
     public int fpg_mgmcidkey 
		 { 
		        
                    get{ return this._fpg_mgmcidkey; }
        						set{ this._fpg_mgmcidkey = value; } 										
	   }
	  ///<summary>
     ///fpg_orgidcodigoid property   
     ///</summary>   
     public int fpg_orgidcodigoid 
		 { 
		        
                    get{ return this._fpg_orgidcodigoid; }
        						set{ this._fpg_orgidcodigoid = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_formas_pago_fc() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_formas_pago_fc(int Id, string Name, string fpg_ccodigo, string fpg_cdescripcion, string fpg_cdescripcionreducida, Decimal fpg_npidenumero, Decimal fpg_npidevencimiento, Decimal fpg_npidebanco, string fpg_ctipo, int fpg_mgmcidkey, int fpg_orgidcodigoid) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._fpg_ccodigo = fpg_ccodigo;
this._fpg_cdescripcion = fpg_cdescripcion;
this._fpg_cdescripcionreducida = fpg_cdescripcionreducida;
this._fpg_npidenumero = fpg_npidenumero;
this._fpg_npidevencimiento = fpg_npidevencimiento;
this._fpg_npidebanco = fpg_npidebanco;
this._fpg_ctipo = fpg_ctipo;
this._fpg_mgmcidkey = fpg_mgmcidkey;
this._fpg_orgidcodigoid = fpg_orgidcodigoid;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3144, "t_formas_pago_fc");
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
			Simplet_formas_pago_fc Simple = new Simplet_formas_pago_fc();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.fpg_ccodigo = this._fpg_ccodigo;
Simple.fpg_cdescripcion = this._fpg_cdescripcion;
Simple.fpg_cdescripcionreducida = this._fpg_cdescripcionreducida;
Simple.fpg_npidenumero = this._fpg_npidenumero;
Simple.fpg_npidevencimiento = this._fpg_npidevencimiento;
Simple.fpg_npidebanco = this._fpg_npidebanco;
Simple.fpg_ctipo = this._fpg_ctipo;
Simple.fpg_mgmcidkey = this._fpg_mgmcidkey;
Simple.fpg_orgidcodigoid = this._fpg_orgidcodigoid;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_formas_pago_fc Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._fpg_ccodigo = Simple.fpg_ccodigo;
this._fpg_cdescripcion = Simple.fpg_cdescripcion;
this._fpg_cdescripcionreducida = Simple.fpg_cdescripcionreducida;
this._fpg_npidenumero = Simple.fpg_npidenumero;
this._fpg_npidevencimiento = Simple.fpg_npidevencimiento;
this._fpg_npidebanco = Simple.fpg_npidebanco;
this._fpg_ctipo = Simple.fpg_ctipo;
this._fpg_mgmcidkey = Simple.fpg_mgmcidkey;
this._fpg_orgidcodigoid = Simple.fpg_orgidcodigoid;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_formas_pago_fc(SqlConfig, UserId, (Simplet_formas_pago_fc) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("fpg_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_cdescripcionreducida", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_npidenumero", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fpg_npidevencimiento", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fpg_npidebanco", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fpg_ctipo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fpg_mgmcidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("fpg_orgidcodigoid", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["fpg_ccodigo"] = this._fpg_ccodigo;
dr["fpg_cdescripcion"] = this._fpg_cdescripcion;
dr["fpg_cdescripcionreducida"] = this._fpg_cdescripcionreducida;
dr["fpg_npidenumero"] = this._fpg_npidenumero;
dr["fpg_npidevencimiento"] = this._fpg_npidevencimiento;
dr["fpg_npidebanco"] = this._fpg_npidebanco;
dr["fpg_ctipo"] = this._fpg_ctipo;
dr["fpg_mgmcidkey"] = this._fpg_mgmcidkey;
dr["fpg_orgidcodigoid"] = this._fpg_orgidcodigoid;
							 
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
