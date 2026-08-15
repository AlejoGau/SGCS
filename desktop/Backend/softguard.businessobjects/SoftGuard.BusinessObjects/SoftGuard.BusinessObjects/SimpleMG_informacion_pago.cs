
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
    ///MG_informacion_pago Slbf Class
    ///</summary>
    [DataContract]
    public class SimpleMG_informacion_pago : SimpleBaseObject
    { 
			 ///<summary>
     ///mip_fpgidkey   
     ///</summary>
	 [DataMember]
     public int mip_fpgidkey { get;set;} 
	  ///<summary>
     ///mip_idcliente   
     ///</summary>
	 [DataMember]
     public int mip_idcliente { get;set;} 
	  ///<summary>
     ///mip_codigo   
     ///</summary>
	 [DataMember]
     public string mip_codigo { get;set;} 
	  ///<summary>
     ///mip_fechadesde   
     ///</summary>
	 [DataMember]
     public DateTime? mip_fechadesde { get;set;} 
	  ///<summary>
     ///mip_fechahasta   
     ///</summary>
	 [DataMember]
     public DateTime? mip_fechahasta { get;set;} 
	  ///<summary>
     ///mip_emisor   
     ///</summary>
	 [DataMember]
     public int mip_emisor { get;set;} 
	  ///<summary>
     ///mip_clave   
     ///</summary>
	 [DataMember]
     public string mip_clave { get;set;} 
	  ///<summary>
     ///mip_nombreusuario   
     ///</summary>
	 [DataMember]
     public string mip_nombreusuario { get;set;} 
	 ///<summary>
        ///MG_informacion_pago Constructor
        ///</summary>
        public SimpleMG_informacion_pago() : base()
  {
  InitClass();
  }
        ///<summary>
        ///MG_informacion_pago Constructor
        ///</summary>
        public SimpleMG_informacion_pago(int Id, string Name, int mip_fpgidkey, int mip_idcliente, string mip_codigo, DateTime? mip_fechadesde, DateTime? mip_fechahasta, int mip_emisor, string mip_clave, string mip_nombreusuario) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.mip_fpgidkey = mip_fpgidkey;
this.mip_idcliente = mip_idcliente;
this.mip_codigo = mip_codigo;
this.mip_fechadesde = mip_fechadesde;
this.mip_fechahasta = mip_fechahasta;
this.mip_emisor = mip_emisor;
this.mip_clave = mip_clave;
this.mip_nombreusuario = mip_nombreusuario;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3221, "MG_informacion_pago");
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
			BaseObject Object = new DalMG_informacion_pago(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			CallerMG_informacion_pago Caller = new CallerMG_informacion_pago();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.mip_fpgidkey = this.mip_fpgidkey;
Caller.mip_idcliente = this.mip_idcliente;
Caller.mip_codigo = this.mip_codigo;
Caller.mip_fechadesde = this.mip_fechadesde;
Caller.mip_fechahasta = this.mip_fechahasta;
Caller.mip_emisor = this.mip_emisor;
Caller.mip_clave = this.mip_clave;
Caller.mip_nombreusuario = this.mip_nombreusuario;

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
               dt.Columns.Add(new DataColumn("mip_fpgidkey", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mip_idcliente", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mip_codigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mip_fechadesde", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mip_fechahasta", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("mip_emisor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("mip_clave", typeof (string)));               
							 dt.Columns.Add(new DataColumn("mip_nombreusuario", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["mip_fpgidkey"] = (object)this.mip_fpgidkey ?? System.DBNull.Value;
dr["mip_idcliente"] = (object)this.mip_idcliente ?? System.DBNull.Value;
dr["mip_codigo"] = (object)this.mip_codigo ?? System.DBNull.Value;
dr["mip_fechadesde"] = (object)this.mip_fechadesde ?? System.DBNull.Value;
dr["mip_fechahasta"] = (object)this.mip_fechahasta ?? System.DBNull.Value;
dr["mip_emisor"] = (object)this.mip_emisor ?? System.DBNull.Value;
dr["mip_clave"] = (object)this.mip_clave ?? System.DBNull.Value;
dr["mip_nombreusuario"] = (object)this.mip_nombreusuario ?? System.DBNull.Value;
							 
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
