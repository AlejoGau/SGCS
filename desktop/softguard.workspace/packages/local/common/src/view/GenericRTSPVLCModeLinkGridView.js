//MIGRADO2024
Ext.define('Common.view.GenericRTSPVLCModeLinkGridView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.genericrtspvlcmodelinkgridview'],
    preventHeader: true,
    frame: false,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        //width:'100%',
        anchor:'100%',
        enforceMaxLength: true
    },
    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    items : [
        
        {
        xtype:'fieldset',
        items: [           
            {xtype: 'textfield', fieldLabel: 'RTSP Link', itemId: '_rtsplink',name: '_rtsplink',allowBlank: false}, 
            {xtype: 'combobox', fieldLabel: 'Subtipo', itemId: '_rtsptcpforce',name: '_rtsptcpforce',store:[['true','ForceTCP'],['false','NoForceTCP']], value:'false'}
            ,{
                xtype: 'button', 
                text:'Agregar',
                formBind : true,
                handler: function(button) {
                    var view = button.up('genericrtspvlcmodelinkgridview');
                    var instance = {
                        _rtsplink: view.getForm().findField('_rtsplink').getValue(),
                        _rtsptcpforce: view.getForm().findField('_rtsptcpforce').getValue()
                    };
                    
                    var store = view.down('grid').getStore();
                    store.add(instance);
                    
                    view.setInHiddenField(view, store)
                }
            }
        ]
        
        },
        {
            xtype: 'gridpanel',
            columns:[
                {
                    xtype:'actioncolumn',
                    header: '',
                    width: 40,
                    items: [
                        {
                            iconCls: 'icon-delete',
                            tooltip: 'Borrar',
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('genericrtspvlcmodelinkgridview');
                                //var rec = grid.getStore().getAt(rowIndex);
                                grid.getStore().removeAt(rowIndex)
                                
                                view.setInHiddenField(view, grid.getStore())
                            }
                        }
                    ]
                },
               {
                    xtype : 'gridcolumn',            
                    header : '_rtsplink',
                    
                	dataIndex : '_rtsplink',
                    flex: 1
        		},{
                    xtype : 'gridcolumn',            
                    header : '_rtsptcpforce',
                   
                	dataIndex : '_rtsptcpforce',
                    flex: 1
        		}
            ]
        }
    ],   
    
    setInHiddenField : function (view, store) {
        var data = [];
        store.each(function(rec){
           data.push(rec.data);
        });
        var gridconfig = view.caller.down('#gridconfig');
        gridconfig.setValue(Ext.JSON.encode(data));
    },
	initComponent : function() {
		this.callParent();
        var view = this;
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId:'save',
                    listeners:{
                        click:function () {
                             view.callerParent.fireEvent('save',view.callerParent);
                             if (view.up('window'))
                                view.up('window').close();
                        }
                    }
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
        
	},
    
    listeners: {
        afterrender: function(view){
            var record = view.record;
            var gridconfig;
            var data;
            //console.log(view);
            
            var campo = record.get('cuv_clinkdss')?record.get('cuv_clinkdss'):record.get('cvl_clinkdss');
            var cuv_clinkdss = Ext.JSON.decode(campo?campo:'{}');
            var formdata = cuv_clinkdss.formdata;
            
            // agarro los valores de formdata y los pongo en los campos
            view.down('#_rtsplink').setValue(formdata._rtsplink);
            view.down('#_rtsptcpforce').setValue(formdata._rtsptcpforce);
            
            if (formdata) {
                gridconfig = formdata.gridConfig;
            }
            
            if (gridconfig){
                data = Ext.JSON.decode(cuv_clinkdss.formdata.gridConfig);
            }
            
            var store = Ext.create('Ext.data.Store',{
                model: 'Common.model.GenericRTSPVLCModeModel',
                proxy: {type: 'memory'}
            });
            
            if (data){
                store.loadData(data);
            }
            
            this.down('grid').bindStore(store);
        }
    }
});