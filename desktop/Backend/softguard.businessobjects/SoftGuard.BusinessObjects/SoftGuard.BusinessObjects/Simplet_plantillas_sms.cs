
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
    ///t_plantillas_sms Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_plantillas_sms : SimpleBaseObject
    { 
			 ///<summary>
     ///pls_ccodigo   
     ///</summary>
	 [DataMember]
     public string pls_ccodigo { get;set;} 
	  ///<summary>
     ///pls_cdescripcion   
     ///</summary>
	 [DataMember]
     public string pls_cdescripcion { get;set;} 
	  ///<summary>
     ///pls_mplantilla   
     ///</summary>
	 [DataMember]
     public string pls_mplantilla { get;set;} 
	  ///<summary>
     ///pls_mplantillaOpnClo   
     ///</summary>
	 [DataMember]
     public string pls_mplantillaOpnClo { get;set;} 
	  ///<summary>
     ///pls_iTipo   
     ///</summary>
	 [DataMember]
     public int pls_iTipo { get;set;} 
	 ///<summary>
        ///t_plantillas_sms Constructor
        ///</summary>
        public Simplet_plantillas_sms() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_plantillas_sms Constructor
        ///</summary>
        public Simplet_plantillas_sms(int Id, string Name, string pls_ccodigo, string pls_cdescripcion, string pls_mplantilla, string pls_mplantillaOpnClo, int pls_iTipo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.pls_ccodigo = pls_ccodigo;
this.pls_cdescripcion = pls_cdescripcion;
this.pls_mplantilla = pls_mplantilla;
this.pls_mplantillaOpnClo = pls_mplantillaOpnClo;
this.pls_iTipo = pls_iTipo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3084, "t_plantillas_sms");
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
			BaseObject Object = new Dalt_plantillas_sms(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_plantillas_sms Caller = new Callert_plantillas_sms();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.pls_ccodigo = this.pls_ccodigo;
Caller.pls_cdescripcion = this.pls_cdescripcion;
Caller.pls_mplantilla = this.pls_mplantilla;
Caller.pls_mplantillaOpnClo = this.pls_mplantillaOpnClo;
Caller.pls_iTipo = this.pls_iTipo;

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
               dt.Columns.Add(new DataColumn("pls_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_mplantilla", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_mplantillaOpnClo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pls_iTipo", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pls_ccodigo"] = (object)this.pls_ccodigo ?? System.DBNull.Value;
dr["pls_cdescripcion"] = (object)this.pls_cdescripcion ?? System.DBNull.Value;
dr["pls_mplantilla"] = (object)this.pls_mplantilla ?? System.DBNull.Value;
dr["pls_mplantillaOpnClo"] = (object)this.pls_mplantillaOpnClo ?? System.DBNull.Value;
dr["pls_iTipo"] = (object)this.pls_iTipo ?? System.DBNull.Value;
							 
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
