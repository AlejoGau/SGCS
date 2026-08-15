
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
    public class Callerm_dealer_vcconfig : CallerObject
    { 	
				     private string _dvc_cdealer;
					
				     private string _dvc_config;
					
				     private string _dvc_apptype;
				 ///<summary>
     ///dvc_cdealer property   
     ///</summary>   
     public string dvc_cdealer 
		 { 
		        
                    get{ return this._dvc_cdealer; }
        						set{ this._dvc_cdealer = value; } 										
	   }
	  ///<summary>
     ///dvc_config property   
     ///</summary>   
     public string dvc_config 
		 { 
		        
                    get{ return this._dvc_config; }
        						set{ this._dvc_config = value; } 										
	   }
	  ///<summary>
     ///dvc_apptype property   
     ///</summary>   
     public string dvc_apptype 
		 { 
		        
                    get{ return this._dvc_apptype; }
        						set{ this._dvc_apptype = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_dealer_vcconfig() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_dealer_vcconfig(int Id, string Name, string dvc_cdealer, string dvc_config, string dvc_apptype) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._dvc_cdealer = dvc_cdealer;
this._dvc_config = dvc_config;
this._dvc_apptype = dvc_apptype;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3213, "m_dealer_vcconfig");
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
			Simplem_dealer_vcconfig Simple = new Simplem_dealer_vcconfig();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.dvc_cdealer = this._dvc_cdealer;
Simple.dvc_config = this._dvc_config;
Simple.dvc_apptype = this._dvc_apptype;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_dealer_vcconfig Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._dvc_cdealer = Simple.dvc_cdealer;
this._dvc_config = Simple.dvc_config;
this._dvc_apptype = Simple.dvc_apptype;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_dealer_vcconfig(SqlConfig, UserId, (Simplem_dealer_vcconfig) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("dvc_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dvc_config", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dvc_apptype", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dvc_cdealer"] = this._dvc_cdealer;
dr["dvc_config"] = this._dvc_config;
dr["dvc_apptype"] = this._dvc_apptype;
							 
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
