
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
    public class Callerm_dealer_spconfig : CallerObject
    { 	
				     private string _dsp_cdealer;
					
				     private string _dsp_config;
				 ///<summary>
     ///dsp_cdealer property   
     ///</summary>   
     public string dsp_cdealer 
		 { 
		        
                    get{ return this._dsp_cdealer; }
        						set{ this._dsp_cdealer = value; } 										
	   }
	  ///<summary>
     ///dsp_config property   
     ///</summary>   
     public string dsp_config 
		 { 
		        
                    get{ return this._dsp_config; }
        						set{ this._dsp_config = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_dealer_spconfig() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_dealer_spconfig(int Id, string Name, string dsp_cdealer, string dsp_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._dsp_cdealer = dsp_cdealer;
this._dsp_config = dsp_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3193, "m_dealer_spconfig");
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
			Simplem_dealer_spconfig Simple = new Simplem_dealer_spconfig();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.dsp_cdealer = this._dsp_cdealer;
Simple.dsp_config = this._dsp_config;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_dealer_spconfig Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._dsp_cdealer = Simple.dsp_cdealer;
this._dsp_config = Simple.dsp_config;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_dealer_spconfig(SqlConfig, UserId, (Simplem_dealer_spconfig) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("dsp_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dsp_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dsp_cdealer"] = this._dsp_cdealer;
dr["dsp_config"] = this._dsp_config;
							 
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
