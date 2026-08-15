
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
    public class CallerUserAccountFilter : CallerObject
    { 	
				     private int _uaf_userId;
					
				     private string _uaf_provinciaCodigo;
				 ///<summary>
     ///uaf_userId property   
     ///</summary>   
     public int uaf_userId 
		 { 
		        
                    get{ return this._uaf_userId; }
        						set{ this._uaf_userId = value; } 										
	   }
	  ///<summary>
     ///uaf_provinciaCodigo property   
     ///</summary>   
     public string uaf_provinciaCodigo 
		 { 
		        
                    get{ return this._uaf_provinciaCodigo; }
        						set{ this._uaf_provinciaCodigo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerUserAccountFilter() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerUserAccountFilter(int Id, string Name, int uaf_userId, string uaf_provinciaCodigo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._uaf_userId = uaf_userId;
this._uaf_provinciaCodigo = uaf_provinciaCodigo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7053, "UserAccountFilter");
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
			SimpleUserAccountFilter Simple = new SimpleUserAccountFilter();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.uaf_userId = this._uaf_userId;
Simple.uaf_provinciaCodigo = this._uaf_provinciaCodigo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleUserAccountFilter Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._uaf_userId = Simple.uaf_userId;
this._uaf_provinciaCodigo = Simple.uaf_provinciaCodigo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalUserAccountFilter(SqlConfig, UserId, (SimpleUserAccountFilter) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("uaf_userId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("uaf_provinciaCodigo", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["uaf_userId"] = this._uaf_userId;
dr["uaf_provinciaCodigo"] = this._uaf_provinciaCodigo;
							 
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
