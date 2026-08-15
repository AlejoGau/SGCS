Ext.define( 'AdministratorSearch.view.parametro_HIKVISIONP2Pview', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.parametro_HIKVISIONP2Pview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        { 
            xtype: 'box',
            html: getLocale('Región principal'),
            style: {fontWeight: 'Bold'},
            margin: '0 0 7 0'
        },
        {    
            xtype:'combobox', 
            name:'KeyDomain',
            itemId:'KeyDomain', 
            fieldLabel:'Región',
            store:'parametro_HIKVISIONP2DomainStore', 
            valueField: 'Id',
            displayField: 'Name',
            anchor: '100%',
            value:1
        },
        {
            xtype: 'textfield',
            itemId: 'KeyAppKey',
            name: 'KeyAppKey',
            anchor: '100%',
            fieldLabel: 'AppKey'
        }, {
            xtype: 'textfield',
            itemId: 'KeyAppSecret',
            name: 'KeyAppSecret',
            anchor: '100%',
            fieldLabel: 'AppSecret'
        }, {
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel: 'Valor',
            anchor: '100%',
            //id: 'plantillatrackguard',
            itemId: 'jsonvalues',
            alowBlank: false,
            hidden: true
        }, { 
            xtype: 'box',
            html: getLocale('Regiónes secundarias'),
            style: {fontWeight: 'Bold'},
            margin: '10 0 7 0'
        },
        {
            xtype: 'grid',
            height: 200,
            itemId: 'regions',
            store: 'parametro_HIKVISIONP2RegionStore',
            tbar: [
                {
                    text: 'Agregar',
                    iconCls: 'icon-table-add',
                    handler: function(btn){
                        var grid =  btn.up('grid');
                        var view = btn.up('parametro_HIKVISIONP2Pview');
                        // abro una ventana para agregar una nueva región
                        view.showRegionWindow(grid);
                    }
                }
            ],
            columns:[
                {
                    xtype:'actioncolumn',
                    width:50,
                    items: [{
                            iconCls: 'icon-delete',
                            tooltip: getLocale('Eliminar'),
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                Ext.MessageBox.confirm(getLocale('Delete'), getLocale('Esta seguro?'), function(btn){
                                    if(btn === 'yes'){
                                        var rec = grid.getStore().getAt(rowIndex);
                                        rec.destroy();
                                    }
                                });
                            }
                        },
                        {
                            iconCls: 'icon-table',
                            tooltip: getLocale('Modificar'),
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('parametro_HIKVISIONP2Pview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.showRegionWindow(grid,rec);
                            }
                        }
                    ]
                },
                {
                    xtype : 'gridcolumn',
                    header : 'Región',
                    dataIndex : 'KeyDomain',
                    renderer: function(v,metadata,record,store,view){
                        var store = Ext.getStore('parametro_HIKVISIONP2DomainStore');
                        var _v = store.findRecord('Id',v);
                        return _v.get('Name')
                    },
                    hidden: false,
                    sortable : false,
                    groupable : false
                },{
                    xtype : 'gridcolumn',
                    header : 'Dealers',
                    dataIndex : 'KeyDealers',
                    itemId: 'KeyDealers',
                    sortable : false,
                    groupable : false,
                    flex:1
                }
            ]
        }  
    ],

    showRegionWindow: function(grid, record){
        // abro una ventana para agregar una nueva región
        var view = grid.up('parametro_HIKVISIONP2Pview');
        var win = Ext.create( 'Ext.Window', {
            record: record,
            iconCls: 'icon-table-add',
            title: 'Nueva región',
            layout: 'anchor',
            width: 350,
            height : 300,
            border: false,
            tbar: [{
                text:'Guardar',
                handler: function(btn){
                    var KeyDomain = win.down('#KeyDomain').getValue();
                    var KeyAppKey = win.down('#KeyAppKey').getValue();
                    var KeyAppSecret = win.down('#KeyAppSecret').getValue();
                    var KeyDealers = win.down('#KeyDealers').getValue();

                    if (win.record){
                        record.set('KeyDomain',KeyDomain);
                        record.set('KeyAppKey',KeyAppKey);
                        record.set('KeyAppSecret',KeyAppSecret);
                        record.set('KeyDealers',KeyDealers);
                        view.saveValues();
                    }
                    else {
                        grid.getStore().add({KeyDomain:KeyDomain,KeyAppKey:KeyAppKey,KeyAppSecret:KeyAppSecret,KeyDealers:KeyDealers});
                    }
            
                    win.close();
                }
            }],
            items: [
                {    
                    xtype:'combobox', 
                    name:'KeyDomain',
                    itemId:'KeyDomain', 
                    fieldLabel:'Región',
                    store:'parametro_HIKVISIONP2DomainStore', 
                    forceSelection:true,
                    alowBlank: false,
                    valueField: 'Id',
                    displayField: 'Name',
                    anchor: '100%',
                    value:1,
                    margin: '5 0 5 0'
                },
                {
                    xtype: 'textfield',
                    itemId: 'KeyAppKey',
                    alowBlank: false,
                    name: 'KeyAppKey',
                    anchor: '100%',
                    fieldLabel: 'AppKey'
                }, {
                    xtype: 'textfield',
                    itemId: 'KeyAppSecret',
                    alowBlank: false,
                    name: 'KeyAppSecret',
                    anchor: '100%',
                    fieldLabel: 'AppSecret'
                },{
                    xtype:'selecterfield',
                    itemId:'KeyDealers',
                    alowBlank: false,
                    simpleSelect: false,
                    config: {
                        disponible: {
                            title:'Dealer',
                            field:'lin_ccodigo',
                            searchField:'o.[lin_ccodigo]'
                        },
                        selecionado: {
                            title:'Dealer',
                            field:'lin_ccodigo'
                        },
                        valueField:'lin_ccodigo',
                        //prefijoParaFiltro:'o',
                        valueFieldFilter:':IN',
                        modelItems: 'AdministratorSearch.model.TablasLineasSearchModel'                   
                    },
                    title:'Asginación dealer'
                }
            ],
            closeAction: 'destroy'
        });
        win.on('afterrender',function(){
            // si estoy editando tengo el record como parametro entonces cargo el form
            var record = win.record;
            if (record){
                win.down('#KeyDomain').setValue(record.get('KeyDomain'));
                win.down('#KeyAppKey').setValue(record.get('KeyAppKey'));
                win.down('#KeyAppSecret').setValue(record.get('KeyAppSecret'));
                win.down('#KeyDealers').setValue(record.get('KeyDealers'));
            }
        });
        win.show();
    },

    saveValues: function() {
        var json = '';
        var values = {};

        if (this.down( '#KeyAppKey' )){
            values.KeyAppKey = this.down( '#KeyAppKey' ).getValue().trim();
            values.KeyAppSecret = this.down( '#KeyAppSecret' ).getValue().trim();
            values.KeyDomain = this.down( '#KeyDomain' ).getValue();
            values.Regions = Ext.pluck(this.down('#regions').getStore().data.items, 'data');

            this.down( '#jsonvalues' ).setValue( Ext.JSON.encode( values ) );
        }
    },

    loadRecord: function( record ) {
        this.callParent( arguments );
        var par_cvalor = record.get( 'par_cvalor' );

        if( par_cvalor && par_cvalor != '' ) {
            var values = Ext.JSON.decode( par_cvalor );
            this.down( '#KeyAppKey' ).setValue( values.KeyAppKey );
            this.down( '#KeyAppSecret' ).setValue( values.KeyAppSecret );
            this.down( '#KeyDomain' ).setValue( values.KeyDomain );
            this.down('#regions').getStore().loadData(values.Regions);
        }

        this.down( '#KeyAppKey' ).on( 'change', this.saveValues, this );
        this.down( '#KeyAppSecret' ).on( 'change', this.saveValues, this );
        this.down( '#KeyDomain' ).on( 'select', this.saveValues, this );
        this.down('#regions').getStore().on( 'datachanged', this.saveValues, this );
    }
});