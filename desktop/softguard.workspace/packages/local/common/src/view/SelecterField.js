//MIGRADO2024
Ext.define('Common.view.SelecterField', {
  // Debug instructions: use this.log(...) calls sprinkled through the component when diagnosing selection issues.

  statics: {
    LOG_NS: '[SelecterField]'
  },
  log: function() {
    if (console && console.debug) {
      console.debug.apply(console, [this.self.LOG_NS].concat(Array.prototype.slice.call(arguments)));
    }
  },
  statics: {
    LOG_NS: '[SelecterField]'
  },
  extend: 'Ext.form.FieldSet',
  alias: 'widget.selecterfield',
  ignoreDirty: true,
  autoHeight: true,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  padding: '5',
  width: '100%',

  setDisabledNew: function (state) {
    if (state) {
      this.disableNew = true
    } else {
      this.disableNew = false
    }
  },

  setDisabled: function (state) {
    this.down('#deleteEvent').hide() //setDisabled(state)
    this.down('#evento').hide() //setDisabled(state)
    this.disabled = state
  },

  getValue: function () {
    return this.down('#codevento').getValue()
  },
  getRawValue: function () {
    return this.down('#codevento').getRawValue()
  },
  setValue: function (values) {
    var userModel = Ext.ClassManager.get('Common.model.selecterModel');

    var modelGrid = userModel
    //console.log(this)
    var view = this

    this.log('setValue: start', values);

    this.values = values.toString().trim()
    var gridStore = view.down('#gridname').getStore()
    gridStore.removeAll()

    if (this.values == '') {
      view.down('#deleteEvent').hide()
      // view.down('#nombreevento').setValue('')
      view.down('#codevento').setValue('')
      return false
    }
    var values = values.toString().split(',')

    if (values.length > 0) {
      if (!view.config.valueFieldFilter) {
        view.config.valueFieldFilter = ''
      }

      if (view.config.autoLoadSelected === false) {
        this.log('setValue: skip remote load', values);
        if (view.disabled !== true) {
          view.down('#deleteEvent').show();
        }
        var displayRows = [];
        if (Ext.isFunction(view.config.buildSelectedDisplay)) {
          displayRows = Ext.Array.from(view.config.buildSelectedDisplay(values, view));
        } else {
          displayRows = Ext.Array.from(values);
        }
        Ext.Array.each(displayRows, function(row) {
          var displayName = row;
          if (row && row.name) {
            displayName = row.name;
          } else if (row && row.text) {
            displayName = row.text;
          }
          if (Ext.isEmpty(displayName)) {
            return;
          }
          gridStore.add(modelGrid.create({ name: displayName }));
        });
        view.fireEvent('change', view, values);
        this.log('setValue: populated without fetch', displayRows);
      } else {
        var filterField = view.config.filterValueField || view.config.valueField;
        if (view.config.prefijoParaFiltro) {
          filterField = view.config.prefijoParaFiltro + '.' + filterField;
        }
        var Store = Ext.create('Ext.data.Store', {
          model: view.config.modelItems,
          pageSize: 1000,
          remoteSort: false,
          remoteFilter: true,
          filters: [
            {
              property: filterField + (view.config.valueFieldFilter || ''),
              value: values.join(',')
            }
          ],
          remoteFilter: true
        });

        var logFn = Ext.isFunction(view.log) ? Ext.Function.bind(view.log, view) : Ext.emptyFn;
        logFn('setValue: loading remote selection', { filterField: filterField, values: values });
        Store.load({
          callback: function (records) {
            logFn('setValue: load callback', records ? records.length : 0);
            if (records && records.length > 0) {
              if (view.disabled != true) {
                view.down('#deleteEvent').show();
              }
              records.map(function (rec) {
                gridStore.add(
                  modelGrid.create({
                    name: rec.get(view.config.selecionado.field)
                  })
                );
              });
              view.fireEvent('change', view, records);
            }
          }
        });
      }
    } else if (values.length > 1) {
      view.down('#nombreevento').setValue(values.join(','))
      if (view.disabled != true) {
        view.down('#deleteEvent').show()
      }
    } else {
      view.down('#deleteEvent').hide()
    }

    this.down('#codevento').setValue(values.join(','))
  },
  items: [
    {
      xtype: 'button',
      itemId: 'evento',
      text: 'Seleccione',
      margin: '0 10 0 0',
      height: 30
    },
    {
      xtype: 'button',
      itemId: 'deleteEvent',
      iconCls: 'icon-cancel',
      margin: '0 5 0 0',
      hidden: true,
      height: 30
    } /*,{
            xtype:'displayfield',
            itemId:'nombreevento',
            cls: 'text-wrapper'
        }*/,
    {
      xtype: 'grid',
      itemId: 'gridname',
      header: false,
      hideHeaders: true,
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          flex: 1
        }
      ],
      maxHeight: 200,
      autoScroll: true,
      flex: 1
    },
    {
      xtype: 'displayfield',
      itemId: 'codevento',
      hidden: true
    }
  ],
  initComponent: function () {
    this.callParent(arguments)
    //this.addEvents('selectedEvents', 'change','changeRecord');

    if (this.title != '') {
      this.setTitle(this.title)
    }
    var store = Ext.create('Ext.data.Store', {
      model: 'Common.model.selecterModel',
      pageSize: 99999
    })

    this.down('#gridname').bindStore(store)
  } // cierro init
})
