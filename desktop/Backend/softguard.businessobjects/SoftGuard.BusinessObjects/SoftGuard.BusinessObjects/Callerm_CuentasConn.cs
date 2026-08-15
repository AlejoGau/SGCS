
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
    public class Callerm_CuentasConn : CallerObject
    { 	
				     private int _cco_iidCuenta;
					
				     private int _cco_iConexion;
				 ///<summary>
     ///cco_iidCuenta property   
     ///</summary>   
     public int cco_iidCuenta 
		 { 
		        
                    get{ return this._cco_iidCuenta; }
        						set{ this._cco_iidCuenta = value; } 										
	   }
	  ///<summary>
     ///cco_iConexion property   
     ///</summary>   
     public int cco_iConexion 
		 { 
		        
                    get{ return this._cco_iConexion; }
        						set{ this._cco_iConexion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_CuentasConn() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_CuentasConn(int Id, string Name, int cco_iidCuenta, int cco_iConexion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cco_iidCuenta = cco_iidCuenta;
this._cco_iConexion = cco_iConexion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7030, "m_CuentasConn");
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
			Simplem_CuentasConn Simple = new Simplem_CuentasConn();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cco_iidCuenta = this._cco_iidCuenta;
Simple.cco_iConexion = this._cco_iConexion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_CuentasConn Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cco_iidCuenta = Simple.cco_iidCuenta;
this._cco_iConexion = Simple.cco_iConexion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_CuentasConn(SqlConfig, UserId, (Simplem_CuentasConn) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("cco_iidCuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cco_iConexion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cco_iidCuenta"] = this._cco_iidCuenta;
dr["cco_iConexion"] = this._cco_iConexion;
							 
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
