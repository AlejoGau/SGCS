
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
    public class CallerOperadorVirtualConfigEventos : CallerObject
    { 	
				     private int _ove_iOperadorVirtualConfigId;
					
				     private string _ove_cEvento;
				 ///<summary>
     ///ove_iOperadorVirtualConfigId property   
     ///</summary>   
     public int ove_iOperadorVirtualConfigId 
		 { 
		        
                    get{ return this._ove_iOperadorVirtualConfigId; }
        						set{ this._ove_iOperadorVirtualConfigId = value; } 										
	   }
	  ///<summary>
     ///ove_cEvento property   
     ///</summary>   
     public string ove_cEvento 
		 { 
		        
                    get{ return this._ove_cEvento; }
        						set{ this._ove_cEvento = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public CallerOperadorVirtualConfigEventos() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public CallerOperadorVirtualConfigEventos(int Id, string Name, int ove_iOperadorVirtualConfigId, string ove_cEvento) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ove_iOperadorVirtualConfigId = ove_iOperadorVirtualConfigId;
this._ove_cEvento = ove_cEvento;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7049, "OperadorVirtualConfigEventos");
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
			SimpleOperadorVirtualConfigEventos Simple = new SimpleOperadorVirtualConfigEventos();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ove_iOperadorVirtualConfigId = this._ove_iOperadorVirtualConfigId;
Simple.ove_cEvento = this._ove_cEvento;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(SimpleOperadorVirtualConfigEventos Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ove_iOperadorVirtualConfigId = Simple.ove_iOperadorVirtualConfigId;
this._ove_cEvento = Simple.ove_cEvento;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new DalOperadorVirtualConfigEventos(SqlConfig, UserId, (SimpleOperadorVirtualConfigEventos) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ove_iOperadorVirtualConfigId", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ove_cEvento", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ove_iOperadorVirtualConfigId"] = this._ove_iOperadorVirtualConfigId;
dr["ove_cEvento"] = this._ove_cEvento;
							 
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
