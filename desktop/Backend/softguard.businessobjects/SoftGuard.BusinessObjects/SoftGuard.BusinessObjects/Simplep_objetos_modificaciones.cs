
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
    ///p_objetos_modificaciones Slbf Class
    ///</summary>
    [DataContract]
    public class Simplep_objetos_modificaciones : SimpleBaseObject
    { 
			 ///<summary>
     ///pom_usuariopedido   
     ///</summary>
	 [DataMember]
     public int pom_usuariopedido { get;set;} 
	  ///<summary>
     ///pom_fechapedido   
     ///</summary>
	 [DataMember]
     public DateTime? pom_fechapedido { get;set;} 
	  ///<summary>
     ///pom_idtipoobjeto   
     ///</summary>
	 [DataMember]
     public int pom_idtipoobjeto { get;set;} 
	  ///<summary>
     ///pom_idobjeto   
     ///</summary>
	 [DataMember]
     public int pom_idobjeto { get;set;} 
	  ///<summary>
     ///pom_cueiid   
     ///</summary>
	 [DataMember]
     public int pom_cueiid { get;set;} 
	  ///<summary>
     ///pom_sinmodificar   
     ///</summary>
	 [DataMember]
     public string pom_sinmodificar { get;set;} 
	  ///<summary>
     ///pom_modificado   
     ///</summary>
	 [DataMember]
     public string pom_modificado { get;set;} 
	  ///<summary>
     ///pom_metadata   
     ///</summary>
	 [DataMember]
     public string pom_metadata { get;set;} 
	  ///<summary>
     ///pom_estado   
     ///</summary>
	 [DataMember]
     public int pom_estado { get;set;} 
	  ///<summary>
     ///pom_log   
     ///</summary>
	 [DataMember]
     public string pom_log { get;set;} 
	  ///<summary>
     ///pom_usuarioultcambio   
     ///</summary>
	 [DataMember]
     public int pom_usuarioultcambio { get;set;} 
	  ///<summary>
     ///pom_fechaultcambio   
     ///</summary>
	 [DataMember]
     public DateTime? pom_fechaultcambio { get;set;} 
	 ///<summary>
        ///p_objetos_modificaciones Constructor
        ///</summary>
        public Simplep_objetos_modificaciones() : base()
  {
  InitClass();
  }
        ///<summary>
        ///p_objetos_modificaciones Constructor
        ///</summary>
        public Simplep_objetos_modificaciones(int Id, string Name, int pom_usuariopedido, DateTime? pom_fechapedido, int pom_idtipoobjeto, int pom_idobjeto, int pom_cueiid, string pom_sinmodificar, string pom_modificado, string pom_metadata, int pom_estado, string pom_log, int pom_usuarioultcambio, DateTime? pom_fechaultcambio) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.pom_usuariopedido = pom_usuariopedido;
this.pom_fechapedido = pom_fechapedido;
this.pom_idtipoobjeto = pom_idtipoobjeto;
this.pom_idobjeto = pom_idobjeto;
this.pom_cueiid = pom_cueiid;
this.pom_sinmodificar = pom_sinmodificar;
this.pom_modificado = pom_modificado;
this.pom_metadata = pom_metadata;
this.pom_estado = pom_estado;
this.pom_log = pom_log;
this.pom_usuarioultcambio = pom_usuarioultcambio;
this.pom_fechaultcambio = pom_fechaultcambio;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3180, "p_objetos_modificaciones");
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
			BaseObject Object = new Dalp_objetos_modificaciones(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerp_objetos_modificaciones Caller = new Callerp_objetos_modificaciones();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.pom_usuariopedido = this.pom_usuariopedido;
Caller.pom_fechapedido = this.pom_fechapedido;
Caller.pom_idtipoobjeto = this.pom_idtipoobjeto;
Caller.pom_idobjeto = this.pom_idobjeto;
Caller.pom_cueiid = this.pom_cueiid;
Caller.pom_sinmodificar = this.pom_sinmodificar;
Caller.pom_modificado = this.pom_modificado;
Caller.pom_metadata = this.pom_metadata;
Caller.pom_estado = this.pom_estado;
Caller.pom_log = this.pom_log;
Caller.pom_usuarioultcambio = this.pom_usuarioultcambio;
Caller.pom_fechaultcambio = this.pom_fechaultcambio;

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
               dt.Columns.Add(new DataColumn("pom_usuariopedido", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_fechapedido", typeof (DateTime)));               
							 dt.Columns.Add(new DataColumn("pom_idtipoobjeto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_idobjeto", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_cueiid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_sinmodificar", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_modificado", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_metadata", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_estado", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_log", typeof (string)));               
							 dt.Columns.Add(new DataColumn("pom_usuarioultcambio", typeof (int)));               
							 dt.Columns.Add(new DataColumn("pom_fechaultcambio", typeof (DateTime)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["pom_usuariopedido"] = (object)this.pom_usuariopedido ?? System.DBNull.Value;
dr["pom_fechapedido"] = (object)this.pom_fechapedido ?? System.DBNull.Value;
dr["pom_idtipoobjeto"] = (object)this.pom_idtipoobjeto ?? System.DBNull.Value;
dr["pom_idobjeto"] = (object)this.pom_idobjeto ?? System.DBNull.Value;
dr["pom_cueiid"] = (object)this.pom_cueiid ?? System.DBNull.Value;
dr["pom_sinmodificar"] = (object)this.pom_sinmodificar ?? System.DBNull.Value;
dr["pom_modificado"] = (object)this.pom_modificado ?? System.DBNull.Value;
dr["pom_metadata"] = (object)this.pom_metadata ?? System.DBNull.Value;
dr["pom_estado"] = (object)this.pom_estado ?? System.DBNull.Value;
dr["pom_log"] = (object)this.pom_log ?? System.DBNull.Value;
dr["pom_usuarioultcambio"] = (object)this.pom_usuarioultcambio ?? System.DBNull.Value;
dr["pom_fechaultcambio"] = (object)this.pom_fechaultcambio ?? System.DBNull.Value;
							 
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
