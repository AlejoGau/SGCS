
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
    ///t_CtrlEventoPrevio Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_CtrlEventoPrevio : SimpleBaseObject
    { 
			 ///<summary>
     ///cep_cAlarmaEsperada   
     ///</summary>
	 [DataMember]
     public string cep_cAlarmaEsperada { get;set;} 
	  ///<summary>
     ///cep_cAlarmaPrevia   
     ///</summary>
	 [DataMember]
     public string cep_cAlarmaPrevia { get;set;} 
	  ///<summary>
     ///cep_iHoras   
     ///</summary>
	 [DataMember]
     public int cep_iHoras { get;set;} 
	  ///<summary>
     ///cep_iCategorizacion   
     ///</summary>
	 [DataMember]
     public int cep_iCategorizacion { get;set;} 
	  ///<summary>
     ///cep_cDescripcion   
     ///</summary>
	 [DataMember]
     public string cep_cDescripcion { get;set;} 
	 ///<summary>
        ///t_CtrlEventoPrevio Constructor
        ///</summary>
        public Simplet_CtrlEventoPrevio() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_CtrlEventoPrevio Constructor
        ///</summary>
        public Simplet_CtrlEventoPrevio(int Id, string Name, string cep_cAlarmaEsperada, string cep_cAlarmaPrevia, int cep_iHoras, int cep_iCategorizacion, string cep_cDescripcion) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cep_cAlarmaEsperada = cep_cAlarmaEsperada;
this.cep_cAlarmaPrevia = cep_cAlarmaPrevia;
this.cep_iHoras = cep_iHoras;
this.cep_iCategorizacion = cep_iCategorizacion;
this.cep_cDescripcion = cep_cDescripcion;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7033, "t_CtrlEventoPrevio");
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
			BaseObject Object = new Dalt_CtrlEventoPrevio(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_CtrlEventoPrevio Caller = new Callert_CtrlEventoPrevio();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cep_cAlarmaEsperada = this.cep_cAlarmaEsperada;
Caller.cep_cAlarmaPrevia = this.cep_cAlarmaPrevia;
Caller.cep_iHoras = this.cep_iHoras;
Caller.cep_iCategorizacion = this.cep_iCategorizacion;
Caller.cep_cDescripcion = this.cep_cDescripcion;

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
               dt.Columns.Add(new DataColumn("cep_cAlarmaEsperada", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cep_cAlarmaPrevia", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cep_iHoras", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cep_iCategorizacion", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cep_cDescripcion", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cep_cAlarmaEsperada"] = (object)this.cep_cAlarmaEsperada ?? System.DBNull.Value;
dr["cep_cAlarmaPrevia"] = (object)this.cep_cAlarmaPrevia ?? System.DBNull.Value;
dr["cep_iHoras"] = (object)this.cep_iHoras ?? System.DBNull.Value;
dr["cep_iCategorizacion"] = (object)this.cep_iCategorizacion ?? System.DBNull.Value;
dr["cep_cDescripcion"] = (object)this.cep_cDescripcion ?? System.DBNull.Value;
							 
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
