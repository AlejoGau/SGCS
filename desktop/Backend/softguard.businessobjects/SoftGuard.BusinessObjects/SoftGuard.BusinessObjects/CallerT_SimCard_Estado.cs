
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
    public class CallerT_SimCard_Estado : CallerObject
    { 	
				     private string _tse_cDescripcion;
				 ///<summary>
     ///tse_cDescripcion property   
     ///</summary>   
     public string tse_cDescripcion 
		 { 
		        
                    get{ return this._tse_cDescripcion; }
        						set{ this._tse_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerT_SimCard_Estado() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerT_SimCard_Estado(int Id, string Name, string tse_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tse_cDescripcion = tse_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3236, "T_SimCard_Estado");
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
			SimpleT_SimCard_Estado Simple = new SimpleT_SimCard_Estado();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tse_cDescripcion = this._tse_cDescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleT_SimCard_Estado Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tse_cDescripcion = Simple.tse_cDescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalT_SimCard_Estado(SqlConfig, UserId, (SimpleT_SimCard_Estado) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tse_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tse_cDescripcion"] = this._tse_cDescripcion;
							 
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
