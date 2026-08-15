
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
    public class Callert_mensajes_whatsapp : CallerObject
    { 	
				     private string _tmw_ctitulo;
					
				     private string _tmw_cmensaje;
				 ///<summary>
     ///tmw_ctitulo property   
     ///</summary>   
     public string tmw_ctitulo 
		 { 
		        
                    get{ return this._tmw_ctitulo; }
        						set{ this._tmw_ctitulo = value; } 										
	   }
	  ///<summary>
     ///tmw_cmensaje property   
     ///</summary>   
     public string tmw_cmensaje 
		 { 
		        
                    get{ return this._tmw_cmensaje; }
        						set{ this._tmw_cmensaje = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callert_mensajes_whatsapp() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callert_mensajes_whatsapp(int Id, string Name, string tmw_ctitulo, string tmw_cmensaje) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._tmw_ctitulo = tmw_ctitulo;
this._tmw_cmensaje = tmw_cmensaje;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3220, "t_mensajes_whatsapp");
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
			Simplet_mensajes_whatsapp Simple = new Simplet_mensajes_whatsapp();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.tmw_ctitulo = this._tmw_ctitulo;
Simple.tmw_cmensaje = this._tmw_cmensaje;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplet_mensajes_whatsapp Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._tmw_ctitulo = Simple.tmw_ctitulo;
this._tmw_cmensaje = Simple.tmw_cmensaje;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalt_mensajes_whatsapp(SqlConfig, UserId, (Simplet_mensajes_whatsapp) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("tmw_ctitulo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tmw_cmensaje", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["tmw_ctitulo"] = this._tmw_ctitulo;
dr["tmw_cmensaje"] = this._tmw_cmensaje;
							 
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
