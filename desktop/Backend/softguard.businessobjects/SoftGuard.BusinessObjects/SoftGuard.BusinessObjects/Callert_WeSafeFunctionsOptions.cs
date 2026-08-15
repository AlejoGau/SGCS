
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
    public class Callert_WeSafeFunctionsOptions : CallerObject
    { 	
				     private int _wco_idKey;
					
				     private string _wco_cDescripcion;
				 ///<summary>
     ///wco_idKey property   
     ///</summary>   
     public int wco_idKey 
		 { 
		        
                    get{ return this._wco_idKey; }
        						set{ this._wco_idKey = value; } 										
	   }
	  ///<summary>
     ///wco_cDescripcion property   
     ///</summary>   
     public string wco_cDescripcion 
		 { 
		        
                    get{ return this._wco_cDescripcion; }
        						set{ this._wco_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_WeSafeFunctionsOptions() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_WeSafeFunctionsOptions(int Id, string Name, int wco_idKey, string wco_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._wco_idKey = wco_idKey;
this._wco_cDescripcion = wco_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7042, "t_WeSafeFunctionsOptions");
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
			Simplet_WeSafeFunctionsOptions Simple = new Simplet_WeSafeFunctionsOptions();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.wco_idKey = this._wco_idKey;
Simple.wco_cDescripcion = this._wco_cDescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_WeSafeFunctionsOptions Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._wco_idKey = Simple.wco_idKey;
this._wco_cDescripcion = Simple.wco_cDescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_WeSafeFunctionsOptions(SqlConfig, UserId, (Simplet_WeSafeFunctionsOptions) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("wco_idKey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("wco_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wco_idKey"] = this._wco_idKey;
dr["wco_cDescripcion"] = this._wco_cDescripcion;
							 
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
