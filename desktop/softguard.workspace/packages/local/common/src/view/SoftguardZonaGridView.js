//MIGRADO2024
Ext.define('Common.view.SoftguardZonaGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: 'widget.gridzone',
    ignoreDirty: true,
    title: 'Zonas',
    selType: 'checkboxmodel',
    multiSelect: true,
    itemId: 'gridzone',
    autoHeight: true,
    forceClose: false,
    stateId: 'gridzoneview',
    stateful: false,
    nuevaZonaString: 'Nueva zona',
    editorName: 'zonaformview',
    editorHeight: 500,
    columns: [/*{
        xtype: 'actioncolumn',
        width: 30,
        items: [{
            iconCls: 'icon-zonasEdit',
            tooltip: getLocale('Modificar datos'),
            hidden: true,
            handler: function (grid, rowIndex, colIndex, item, event) {
                var view = grid.up('gridzone');
                var rec = grid.getStore().getAt(rowIndex);
                view.fireEvent('objectedit', rec, view);
            }
        }]
    },*/
    {
        xtype: 'actioncolumn',
        header: 'Foto',
        
        width: 50,
        renderer: function (value, metadata, record) {
            if (record.get('zon_cimagen'))
                return '<img src="/gallery/' + record.get('zon_cimagen') + '" width="32" heigth="32" style="float:right" >';
        },
        itemId: 'foto',
        iconCls: 'icon-photo',  // Use a URL in the icon config
        tooltip: 'Ver imagen',
        handler: function (grid, rowIndex, colIndex) {
            var view = grid.up('gridzone');
            var rec = grid.getStore().getAt(rowIndex);
            view.fireEvent('viewimage', rec, view);
            /* var view = this.up('gridzone')
             var rec = grid.getStore().getAt(rowIndex),
                 photo = rec.get('zon_cimagen'),
                 zona = rec.get('zon_cdescripcion'),

                 model = Ext.create('Common.model.SoftguardZonaModel');


             model.load(rec.get('Id'),{
                 callback: function(record,operation){
                     if(operation.success){
                         Ext.create('Ext.Window', {
                             title: 'Foto: ',
                             height: 252+32,
                             width: 360+10,
                             record: record,
                             itemId:'fotoImageWindow',
                             closeAction: 'destroy',
                             border: false,
                             layout: 'fit',
                             modal: true,
                             items: [{
                                 xtype:'photopanel',
                                 field: 'zon_cimagen',
                                 record: rec,
                                 profile: view.profile
                             }]
                         }).show();
                     }
                 }
             });     */

        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'orderCodigo',//orderCodigo
        header: 'Código',

        renderer: function (v, m, r) {
            return r.get('zon_ccodigo');
        },
        sortable: true,
        width: 50
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_cdescripcion',
        header: 'Descripción',
        sortable: true,
        width: 180
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_codigoalarma',
        header: 'Código alarma',
        sortable: true,
        renderer: function (value) {
            var store = Ext.data.StoreManager.lookup('TablaCodigosAlarmasStore');
            var record = store.findRecord('Codigo', value);
            if (record == undefined)
                return '';
            else
                return record.data.Descripcion;
        },
        width: 180
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_cAlarmaAGenerar',
        header: 'Alarma a generar',
        itemId: 'zon_cAlarmaAGenerar',
        sortable: true,
        renderer: function (value) {
            var store = Ext.data.StoreManager.lookup('TablaCodigosAlarmasStore');
            var record = store.findRecord('Codigo', value);
            if (record == undefined)
                return '';
            else
                return record.data.Descripcion;
        },
        width: 180
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_clistaemergencia',
        itemId: 'zon_clistaemergencia',
        header: 'Lista emergencia',
        sortable: true,
        renderer: function (value) {

            var store = Ext.data.StoreManager.lookup('TablaListasEmergencia');
         var record = store.findRecord('Codigo', value);
            if (record == undefined)
                return '';
            else
                return record.data.Descripcion;
        },
        width: 130
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_ccodigorestauracion',
        itemId: 'zon_ccodigorestauracion',
        header: 'Código restauracion',
        sortable: true,
        renderer: function (value) {
            var store = Ext.data.StoreManager.get('TablaCodigosAlarmasStore');
            var record = store.findRecord('Codigo', value);
            if (record == undefined)
                return '';
            else
                return record.data.Descripcion;
        },
        width: 180
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_nminutosrestauracion',
        itemId: 'zon_nminutosrestauracion',
        header: 'Minutos restauración',
        sortable: true,
        editor: {
            xtype: 'numberfield'
        },
        width: 110
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_mobservacion',
        header: 'Observación',
        sortable: true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_nautoprocesa',
        itemId: 'zon_nautoprocesa',
        header: 'Autoprocesa',
        sortable: true,
        renderer: function (value) {
            var store = Ext.data.StoreManager.get('SiNoStore');
            var record = store.findRecord('Value', value);
            if (record == undefined)
                return '';
            else
                return record.get('Name');
        },
        width: 50
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'zon_nmostrar',
        itemId: 'zon_nmostrar',
        header: 'Mostrar',
        hidden: true,
        sortable: true,
        renderer: function (value) {
            var store = Ext.data.StoreManager.get('SiNoStore');
            var record = store.findRecord('Value', value);
            if (record == undefined)
                return '';
            else
                return record.get('Name');
        },
        width: 50
    }
    ],
    initComponent: function () {
        this.callParent(arguments);
        this.onSelectChange = function (selModel, selections) {
            var button = this.down('button[action=delete]');
            if (button)
                button.setDisabled(selections.length === 0);
        };
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                /*{
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                },
                {xtype: 'tbseparator'},*/
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete'
                }, "-", {
                    xtype: 'combo',
                    fieldLabel: 'Plantillas',

                    displayField: '_Descripcion',
                    valueField: 'Id',
                    anchor: '100%',
                    itemId: 'zonaplantillacombo',
                    name: 'plantilla',
                    queryMode: 'local',
                    labelWidth: 50
                }, {
                    iconCls: 'icon-add',
                    text: 'Insertar plantilla',
                    action: 'saveplantilla'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar platilla',
                    action: 'deleteplantilla',
                    itemId: 'deleteplantilla'
                }, "-", {
                    xtype: 'textfield',
                    fieldLabel: 'Nueva plantilla',
                    itemId: 'nombreplantilla'
                }, {
                    xtype: 'button',
                    iconCls: 'icon-add',
                    text: 'Guardar platilla',
                    action: 'createplantilla'
                }]
        });

        this.addDocked(toolbar);

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

    } // cierro init
});