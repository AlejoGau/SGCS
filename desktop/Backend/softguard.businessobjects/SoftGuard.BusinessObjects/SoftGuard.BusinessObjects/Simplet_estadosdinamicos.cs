
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
    ///t_estadosdinamicos Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_estadosdinamicos : SimpleBaseObject
    { 
			 ///<summary>
     ///ted_ccodigo   
     ///</summary>
	 [DataMember]
     public string ted_ccodigo { get;set;} 
	  ///<summary>
     ///ted_cdescripcion   
     ///</summary>
	 [DataMember]
     public string ted_cdescripcion { get;set;} 
	  ///<summary>
     ///ted_ceventos   
     ///</summary>
	 [DataMember]
     public string ted_ceventos { get;set;} 
	  ///<summary>
     ///ted_ivalor   
     ///</summary>
	 [DataMember]
     public int ted_ivalor { get;set;} 
	  ///<summary>
     ///ted_iporusuario   
     ///</summary>
	 [DataMember]
     public int ted_iporusuario { get;set;} 
	  ///<summary>
     ///ted_iactivo   
     ///</summary>
	 [DataMember]
     public int ted_iactivo { get;set;} 
	  ///<summary>
     ///ted_ieditable   
     ///</summary>
	 [DataMember]
     public int ted_ieditable { get;set;} 
	  ///<summary>
     ///ted_idcta   
     ///</summary>
	 [DataMember]
     public int ted_idcta { get;set;} 
	 ///<summary>
        ///t_estadosdinamicos Constructor
        ///</summary>
        public Simplet_estadosdinamicos() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_estadosdinamicos Constructor
        ///</summary>
        public Simplet_estadosdinamicos(int Id, string Name, string ted_ccodigo, string ted_cdescripcion, string ted_ceventos, int ted_ivalor, int ted_iporusuario, int ted_iactivo, int ted_ieditable, int ted_idcta) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.ted_ccodigo = ted_ccodigo;
this.ted_cdescripcion = ted_cdescripcion;
this.ted_ceventos = ted_ceventos;
this.ted_ivalor = ted_ivalor;
this.ted_iporusuario = ted_iporusuario;
this.ted_iactivo = ted_iactivo;
this.ted_ieditable = ted_ieditable;
this.ted_idcta = ted_idcta;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3175, "t_estadosdinamicos");
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
			BaseObject Object = new Dalt_estadosdinamicos(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_estadosdinamicos Caller = new Callert_estadosdinamicos();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.ted_ccodigo = this.ted_ccodigo;
Caller.ted_cdescripcion = this.ted_cdescripcion;
Caller.ted_ceventos = this.ted_ceventos;
Caller.ted_ivalor = this.ted_ivalor;
Caller.ted_iporusuario = this.ted_iporusuario;
Caller.ted_iactivo = this.ted_iactivo;
Caller.ted_ieditable = this.ted_ieditable;
Caller.ted_idcta = this.ted_idcta;

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
               dt.Columns.Add(new DataColumn("ted_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ted_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ted_ceventos", typeof (string)));               
							 dt.Columns.Add(new DataColumn("ted_ivalor", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_iporusuario", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_iactivo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_ieditable", typeof (int)));               
							 dt.Columns.Add(new DataColumn("ted_idcta", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["ted_ccodigo"] = (object)this.ted_ccodigo ?? System.DBNull.Value;
dr["ted_cdescripcion"] = (object)this.ted_cdescripcion ?? System.DBNull.Value;
dr["ted_ceventos"] = (object)this.ted_ceventos ?? System.DBNull.Value;
dr["ted_ivalor"] = (object)this.ted_ivalor ?? System.DBNull.Value;
dr["ted_iporusuario"] = (object)this.ted_iporusuario ?? System.DBNull.Value;
dr["ted_iactivo"] = (object)this.ted_iactivo ?? System.DBNull.Value;
dr["ted_ieditable"] = (object)this.ted_ieditable ?? System.DBNull.Value;
dr["ted_idcta"] = (object)this.ted_idcta ?? System.DBNull.Value;
							 
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
