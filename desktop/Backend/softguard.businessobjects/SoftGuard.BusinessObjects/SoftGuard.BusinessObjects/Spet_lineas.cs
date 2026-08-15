
    using System;
    using System.Xml;
    using System.Data;
	using System.Collections.Generic;
    using System.Data.SqlClient;
    using Slbf;
    using Slbf.Helpers;     

namespace SoftGuard.BusinessObjects
{ 
   ///<summary>
     ///Specialization class   
     ///</summary>
    public abstract class Spet_lineas : ISpecialization, ICanCopyProperties
    { 
		public event SpecializationHandler BeforeAddChild;
		public event SpecializationHandler AfterAddChild;

		public event SpecializationHandler BeforeRemoveChild; 
		public event SpecializationHandler AfterRemoveChild; 

		public event SpecializationHandler BeforeNewChild;    
		public event SpecializationHandler AfterNewChild;   
 
		public event SpecializationHandler BeforeNewParent;    
		public event SpecializationHandler AfterNewParent;   
 
		public event SpecializationHandler AfterSelect; 
		public event SpecializationHandler AfterDelete; 
		public event SpecializationHandler AfterInsert; 
		public event SpecializationHandler AfterUpdate; 
		public event SpecializationHandler AfterCheck;  
	
	private bool _AutoCommit = false;	 
	protected Dalt_lineas _DalObject;
	protected TaxonomyCollection _Taxonomies;
	protected RelationCollection _Relations;	
		
	
 ///<summary>
     ///Sets the transaction Autocommit property   
     ///</summary>
		public bool AutoCommit
		{
			get{ return this._AutoCommit; }
			set{ this._AutoCommit = value; }
		}		
 ///<summary>
     ///Gets taxonomyCollection   
     ///</summary>		
		public TaxonomyCollection Taxonomies
		{
			get{ return this._Taxonomies; }
		}		
		 ///<summary>
     ///Gets object's Id   
     ///</summary>
		public int Id
		{			
			get{ return this._DalObject.Id; }
		}
		 ///<summary>
     ///Gets object's Name   
     ///</summary>
		public string Name
		{
			set{ this._DalObject.Name = value; }
			get{ return this._DalObject.Name; }
		} 
		 ///<summary>
     ///Gets a frameworkSecurity object   
     ///</summary>
		public FrameworkSecurity Security
		{			
			get{ return this._DalObject.Security; }
		} 		
		 ///<summary>
     ///Gets the callerobject   
     ///</summary>
		public CallerObject CallerObject
		{
			set{ this._DalObject.CallerObject = value; }
			get{ return this._DalObject.CallerObject; }
		}
		 ///<summary>
     ///Gets a baseobject colletction   
     ///</summary>
		public BaseObjectCollection Objects
		{	
			set{ this._DalObject.Objects = value; }
			get{ return this._DalObject.Objects; }
		} 
		 ///<summary>
     ///Gets a simplebaseobjectCollection   
     ///</summary>
		public SimpleBaseObjectCollection Dependencies
		{			
			set{ this._DalObject.Dependencies = value; }
			get{ return this._DalObject.Dependencies; }
		}  				
     ///<summary>
     ///lin_ccodigo property   
     ///</summary>	
     public string  lin_ccodigo 
		 { 
		        
                    get{ return this._DalObject.lin_ccodigo; }
        						set{ this._DalObject.lin_ccodigo = value; } 										
	   }
	  ///<summary>
     ///lin_crazonsocial property   
     ///</summary>	
     public string  lin_crazonsocial 
		 { 
		        
                    get{ return this._DalObject.lin_crazonsocial; }
        						set{ this._DalObject.lin_crazonsocial = value; } 										
	   }
	  ///<summary>
     ///lin_ccalle property   
     ///</summary>	
     public string  lin_ccalle 
		 { 
		        
                    get{ return this._DalObject.lin_ccalle; }
        						set{ this._DalObject.lin_ccalle = value; } 										
	   }
	  ///<summary>
     ///lin_inumero property   
     ///</summary>	
     public int  lin_inumero 
		 { 
		        
                    get{ return this._DalObject.lin_inumero; }
        						set{ this._DalObject.lin_inumero = value; } 										
	   }
	  ///<summary>
     ///lin_npiso property   
     ///</summary>	
     public Decimal  lin_npiso 
		 { 
		        
                    get{ return this._DalObject.lin_npiso; }
        						set{ this._DalObject.lin_npiso = value; } 										
	   }
	  ///<summary>
     ///lin_cdepartamento property   
     ///</summary>	
     public string  lin_cdepartamento 
		 { 
		        
                    get{ return this._DalObject.lin_cdepartamento; }
        						set{ this._DalObject.lin_cdepartamento = value; } 										
	   }
	  ///<summary>
     ///lin_clocalidad property   
     ///</summary>	
     public string  lin_clocalidad 
		 { 
		        
                    get{ return this._DalObject.lin_clocalidad; }
        						set{ this._DalObject.lin_clocalidad = value; } 										
	   }
	  ///<summary>
     ///lin_cprovincia property   
     ///</summary>	
     public string  lin_cprovincia 
		 { 
		        
                    get{ return this._DalObject.lin_cprovincia; }
        						set{ this._DalObject.lin_cprovincia = value; } 										
	   }
	  ///<summary>
     ///lin_cestado property   
     ///</summary>	
     public string  lin_cestado 
		 { 
		        
                    get{ return this._DalObject.lin_cestado; }
        						set{ this._DalObject.lin_cestado = value; } 										
	   }
	  ///<summary>
     ///lin_ccodigopostal property   
     ///</summary>	
     public string  lin_ccodigopostal 
		 { 
		        
                    get{ return this._DalObject.lin_ccodigopostal; }
        						set{ this._DalObject.lin_ccodigopostal = value; } 										
	   }
	  ///<summary>
     ///lin_ctelfono property   
     ///</summary>	
     public string  lin_ctelfono 
		 { 
		        
                    get{ return this._DalObject.lin_ctelfono; }
        						set{ this._DalObject.lin_ctelfono = value; } 										
	   }
	  ///<summary>
     ///lin_cfax property   
     ///</summary>	
     public string  lin_cfax 
		 { 
		        
                    get{ return this._DalObject.lin_cfax; }
        						set{ this._DalObject.lin_cfax = value; } 										
	   }
	  ///<summary>
     ///lin_cimagen property   
     ///</summary>	
     public string  lin_cimagen 
		 { 
		        
                    get{ return this._DalObject.lin_cimagen; }
        						set{ this._DalObject.lin_cimagen = value; } 										
	   }
	  ///<summary>
     ///lin_cusuario property   
     ///</summary>	
     public string  lin_cusuario 
		 { 
		        
                    get{ return this._DalObject.lin_cusuario; }
        						set{ this._DalObject.lin_cusuario = value; } 										
	   }
	  ///<summary>
     ///lin_cclave property   
     ///</summary>	
     public string  lin_cclave 
		 { 
		        
                    get{ return this._DalObject.lin_cclave; }
        						set{ this._DalObject.lin_cclave = value; } 										
	   }
	  ///<summary>
     ///lin_nacceso property   
     ///</summary>	
     public Decimal  lin_nacceso 
		 { 
		        
                    get{ return this._DalObject.lin_nacceso; }
        						set{ this._DalObject.lin_nacceso = value; } 										
	   }
	  ///<summary>
     ///lin_cmail property   
     ///</summary>	
     public string  lin_cmail 
		 { 
		        
                    get{ return this._DalObject.lin_cmail; }
        						set{ this._DalObject.lin_cmail = value; } 										
	   }
	  ///<summary>
     ///lin_iEnviaMailPorFalloTest property   
     ///</summary>	
     public int  lin_iEnviaMailPorFalloTest 
		 { 
		        
                    get{ return this._DalObject.lin_iEnviaMailPorFalloTest; }
        						set{ this._DalObject.lin_iEnviaMailPorFalloTest = value; } 										
	   }
	  ///<summary>
     ///lin_iAutoProcesa property   
     ///</summary>	
     public int  lin_iAutoProcesa 
		 { 
		        
                    get{ return this._DalObject.lin_iAutoProcesa; }
        						set{ this._DalObject.lin_iAutoProcesa = value; } 										
	   }
	  ///<summary>
     ///lin_cMetaData property   
     ///</summary>	
     public string  lin_cMetaData 
		 { 
		        
                    get{ return this._DalObject.lin_cMetaData; }
        						set{ this._DalObject.lin_cMetaData = value; } 										
	   }
	  ///<summary>
     ///lin_iEscala property   
     ///</summary>	
     public int  lin_iEscala 
		 { 
		        
                    get{ return this._DalObject.lin_iEscala; }
        						set{ this._DalObject.lin_iEscala = value; } 										
	   }
	  ///<summary>
     ///lin_iOpnDespuesAlerta property   
     ///</summary>	
     public int  lin_iOpnDespuesAlerta 
		 { 
		        
                    get{ return this._DalObject.lin_iOpnDespuesAlerta; }
        						set{ this._DalObject.lin_iOpnDespuesAlerta = value; } 										
	   }
	  ///<summary>
     ///lin_iGeneraAlarmaPorDesactivacion property   
     ///</summary>	
     public int  lin_iGeneraAlarmaPorDesactivacion 
		 { 
		        
                    get{ return this._DalObject.lin_iGeneraAlarmaPorDesactivacion; }
        						set{ this._DalObject.lin_iGeneraAlarmaPorDesactivacion = value; } 										
	   }
	  ///<summary>
     ///lin_iOrganizacion property   
     ///</summary>	
     public int  lin_iOrganizacion 
		 { 
		        
                    get{ return this._DalObject.lin_iOrganizacion; }
        						set{ this._DalObject.lin_iOrganizacion = value; } 										
	   }
	  ///<summary>
     ///lin_iControlaCierreDespuesDeApertura property   
     ///</summary>	
     public int  lin_iControlaCierreDespuesDeApertura 
		 { 
		        
                    get{ return this._DalObject.lin_iControlaCierreDespuesDeApertura; }
        						set{ this._DalObject.lin_iControlaCierreDespuesDeApertura = value; } 										
	   }
	  ///<summary>
     ///lin_iMinutosControlCDDA property   
     ///</summary>	
     public int  lin_iMinutosControlCDDA 
		 { 
		        
                    get{ return this._DalObject.lin_iMinutosControlCDDA; }
        						set{ this._DalObject.lin_iMinutosControlCDDA = value; } 										
	   }
	  ///<summary>
     ///Constructor   
     ///</summary>
    		public Spet_lineas(SqlHelper SqlConfig, int UserId)
    		{
    			InitClass(SqlConfig, UserId);    			
				this._Taxonomies.Load(this.Security.UserId);
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spet_lineas(SqlHelper SqlConfig, int UserId, int Id)
    		{
    			InitClass(SqlConfig, UserId);        			
			    Load(Id);						
    		}	
 ///<summary>
     ///Constructor   
     ///</summary>			
    		public Spet_lineas(SqlHelper SqlConfig, int UserId, Simplet_lineas Simple)
    		{
    			InitClass(SqlConfig, UserId);    			
    			Load(Simple);								
    		}														
 ///<summary>
     ///Load object data   
     ///</summary>
		public virtual void Load(int Id)
		{
			this._DalObject.Load(Id);
			this._Taxonomies.Load(this.Security.UserId, this._DalObject);
			this._Relations.Load(this._DalObject);			
		}
		 ///<summary>
     ///Load object data   
     ///</summary>
		public virtual void Load(Simplet_lineas Simple)
		{
			this._DalObject.Load(Simple.Id);
			this._Taxonomies.Load(this.Security.UserId, this._DalObject);				
			this._Relations.Load(this._DalObject);
		}		
 ///<summary>
     ///Save object data   
     ///</summary>
        public virtual void Save()
        { 							
				   BeginTran();				        			
        		try
        		{							  
        			this._DalObject.Save();
        			this._Relations.Save(this._DalObject);
        			this._Taxonomies.Save(this._DalObject);
        			
					   CommitTran();                
        		}
        		finally
        		{
        		       EndTran();               
        		}						
        }
 ///<summary>
     ///Delete object   
     ///</summary>
		public virtual void Delete()
		{
			if(this._Relations.Count != 0)
			   throw new RuntimeException("The t_lineas has dependencies.");
			
			if(this._AutoCommit)
				BeginTran();				        			
			try
			{							  
				this._DalObject.Delete();				
        			
				if(this._AutoCommit)
					CommitTran();                
			}
			catch(Exception ex)
			{
				if(this._AutoCommit)
					RollbackTran();
				throw;
			}
			finally
			{
				if(this._AutoCommit)
					EndTran();               
			}
		}
 ///<summary>
     ///Gets a baseobject   
     ///</summary>	
		public BaseObject GetObject()
		{
			return (BaseObject) this._DalObject;
		}
 ///<summary>
     ///Gets a DAL object   
     ///</summary>
		public Dalt_lineas GetDalObject()
		{
			return this._DalObject;
		}
 ///<summary>
     ///Gets a transaction Object   
     ///</summary>	
		public TransactionObject GetTransactionObject()
		{
			return (TransactionObject) this._DalObject;
		}
 ///<summary>
     ///Gets object type   
     ///</summary>
	   public ObjectType GetObjectType(){
			 return this._DalObject.Type;
	   }
 ///<summary>
     ///Gets the caller object   
     ///</summary>	
		public CallerObject GetCallerObject()
		{
			return this._DalObject.GetCallerObject();;
		}
 ///<summary>
     ///Gets a SimpleBaseObject   
     ///</summary>	
		public SimpleBaseObject GetSimpleObject()
		{
			return this._DalObject.GetSimpleObject();
		}
 ///<summary>
     ///Sets a SimpleBaseObject   
     ///</summary>	
		public void SetSimpleObject(SimpleBaseObject Simple)
		{
			this._DalObject.SetSimpleObject(Simple);
		}
 ///<summary>
     ///Gets a DataTable of the object   
     ///</summary>
		public DataTable GetDataObject()
		{												                
			return this._DalObject.GetDataObject();        												    
        }
 ///<summary>
     ///Gets an Xml of the object   
     ///</summary>
		public XmlDataDocument GetXmlObject()
		{
			return this._DalObject.GetXmlObject(); 							    
        }
 ///<summary>
     ///Gets children   
     ///</summary>
		public DataTable GetDataChildsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetDataChildsByObject(Object);
		}
		 ///<summary>
     ///Gets children   
     ///</summary>
		public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetChildsByObject(Object);
		}
		
		 ///<summary>
     ///Gets children   
     ///</summary>
		public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
		{
			return this._DalObject.GetChildsByObject(Object, Recursive);
		}		
		
		public IEnumerable<Simplet_lineas> GetByParent(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByParent(ObjectType, ObjectId);
		}
		public IEnumerable<Simplet_lineas> GetByChild(string ObjectType, int ObjectId)
		{
			return this._DalObject.GetByChild(ObjectType, ObjectId);
		}
		 ///<summary>
     ///Get parents   
     ///</summary>
		public DataTable GetDataParentsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetDataParentsByObject(Object);
		}
		 ///<summary>
     ///Get parents   
     ///</summary>
		public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
		{
			return this._DalObject.GetParentsByObject(Object);
		}
 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, OrderBy, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies)
		{
			int PageTotal = 0;
			int RowTotal = 0;
			return GetDataByName(Name, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
		  return this._DalObject.GetDataByNameWithChild(Name, Taxonomies, FilterChildObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
		  return this._DalObject.GetDataByNameWithParent(Name, Taxonomies, FilterParentObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}	
 ///<summary>
     ///Search objects   
     ///</summary>		
		public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies)
		{
			int PageTotal = 0;
			int RowTotal = 0;
			return GetDataByText(Text, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
		}
		
		 ///<summary>
     ///Search objects   
     ///</summary>
		public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
		{
			return this._DalObject.GetDataByText(Text, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
		}
		
		public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
        {
            return this._DalObject.GetDataByFilter(Page, Start, Limit, Sort, Group, Filter, ref TotalRows);
        }
 ///<summary>
     ///Add child   
     ///</summary>
		public BaseObject NewChild(ISpecialization Child)
		{
			return NewChild(Child, null);
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public BaseObject NewChild(ISpecialization Child, ValueCollection Values)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(this._DalObject.Id == 0)
				throw new InvalidObjectException(this.GetObject(), "The t_lineas is null.");

			if(BeforeNewChild != null)
				BeforeNewChild(this, new SimpleEventArgs(Child.GetSimpleObject()));

			RelationCollection Relations = new RelationCollection(this.Security.SqlConfig);

			try
			{
				TranObject.BeginTran();
				Relations.BeginTran();
				
				TranObject.Save();				
				
				if(Values == null)			
					Relations.CreateRelation(TranObject);
				else
					Relations.CreateRelation(TranObject, Values);
							
				Relations.Save(this._DalObject);
				
				TranObject.CommitTran();
				Relations.CommitTran();		
				
				if(AfterNewChild != null)
					AfterNewChild(this, new SimpleEventArgs(Child.GetSimpleObject()));									
			}
			catch(Exception ex)
			{
				TranObject.RollbackTran();
				Relations.RollbackTran();
				throw;
			}
			finally
			{
				TranObject.EndTran();
				Relations.EndTran();
			}		
			return TranObject;
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public void AddChild(ISpecialization Child)
		{
			AddChild(Child, null);
		}
		 ///<summary>
     ///Add child   
     ///</summary>
		public void AddChild(ISpecialization Child, ValueCollection Values)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(TranObject.Id == 0)
				throw new InvalidObjectException(TranObject, "The " + TranObject.Type.Name + " is null.");
			
			if(BeforeAddChild != null)
				BeforeAddChild(this, new SimpleEventArgs(Child.GetSimpleObject()));
			
			if(Values == null)
				this._Relations.CreateRelation(TranObject);
			else
				this._Relations.CreateRelation(TranObject, Values);
				
			if(AfterAddChild != null)
				AfterAddChild(this, new SimpleEventArgs(Child.GetSimpleObject()));				
		}
			 ///<summary>
     ///Add Parent   
     ///</summary>	
    public void NewParent(ISpecialization Parent, ValueCollection Values)
    {                 
        if(this.Id == 0)
              throw new InvalidObjectException(this.GetTransactionObject(), "The " + GetObjectType().Name + " is null.");

		if(BeforeNewParent != null)
			BeforeNewParent(this, new SimpleEventArgs(Parent.GetSimpleObject()));

        if(Values == null)
              Parent.NewChild(this);

        if(Values != null)
           Parent.NewChild(this, Values);
           
		if(AfterNewParent != null)
			AfterNewParent(this, new SimpleEventArgs(Parent.GetSimpleObject()));           
    }
	 ///<summary>
     ///Add Parent   
     ///</summary>
    public void NewParent(ISpecialization Parent)
    {                 
        NewParent(Parent, null);
    }		
 ///<summary>
     ///Remove child   
     ///</summary>
		public void RemoveChild(ISpecialization Child)
		{
			TransactionObject TranObject = Child.GetTransactionObject();
			if(TranObject.Id == 0)
				throw new InvalidObjectException(TranObject, "The " + TranObject.Type.Name + " is null.");

			if(BeforeRemoveChild != null)
				BeforeRemoveChild(this, new SimpleEventArgs(Child.GetSimpleObject()));
						
			this._Relations.RemoveRelation(TranObject);
			
			if(AfterRemoveChild != null)
				AfterRemoveChild(this, new SimpleEventArgs(Child.GetSimpleObject()));			
		}		
 ///<summary>
     ///Initialices class instance   
     ///</summary>
		private void InitClass(SqlHelper SqlConfig, int UserId)
		{			
			this._DalObject = new Dalt_lineas(SqlConfig, UserId);		
			this._Taxonomies = new TaxonomyCollection(SqlConfig, UserId);
			this._Relations = new RelationCollection(SqlConfig);

			this._AutoCommit = true;
			this._DalObject.AutoCommit = false;
			this._Taxonomies.AutoCommit = false;						
			this._Relations.AutoCommit = false;		
		}
 ///<summary>
     ///Transaction   
     ///</summary>
		public void BeginTran()
		{
			this._DalObject.BeginTran();
			this._Taxonomies.BeginTran();
			this._Relations.BeginTran();			
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void CommitTran()
		{					
			this._DalObject.CommitTran();			
			this._Taxonomies.CommitTran();
			this._Relations.CommitTran();			
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void RollbackTran()
		{					    
			this._DalObject.RollbackTran();
			this._Taxonomies.RollbackTran();			
			this._Relations.RollbackTran();
		}
		 ///<summary>
     ///Transaction   
     ///</summary>
		public void EndTran()
		{			
			this._DalObject.EndTran();
			this._Taxonomies.EndTran();
			this._Relations.EndTran();
		}

		public void CopyPropertiesTo(ISpecialization Object)
        {
			var o = (SoftGuard.BusinessObjects.t_lineas)Object;
			o.Name = this.Name;

			o.lin_ccodigo = this.lin_ccodigo;

			o.lin_crazonsocial = this.lin_crazonsocial;

			o.lin_ccalle = this.lin_ccalle;

			o.lin_inumero = this.lin_inumero;

			o.lin_npiso = this.lin_npiso;

			o.lin_cdepartamento = this.lin_cdepartamento;

			o.lin_clocalidad = this.lin_clocalidad;

			o.lin_cprovincia = this.lin_cprovincia;

			o.lin_cestado = this.lin_cestado;

			o.lin_ccodigopostal = this.lin_ccodigopostal;

			o.lin_ctelfono = this.lin_ctelfono;

			o.lin_cfax = this.lin_cfax;

			o.lin_cimagen = this.lin_cimagen;

			o.lin_cusuario = this.lin_cusuario;

			o.lin_cclave = this.lin_cclave;

			o.lin_nacceso = this.lin_nacceso;

			o.lin_cmail = this.lin_cmail;

			o.lin_iEnviaMailPorFalloTest = this.lin_iEnviaMailPorFalloTest;

			o.lin_iAutoProcesa = this.lin_iAutoProcesa;

			o.lin_cMetaData = this.lin_cMetaData;

			o.lin_iEscala = this.lin_iEscala;

			o.lin_iOpnDespuesAlerta = this.lin_iOpnDespuesAlerta;

			o.lin_iGeneraAlarmaPorDesactivacion = this.lin_iGeneraAlarmaPorDesactivacion;

			o.lin_iOrganizacion = this.lin_iOrganizacion;

			o.lin_iControlaCierreDespuesDeApertura = this.lin_iControlaCierreDespuesDeApertura;

			o.lin_iMinutosControlCDDA = this.lin_iMinutosControlCDDA;

        }

		protected void OnAfterSelect(SimpleEventArgs Arg)
		{
			if (AfterSelect != null) AfterSelect(this, Arg);
		}
		protected void OnAfterInsert(SimpleEventArgs Arg)
		{
			if (AfterInsert != null) AfterInsert(this, Arg);
		}
		protected void OnAfterUpdate(SimpleEventArgs Arg)
		{
			if (AfterUpdate != null) AfterUpdate(this, Arg);
		}
		protected void OnAfterDelete(SimpleEventArgs Arg)
		{
			if (AfterDelete != null) AfterDelete(this, Arg);
		}
		protected void OnAfterCheck(SimpleEventArgs Arg)
		{
			if (AfterCheck != null) AfterCheck(this, Arg);
		}
 }

}
