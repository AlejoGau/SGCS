
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
    ///MG_listas_precios_detalle Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_listas_precios_detalle : SimpleBaseObject
    { 
			 ///<summary>
     ///mglpd_idproducto   
     ///</summary>
	 [DataMember]
     public int mglpd_idproducto { get;set;} 
	  ///<summary>
     ///mglpd_idlista   
     ///</summary>
	 [DataMember]
     public int mglpd_idlista { get;set;} 
	  ///<summary>
     ///mglpd_valor   
     ///</summary>
	 [DataMember]
     public Decimal mglpd_valor { get;set;} 
	 ///<summary>
        ///MG_listas_precios_detalle Constructor
        ///</summary>
        public SimpleMG_listas_precios_detalle() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_listas_precios_detalle Constructor
        ///</summary>
        public SimpleMG_listas_precios_detalle(int Id, string Name, int mglpd_idproducto, int mglpd_idlista, Decimal mglpd_valor) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mglpd_idproducto = mglpd_idproducto;
this.mglpd_idlista = mglpd_idlista;
this.mglpd_valor = mglpd_valor;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3185, "MG_listas_precios_detalle");
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
			BaseObject Object = new DalMG_listas_precios_detalle(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_listas_precios_detalle Caller = new CallerMG_listas_precios_detalle();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mglpd_idproducto = this.mglpd_idproducto;
Caller.mglpd_idlista = this.mglpd_idlista;
Caller.mglpd_valor = this.mglpd_valor;

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
               dt.Columns.Add(new DataColumn("mglpd_idproducto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglpd_idlista", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mglpd_valor", typeof (Decimal)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mglpd_idproducto"] = (object)this.mglpd_idproducto ?? System.DBNull.Value;
dr["mglpd_idlista"] = (object)this.mglpd_idlista ?? System.DBNull.Value;
dr["mglpd_valor"] = (object)this.mglpd_valor ?? System.DBNull.Value;
							 
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
