
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
    public class Callerp_push_queue : CallerObject
    { 	
				     private string _ppq_msg;
					
				     private int _ppq_estado;
					
				     private DateTime? _ppq_fechacreacion;
					
				     private DateTime? _ppq_fechaenvio;
				 ///<summary>
     ///ppq_msg property   
     ///</summary>   
     public string ppq_msg 
		 { 
		        
                    get{ return this._ppq_msg; }
        						set{ this._ppq_msg = value; } 										
	   }
	  ///<summary>
     ///ppq_estado property   
     ///</summary>   
     public int ppq_estado 
		 { 
		        
                    get{ return this._ppq_estado; }
        						set{ this._ppq_estado = value; } 										
	   }
	  ///<summary>
     ///ppq_fechacreacion property   
     ///</summary>   
     public DateTime? ppq_fechacreacion 
		 { 
		        
                    get{ return this._ppq_fechacreacion; }
        						set{ this._ppq_fechacreacion = value; } 										
	   }
	  ///<summary>
     ///ppq_fechaenvio property   
     ///</summary>   
     public DateTime? ppq_fechaenvio 
		 { 
		        
                    get{ return this._ppq_fechaenvio; }
        						set{ this._ppq_fechaenvio = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerp_push_queue() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerp_push_queue(int Id, string Name, string ppq_msg, int ppq_estado, DateTime? ppq_fechacreacion, DateTime? ppq_fechaenvio) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._ppq_msg = ppq_msg;
this._ppq_estado = ppq_estado;
this._ppq_fechacreacion = ppq_fechacreacion;
this._ppq_fechaenvio = ppq_fechaenvio;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3163, "p_push_queue");
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
			Simplep_push_queue Simple = new Simplep_push_queue();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.ppq_msg = this._ppq_msg;
Simple.ppq_estado = this._ppq_estado;
Simple.ppq_fechacreacion = this._ppq_fechacreacion;
Simple.ppq_fechaenvio = this._ppq_fechaenvio;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplep_push_queue Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._ppq_msg = Simple.ppq_msg;
this._ppq_estado = Simple.ppq_estado;
this._ppq_fechacreacion = Simple.ppq_fechacreacion;
this._ppq_fechaenvio = Simple.ppq_fechaenvio;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalp_push_queue(SqlConfig, UserId, (Simplep_push_queue) GetSimpleObject());
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
               dt.Columns.Add(new DataColumn("ppq_msg", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ppq_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ppq_fechacreacion", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("ppq_fechaenvio", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ppq_msg"] = this._ppq_msg;
dr["ppq_estado"] = this._ppq_estado;
dr["ppq_fechacreacion"] = this._ppq_fechacreacion;
dr["ppq_fechaenvio"] = this._ppq_fechaenvio;
							 
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
