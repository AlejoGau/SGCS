
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
    public class Callerm_llaves : CallerObject
    { 	
				     private string _lla_cdescripcion;
					
				     private string _lla_cnumero;
					
				     private string _lla_cubicacion;
					
				     private string _lla_responsable;
					
				     private int _lla_iidcuenta;
				 ///<summary>
     ///lla_cdescripcion property   
     ///</summary>   
     public string lla_cdescripcion 
		 { 
		        
                    get{ return this._lla_cdescripcion; }
        						set{ this._lla_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///lla_cnumero property   
     ///</summary>   
     public string lla_cnumero 
		 { 
		        
                    get{ return this._lla_cnumero; }
        						set{ this._lla_cnumero = value; } 										
	   }
	  ///<summary>
     ///lla_cubicacion property   
     ///</summary>   
     public string lla_cubicacion 
		 { 
		        
                    get{ return this._lla_cubicacion; }
        						set{ this._lla_cubicacion = value; } 										
	   }
	  ///<summary>
     ///lla_responsable property   
     ///</summary>   
     public string lla_responsable 
		 { 
		        
                    get{ return this._lla_responsable; }
        						set{ this._lla_responsable = value; } 										
	   }
	  ///<summary>
     ///lla_iidcuenta property   
     ///</summary>   
     public int lla_iidcuenta 
		 { 
		        
                    get{ return this._lla_iidcuenta; }
        						set{ this._lla_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_llaves() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_llaves(int Id, string Name, string lla_cdescripcion, string lla_cnumero, string lla_cubicacion, string lla_responsable, int lla_iidcuenta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._lla_cdescripcion = lla_cdescripcion;
this._lla_cnumero = lla_cnumero;
this._lla_cubicacion = lla_cubicacion;
this._lla_responsable = lla_responsable;
this._lla_iidcuenta = lla_iidcuenta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3217, "m_llaves");
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
			Simplem_llaves Simple = new Simplem_llaves();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.lla_cdescripcion = this._lla_cdescripcion;
Simple.lla_cnumero = this._lla_cnumero;
Simple.lla_cubicacion = this._lla_cubicacion;
Simple.lla_responsable = this._lla_responsable;
Simple.lla_iidcuenta = this._lla_iidcuenta;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_llaves Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._lla_cdescripcion = Simple.lla_cdescripcion;
this._lla_cnumero = Simple.lla_cnumero;
this._lla_cubicacion = Simple.lla_cubicacion;
this._lla_responsable = Simple.lla_responsable;
this._lla_iidcuenta = Simple.lla_iidcuenta;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_llaves(SqlConfig, UserId, (Simplem_llaves) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("lla_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_cnumero", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_cubicacion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_responsable", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lla_iidcuenta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lla_cdescripcion"] = this._lla_cdescripcion;
dr["lla_cnumero"] = this._lla_cnumero;
dr["lla_cubicacion"] = this._lla_cubicacion;
dr["lla_responsable"] = this._lla_responsable;
dr["lla_iidcuenta"] = this._lla_iidcuenta;
							 
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
