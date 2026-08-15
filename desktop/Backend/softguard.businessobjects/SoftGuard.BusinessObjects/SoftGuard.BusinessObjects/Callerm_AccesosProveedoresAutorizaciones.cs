
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
    public class Callerm_AccesosProveedoresAutorizaciones : CallerObject
    { 	
				     private int _apa_idKeyProveedor;
					
				     private int _apa_idKeyUF;
				 ///<summary>
     ///apa_idKeyProveedor property   
     ///</summary>   
     public int apa_idKeyProveedor 
		 { 
		        
                    get{ return this._apa_idKeyProveedor; }
        						set{ this._apa_idKeyProveedor = value; } 										
	   }
	  ///<summary>
     ///apa_idKeyUF property   
     ///</summary>   
     public int apa_idKeyUF 
		 { 
		        
                    get{ return this._apa_idKeyUF; }
        						set{ this._apa_idKeyUF = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_AccesosProveedoresAutorizaciones() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_AccesosProveedoresAutorizaciones(int Id, string Name, int apa_idKeyProveedor, int apa_idKeyUF) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._apa_idKeyProveedor = apa_idKeyProveedor;
this._apa_idKeyUF = apa_idKeyUF;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3229, "m_AccesosProveedoresAutorizaciones");
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
			Simplem_AccesosProveedoresAutorizaciones Simple = new Simplem_AccesosProveedoresAutorizaciones();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.apa_idKeyProveedor = this._apa_idKeyProveedor;
Simple.apa_idKeyUF = this._apa_idKeyUF;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_AccesosProveedoresAutorizaciones Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._apa_idKeyProveedor = Simple.apa_idKeyProveedor;
this._apa_idKeyUF = Simple.apa_idKeyUF;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_AccesosProveedoresAutorizaciones(SqlConfig, UserId, (Simplem_AccesosProveedoresAutorizaciones) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("apa_idKeyProveedor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("apa_idKeyUF", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["apa_idKeyProveedor"] = this._apa_idKeyProveedor;
dr["apa_idKeyUF"] = this._apa_idKeyUF;
							 
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
