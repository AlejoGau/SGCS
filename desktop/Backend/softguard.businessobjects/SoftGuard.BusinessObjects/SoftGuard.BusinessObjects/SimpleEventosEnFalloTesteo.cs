
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
    ///EventosEnFalloTesteo Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleEventosEnFalloTesteo : SimpleBaseObject
    { 
			 ///<summary>
     ///eft_irecid   
     ///</summary>
	 [DataMember]
     public int eft_irecid { get;set;} 
	  ///<summary>
     ///eft_iidcuenta   
     ///</summary>
	 [DataMember]
     public int eft_iidcuenta { get;set;} 
	  ///<summary>
     ///eft_teventofechahora   
     ///</summary>
	 [DataMember]
     public DateTime? eft_teventofechahora { get;set;} 
	  ///<summary>
     ///eft_clinea   
     ///</summary>
	 [DataMember]
     public string eft_clinea { get;set;} 
	  ///<summary>
     ///eft_ccuenta   
     ///</summary>
	 [DataMember]
     public string eft_ccuenta { get;set;} 
	  ///<summary>
     ///eft_cnombre   
     ///</summary>
	 [DataMember]
     public string eft_cnombre { get;set;} 
	  ///<summary>
     ///eft_calarma   
     ///</summary>
	 [DataMember]
     public string eft_calarma { get;set;} 
	  ///<summary>
     ///eft_calarmadescripcion   
     ///</summary>
	 [DataMember]
     public string eft_calarmadescripcion { get;set;} 
	  ///<summary>
     ///eft_nalarmacolor   
     ///</summary>
	 [DataMember]
     public int eft_nalarmacolor { get;set;} 
	  ///<summary>
     ///eft_nalarmacolorletra   
     ///</summary>
	 [DataMember]
     public int eft_nalarmacolorletra { get;set;} 
	  ///<summary>
     ///eft_calarmaautoprocesa   
     ///</summary>
	 [DataMember]
     public string eft_calarmaautoprocesa { get;set;} 
	 ///<summary>
        ///EventosEnFalloTesteo Constructor
        ///</summary>
        public SimpleEventosEnFalloTesteo() : base()
  {
  InitClass();
  }
        ///<summary>
        ///EventosEnFalloTesteo Constructor
        ///</summary>
        public SimpleEventosEnFalloTesteo(int Id, string Name, int eft_irecid, int eft_iidcuenta, DateTime? eft_teventofechahora, string eft_clinea, string eft_ccuenta, string eft_cnombre, string eft_calarma, string eft_calarmadescripcion, int eft_nalarmacolor, int eft_nalarmacolorletra, string eft_calarmaautoprocesa) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.eft_irecid = eft_irecid;
this.eft_iidcuenta = eft_iidcuenta;
this.eft_teventofechahora = eft_teventofechahora;
this.eft_clinea = eft_clinea;
this.eft_ccuenta = eft_ccuenta;
this.eft_cnombre = eft_cnombre;
this.eft_calarma = eft_calarma;
this.eft_calarmadescripcion = eft_calarmadescripcion;
this.eft_nalarmacolor = eft_nalarmacolor;
this.eft_nalarmacolorletra = eft_nalarmacolorletra;
this.eft_calarmaautoprocesa = eft_calarmaautoprocesa;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3165, "EventosEnFalloTesteo");
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
			BaseObject Object = new DalEventosEnFalloTesteo(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerEventosEnFalloTesteo Caller = new CallerEventosEnFalloTesteo();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.eft_irecid = this.eft_irecid;
Caller.eft_iidcuenta = this.eft_iidcuenta;
Caller.eft_teventofechahora = this.eft_teventofechahora;
Caller.eft_clinea = this.eft_clinea;
Caller.eft_ccuenta = this.eft_ccuenta;
Caller.eft_cnombre = this.eft_cnombre;
Caller.eft_calarma = this.eft_calarma;
Caller.eft_calarmadescripcion = this.eft_calarmadescripcion;
Caller.eft_nalarmacolor = this.eft_nalarmacolor;
Caller.eft_nalarmacolorletra = this.eft_nalarmacolorletra;
Caller.eft_calarmaautoprocesa = this.eft_calarmaautoprocesa;

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
               dt.Columns.Add(new DataColumn("eft_irecid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_iidcuenta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_teventofechahora", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("eft_clinea", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_ccuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_calarma", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_calarmadescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("eft_nalarmacolor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_nalarmacolorletra", typeof (int)));               
							 dt.Columns.Add(new DataColumn("eft_calarmaautoprocesa", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["eft_irecid"] = (object)this.eft_irecid ?? System.DBNull.Value;
dr["eft_iidcuenta"] = (object)this.eft_iidcuenta ?? System.DBNull.Value;
dr["eft_teventofechahora"] = (object)this.eft_teventofechahora ?? System.DBNull.Value;
dr["eft_clinea"] = (object)this.eft_clinea ?? System.DBNull.Value;
dr["eft_ccuenta"] = (object)this.eft_ccuenta ?? System.DBNull.Value;
dr["eft_cnombre"] = (object)this.eft_cnombre ?? System.DBNull.Value;
dr["eft_calarma"] = (object)this.eft_calarma ?? System.DBNull.Value;
dr["eft_calarmadescripcion"] = (object)this.eft_calarmadescripcion ?? System.DBNull.Value;
dr["eft_nalarmacolor"] = (object)this.eft_nalarmacolor ?? System.DBNull.Value;
dr["eft_nalarmacolorletra"] = (object)this.eft_nalarmacolorletra ?? System.DBNull.Value;
dr["eft_calarmaautoprocesa"] = (object)this.eft_calarmaautoprocesa ?? System.DBNull.Value;
							 
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
