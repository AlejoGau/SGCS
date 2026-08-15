
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
    public class Callerm_dealer_stconfig : CallerObject
    { 	
				     private string _dst_cdealer;
					
				     private string _dst_config;
				 ///<summary>
     ///dst_cdealer property   
     ///</summary>   
     public string dst_cdealer 
		 { 
		        
                    get{ return this._dst_cdealer; }
        						set{ this._dst_cdealer = value; } 										
	   }
	  ///<summary>
     ///dst_config property   
     ///</summary>   
     public string dst_config 
		 { 
		        
                    get{ return this._dst_config; }
        						set{ this._dst_config = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_dealer_stconfig() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_dealer_stconfig(int Id, string Name, string dst_cdealer, string dst_config) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._dst_cdealer = dst_cdealer;
this._dst_config = dst_config;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3237, "m_dealer_stconfig");
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
			Simplem_dealer_stconfig Simple = new Simplem_dealer_stconfig();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.dst_cdealer = this._dst_cdealer;
Simple.dst_config = this._dst_config;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_dealer_stconfig Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._dst_cdealer = Simple.dst_cdealer;
this._dst_config = Simple.dst_config;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_dealer_stconfig(SqlConfig, UserId, (Simplem_dealer_stconfig) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("dst_cdealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("dst_config", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["dst_cdealer"] = this._dst_cdealer;
dr["dst_config"] = this._dst_config;
							 
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
