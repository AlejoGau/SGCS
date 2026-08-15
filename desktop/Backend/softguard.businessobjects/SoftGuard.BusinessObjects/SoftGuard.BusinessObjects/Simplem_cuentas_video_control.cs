
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
    ///m_cuentas_video_control Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuentas_video_control : SimpleBaseObject
    { 
			 ///<summary>
     ///cvc_iIdCta   
     ///</summary>
	 [DataMember]
     public int cvc_iIdCta { get;set;} 
	  ///<summary>
     ///cvc_iActivacionTotal   
     ///</summary>
	 [DataMember]
     public int cvc_iActivacionTotal { get;set;} 
	  ///<summary>
     ///cvc_cActivacionParcial   
     ///</summary>
	 [DataMember]
     public string cvc_cActivacionParcial { get;set;} 
	  ///<summary>
     ///cvc_iDesactivacion   
     ///</summary>
	 [DataMember]
     public int cvc_iDesactivacion { get;set;} 
	  ///<summary>
     ///cvc_iActivacionParcial   
     ///</summary>
	 [DataMember]
     public int cvc_iActivacionParcial { get;set;} 
	 ///<summary>
        ///m_cuentas_video_control Constructor
        ///</summary>
        public Simplem_cuentas_video_control() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuentas_video_control Constructor
        ///</summary>
        public Simplem_cuentas_video_control(int Id, string Name, int cvc_iIdCta, int cvc_iActivacionTotal, string cvc_cActivacionParcial, int cvc_iDesactivacion, int cvc_iActivacionParcial) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cvc_iIdCta = cvc_iIdCta;
this.cvc_iActivacionTotal = cvc_iActivacionTotal;
this.cvc_cActivacionParcial = cvc_cActivacionParcial;
this.cvc_iDesactivacion = cvc_iDesactivacion;
this.cvc_iActivacionParcial = cvc_iActivacionParcial;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7046, "m_cuentas_video_control");
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
			BaseObject Object = new Dalm_cuentas_video_control(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuentas_video_control Caller = new Callerm_cuentas_video_control();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cvc_iIdCta = this.cvc_iIdCta;
Caller.cvc_iActivacionTotal = this.cvc_iActivacionTotal;
Caller.cvc_cActivacionParcial = this.cvc_cActivacionParcial;
Caller.cvc_iDesactivacion = this.cvc_iDesactivacion;
Caller.cvc_iActivacionParcial = this.cvc_iActivacionParcial;

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
               dt.Columns.Add(new DataColumn("cvc_iIdCta", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvc_iActivacionTotal", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvc_cActivacionParcial", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cvc_iDesactivacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cvc_iActivacionParcial", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cvc_iIdCta"] = (object)this.cvc_iIdCta ?? System.DBNull.Value;
dr["cvc_iActivacionTotal"] = (object)this.cvc_iActivacionTotal ?? System.DBNull.Value;
dr["cvc_cActivacionParcial"] = (object)this.cvc_cActivacionParcial ?? System.DBNull.Value;
dr["cvc_iDesactivacion"] = (object)this.cvc_iDesactivacion ?? System.DBNull.Value;
dr["cvc_iActivacionParcial"] = (object)this.cvc_iActivacionParcial ?? System.DBNull.Value;
							 
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
