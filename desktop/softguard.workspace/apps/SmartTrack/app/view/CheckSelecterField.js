Ext.define('SmartTrack.view.CheckSelecterField', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.checkselecterfield',
    title : 'Evento',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width:'100%',
    getValue: function () {
        return this.down('#codcheck').getValue()
    },
    setValue: function (values) {
        var view = this;
        
        
        if(values == '' ) {
            view.down('#codcheck').setValue('');
            view.down('#nombrecheckpoint').setValue('');
            view.down('#deleteCheck').hide();        
            return false;
        }
        var codigos = values.split(',')
        
        if(codigos.length == 1) {
            
            var checkPointStore  =Ext.create('Ext.data.Store',{
                model: 'SmartTrack'+'.model.CheckPointsSearchModel',
                pageSize: 1000,
                remoteSort: false,
                remoteFilter: true
            })
            
            checkPointStore.load({callback:function (records) {
                if(records.length > 0) {
                   view.down('#deleteCheck').show()                    
                   view.down('#nombrecheckpoint').setValue(records[0].get('zon_mobservacion'))
                }
            }})
            
            
            
        } else if(codigos.length > 1) {
            view.down('#nombrecheckpoint').setValue(codigos.join(','))
            view.down('#deleteCheck').show()
        } else {
            view.down('#deleteCheck').hide()
        }
        
        this.down('#codcheck').setValue(codigos.join(','))
    },
    padding:'0 5 5 5',
    items : [
       {
            xtype:'button',
            itemId: 'checkpoint',
            text:'Seleccione un evento',
            margin:'0 10 0 0'
        },{
            xtype:'button',
            itemId:'deleteCheck',
            iconCls: 'icon-cancel',
            margin:'0 5 0 0',
            hidden:true
        },{
            xtype:'displayfield',
            itemId:'nombrecheckpoint',
            style: {
                wordBreak: 'break-word',
                wordWrap: 'break-word'
            }
        },{
            xtype:'displayfield',
            itemId:'codcheck',
            hidden:true
        }
    ],
    
    
    
    initComponent: function () {
        this.callParent(arguments);
        
        if(this.title!= '') {
            this.setTitle(this.title)
        }  
    } // cierro init
});