
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
    public class Callerm_receptores_item : CallerObject
    { 	
				     private int _rec_iid;
					
				     private string _rec_cformato;
					
				     private int _rec_iConexion;
				 ///<summary>
     ///rec_iid property   
     ///</summary>   
     public int rec_iid 
		 { 
		        
                    get{ return this._rec_iid; }
        						set{ this._rec_iid = value; } 										
	   }
	  ///<summary>
     ///rec_cformato property   
     ///</summary>   
     public string rec_cformato 
		 { 
		        
                    get{ return this._rec_cformato; }
        						set{ this._rec_cformato = value; } 										
	   }
	  ///<summary>
     ///rec_iConexion property   
     ///</summary>   
     public int rec_iConexion 
		 { 
		        
                    get{ return this._rec_iConexion; }
        						set{ this._rec_iConexion = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_receptores_item() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_receptores_item(int Id, string Name, int rec_iid, string rec_cformato, int rec_iConexion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._rec_iid = rec_iid;
this._rec_cformato = rec_cformato;
this._rec_iConexion = rec_iConexion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3068, "m_receptores_item");
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
			Simplem_receptores_item Simple = new Simplem_receptores_item();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.rec_iid = this._rec_iid;
Simple.rec_cformato = this._rec_cformato;
Simple.rec_iConexion = this._rec_iConexion;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_receptores_item Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._rec_iid = Simple.rec_iid;
this._rec_cformato = Simple.rec_cformato;
this._rec_iConexion = Simple.rec_iConexion;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_receptores_item(SqlConfig, UserId, (Simplem_receptores_item) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("rec_iid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rec_cformato", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rec_iConexion", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rec_iid"] = this._rec_iid;
dr["rec_cformato"] = this._rec_cformato;
dr["rec_iConexion"] = this._rec_iConexion;
							 
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
