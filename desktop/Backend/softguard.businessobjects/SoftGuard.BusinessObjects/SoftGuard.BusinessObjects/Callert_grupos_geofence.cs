
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
    public class Callert_grupos_geofence : CallerObject
    { 	
				     private string _grg_cdescripcion;
				 ///<summary>
     ///grg_cdescripcion property   
     ///</summary>   
     public string grg_cdescripcion 
		 { 
		        
                    get{ return this._grg_cdescripcion; }
        						set{ this._grg_cdescripcion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_grupos_geofence() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_grupos_geofence(int Id, string Name, string grg_cdescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._grg_cdescripcion = grg_cdescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3241, "t_grupos_geofence");
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
			Simplet_grupos_geofence Simple = new Simplet_grupos_geofence();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.grg_cdescripcion = this._grg_cdescripcion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_grupos_geofence Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._grg_cdescripcion = Simple.grg_cdescripcion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_grupos_geofence(SqlConfig, UserId, (Simplet_grupos_geofence) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("grg_cdescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["grg_cdescripcion"] = this._grg_cdescripcion;
							 
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
