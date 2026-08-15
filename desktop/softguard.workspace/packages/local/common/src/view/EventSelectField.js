//MIGRADO2024
Ext.define('Common.view.EventSelectField', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.eventselecterfield',
    title : 'Evento',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width:'100%',
    getValue: function () {
        return this.down('#codevento').getValue()
    },
    setValue: function (values) {
        var view = this;
        
        
        if(values == '' ) {
            view.down('#codevento').setValue('');
            view.down('#nombreevento').setValue('');
            view.down('#deleteEvent').hide();        
            return false;
        }
        var codigos = values.split(',')
        
        if(codigos.length == 1) {
            
            var codigoalarmaStore  =Ext.create('Ext.data.Store',{
                model: 'Common.model.SoftguardCodigoAlarmaModel',
                pageSize: 1000,
                remoteSort: false,
                remoteFilter: true,
                filters: [{
                    property:'cod_ccodigo',
                    value: codigos[0]
                }],
                remoteFilter: true,
                sorters: [
                        { 
                            property: 'cod_ccodigo',
                            direction:'ASC'
                        }
                    ]
            })
            
            codigoalarmaStore.load({callback:function (records) {
                if(records.length > 0) {
                   view.down('#deleteEvent').show()                    
                   view.down('#nombreevento').setValue(records[0].get('Descripcion'))
                }
            }})
            
            
            
        } else if(codigos.length > 1) {
            view.down('#nombreevento').setValue(codigos.join(','))
            view.down('#deleteEvent').show()
        } else {
            view.down('#deleteEvent').hide()
        }
        
        this.down('#codevento').setValue(codigos.join(','))
    },
    padding:'0 5 5 5',
    items : [
       {
            xtype:'button',
            itemId: 'evento',
            text:'Seleccione un evento',
            margin:'0 10 0 0'
        },{
            xtype:'button',
            itemId:'deleteEvent',
            iconCls: 'icon-cancel',
            margin:'0 5 0 0',
            hidden:true
        },{
            xtype:'displayfield',
            itemId:'nombreevento',
            style: {
                wordBreak: 'break-word',
                wordWrap: 'break-word'
            }
        },{
            xtype:'displayfield',
            itemId:'codevento',
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