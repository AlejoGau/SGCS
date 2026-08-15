
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
    public class CallerMG_Afip_Cae : CallerObject
    { 	
				     private int _mac_idcbte;
					
				     private int _mac_estado;
					
				     private DateTime? _mac_fechaalta;
					
				     private DateTime? _mac_fechamod;
				 ///<summary>
     ///mac_idcbte property   
     ///</summary>   
     public int mac_idcbte 
		 { 
		        
                    get{ return this._mac_idcbte; }
        						set{ this._mac_idcbte = value; } 										
	   }
	  ///<summary>
     ///mac_estado property   
     ///</summary>   
     public int mac_estado 
		 { 
		        
                    get{ return this._mac_estado; }
        						set{ this._mac_estado = value; } 										
	   }
	  ///<summary>
     ///mac_fechaalta property   
     ///</summary>   
     public DateTime? mac_fechaalta 
		 { 
		        
                    get{ return this._mac_fechaalta; }
        						set{ this._mac_fechaalta = value; } 										
	   }
	  ///<summary>
     ///mac_fechamod property   
     ///</summary>   
     public DateTime? mac_fechamod 
		 { 
		        
                    get{ return this._mac_fechamod; }
        						set{ this._mac_fechamod = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerMG_Afip_Cae() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerMG_Afip_Cae(int Id, string Name, int mac_idcbte, int mac_estado, DateTime? mac_fechaalta, DateTime? mac_fechamod) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._mac_idcbte = mac_idcbte;
this._mac_estado = mac_estado;
this._mac_fechaalta = mac_fechaalta;
this._mac_fechamod = mac_fechamod;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3197, "MG_Afip_Cae");
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
			SimpleMG_Afip_Cae Simple = new SimpleMG_Afip_Cae();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.mac_idcbte = this._mac_idcbte;
Simple.mac_estado = this._mac_estado;
Simple.mac_fechaalta = this._mac_fechaalta;
Simple.mac_fechamod = this._mac_fechamod;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleMG_Afip_Cae Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._mac_idcbte = Simple.mac_idcbte;
this._mac_estado = Simple.mac_estado;
this._mac_fechaalta = Simple.mac_fechaalta;
this._mac_fechamod = Simple.mac_fechamod;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalMG_Afip_Cae(SqlConfig, UserId, (SimpleMG_Afip_Cae) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("mac_idcbte", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mac_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mac_fechaalta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mac_fechamod", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mac_idcbte"] = this._mac_idcbte;
dr["mac_estado"] = this._mac_estado;
dr["mac_fechaalta"] = this._mac_fechaalta;
dr["mac_fechamod"] = this._mac_fechamod;
							 
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
