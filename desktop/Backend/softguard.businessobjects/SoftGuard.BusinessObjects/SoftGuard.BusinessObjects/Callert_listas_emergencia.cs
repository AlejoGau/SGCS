
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
    public class Callert_listas_emergencia : CallerObject
    { 	
				     private string _lis_ccodigo;
					
				     private string _lis_cdescripcion;
				 ///<summary>
     ///lis_ccodigo property   
     ///</summary>   
     public string lis_ccodigo 
		 { 
		        
                    get{ return this._lis_ccodigo; }
        						set{ this._lis_ccodigo = value; } 										
	   }
	  ///<summary>
     ///lis_cdescripcion property   
     ///</summary>   
     public string lis_cdescripcion 
		 { 
		        
                    get{ return this._lis_cdescripcion; }
        						set{ this._lis_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_listas_emergencia() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_listas_emergencia(int Id, string Name, string lis_ccodigo, string lis_cdescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._lis_ccodigo = lis_ccodigo;
this._lis_cdescripcion = lis_cdescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3071, "t_listas_emergencia");
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
			Simplet_listas_emergencia Simple = new Simplet_listas_emergencia();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.lis_ccodigo = this._lis_ccodigo;
Simple.lis_cdescripcion = this._lis_cdescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_listas_emergencia Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._lis_ccodigo = Simple.lis_ccodigo;
this._lis_cdescripcion = Simple.lis_cdescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_listas_emergencia(SqlConfig, UserId, (Simplet_listas_emergencia) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("lis_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("lis_cdescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lis_ccodigo"] = this._lis_ccodigo;
dr["lis_cdescripcion"] = this._lis_cdescripcion;
							 
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
