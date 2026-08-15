
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
    public class Callerm_cuetnta_grupo : CallerObject
    { 	
				     private string _cgr_cnombre;
					
				     private int _cgr_itipo;
					
				     private int _cgr_iidcuenta;
				 ///<summary>
     ///cgr_cnombre property   
     ///</summary>   
     public string cgr_cnombre 
		 { 
		        
                    get{ return this._cgr_cnombre; }
        						set{ this._cgr_cnombre = value; } 										
	   }
	  ///<summary>
     ///cgr_itipo property   
     ///</summary>   
     public int cgr_itipo 
		 { 
		        
                    get{ return this._cgr_itipo; }
        						set{ this._cgr_itipo = value; } 										
	   }
	  ///<summary>
     ///cgr_iidcuenta property   
     ///</summary>   
     public int cgr_iidcuenta 
		 { 
		        
                    get{ return this._cgr_iidcuenta; }
        						set{ this._cgr_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_cuetnta_grupo() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuetnta_grupo(int Id, string Name, string cgr_cnombre, int cgr_itipo, int cgr_iidcuenta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cgr_cnombre = cgr_cnombre;
this._cgr_itipo = cgr_itipo;
this._cgr_iidcuenta = cgr_iidcuenta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3218, "m_cuetnta_grupo");
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
			Simplem_cuetnta_grupo Simple = new Simplem_cuetnta_grupo();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cgr_cnombre = this._cgr_cnombre;
Simple.cgr_itipo = this._cgr_itipo;
Simple.cgr_iidcuenta = this._cgr_iidcuenta;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuetnta_grupo Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cgr_cnombre = Simple.cgr_cnombre;
this._cgr_itipo = Simple.cgr_itipo;
this._cgr_iidcuenta = Simple.cgr_iidcuenta;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuetnta_grupo(SqlConfig, UserId, (Simplem_cuetnta_grupo) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cgr_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cgr_itipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cgr_iidcuenta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cgr_cnombre"] = this._cgr_cnombre;
dr["cgr_itipo"] = this._cgr_itipo;
dr["cgr_iidcuenta"] = this._cgr_iidcuenta;
							 
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
