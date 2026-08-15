
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
    public class Callereventostimeline : CallerObject
    { 	
				     private int _etl_irecid;
					
				     private int _etl_icuenta;
					
				     private DateTime? _etl_tfechahora;
					
				     private string _etl_caccion;
					
				     private string _etl_cobservacion;
					
				     private string _etl_cowner;
					
				     private int _etl_ioperador;
					
				     private int _etl_iaccioncode ;
				 ///<summary>
     ///etl_irecid property   
     ///</summary>   
     public int etl_irecid 
		 { 
		        
                    get{ return this._etl_irecid; }
        						set{ this._etl_irecid = value; } 										
	   }
	  ///<summary>
     ///etl_icuenta property   
     ///</summary>   
     public int etl_icuenta 
		 { 
		        
                    get{ return this._etl_icuenta; }
        						set{ this._etl_icuenta = value; } 										
	   }
	  ///<summary>
     ///etl_tfechahora property   
     ///</summary>   
     public DateTime? etl_tfechahora 
		 { 
		        
                    get{ return this._etl_tfechahora; }
        						set{ this._etl_tfechahora = value; } 										
	   }
	  ///<summary>
     ///etl_caccion property   
     ///</summary>   
     public string etl_caccion 
		 { 
		        
                    get{ return this._etl_caccion; }
        						set{ this._etl_caccion = value; } 										
	   }
	  ///<summary>
     ///etl_cobservacion property   
     ///</summary>   
     public string etl_cobservacion 
		 { 
		        
                    get{ return this._etl_cobservacion; }
        						set{ this._etl_cobservacion = value; } 										
	   }
	  ///<summary>
     ///etl_cowner property   
     ///</summary>   
     public string etl_cowner 
		 { 
		        
                    get{ return this._etl_cowner; }
        						set{ this._etl_cowner = value; } 										
	   }
	  ///<summary>
     ///etl_ioperador property   
     ///</summary>   
     public int etl_ioperador 
		 { 
		        
                    get{ return this._etl_ioperador; }
        						set{ this._etl_ioperador = value; } 										
	   }
	  ///<summary>
     ///etl_iaccioncode  property   
     ///</summary>   
     public int etl_iaccioncode  
		 { 
		        
                    get{ return this._etl_iaccioncode ; }
        						set{ this._etl_iaccioncode  = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callereventostimeline() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callereventostimeline(int Id, string Name, int etl_irecid, int etl_icuenta, DateTime? etl_tfechahora, string etl_caccion, string etl_cobservacion, string etl_cowner, int etl_ioperador, int etl_iaccioncode ) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._etl_irecid = etl_irecid;
this._etl_icuenta = etl_icuenta;
this._etl_tfechahora = etl_tfechahora;
this._etl_caccion = etl_caccion;
this._etl_cobservacion = etl_cobservacion;
this._etl_cowner = etl_cowner;
this._etl_ioperador = etl_ioperador;
this._etl_iaccioncode  = etl_iaccioncode ;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3131, "eventostimeline");
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
			Simpleeventostimeline Simple = new Simpleeventostimeline();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.etl_irecid = this._etl_irecid;
Simple.etl_icuenta = this._etl_icuenta;
Simple.etl_tfechahora = this._etl_tfechahora;
Simple.etl_caccion = this._etl_caccion;
Simple.etl_cobservacion = this._etl_cobservacion;
Simple.etl_cowner = this._etl_cowner;
Simple.etl_ioperador = this._etl_ioperador;
Simple.etl_iaccioncode  = this._etl_iaccioncode ;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simpleeventostimeline Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._etl_irecid = Simple.etl_irecid;
this._etl_icuenta = Simple.etl_icuenta;
this._etl_tfechahora = Simple.etl_tfechahora;
this._etl_caccion = Simple.etl_caccion;
this._etl_cobservacion = Simple.etl_cobservacion;
this._etl_cowner = Simple.etl_cowner;
this._etl_ioperador = Simple.etl_ioperador;
this._etl_iaccioncode  = Simple.etl_iaccioncode ;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Daleventostimeline(SqlConfig, UserId, (Simpleeventostimeline) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("etl_irecid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("etl_icuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("etl_tfechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("etl_caccion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("etl_cobservacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("etl_cowner", typeof (string)));               
							 dt.Columns.Add(new DataColumn("etl_ioperador", typeof (int)));               
							 dt.Columns.Add(new DataColumn("etl_iaccioncode ", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["etl_irecid"] = this._etl_irecid;
dr["etl_icuenta"] = this._etl_icuenta;
dr["etl_tfechahora"] = this._etl_tfechahora;
dr["etl_caccion"] = this._etl_caccion;
dr["etl_cobservacion"] = this._etl_cobservacion;
dr["etl_cowner"] = this._etl_cowner;
dr["etl_ioperador"] = this._etl_ioperador;
dr["etl_iaccioncode "] = this._etl_iaccioncode ;
							 
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
