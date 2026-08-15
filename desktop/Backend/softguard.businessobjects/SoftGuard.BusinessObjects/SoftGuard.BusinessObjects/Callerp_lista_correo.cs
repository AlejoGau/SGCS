
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
    public class Callerp_lista_correo : CallerObject
    { 	
				     private string _plc_name;
					
				     private string _plc_dealer;
					
				     private string _plc_correos;
				 ///<summary>
     ///plc_name property   
     ///</summary>   
     public string plc_name 
		 { 
		        
                    get{ return this._plc_name; }
        						set{ this._plc_name = value; } 										
	   }
	  ///<summary>
     ///plc_dealer property   
     ///</summary>   
     public string plc_dealer 
		 { 
		        
                    get{ return this._plc_dealer; }
        						set{ this._plc_dealer = value; } 										
	   }
	  ///<summary>
     ///plc_correos property   
     ///</summary>   
     public string plc_correos 
		 { 
		        
                    get{ return this._plc_correos; }
        						set{ this._plc_correos = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_lista_correo() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_lista_correo(int Id, string Name, string plc_name, string plc_dealer, string plc_correos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._plc_name = plc_name;
this._plc_dealer = plc_dealer;
this._plc_correos = plc_correos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3181, "p_lista_correo");
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
			Simplep_lista_correo Simple = new Simplep_lista_correo();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.plc_name = this._plc_name;
Simple.plc_dealer = this._plc_dealer;
Simple.plc_correos = this._plc_correos;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_lista_correo Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._plc_name = Simple.plc_name;
this._plc_dealer = Simple.plc_dealer;
this._plc_correos = Simple.plc_correos;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_lista_correo(SqlConfig, UserId, (Simplep_lista_correo) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("plc_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("plc_dealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("plc_correos", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["plc_name"] = this._plc_name;
dr["plc_dealer"] = this._plc_dealer;
dr["plc_correos"] = this._plc_correos;
							 
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
