
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
    public class Callert_CategoriaVC : CallerObject
    { 	
				     private string _cvc_cDescripcion;
					
				     private int _cvc_iWork;
				 ///<summary>
     ///cvc_cDescripcion property   
     ///</summary>   
     public string cvc_cDescripcion 
		 { 
		        
                    get{ return this._cvc_cDescripcion; }
        						set{ this._cvc_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///cvc_iWork property   
     ///</summary>   
     public int cvc_iWork 
		 { 
		        
                    get{ return this._cvc_iWork; }
        						set{ this._cvc_iWork = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_CategoriaVC() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_CategoriaVC(int Id, string Name, string cvc_cDescripcion, int cvc_iWork) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cvc_cDescripcion = cvc_cDescripcion;
this._cvc_iWork = cvc_iWork;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7050, "t_CategoriaVC");
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
			Simplet_CategoriaVC Simple = new Simplet_CategoriaVC();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cvc_cDescripcion = this._cvc_cDescripcion;
Simple.cvc_iWork = this._cvc_iWork;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_CategoriaVC Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cvc_cDescripcion = Simple.cvc_cDescripcion;
this._cvc_iWork = Simple.cvc_iWork;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_CategoriaVC(SqlConfig, UserId, (Simplet_CategoriaVC) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cvc_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvc_iWork", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cvc_cDescripcion"] = this._cvc_cDescripcion;
dr["cvc_iWork"] = this._cvc_iWork;
							 
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
