
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
    public class Callert_WeSafePeriodicityOptions : CallerObject
    { 	
				     private string _wpo_cDescripcion;
				 ///<summary>
     ///wpo_cDescripcion property   
     ///</summary>   
     public string wpo_cDescripcion 
		 { 
		        
                    get{ return this._wpo_cDescripcion; }
        						set{ this._wpo_cDescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_WeSafePeriodicityOptions() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_WeSafePeriodicityOptions(int Id, string Name, string wpo_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._wpo_cDescripcion = wpo_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7039, "t_WeSafePeriodicityOptions");
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
			Simplet_WeSafePeriodicityOptions Simple = new Simplet_WeSafePeriodicityOptions();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.wpo_cDescripcion = this._wpo_cDescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_WeSafePeriodicityOptions Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._wpo_cDescripcion = Simple.wpo_cDescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_WeSafePeriodicityOptions(SqlConfig, UserId, (Simplet_WeSafePeriodicityOptions) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("wpo_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["wpo_cDescripcion"] = this._wpo_cDescripcion;
							 
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
