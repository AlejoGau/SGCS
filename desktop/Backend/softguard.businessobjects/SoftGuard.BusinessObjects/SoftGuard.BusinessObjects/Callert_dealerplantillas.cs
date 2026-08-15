
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
    public class Callert_dealerplantillas : CallerObject
    { 	
				     private int _lin_idkey;
					
				     private int _pls_idkey;
				 ///<summary>
     ///lin_idkey property   
     ///</summary>   
     public int lin_idkey 
		 { 
		        
                    get{ return this._lin_idkey; }
        						set{ this._lin_idkey = value; } 										
	   }
	  ///<summary>
     ///pls_idkey property   
     ///</summary>   
     public int pls_idkey 
		 { 
		        
                    get{ return this._pls_idkey; }
        						set{ this._pls_idkey = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_dealerplantillas() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_dealerplantillas(int Id, string Name, int lin_idkey, int pls_idkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._lin_idkey = lin_idkey;
this._pls_idkey = pls_idkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3176, "t_dealerplantillas");
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
			Simplet_dealerplantillas Simple = new Simplet_dealerplantillas();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.lin_idkey = this._lin_idkey;
Simple.pls_idkey = this._pls_idkey;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_dealerplantillas Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._lin_idkey = Simple.lin_idkey;
this._pls_idkey = Simple.pls_idkey;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_dealerplantillas(SqlConfig, UserId, (Simplet_dealerplantillas) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("lin_idkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pls_idkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["lin_idkey"] = this._lin_idkey;
dr["pls_idkey"] = this._pls_idkey;
							 
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
