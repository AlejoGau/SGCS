
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
    public class CallerT_SimCard_Marca : CallerObject
    { 	
				     private string _tsm_cDescripcion;
				 ///<summary>
     ///tsm_cDescripcion property   
     ///</summary>   
     public string tsm_cDescripcion 
		 { 
		        
                    get{ return this._tsm_cDescripcion; }
        						set{ this._tsm_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerT_SimCard_Marca() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerT_SimCard_Marca(int Id, string Name, string tsm_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tsm_cDescripcion = tsm_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3235, "T_SimCard_Marca");
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
			SimpleT_SimCard_Marca Simple = new SimpleT_SimCard_Marca();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tsm_cDescripcion = this._tsm_cDescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleT_SimCard_Marca Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tsm_cDescripcion = Simple.tsm_cDescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalT_SimCard_Marca(SqlConfig, UserId, (SimpleT_SimCard_Marca) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tsm_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tsm_cDescripcion"] = this._tsm_cDescripcion;
							 
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
