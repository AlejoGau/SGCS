
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
    public class Callert_monedas : CallerObject
    { 	
				     private string _mon_ccodigo;
					
				     private string _mon_cnombre;
					
				     private string _mon_csymbol;
				 ///<summary>
     ///mon_ccodigo property   
     ///</summary>   
     public string mon_ccodigo 
		 { 
		        
                    get{ return this._mon_ccodigo; }
        						set{ this._mon_ccodigo = value; } 										
	   }
	  ///<summary>
     ///mon_cnombre property   
     ///</summary>   
     public string mon_cnombre 
		 { 
		        
                    get{ return this._mon_cnombre; }
        						set{ this._mon_cnombre = value; } 										
	   }
	  ///<summary>
     ///mon_csymbol property   
     ///</summary>   
     public string mon_csymbol 
		 { 
		        
                    get{ return this._mon_csymbol; }
        						set{ this._mon_csymbol = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_monedas() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_monedas(int Id, string Name, string mon_ccodigo, string mon_cnombre, string mon_csymbol) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mon_ccodigo = mon_ccodigo;
this._mon_cnombre = mon_cnombre;
this._mon_csymbol = mon_csymbol;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3186, "t_monedas");
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
			Simplet_monedas Simple = new Simplet_monedas();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mon_ccodigo = this._mon_ccodigo;
Simple.mon_cnombre = this._mon_cnombre;
Simple.mon_csymbol = this._mon_csymbol;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_monedas Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mon_ccodigo = Simple.mon_ccodigo;
this._mon_cnombre = Simple.mon_cnombre;
this._mon_csymbol = Simple.mon_csymbol;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_monedas(SqlConfig, UserId, (Simplet_monedas) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mon_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mon_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mon_csymbol", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mon_ccodigo"] = this._mon_ccodigo;
dr["mon_cnombre"] = this._mon_cnombre;
dr["mon_csymbol"] = this._mon_csymbol;
							 
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
