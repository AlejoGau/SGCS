
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
    public class Callerp_encuesta : CallerObject
    { 	
				     private string _enc_name;
					
				     private string _enc_descripcion;
					
				     private int _enc_status;
				 ///<summary>
     ///enc_name property   
     ///</summary>   
     public string enc_name 
		 { 
		        
                    get{ return this._enc_name; }
        						set{ this._enc_name = value; } 										
	   }
	  ///<summary>
     ///enc_descripcion property   
     ///</summary>   
     public string enc_descripcion 
		 { 
		        
                    get{ return this._enc_descripcion; }
        						set{ this._enc_descripcion = value; } 										
	   }
	  ///<summary>
     ///enc_status property   
     ///</summary>   
     public int enc_status 
		 { 
		        
                    get{ return this._enc_status; }
        						set{ this._enc_status = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_encuesta() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_encuesta(int Id, string Name, string enc_name, string enc_descripcion, int enc_status) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._enc_name = enc_name;
this._enc_descripcion = enc_descripcion;
this._enc_status = enc_status;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3202, "p_encuesta");
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
			Simplep_encuesta Simple = new Simplep_encuesta();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.enc_name = this._enc_name;
Simple.enc_descripcion = this._enc_descripcion;
Simple.enc_status = this._enc_status;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_encuesta Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._enc_name = Simple.enc_name;
this._enc_descripcion = Simple.enc_descripcion;
this._enc_status = Simple.enc_status;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_encuesta(SqlConfig, UserId, (Simplep_encuesta) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("enc_name", typeof (string)));               
							 dt.Columns.Add(new DataColumn("enc_descripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("enc_status", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["enc_name"] = this._enc_name;
dr["enc_descripcion"] = this._enc_descripcion;
dr["enc_status"] = this._enc_status;
							 
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
