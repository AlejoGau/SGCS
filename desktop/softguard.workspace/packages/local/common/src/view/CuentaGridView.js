//MIGRADO2024
Ext.define('Common.view.CuentaGridView', {
  extend: 'Ext.grid.GridPanel',
  alias: 'widget.cuentagridview',
  title: 'Cuentas',
  autoHeight: true,
  itemId: 'cuentagridview',

  //selModel: Ext.create('Ext.selection.CheckboxModel'),
  columns: [
    {
      xtype: 'actioncolumn',
      header: 'Acciones',
      width: 130,
      iconToolTips: [
        {tip: 'Editar cuenta'},
        {tip: 'Copiar cuenta'},
        {tip: 'Modificar situación'},
        {tip: 'Eventos'},
        {tip: 'Ver particiones'},
        {tip: 'Seguimiento'}
      ],      
      items: [
        {
          iconCls: 'icon-cuentaEdit',
          //tooltip: getLocale('Modificar Cuenta'),
          getTip: function(value, metadata, record, a, b, c, grid) {
            return metadata.column.config.iconToolTips[0];
          },
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('cuentagridview')
            var rec = grid.getStore().getAt(rowIndex)
            view.fireEvent('objectedit', rec, view)
          },
          getClass: function (value, metadata, record, a, b, c, grid) {
            var view = grid.up('cuentagridview')
            if (view.cambioSituacionShow) {
              return 'x-hide-display'
            } else {
              return 'icon-cuentaEdit'
            }
          }
        },
        {

          iconCls: 'icon-cuentaAdd',
          //tooltip: getLocale('Copiar Cuenta'),
          getTip: function(value, metadata, record, a, b, c, grid) {
            return metadata.column.config.iconToolTips[1];
          },
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('cuentagridview')
            if (!view.cuentasDisponibles) {
              notify('Supero la cantidad de cuentas disponibles.')
              return false
            }
            if (!view.copiHide && view.cuentasDisponibles) {
              var record = grid.getStore().getAt(rowIndex)
              var cuenta =
                record.get('cue_clinea') +
                '-' +
                record.get('cue_ncuenta') +
                ' ' +
                record.get('cue_cnombre')
              Ext.create('Ext.Window', {
                title: getLocale('Copiar cuenta') + ': ' + cuenta,
                height: 600,
                width: 400,
                closeAction: 'hide',
                border: false,
                layout: 'fit',
                modal: true,
                items: [
                  {
                    xtype: 'cuentacopyview',
                    record: record,
                    caller: view,
                    itemDbClickView: view.itemDbClickView
                  }
                ]
              }).show()
            } else {
              notify('No tiene el permiso necesario.')
            }
          },
          getClass: function (value, metadata, record, a, b, c, grid) {
            var view = grid.up('cuentagridview')
            if (view.cambioSituacionShow) {
              return 'x-hide-display'
            } else {
              return 'icon-cuentaAdd'
            }
          }
        },
        {
          iconCls: 'icon-clock-red',
          //tooltip: getLocale('Modificar situación'),
          getTip: function(value, metadata, record, a, b, c, grid) {
            return metadata.column.config.iconToolTips[2];
          },
          handler: function (grid, rowIndex, colIndex) {
            var caller = grid.up('cuentagridview')
            var modules
            var situacion
            var record = grid.getStore().getAt(rowIndex)
            // me fijo si es _SG-INTE BC 402488591
            if (
              record.get('cue_clinea') == '_SG' &&
              record.get('cue_ncuenta') == 'INTE'
            ) {
              notifyError('No es posible modificar la cuenta')
              return false
            }
            // busco el modulo de situacion
            if (!caller.isAdmin) {
              modules = caller.security.modules
              situacion = Ext.Array.filter(modules, function (module) {
                if (module.view == 'estadoview') return true
                else return false
              })[0]
            }
            if (caller.isAdmin || situacion.profile >= '2') {
              var cuenta =
                  record.get('cue_clinea') +
                  '-' +
                  record.get('cue_ncuenta') +
                  ' ' +
                  record.get('cue_cnombre'),
                view = Ext.widget('estadoview', {
                  cuenta: record,
                  caller: caller,
                  module: { profile: 3 }
                })
              Ext.create('Ext.Window', {
                title: getLocale('Modificar situación') + ': ' + cuenta,
                height: 450,
                width: 750,
                closeAction: 'destroy',
                border: false,
                layout: 'fit',
                caller: caller,
                translate: false,
                modal: true,
                items: [view]
              }).show()
            } else {
              notifyError('No posee derechos para esta operación')
            }
          }
        },
        {
          iconCls: 'icon-reportes',
          //tooltip: getLocale('Eventos'),
          getTip: function(value, metadata, record, a, b, c, grid) {
            return metadata.column.config.iconToolTips[3];
          },
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('cuentagridview')
            var rec = grid.getStore().getAt(rowIndex)
            view.fireEvent('mostrarEventos', rec, view)
          },
          getClass: function (value, metadata, record, a, b, c, grid) {
            var view = grid.up('cuentagridview')
            if (view.cambioSituacionShow) {
              return 'x-hide-display'
            } else {
              return 'icon-reportes'
            }
          }
        },
        {
          iconCls: 'icon-application-cascade',
          //tooltip: getLocale('Ver particiones'),
          getTip: function(value, metadata, record, a, b, c, grid) {
            return metadata.column.config.iconToolTips[4];
            },
          itemId: 'iconparticiones',
          getClass: function (value, metadata, record, a, b, c, grid) {
            var view = grid.up('cuentagridview')
            if (view.partitionHide || view.cambioSituacionShow) {
              return 'x-hide-display'
            } else {
              return 'icon-application-cascade'
            }
          },
          handler: function (grid, rowIndex, colIndex) {
            var view = grid.up('cuentagridview')
            var record = grid.getStore().getAt(rowIndex),
              cuenta =
                record.get('cue_clinea') +
                '-' +
                record.get('cue_ncuenta') +
                ' ' +
                record.get('cue_cnombre'),
              view = Ext.widget('particioneschooserview', {
                record: record,
                targetTab: view.up('#center'),
                hideEdit: true,
                ultimaAlarma: true
              })
            Ext.create('Ext.Window', {
              title: getLocale('Particiones') + ': ' + cuenta,
              height: 250,
              width: 750,
              closeAction: 'hide',
              border: false,
              layout: 'fit',
              modal: true,
              items: [view]
            }).show()
          }
        },
        {
          iconCls: 'icon-map',
          //tooltip: getLocale('Seguimiento'),
          getTip: function(value, metadata, record, a, b, c, grid) {
            return metadata.column.config.iconToolTips[5];
          },
          handler: function (grid, rowIndex, colIndex, item, event) {
            var view = grid.up('cuentagridview')
            var record = grid.getStore().getAt(rowIndex)
            var tabpanel = view.up('tabpanel')
            var newTab = tabpanel.add({
              xtype: 'tecguardseguimientomapview',
              record: record,
              closable: true,
              closeAction: 'destroy',
              title:
                record.get('cue_clinea') +
                '-' +
                record.get('cue_ncuenta') +
                ' ' +
                record.get('cue_cnombre'),
              translate: false
            })
            tabpanel.setActiveTab(newTab)
          },
          getClass: function (value, metadata, record, a, b, c, grid) {
            var view = grid.up('cuentagridview')
            // me fijo si es tecguard y si tiene posicion
            var tip_ntipo = record.get('tip_nTipo')
            var icon = 'x-hide-display'
            if (
              tip_ntipo == 11 &&
              record.get('gps_tfechahora') &&
              record.get('gps_tfechahora').getFullYear() > 1980
            ) {
              icon = 'icon-map'
            }
            return icon
          }
        }
      ],
      hideable: false
    },
    {
      xtype: 'gridcolumn',
      header: '',
      dataIndex: 'cue_nAutoMonitoreo',
      width: 26,
      renderer: function (value, metadata, record) {
        if (value == 1) {
          return (
            '<img data-qtip="' +
            getLocale('Automonitoreo') +
            '" src="/resources/global/images/icons/monitor_lightning.png" width=16 height=16>'
          )
        }
        return ''
      }
      // hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: '',
      dataIndex: 'nvs_nNivel',
      align: 'center',
      width: 26,
      renderer: function (value, metadata, record, colIndex, store, view) {
        /* datos pasados por Pablo 
                Do Case 
                Case Between(iNivel,1,8) 
                oic = '\SoftGuard\Graphics\okDataSignal14Diag.jpg'
                Case Between(iNivel,9,16) 
                oic = '\SoftGuard\Graphics\okDataSignal12Diag.jpg'
                Case Between(iNivel,17,24) 
                oic = '\SoftGuard\Graphics\okDataSignal34Diag.jpg'
                Case Between(iNivel,25,32) 
                oic = '\SoftGuard\Graphics\okDataSignalFullDiag.jpg'
                Otherwise
                oic = '\SoftGuard\Graphics\okData.gif'
                EndCase
                */
        metadata.tdAttr =
          'data-qtip="' +
          Ext.String.htmlEncode(
            '<i>' + getLocale('Señal') + ': ' + value + '</i>'
          ) +
          '"'
        if (value > 0 && value <= 8) {
          return '<img src="/resources/softguard/images/signal/1.png" />'
        } else if (value >= 9 && value <= 16) {
          return '<img src="/resources/softguard/images/signal/2.png" />'
        } else if (value >= 17 && value <= 24) {
          return '<img src="/resources/softguard/images/signal/3.png" />'
        } else if (value >= 25) {
          return '<img src="/resources/softguard/images/signal/4.png" />'
        } else {
          return ''
        }
      }
    },
    {
      xtype: 'gridcolumn',
      header: getParametro('LABELCAMPOCUSTOM'),
      sortable: true,
      dataIndex: 'cue_cCustom',
      width: 100,
      hidden: true
    },
    {
      xtype: 'gridcolumn',
      header: 'Cuenta',
      sortable: true,
      dataIndex: 'dealer-cuenta',
      renderer: function (value, object, record) {
        return record.get('cue_clinea') + '-' + record.get('cue_ncuenta');
      },
      width: 100
      //  hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: 'Nombre',
      dataIndex: 'cue_cnombre',
      sortable: true,
      width: 250
      //  hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: 'Situacion',
      dataIndex: 'Situacion',
      renderer: function (value, metadata, record, colIndex, store, view) {
        var s = record.get('Situacion')
        var rclass = 'habilitado'
        switch (Ext.String.trim(s)) {
          case 'No Habilitado':
            rclass = 'nohabilitado'
            break
          case 'Prueba':
            rclass = 'prueba'
            break
          case 'Prueba x Zonas':
            rclass = 'pruebazonas'
            break
          case 'Eliminar':
            rclass = 'eliminar'
            break
        }
        metadata.tdCls = rclass
        return getLocale(value)
      },
      sortable: true,
      width: 100
      //hideable:false
    },
    {
      xtype: 'gridcolumn',
      hidden: false,
      header: 'Estado',
      dataIndex: 'ms.sta_nestado',
      renderer: function (value, metadata, record, colIndex, store, view) {
        var texto = ''
        var color = ''
        if (record.get('act_nestado') == 1) {
          texto = 'Desactivado / Abierto'
          color = '#00FF00'
        } else if (record.get('act_nestado') == 0) {
          texto = 'Activado / Cerrado'
          color = '#FF0000'
        }
        //metadata.style = 'color: ' + color;
        return getLocale(texto)
      },
      sortable: true,
      width: 140
      // hideable:false
    },
    {
      xtype: 'gridcolumn',
      hidden: true,
      header: 'Imei',
      dataIndex: 'cue_cIMEI',
      sortable: true,
      width: 140
      //hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: 'Ult. alarma',
      dataIndex: 'sta_cultimaalarma',
      sortable: true,
      hidden: true,
      // hideable:false,
      renderer: function (value, metadata, record, colIndex, store, view) {
        var texto = ''
        if (
          record.get('Situacion') != 'No Habilitado' &&
          record.get('sta_cultimaalarma') &&
          record.get('sta_cultimaalarma').trim() != ''
        ) {
          texto =
            record.get('sta_cultimaalarma') +
            ' - ' +
            record.get('cod_cdescripcion')
          var txtColor = this.decimalColorToHTMLcolor(
            record.get('cod_nColorLetra')
          )
          var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'))
          metadata.style =
            'color:' + txtColor + '; background-color:' + backColor
        }
        return texto
      }
    },
    {
      xtype: 'datecolumn',
      hidden: false,
      header: 'Fecha ult. alarma',
      dataIndex: 'sta_dfechautimaalarma',
      format: 'd/m/Y H:i:s',
      sortable: true,
      width: 120
      // hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: 'Ult. alarma recibida',
      dataIndex: 'cue_cUltimaAlarmaRecibida',
      sortable: true,
      hidden: true,
      // hideable:false,
      renderer: function (value, metadata, record, colIndex, store, view) {
        var texto = ''
        if (
          record.get('Situacion') != 'No Habilitado' &&
          record.get('cue_cUltimaAlarmaRecibida') &&
          record.get('cue_cUltimaAlarmaRecibida').trim() != ''
        ) {
          texto =
            record.get('cue_cUltimaAlarmaRecibida') +
            ' - ' +
            record.get('cod_cdescripcionUAR')
          var txtColor = this.decimalColorToHTMLcolor(
            record.get('cod_nColorLetraUAR')
          )
          var backColor = this.decimalColorToHTMLcolor(
            record.get('cod_ncolorUAR')
          )
          metadata.style =
            'color:' + txtColor + '; background-color:' + backColor
        }
        return texto
      }
    },
    {
      xtype: 'datecolumn',
      header: 'Fecha utl. alarma recibida',
      dataIndex: 'cue_dFechaUltimaAlarmaRecibida',
      hidden: true,
      //  hideable:false,
      sortable: true,
      format: 'd/m/Y H:i:s'
    },
    {
      xtype: 'datecolumn',
      hidden: false,
      header: 'Última posición',
      dataIndex: 'gps_tfechahora',
      format: 'd/m/Y H:i:s',
      sortable: true,
      width: 120
      //  hideable:false
    },
    {
      xtype: 'datecolumn',
      hidden: false,
      header: 'Último Test',
      format: 'd/m/Y H:i:s',
      dataIndex: 'sta_dfechaultimotst',
      sortable: true,
      width: 120
      // hideable:false
    },
    {
      xtype: 'gridcolumn',
      hidden: true,
      header: 'Provincia/Estado',
      dataIndex: 'pro_cdescripcion', //dataIndex: 'cue_provincia',
      renderer: function (value, metadata, record) {
        return record.get('cue_provincia')
      },
      sortable: true,
      width: 120
      //  hideable:false
    },
    {
      xtype: 'gridcolumn',
      hidden: false,
      header: 'Localidad',
      dataIndex: 'cue_clocalidad',
      sortable: true,
      width: 150
      //  hideable:false
    },
    {
      xtype: 'gridcolumn',
      hidden: false,
      header: 'Calle',
      dataIndex: 'cue_ccalle',
      sortable: true,
      width: 250
      // hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: 'Telefono',
      dataIndex: 'cue_ctelefono',
      sortable: true,
      hidden: true,
      width: 100
      // hideable:false
    },
    {
      xtype: 'gridcolumn',
      header: 'Fallo 1era',
      dataIndex: 'sta_ncuentaenfallodetst',
      sortable: false,
      hidden: true,
      width: 100,
      // hideable:false,
      renderer: function (value, metadata, record, colIndex, store, view) {
        if (record.get('sta_ncuentaenfallodetst') == 1) {
          return getLocale('Fallo 1era')
        }
      }
    },
    {
      xtype: 'gridcolumn',
      header: 'Fallo 2da',
      dataIndex: 'sta_ncuentaenfallo2dotst',
      sortable: false,
      hidden: true,
      width: 100,
      // hideable:false,
      renderer: function (value, metadata, record, colIndex, store, view) {
        if (record.get('sta_ncuentaenfallo2dotst') == 1) {
          return getLocale('Fallo 2da')
        }
      }
    },
    {
      xtype: 'gridcolumn',
      header: 'Fallo 3era',
      dataIndex: 'sta_ncuentaenfallo3ertst',
      sortable: false,
      hidden: true,
      width: 100,
      //  hideable:false,
      renderer: function (value, metadata, record, colIndex, store, view) {
        if (record.get('sta_ncuentaenfallo3ertst') == 1) {
          return getLocale('Fallo 3era')
        }
      }
    },
    {
      xtype: 'gridcolumn',
      header: 'Cuenta principal',
      dataIndex: 'madre_cnombre',
      sortable: false,
      hidden: true,
      flex: 1,
      //  hideable:false,
      renderer: function (value, metadata, record, colIndex, store, view) {
        return (
          record.get('madre_clinea') +
          '-' +
          record.get('madre_ncuenta') +
          ' ' +
          record.get('madre_cnombre')
        )
      }
    },
    /**
     * BC 389356119
     */
    {
      xtype: 'gridcolumn',
      header: 'Cuenta tipo',
      dataIndex: 'tip_cdescripcion',
      sortable: false,
      hidden: true,
      flex: 1
    },
    {
      xtype: 'gridcolumn',
      header: 'Acceso AWCC',
      dataIndex: 'cue_nllaveul',
      sortable: false,
      hidden: true,
      flex: 1,
      renderer: function (value, metadata, record, colIndex, store, view) {
        if (record.get('cue_nllaveul') == 1) {
          texto = 'Si'
        } else if (record.get('cue_nllaveul') == 2) {
          texto = 'No'
        }
        return getLocale(texto)
      }
    }
  ],
  initComponent: function () {
    this.callParent(arguments)
    Ext.Ajax.request({
      url: '/Rest/t_parametros/',
      params:
        'filter=[{"property":"par_ccodigo:IN","value":"LABELCAMPOCUSTOM"}]',
      method: 'GET',
      scope: this,
      success: function (response) {
        var configs = Ext.JSON.decode(response.responseText)
        if (configs) {
          //this.down('#queryType').getStore().add({field1:'cue_cCustom',field2:configs.rows[0].par_cvalor})
          this.down('#campocustom').emptyText = configs.rows[0].par_cvalor
          //this.down('#campocustom').applyEmptyText();
          this.down('#campocustom').show()
        }
      }
    })
    // agrego la toolbar
    var toolbar = Ext.create('Ext.toolbar.Toolbar', {
      items: [
        {
          iconCls: 'icon-cuentaAdd',
          text: 'Nueva Cuenta',
          itemId: 'cuentaCreate',
          action: 'crearCuenta',
          disabled: true
        },
        '-',
        {
          text: 'Filtros',
          itemId: 'filtro',
          menu: {
            xtype: 'menu',
            width: 280,
            hideOnClick: false,

            items: [
              {
                xtype: 'form',
                bodyPadding: 5,
                //defaultButton: 'cuentagridview #search',
                listeners: {
                    afterrender: function(formPanel) {
                      formPanel.getEl().on('keydown', function(e) {
                        var cuentaGridController = formPanel.lookupController();
                        if (e.getKey() === e.TAB) {
                          // Detiene la propagación del evento hacia el componente Menú superior
                          e.stopPropagation();
                        }
                        if (e.getKey() === e.ENTER) {
                            var searchButton = formPanel.down('#search');
                            if (searchButton) {
                              searchButton.fireEvent('click', searchButton);
                            }
                            
                        }
                      }, null, { priority: 1000 }); // Prioridad máxima para ganarle al menú
                    }
                  },                
                items: [
                  {
                    xtype: 'fieldset',
                    padding: '0 0 0 0',
                    border: 0,
                    layout: 'hbox',
                    width: 270,
                    margin: '0 0 5 0',
                    items: [
                      {
                        xtype: 'textfield',
                        itemId: 'dealer',
                        enforceMaxLength: true,
                        maxLength: 3,
                        emptyText: getLocale('Dealer'),
                        width: 110
                      },
                      {
                        xtype: 'textfield',
                        itemId: 'cuenta',
                        enforceMaxLength: true,
                        maxLength: 4,
                        emptyText: getLocale('Cuenta'),
                        width: 147,
                        margin: '0 0 0 5'
                      }
                    ]
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'nombre',
                    emptyText: getLocale('Nombre cuenta'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'calle',
                    emptyText: getLocale('Calle'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'email',
                    emptyText: getLocale('Email'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'emailnotificaciones',
                    emptyText: getLocale('Email notificaciones'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'permiso',
                    emptyText: getLocale('Permiso'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'telefono',
                    emptyText: getLocale('Teléfono'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'clave',
                    emptyText: getLocale('Clave'),
                    width: 260
                  },
                  {
                    xtype: 'combo',
                    itemId: 'equipogprs',
                    displayField: 'pan_cdescripcion',
                    valueField: 'pan_ccodigo',
                    emptyText: getLocale('Equipo GPRS'),
                    name: 'pan_cgprs',
                    queryMode: 'local',
                    flex: 1
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'imei',
                    emptyText: getLocale('IMEI'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'campocustom',
                    emptyText: getLocale('Campo custom'),
                    width: 260
                  },
                  {
                    xtype: 'combo',
                    //fieldLabel : 'Provincia / Estado',
                    //store: 'ProvinciasStore',
                    name: 'cue_cprovincia',
                    displayField: 'pro_cdescripcion',
                    itemId: 'comboProvincia',
                    valueField: 'pro_ccodigo',
                    queryMode: 'local',
                    /**
                     * Daniel O. Medina
                     * https://basecamp.com/2249105/projects/14758734/todos/352732490
                     * 24/11/2020
                     *
                     */
                    emptyText: getLocale('Provincia'),
                    width: 260
                    /*********************/
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'localidad',
                    emptyText: getLocale('Ciudad'),
                    width: 260
                  },
                  {
                    xtype: 'combo',
                    emptyText: getLocale('Tipo'),
                    displayField: 'tip_cdescripcion',
                    queryMode: 'local',
                    valueField: 'tip_idKey',
                    name: 'cue_ctipo',
                    itemId: 'tipo',
                    editable: false,
                    width: 260
                  },
                  {
                    xtype: 'combo',
                    displayField: 'Name',
                    store: 'SiNoStore',
                    valueField: 'Value',
                    itemId: 'comboefectiva',
                    emptyText: getLocale('Efectiva'),
                    width: 260
                  },
                  {
                    xtype: 'combo',
                    emptyText: getLocale('Paneles'),
                    displayField: 'pan_cdescripcion',
                    queryMode: 'local',
                    valueField: 'pan_ccodigo',
                    itemId: 'panel',
                    editable: false,
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'pan_cnrosim',
                    emptyText: getLocale('Sim'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'pan_ccompania',
                    emptyText: getLocale('Empresa tel.'),
                    width: 260
                  },
                  {
                    xtype: 'textfield',
                    itemId: 'cue_cIdExtendido',
                    emptyText: getLocale('Id ext.'),
                    width: 260
                  },
                  {
                    xtype: 'combo',
                    emptyText: getLocale('Tipo de servicio'),
                    displayField: 'cts_cnombre',
                    valueField: 'Id',
                    queryMode: 'local',
                    itemId: 'comboTiposServicio',
                    width: 260
                  },
                  {
                    xtype: 'panel',
                    layout: 'column',
                    items: [
                      {
                        xtype: 'button',
                        columnWidth: 0.45,
                        iconCls: '',
                        text: 'Limpiar',
                        action: 'limpiarText',
                        itemId: 'limpiar',
                        hideOnClick: false 
                      },
                      {
                        text: '|',
                        columnWidth: 0.1
                      },
                      {
                        xtype: 'button',
                        columnWidth: 0.45,
                        iconCls: '',
                        text: 'Buscar',
                        action: 'filterText',
                        itemId: 'search'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          iconCls: 'icon-text-columns ',
          text: 'Filiación',
          action: 'filiacion',
          itemId: 'filiacion',
          toggleGroup: 'info',
          enableToggle: true,
          pressed: true
        },
        '-',
        {
          iconCls: 'icon-cuenta_filter_fallotest ',
          text: 'Fallo TST',
          action: 'filterFalloTest',
          toggleGroup: 'filter',
          enableToggle: true,
          itemId: 'fallotst'
        },
        {
          iconCls: 'icon-cuenta_filter_fallotest ',
          text: 'Fallo AC',
          action: 'filterFalloAC',
          toggleGroup: 'filter',
          enableToggle: true,
          itemId: 'falloac'
        },
        {
          iconCls: 'icon-cuenta_filter_nohabilitadas ',
          text: 'No Habilitadas',
          action: 'filterNoHabilitadas',
          itemId: 'filterNoHabilitadas',
          toggleGroup: 'filter',
          enableToggle: true
        },
        {
          iconCls: 'icon-cuenta_filter_habilitadas',
          text: 'Habilitadas',
          action: 'filterHabilitadas',
          itemId: 'filterHabilitadas',
          toggleGroup: 'filter',
          enableToggle: true
        },
        {
          iconCls: 'icon-cuenta_filter_enprueba',
          text: 'En Prueba',
          itemId: 'filterEnprueba',
          action: 'filterEnprueba',
          toggleGroup: 'filter',
          enableToggle: true
        },
        {
          iconCls: 'icon-cuenta_filter_eliminar',
          text: 'Eliminar',
          action: 'filterEliminar',
          itemId: 'filterEliminar',
          toggleGroup: 'filter',
          enableToggle: true
        },
        {
          iconCls: 'icon-application-cascade',
          text: 'particiones',
          action: 'particiones',
          itemId: 'particiones',
          pressed: false,
          toggleGroup: 'filterparticion',
          enableToggle: true
        },
        {
          iconCls: 'icon-cuenta_filter_todas',
          text: 'Todas',
          action: 'removefilter',
          pressed: true,
          toggleGroup: 'filter',
          itemId: 'removefilter',
          enableToggle: false
        },
        '->',
        {
          xtype: 'button',
          text: 'Exportar',
          //itemId: 'btnExportar',
          action: 'export',
          iconCls: 'icon-page-excel'
        }
      ] // cierro items
    })
    var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
      dock: 'bottom',
      itemId: 'pagingtoolbar',
      displayInfo: true
    })
    this.addDocked(toolbar)
    this.addDocked(pagingtoolbar)
    /*
     *
     *  PERSONALIZO la vista según metadata
     *
     */
    var view = this
    if (UiApplicationMetadata.viewConfig) {
      var viewConfig = Ext.JSON.decode(UiApplicationMetadata.viewConfig)
      Ext.Array.each(viewConfig, function (item) {
        if (item.view == view.alias[0].split('.')[1]) {
          if (item.showColumns) {
            Ext.Array.each(item.showColumns, function (index) {
              var column = view.down('gridcolumn[dataIndex=' + index + ']')
              if (column) column.show()
            })
          }
        }
      })
    }
    this.decimalColorToHTMLcolor = function (number) {
      var intnumber = number - 0
      var red, green, blue
      var template = '#000000'
      red = (intnumber & 0x0000ff) << 16
      green = intnumber & 0x00ff00
      blue = (intnumber & 0xff0000) >>> 16
      intnumber = red | green | blue
      var HTMLcolor = intnumber.toString(16)
      HTMLcolor = template.substring(0, 7 - HTMLcolor.length) + HTMLcolor
      return HTMLcolor
    }
  } // cierro init
})
/*
                          
     /\                   
    /  \__      _____ ___ 
   / /\ \ \ /\ / / __/ __|
  / ____ \ V  V / (_| (__ 
 /_/    \_\_/\_/ \___\___|
                          
                          
*/
