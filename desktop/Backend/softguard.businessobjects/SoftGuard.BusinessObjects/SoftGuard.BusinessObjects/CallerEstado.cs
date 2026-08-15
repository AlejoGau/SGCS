
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
    public class CallerEstado : CallerObject
    { 	
				     private Decimal _est_nestado;
					
				     private Decimal _est_ntipo;
					
				     private DateTime? _est_dfechadesde;
					
				     private Decimal _est_nduracion;
					
				     private DateTime? _est_dfechahasta;
					
				     private string _est_mnota;
					
				     private string _token;
				 ///<summary>
     ///est_nestado property   
     ///</summary>   
     public Decimal est_nestado 
		 { 
		        
                    get{ return this._est_nestado; }
        						set{ this._est_nestado = value; } 										
	   }
	  ///<summary>
     ///est_ntipo property   
     ///</summary>   
     public Decimal est_ntipo 
		 { 
		        
                    get{ return this._est_ntipo; }
        						set{ this._est_ntipo = value; } 										
	   }
	  ///<summary>
     ///est_dfechadesde property   
     ///</summary>   
     public DateTime? est_dfechadesde 
		 { 
		        
                    get{ return this._est_dfechadesde; }
        						set{ this._est_dfechadesde = value; } 										
	   }
	  ///<summary>
     ///est_nduracion property   
     ///</summary>   
     public Decimal est_nduracion 
		 { 
		        
                    get{ return this._est_nduracion; }
        						set{ this._est_nduracion = value; } 										
	   }
	  ///<summary>
     ///est_dfechahasta property   
     ///</summary>   
     public DateTime? est_dfechahasta 
		 { 
		        
                    get{ return this._est_dfechahasta; }
        						set{ this._est_dfechahasta = value; } 										
	   }
	  ///<summary>
     ///est_mnota property   
     ///</summary>   
     public string est_mnota 
		 { 
		        
                    get{ return this._est_mnota; }
        						set{ this._est_mnota = value; } 										
	   }
	  ///<summary>
     ///token property   
     ///</summary>   
     public string token 
		 { 
		        
                    get{ return this._token; }
        						set{ this._token = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerEstado() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerEstado(int Id, string Name, Decimal est_nestado, Decimal est_ntipo, DateTime? est_dfechadesde, Decimal est_nduracion, DateTime? est_dfechahasta, string est_mnota, string token) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._est_nestado = est_nestado;
this._est_ntipo = est_ntipo;
this._est_dfechadesde = est_dfechadesde;
this._est_nduracion = est_nduracion;
this._est_dfechahasta = est_dfechahasta;
this._est_mnota = est_mnota;
this._token = token;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3033, "Estado");
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
			SimpleEstado Simple = new SimpleEstado();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.est_nestado = this._est_nestado;
Simple.est_ntipo = this._est_ntipo;
Simple.est_dfechadesde = this._est_dfechadesde;
Simple.est_nduracion = this._est_nduracion;
Simple.est_dfechahasta = this._est_dfechahasta;
Simple.est_mnota = this._est_mnota;
Simple.token = this._token;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleEstado Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._est_nestado = Simple.est_nestado;
this._est_ntipo = Simple.est_ntipo;
this._est_dfechadesde = Simple.est_dfechadesde;
this._est_nduracion = Simple.est_nduracion;
this._est_dfechahasta = Simple.est_dfechahasta;
this._est_mnota = Simple.est_mnota;
this._token = Simple.token;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalEstado(SqlConfig, UserId, (SimpleEstado) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("est_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("est_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("est_dfechadesde", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("est_nduracion", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("est_dfechahasta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("est_mnota", typeof (string)));               
							 dt.Columns.Add(new DataColumn("token", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["est_nestado"] = this._est_nestado;
dr["est_ntipo"] = this._est_ntipo;
dr["est_dfechadesde"] = this._est_dfechadesde;
dr["est_nduracion"] = this._est_nduracion;
dr["est_dfechahasta"] = this._est_dfechahasta;
dr["est_mnota"] = this._est_mnota;
dr["token"] = this._token;
							 
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
