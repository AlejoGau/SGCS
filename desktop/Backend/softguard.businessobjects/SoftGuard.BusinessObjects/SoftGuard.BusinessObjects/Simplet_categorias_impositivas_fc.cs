
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
    ///t_categorias_impositivas_fc Slbf Class
    ///</summary>
    [DataContract]
    public class Simplet_categorias_impositivas_fc : SimpleBaseObject
    { 
			 ///<summary>
     ///cat_ccodigo   
     ///</summary>
	 [DataMember]
     public string cat_ccodigo { get;set;} 
	  ///<summary>
     ///cat_cdescripcion   
     ///</summary>
	 [DataMember]
     public string cat_cdescripcion { get;set;} 
	  ///<summary>
     ///cat_cimpuesto1   
     ///</summary>
	 [DataMember]
     public string cat_cimpuesto1 { get;set;} 
	  ///<summary>
     ///cat_cimpuesto2   
     ///</summary>
	 [DataMember]
     public string cat_cimpuesto2 { get;set;} 
	  ///<summary>
     ///cat_cimpuesto3   
     ///</summary>
	 [DataMember]
     public string cat_cimpuesto3 { get;set;} 
	  ///<summary>
     ///cat_nTipoResp   
     ///</summary>
	 [DataMember]
     public Decimal cat_nTipoResp { get;set;} 
	  ///<summary>
     ///cat_orgicodigoid   
     ///</summary>
	 [DataMember]
     public int cat_orgicodigoid { get;set;} 
	  ///<summary>
     ///cat_cbtidkey   
     ///</summary>
	 [DataMember]
     public int cat_cbtidkey { get;set;} 
	 ///<summary>
        ///t_categorias_impositivas_fc Constructor
        ///</summary>
        public Simplet_categorias_impositivas_fc() : base()
  {
  InitClass();
  }
        ///<summary>
        ///t_categorias_impositivas_fc Constructor
        ///</summary>
        public Simplet_categorias_impositivas_fc(int Id, string Name, string cat_ccodigo, string cat_cdescripcion, string cat_cimpuesto1, string cat_cimpuesto2, string cat_cimpuesto3, Decimal cat_nTipoResp, int cat_orgicodigoid, int cat_cbtidkey) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this.cat_ccodigo = cat_ccodigo;
this.cat_cdescripcion = cat_cdescripcion;
this.cat_cimpuesto1 = cat_cimpuesto1;
this.cat_cimpuesto2 = cat_cimpuesto2;
this.cat_cimpuesto3 = cat_cimpuesto3;
this.cat_nTipoResp = cat_nTipoResp;
this.cat_orgicodigoid = cat_orgicodigoid;
this.cat_cbtidkey = cat_cbtidkey;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3149, "t_categorias_impositivas_fc");
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
			BaseObject Object = new Dalt_categorias_impositivas_fc(SqlConfig, UserId, this);
			if(this.CallerObject != null)
			   Object.CallerObject = this.CallerObject;			
			return Object;
		}
///<summary>
    ///Get parent object
    ///</summary>
		public override CallerObject GetCallerObject()
		{
			Callert_categorias_impositivas_fc Caller = new Callert_categorias_impositivas_fc();
			Caller.Id = base.Id;
			Caller.Name = base.Name;
			Caller.cat_ccodigo = this.cat_ccodigo;
Caller.cat_cdescripcion = this.cat_cdescripcion;
Caller.cat_cimpuesto1 = this.cat_cimpuesto1;
Caller.cat_cimpuesto2 = this.cat_cimpuesto2;
Caller.cat_cimpuesto3 = this.cat_cimpuesto3;
Caller.cat_nTipoResp = this.cat_nTipoResp;
Caller.cat_orgicodigoid = this.cat_orgicodigoid;
Caller.cat_cbtidkey = this.cat_cbtidkey;

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
               dt.Columns.Add(new DataColumn("cat_ccodigo", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cdescripcion", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cimpuesto1", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cimpuesto2", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_cimpuesto3", typeof (string)));               
							 dt.Columns.Add(new DataColumn("cat_nTipoResp", typeof (Decimal)));               
							 dt.Columns.Add(new DataColumn("cat_orgicodigoid", typeof (int)));               
							 dt.Columns.Add(new DataColumn("cat_cbtidkey", typeof (int)));               
							 										
               //create Row  
               dr = dt.NewRow();
               
               //set Row
							 dr["Id"] = base.Id;

							 dr["Name"] = base.Name;
dr["cat_ccodigo"] = (object)this.cat_ccodigo ?? System.DBNull.Value;
dr["cat_cdescripcion"] = (object)this.cat_cdescripcion ?? System.DBNull.Value;
dr["cat_cimpuesto1"] = (object)this.cat_cimpuesto1 ?? System.DBNull.Value;
dr["cat_cimpuesto2"] = (object)this.cat_cimpuesto2 ?? System.DBNull.Value;
dr["cat_cimpuesto3"] = (object)this.cat_cimpuesto3 ?? System.DBNull.Value;
dr["cat_nTipoResp"] = (object)this.cat_nTipoResp ?? System.DBNull.Value;
dr["cat_orgicodigoid"] = (object)this.cat_orgicodigoid ?? System.DBNull.Value;
dr["cat_cbtidkey"] = (object)this.cat_cbtidkey ?? System.DBNull.Value;
							 
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
