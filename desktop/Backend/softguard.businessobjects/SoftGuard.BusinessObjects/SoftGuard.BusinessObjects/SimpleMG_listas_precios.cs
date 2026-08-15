
using System;
using System.Xml;
using System.Data;
using Slbf;
using Slbf.Helpers;    	    	 
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace SoftGuard.BusinessObjects
{ 	
  ///<summary>
    ///MG_listas_precios Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_listas_precios : SimpleBaseObject
    { 
			 ///<summary>
     ///mglp_nombre   
     ///</summary>
	 [DataMember]
     public string mglp_nombre { get;set;} 
	  ///<summary>
     ///mglp_tipo   
     ///</summary>
	 [DataMember]
     public int mglp_tipo { get;set;} 
	  ///<summary>
     ///mglp_multiplicador   
     ///</summary>
	 [DataMember]
     public Single mglp_multiplicador { get;set;} 
	  ///<summary>
     ///mglp_idorganizacion   
     ///</summary>
	 [DataMember]
     public int mglp_idorganizacion { get;set;} 
	  ///<summary>
     ///mglp_currency   
     ///</summary>
	 [DataMember]
     public string mglp_currency { get;set;} 
	 ///<summary>
        ///MG_listas_precios Constructor
        ///</summary>
        public SimpleMG_listas_precios() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_listas_precios Constructor
        ///</summary>
        public SimpleMG_listas_precios(int Id, string Name, string mglp_nombre, int mglp_tipo, Single mglp_multiplicador, int mglp_idorganizacion, string mglp_currency) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mglp_nombre = mglp_nombre;
this.mglp_tipo = mglp_tipo;
this.mglp_multiplicador = mglp_multiplicador;
this.mglp_idorganizacion = mglp_idorganizacion;
this.mglp_currency = mglp_currency;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3184, "MG_listas_precios");
        }
///<summary>
    ///Returns SimpleBaseObject
    ///</summary>
		public override SimpleBaseObject GetObject()
		{
			return (SimpleBaseObject) this;
		}
///<summary>
    ///Returns BaseObject
    ///</summary>  
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			BaseObject Object = new DalMG_listas_precios(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_listas_precios Caller = new CallerMG_listas_precios();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mglp_nombre = this.mglp_nombre;
Caller.mglp_tipo = this.mglp_tipo;
Caller.mglp_multiplicador = this.mglp_multiplicador;
Caller.mglp_idorganizacion = this.mglp_idorganizacion;
Caller.mglp_currency = this.mglp_currency;

			return (CallerObject) Caller;
		}
///<summary>
    ///Get DataTable of objetdata
    ///</summary>
		public override DataTable GetDataObject()
    {												                
               //create Table
               DataTable dt = new DataTable("Data");                              
               DataRow dr;
							 
							 dt.Columns.Add(new DataColumn("Id", typeof(int)));
							 dt.Columns.Add(new DataColumn("Name", typeof(string)));							 
               dt.Columns.Add(new DataColumn("mglp_nombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mglp_tipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglp_multiplicador", typeof (Single)));               
							 dt.Columns.Add(new DataColumn("mglp_idorganizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglp_currency", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mglp_nombre"] = (object)this.mglp_nombre ?? System.DBNull.Value;
dr["mglp_tipo"] = (object)this.mglp_tipo ?? System.DBNull.Value;
dr["mglp_multiplicador"] = (object)this.mglp_multiplicador ?? System.DBNull.Value;
dr["mglp_idorganizacion"] = (object)this.mglp_idorganizacion ?? System.DBNull.Value;
dr["mglp_currency"] = (object)this.mglp_currency ?? System.DBNull.Value;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
///<summary>
  ///Get XmlDataDocument
  ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
		  DataSet ds = new DataSet("Object"); 
		  ds.EnforceConstraints = false;														                
               							 
 		  ds.Tables.Add(GetDataObject());
	  	  ds.Tables.Add(this.Type.GetDataObject());  	  

          XmlDataDocument XmlDoc = new XmlDataDocument(ds);
		  if(this.CallerObject != null)			 	 
		     XmlDoc.SelectSingleNode("//Object").InnerXml += this.CallerObject.GetXmlObject().InnerXml;                    
		  if(this.Dependencies.Count != 0)
			 XmlDoc.SelectSingleNode("//Object").InnerXml += this.Dependencies.GetXmlObjects().InnerXml;          
			 
          return XmlDoc;							    
    }
 
			}

}
