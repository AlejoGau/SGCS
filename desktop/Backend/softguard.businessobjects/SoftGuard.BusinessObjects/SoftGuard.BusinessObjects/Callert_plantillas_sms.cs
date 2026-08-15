
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
    public class Callert_plantillas_sms : CallerObject
    { 	
				     private string _pls_ccodigo;
					
				     private string _pls_cdescripcion;
					
				     private string _pls_mplantilla;
					
				     private string _pls_mplantillaOpnClo;
					
				     private int _pls_iTipo;
				 ///<summary>
     ///pls_ccodigo property   
     ///</summary>   
     public string pls_ccodigo 
		 { 
		        
                    get{ return this._pls_ccodigo; }
        						set{ this._pls_ccodigo = value; } 										
	   }
	  ///<summary>
     ///pls_cdescripcion property   
     ///</summary>   
     public string pls_cdescripcion 
		 { 
		        
                    get{ return this._pls_cdescripcion; }
        						set{ this._pls_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///pls_mplantilla property   
     ///</summary>   
     public string pls_mplantilla 
		 { 
		        
                    get{ return this._pls_mplantilla; }
        						set{ this._pls_mplantilla = value; } 										
	   }
	  ///<summary>
     ///pls_mplantillaOpnClo property   
     ///</summary>   
     public string pls_mplantillaOpnClo 
		 { 
		        
                    get{ return this._pls_mplantillaOpnClo; }
        						set{ this._pls_mplantillaOpnClo = value; } 										
	   }
	  ///<summary>
     ///pls_iTipo property   
     ///</summary>   
     public int pls_iTipo 
		 { 
		        
                    get{ return this._pls_iTipo; }
        						set{ this._pls_iTipo = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_plantillas_sms() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_plantillas_sms(int Id, string Name, string pls_ccodigo, string pls_cdescripcion, string pls_mplantilla, string pls_mplantillaOpnClo, int pls_iTipo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._pls_ccodigo = pls_ccodigo;
this._pls_cdescripcion = pls_cdescripcion;
this._pls_mplantilla = pls_mplantilla;
this._pls_mplantillaOpnClo = pls_mplantillaOpnClo;
this._pls_iTipo = pls_iTipo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3084, "t_plantillas_sms");
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
			Simplet_plantillas_sms Simple = new Simplet_plantillas_sms();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.pls_ccodigo = this._pls_ccodigo;
Simple.pls_cdescripcion = this._pls_cdescripcion;
Simple.pls_mplantilla = this._pls_mplantilla;
Simple.pls_mplantillaOpnClo = this._pls_mplantillaOpnClo;
Simple.pls_iTipo = this._pls_iTipo;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_plantillas_sms Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._pls_ccodigo = Simple.pls_ccodigo;
this._pls_cdescripcion = Simple.pls_cdescripcion;
this._pls_mplantilla = Simple.pls_mplantilla;
this._pls_mplantillaOpnClo = Simple.pls_mplantillaOpnClo;
this._pls_iTipo = Simple.pls_iTipo;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_plantillas_sms(SqlConfig, UserId, (Simplet_plantillas_sms) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("pls_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_mplantilla", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_mplantillaOpnClo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_iTipo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pls_ccodigo"] = this._pls_ccodigo;
dr["pls_cdescripcion"] = this._pls_cdescripcion;
dr["pls_mplantilla"] = this._pls_mplantilla;
dr["pls_mplantillaOpnClo"] = this._pls_mplantillaOpnClo;
dr["pls_iTipo"] = this._pls_iTipo;
							 
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
