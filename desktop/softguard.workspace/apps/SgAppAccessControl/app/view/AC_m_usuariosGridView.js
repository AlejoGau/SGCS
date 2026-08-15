Ext.define("SgAppAccessControl.view.AC_m_usuariosGridView", {
  extend: "Ext.grid.GridPanel",
  alias: ["widget.ac_m_usuariosgridview"],
  title: "Templates",
  autoHeight: true,
  viewConfig: {
    trackOver: true,
    stripeRows: true,
    loadMask: false,
  },
  activeHelp: true,
  columns: [
    {
      xtype: "actioncolumn",
      width: 30,
      items: [
        {
          iconCls: "icon-table-edit",
          tooltip: "Editar",
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("ac_m_usuariosgridview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("objectedit", rec, grid);
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Tipo persona",
      sortable: true,
      dataIndex: "usu_ntipo",
      renderer: function (value) {
        var store = Ext.data.StoreManager.get("SoftguardUsuarioTipoStore");
        var record = store.findRecord("Value", value);
        if (record == undefined) return "";
        else return record.get("Name");
      },
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "usu_cnombre",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Identificacion",
      dataIndex: "usu_cidentificacion",
      flex: 1,
    },
    /*,{
		            xtype : 'gridcolumn',            
		            header : 'Ultimo acceso',
		            dataIndex : 'cac_fecha',
		            flex: 1,
		            renderer: function (value,obj, record) {
		                return value?Ext.Date.format(new Date(value), 'd-m-Y G:i:s'): getLocale('No registra acceso')
		            }
		        }*/
    /*,{
		            xtype : 'gridcolumn',            
		            header : 'Tipo acceso',
		            dataIndex : 'cac_tipoacceso',           
		            width: 50,
		            renderer:function (value,obj,record) {
		                
		                if(record.get('cac_fecha')) {
		                    if(value == 1) {
		                        return '<img src="/resources/global/images/icons/door_in.png" height="16" widht="16" title="'+getLocale('Ingreso')+'" />'
		                    } else {
		                        return '<img src="/resources/global/images/icons/door_out.png" height="16" widht="16" title="'+getLocale('Egreso')+'" />'                   
		                    }
		                }
		            }
		        },*/
    /*{
		            xtype : 'gridcolumn',            
		            header : 'Vehiculo',
		            dataIndex : 'Name',
		            flex: 1
		    	},{
		            xtype : 'gridcolumn',            
		            header : 'Marca',
		        	dataIndex : 'Brand',
		            flex: 1
				}*/
    {
      xtype: "gridcolumn",
      header: "Matrícula",
      dataIndex: "DomainManipulated",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Unidad funcional",
      dataIndex: "_cuenta",
      flex: 1,
    },
    {
      xtype: "gridcolumn",
      header: "Localidad",
      dataIndex: "cue_clocalidad",
      flex: 1,
    },
  ],

  initComponent: function () {
    var comboSearch = [["usu_cnombre", getLocale("Nombre")]];

    this.callParent(arguments);
    var pagingtoolbar = Ext.create("Ext.toolbar.Paging", {
      dock: "bottom",
      displayInfo: true,
    });
    this.addDocked(pagingtoolbar);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-table-add",
          text: "Nuevo",
          scope: this,
          action: "add",
          itemId: "add",
        },
        "-",
        {
          text: "Filtros",
          itemId: "filtersInvitedUsersButton",
          menu: {
            xtype: "menu",
            width: 280,
            items: [
              {
                xtype: "panel",
                bodyPadding: 5,
                items: [
                  {
                    xtype: "textfield",
                    itemId: "nombre",
                    fieldLabel: "Nombre",
                  },
                  {
                    xtype: "textfield",
                    itemId: "identificacion",
                    fieldLabel: "Identificacion",
                  },
                  {
                    xtype: "textfield",
                    itemId: "matricula",
                    fieldLabel: "Matricula",
                  },
                  {
                    xtype: "textfield",
                    itemId: "cuenta",
                    fieldLabel: "Unidad funcional",
                  },
                ],
              },
            ],
          },
        },
        {
          iconCls: "icon-find",
          text: "Buscar",
          scope: this,
          action: "search",
          itemId: "searchInvitedUsersButton",
        },
        "-",
        {
          iconCls: "icon-find",
          text: "Todos",
          scope: this,
          action: "getall",
          itemId: "getallInvitedUsersButton",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
XMLDocument