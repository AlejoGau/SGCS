
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
    ///t_tiposervicio Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_tiposervicio : SimpleBaseObject
    { 
			 ///<summary>
     ///tip_ccodigo   
     ///</summary>
	 [DataMember]
     public string tip_ccodigo { get;set;} 
	  ///<summary>
     ///tip_cdescripcion   
     ///</summary>
	 [DataMember]
     public string tip_cdescripcion { get;set;} 
	  ///<summary>
     ///tip_yvalor   
     ///</summary>
	 [DataMember]
     public Decimal tip_yvalor { get;set;} 
	  ///<summary>
     ///tip_ndias   
     ///</summary>
	 [DataMember]
     public Decimal tip_ndias { get;set;} 
	  ///<summary>
     ///tip_nvto   
     ///</summary>
	 [DataMember]
     public Decimal tip_nvto { get;set;} 
	  ///<summary>
     ///tip_ntipo   
     ///</summary>
	 [DataMember]
     public Decimal tip_ntipo { get;set;} 
	  ///<summary>
     ///tip_cEventos   
     ///</summary>
	 [DataMember]
     public string tip_cEventos { get;set;} 
	 ///<summary>
        ///t_tiposervicio Constructor
        ///</summary>
        public Simplet_tiposervicio() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_tiposervicio Constructor
        ///</summary>
        public Simplet_tiposervicio(int Id, string Name, string tip_ccodigo, string tip_cdescripcion, Decimal tip_yvalor, Decimal tip_ndias, Decimal tip_nvto, Decimal tip_ntipo, string tip_cEventos) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.tip_ccodigo = tip_ccodigo;
this.tip_cdescripcion = tip_cdescripcion;
this.tip_yvalor = tip_yvalor;
this.tip_ndias = tip_ndias;
this.tip_nvto = tip_nvto;
this.tip_ntipo = tip_ntipo;
this.tip_cEventos = tip_cEventos;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3030, "t_tiposervicio");
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
			BaseObject Object = new Dalt_tiposervicio(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_tiposervicio Caller = new Callert_tiposervicio();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.tip_ccodigo = this.tip_ccodigo;
            Caller.tip_cdescripcion = this.tip_cdescripcion;
            Caller.tip_yvalor = this.tip_yvalor;
            Caller.tip_ndias = this.tip_ndias;
            Caller.tip_nvto = this.tip_nvto;
            Caller.tip_ntipo = this.tip_ntipo;
            Caller.tip_cEventos = this.tip_cEventos;

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
               dt.Columns.Add(new DataColumn("tip_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("tip_yvalor", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_ndias", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_nvto", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_ntipo", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("tip_cEventos", typeof (string)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
        dr["tip_ccodigo"] = (object)this.tip_ccodigo ?? System.DBNull.Value;
        dr["tip_cdescripcion"] = (object)this.tip_cdescripcion ?? System.DBNull.Value;
        dr["tip_yvalor"] = (object)this.tip_yvalor ?? System.DBNull.Value;
        dr["tip_ndias"] = (object)this.tip_ndias ?? System.DBNull.Value;
        dr["tip_nvto"] = (object)this.tip_nvto ?? System.DBNull.Value;
        dr["tip_ntipo"] = (object)this.tip_ntipo ?? System.DBNull.Value;
        dr["tip_cEventos"] = (object)this.tip_cEventos ?? System.DBNull.Value;
							 
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
