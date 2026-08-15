
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
    public class CallerMG_product_impuesto : CallerObject
    { 	
				     private int _mpi_idproduct;
					
				     private int _mpi_impidkey;
				 ///<summary>
     ///mpi_idproduct property   
     ///</summary>   
     public int mpi_idproduct 
		 { 
		        
                    get{ return this._mpi_idproduct; }
        						set{ this._mpi_idproduct = value; } 										
	   }
	  ///<summary>
     ///mpi_impidkey property   
     ///</summary>   
     public int mpi_impidkey 
		 { 
		        
                    get{ return this._mpi_impidkey; }
        						set{ this._mpi_impidkey = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_product_impuesto() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_product_impuesto(int Id, string Name, int mpi_idproduct, int mpi_impidkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mpi_idproduct = mpi_idproduct;
this._mpi_impidkey = mpi_impidkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3199, "MG_product_impuesto");
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
			SimpleMG_product_impuesto Simple = new SimpleMG_product_impuesto();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mpi_idproduct = this._mpi_idproduct;
Simple.mpi_impidkey = this._mpi_impidkey;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_product_impuesto Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mpi_idproduct = Simple.mpi_idproduct;
this._mpi_impidkey = Simple.mpi_impidkey;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_product_impuesto(SqlConfig, UserId, (SimpleMG_product_impuesto) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mpi_idproduct", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mpi_impidkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mpi_idproduct"] = this._mpi_idproduct;
dr["mpi_impidkey"] = this._mpi_impidkey;
							 
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
