// Decompiled with JetBrains decompiler
// Type: SoftGuard.BusinessObjects.Spet_puertos
// Assembly: SoftGuard.BusinessObjects, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 713CE5C0-67AB-42D2-B2AB-45096DD6DAF7
// Assembly location: C:\development\working\SoftGuard.EnterpriseServices\dll backup\SoftGuard.BusinessObjects.dll

using Slbf;
using Slbf.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Xml;

namespace SoftGuard.BusinessObjects
{
  public abstract class Spet_puertos : ISpecialization, ICanCopyProperties
  {
    private bool _AutoCommit = false;
    protected Dalt_puertos _DalObject;
    protected TaxonomyCollection _Taxonomies;
    protected RelationCollection _Relations;

    public bool AutoCommit
    {
      get
      {
        return this._AutoCommit;
      }
      set
      {
        this._AutoCommit = value;
      }
    }

    public TaxonomyCollection Taxonomies
    {
      get
      {
        return this._Taxonomies;
      }
    }

    public int Id
    {
      get
      {
        return this._DalObject.Id;
      }
    }

    public string Name
    {
      get
      {
        return this._DalObject.Name;
      }
      set
      {
        this._DalObject.Name = value;
      }
    }

    public FrameworkSecurity Security
    {
      get
      {
        return this._DalObject.Security;
      }
    }

    public CallerObject CallerObject
    {
      get
      {
        return this._DalObject.CallerObject;
      }
      set
      {
        this._DalObject.CallerObject = value;
      }
    }

    public BaseObjectCollection Objects
    {
      get
      {
        return this._DalObject.Objects;
      }
      set
      {
        this._DalObject.Objects = value;
      }
    }

    public SimpleBaseObjectCollection Dependencies
    {
      get
      {
        return this._DalObject.Dependencies;
      }
      set
      {
        this._DalObject.Dependencies = value;
      }
    }

    public int pue_icodigo
    {
      get
      {
        return this._DalObject.pue_icodigo;
      }
      set
      {
        this._DalObject.pue_icodigo = value;
      }
    }

    public string pue_cdescripcion
    {
      get
      {
        return this._DalObject.pue_cdescripcion;
      }
      set
      {
        this._DalObject.pue_cdescripcion = value;
      }
    }

    public int pue_ireceptor
    {
      get
      {
        return this._DalObject.pue_ireceptor;
      }
      set
      {
        this._DalObject.pue_ireceptor = value;
      }
    }

    public Decimal pue_npuerto
    {
      get
      {
        return this._DalObject.pue_npuerto;
      }
      set
      {
        this._DalObject.pue_npuerto = value;
      }
    }

    public Decimal pue_ndatabits
    {
      get
      {
        return this._DalObject.pue_ndatabits;
      }
      set
      {
        this._DalObject.pue_ndatabits = value;
      }
    }

    public Decimal pue_nstopbits
    {
      get
      {
        return this._DalObject.pue_nstopbits;
      }
      set
      {
        this._DalObject.pue_nstopbits = value;
      }
    }

    public Decimal pue_nbaudrate
    {
      get
      {
        return this._DalObject.pue_nbaudrate;
      }
      set
      {
        this._DalObject.pue_nbaudrate = value;
      }
    }

    public Decimal pue_nparity
    {
      get
      {
        return this._DalObject.pue_nparity;
      }
      set
      {
        this._DalObject.pue_nparity = value;
      }
    }

    public Decimal pue_nflowctrl
    {
      get
      {
        return this._DalObject.pue_nflowctrl;
      }
      set
      {
        this._DalObject.pue_nflowctrl = value;
      }
    }

    public Decimal pue_nbufferin
    {
      get
      {
        return this._DalObject.pue_nbufferin;
      }
      set
      {
        this._DalObject.pue_nbufferin = value;
      }
    }

    public Decimal pue_nbufferout
    {
      get
      {
        return this._DalObject.pue_nbufferout;
      }
      set
      {
        this._DalObject.pue_nbufferout = value;
      }
    }

    public Decimal pue_nrts
    {
      get
      {
        return this._DalObject.pue_nrts;
      }
      set
      {
        this._DalObject.pue_nrts = value;
      }
    }

    public Decimal pue_ndtr
    {
      get
      {
        return this._DalObject.pue_ndtr;
      }
      set
      {
        this._DalObject.pue_ndtr = value;
      }
    }

    public Decimal pue_nestado
    {
      get
      {
        return this._DalObject.pue_nestado;
      }
      set
      {
        this._DalObject.pue_nestado = value;
      }
    }

    public Decimal pue_crespondeack
    {
      get
      {
        return this._DalObject.pue_crespondeack;
      }
      set
      {
        this._DalObject.pue_crespondeack = value;
      }
    }

    public int pue_itiempoinactividad
    {
      get
      {
        return this._DalObject.pue_itiempoinactividad;
      }
      set
      {
        this._DalObject.pue_itiempoinactividad = value;
      }
    }

    public Decimal pue_cresetxhb
    {
      get
      {
        return this._DalObject.pue_cresetxhb;
      }
      set
      {
        this._DalObject.pue_cresetxhb = value;
      }
    }

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

    public Spet_puertos(SqlHelper SqlConfig, int UserId)
    {
      this.InitClass(SqlConfig, UserId);
      this._Taxonomies.Load(this.Security.UserId);
    }

    public Spet_puertos(SqlHelper SqlConfig, int UserId, int Id)
    {
      this.InitClass(SqlConfig, UserId);
      this.Load(Id);
    }

    public Spet_puertos(SqlHelper SqlConfig, int UserId, Simplet_puertos Simple)
    {
      this.InitClass(SqlConfig, UserId);
      this.Load(Simple);
    }

    public virtual void Load(int Id)
    {
      this._DalObject.Load(Id);
      this._Taxonomies.Load(this.Security.UserId, (BaseObject) this._DalObject);
      this._Relations.Load((BaseObject) this._DalObject);
    }

    public virtual void Load(Simplet_puertos Simple)
    {
      this._DalObject.Load(Simple.Id);
      this._Taxonomies.Load(this.Security.UserId, (BaseObject) this._DalObject);
      this._Relations.Load((BaseObject) this._DalObject);
    }

    public virtual void Save()
    {
      this.BeginTran();
      try
      {
        this._DalObject.Save();
        this._Relations.Save((BaseObject) this._DalObject);
        this._Taxonomies.Save((BaseObject) this._DalObject);
        this.CommitTran();
      }
      finally
      {
        this.EndTran();
      }
    }

    public virtual void Delete()
    {
      if (this._Relations.Count != 0)
        throw new RuntimeException("The t_puertos has dependencies.");
      if (this._AutoCommit)
        this.BeginTran();
      try
      {
        this._DalObject.Delete();
        if (!this._AutoCommit)
          return;
        this.CommitTran();
      }
      catch (Exception ex)
      {
        if (this._AutoCommit)
          this.RollbackTran();
        throw;
      }
      finally
      {
        if (this._AutoCommit)
          this.EndTran();
      }
    }

    public BaseObject GetObject()
    {
      return (BaseObject) this._DalObject;
    }

    public Dalt_puertos GetDalObject()
    {
      return this._DalObject;
    }

    public TransactionObject GetTransactionObject()
    {
      return (TransactionObject) this._DalObject;
    }

    public ObjectType GetObjectType()
    {
      return this._DalObject.Type;
    }

    public CallerObject GetCallerObject()
    {
      return this._DalObject.GetCallerObject();
    }

    public SimpleBaseObject GetSimpleObject()
    {
      return this._DalObject.GetSimpleObject();
    }

    public void SetSimpleObject(SimpleBaseObject Simple)
    {
      this._DalObject.SetSimpleObject(Simple);
    }

    public DataTable GetDataObject()
    {
      return this._DalObject.GetDataObject();
    }

    public XmlDataDocument GetXmlObject()
    {
      return this._DalObject.GetXmlObject();
    }

    public DataTable GetDataChildsByObject(SimpleBaseObject Object)
    {
      return this._DalObject.GetDataChildsByObject(Object);
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object)
    {
      return this._DalObject.GetChildsByObject(Object);
    }

    public SimpleBaseObjectCollection GetChildsByObject(SimpleBaseObject Object, bool Recursive)
    {
      return this._DalObject.GetChildsByObject(Object, Recursive);
    }

    public IEnumerable<Simplet_puertos> GetByParent(string ObjectType, int ObjectId)
    {
      return this._DalObject.GetByParent(ObjectType, ObjectId);
    }

    public IEnumerable<Simplet_puertos> GetByChild(string ObjectType, int ObjectId)
    {
      return this._DalObject.GetByChild(ObjectType, ObjectId);
    }

    public DataTable GetDataParentsByObject(SimpleBaseObject Object)
    {
      return this._DalObject.GetDataParentsByObject(Object);
    }

    public SimpleBaseObjectCollection GetParentsByObject(SimpleBaseObject Object)
    {
      return this._DalObject.GetParentsByObject(Object);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, string OrderBy, ref int PageTotal, ref int RowTotal)
    {
      return this._DalObject.GetDataByName(Name, Taxonomies, PageCount, PagePresent, OrderBy, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByName(string Name, TaxonomyCollection Taxonomies)
    {
      int PageTotal = 0;
      int RowTotal = 0;
      return this.GetDataByName(Name, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByNameWithChild(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterChildObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this._DalObject.GetDataByNameWithChild(Name, Taxonomies, FilterChildObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByNameWithParent(string Name, TaxonomyCollection Taxonomies, SimpleBaseObject FilterParentObject, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this._DalObject.GetDataByNameWithParent(Name, Taxonomies, FilterParentObject, PageCount, PagePresent, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies)
    {
      int PageTotal = 0;
      int RowTotal = 0;
      return this.GetDataByText(Text, Taxonomies, 0, 1, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByText(string Text, TaxonomyCollection Taxonomies, int PageCount, int PagePresent, ref int PageTotal, ref int RowTotal)
    {
      return this._DalObject.GetDataByText(Text, Taxonomies, PageCount, PagePresent, ref PageTotal, ref RowTotal);
    }

    public DataTable GetDataByFilter(int Page, int Start, int Limit, string Sort, string Group, string Filter, ref int TotalRows)
    {
      return this._DalObject.GetDataByFilter(Page, Start, Limit, Sort, Group, Filter, ref TotalRows);
    }

    public BaseObject NewChild(ISpecialization Child)
    {
      return this.NewChild(Child, (Slbf.ValueCollection) null);
    }

    public BaseObject NewChild(ISpecialization Child, Slbf.ValueCollection Values)
    {
      TransactionObject transactionObject = Child.GetTransactionObject();
      if (this._DalObject.Id == 0)
        throw new InvalidObjectException(this.GetObject(), "The t_puertos is null.");
      if (this.BeforeNewChild != null)
        this.BeforeNewChild((ISpecialization) this, new SimpleEventArgs(Child.GetSimpleObject()));
      RelationCollection relationCollection = new RelationCollection(this.Security.SqlConfig);
      try
      {
        transactionObject.BeginTran();
        relationCollection.BeginTran();
        transactionObject.Save();
        if (Values == null)
          relationCollection.CreateRelation((BaseObject) transactionObject);
        else
          relationCollection.CreateRelation((BaseObject) transactionObject, Values);
        relationCollection.Save((BaseObject) this._DalObject);
        transactionObject.CommitTran();
        relationCollection.CommitTran();
        if (this.AfterNewChild != null)
          this.AfterNewChild((ISpecialization) this, new SimpleEventArgs(Child.GetSimpleObject()));
      }
      catch (Exception ex)
      {
        transactionObject.RollbackTran();
        relationCollection.RollbackTran();
        throw;
      }
      finally
      {
        transactionObject.EndTran();
        relationCollection.EndTran();
      }
      return (BaseObject) transactionObject;
    }

    public void AddChild(ISpecialization Child)
    {
      this.AddChild(Child, (Slbf.ValueCollection) null);
    }

    public void AddChild(ISpecialization Child, Slbf.ValueCollection Values)
    {
      TransactionObject transactionObject = Child.GetTransactionObject();
      if (transactionObject.Id == 0)
        throw new InvalidObjectException((BaseObject) transactionObject, "The " + transactionObject.Type.Name + " is null.");
      if (this.BeforeAddChild != null)
        this.BeforeAddChild((ISpecialization) this, new SimpleEventArgs(Child.GetSimpleObject()));
      if (Values == null)
        this._Relations.CreateRelation((BaseObject) transactionObject);
      else
        this._Relations.CreateRelation((BaseObject) transactionObject, Values);
      if (this.AfterAddChild == null)
        return;
      this.AfterAddChild((ISpecialization) this, new SimpleEventArgs(Child.GetSimpleObject()));
    }

    public void NewParent(ISpecialization Parent, Slbf.ValueCollection Values)
    {
      if (this.Id == 0)
        throw new InvalidObjectException((BaseObject) this.GetTransactionObject(), "The " + this.GetObjectType().Name + " is null.");
      if (this.BeforeNewParent != null)
        this.BeforeNewParent((ISpecialization) this, new SimpleEventArgs(Parent.GetSimpleObject()));
      if (Values == null)
        Parent.NewChild((ISpecialization) this);
      if (Values != null)
        Parent.NewChild((ISpecialization) this, Values);
      if (this.AfterNewParent == null)
        return;
      this.AfterNewParent((ISpecialization) this, new SimpleEventArgs(Parent.GetSimpleObject()));
    }

    public void NewParent(ISpecialization Parent)
    {
      this.NewParent(Parent, (Slbf.ValueCollection) null);
    }

    public void RemoveChild(ISpecialization Child)
    {
      TransactionObject transactionObject = Child.GetTransactionObject();
      if (transactionObject.Id == 0)
        throw new InvalidObjectException((BaseObject) transactionObject, "The " + transactionObject.Type.Name + " is null.");
      if (this.BeforeRemoveChild != null)
        this.BeforeRemoveChild((ISpecialization) this, new SimpleEventArgs(Child.GetSimpleObject()));
      this._Relations.RemoveRelation((BaseObject) transactionObject);
      if (this.AfterRemoveChild == null)
        return;
      this.AfterRemoveChild((ISpecialization) this, new SimpleEventArgs(Child.GetSimpleObject()));
    }

    private void InitClass(SqlHelper SqlConfig, int UserId)
    {
      this._DalObject = new Dalt_puertos(SqlConfig, UserId);
      this._Taxonomies = new TaxonomyCollection(SqlConfig, UserId);
      this._Relations = new RelationCollection(SqlConfig);
      this._AutoCommit = true;
      this._DalObject.AutoCommit = false;
      this._Taxonomies.AutoCommit = false;
      this._Relations.AutoCommit = false;
    }

    public void BeginTran()
    {
      this._DalObject.BeginTran();
      this._Taxonomies.BeginTran();
      this._Relations.BeginTran();
    }

    public void CommitTran()
    {
      this._DalObject.CommitTran();
      this._Taxonomies.CommitTran();
      this._Relations.CommitTran();
    }

    public void RollbackTran()
    {
      this._DalObject.RollbackTran();
      this._Taxonomies.RollbackTran();
      this._Relations.RollbackTran();
    }

    public void EndTran()
    {
      this._DalObject.EndTran();
      this._Taxonomies.EndTran();
      this._Relations.EndTran();
    }

    public void CopyPropertiesTo(ISpecialization Object)
    {
      t_puertos tPuertos = (t_puertos) Object;
      tPuertos.Name = this.Name;
      tPuertos.pue_icodigo = this.pue_icodigo;
      tPuertos.pue_cdescripcion = this.pue_cdescripcion;
      tPuertos.pue_ireceptor = this.pue_ireceptor;
      tPuertos.pue_npuerto = this.pue_npuerto;
      tPuertos.pue_ndatabits = this.pue_ndatabits;
      tPuertos.pue_nstopbits = this.pue_nstopbits;
      tPuertos.pue_nbaudrate = this.pue_nbaudrate;
      tPuertos.pue_nparity = this.pue_nparity;
      tPuertos.pue_nflowctrl = this.pue_nflowctrl;
      tPuertos.pue_nbufferin = this.pue_nbufferin;
      tPuertos.pue_nbufferout = this.pue_nbufferout;
      tPuertos.pue_nrts = this.pue_nrts;
      tPuertos.pue_ndtr = this.pue_ndtr;
      tPuertos.pue_nestado = this.pue_nestado;
      tPuertos.pue_crespondeack = this.pue_crespondeack;
      tPuertos.pue_itiempoinactividad = this.pue_itiempoinactividad;
      tPuertos.pue_cresetxhb = this.pue_cresetxhb;
    }

    protected void OnAfterSelect(SimpleEventArgs Arg)
    {
      if (this.AfterSelect == null)
        return;
      this.AfterSelect((ISpecialization) this, Arg);
    }

    protected void OnAfterInsert(SimpleEventArgs Arg)
    {
      if (this.AfterInsert == null)
        return;
      this.AfterInsert((ISpecialization) this, Arg);
    }

    protected void OnAfterUpdate(SimpleEventArgs Arg)
    {
      if (this.AfterUpdate == null)
        return;
      this.AfterUpdate((ISpecialization) this, Arg);
    }

    protected void OnAfterDelete(SimpleEventArgs Arg)
    {
      if (this.AfterDelete == null)
        return;
      this.AfterDelete((ISpecialization) this, Arg);
    }

    protected void OnAfterCheck(SimpleEventArgs Arg)
    {
      if (this.AfterCheck == null)
        return;
      this.AfterCheck((ISpecialization) this, Arg);
    }
  }
}
