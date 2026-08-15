
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
    public class Callert_ResourcesModule_Type : CallerObject
    { 	
				     private string _rmt_cNombre;
					
				     private int _rmt_itipo;
					
				     private int _rmt_idOrg;
					
				     private string _rmt_cIcono;
				 ///<summary>
     ///rmt_cNombre property   
     ///</summary>   
     public string rmt_cNombre 
		 { 
		        
                    get{ return this._rmt_cNombre; }
        						set{ this._rmt_cNombre = value; } 										
	   }
	  ///<summary>
     ///rmt_itipo property   
     ///</summary>   
     public int rmt_itipo 
		 { 
		        
                    get{ return this._rmt_itipo; }
        						set{ this._rmt_itipo = value; } 										
	   }
	  ///<summary>
     ///rmt_idOrg property   
     ///</summary>   
     public int rmt_idOrg 
		 { 
		        
                    get{ return this._rmt_idOrg; }
        						set{ this._rmt_idOrg = value; } 										
	   }
	  ///<summary>
     ///rmt_cIcono property   
     ///</summary>   
     public string rmt_cIcono 
		 { 
		        
                    get{ return this._rmt_cIcono; }
        						set{ this._rmt_cIcono = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_ResourcesModule_Type() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_ResourcesModule_Type(int Id, string Name, string rmt_cNombre, int rmt_itipo, int rmt_idOrg, string rmt_cIcono) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rmt_cNombre = rmt_cNombre;
this._rmt_itipo = rmt_itipo;
this._rmt_idOrg = rmt_idOrg;
this._rmt_cIcono = rmt_cIcono;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7054, "t_ResourcesModule_Type");
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
			Simplet_ResourcesModule_Type Simple = new Simplet_ResourcesModule_Type();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rmt_cNombre = this._rmt_cNombre;
Simple.rmt_itipo = this._rmt_itipo;
Simple.rmt_idOrg = this._rmt_idOrg;
Simple.rmt_cIcono = this._rmt_cIcono;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_ResourcesModule_Type Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rmt_cNombre = Simple.rmt_cNombre;
this._rmt_itipo = Simple.rmt_itipo;
this._rmt_idOrg = Simple.rmt_idOrg;
this._rmt_cIcono = Simple.rmt_cIcono;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_ResourcesModule_Type(SqlConfig, UserId, (Simplet_ResourcesModule_Type) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rmt_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rmt_itipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rmt_idOrg", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rmt_cIcono", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rmt_cNombre"] = this._rmt_cNombre;
dr["rmt_itipo"] = this._rmt_itipo;
dr["rmt_idOrg"] = this._rmt_idOrg;
dr["rmt_cIcono"] = this._rmt_cIcono;
							 
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
