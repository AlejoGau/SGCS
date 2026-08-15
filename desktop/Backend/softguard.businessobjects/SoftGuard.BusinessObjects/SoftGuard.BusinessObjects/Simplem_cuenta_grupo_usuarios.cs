
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
    ///m_cuenta_grupo_usuarios Slbf Class
    ///</summary>
    [DataContract]
    public class Simplem_cuenta_grupo_usuarios : SimpleBaseObject
    { 
			 ///<summary>
     ///cgu_idgrupo   
     ///</summary>
	 [DataMember]
     public int cgu_idgrupo { get;set;} 
	  ///<summary>
     ///cgu_idusuario   
     ///</summary>
	 [DataMember]
     public int cgu_idusuario { get;set;} 
	 ///<summary>
        ///m_cuenta_grupo_usuarios Constructor
        ///</summary>
        public Simplem_cuenta_grupo_usuarios() : base()
  {
  InitClass();
  }
        ///<summary>
        ///m_cuenta_grupo_usuarios Constructor
        ///</summary>
        public Simplem_cuenta_grupo_usuarios(int Id, string Name, int cgu_idgrupo, int cgu_idusuario) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cgu_idgrupo = cgu_idgrupo;
this.cgu_idusuario = cgu_idusuario;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3219, "m_cuenta_grupo_usuarios");
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
			BaseObject Object = new Dalm_cuenta_grupo_usuarios(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callerm_cuenta_grupo_usuarios Caller = new Callerm_cuenta_grupo_usuarios();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cgu_idgrupo = this.cgu_idgrupo;
Caller.cgu_idusuario = this.cgu_idusuario;

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
               dt.Columns.Add(new DataColumn("cgu_idgrupo", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cgu_idusuario", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cgu_idgrupo"] = (object)this.cgu_idgrupo ?? System.DBNull.Value;
dr["cgu_idusuario"] = (object)this.cgu_idusuario ?? System.DBNull.Value;
							 
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
