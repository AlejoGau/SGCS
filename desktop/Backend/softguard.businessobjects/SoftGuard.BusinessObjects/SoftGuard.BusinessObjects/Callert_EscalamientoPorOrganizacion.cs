
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
    public class Callert_EscalamientoPorOrganizacion : CallerObject
    { 	
				     private int _teo_iTiempo;
					
				     private Decimal _teo_nControla;
				 ///<summary>
     ///teo_iTiempo property   
     ///</summary>   
     public int teo_iTiempo 
		 { 
		        
                    get{ return this._teo_iTiempo; }
        						set{ this._teo_iTiempo = value; } 										
	   }
	  ///<summary>
     ///teo_nControla property   
     ///</summary>   
     public Decimal teo_nControla 
		 { 
		        
                    get{ return this._teo_nControla; }
        						set{ this._teo_nControla = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_EscalamientoPorOrganizacion() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_EscalamientoPorOrganizacion(int Id, string Name, int teo_iTiempo, Decimal teo_nControla) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._teo_iTiempo = teo_iTiempo;
this._teo_nControla = teo_nControla;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3196, "t_EscalamientoPorOrganizacion");
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
			Simplet_EscalamientoPorOrganizacion Simple = new Simplet_EscalamientoPorOrganizacion();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.teo_iTiempo = this._teo_iTiempo;
Simple.teo_nControla = this._teo_nControla;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_EscalamientoPorOrganizacion Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._teo_iTiempo = Simple.teo_iTiempo;
this._teo_nControla = Simple.teo_nControla;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_EscalamientoPorOrganizacion(SqlConfig, UserId, (Simplet_EscalamientoPorOrganizacion) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("teo_iTiempo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("teo_nControla", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["teo_iTiempo"] = this._teo_iTiempo;
dr["teo_nControla"] = this._teo_nControla;
							 
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
