
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
    ///t_CuentasTipoServicio Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_CuentasTipoServicio : SimpleBaseObject
    { 
			 ///<summary>
     ///cts_cnombre   
     ///</summary>
	 [DataMember]
     public string cts_cnombre { get;set;} 
	  ///<summary>
     ///cts_iestado   
     ///</summary>
	 [DataMember]
     public int cts_iestado { get;set;} 
	 ///<summary>
        ///t_CuentasTipoServicio Constructor
        ///</summary>
        public Simplet_CuentasTipoServicio() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_CuentasTipoServicio Constructor
        ///</summary>
        public Simplet_CuentasTipoServicio(int Id, string Name, string cts_cnombre, int cts_iestado) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cts_cnombre = cts_cnombre;
this.cts_iestado = cts_iestado;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3224, "t_CuentasTipoServicio");
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
			BaseObject Object = new Dalt_CuentasTipoServicio(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_CuentasTipoServicio Caller = new Callert_CuentasTipoServicio();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cts_cnombre = this.cts_cnombre;
Caller.cts_iestado = this.cts_iestado;

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
               dt.Columns.Add(new DataColumn("cts_cnombre", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cts_iestado", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cts_cnombre"] = (object)this.cts_cnombre ?? System.DBNull.Value;
dr["cts_iestado"] = (object)this.cts_iestado ?? System.DBNull.Value;
							 
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
