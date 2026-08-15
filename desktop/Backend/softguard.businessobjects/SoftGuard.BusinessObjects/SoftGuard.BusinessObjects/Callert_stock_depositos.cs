
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
    public class Callert_stock_depositos : CallerObject
    { 	
				     private int _tsd_idorganizacion;
					
				     private int _tsd_idtecnico;
					
				     private int _tsd_estado;
				 ///<summary>
     ///tsd_idorganizacion property   
     ///</summary>   
     public int tsd_idorganizacion 
		 { 
		        
                    get{ return this._tsd_idorganizacion; }
        						set{ this._tsd_idorganizacion = value; } 										
	   }
	  ///<summary>
     ///tsd_idtecnico property   
     ///</summary>   
     public int tsd_idtecnico 
		 { 
		        
                    get{ return this._tsd_idtecnico; }
        						set{ this._tsd_idtecnico = value; } 										
	   }
	  ///<summary>
     ///tsd_estado property   
     ///</summary>   
     public int tsd_estado 
		 { 
		        
                    get{ return this._tsd_estado; }
        						set{ this._tsd_estado = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_stock_depositos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_stock_depositos(int Id, string Name, int tsd_idorganizacion, int tsd_idtecnico, int tsd_estado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tsd_idorganizacion = tsd_idorganizacion;
this._tsd_idtecnico = tsd_idtecnico;
this._tsd_estado = tsd_estado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3140, "t_stock_depositos");
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
			Simplet_stock_depositos Simple = new Simplet_stock_depositos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tsd_idorganizacion = this._tsd_idorganizacion;
Simple.tsd_idtecnico = this._tsd_idtecnico;
Simple.tsd_estado = this._tsd_estado;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_stock_depositos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tsd_idorganizacion = Simple.tsd_idorganizacion;
this._tsd_idtecnico = Simple.tsd_idtecnico;
this._tsd_estado = Simple.tsd_estado;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_stock_depositos(SqlConfig, UserId, (Simplet_stock_depositos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tsd_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tsd_idtecnico", typeof (int)));               
							 dt.Columns.Add(new DataColumn("tsd_estado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tsd_idorganizacion"] = this._tsd_idorganizacion;
dr["tsd_idtecnico"] = this._tsd_idtecnico;
dr["tsd_estado"] = this._tsd_estado;
							 
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
