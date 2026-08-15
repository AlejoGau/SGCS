
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
    public class Callert_instaladores : CallerObject
    { 	
				     private string _ins_ccodigo;
					
				     private string _ins_cnombre;
					
				     private string _ins_cempresa;
					
				     private string _ins_ccalle;
					
				     private int _ins_inumero;
					
				     private Decimal _ins_npiso;
					
				     private string _ins_cdepartamento;
					
				     private string _ins_ctelefono;
					
				     private string _ins_cmail;
					
				     private string _ins_cDealer;
					
				     private int _ins_iTipo;
					
				     private int _ins_irelacion;
					
				     private int _ins_iOrganizacion ;
				 ///<summary>
     ///ins_ccodigo property   
     ///</summary>   
     public string ins_ccodigo 
		 { 
		        
                    get{ return this._ins_ccodigo; }
        						set{ this._ins_ccodigo = value; } 										
	   }
	  ///<summary>
     ///ins_cnombre property   
     ///</summary>   
     public string ins_cnombre 
		 { 
		        
                    get{ return this._ins_cnombre; }
        						set{ this._ins_cnombre = value; } 										
	   }
	  ///<summary>
     ///ins_cempresa property   
     ///</summary>   
     public string ins_cempresa 
		 { 
		        
                    get{ return this._ins_cempresa; }
        						set{ this._ins_cempresa = value; } 										
	   }
	  ///<summary>
     ///ins_ccalle property   
     ///</summary>   
     public string ins_ccalle 
		 { 
		        
                    get{ return this._ins_ccalle; }
        						set{ this._ins_ccalle = value; } 										
	   }
	  ///<summary>
     ///ins_inumero property   
     ///</summary>   
     public int ins_inumero 
		 { 
		        
                    get{ return this._ins_inumero; }
        						set{ this._ins_inumero = value; } 										
	   }
	  ///<summary>
     ///ins_npiso property   
     ///</summary>   
     public Decimal ins_npiso 
		 { 
		        
                    get{ return this._ins_npiso; }
        						set{ this._ins_npiso = value; } 										
	   }
	  ///<summary>
     ///ins_cdepartamento property   
     ///</summary>   
     public string ins_cdepartamento 
		 { 
		        
                    get{ return this._ins_cdepartamento; }
        						set{ this._ins_cdepartamento = value; } 										
	   }
	  ///<summary>
     ///ins_ctelefono property   
     ///</summary>   
     public string ins_ctelefono 
		 { 
		        
                    get{ return this._ins_ctelefono; }
        						set{ this._ins_ctelefono = value; } 										
	   }
	  ///<summary>
     ///ins_cmail property   
     ///</summary>   
     public string ins_cmail 
		 { 
		        
                    get{ return this._ins_cmail; }
        						set{ this._ins_cmail = value; } 										
	   }
	  ///<summary>
     ///ins_cDealer property   
     ///</summary>   
     public string ins_cDealer 
		 { 
		        
                    get{ return this._ins_cDealer; }
        						set{ this._ins_cDealer = value; } 										
	   }
	  ///<summary>
     ///ins_iTipo property   
     ///</summary>   
     public int ins_iTipo 
		 { 
		        
                    get{ return this._ins_iTipo; }
        						set{ this._ins_iTipo = value; } 										
	   }
	  ///<summary>
     ///ins_irelacion property   
     ///</summary>   
     public int ins_irelacion 
		 { 
		        
                    get{ return this._ins_irelacion; }
        						set{ this._ins_irelacion = value; } 										
	   }
	  ///<summary>
     ///ins_iOrganizacion  property   
     ///</summary>   
     public int ins_iOrganizacion  
		 { 
		        
                    get{ return this._ins_iOrganizacion ; }
        						set{ this._ins_iOrganizacion  = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_instaladores() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_instaladores(int Id, string Name, string ins_ccodigo, string ins_cnombre, string ins_cempresa, string ins_ccalle, int ins_inumero, Decimal ins_npiso, string ins_cdepartamento, string ins_ctelefono, string ins_cmail, string ins_cDealer, int ins_iTipo, int ins_irelacion, int ins_iOrganizacion ) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ins_ccodigo = ins_ccodigo;
this._ins_cnombre = ins_cnombre;
this._ins_cempresa = ins_cempresa;
this._ins_ccalle = ins_ccalle;
this._ins_inumero = ins_inumero;
this._ins_npiso = ins_npiso;
this._ins_cdepartamento = ins_cdepartamento;
this._ins_ctelefono = ins_ctelefono;
this._ins_cmail = ins_cmail;
this._ins_cDealer = ins_cDealer;
this._ins_iTipo = ins_iTipo;
this._ins_irelacion = ins_irelacion;
this._ins_iOrganizacion  = ins_iOrganizacion ;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3080, "t_instaladores");
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
			Simplet_instaladores Simple = new Simplet_instaladores();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ins_ccodigo = this._ins_ccodigo;
Simple.ins_cnombre = this._ins_cnombre;
Simple.ins_cempresa = this._ins_cempresa;
Simple.ins_ccalle = this._ins_ccalle;
Simple.ins_inumero = this._ins_inumero;
Simple.ins_npiso = this._ins_npiso;
Simple.ins_cdepartamento = this._ins_cdepartamento;
Simple.ins_ctelefono = this._ins_ctelefono;
Simple.ins_cmail = this._ins_cmail;
Simple.ins_cDealer = this._ins_cDealer;
Simple.ins_iTipo = this._ins_iTipo;
Simple.ins_irelacion = this._ins_irelacion;
Simple.ins_iOrganizacion  = this._ins_iOrganizacion ;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_instaladores Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ins_ccodigo = Simple.ins_ccodigo;
this._ins_cnombre = Simple.ins_cnombre;
this._ins_cempresa = Simple.ins_cempresa;
this._ins_ccalle = Simple.ins_ccalle;
this._ins_inumero = Simple.ins_inumero;
this._ins_npiso = Simple.ins_npiso;
this._ins_cdepartamento = Simple.ins_cdepartamento;
this._ins_ctelefono = Simple.ins_ctelefono;
this._ins_cmail = Simple.ins_cmail;
this._ins_cDealer = Simple.ins_cDealer;
this._ins_iTipo = Simple.ins_iTipo;
this._ins_irelacion = Simple.ins_irelacion;
this._ins_iOrganizacion  = Simple.ins_iOrganizacion ;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_instaladores(SqlConfig, UserId, (Simplet_instaladores) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ins_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cempresa", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_ccalle", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_inumero", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ins_npiso", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("ins_cdepartamento", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_ctelefono", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ins_iTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ins_irelacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ins_iOrganizacion ", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ins_ccodigo"] = this._ins_ccodigo;
dr["ins_cnombre"] = this._ins_cnombre;
dr["ins_cempresa"] = this._ins_cempresa;
dr["ins_ccalle"] = this._ins_ccalle;
dr["ins_inumero"] = this._ins_inumero;
dr["ins_npiso"] = this._ins_npiso;
dr["ins_cdepartamento"] = this._ins_cdepartamento;
dr["ins_ctelefono"] = this._ins_ctelefono;
dr["ins_cmail"] = this._ins_cmail;
dr["ins_cDealer"] = this._ins_cDealer;
dr["ins_iTipo"] = this._ins_iTipo;
dr["ins_irelacion"] = this._ins_irelacion;
dr["ins_iOrganizacion "] = this._ins_iOrganizacion ;
							 
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
