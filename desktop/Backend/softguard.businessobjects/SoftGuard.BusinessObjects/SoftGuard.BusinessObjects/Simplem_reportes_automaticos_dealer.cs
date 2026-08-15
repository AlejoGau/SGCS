
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
    ///m_reportes_automaticos_dealer Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_reportes_automaticos_dealer : SimpleBaseObject
    { 
			 ///<summary>
     ///rad_linidkey   
     ///</summary>
	 [DataMember]
     public int rad_linidkey { get;set;} 
	  ///<summary>
     ///rad_ntipo   
     ///</summary>
	 [DataMember]
     public int rad_ntipo { get;set;} 
	  ///<summary>
     ///rad_tproximoenvio   
     ///</summary>
	 [DataMember]
     public DateTime? rad_tproximoenvio { get;set;} 
	  ///<summary>
     ///rad_nfrecuencia   
     ///</summary>
	 [DataMember]
     public int rad_nfrecuencia { get;set;} 
	  ///<summary>
     ///rad_cmail   
     ///</summary>
	 [DataMember]
     public string rad_cmail { get;set;} 
	  ///<summary>
     ///rad_idGrupo   
     ///</summary>
	 [DataMember]
     public int rad_idGrupo { get;set;} 
	  ///<summary>
     ///rad_nAlerta   
     ///</summary>
	 [DataMember]
     public int rad_nAlerta { get;set;} 
	 ///<summary>
        ///m_reportes_automaticos_dealer Constructor
        ///</summary>
        public Simplem_reportes_automaticos_dealer() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_reportes_automaticos_dealer Constructor
        ///</summary>
        public Simplem_reportes_automaticos_dealer(int Id, string Name, int rad_linidkey, int rad_ntipo, DateTime? rad_tproximoenvio, int rad_nfrecuencia, string rad_cmail, int rad_idGrupo, int rad_nAlerta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.rad_linidkey = rad_linidkey;
this.rad_ntipo = rad_ntipo;
this.rad_tproximoenvio = rad_tproximoenvio;
this.rad_nfrecuencia = rad_nfrecuencia;
this.rad_cmail = rad_cmail;
this.rad_idGrupo = rad_idGrupo;
this.rad_nAlerta = rad_nAlerta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3210, "m_reportes_automaticos_dealer");
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
			BaseObject Object = new Dalm_reportes_automaticos_dealer(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_reportes_automaticos_dealer Caller = new Callerm_reportes_automaticos_dealer();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.rad_linidkey = this.rad_linidkey;
Caller.rad_ntipo = this.rad_ntipo;
Caller.rad_tproximoenvio = this.rad_tproximoenvio;
Caller.rad_nfrecuencia = this.rad_nfrecuencia;
Caller.rad_cmail = this.rad_cmail;
Caller.rad_idGrupo = this.rad_idGrupo;
Caller.rad_nAlerta = this.rad_nAlerta;

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
               dt.Columns.Add(new DataColumn("rad_linidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_ntipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_tproximoenvio", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("rad_nfrecuencia", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_cmail", typeof (string)));               
							 dt.Columns.Add(new DataColumn("rad_idGrupo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("rad_nAlerta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["rad_linidkey"] = (object)this.rad_linidkey ?? System.DBNull.Value;
dr["rad_ntipo"] = (object)this.rad_ntipo ?? System.DBNull.Value;
dr["rad_tproximoenvio"] = (object)this.rad_tproximoenvio ?? System.DBNull.Value;
dr["rad_nfrecuencia"] = (object)this.rad_nfrecuencia ?? System.DBNull.Value;
dr["rad_cmail"] = (object)this.rad_cmail ?? System.DBNull.Value;
dr["rad_idGrupo"] = (object)this.rad_idGrupo ?? System.DBNull.Value;
dr["rad_nAlerta"] = (object)this.rad_nAlerta ?? System.DBNull.Value;
							 
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
