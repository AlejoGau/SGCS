
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
    public class CallerT_AccesosTipoDocumento : CallerObject
    { 	
				     private string _atd_cDescripcion;
					
				     private int _atd_iPideVto;
					
				     private int _atd_iUploadFile;
				 ///<summary>
     ///atd_cDescripcion property   
     ///</summary>   
     public string atd_cDescripcion 
		 { 
		        
                    get{ return this._atd_cDescripcion; }
        						set{ this._atd_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///atd_iPideVto property   
     ///</summary>   
     public int atd_iPideVto 
		 { 
		        
                    get{ return this._atd_iPideVto; }
        						set{ this._atd_iPideVto = value; } 										
	   }
	  ///<summary>
     ///atd_iUploadFile property   
     ///</summary>   
     public int atd_iUploadFile 
		 { 
		        
                    get{ return this._atd_iUploadFile; }
        						set{ this._atd_iUploadFile = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerT_AccesosTipoDocumento() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerT_AccesosTipoDocumento(int Id, string Name, string atd_cDescripcion, int atd_iPideVto, int atd_iUploadFile) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._atd_cDescripcion = atd_cDescripcion;
this._atd_iPideVto = atd_iPideVto;
this._atd_iUploadFile = atd_iUploadFile;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3226, "T_AccesosTipoDocumento");
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
			SimpleT_AccesosTipoDocumento Simple = new SimpleT_AccesosTipoDocumento();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.atd_cDescripcion = this._atd_cDescripcion;
Simple.atd_iPideVto = this._atd_iPideVto;
Simple.atd_iUploadFile = this._atd_iUploadFile;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleT_AccesosTipoDocumento Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._atd_cDescripcion = Simple.atd_cDescripcion;
this._atd_iPideVto = Simple.atd_iPideVto;
this._atd_iUploadFile = Simple.atd_iUploadFile;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalT_AccesosTipoDocumento(SqlConfig, UserId, (SimpleT_AccesosTipoDocumento) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("atd_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("atd_iPideVto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("atd_iUploadFile", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["atd_cDescripcion"] = this._atd_cDescripcion;
dr["atd_iPideVto"] = this._atd_iPideVto;
dr["atd_iUploadFile"] = this._atd_iUploadFile;
							 
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
