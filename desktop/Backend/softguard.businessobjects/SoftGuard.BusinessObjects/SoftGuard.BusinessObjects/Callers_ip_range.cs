
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
    public class Callers_ip_range : CallerObject
    { 	
				     private string _ipr_name;
					
				     private string _ipr_desde;
					
				     private string _ipr_hasta;
					
				     private int _ipr_estado;
				 ///<summary>
     ///ipr_name property   
     ///</summary>   
     public string ipr_name 
		 { 
		        
                    get{ return this._ipr_name; }
        						set{ this._ipr_name = value; } 										
	   }
	  ///<summary>
     ///ipr_desde property   
     ///</summary>   
     public string ipr_desde 
		 { 
		        
                    get{ return this._ipr_desde; }
        						set{ this._ipr_desde = value; } 										
	   }
	  ///<summary>
     ///ipr_hasta property   
     ///</summary>   
     public string ipr_hasta 
		 { 
		        
                    get{ return this._ipr_hasta; }
        						set{ this._ipr_hasta = value; } 										
	   }
	  ///<summary>
     ///ipr_estado property   
     ///</summary>   
     public int ipr_estado 
		 { 
		        
                    get{ return this._ipr_estado; }
        						set{ this._ipr_estado = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callers_ip_range() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callers_ip_range(int Id, string Name, string ipr_name, string ipr_desde, string ipr_hasta, int ipr_estado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ipr_name = ipr_name;
this._ipr_desde = ipr_desde;
this._ipr_hasta = ipr_hasta;
this._ipr_estado = ipr_estado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3182, "s_ip_range");
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
			Simples_ip_range Simple = new Simples_ip_range();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ipr_name = this._ipr_name;
Simple.ipr_desde = this._ipr_desde;
Simple.ipr_hasta = this._ipr_hasta;
Simple.ipr_estado = this._ipr_estado;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simples_ip_range Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ipr_name = Simple.ipr_name;
this._ipr_desde = Simple.ipr_desde;
this._ipr_hasta = Simple.ipr_hasta;
this._ipr_estado = Simple.ipr_estado;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dals_ip_range(SqlConfig, UserId, (Simples_ip_range) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ipr_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ipr_desde", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ipr_hasta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ipr_estado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ipr_name"] = this._ipr_name;
dr["ipr_desde"] = this._ipr_desde;
dr["ipr_hasta"] = this._ipr_hasta;
dr["ipr_estado"] = this._ipr_estado;
							 
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
