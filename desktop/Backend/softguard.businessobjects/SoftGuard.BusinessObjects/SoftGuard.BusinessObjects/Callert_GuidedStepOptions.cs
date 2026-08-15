
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
    public class Callert_GuidedStepOptions : CallerObject
    { 	
				     private string _gso_cDescripcion;
					
				     private string _gso_cType;
				 ///<summary>
     ///gso_cDescripcion property   
     ///</summary>   
     public string gso_cDescripcion 
		 { 
		        
                    get{ return this._gso_cDescripcion; }
        						set{ this._gso_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///gso_cType property   
     ///</summary>   
     public string gso_cType 
		 { 
		        
                    get{ return this._gso_cType; }
        						set{ this._gso_cType = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_GuidedStepOptions() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_GuidedStepOptions(int Id, string Name, string gso_cDescripcion, string gso_cType) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._gso_cDescripcion = gso_cDescripcion;
this._gso_cType = gso_cType;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7044, "t_GuidedStepOptions");
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
			Simplet_GuidedStepOptions Simple = new Simplet_GuidedStepOptions();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.gso_cDescripcion = this._gso_cDescripcion;
Simple.gso_cType = this._gso_cType;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_GuidedStepOptions Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._gso_cDescripcion = Simple.gso_cDescripcion;
this._gso_cType = Simple.gso_cType;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_GuidedStepOptions(SqlConfig, UserId, (Simplet_GuidedStepOptions) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("gso_cDescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("gso_cType", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["gso_cDescripcion"] = this._gso_cDescripcion;
dr["gso_cType"] = this._gso_cType;
							 
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
