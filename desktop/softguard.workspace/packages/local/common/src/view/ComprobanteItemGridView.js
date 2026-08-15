Ext.define("Common.view.ComprobanteItemGridView", {
  extend: "Ext.grid.GridPanel",
  alias: "widget.comprobanteitemsearchview",
  title: "Items",
  /*features: [{
        ftype: 'summary'
    }],*/
  plugins: [
    Ext.create("Ext.grid.plugin.CellEditing", {
      clicksToEdit: 1,
    }),
  ],
  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  columns: [
    {
      xtype: "actioncolumn",
      header: "",
      width: 40,
      items: [
        {
          iconCls: "icon-delete",
          tooltip: getLocale("Eliminar"),
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up("comprobanteitemsearchview");
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent("deleteitem", rec, view);
          },
        },
      ],
    },
    {
      xtype: "gridcolumn",
      header: "Artículo",
      dataIndex: "cbi_iproducto",
      width: 60,
      sortable: true,
    },
    {
      xtype: "gridcolumn",
      header: "Nombre",
      dataIndex: "Name",
      width: 200,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Cantidad",
      dataIndex: "cbi_icantidad",
      width: 100,
      sortable: true,
      summaryType: "count",
      /*summaryRenderer: function(value, summaryData, dataIndex) {
                var text = value !== 1 ? getLocale('Items') : getLocale('Item');
                return value + ' '+text; 
            }*/
    },
    {
      xtype: "numbercolumn",
      header: "Valor",
      dataIndex: "cbi_yimporte",
      renderer: function (value, obj, record) {
        if (this.recordOrganizacion) {
          return Ext.util.Format.currency(
            value,
            this.recordOrganizacion.get("mon_csymbol") + " ",
          );
        } else {
          return value;
        }
      },
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Descuento (%)",
      dataIndex: "cbi_ndescuento",
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Neto",
      dataIndex: "_subtotal",
      renderer: function (value, obj, record) {
        if (this.recordOrganizacion) {
          return Ext.util.Format.currency(
            value,
            this.recordOrganizacion.get("mon_csymbol") + " ",
          );
        } else {
          return value;
        }
      },
      width: 100,
      sortable: false,
      summaryType: "sum",
      /*summaryRenderer: function(value,obj,record){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,record.get('pro_currency')+' ');//Ext.util.Format.currency(value,this.recordOrganizacion.get('mon_csymbol')+' ')
                } else {
                   return value
                }
            }*/
    },
    {
      xtype: "numbercolumn",
      header: "Impuesto",
      dataIndex: "imp_nporcentaje",
      summaryType: "sum",
      /*summaryRenderer: function(value,obj,record){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,record.get('pro_currency')+' ');//Ext.util.Format.currency(value,this.recordOrganizacion.get('mon_csymbol')+' ')
                } else {
                   return value
                }
            },*/
      renderer: function (value, metaData, record) {
        if (this.recordOrganizacion) {
          var tax = value ? parseFloat(value) : 0;
          var taxAmount = (tax / 100) * record.get("cbi_yimporte") * record.get("cbi_icantidad");
          return Ext.util.Format.currency(
            taxAmount,
            this.recordOrganizacion.get("mon_csymbol") + " ",
          );
        }

        return value;
      },
      width: 100,
      sortable: true,
    },
    {
      xtype: "numbercolumn",
      header: "Total",
      dataIndex: "_total",
      renderer: function (value, metadata, record) {
        var price = record.get("cbi_yimporte");
        var cant = record.get("cbi_icantidad");
        var subtotal = price * cant;

        if (this.recordOrganizacion) {
          var tax = record.get("imp_nporcentaje")
            ? parseFloat(record.get("imp_nporcentaje"))
            : 0;
          var total = subtotal * (1 + tax / 100);

          return Ext.util.Format.currency(
            total,
            this.recordOrganizacion.get("mon_csymbol") + " ",
          );
        }

        return "";
      },
      width: 100,
      sortable: false,
      summaryType: "sum",
      /*summaryRenderer: function(value,obj,record){
                var view = this.view.panel;
                var record = view.record;
                if(record.get('Id') != 0) {
                    var current = record.get('TotalPrice');
                    var vat = this.summaryData[this.grid.down('[dataIndex = _cbi_ndescuento]').id];
                    if (value != current){
                        record.set('TotalPrice', value);
                        record.set('cbi_ndescuento', vat);
                        if (record.get('ForecastDate') == null){
                            record.set('ForecastDate',new Date(-62135586000000));
                        };
                        record.save();
                    }
                }
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('mon_csymbol')+' ')
                } else {
                   return ''
                }
            }*/
    },
  ],

  initComponent: function () {
    this.callParent(arguments);

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-add",
          text: "Agregar producto o servicio",
          scope: this,
          action: "add",
        },
        {
          iconCls: "icon-table-add",
          text: "Agregar item manual",
          scope: this,
          action: "addManual",
        },
      ], // cierro items
    });

    this.addDocked(toolbar);
  },
});
