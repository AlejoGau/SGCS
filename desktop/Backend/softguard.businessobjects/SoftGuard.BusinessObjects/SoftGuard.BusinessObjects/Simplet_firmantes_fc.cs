
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
    ///t_firmantes_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_firmantes_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///fir_ccodigo   
     ///</summary>
	 [DataMember]
     public string fir_ccodigo { get;set;} 
	  ///<summary>
     ///fir_cnombre   
     ///</summary>
	 [DataMember]
     public string fir_cnombre { get;set;} 
	  ///<summary>
     ///fir_ccuenta   
     ///</summary>
	 [DataMember]
     public string fir_ccuenta { get;set;} 
	  ///<summary>
     ///fir_nlimite   
     ///</summary>
	 [DataMember]
     public Decimal fir_nlimite { get;set;} 
	  ///<summary>
     ///fir_nestado   
     ///</summary>
	 [DataMember]
     public Decimal fir_nestado { get;set;} 
	  ///<summary>
     ///fir_mlegajo   
     ///</summary>
	 [DataMember]
     public string fir_mlegajo { get;set;} 
	 ///<summary>
        ///t_firmantes_fc Constructor
        ///</summary>
        public Simplet_firmantes_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_firmantes_fc Constructor
        ///</summary>
        public Simplet_firmantes_fc(int Id, string Name, string fir_ccodigo, string fir_cnombre, string fir_ccuenta, Decimal fir_nlimite, Decimal fir_nestado, string fir_mlegajo) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.fir_ccodigo = fir_ccodigo;
this.fir_cnombre = fir_cnombre;
this.fir_ccuenta = fir_ccuenta;
this.fir_nlimite = fir_nlimite;
this.fir_nestado = fir_nestado;
this.fir_mlegajo = fir_mlegajo;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3190, "t_firmantes_fc");
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
			BaseObject Object = new Dalt_firmantes_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_firmantes_fc Caller = new Callert_firmantes_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.fir_ccodigo = this.fir_ccodigo;
Caller.fir_cnombre = this.fir_cnombre;
Caller.fir_ccuenta = this.fir_ccuenta;
Caller.fir_nlimite = this.fir_nlimite;
Caller.fir_nestado = this.fir_nestado;
Caller.fir_mlegajo = this.fir_mlegajo;

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
               dt.Columns.Add(new DataColumn("fir_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fir_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fir_ccuenta", typeof (string)));               
							 dt.Columns.Add(new DataColumn("fir_nlimite", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fir_nestado", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("fir_mlegajo", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["fir_ccodigo"] = (object)this.fir_ccodigo ?? System.DBNull.Value;
dr["fir_cnombre"] = (object)this.fir_cnombre ?? System.DBNull.Value;
dr["fir_ccuenta"] = (object)this.fir_ccuenta ?? System.DBNull.Value;
dr["fir_nlimite"] = (object)this.fir_nlimite ?? System.DBNull.Value;
dr["fir_nestado"] = (object)this.fir_nestado ?? System.DBNull.Value;
dr["fir_mlegajo"] = (object)this.fir_mlegajo ?? System.DBNull.Value;
							 
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
