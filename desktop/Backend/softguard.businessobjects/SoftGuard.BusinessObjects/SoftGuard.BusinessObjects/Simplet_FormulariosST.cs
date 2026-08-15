
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
    ///t_FormulariosST Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_FormulariosST : SimpleBaseObject
    { 
			 ///<summary>
     ///fst_cNombre   
     ///</summary>
	 [DataMember]
     public string fst_cNombre { get;set;} 
	  ///<summary>
     ///fst_iStatus   
     ///</summary>
	 [DataMember]
     public int fst_iStatus { get;set;} 
	  ///<summary>
     ///fst_iTipo   
     ///</summary>
	 [DataMember]
     public int fst_iTipo { get;set;} 
	  ///<summary>
     ///fst_cDealer   
     ///</summary>
	 [DataMember]
     public string fst_cDealer { get;set;} 
	  ///<summary>
     ///fst_cArchivo   
     ///</summary>
	 [DataMember]
     public string fst_cArchivo { get;set;} 
	 ///<summary>
        ///t_FormulariosST Constructor
        ///</summary>
        public Simplet_FormulariosST() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_FormulariosST Constructor
        ///</summary>
        public Simplet_FormulariosST(int Id, string Name, string fst_cNombre, int fst_iStatus, int fst_iTipo, string fst_cDealer, string fst_cArchivo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.fst_cNombre = fst_cNombre;
this.fst_iStatus = fst_iStatus;
this.fst_iTipo = fst_iTipo;
this.fst_cDealer = fst_cDealer;
this.fst_cArchivo = fst_cArchivo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(7051, "t_FormulariosST");
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
			BaseObject Object = new Dalt_FormulariosST(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_FormulariosST Caller = new Callert_FormulariosST();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.fst_cNombre = this.fst_cNombre;
Caller.fst_iStatus = this.fst_iStatus;
Caller.fst_iTipo = this.fst_iTipo;
Caller.fst_cDealer = this.fst_cDealer;
Caller.fst_cArchivo = this.fst_cArchivo;

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
               dt.Columns.Add(new DataColumn("fst_cNombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fst_iStatus", typeof (int)));               
							 dt.Columns.Add(new DataColumn("fst_iTipo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("fst_cDealer", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fst_cArchivo", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["fst_cNombre"] = (object)this.fst_cNombre ?? System.DBNull.Value;
dr["fst_iStatus"] = (object)this.fst_iStatus ?? System.DBNull.Value;
dr["fst_iTipo"] = (object)this.fst_iTipo ?? System.DBNull.Value;
dr["fst_cDealer"] = (object)this.fst_cDealer ?? System.DBNull.Value;
dr["fst_cArchivo"] = (object)this.fst_cArchivo ?? System.DBNull.Value;
							 
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
