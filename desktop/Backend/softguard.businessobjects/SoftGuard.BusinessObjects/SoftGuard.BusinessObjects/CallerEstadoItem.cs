
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
    public class CallerEstadoItem : CallerObject
    { 	
				     private int _est_iidcuenta;
					
				     private string _est_czona;
					
				     private string _est_cData;
				 ///<summary>
     ///est_iidcuenta property   
     ///</summary>   
     public int est_iidcuenta 
		 { 
		        
                    get{ return this._est_iidcuenta; }
        						set{ this._est_iidcuenta = value; } 										
	   }
	  ///<summary>
     ///est_czona property   
     ///</summary>   
     public string est_czona 
		 { 
		        
                    get{ return this._est_czona; }
        						set{ this._est_czona = value; } 										
	   }
	  ///<summary>
     ///est_cData property   
     ///</summary>   
     public string est_cData 
		 { 
		        
                    get{ return this._est_cData; }
        						set{ this._est_cData = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerEstadoItem() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerEstadoItem(int Id, string Name, int est_iidcuenta, string est_czona, string est_cData) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._est_iidcuenta = est_iidcuenta;
this._est_czona = est_czona;
this._est_cData = est_cData;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3034, "EstadoItem");
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
			SimpleEstadoItem Simple = new SimpleEstadoItem();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.est_iidcuenta = this._est_iidcuenta;
Simple.est_czona = this._est_czona;
Simple.est_cData = this._est_cData;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleEstadoItem Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._est_iidcuenta = Simple.est_iidcuenta;
this._est_czona = Simple.est_czona;
this._est_cData = Simple.est_cData;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalEstadoItem(SqlConfig, UserId, (SimpleEstadoItem) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("est_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("est_czona", typeof (string)));               
							 dt.Columns.Add(new DataColumn("est_cData", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["est_iidcuenta"] = this._est_iidcuenta;
dr["est_czona"] = this._est_czona;
dr["est_cData"] = this._est_cData;
							 
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
