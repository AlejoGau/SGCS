
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
    public class Callert_FormulariosST : CallerObject
    { 	
				     private string _fst_cNombre;
					
				     private int _fst_iStatus;
					
				     private int _fst_iTipo;
					
				     private string _fst_cDealer;
					
				     private string _fst_cArchivo;
				 ///<summary>
     ///fst_cNombre property   
     ///</summary>   
     public string fst_cNombre 
		 { 
		        
                    get{ return this._fst_cNombre; }
        						set{ this._fst_cNombre = value; } 										
	   }
	  ///<summary>
     ///fst_iStatus property   
     ///</summary>   
     public int fst_iStatus 
		 { 
		        
                    get{ return this._fst_iStatus; }
        						set{ this._fst_iStatus = value; } 										
	   }
	  ///<summary>
     ///fst_iTipo property   
     ///</summary>   
     public int fst_iTipo 
		 { 
		        
                    get{ return this._fst_iTipo; }
        						set{ this._fst_iTipo = value; } 										
	   }
	  ///<summary>
     ///fst_cDealer property   
     ///</summary>   
     public string fst_cDealer 
		 { 
		        
                    get{ return this._fst_cDealer; }
        						set{ this._fst_cDealer = value; } 										
	   }
	  ///<summary>
     ///fst_cArchivo property   
     ///</summary>   
     public string fst_cArchivo 
		 { 
		        
                    get{ return this._fst_cArchivo; }
        						set{ this._fst_cArchivo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_FormulariosST() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_FormulariosST(int Id, string Name, string fst_cNombre, int fst_iStatus, int fst_iTipo, string fst_cDealer, string fst_cArchivo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._fst_cNombre = fst_cNombre;
this._fst_iStatus = fst_iStatus;
this._fst_iTipo = fst_iTipo;
this._fst_cDealer = fst_cDealer;
this._fst_cArchivo = fst_cArchivo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7051, "t_FormulariosST");
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
			Simplet_FormulariosST Simple = new Simplet_FormulariosST();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.fst_cNombre = this._fst_cNombre;
Simple.fst_iStatus = this._fst_iStatus;
Simple.fst_iTipo = this._fst_iTipo;
Simple.fst_cDealer = this._fst_cDealer;
Simple.fst_cArchivo = this._fst_cArchivo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_FormulariosST Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._fst_cNombre = Simple.fst_cNombre;
this._fst_iStatus = Simple.fst_iStatus;
this._fst_iTipo = Simple.fst_iTipo;
this._fst_cDealer = Simple.fst_cDealer;
this._fst_cArchivo = Simple.fst_cArchivo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_FormulariosST(SqlConfig, UserId, (Simplet_FormulariosST) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("fst_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fst_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("fst_iTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("fst_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fst_cArchivo", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["fst_cNombre"] = this._fst_cNombre;
dr["fst_iStatus"] = this._fst_iStatus;
dr["fst_iTipo"] = this._fst_iTipo;
dr["fst_cDealer"] = this._fst_cDealer;
dr["fst_cArchivo"] = this._fst_cArchivo;
							 
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
