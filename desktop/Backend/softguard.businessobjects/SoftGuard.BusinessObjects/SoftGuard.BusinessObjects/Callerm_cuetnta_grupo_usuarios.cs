
    using System;
    using System.Xml;
    using System.Data;
    using Slbf;
    using Slbf.Helpers;	    	 

namespace SoftGuard.BusinessObjects
{ 	
   ///<summary>
     ///Caller object class   
     ///</summary>
    public class Callerm_cuetnta_grupo_usuarios : CallerObject
    { 	
				     private int _cgu_idgrupo;
					
				     private int _cgu_idusuario;
				 ///<summary>
     ///cgu_idgrupo property   
     ///</summary>   
     public int cgu_idgrupo 
		 { 
		        
                    get{ return this._cgu_idgrupo; }
        						set{ this._cgu_idgrupo = value; } 										
	   }
	  ///<summary>
     ///cgu_idusuario property   
     ///</summary>   
     public int cgu_idusuario 
		 { 
		        
                    get{ return this._cgu_idusuario; }
        						set{ this._cgu_idusuario = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
        public Callerm_cuetnta_grupo_usuarios() : base()
        {
            InitClass();
        }  
 ///<summary>
     ///Constructor   
     ///</summary>		
        public Callerm_cuetnta_grupo_usuarios(int Id, string Name, int cgu_idgrupo, int cgu_idusuario) : base()
        {
            base.Id = Id;
						base.Name = Name;				 																																					 
				    this._cgu_idgrupo = cgu_idgrupo;
this._cgu_idusuario = cgu_idusuario;

            InitClass();
        }  								

				private void InitClass()
        {														
  				  base.Type = new ObjectType(3219, "m_cuetnta_grupo_usuarios");
        }
 ///<summary>
     ///Gets the caller object   
     ///</summary>		
		public override CallerObject GetObject()
		{
			return (CallerObject) this;
		}
 ///<summary>
     ///Gets a simpleobject   
     ///</summary>	
		public override SimpleBaseObject GetSimpleObject()
		{
			Simplem_cuetnta_grupo_usuarios Simple = new Simplem_cuetnta_grupo_usuarios();
			Simple.Id = base.Id;
			Simple.Name = base.Name;
			Simple.cgu_idgrupo = this._cgu_idgrupo;
Simple.cgu_idusuario = this._cgu_idusuario;

			return (SimpleBaseObject) Simple;
		}
 ///<summary>
     ///Sets a simpleobject   
     ///</summary>	
		public void SetSimpleObject(Simplem_cuetnta_grupo_usuarios Simple)
		{
			base.Id = Simple.Id;
			base.Name = Simple.Name;
			this._cgu_idgrupo = Simple.cgu_idgrupo;
this._cgu_idusuario = Simple.cgu_idusuario;

		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>
		public override BaseObject GetBaseObject(SqlHelper SqlConfig, int UserId)
		{
			return new Dalm_cuetnta_grupo_usuarios(SqlConfig, UserId, (Simplem_cuetnta_grupo_usuarios) GetSimpleObject());
		}
 ///<summary>
     ///Get object's data   
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
dr["cgu_idgrupo"] = this._cgu_idgrupo;
dr["cgu_idusuario"] = this._cgu_idusuario;
							 
               //Insert Row in Table
               dt.Rows.Add(dr);
							 
							 return dt;	 
												    
        }
 ///<summary>
     ///Get object's Xml representation   
     ///</summary>
	public override XmlDataDocument GetXmlObject()
    {
			DataSet ds = new DataSet("Caller"); 
			ds.EnforceConstraints = false;														                
               							 
			ds.Tables.Add(GetDataObject());
			ds.Tables.Add(this.Type.GetDataObject());
			XmlDataDocument XmlDoc = new XmlDataDocument(ds);
			if(this.Relation != null)
				XmlDoc.SelectSingleNode("//Caller").InnerXml += this.Relation.Values.GetXmlObjects().InnerXml;
			return XmlDoc;	
    }
 }

}
