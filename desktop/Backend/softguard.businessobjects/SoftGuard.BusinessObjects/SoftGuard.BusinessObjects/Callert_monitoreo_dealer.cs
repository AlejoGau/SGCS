
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
    public class Callert_monitoreo_dealer : CallerObject
    { 	
				     private string _tmd_clinea;
					
				     private int _tmd_diasemana;
					
				     private string _tmd_horadesde;
					
				     private string _tmd_horahasta;
					
				     private int _tmd_estado;
					
				     private int _tmd_iorganizacion;
				 ///<summary>
     ///tmd_clinea property   
     ///</summary>   
     public string tmd_clinea 
		 { 
		        
                    get{ return this._tmd_clinea; }
        						set{ this._tmd_clinea = value; } 										
	   }
	  ///<summary>
     ///tmd_diasemana property   
     ///</summary>   
     public int tmd_diasemana 
		 { 
		        
                    get{ return this._tmd_diasemana; }
        						set{ this._tmd_diasemana = value; } 										
	   }
	  ///<summary>
     ///tmd_horadesde property   
     ///</summary>   
     public string tmd_horadesde 
		 { 
		        
                    get{ return this._tmd_horadesde; }
        						set{ this._tmd_horadesde = value; } 										
	   }
	  ///<summary>
     ///tmd_horahasta property   
     ///</summary>   
     public string tmd_horahasta 
		 { 
		        
                    get{ return this._tmd_horahasta; }
        						set{ this._tmd_horahasta = value; } 										
	   }
	  ///<summary>
     ///tmd_estado property   
     ///</summary>   
     public int tmd_estado 
		 { 
		        
                    get{ return this._tmd_estado; }
        						set{ this._tmd_estado = value; } 										
	   }
	  ///<summary>
     ///tmd_iorganizacion property   
     ///</summary>   
     public int tmd_iorganizacion 
		 { 
		        
                    get{ return this._tmd_iorganizacion; }
        						set{ this._tmd_iorganizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_monitoreo_dealer() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_monitoreo_dealer(int Id, string Name, string tmd_clinea, int tmd_diasemana, string tmd_horadesde, string tmd_horahasta, int tmd_estado, int tmd_iorganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tmd_clinea = tmd_clinea;
this._tmd_diasemana = tmd_diasemana;
this._tmd_horadesde = tmd_horadesde;
this._tmd_horahasta = tmd_horahasta;
this._tmd_estado = tmd_estado;
this._tmd_iorganizacion = tmd_iorganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3189, "t_monitoreo_dealer");
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
			Simplet_monitoreo_dealer Simple = new Simplet_monitoreo_dealer();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tmd_clinea = this._tmd_clinea;
Simple.tmd_diasemana = this._tmd_diasemana;
Simple.tmd_horadesde = this._tmd_horadesde;
Simple.tmd_horahasta = this._tmd_horahasta;
Simple.tmd_estado = this._tmd_estado;
Simple.tmd_iorganizacion = this._tmd_iorganizacion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_monitoreo_dealer Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tmd_clinea = Simple.tmd_clinea;
this._tmd_diasemana = Simple.tmd_diasemana;
this._tmd_horadesde = Simple.tmd_horadesde;
this._tmd_horahasta = Simple.tmd_horahasta;
this._tmd_estado = Simple.tmd_estado;
this._tmd_iorganizacion = Simple.tmd_iorganizacion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_monitoreo_dealer(SqlConfig, UserId, (Simplet_monitoreo_dealer) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tmd_clinea", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmd_diasemana", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tmd_horadesde", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmd_horahasta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmd_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tmd_iorganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tmd_clinea"] = this._tmd_clinea;
dr["tmd_diasemana"] = this._tmd_diasemana;
dr["tmd_horadesde"] = this._tmd_horadesde;
dr["tmd_horahasta"] = this._tmd_horahasta;
dr["tmd_estado"] = this._tmd_estado;
dr["tmd_iorganizacion"] = this._tmd_iorganizacion;
							 
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
