
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
    public class Callert_CodigosEnFalla : CallerObject
    { 	
				     private string _cef_cEventosFalla;
					
				     private string _cef_cEventosRest;
				 ///<summary>
     ///cef_cEventosFalla property   
     ///</summary>   
     public string cef_cEventosFalla 
		 { 
		        
                    get{ return this._cef_cEventosFalla; }
        						set{ this._cef_cEventosFalla = value; } 										
	   }
	  ///<summary>
     ///cef_cEventosRest property   
     ///</summary>   
     public string cef_cEventosRest 
		 { 
		        
                    get{ return this._cef_cEventosRest; }
        						set{ this._cef_cEventosRest = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_CodigosEnFalla() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_CodigosEnFalla(int Id, string Name, string cef_cEventosFalla, string cef_cEventosRest) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cef_cEventosFalla = cef_cEventosFalla;
this._cef_cEventosRest = cef_cEventosRest;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7034, "t_CodigosEnFalla");
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
			Simplet_CodigosEnFalla Simple = new Simplet_CodigosEnFalla();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cef_cEventosFalla = this._cef_cEventosFalla;
Simple.cef_cEventosRest = this._cef_cEventosRest;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_CodigosEnFalla Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cef_cEventosFalla = Simple.cef_cEventosFalla;
this._cef_cEventosRest = Simple.cef_cEventosRest;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_CodigosEnFalla(SqlConfig, UserId, (Simplet_CodigosEnFalla) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cef_cEventosFalla", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cef_cEventosRest", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cef_cEventosFalla"] = this._cef_cEventosFalla;
dr["cef_cEventosRest"] = this._cef_cEventosRest;
							 
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
