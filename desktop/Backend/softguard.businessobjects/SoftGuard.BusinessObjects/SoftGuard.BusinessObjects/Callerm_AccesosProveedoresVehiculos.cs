
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
    public class Callerm_AccesosProveedoresVehiculos : CallerObject
    { 	
				     private int _apv_idKeyProveedor;
					
				     private int _apv_idKeyVehiculo;
				 ///<summary>
     ///apv_idKeyProveedor property   
     ///</summary>   
     public int apv_idKeyProveedor 
		 { 
		        
                    get{ return this._apv_idKeyProveedor; }
        						set{ this._apv_idKeyProveedor = value; } 										
	   }
	  ///<summary>
     ///apv_idKeyVehiculo property   
     ///</summary>   
     public int apv_idKeyVehiculo 
		 { 
		        
                    get{ return this._apv_idKeyVehiculo; }
        						set{ this._apv_idKeyVehiculo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_AccesosProveedoresVehiculos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_AccesosProveedoresVehiculos(int Id, string Name, int apv_idKeyProveedor, int apv_idKeyVehiculo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._apv_idKeyProveedor = apv_idKeyProveedor;
this._apv_idKeyVehiculo = apv_idKeyVehiculo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3230, "m_AccesosProveedoresVehiculos");
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
			Simplem_AccesosProveedoresVehiculos Simple = new Simplem_AccesosProveedoresVehiculos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.apv_idKeyProveedor = this._apv_idKeyProveedor;
Simple.apv_idKeyVehiculo = this._apv_idKeyVehiculo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_AccesosProveedoresVehiculos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._apv_idKeyProveedor = Simple.apv_idKeyProveedor;
this._apv_idKeyVehiculo = Simple.apv_idKeyVehiculo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_AccesosProveedoresVehiculos(SqlConfig, UserId, (Simplem_AccesosProveedoresVehiculos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("apv_idKeyProveedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apv_idKeyVehiculo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apv_idKeyProveedor"] = this._apv_idKeyProveedor;
dr["apv_idKeyVehiculo"] = this._apv_idKeyVehiculo;
							 
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
