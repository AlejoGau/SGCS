
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
    public class Callerp_vcrestricciones : CallerObject
    { 	
				     private string _vcr_name;
					
				     private string _vcr_list;
					
				     private int _vcr_distance;
					
				     private int _vcr_status;
					
				     private int _vcr_idorganizacion;
				 ///<summary>
     ///vcr_name property   
     ///</summary>   
     public string vcr_name 
		 { 
		        
                    get{ return this._vcr_name; }
        						set{ this._vcr_name = value; } 										
	   }
	  ///<summary>
     ///vcr_list property   
     ///</summary>   
     public string vcr_list 
		 { 
		        
                    get{ return this._vcr_list; }
        						set{ this._vcr_list = value; } 										
	   }
	  ///<summary>
     ///vcr_distance property   
     ///</summary>   
     public int vcr_distance 
		 { 
		        
                    get{ return this._vcr_distance; }
        						set{ this._vcr_distance = value; } 										
	   }
	  ///<summary>
     ///vcr_status property   
     ///</summary>   
     public int vcr_status 
		 { 
		        
                    get{ return this._vcr_status; }
        						set{ this._vcr_status = value; } 										
	   }
	  ///<summary>
     ///vcr_idorganizacion property   
     ///</summary>   
     public int vcr_idorganizacion 
		 { 
		        
                    get{ return this._vcr_idorganizacion; }
        						set{ this._vcr_idorganizacion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_vcrestricciones() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_vcrestricciones(int Id, string Name, string vcr_name, string vcr_list, int vcr_distance, int vcr_status, int vcr_idorganizacion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._vcr_name = vcr_name;
this._vcr_list = vcr_list;
this._vcr_distance = vcr_distance;
this._vcr_status = vcr_status;
this._vcr_idorganizacion = vcr_idorganizacion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3201, "p_vcrestricciones");
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
			Simplep_vcrestricciones Simple = new Simplep_vcrestricciones();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.vcr_name = this._vcr_name;
Simple.vcr_list = this._vcr_list;
Simple.vcr_distance = this._vcr_distance;
Simple.vcr_status = this._vcr_status;
Simple.vcr_idorganizacion = this._vcr_idorganizacion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_vcrestricciones Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._vcr_name = Simple.vcr_name;
this._vcr_list = Simple.vcr_list;
this._vcr_distance = Simple.vcr_distance;
this._vcr_status = Simple.vcr_status;
this._vcr_idorganizacion = Simple.vcr_idorganizacion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_vcrestricciones(SqlConfig, UserId, (Simplep_vcrestricciones) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("vcr_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vcr_list", typeof (string)));               
							 dt.Columns.Add(new DataColumn("vcr_distance", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vcr_status", typeof (int)));               
							 dt.Columns.Add(new DataColumn("vcr_idorganizacion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["vcr_name"] = this._vcr_name;
dr["vcr_list"] = this._vcr_list;
dr["vcr_distance"] = this._vcr_distance;
dr["vcr_status"] = this._vcr_status;
dr["vcr_idorganizacion"] = this._vcr_idorganizacion;
							 
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
